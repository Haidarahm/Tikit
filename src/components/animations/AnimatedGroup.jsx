import { forwardRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { staggerContainer, VIEWPORT } from "@/animations";
import { AnimationGroupContext } from "./animationContext";

/**
 * Stagger container for card grids / lists.
 *
 * Children that are wrappers from this folder (`AnimatedCard`, `AnimatedTitle`,
 * etc.) automatically detect they're inside this group and switch to
 * "child mode": no own `initial`/`whileInView`, so the group orchestrates the
 * stagger sequence on its own viewport trigger.
 *
 *   <AnimatedGroup as="ul" className="grid grid-cols-3 gap-6" stagger={0.1}>
 *     {items.map(item => <AnimatedCard key={item.id}>{...}</AnimatedCard>)}
 *   </AnimatedGroup>
 *
 * @param {Object} props
 * @param {keyof JSX.IntrinsicElements} [props.as="div"] - HTML tag to render.
 * @param {string} [props.className]
 * @param {number} [props.stagger=0.08] - Delay between children (s).
 * @param {number} [props.delayChildren=0.05] - Initial delay before first child.
 * @param {Object} [props.viewport] - Override viewport config.
 * @param {import('framer-motion').Variants} [props.variants] - Override variants.
 * @param {React.ReactNode} props.children
 */
const AnimatedGroup = forwardRef(function AnimatedGroup(
  {
    as = "div",
    className,
    stagger = 0.08,
    delayChildren = 0.05,
    viewport,
    variants,
    children,
    ...rest
  },
  ref,
) {
  const prefersReducedMotion = useReducedMotion();
  const Tag = motion[as] ?? motion.div;

  if (prefersReducedMotion) {
    const Plain = as;
    return (
      <Plain ref={ref} className={className} {...rest}>
        <AnimationGroupContext.Provider value={false}>
          {children}
        </AnimationGroupContext.Provider>
      </Plain>
    );
  }

  return (
    <Tag
      ref={ref}
      className={className}
      variants={variants ?? staggerContainer({ stagger, delayChildren })}
      initial="hidden"
      whileInView="visible"
      viewport={viewport ?? VIEWPORT}
      {...rest}
    >
      <AnimationGroupContext.Provider value={true}>
        {children}
      </AnimationGroupContext.Provider>
    </Tag>
  );
});

export default AnimatedGroup;
