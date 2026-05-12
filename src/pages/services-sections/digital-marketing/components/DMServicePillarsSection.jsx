import ServiceCard from "../../../../components/ServiceCard";
import {
  MotionDiv,
  MotionH2,
  MotionP,
  dmContainerVariants as containerVariants,
  dmItemVariants as itemVariants,
  dmViewport as viewport,
} from "../dmMotion";

/**
 * Grid of `ServiceCard` pillars with animated header (DM feature grid).
 *
 * @param {Array<{ key: string, title: string, description: string, icon: import('react').ComponentType<{ className?: string }> }>} pillars
 */
export default function DMServicePillarsSection({ title, subtitle, pillars, fontClass }) {
  const list = Array.isArray(pillars) ? pillars : [];

  return (
    <section className="dm-section dm-section-alt">
      <MotionDiv
        className="dm-container-wide"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={containerVariants}
      >
        <MotionH2 variants={itemVariants} className={`dm-section-title ${fontClass}`}>
          {title}
        </MotionH2>
        <MotionP variants={itemVariants} className="dm-section-subtitle">
          {subtitle}
        </MotionP>
        <div className="dm-feature-grid">
          {list.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <MotionDiv key={pillar.key} variants={itemVariants}>
                <ServiceCard
                  icon={Icon}
                  title={pillar.title}
                  description={pillar.description}
                  iconWrapperClassName="dm-card-icon"
                  iconClassName="w-8 h-8 text-white"
                  titleClassName="dm-card-title"
                  descriptionClassName="dm-card-desc"
                />
              </MotionDiv>
            );
          })}
        </div>
      </MotionDiv>
    </section>
  );
}
