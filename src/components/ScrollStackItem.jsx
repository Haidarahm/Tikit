import { useLayoutEffect, useRef, useCallback, useMemo } from "react";

export const ScrollStackItem = ({ children, itemClassName = "" }) => (
  <div
    className={`scroll-stack-card md:h-[410px] gap-[12px] md:gap-0 relative   my-8 p-2 md:p-[30px] xl:p-[50px] rounded-[5px] md:rounded-[15px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top will-change-transform ${itemClassName}`.trim()}
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
  stackPosition = "20%",
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
        const rect = element.getBoundingClientRect();
        return rect.top + window.scrollY;
      } else {
        return element.offsetTop;
      }
    },
    [useWindowScroll]
  );

  // ✅ Precompute positions on mount/resize
  const updatePositions = useCallback(() => {
    const { containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(
      scaleEndPosition,
      containerHeight
    );

    const endElement = useWindowScroll
      ? document.querySelector(".scroll-stack-end")
      : scrollerRef.current?.querySelector(".scroll-stack-end");

    const endElementTop = endElement ? getElementOffset(endElement) : 0;

    positionsRef.current = cardsRef.current.map((card, i) => {
      if (!card) return null;
      const cardTop = getElementOffset(card);
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
    if (!cardsRef.current.length || isUpdatingRef.current) return;

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

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    // ✅ Use forwarded ref to collect cards
    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll(".scroll-stack-card")
        : scroller.querySelectorAll(".scroll-stack-card")
    );

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

    // Initial render
    updateCardTransforms();

    // Add scroll event listeners
    const scrollElement = useWindowScroll ? window : scroller;
    scrollElement.addEventListener("scroll", handleScroll, { passive: true });

    // ✅ Passive resize listener
    const handleResize = () => {
      updatePositions();
      updateCardTransforms();
    };
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      scrollElement.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      stackCompletedRef.current = false;
      cardsRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
      frameRef.current = 0;
    };
  }, [
    itemDistance,
    updateCardTransforms,
    updatePositions,
    scrollConfig, // ← Stable dependency
    useWindowScroll,
    handleScroll,
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
