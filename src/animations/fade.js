import { DURATION, EASE, makeTransition } from "./transition";

/**
 * Fade variants — opacity-only and opacity + Y-offset.
 *
 * Both come as factory functions so they accept an optional `delay`.
 * The factory pattern keeps consumer code one-liner clean:
 *
 *   <motion.div variants={fadeUp(0.1)} />
 *
 * Each factory also exposes a `.default` static for the most common usage,
 * so JSX can stay terse:
 *
 *   <motion.div variants={fadeUp.default} />
 */

const withDefault = (factory) => {
  factory.default = factory();
  return factory;
};

/** Fade in only (no movement). */
export const fadeIn = withDefault((delay = 0, duration = DURATION.base) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: makeTransition({ duration, delay, ease: EASE.out }),
  },
}));

/** Fade in + slide up. Default offset is 24px. */
export const fadeUp = withDefault((delay = 0, duration = DURATION.base, distance = 24) => ({
  hidden: { opacity: 0, y: distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: makeTransition({ duration, delay, ease: EASE.out }),
  },
}));

/** Fade in + slide down. */
export const fadeDown = withDefault((delay = 0, duration = DURATION.base, distance = 24) => ({
  hidden: { opacity: 0, y: -distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: makeTransition({ duration, delay, ease: EASE.out }),
  },
}));
