import { forwardRef } from "react";
import { useFontClass } from "../../../../hooks/useFontClass";
import {
  AnimatedSection,
  AnimatedTitle,
  AnimatedText,
  AnimatedGroup,
  AnimatedCard,
} from "@/components/animations";

const InfServicesGrid = forwardRef(({ label, title, description, services, footer }, ref) => {
  const { fontHeading } = useFontClass();

  return (
    <AnimatedSection ref={ref} className="inf-section">
      <div className="inf-container">
        <AnimatedText as="span" className="inf-label">{label}</AnimatedText>
        <AnimatedTitle as="h2" className={`inf-heading ${fontHeading}`} delay={0.05}>{title}</AnimatedTitle>
        <AnimatedText className="inf-desc" delay={0.1}>{description}</AnimatedText>

        <AnimatedGroup as="div" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.1}>
          {services.map((service, idx) => (
            <AnimatedCard
              key={service?.title || `service-${idx}`}
              className="inf-service-card"
            >
              <div className="inf-service-card__icon">{service.icon}</div>
              <h3 className="inf-service-card__title">{service.title}</h3>
              <p className="inf-service-card__text">{service.description}</p>
            </AnimatedCard>
          ))}
        </AnimatedGroup>

        {footer ? <AnimatedText className="inf-desc mt-10 mb-0 max-w-3xl" delay={0.2}>{footer}</AnimatedText> : null}
      </div>
    </AnimatedSection>
  );
});

InfServicesGrid.displayName = "InfServicesGrid";
export default InfServicesGrid;
