import { forwardRef } from "react";
import { motion as Motion } from "framer-motion";

const viewport = { once: true, amount: 0.32, margin: "0px 0px -10% 0px" };

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
          <Motion.div
            className="text-center max-w-2xl mx-auto mb-2"
            initial={{ opacity: 0, x: -28, skewX: -2 }}
            whileInView={{ opacity: 1, x: 0, skewX: 0 }}
            viewport={viewport}
            transition={{ duration: 0.65, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {header}
          </Motion.div>
          <div ref={ref} className={`${p}-process-grid`}>
            {Array.isArray(steps) &&
              steps.map((s, i) => (
                <Motion.div
                  key={i}
                  className={`${p}-step-card`}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40, scale: 0.94 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={viewport}
                  transition={{
                    type: "spring",
                    stiffness: 95,
                    damping: 18,
                    delay: i * 0.08,
                  }}
                >
                  <Motion.div
                    className={`${p}-step-card__number`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.15 + i * 0.08 }}
                  >
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
