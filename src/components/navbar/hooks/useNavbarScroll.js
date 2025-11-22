import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export function useNavbarScroll(navRef) {
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const hidden = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY || window.pageYOffset;

      // small threshold to avoid jitter
      if (Math.abs(currentY - lastScrollY.current) < 6) {
        ticking.current = false;
        return;
      }

      // Only apply scroll hide effect on desktop (lg breakpoint and above)
      const isDesktop = window.innerWidth >= 1024; // lg breakpoint in Tailwind

      if (isDesktop && currentY > lastScrollY.current && currentY > 80) {
        // scrolling down -> hide (desktop only)
        if (!hidden.current && navRef.current) {
          gsap.to(navRef.current, {
            y: -120,
            duration: 0.35,
            ease: "power2.out",
          });
          hidden.current = true;
        }
      } else if (isDesktop || (!isDesktop && hidden.current)) {
        // scrolling up -> show (always show on mobile, show on desktop when scrolling up)
        if (hidden.current && navRef.current) {
          gsap.to(navRef.current, {
            y: 0,
            duration: 0.35,
            ease: "power2.out",
          });
          hidden.current = false;
        }
      }

      lastScrollY.current = currentY;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(handleScroll);
      }
    };

    // Handle window resize to ensure navbar is visible on mobile
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1024;
      if (!isDesktop && hidden.current && navRef.current) {
        // Ensure navbar is visible on mobile
        gsap.to(navRef.current, {
          y: 0,
          duration: 0.35,
          ease: "power2.out",
        });
        hidden.current = false;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [navRef]);
}

