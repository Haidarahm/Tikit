import { forwardRef } from "react";
import {
  AnimatedSection,
  AnimatedTitle,
  AnimatedText,
  AnimatedGroup,
  AnimatedCard,
} from "@/components/animations";

/**
 * Reusable process/steps section.
 */
const ServiceProcessSection = forwardRef((props, ref) => {
  const { sectionLabel, title, description, steps = [], dir, classPrefix = "im" } = props;
  const p = classPrefix;

  return (
    <AnimatedSection className={`${p}-section--alt`} dir={dir}>
      <div className={`${p}-container`}>
        <div className="text-center max-w-2xl mx-auto mb-2">
          <AnimatedText as="span" className={`${p}-label`}>{sectionLabel}</AnimatedText>
          <AnimatedTitle as="h2" className={`${p}-title font-antonio`} delay={0.05}>{title}</AnimatedTitle>
          <AnimatedText className={`${p}-desc`} delay={0.1}>{description}</AnimatedText>
        </div>
        <AnimatedGroup as="div" ref={ref} className={`${p}-process-grid`} stagger={0.1}>
          {Array.isArray(steps) &&
            steps.map((s, i) => (
              <AnimatedCard key={i} className={`${p}-step-card`}>
                <div className={`${p}-step-card__number`}>{s.n}</div>
                {s.badge != null && <span className={`${p}-step-card__badge`}>{s.badge}</span>}
                <h3 className={`${p}-step-card__title font-antonio`}>{s.title}</h3>
                <p className={`${p}-step-card__text`}>{s.text}</p>
              </AnimatedCard>
            ))}
        </AnimatedGroup>
      </div>
    </AnimatedSection>
  );
});

ServiceProcessSection.displayName = "ServiceProcessSection";

export default ServiceProcessSection;
