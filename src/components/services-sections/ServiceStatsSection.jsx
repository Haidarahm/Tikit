import { forwardRef } from "react";
import {
  AnimatedSection,
  AnimatedTitle,
  AnimatedText,
  AnimatedGroup,
  AnimatedCard,
} from "@/components/animations";

/**
 * Reusable stats banner section: label, title, description, and stat cards.
 */
const ServiceStatsSection = forwardRef((props, ref) => {
  const { sectionLabel, title, description, items = [], dir, classPrefix = "im" } = props;
  const p = classPrefix;

  return (
    <AnimatedSection className={`${p}-section`} dir={dir}>
      <div className={`${p}-container`}>
        <div className="text-center max-w-2xl mx-auto mb-2">
          <AnimatedText as="span" className={`${p}-label`}>{sectionLabel}</AnimatedText>
          <AnimatedTitle as="h2" className={`${p}-title font-antonio`} delay={0.05}>{title}</AnimatedTitle>
          <AnimatedText className={`${p}-desc`} delay={0.1}>{description}</AnimatedText>
        </div>
        <AnimatedGroup as="div" ref={ref} className={`${p}-stats-banner`} stagger={0.08}>
          {Array.isArray(items) &&
            items.map((s, i) => (
              <AnimatedCard key={i} className={`${p}-stat-card`}>
                <span className={`${p}-stat-card__value`}>{s.value}</span>
                <span className={`${p}-stat-card__label`}>{s.label}</span>
              </AnimatedCard>
            ))}
        </AnimatedGroup>
      </div>
    </AnimatedSection>
  );
});

ServiceStatsSection.displayName = "ServiceStatsSection";

export default ServiceStatsSection;
