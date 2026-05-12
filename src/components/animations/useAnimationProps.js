import { useReducedMotion } from "framer-motion";
import { fadeUp, VIEWPORT } from "@/animations";
import { useInGroup } from "./animationContext";

/**
 * Centralizes the motion-prop wiring for every wrapper in
 * `/components/animations`.
 *
 *  - If the user prefers reduced motion → strips animation entirely.
 *  - If we're inside an `AnimatedGroup` → child mode: just pass `variants`
 *    so the parent's stagger orchestrates timing.
 *  - Otherwise → standalone mode: trigger via `whileInView` with the shared
 *    viewport config (`once: true, amount: 0.2`).
 *
 * @param {Object} [opts]
 * @param {import('framer-motion').Variants} [opts.variants] - Custom variants
 *   (falls back to `fadeUp`).
 * @param {number} [opts.delay=0] - Extra delay (s). Ignored in group mode —
 *   use stagger on the parent instead.
 * @param {Object} [opts.viewport] - Override viewport config.
 * @returns {Object} props to spread onto a `motion.*` component.
 */
export function useAnimationProps({ variants, delay = 0, viewport } = {}) {
  const prefersReducedMotion = useReducedMotion();
  const inGroup = useInGroup();

  if (prefersReducedMotion) {
    return {};
  }

  const resolvedVariants =
    variants ?? (typeof delay === "number" && delay > 0 ? fadeUp(delay) : fadeUp.default);

  if (inGroup) {
    return { variants: resolvedVariants };
  }

  return {
    variants: resolvedVariants,
    initial: "hidden",
    whileInView: "visible",
    viewport: viewport ?? VIEWPORT,
  };
}
