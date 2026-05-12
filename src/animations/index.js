/**
 * Global animation system — single import surface.
 *
 *   import { fadeUp, slideLeft, scaleIn, staggerContainer, VIEWPORT } from "@/animations";
 *
 * Architecture
 * ------------
 *   /animations/transition.js  → DURATION, EASE, VIEWPORT, makeTransition()
 *   /animations/fade.js        → fadeIn, fadeUp, fadeDown
 *   /animations/slide.js       → slideLeft, slideRight
 *   /animations/scale.js       → scaleIn, popIn
 *   /animations/stagger.js     → staggerContainer
 *
 * Reusable wrappers that consume these variants live in
 * `/src/components/animations/`.
 *
 * Adding a new variant
 * --------------------
 *   1. Create the variant factory in the appropriate file (fade / slide /
 *      scale / new file).
 *   2. Use `makeTransition()` so it inherits centralized timing.
 *   3. Re-export it below.
 */

export * from "./transition";
export * from "./fade";
export * from "./slide";
export * from "./scale";
export * from "./stagger";
