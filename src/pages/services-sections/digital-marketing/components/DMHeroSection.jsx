import HeroWithBadge from "../../../../components/HeroWithBadge";
import {
  MotionDiv,
  MotionP,
  dmContainerVariants as containerVariants,
  dmItemVariants as itemVariants,
  dmViewport as viewport,
} from "../dmMotion";

/**
 * DM subpage hero: gradient overlay, badge title, optional secondary line + CTA.
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
  return (
    <section className="dm-hero">
      <div className="dm-hero-overlay">
        <div className="dm-hero-gradient" />
      </div>
      <MotionDiv
        className="dm-hero-content relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={containerVariants}
      >
        <MotionDiv variants={itemVariants}>
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
        </MotionDiv>
        {heroSecondary ? (
          <MotionP
            variants={itemVariants}
            className="dm-hero-desc dm-hero-desc--secondary mt-6"
          >
            {heroSecondary}
          </MotionP>
        ) : null}
        {heroCta ? (
          <MotionDiv variants={itemVariants} className="mt-10 flex justify-center">
            <a href={ctaHref} className="dm-cta-btn">
              {heroCta}
            </a>
          </MotionDiv>
        ) : null}
      </MotionDiv>
    </section>
  );
}
