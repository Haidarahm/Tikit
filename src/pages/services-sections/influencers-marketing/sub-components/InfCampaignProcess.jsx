import { forwardRef } from "react";
import { motion as Motion } from "framer-motion";
import { influencerRevealItem, influencerSectionIntro } from "@/helpers/framerMotion";
import { useFontClass } from "../../../../hooks/useFontClass";

const InfCampaignProcess = forwardRef(({ label, title, description, steps }, ref) => {
  const { fontHeading } = useFontClass();

  return (
    <section ref={ref} className="inf-section">
      <div className="inf-container">
        <Motion.div {...influencerSectionIntro}>
          <span className="inf-label">{label}</span>
          <h2 className={`inf-heading ${fontHeading}`}>{title}</h2>
          <p className="inf-desc">{description}</p>
        </Motion.div>

        <div className="space-y-0">
          {steps.map((step, idx) => (
            <Motion.div
              key={step?.title || step?.description || JSON.stringify(step) || `step-${idx}`}
              className="inf-step pb-8"
              {...influencerRevealItem(idx, 0.12)}
            >
              {idx < steps.length - 1 && <div className="inf-step__line" />}
              <div className="inf-step__number">{idx + 1}</div>
              <div className="flex-1">
                <h3 className="inf-service-card__title">{step.title}</h3>
                {step.description ? <p className="inf-service-card__text">{step.description}</p> : null}
              </div>
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

InfCampaignProcess.displayName = "InfCampaignProcess";
export default InfCampaignProcess;
