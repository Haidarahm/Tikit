import { motion } from "framer-motion";
import {
  dmSubpageContainerVariants as containerVariants,
  dmSubpageItemVariants as itemVariants,
  VIEWPORT_DM_SUBPAGE as viewport,
} from "@/helpers/framerMotion";
import ServiceCard from "../../../../components/ServiceCard";

/**
 * Grid of `ServiceCard` pillars with animated header (DM feature grid).
 *
 * @param {Array<{ key: string, title: string, description: string, icon: import('react').ComponentType<{ className?: string }> }>} pillars
 */
export default function DMServicePillarsSection({ title, subtitle, pillars, fontClass }) {
  const list = Array.isArray(pillars) ? pillars : [];

  return (
    <section className="dm-section dm-section-alt">
      <motion.div
        className="dm-container-wide"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={containerVariants}
      >
        <motion.h2 variants={itemVariants} className={`dm-section-title ${fontClass}`}>
          {title}
        </motion.h2>
        <motion.p variants={itemVariants} className="dm-section-subtitle">
          {subtitle}
        </motion.p>
        <div className="dm-feature-grid">
          {list.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <motion.div key={pillar.key} variants={itemVariants}>
                <ServiceCard
                  icon={Icon}
                  title={pillar.title}
                  description={pillar.description}
                  iconWrapperClassName="dm-card-icon"
                  iconClassName="w-8 h-8 text-white"
                  titleClassName="dm-card-title"
                  descriptionClassName="dm-card-desc"
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
