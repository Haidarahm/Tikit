import { gsap } from "gsap";

export const toArray = (val) => (Array.isArray(val) ? val : []);

export function revealChildren(containerRef, selector, staggerVal = 0.1) {
  if (!containerRef.current) return;
  const els = containerRef.current.querySelectorAll(selector);
  if (!els.length) return;

  gsap.fromTo(
    els,
    { opacity: 0, y: 36 },
    {
      opacity: 1,
      y: 0,
      duration: 0.75,
      stagger: staggerVal,
      ease: "power3.out",
      scrollTrigger: { trigger: containerRef.current, start: "top 82%" },
    }
  );
}
