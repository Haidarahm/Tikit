import { forwardRef } from "react";
import { motion as Motion } from "framer-motion";
import { processSection } from "@/helpers/framerMotion";

/**
 * Reusable process/steps section with label, title, description, and step cards.
 * @param {boolean} [props.framer] - Framer Motion scroll reveals
 */
const ServiceProcessSection = forwardRef((props, ref) => {
  const { sectionLabel, title, description, steps = [], dir, classPrefix = "im", framer } = props;
  const p = classPrefix;

  const header = (
    <>
      <span className={`${p}-label`}>{sectionLabel}</span>
      <h2 className={`${p}-title font-antonio`}>{title}</h2>
      <p className={`${p}-desc`}>{description}</p>
    </>
  );

  if (framer) {
    return (
      <section className={`${p}-section--alt`} dir={dir}>
        <div className={`${p}-container`}>
          <Motion.div className="text-center max-w-2xl mx-auto mb-2" {...processSection.header}>
            {header}
          </Motion.div>
          <div ref={ref} className={`${p}-process-grid`}>
            {Array.isArray(steps) &&
              steps.map((s, i) => (
                <Motion.div key={i} className={`${p}-step-card`} {...processSection.stepCard(i)}>
                  <Motion.div className={`${p}-step-card__number`} {...processSection.stepNumber(i)}>
                    {s.n}
                  </Motion.div>
                  {s.badge != null && <span className={`${p}-step-card__badge`}>{s.badge}</span>}
                  <h3 className={`${p}-step-card__title font-antonio`}>{s.title}</h3>
                  <p className={`${p}-step-card__text`}>{s.text}</p>
                </Motion.div>
              ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`${p}-section--alt`} dir={dir}>
      <div className={`${p}-container`}>
        <div className="text-center max-w-2xl mx-auto mb-2">{header}</div>
        <div ref={ref} className={`${p}-process-grid`}>
          {Array.isArray(steps) &&
            steps.map((s, i) => (
              <div key={i} className={`${p}-step-card`}>
                <div className={`${p}-step-card__number`}>{s.n}</div>
                {s.badge != null && <span className={`${p}-step-card__badge`}>{s.badge}</span>}
                <h3 className={`${p}-step-card__title font-antonio`}>{s.title}</h3>
                <p className={`${p}-step-card__text`}>{s.text}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
});

ServiceProcessSection.displayName = "ServiceProcessSection";

export default ServiceProcessSection;
