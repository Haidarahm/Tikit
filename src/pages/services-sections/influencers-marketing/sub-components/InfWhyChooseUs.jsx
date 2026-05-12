import { forwardRef } from "react";
import { useFontClass } from "../../../../hooks/useFontClass";
import {
  AnimatedSection,
  AnimatedTitle,
  AnimatedText,
  AnimatedGroup,
  AnimatedCard,
} from "@/components/animations";

const InfWhyChooseUs = forwardRef(({ label, title, description, reasons, footerContent }, ref) => {
  const { fontHeading } = useFontClass();

  return (
    <AnimatedSection ref={ref} className="inf-section">
      <div className="inf-container">
        <AnimatedText as="span" className="inf-label">{label}</AnimatedText>
        <AnimatedTitle as="h2" className={`inf-heading ${fontHeading}`} delay={0.05}>{title}</AnimatedTitle>
        <AnimatedText className="inf-desc" delay={0.1}>{description}</AnimatedText>

        <AnimatedGroup as="div" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.1}>
          {reasons.map((reason, idx) => (
            <AnimatedCard
              key={reason?.title || `reason-${idx}`}
              className="inf-why-card"
            >
              <div className="inf-why-card__icon">{reason.icon}</div>
              <h3 className="inf-service-card__title">{reason.title}</h3>
              <p className="inf-service-card__text">{reason.description}</p>
            </AnimatedCard>
          ))}
        </AnimatedGroup>

        {footerContent ? (
          <AnimatedText as="div" className="mt-12" delay={0.2}>
            {footerContent}
          </AnimatedText>
        ) : null}
      </div>
    </AnimatedSection>
  );
});

InfWhyChooseUs.displayName = "InfWhyChooseUs";
export default InfWhyChooseUs;
