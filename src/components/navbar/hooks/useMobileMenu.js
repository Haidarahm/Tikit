import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function useMobileMenu(isMobileMenuOpen, hamburgerRef) {
  const mobileMenuRef = useRef();

  // Animate hamburger icon
  const animateHamburger = (isOpen) => {
    const lines = hamburgerRef.current?.querySelectorAll(".hamburger-line");
    if (!lines) return;

    if (isOpen) {
      gsap.to(lines[0], {
        rotation: 45,
        y: 8,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(lines[1], { opacity: 0, duration: 0.2, ease: "power2.out" });
      gsap.to(lines[2], {
        rotation: -45,
        y: -8,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(lines[0], {
        rotation: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(lines[1], {
        opacity: 1,
        duration: 0.2,
        delay: 0.1,
        ease: "power2.out",
      });
      gsap.to(lines[2], {
        rotation: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  // Animate mobile menu
  const animateMobileMenu = (isOpen) => {
    if (!mobileMenuRef.current) return;

    if (isOpen) {
      gsap.set(mobileMenuRef.current, { display: "flex" });
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
      );

      const menuItems =
        mobileMenuRef.current.querySelectorAll(".mobile-nav-item");
      gsap.fromTo(
        menuItems,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.2,
          ease: "power2.out",
        }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(mobileMenuRef.current, { display: "none" });
        },
      });
    }
  };

  // Handle mobile menu animations
  useEffect(() => {
    animateHamburger(isMobileMenuOpen);
    animateMobileMenu(isMobileMenuOpen);
  }, [isMobileMenuOpen]);

  return mobileMenuRef;
}

