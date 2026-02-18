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
    // Reset native scroll containers
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const mainContainer =
      document.querySelector("main") || document.querySelector("[data-nav-color]");
    if (mainContainer) {
      mainContainer.scrollTop = 0;
    }

    // Reset Lenis virtual scroll if available
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
    
    // Always scroll to top when navigating to blog detail pages
    const isBlogDetailRoute = currentPathname.startsWith("/blogs/") && currentPathname !== "/blogs";
    
    const shouldScroll =
      !isNavigatingBetweenWorkSections || isNavigatingToWorkDetail || isBlogDetailRoute;
    
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
    
    // Always scroll to top when navigating to blog detail pages
    const isBlogDetailRoute = pathname.startsWith("/blogs/") && pathname !== "/blogs";
    
    const shouldScroll =
      !isNavigatingBetweenWorkSections || isNavigatingToWorkDetail || isBlogDetailRoute;

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
            // Only refresh if there are active triggers and DOM is stable
            const activeTriggers = ScrollTrigger.getAll().filter(t => t.vars && t.vars.trigger && t.vars.trigger.isConnected);
            if (activeTriggers.length > 0) {
              requestAnimationFrame(() => {
                try {
                  // Store scroll position before refresh
                  const scrollBeforeRefresh = window.pageYOffset || document.documentElement.scrollTop;
                  
                  ScrollTrigger.refresh();
                  
                  // Force scroll to top after refresh, especially for blog routes
                  requestAnimationFrame(() => {
                    scrollToTop();
                    // Double-check and force again if needed
                    const scrollAfterRefresh = window.pageYOffset || document.documentElement.scrollTop;
                    if (scrollAfterRefresh !== 0) {
                      scrollToTop();
                    }
                  });
                } catch {
                  // Ignore refresh errors - triggers may have been cleaned up
                }
              });
            }
          }
        } catch {
          // Ignore cleanup errors
        }
      }, 500),
    ];

    return () => timeouts.forEach((t) => clearTimeout(t));
  }, [pathname, state, isWorkDetailRoute, scrollToTop]);
}
