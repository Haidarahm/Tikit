import { forwardRef } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/animations";
import { useAnimationProps } from "./useAnimationProps";

/**
 * Animated paragraph / body text — fade-in by default (less movement than
 * titles so long copy doesn't feel busy).
 *
 *   <AnimatedText className="text-base">Lorem ipsum…</AnimatedText>
 *
 * @param {Object} props
 * @param {"p"|"span"|"div"|"li"} [props.as="p"]
 */
const AnimatedText = forwardRef(function AnimatedText(
  { as = "p", className, delay = 0, variants, viewport, children, ...rest },
  ref,
) {
  const Tag = motion[as] ?? motion.p;
  const animationProps = useAnimationProps({
    delay,
    variants: variants ?? (delay > 0 ? fadeIn(delay) : fadeIn.default),
    viewport,
  });

  return (
    <Tag ref={ref} className={className} {...animationProps} {...rest}>
      {children}
    </Tag>
  );
});

export default AnimatedText;
