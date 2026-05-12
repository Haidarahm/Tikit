import { forwardRef } from "react";
import {
  AnimatedSection,
  AnimatedTitle,
  AnimatedText,
  AnimatedGroup,
  AnimatedCard,
} from "@/components/animations";

/**
 * Reusable benefits section.
 */
const ServiceBenefitsSection = forwardRef((props, ref) => {
  const { sectionLabel, title, description, items = [], icons = [], dir, classPrefix = "im" } = props;
  const p = classPrefix;

  return (
    <AnimatedSection className={`${p}-section`} dir={dir}>
      <div className={`${p}-container`}>
        <div className="text-center max-w-2xl mx-auto mb-2">
          <AnimatedText as="span" className={`${p}-label`}>{sectionLabel}</AnimatedText>
          <AnimatedTitle as="h2" className={`${p}-title font-antonio`} delay={0.05}>{title}</AnimatedTitle>
          <AnimatedText className={`${p}-desc`} delay={0.1}>{description}</AnimatedText>
        </div>
        <AnimatedGroup as="div" ref={ref} className={`${p}-benefits-grid`} stagger={0.1}>
          {Array.isArray(items) &&
            items.map((b, i) => (
              <AnimatedCard key={i} className={`${p}-benefit-item`}>
                <div className={`${p}-benefit-item__icon`}>{icons[i] ?? b.icon}</div>
                <div>
                  <h3 className={`${p}-benefit-item__title font-antonio`}>{b.title}</h3>
                  <p className={`${p}-benefit-item__text`}>{b.text}</p>
                </div>
              </AnimatedCard>
            ))}
        </AnimatedGroup>
      </div>
    </AnimatedSection>
  );
});

ServiceBenefitsSection.displayName = "ServiceBenefitsSection";

export default ServiceBenefitsSection;
