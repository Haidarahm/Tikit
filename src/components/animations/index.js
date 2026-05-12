/**
 * Reusable animated wrapper components.
 *
 *   import {
 *     AnimatedSection,
 *     AnimatedGroup,
 *     AnimatedCard,
 *     AnimatedTitle,
 *     AnimatedText,
 *     AnimatedImage,
 *     AnimatedButton,
 *   } from "@/components/animations";
 *
 * Every wrapper:
 *   - is built on Framer Motion
 *   - supports `className`, `delay`, `variants`, `viewport`, polymorphic `as`
 *   - uses `whileInView` with `viewport={{ once: true, amount: 0.2 }}`
 *   - honors `useReducedMotion()` (no animation when the user opts out)
 *   - auto-detects when it's inside `AnimatedGroup` and joins the stagger
 *
 * Add new wrappers here when you need new patterns; they should consume the
 * shared variants from `/src/animations`.
 */

export { default as AnimatedSection } from "./AnimatedSection";
export { default as AnimatedGroup } from "./AnimatedGroup";
export { default as AnimatedCard } from "./AnimatedCard";
export { default as AnimatedTitle } from "./AnimatedTitle";
export { default as AnimatedText } from "./AnimatedText";
export { default as AnimatedImage } from "./AnimatedImage";
export { default as AnimatedButton } from "./AnimatedButton";
