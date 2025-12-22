import { useEffect, useLayoutEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Custom hook to scroll to top on component mount
 * Handles Lenis smooth scroll, lazy-loaded components, and ScrollTrigger
 */
export const useScrollToTop = () => {
  // useLayoutEffect for immediate scroll before browser paints
  useLayoutEffect(() => {
    // Immediate scroll before browser paints
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Also try scrolling the main container if it exists
    const mainContainer = document.querySelector('main') || document.querySelector('[data-nav-color]');
    if (mainContainer) {
      mainContainer.scrollTop = 0;
    }
    
    // Safely refresh ScrollTrigger to recalculate positions
    try {
      if (ScrollTrigger && typeof ScrollTrigger.update === 'function') {
        ScrollTrigger.update();
      }
    } catch (error) {
      // Silently handle scope errors
      console.debug('ScrollTrigger update skipped:', error);
    }
  }, []);

  // Additional scroll attempts after render to handle Lenis and lazy loading
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // Safely refresh ScrollTrigger after scroll
      try {
        if (ScrollTrigger && typeof ScrollTrigger.update === 'function') {
          ScrollTrigger.update();
        }
      } catch (error) {
        // Silently handle scope errors
        console.debug('ScrollTrigger update skipped:', error);
      }
      
      // Try to access Lenis instance from the global scope or React context
      // Lenis might be stored in a ref or context
      const lenisInstance = document.querySelector('[data-lenis-root]')?.__lenis__ || window.lenis;
      if (lenisInstance && typeof lenisInstance.scrollTo === 'function') {
        lenisInstance.scrollTo(0, { immediate: true });
      }
    };
    
    // Immediate scroll
    scrollToTop();
    
    // Scroll again after delays to handle lazy loading and Lenis smooth scroll
    const timeouts = [
      setTimeout(scrollToTop, 50),
      setTimeout(scrollToTop, 150),
      setTimeout(scrollToTop, 300),
      setTimeout(() => {
        scrollToTop();
        // Final ScrollTrigger refresh
        try {
          if (ScrollTrigger && typeof ScrollTrigger.refresh === 'function') {
            requestAnimationFrame(() => {
              ScrollTrigger.refresh();
            });
          }
        } catch (error) {
          // Silently handle scope errors
          console.debug('ScrollTrigger refresh skipped:', error);
        }
      }, 500),
    ];
    
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, []);
};

