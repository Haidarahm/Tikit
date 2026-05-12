import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, makeTransition, DURATION, EASE } from "@/animations";
import HeroWithBadge from "../../../../components/HeroWithBadge";

/**
 * DM subpage hero: gradient overlay, badge title, optional secondary line + CTA.
 *
 * Hero content fades + slides up on mount (so users see it without scrolling).
 */
export default function DMHeroSection({
  badge,
  title,
  mainWord,
  description,
  heroSecondary,
  heroCta,
  ctaHref = "/contact-us",
}) {
  const prefersReducedMotion = useReducedMotion();

  const mountAnim = (variant) =>
    prefersReducedMotion
      ? {}
      : { variants: variant, initial: "hidden", animate: "visible" };

  return (
    <section className="dm-hero">
      <div className="dm-hero-overlay">
        <div className="dm-hero-gradient" />
      </div>
      <div className="dm-hero-content relative z-10">
        <motion.div
          {...(prefersReducedMotion
            ? {}
            : {
                initial: { opacity: 0, y: 24 },
                animate: { opacity: 1, y: 0 },
                transition: makeTransition({ duration: DURATION.slow, ease: EASE.out }),
              })}
        >
          <HeroWithBadge
            badge={badge}
            title={title}
            mainWord={mainWord}
            description={description}
            titleClassName="block"
            descriptionClassName="dm-hero-desc"
            contentClassName="relative z-10 max-w-6xl mx-auto text-center mt-6"
            disableAnimation
          />
        </motion.div>
        {heroSecondary ? (
          <motion.p className="dm-hero-desc dm-hero-desc--secondary mt-6" {...mountAnim(fadeUp(0.25))}>
            {heroSecondary}
          </motion.p>
        ) : null}
        {heroCta ? (
          <motion.div className="mt-10 flex justify-center" {...mountAnim(fadeUp(0.35))}>
            <motion.a
              href={ctaHref}
              className="dm-cta-btn"
              {...(prefersReducedMotion ? {} : { whileHover: { scale: 1.03 }, whileTap: { scale: 0.97 } })}
            >
              {heroCta}
            </motion.a>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
