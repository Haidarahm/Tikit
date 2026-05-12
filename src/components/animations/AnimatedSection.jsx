import { forwardRef } from "react";
import { motion } from "framer-motion";
import { useAnimationProps } from "./useAnimationProps";

/**
 * Animated section wrapper — fades + slides up into view.
 *
 *   <AnimatedSection className="my-12">…</AnimatedSection>
 *
 * @param {Object} props
 * @param {keyof JSX.IntrinsicElements} [props.as="section"]
 * @param {string} [props.className]
 * @param {number} [props.delay=0] - Extra delay before animation starts (s).
 * @param {import('framer-motion').Variants} [props.variants] - Override default fadeUp.
 * @param {Object} [props.viewport]
 * @param {React.ReactNode} props.children
 */
const AnimatedSection = forwardRef(function AnimatedSection(
  { as = "section", className, delay = 0, variants, viewport, children, ...rest },
  ref,
) {
  const Tag = motion[as] ?? motion.section;
  const animationProps = useAnimationProps({ delay, variants, viewport });

  return (
    <Tag ref={ref} className={className} {...animationProps} {...rest}>
      {children}
    </Tag>
  );
});

export default AnimatedSection;
