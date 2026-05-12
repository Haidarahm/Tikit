import { forwardRef } from "react";
import { LocaleLink as Link } from "@/components/LocaleLink.jsx";
import { FiArrowRight } from "react-icons/fi";
import {
  AnimatedSection,
  AnimatedTitle,
  AnimatedText,
  AnimatedGroup,
  AnimatedCard,
} from "@/components/animations";

/**
 * Reusable sub-services grid.
 *
 * Cards are wrapped in `AnimatedCard` (which is a `motion.div`); the actual
 * navigation is the inner `<Link>`. This keeps the staggered reveal while
 * preserving full anchor semantics.
 */
const ServiceSubServicesSection = forwardRef((props, ref) => {
  const {
    sectionLabel,
    title,
    description,
    learnMoreText,
    items = [],
    hrefs = [],
    icons = [],
    dir,
    classPrefix = "im",
  } = props;
  const p = classPrefix;

  return (
    <AnimatedSection className={`${p}-section--alt`} dir={dir}>
      <div className={`${p}-container`}>
        <div className="text-center max-w-2xl mx-auto mb-2">
          <AnimatedText as="span" className={`${p}-label`}>{sectionLabel}</AnimatedText>
          <AnimatedTitle as="h2" className={`${p}-title font-antonio`} delay={0.05}>{title}</AnimatedTitle>
          <AnimatedText className={`${p}-desc`} delay={0.1}>{description}</AnimatedText>
        </div>
        <AnimatedGroup as="div" ref={ref} className={`${p}-subservices-grid`} stagger={0.1}>
          {Array.isArray(items) &&
            items.map((s, i) => (
              <AnimatedCard key={hrefs[i] ?? s.href ?? i}>
                <Link to={hrefs[i] ?? s.href ?? "#"} className={`${p}-subservice-card`}>
                  <div className={`${p}-subservice-card__icon`}>{icons[i] ?? s.icon}</div>
                  <h3 className={`${p}-subservice-card__title font-antonio`}>{s.title}</h3>
                  <p className={`${p}-subservice-card__desc`}>{s.desc}</p>
                  <span className={`${p}-subservice-card__cta`}>
                    {learnMoreText ?? s.cta} <FiArrowRight />
                  </span>
                </Link>
              </AnimatedCard>
            ))}
        </AnimatedGroup>
      </div>
    </AnimatedSection>
  );
});

ServiceSubServicesSection.displayName = "ServiceSubServicesSection";

export default ServiceSubServicesSection;
