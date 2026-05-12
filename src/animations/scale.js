import { DURATION, EASE, makeTransition } from "./transition";

/**
 * Scale variants — pop / zoom entrance.
 *
 * Uses a slight overshoot easing (`EASE.spring`) by default to feel alive.
 */

const withDefault = (factory) => {
  factory.default = factory();
  return factory;
};

/** Soft scale in (0.92 → 1) + fade. Good default for cards / images. */
export const scaleIn = withDefault((delay = 0, duration = DURATION.base, from = 0.92) => ({
  hidden: { opacity: 0, scale: from },
  visible: {
    opacity: 1,
    scale: 1,
    transition: makeTransition({ duration, delay, ease: EASE.spring }),
  },
}));

/** Pop in (0.8 → 1) — more dramatic, good for icons / badges. */
export const popIn = withDefault((delay = 0, duration = DURATION.fast) => ({
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: makeTransition({ duration, delay, ease: EASE.spring }),
  },
}));
