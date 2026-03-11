import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

/**
 * Animate text characters in stagger once parent enters viewport.
 */
export function useStaggeredLetters({
  parentRef,
  targetSelector = ".js-stagger-letters",
  type = "chars",
  y = 50,
  opacity = 0,
  stagger = 0.03,
  duration = 0.6,
  ease = "back.out(1.7)",
  threshold = 0.2,
  rootMargin = "0px 0px -10% 0px",
  once = true,
}) {
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    const parentEl = parentRef?.current;
    if (!parentEl) return undefined;

    let observer;
    let splits = [];
    let ctx;

    const play = () => {
      if (once && hasPlayedRef.current) return;

      splits.forEach((split) => split?.revert?.());
      splits = [];

      const targets = Array.from(parentEl.querySelectorAll(targetSelector));
      if (!targets.length) return;

      splits = targets.map((el) => SplitText.create(el, { type }));
      const chars = splits.flatMap((split) => split?.chars ?? []);
      if (!chars.length) return;

      ctx = gsap.context(() => {
        gsap.from(chars, {
          y,
          opacity,
          stagger,
          duration,
          ease,
          clearProps: "transform,opacity",
        });
      }, parentEl);

      hasPlayedRef.current = true;
      if (once) observer?.disconnect();
    };

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play();
      },
      { threshold, rootMargin }
    );

    observer.observe(parentEl);

    return () => {
      observer?.disconnect();
      ctx?.revert();
      splits.forEach((split) => split?.revert?.());
    };
  }, [
    parentRef,
    targetSelector,
    type,
    y,
    opacity,
    stagger,
    duration,
    ease,
    threshold,
    rootMargin,
    once,
  ]);
}

