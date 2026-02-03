import { useEffect, useRef, useLayoutEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Unified scroll-to-top on route change.
 * Replaces: ScrollToTop component, useScrollToTop hook, and one-off scroll-on-mount logic.
 * - Skips contact page
 * - Respects state.preserveScroll
 * - Special handling for work sections (no scroll when switching tabs; scroll when entering work detail)
 * - Handles Lenis, main container, and ScrollTrigger (immediate + delayed refresh for lazy load)
 */
export function useScrollToTopOnRouteChange() {
  const { pathname, state } = useLocation();
  const previousPathnameRef = useRef(pathname);

  const isWorkDetailRoute = useCallback(
    (path) => path?.match?.(/^\/work\/(influence|social|creative|event)\/\d+$/),
    []
  );

  const scrollToTop = useCallback(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const mainContainer =
      document.querySelector("main") || document.querySelector("[data-nav-color]");
    if (mainContainer) {
      mainContainer.scrollTop = 0;
    }

    const lenisInstance =
      document.querySelector("[data-lenis-root]")?.__lenis__ || window.lenis;
    if (lenisInstance && typeof lenisInstance.scrollTo === "function") {
      lenisInstance.scrollTo(0, { immediate: true });
    }

    try {
      if (ScrollTrigger && typeof ScrollTrigger.update === "function") {
        ScrollTrigger.update();
      }
    } catch {
      // Silently handle scope errors
    }
  }, []);

  // Immediate scroll before paint
  useLayoutEffect(() => {
    const currentPathname = pathname;
    const previousPathname = previousPathnameRef.current;

    const isNavigatingBetweenWorkSections =
      previousPathname.startsWith("/work/") &&
      currentPathname.startsWith("/work/") &&
      previousPathname !== currentPathname;
    const isNavigatingToWorkDetail = isWorkDetailRoute(currentPathname);

    const shouldScroll =
      !isNavigatingBetweenWorkSections || isNavigatingToWorkDetail;
    if (shouldScroll) {
      scrollToTop();
    }

    previousPathnameRef.current = currentPathname;
  }, [pathname, state, isWorkDetailRoute, scrollToTop]);

  // Delayed scrolls for Lenis/lazy load + ScrollTrigger refresh
  useEffect(() => {
    if (pathname.startsWith("/contact-us")) return;
    if (state?.preserveScroll) return;

    const previousPathname = previousPathnameRef.current;
    const isNavigatingBetweenWorkSections =
      previousPathname.startsWith("/work/") &&
      pathname.startsWith("/work/") &&
      previousPathname !== pathname;
    const isNavigatingToWorkDetail = isWorkDetailRoute(pathname);
    const shouldScroll =
      !isNavigatingBetweenWorkSections || isNavigatingToWorkDetail;

    if (!shouldScroll) return;

    scrollToTop();

    const timeouts = [
      setTimeout(scrollToTop, 50),
      setTimeout(scrollToTop, 150),
      setTimeout(scrollToTop, 300),
      setTimeout(() => {
        scrollToTop();
        try {
          if (ScrollTrigger && typeof ScrollTrigger.refresh === "function") {
            requestAnimationFrame(() => ScrollTrigger.refresh());
          }
        } catch {
          // Ignore cleanup errors
        }
      }, 500),
    ];

    return () => timeouts.forEach((t) => clearTimeout(t));
  }, [pathname, state, isWorkDetailRoute, scrollToTop]);
}
