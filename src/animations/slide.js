import { DURATION, EASE, makeTransition } from "./transition";

/**
 * Slide variants — horizontal entrance animations.
 *
 *   <motion.div variants={slideLeft()} />
 *   <motion.div variants={slideRight(0.1)} />
 */

const withDefault = (factory) => {
  factory.default = factory();
  return factory;
};

/** Slide in from the left (i.e. starts at -distance, ends at 0). */
export const slideLeft = withDefault((delay = 0, duration = DURATION.base, distance = 40) => ({
  hidden: { opacity: 0, x: -distance },
  visible: {
    opacity: 1,
    x: 0,
    transition: makeTransition({ duration, delay, ease: EASE.out }),
  },
}));

/** Slide in from the right. */
export const slideRight = withDefault((delay = 0, duration = DURATION.base, distance = 40) => ({
  hidden: { opacity: 0, x: distance },
  visible: {
    opacity: 1,
    x: 0,
    transition: makeTransition({ duration, delay, ease: EASE.out }),
  },
}));
