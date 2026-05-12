import { forwardRef } from "react";
import {
  AnimatedSection,
  AnimatedTitle,
  AnimatedText,
  AnimatedGroup,
  AnimatedCard,
} from "@/components/animations";

/**
 * Reusable "problems / why struggle" section with label, title, description,
 * and a card grid. Card grid uses `AnimatedGroup` so cards stagger in.
 */
const ServiceProblemsSection = forwardRef((props, ref) => {
  const { sectionLabel, title, description, items = [], icons = [], dir, classPrefix = "im" } = props;
  const p = classPrefix;

  return (
    <AnimatedSection className={`${p}-section ${p}-problems-section`} dir={dir}>
      <div className={`${p}-container`}>
        <div className="text-center max-w-2xl mx-auto mb-2">
          <AnimatedText as="span" className={`${p}-label`}>{sectionLabel}</AnimatedText>
          <AnimatedTitle as="h2" className={`${p}-title font-antonio`} delay={0.05}>{title}</AnimatedTitle>
          <AnimatedText className={`${p}-desc`} delay={0.1}>{description}</AnimatedText>
        </div>
        <AnimatedGroup as="div" ref={ref} className={`${p}-problems-grid`} stagger={0.12}>
          {Array.isArray(items) &&
            items.map((item, i) => (
              <AnimatedCard key={i} className={`${p}-problem-card`}>
                <div className={`${p}-problem-card__icon`}>{icons[i] ?? item.icon}</div>
                <h3 className={`${p}-problem-card__title font-antonio`}>{item.title}</h3>
                <p className={`${p}-problem-card__text`}>{item.text}</p>
              </AnimatedCard>
            ))}
        </AnimatedGroup>
      </div>
    </AnimatedSection>
  );
});

ServiceProblemsSection.displayName = "ServiceProblemsSection";

export default ServiceProblemsSection;
