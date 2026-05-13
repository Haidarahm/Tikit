import { forwardRef } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/animations";
import { useAnimationProps } from "./useAnimationProps";

/**
 * Animated button / link — fade + slight slide on enter, scale on hover/tap.
 *
 *   <AnimatedButton onClick={…}>Click me</AnimatedButton>
 *   <AnimatedButton as="a" href="/contact">Contact</AnimatedButton>
 *
 * Hover/tap micro-interactions are skipped automatically when the user
 * prefers reduced motion (via `useAnimationProps`).
 *
 * @param {Object} props
 * @param {"button"|"a"} [props.as="button"] - Render as `<button>` or `<a>`.
 * @param {string} [props.className]
 * @param {number} [props.delay=0]
 * @param {import('framer-motion').Variants} [props.variants]
 * @param {Object} [props.viewport]
 * @param {React.ReactNode} props.children
 */
const AnimatedButton = forwardRef(function AnimatedButton(
  {
    as = "button",
    className,
    delay = 0,
    variants,
    viewport,
    children,
    whileHover,
    whileTap,
    ...rest
  },
  ref,
) {
  const Tag = as === "a" ? motion.a : motion.button;
  const animationProps = useAnimationProps({
    delay,
    variants: variants ?? (delay > 0 ? fadeUp(delay, 0.35, 12) : fadeUp(0, 0.35, 12)),
    viewport,
  });

  const hasMotion = Boolean(animationProps.variants);
  const useSurface = Boolean(className);

  return (
    <Tag
      ref={ref}
      className={useSurface ? "im-animated-button-root inline-block" : className}
      {...animationProps}
      {...(hasMotion
        ? {
            whileHover: whileHover ?? { scale: 1.03 },
            whileTap: whileTap ?? { scale: 0.97 },
          }
        : {})}
      {...rest}
    >
      {useSurface ? <span className={className}>{children}</span> : children}
    </Tag>
  );
});

export default AnimatedButton;
