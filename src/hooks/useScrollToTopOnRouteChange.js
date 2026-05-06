import { useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stripLocalePrefix } from "../utils/localePaths";

/**
 * Unified scroll-to-top on route change.
 * Replaces: ScrollToTop component, useScrollToTop hook, and one-off scroll-on-mount logic.
 * - Skips contact page
 * - Respects state.preserveScroll
 * - Special handling for work sections (no scroll when switching tabs; scroll when entering work detail)
 * - Handles main container and ScrollTrigger (immediate + delayed refresh for lazy load)
 */
export function useScrollToTopOnRouteChange() {
  const { pathname, state } = useLocation();
  const previousPathnameRef = useRef(pathname);

  const pathWithoutLocale = useCallback(
    (path) => stripLocalePrefix(path || ""),
    []
  );

  const isWorkDetailRoute = useCallback(
    (path) => {
      const p = pathWithoutLocale(path);
      return p?.match?.(/^\/work\/(influence|social|creative|event)\/\d+$/);
    },
    [pathWithoutLocale]
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

    try {
      if (ScrollTrigger && typeof ScrollTrigger.update === "function") {
        ScrollTrigger.update();
      }
    } catch {
      // Silently handle scope errors
    }
  }, []);

  // Immediate scroll on route change
  useEffect(() => {
    const currentPathname = pathname;
    const previousPathname = previousPathnameRef.current;

    const prevBase = pathWithoutLocale(previousPathname);
    const currBase = pathWithoutLocale(currentPathname);

    const isNavigatingBetweenWorkSections =
      prevBase.startsWith("/work/") &&
      currBase.startsWith("/work/") &&
      previousPathname !== currentPathname;
    const isNavigatingToWorkDetail = isWorkDetailRoute(currentPathname);

    const isBlogDetailRoute =
      currBase.startsWith("/blogs/") && currBase !== "/blogs";

    const shouldScroll =
      !isNavigatingBetweenWorkSections || isNavigatingToWorkDetail || isBlogDetailRoute;

    if (shouldScroll) {
      scrollToTop();
    }

    previousPathnameRef.current = currentPathname;
  }, [pathname, state, isWorkDetailRoute, pathWithoutLocale, scrollToTop]);

  // Delayed scrolls for lazy load + ScrollTrigger refresh
  useEffect(() => {
    const basePath = pathWithoutLocale(pathname);
    if (basePath.startsWith("/contact-us")) return;
    if (state?.preserveScroll) return;

    const previousPathname = previousPathnameRef.current;
    const prevBase = pathWithoutLocale(previousPathname);
    const currBase = basePath;

    const isNavigatingBetweenWorkSections =
      prevBase.startsWith("/work/") &&
      currBase.startsWith("/work/") &&
      previousPathname !== pathname;
    const isNavigatingToWorkDetail = isWorkDetailRoute(pathname);

    const isBlogDetailRoute =
      currBase.startsWith("/blogs/") && currBase !== "/blogs";

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
            const activeTriggers = ScrollTrigger.getAll().filter(t => t.vars && t.vars.trigger && t.vars.trigger.isConnected);
            if (activeTriggers.length > 0) {
              requestAnimationFrame(() => {
                try {
                  ScrollTrigger.refresh();

                  requestAnimationFrame(() => {
                    scrollToTop();
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
  }, [pathname, state, isWorkDetailRoute, pathWithoutLocale, scrollToTop]);
}
