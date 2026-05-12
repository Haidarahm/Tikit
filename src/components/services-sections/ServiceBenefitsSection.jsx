import { forwardRef } from "react";
import { motion as Motion } from "framer-motion";

const viewport = { once: true, amount: 0.3, margin: "0px 0px -12% 0px" };

/**
 * Reusable benefits section with label, title, description, and benefit items (icon + title + text).
 * @param {boolean} [props.framer] - Framer Motion scroll reveals
 */
const ServiceBenefitsSection = forwardRef((props, ref) => {
  const { sectionLabel, title, description, items = [], icons = [], dir, classPrefix = "im", framer } = props;
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
      <section className={`${p}-section`} dir={dir}>
        <div className={`${p}-container`}>
          <Motion.div
            className="text-center max-w-2xl mx-auto mb-2"
            initial={{ opacity: 0, y: 36, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={viewport}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            <Motion.span
              className={`${p}-label`}
              initial={{ opacity: 0, letterSpacing: "0.32em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.18em" }}
              viewport={viewport}
              transition={{ duration: 0.65 }}
            >
              {sectionLabel}
            </Motion.span>
            <h2 className={`${p}-title font-antonio`}>{title}</h2>
            <p className={`${p}-desc`}>{description}</p>
          </Motion.div>
          <div ref={ref} className={`${p}-benefits-grid`}>
            {Array.isArray(items) &&
              items.map((b, i) => (
                <Motion.div
                  key={i}
                  className={`${p}-benefit-item`}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport}
                  transition={{
                    duration: 0.55,
                    delay: i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Motion.div
                    className={`${p}-benefit-item__icon`}
                    initial={{ rotate: -12, scale: 0.85 }}
                    whileInView={{ rotate: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 + i * 0.08 }}
                  >
                    {icons[i] ?? b.icon}
                  </Motion.div>
                  <div>
                    <h3 className={`${p}-benefit-item__title font-antonio`}>{b.title}</h3>
                    <p className={`${p}-benefit-item__text`}>{b.text}</p>
                  </div>
                </Motion.div>
              ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`${p}-section`} dir={dir}>
      <div className={`${p}-container`}>
        <div className="text-center max-w-2xl mx-auto mb-2">{header}</div>
        <div ref={ref} className={`${p}-benefits-grid`}>
          {Array.isArray(items) &&
            items.map((b, i) => (
              <div key={i} className={`${p}-benefit-item`}>
                <div className={`${p}-benefit-item__icon`}>{icons[i] ?? b.icon}</div>
                <div>
                  <h3 className={`${p}-benefit-item__title font-antonio`}>{b.title}</h3>
                  <p className={`${p}-benefit-item__text`}>{b.text}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
});

ServiceBenefitsSection.displayName = "ServiceBenefitsSection";

export default ServiceBenefitsSection;
