import { useState, useEffect, useRef, useCallback } from "react";

/**
 * useNavColor Hook
 *
 * Uses IntersectionObserver to detect which section is currently under the navbar
 * and returns the appropriate nav link color based on the section's data-nav-color attribute.
 *
 * How it works:
 * 1. Observes all elements with [data-nav-color] attribute
 * 2. When a section intersects with the navbar area, reads its data-nav-color value
 * 3. Returns "white" or "black" based on the intersecting section
 *
 * @returns {string} - "white" or "black" based on the intersecting section
 */
export function useNavColor() {
  const [navColor, setNavColor] = useState("white");
  const observerRef = useRef(null);
  const mutationObserverRef = useRef(null);
  const sectionsMapRef = useRef(new Map()); // Track intersection ratios

  // Memoized function to determine the winning section
  const updateNavColor = useCallback(() => {
    let maxRatio = 0;
    let winningColor = null;

    sectionsMapRef.current.forEach((ratio, section) => {
      if (ratio > maxRatio) {
        maxRatio = ratio;
        winningColor = section.getAttribute("data-nav-color");
      }
    });

    if (
      winningColor &&
      (winningColor === "white" || winningColor === "black")
    ) {
      setNavColor(winningColor);
    }
  }, []);

  useEffect(() => {
    // Get navbar height for accurate observation area
    // Batch layout reads to avoid forced reflow
    let navbarHeight = 120;
    
    // Use requestAnimationFrame to batch all layout reads together
    requestAnimationFrame(() => {
      const navbar = document.querySelector("nav");
      navbarHeight = navbar ? navbar.offsetHeight + 60 : 120;
      
      // Create observer callback
      const observerCallback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            sectionsMapRef.current.set(entry.target, entry.intersectionRatio);
          } else {
            sectionsMapRef.current.delete(entry.target);
          }
        });

        updateNavColor();
      };

      // Create IntersectionObserver with rootMargin targeting navbar area
      observerRef.current = new IntersectionObserver(observerCallback, {
        root: null,
        // Observe only the area where the navbar is: from top to navbarHeight
        rootMargin: `0px 0px -${window.innerHeight - navbarHeight}px 0px`,
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      });

      // Function to observe all sections
      const observeSections = () => {
        const sections = document.querySelectorAll("[data-nav-color]");
        sections.forEach((section) => {
          if (observerRef.current) {
            observerRef.current.observe(section);
          }
        });
      };

      // Initial observation
      observeSections();

      // Re-observe when DOM changes (for dynamic content)
      const mutationObserver = new MutationObserver((mutations) => {
        let shouldReobserve = false;
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length || mutation.removedNodes.length) {
            shouldReobserve = true;
          }
        });
        if (shouldReobserve) {
          // Disconnect and re-observe
          if (observerRef.current) {
            observerRef.current.disconnect();
            sectionsMapRef.current.clear();
          }
          observeSections();
        }
      });

      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });

      // Store mutationObserver for cleanup
      mutationObserverRef.current = mutationObserver;
    });

    // Initial color check after a brief delay for DOM to be ready
    // Use requestAnimationFrame to batch layout reads and avoid forced reflow
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(() => {
        // Get navbar height again in case it changed
        const navbar = document.querySelector("nav");
        const currentNavbarHeight = navbar ? navbar.offsetHeight + 60 : 120;
        
        const sections = document.querySelectorAll("[data-nav-color]");
        if (sections.length > 0) {
          // Batch all getBoundingClientRect calls to avoid forced reflow
          const rects = Array.from(sections).map((section) => ({
            section,
            rect: section.getBoundingClientRect(),
          }));

          // Find section at top
          let topSection = null;
          let topPosition = Infinity;

          rects.forEach(({ section, rect }) => {
            if (rect.top <= currentNavbarHeight && rect.bottom > 0) {
              if (
                rect.top < topPosition ||
                (rect.top === topPosition && rect.bottom > currentNavbarHeight)
              ) {
                topPosition = rect.top;
                topSection = section;
              }
            }
          });

          if (topSection) {
            const color = topSection.getAttribute("data-nav-color");
            if (color === "white" || color === "black") {
              setNavColor(color);
            }
          }
        }
      });
    }, 100);

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      if (mutationObserverRef.current) {
        mutationObserverRef.current.disconnect();
        mutationObserverRef.current = null;
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      sectionsMapRef.current.clear();
    };
  }, [updateNavColor]);

  return navColor;
}
