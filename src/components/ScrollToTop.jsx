import { useEffect, useRef, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function ScrollToTop() {
  const { pathname } = useLocation();
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

    // Check if we're navigating between work sections (same base route, different workId)
    const isNavigatingBetweenWorkSections =
      previousPathname.startsWith("/work/") &&
      currentPathname.startsWith("/work/") &&
      previousPathname !== currentPathname;

    // Only scroll to top if we're not navigating between work sections
    if (!isNavigatingBetweenWorkSections) {
      // Immediate scroll before paint
      scrollToTop();
    }

    previousPathnameRef.current = currentPathname;
  }, [pathname]);

  useEffect(() => {
    const currentPathname = pathname;
    const previousPathname = previousPathnameRef.current;

    // Check if we're navigating between work sections
    const isNavigatingBetweenWorkSections =
      previousPathname.startsWith("/work/") &&
      currentPathname.startsWith("/work/") &&
      previousPathname !== currentPathname;

    // Only scroll to top if we're not navigating between work sections
    if (!isNavigatingBetweenWorkSections) {
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
  }, [pathname]);

  return null;
}

export default ScrollToTop;
