import { forwardRef } from "react";
import { motion } from "framer-motion";
import { scaleIn } from "@/animations";
import { useAnimationProps } from "./useAnimationProps";

/**
 * Animated `<img>` — gentle scale + fade reveal.
 *
 *   <AnimatedImage src="/hero.webp" alt="…" className="w-full rounded-xl" />
 *
 * Props are the standard `<img>` attributes plus animation knobs.
 *
 * @param {Object} props
 * @param {string} props.src
 * @param {string} [props.alt=""]
 * @param {string} [props.className]
 * @param {number} [props.delay=0]
 * @param {import('framer-motion').Variants} [props.variants]
 * @param {Object} [props.viewport]
 */
const AnimatedImage = forwardRef(function AnimatedImage(
  { src, alt = "", className, delay = 0, variants, viewport, ...rest },
  ref,
) {
  const animationProps = useAnimationProps({
    delay,
    variants: variants ?? (delay > 0 ? scaleIn(delay) : scaleIn.default),
    viewport,
  });

  return (
    <motion.img
      ref={ref}
      src={src}
      alt={alt}
      className={className}
      {...animationProps}
      {...rest}
    />
  );
});

export default AnimatedImage;
