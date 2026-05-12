import ServiceCard from "../../../../components/ServiceCard";
import {
  AnimatedSection,
  AnimatedTitle,
  AnimatedText,
  AnimatedGroup,
  AnimatedCard,
} from "@/components/animations";

/**
 * Grid of `ServiceCard` pillars (DM feature grid).
 *
 * @param {Array<{ key: string, title: string, description: string, icon: import('react').ComponentType<{ className?: string }> }>} pillars
 */
export default function DMServicePillarsSection({ title, subtitle, pillars, fontClass }) {
  const list = Array.isArray(pillars) ? pillars : [];

  return (
    <AnimatedSection className="dm-section dm-section-alt">
      <div className="dm-container-wide">
        <AnimatedTitle as="h2" className={`dm-section-title ${fontClass}`}>{title}</AnimatedTitle>
        <AnimatedText className="dm-section-subtitle" delay={0.05}>{subtitle}</AnimatedText>
        <AnimatedGroup as="div" className="dm-feature-grid" stagger={0.1}>
          {list.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <AnimatedCard key={pillar.key}>
                <ServiceCard
                  icon={Icon}
                  title={pillar.title}
                  description={pillar.description}
                  iconWrapperClassName="dm-card-icon"
                  iconClassName="w-8 h-8 text-white"
                  titleClassName="dm-card-title"
                  descriptionClassName="dm-card-desc"
                />
              </AnimatedCard>
            );
          })}
        </AnimatedGroup>
      </div>
    </AnimatedSection>
  );
}
