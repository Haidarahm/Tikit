import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { useIntro } from "../../../store/IntroContext";
import { stripLocalePrefix } from "../../../utils/localePaths";

export function useNavbarAnimations(logoRef, navRef) {
  const { introDone } = useIntro();
  const { pathname } = useLocation();
  const basePath = stripLocalePrefix(pathname);
  const isHome = basePath === "/";

  // Wait for intro to finish on the home page before animating navbar
  const shouldAnimate = isHome ? introDone : true;

  useEffect(() => {
    if (!shouldAnimate) {
      // Hide navbar elements until intro is done
      if (logoRef.current) gsap.set(logoRef.current, { scale: 0, opacity: 0 });
      const navItems = navRef.current ? navRef.current.querySelectorAll(".nav-item") : [];
      gsap.set(navItems, { opacity: 0, y: 12 });
      return;
    }

    const queryNavItems = () =>
      navRef.current ? navRef.current.querySelectorAll(".nav-item") : [];

    const tl = gsap.timeline();
    const navItems = queryNavItems();

    gsap.set(navItems, { opacity: 0, y: 12 });
    tl.fromTo(
      logoRef.current,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        delay: 0.8,
        ease: "back.out(1.7)",
      }
    ).fromTo(
      navItems,
      { y: 12, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.45,
        delay: 0.8,
        stagger: 0.08,
        ease: "power2.out",
      },
      "-=0.35"
    );

    // logo part hover: make only the marked path jump
    const logoNode = logoRef.current;
    if (logoNode) {
      const jumpTarget = logoNode.querySelector(".logo-jump");
      if (jumpTarget) {
        const onEnterLogoPart = () => {
          gsap.fromTo(
            jumpTarget,
            { y: 0 },
            {
              y: -16,
              duration: 0.24,
              ease: "power2.out",
              yoyo: true,
              repeat: 1,
            }
          );
        };
        logoNode.addEventListener("mouseenter", onEnterLogoPart);
        logoNode._onEnterLogoPart = onEnterLogoPart;
      }
    }

    // underline hover animations using GSAP
    const items = queryNavItems();
    const enter = (underline) => {
      gsap.to(underline, {
        scaleX: 1,
        transformOrigin: "left",
        duration: 0.28,
        ease: "power2.out",
      });
    };
    const leave = (underline) => {
      gsap.to(underline, {
        scaleX: 0,
        transformOrigin: "right",
        duration: 0.26,
        ease: "power2.in",
      });
    };

    const resetAllNavUnderlines = () => {
      queryNavItems().forEach((el) => {
        const underline = el.querySelector(".nav-underline");
        if (underline) leave(underline);
      });
    };

    // While the pointer stays over a sticky nav link, `mouseleave` does not fire when
    // the page scrolls (e.g. hash / section navigation). Clear the GSAP underline on scroll.
    let scrollCollapseRaf = null;
    const onWindowScroll = () => {
      if (scrollCollapseRaf != null) return;
      scrollCollapseRaf = requestAnimationFrame(() => {
        scrollCollapseRaf = null;
        resetAllNavUnderlines();
      });
    };
    window.addEventListener("scroll", onWindowScroll, { passive: true });

    // attach listeners
    items.forEach((el) => {
      const underline = el.querySelector(".nav-underline");
      if (!underline) return;
      // set initial state
      gsap.set(underline, { scaleX: 0, transformOrigin: "left" });
      const onEnter = () => enter(underline);
      const onLeave = () => leave(underline);
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      // store for cleanup
      el._onEnter = onEnter;
      el._onLeave = onLeave;
    });

    return () => {
      if (scrollCollapseRaf != null) cancelAnimationFrame(scrollCollapseRaf);
      window.removeEventListener("scroll", onWindowScroll);
      tl.kill();
      // cleanup hover listeners
      const cleanupItems = queryNavItems();
      cleanupItems.forEach((el) => {
        if (el._onEnter) el.removeEventListener("mouseenter", el._onEnter);
        if (el._onLeave) el.removeEventListener("mouseleave", el._onLeave);
        delete el._onEnter;
        delete el._onLeave;
      });
      // cleanup logo part hover
      if (logoNode && logoNode._onEnterLogoPart) {
        logoNode.removeEventListener("mouseenter", logoNode._onEnterLogoPart);
        delete logoNode._onEnterLogoPart;
      }
    };
  }, [logoRef, navRef, shouldAnimate]);
}

