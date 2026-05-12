import { forwardRef } from "react";
import { motion } from "framer-motion";
import { scaleIn } from "@/animations";
import { useAnimationProps } from "./useAnimationProps";

/**
 * Animated card — soft scale + fade. Ideal as a child of `AnimatedGroup`
 * so the group orchestrates a staggered grid reveal.
 *
 *   <AnimatedGroup className="grid grid-cols-3 gap-6">
 *     {items.map(it => <AnimatedCard key={it.id} className="card">{...}</AnimatedCard>)}
 *   </AnimatedGroup>
 *
 * @param {Object} props
 * @param {keyof JSX.IntrinsicElements} [props.as="div"]
 * @param {string} [props.className]
 * @param {number} [props.delay=0]
 * @param {import('framer-motion').Variants} [props.variants] - Override default scaleIn.
 * @param {Object} [props.viewport]
 * @param {React.ReactNode} props.children
 */
const AnimatedCard = forwardRef(function AnimatedCard(
  { as = "div", className, delay = 0, variants, viewport, children, ...rest },
  ref,
) {
  const Tag = motion[as] ?? motion.div;
  const animationProps = useAnimationProps({
    delay,
    variants: variants ?? (delay > 0 ? scaleIn(delay) : scaleIn.default),
    viewport,
  });

  return (
    <Tag ref={ref} className={className} {...animationProps} {...rest}>
      {children}
    </Tag>
  );
});

export default AnimatedCard;
