/**
 * Shared transition primitives for the global animation system.
 *
 * Every variant in `/src/animations/*` builds on these constants so that
 * timing & easing stay consistent across the entire app.
 *
 * Usage:
 *   import { DURATION, EASE, makeTransition } from "@/animations";
 *
 *   const myVariant = {
 *     hidden: { opacity: 0 },
 *     visible: { opacity: 1, transition: makeTransition({ duration: DURATION.slow }) },
 *   };
 */

/** Standard durations (in seconds). Keep this list short and meaningful. */
export const DURATION = {
  fast: 0.25,
  base: 0.45,
  slow: 0.7,
  slower: 0.9,
};

/**
 * Cubic-bezier easings. Avoid string easings on Motion v12 — arrays work in
 * every renderer and play nicely with reduced-motion fallbacks.
 */
export const EASE = {
  /** Smooth ease-out — best for entering UI. */
  out: [0.16, 1, 0.3, 1],
  /** Soft in/out — best for hero / large blocks. */
  inOut: [0.65, 0, 0.35, 1],
  /** Slight bounce — best for cards / buttons. */
  spring: [0.34, 1.56, 0.64, 1],
};

/** Default viewport for `whileInView` triggers. */
export const VIEWPORT = { once: true, amount: 0.2 };

/**
 * Build a transition object with sensible defaults.
 *
 * @param {Object} [opts]
 * @param {number} [opts.duration=DURATION.base]
 * @param {number} [opts.delay=0]
 * @param {number[]|string} [opts.ease=EASE.out]
 * @returns {{ duration: number, delay: number, ease: number[]|string }}
 */
export const makeTransition = ({
  duration = DURATION.base,
  delay = 0,
  ease = EASE.out,
} = {}) => ({ duration, delay, ease });
