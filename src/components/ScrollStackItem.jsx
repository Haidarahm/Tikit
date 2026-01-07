import { useLayoutEffect, useRef, useCallback, useMemo } from "react";
import { debounce } from "../utils/debounce";

export const ScrollStackItem = ({ children, itemClassName = "" }) => (
  <div
    className={`scroll-stack-card flex justify-between  gap-[12px]  relative   my-8 p-2 md:p-[30px] xl:p-[40px] rounded-[5px] md:rounded-[15px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top will-change-transform ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: "hidden",
      transformStyle: "preserve-3d",
    }}
  >
    {children}
  </div>
);

const ScrollStack = ({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "50%",
  scaleEndPosition = "40%",
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = true,
  onStackComplete,
}) => {
  const scrollerRef = useRef(null);
  const stackCompletedRef = useRef(false);
  const cardsRef = useRef([]);
  const lastTransformsRef = useRef(new Map());
  const isUpdatingRef = useRef(false);
  const frameRef = useRef(0); // ← For RAF throttling
  const positionsRef = useRef([]); // ← Cache positions
  const isResizingRef = useRef(false); // ← Track resize state
  const resizeTimeoutRef = useRef(null); // ← For resize setTimeout cleanup
  const resizeObserverRef = useRef(null); // ← ResizeObserver instance
  const imageUnloadCbsRef = useRef([]); // ← To clean image 'load' listeners
  const isActiveRef = useRef(false); // ← Only update when visible

  // Memoize config to prevent unnecessary re-init
  const scrollConfig = useMemo(
    () => ({
      itemDistance,
      itemScale,
      itemStackDistance,
      stackPosition,
      scaleEndPosition,
      baseScale,
      scaleDuration,
      rotationAmount,
      blurAmount,
      useWindowScroll,
    }),
    [
      itemDistance,
      itemScale,
      itemStackDistance,
      stackPosition,
      scaleEndPosition,
      baseScale,
      scaleDuration,
      rotationAmount,
      blurAmount,
      useWindowScroll,
    ]
  );

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === "string" && value.includes("%")) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
        scrollContainer: document.documentElement,
      };
    } else {
      const scroller = scrollerRef.current;
      return {
        scrollTop: scroller?.scrollTop || 0,
        containerHeight: scroller?.clientHeight || 0,
        scrollContainer: scroller,
      };
    }
  }, [useWindowScroll]);

  const getElementOffset = useCallback(
    (element) => {
      if (useWindowScroll) {
        // Batch getBoundingClientRect calls to avoid forced reflow
        // Use cached value if available, otherwise read synchronously (already in RAF)
        const rect = element.getBoundingClientRect();
        return rect.top + window.scrollY;
      } else {
        // offsetTop doesn't cause reflow, safe to use
        return element.offsetTop;
      }
    },
    [useWindowScroll]
  );

  // ✅ Precompute positions on mount/resize
  const updatePositions = useCallback(() => {
    // Re-query cards in case DOM has changed during resize
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.querySelectorAll(".scroll-stack-card"));

    // Update cards reference if needed
    if (cards.length > 0) {
      cardsRef.current = cards;
    }

    const { containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(
      scaleEndPosition,
      containerHeight
    );

    const endElement = scroller?.querySelector(".scroll-stack-end");

    // Batch all getBoundingClientRect calls to avoid forced reflow
    const endElementTop = endElement ? getElementOffset(endElement) : 0;
    
    // Batch all card offset calculations
    const cardOffsets = cardsRef.current.map((card) => 
      card ? getElementOffset(card) : null
    );

    positionsRef.current = cardsRef.current.map((card, i) => {
      if (!card) return null;
      const cardTop = cardOffsets[i];
      if (cardTop === null) return null;
      return {
        cardTop,
        triggerStart: cardTop - stackPositionPx - itemStackDistance * i,
        triggerEnd: cardTop - scaleEndPositionPx,
        pinStart: cardTop - stackPositionPx - itemStackDistance * i,
        pinEnd: endElementTop - containerHeight / 2,
      };
    });
  }, [
    getScrollData,
    parsePercentage,
    stackPosition,
    scaleEndPosition,
    itemStackDistance,
    useWindowScroll,
    getElementOffset,
  ]);

  // ✅ Optimized — runs max once per frame
  const updateCardTransforms = useCallback(() => {
    if (
      !cardsRef.current.length ||
      isUpdatingRef.current ||
      isResizingRef.current ||
      !isActiveRef.current // Do not update when section is not visible
    )
      return;

    isUpdatingRef.current = true;

    const { scrollTop } = getScrollData();

    // ✅ Precompute top visible card index — O(n) total, not per-card
    let topCardIndex = -1;
    for (let j = 0; j < cardsRef.current.length; j++) {
      const pos = positionsRef.current[j];
      if (!pos) continue;
      if (scrollTop >= pos.triggerStart) {
        topCardIndex = j;
      }
    }

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const pos = positionsRef.current[i];
      if (!pos) return;

      const { triggerStart, triggerEnd, pinStart, pinEnd, cardTop } = pos;

      const scaleProgress = calculateProgress(
        scrollTop,
        triggerStart,
        triggerEnd
      );
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      // ✅ Blur: only compute based on precomputed topCardIndex
      const blur =
        blurAmount && i < topCardIndex
          ? Math.max(0, (topCardIndex - i) * blurAmount)
          : 0;

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY =
          scrollTop -
          cardTop +
          parsePercentage(stackPosition, getScrollData().containerHeight) +
          itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY =
          pinEnd -
          cardTop +
          parsePercentage(stackPosition, getScrollData().containerHeight) +
          itemStackDistance * i;
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        const filter =
          newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : "";

        card.style.transform = transform;
        card.style.filter = filter;

        lastTransformsRef.current.set(i, newTransform);
      }

      // Trigger onStackComplete
      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    baseScale,
    itemScale,
    itemStackDistance,
    stackPosition,
    rotationAmount,
    blurAmount,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData,
  ]);

  // ✅ Throttled scroll handler
  const handleScroll = useCallback(() => {
    if (frameRef.current) return;
    frameRef.current = requestAnimationFrame(() => {
      updateCardTransforms();
      frameRef.current = 0;
    });
  }, [updateCardTransforms]);

  // ✅ Debounced resize handler (created once and reused)
  const handleResize = useCallback(() => {
    // Cancel any pending animation frames during resize
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
    }

    // Mark as resizing to prevent conflicts
    isResizingRef.current = true;

    // Use requestAnimationFrame to wait for layout to settle
    requestAnimationFrame(() => {
      // Double RAF to ensure layout has fully updated
      requestAnimationFrame(() => {
        updatePositions();
        // Small delay before updating transforms to ensure positions are fresh
        // Clear any existing timeout
        if (resizeTimeoutRef.current) {
          clearTimeout(resizeTimeoutRef.current);
        }
        resizeTimeoutRef.current = setTimeout(() => {
          updateCardTransforms();
          isResizingRef.current = false;
          resizeTimeoutRef.current = null;
        }, 16); // ~1 frame delay
      });
    });
  }, [updatePositions, updateCardTransforms]);

  // Create debounced version of resize handler
  const debouncedHandleResize = useMemo(
    () => debounce(handleResize, 150),
    [handleResize]
  );

  const refreshNow = useCallback(() => {
    // Recompute layout and update transforms in next frame
    requestAnimationFrame(() => {
      updatePositions();
      updateCardTransforms();
    });
  }, [updatePositions, updateCardTransforms]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    // ✅ Use forwarded ref to collect cards
    const cards = Array.from(scroller.querySelectorAll(".scroll-stack-card"));

    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;
    // Set initial styles
    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = "transform, filter";
      card.style.transformOrigin = "top center";
      card.style.backfaceVisibility = "hidden";
      card.style.transform = "translateZ(0)";
      card.style.webkitTransform = "translateZ(0)";
      card.style.perspective = "1000px";
      card.style.webkitPerspective = "1000px";
    });

    // Initialize positions
    updatePositions();

    // Initial render - use setTimeout to ensure browser has restored scroll position on refresh
    // This handles the case where browser restores scroll position after React mounts
    const initialUpdate = () => {
      updateCardTransforms();
    };
    
    // Immediate update
    initialUpdate();
    
    // Delayed update to catch browser scroll restoration (happens after page load)
    const timeoutId = setTimeout(() => {
      updatePositions();
      updateCardTransforms();
    }, 100);

    // Handle scroll restoration after page fully loads
    const handleLoad = () => {
      // Use requestAnimationFrame to ensure DOM is fully ready
      requestAnimationFrame(() => {
        updatePositions();
        updateCardTransforms();
      });
    };

    // Handle pageshow event (fires even when page is loaded from bfcache)
    const handlePageShow = (event) => {
      // If page was restored from cache, update transforms
      if (event.persisted) {
        requestAnimationFrame(() => {
          updatePositions();
          updateCardTransforms();
        });
      }
    };

    // Recompute when tab becomes visible again (route switches or tab changes)
    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        refreshNow();
      }
    };

    // Add scroll event listeners
    const scrollElement = useWindowScroll ? window : scroller;
    scrollElement.addEventListener("scroll", handleScroll, { passive: true });

    // Add debounced resize listener
    window.addEventListener("resize", debouncedHandleResize, { passive: true });

    // Listen for page load to handle scroll restoration
    if (useWindowScroll) {
      if (document.readyState === "complete") {
        // Page already loaded, update immediately
        handleLoad();
      } else {
        window.addEventListener("load", handleLoad, { once: true });
      }
      // Listen for pageshow to handle back/forward cache navigation
      window.addEventListener("pageshow", handlePageShow);
    }

    // Observe visibility of this section; only update when visible
    let io;
    try {
      io = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          const wasActive = isActiveRef.current;
          isActiveRef.current = !!entry?.isIntersecting;
          if (isActiveRef.current && !wasActive) {
            // Became visible → refresh layout
            refreshNow();
          }
        },
        {
          root: null,
          threshold: 0, // any intersection
        }
      );
      io.observe(scroller);
    } catch {}

    // Observe size changes to scroller and cards
    try {
      resizeObserverRef.current = new ResizeObserver(() => {
        refreshNow();
      });
      resizeObserverRef.current.observe(scroller);
      cardsRef.current.forEach((card) => {
        if (card) resizeObserverRef.current.observe(card);
      });
    } catch {}

    // Listen for image 'load' events inside this instance
    imageUnloadCbsRef.current = [];
    const imgs = Array.from(scroller.querySelectorAll("img"));
    imgs.forEach((img) => {
      if (img.complete) return;
      const onLoad = () => refreshNow();
      img.addEventListener("load", onLoad, { once: true });
      imageUnloadCbsRef.current.push(() => img.removeEventListener("load", onLoad));
    });

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      clearTimeout(timeoutId);
      if (useWindowScroll) {
        window.removeEventListener("load", handleLoad);
        window.removeEventListener("pageshow", handlePageShow);
      }
      scrollElement.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", debouncedHandleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      try {
        io?.disconnect();
      } catch {}
      // Clear any pending animation frames
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = 0;
      }
      // Clear any pending resize timeouts
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
        resizeTimeoutRef.current = null;
      }
      // Disconnect ResizeObserver
      try {
        resizeObserverRef.current?.disconnect();
      } catch {}
      resizeObserverRef.current = null;
      // Remove image load listeners
      imageUnloadCbsRef.current.forEach((off) => {
        try { off?.(); } catch {}
      });
      imageUnloadCbsRef.current = [];
      stackCompletedRef.current = false;
      // Reset inline styles on cards to avoid stale transforms after navigation
      const cachedCards = cardsRef.current.slice();
      cachedCards.forEach((card) => {
        if (!card) return;
        card.style.transform = "";
        card.style.filter = "";
        card.style.marginBottom = "";
        card.style.willChange = "";
        card.style.transformOrigin = "";
        card.style.backfaceVisibility = "";
        card.style.webkitTransform = "";
        card.style.perspective = "";
        card.style.webkitPerspective = "";
      });
      cardsRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
      isResizingRef.current = false;
    };
  }, [
    itemDistance,
    updateCardTransforms,
    updatePositions,
    scrollConfig, // ← Stable dependency
    useWindowScroll,
    handleScroll,
    debouncedHandleResize,
    refreshNow,
  ]);

  const containerStyles = useWindowScroll
    ? {
        overscrollBehavior: "contain",
        WebkitOverflowScrolling: "touch",
        WebkitTransform: "translateZ(0)",
        transform: "translateZ(0)",
        zIndex: 1,
      }
    : {
        overscrollBehavior: "contain",
        WebkitOverflowScrolling: "touch",
        scrollBehavior: "smooth",
        WebkitTransform: "translateZ(0)",
        transform: "translateZ(0)",
        willChange: "scroll-position",
        zIndex: 1,
      };

  const containerClassName = useWindowScroll
    ? `relative w-full ${className}`.trim()
    : `relative w-full h-full overflow-y-auto overflow-x-visible ${className}`.trim();

  return (
    <div
      className={containerClassName}
      ref={scrollerRef}
      style={containerStyles}
    >
      <div className="scroll-stack-inner   lg:px-20 min-h-screen">
        {children}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;
