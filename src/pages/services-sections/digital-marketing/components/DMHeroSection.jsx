import { motion } from "framer-motion";
import {
  dmSubpageContainerVariants as containerVariants,
  dmSubpageItemVariants as itemVariants,
  VIEWPORT_DM_SUBPAGE as viewport,
} from "@/helpers/framerMotion";
import HeroWithBadge from "../../../../components/HeroWithBadge";

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
      <motion.div
        className="dm-hero-content relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
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
          <motion.p
            variants={itemVariants}
            className="dm-hero-desc dm-hero-desc--secondary mt-6"
          >
            {heroSecondary}
          </motion.p>
        ) : null}
        {heroCta ? (
          <motion.div variants={itemVariants} className="mt-10 flex justify-center">
            <a href={ctaHref} className="dm-cta-btn">
              {heroCta}
            </a>
          </motion.div>
        ) : null}
      </motion.div>
    </section>
  );
}
