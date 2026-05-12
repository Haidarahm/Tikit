import { forwardRef } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/animations";
import { useAnimationProps } from "./useAnimationProps";

/**
 * Animated heading — fadeUp by default. Use the `as` prop to render the
 * appropriate semantic level (`h1`, `h2`, `h3`, `span`).
 *
 *   <AnimatedTitle as="h2" className="text-4xl">Hello</AnimatedTitle>
 *
 * @param {Object} props
 * @param {"h1"|"h2"|"h3"|"h4"|"h5"|"h6"|"span"} [props.as="h2"]
 * @param {string} [props.className]
 * @param {number} [props.delay=0]
 * @param {import('framer-motion').Variants} [props.variants]
 * @param {Object} [props.viewport]
 * @param {React.ReactNode} props.children
 */
const AnimatedTitle = forwardRef(function AnimatedTitle(
  { as = "h2", className, delay = 0, variants, viewport, children, ...rest },
  ref,
) {
  const Tag = motion[as] ?? motion.h2;
  const animationProps = useAnimationProps({
    delay,
    variants: variants ?? (delay > 0 ? fadeUp(delay) : fadeUp.default),
    viewport,
  });

  return (
    <Tag ref={ref} className={className} {...animationProps} {...rest}>
      {children}
    </Tag>
  );
});

export default AnimatedTitle;
