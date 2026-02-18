import { useEffect } from "react";

// Smooth Scroll Init - lazy loaded to reduce initial bundle size
function SmoothScrollProvider({ children }) {
  useEffect(() => {
    let lenis = null;
    let gsapInstance = null;
    let tickerCallback = null;
    let isMounted = true;

    // Defer loading of heavy animation libraries
    const initSmoothScroll = async () => {
      try {
        // Load libraries asynchronously after initial render
        const [LenisModule, gsapModule, scrollTriggerModule] = await Promise.all([
          import("lenis"),
          import("gsap"),
          import("gsap/ScrollTrigger")
        ]);

        if (!isMounted) return;

        const Lenis = LenisModule.default;
        const gsap = gsapModule.default;
        const { ScrollTrigger } = scrollTriggerModule;
        
        gsapInstance = gsap;
        gsap.registerPlugin(ScrollTrigger);
        
        lenis = new Lenis({
          duration: 1.2,
          smooth: true,
          smoothTouch: true,
          infinite: false,
          orientation: "vertical",
          gestureOrientation: "vertical",
        });

        // Expose Lenis globally so other hooks (like scroll-to-top)
        // can control the virtual scroll position.
        // Also mark the document as the Lenis root.
        if (typeof window !== "undefined") {
          window.lenis = lenis;
        }
        if (typeof document !== "undefined") {
          const rootEl = document.documentElement;
          if (rootEl) {
            rootEl.setAttribute("data-lenis-root", "true");
          }
        }

        // Sync Lenis with ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update);

        tickerCallback = (time) => {
          lenis.raf(time * 1000);
        };

        gsap.ticker.add(tickerCallback);
        gsap.ticker.lagSmoothing(0);
      } catch (error) {
        console.error("Failed to load smooth scroll libraries", error);
      }
    };

    // Defer initialization using requestIdleCallback or setTimeout
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(initSmoothScroll, { timeout: 1000 });
    } else {
      setTimeout(initSmoothScroll, 100);
    }

    return () => {
      isMounted = false;
      if (gsapInstance && tickerCallback) {
        gsapInstance.ticker.remove(tickerCallback);
      }
      if (lenis) {
        lenis.destroy();
      }
      if (typeof window !== "undefined" && window.lenis === lenis) {
        // Clean up global reference if it's still pointing to this instance
        delete window.lenis;
      }
      if (typeof document !== "undefined") {
        const rootEl = document.documentElement;
        if (rootEl && rootEl.getAttribute("data-lenis-root") === "true") {
          rootEl.removeAttribute("data-lenis-root");
        }
      }
    };
  }, []);

  return children;
}

export default SmoothScrollProvider;