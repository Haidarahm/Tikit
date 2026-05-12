import { forwardRef } from "react";
import {
  AnimatedSection,
  AnimatedTitle,
  AnimatedText,
  AnimatedGroup,
  AnimatedCard,
} from "@/components/animations";

/**
 * Reusable "Why Us" section.
 */
const ServiceWhyUsSection = forwardRef((props, ref) => {
  const { sectionLabel, title, items = [], icons = [], dir, classPrefix = "im", microCta } = props;
  const p = classPrefix;

  const hasFooter = !!(microCta?.before || microCta?.highlight || microCta?.after);

  return (
    <AnimatedSection className={`${p}-section`} dir={dir}>
      <div className={`${p}-container `}>
        <div className="text-center max-w-2xl mx-auto mb-2">
          <AnimatedText as="span" className={`${p}-label`}>{sectionLabel}</AnimatedText>
          <AnimatedTitle as="h2" className={`${p}-title font-antonio`} delay={0.05}>{title}</AnimatedTitle>
        </div>
        <AnimatedGroup as="div" ref={ref} className="im-whyus-grid" stagger={0.1}>
          {Array.isArray(items) &&
            items.map((w, i) => (
              <AnimatedCard key={i} className="im-whyus-card">
                <div className="im-whyus-card__icon">{icons[i] ?? w.icon}</div>
                <h3 className="im-whyus-card__title font-antonio">{w.title}</h3>
                <p className="im-whyus-card__text">{w.text}</p>
              </AnimatedCard>
            ))}
        </AnimatedGroup>
        {hasFooter ? (
          <AnimatedText className={`${p}-whyus-footer`} delay={0.2}>
            {microCta?.before ? microCta.before : ""}
            {microCta?.highlight ? <strong>{microCta.highlight}</strong> : ""}
            {microCta?.after ? microCta.after : ""}
          </AnimatedText>
        ) : null}
      </div>
    </AnimatedSection>
  );
});

ServiceWhyUsSection.displayName = "ServiceWhyUsSection";

export default ServiceWhyUsSection;
