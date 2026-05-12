import { forwardRef } from "react";
import { useFontClass } from "../../../../hooks/useFontClass";
import {
  AnimatedSection,
  AnimatedTitle,
  AnimatedText,
  AnimatedGroup,
  AnimatedCard,
} from "@/components/animations";

const InfCampaignProcess = forwardRef(({ label, title, description, steps }, ref) => {
  const { fontHeading } = useFontClass();

  return (
    <AnimatedSection ref={ref} className="inf-section">
      <div className="inf-container">
        <AnimatedText as="span" className="inf-label">{label}</AnimatedText>
        <AnimatedTitle as="h2" className={`inf-heading ${fontHeading}`} delay={0.05}>{title}</AnimatedTitle>
        <AnimatedText className="inf-desc" delay={0.1}>{description}</AnimatedText>

        <AnimatedGroup as="div" className="space-y-0" stagger={0.12}>
          {steps.map((step, idx) => (
            <AnimatedCard
              key={step?.title || step?.description || `step-${idx}`}
              className="inf-step pb-8"
            >
              {idx < steps.length - 1 && <div className="inf-step__line" />}
              <div className="inf-step__number">{idx + 1}</div>
              <div className="flex-1">
                <h3 className="inf-service-card__title">{step.title}</h3>
                {step.description ? <p className="inf-service-card__text">{step.description}</p> : null}
              </div>
            </AnimatedCard>
          ))}
        </AnimatedGroup>
      </div>
    </AnimatedSection>
  );
});

InfCampaignProcess.displayName = "InfCampaignProcess";
export default InfCampaignProcess;
