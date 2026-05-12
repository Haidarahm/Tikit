import { forwardRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeIn, fadeUp, scaleIn, makeTransition, DURATION, EASE } from "@/animations";
import TikitTitle from "../TikitTitle";

/**
 * Reusable hero section for service pages.
 *
 * The hero is critical content (LCP), so it animates on mount — not on
 * scroll. Everything is wired through the global animation system:
 *   - background image: `scaleIn`
 *   - badge:            `fadeIn`
 *   - title:            `fadeUp`
 *   - description:      `fadeUp` (delayed)
 *
 * @param {Object} props - See JSDoc inline.
 */
const ServiceHeroSection = forwardRef((props, ref) => {
  const {
    imageSrc,
    imageAlt,
    badge,
    badgeVariant = "pulse",
    title,
    mainWord,
    description,
    heroClassName = "",
    dataNavColor,
    classPrefix = "im",
    imageWidth = 1920,
    imageHeight = 1080,
    imageSizes,
    imageSrcSet,
  } = props;
  const p = classPrefix;
  const prefersReducedMotion = useReducedMotion();

  const mountAnim = (variant) =>
    prefersReducedMotion
      ? {}
      : { variants: variant, initial: "hidden", animate: "visible" };

  return (
    <section
      className={`${p}-hero ${heroClassName}`.trim()}
      {...(dataNavColor != null ? { "data-nav-color": dataNavColor } : {})}
    >
      <div className={`${p}-hero__image-wrapper`}>
        <motion.img
          src={imageSrc}
          alt={imageAlt}
          className={`${p}-hero__image`}
          width={imageWidth}
          height={imageHeight}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          {...(imageSizes ? { sizes: imageSizes } : {})}
          {...(imageSrcSet ? { srcSet: imageSrcSet } : {})}
          {...mountAnim(scaleIn(0, DURATION.slower, 1.05))}
        />
        <div className={`${p}-hero__overlay`} />
        <div className={`${p}-hero__mesh`} />
        <div className={`${p}-hero__orb ${p}-hero__orb--one`} />
        <div className={`${p}-hero__orb ${p}-hero__orb--two`} />
      </div>
      <div ref={ref} className={`${p}-hero__inner`}>
        <div className={`${p}-hero__content-card`}>
          {badge ? (
            <motion.span
              className={`${p}-hero__badge ${badgeVariant === "pulse" ? `${p}-hero__badge--pulse` : ""}`}
              {...mountAnim(fadeIn(0.1))}
            >
              <span className={`${p}-hero__badge-dot`} />
              {badge}
            </motion.span>
          ) : null}

          <motion.div
            {...(prefersReducedMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 24 },
                  animate: { opacity: 1, y: 0 },
                  transition: makeTransition({ duration: DURATION.slow, delay: 0.2, ease: EASE.out }),
                })}
          >
            <TikitTitle
              title={title}
              mainWord={mainWord}
              disableAnimation
              className={`${p}-hero__title hero-animate block font-antonio`}
            />
          </motion.div>

          {description ? (
            <motion.p className={`${p}-hero__description`} {...mountAnim(fadeUp(0.35))}>
              {description}
            </motion.p>
          ) : null}

          <div className={`${p}-hero__scroll-indicator`} aria-hidden="true">
            <span className={`${p}-hero__scroll-line`} />
          </div>
        </div>
      </div>
    </section>
  );
});

ServiceHeroSection.displayName = "ServiceHeroSection";

export default ServiceHeroSection;
