import { useEffect, useRef, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function ScrollToTop() {
  const location = useLocation();
  const { pathname, state } = location;
  const previousPathnameRef = useRef(pathname);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Try to access Lenis instance
    const lenisInstance = document.querySelector('[data-lenis-root]')?.__lenis__ || window.lenis;
    if (lenisInstance && typeof lenisInstance.scrollTo === 'function') {
      lenisInstance.scrollTo(0, { immediate: true });
    }
    
    // Refresh ScrollTrigger
    ScrollTrigger.refresh();
  };

  useLayoutEffect(() => {
    const currentPathname = pathname;
    const previousPathname = previousPathnameRef.current;

    // Skip scroll-to-top on contact page
    if (currentPathname.startsWith("/contact-us")) {
      return;
    }

    // Check if navigation state explicitly requests preserving scroll
    if (state?.preserveScroll) {
      return; // Don't scroll
    }

    // Check if we're navigating between work sections (same base route, different workId)
    const isNavigatingBetweenWorkSections =
      previousPathname.startsWith("/work/") &&
      currentPathname.startsWith("/work/") &&
      previousPathname !== currentPathname;

    // Check if we're navigating to/from work detail pages (influence, social, creative, event)
    const isWorkDetailRoute = (path) => 
      path.match(/^\/work\/(influence|social|creative|event)\/\d+$/);
    
    const isNavigatingToWorkDetail = isWorkDetailRoute(currentPathname);
    const isNavigatingFromWorkDetail = isWorkDetailRoute(previousPathname);

    // Only scroll to top if we're not navigating between work sections
    // Always scroll when navigating TO a work detail page (from any other page)
    if (!isNavigatingBetweenWorkSections || isNavigatingToWorkDetail) {
      // Immediate scroll before paint
      scrollToTop();
    }

    previousPathnameRef.current = currentPathname;
  }, [pathname, state]);

  useEffect(() => {
    const currentPathname = pathname;
    const previousPathname = previousPathnameRef.current;

    // Skip scroll-to-top on contact page
    if (currentPathname.startsWith("/contact-us")) {
      return;
    }

    // Check if navigation state explicitly requests preserving scroll
    if (state?.preserveScroll) {
      return; // Don't scroll
    }

    // Check if we're navigating between work sections
    const isNavigatingBetweenWorkSections =
      previousPathname.startsWith("/work/") &&
      currentPathname.startsWith("/work/") &&
      previousPathname !== currentPathname;

    // Check if we're navigating to/from work detail pages (influence, social, creative, event)
    const isWorkDetailRoute = (path) => 
      path.match(/^\/work\/(influence|social|creative|event)\/\d+$/);
    
    const isNavigatingToWorkDetail = isWorkDetailRoute(currentPathname);
    const isNavigatingFromWorkDetail = isWorkDetailRoute(previousPathname);

    // Only scroll to top if we're not navigating between work sections
    // Always scroll when navigating TO a work detail page (from any other page)
    if (!isNavigatingBetweenWorkSections || isNavigatingToWorkDetail) {
      // Immediate scroll
      scrollToTop();
      
      // Multiple delayed scrolls to handle lazy loading and Lenis
      const timeouts = [
        setTimeout(scrollToTop, 50),
        setTimeout(scrollToTop, 150),
        setTimeout(scrollToTop, 300),
        setTimeout(() => {
          scrollToTop();
          ScrollTrigger.refresh();
        }, 500),
      ];
      
      return () => {
        timeouts.forEach(timeout => clearTimeout(timeout));
      };
    }

    previousPathnameRef.current = currentPathname;
  }, [pathname, state]);

  return null;
}

export default ScrollToTop;
