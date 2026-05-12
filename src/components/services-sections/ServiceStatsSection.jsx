import { forwardRef } from "react";
import { motion as Motion } from "framer-motion";
import { benefitsSection } from "@/helpers/framerMotion";

/**
 * Reusable stats banner section: label, title, description, and stat cards (value + label).
 * @param {Object} props
 * @param {string} props.sectionLabel
 * @param {string} props.title
 * @param {string} props.description
 * @param {Array<{ value: string, label: string }>} props.items
 * @param {string} [props.dir]
 * @param {string} [props.classPrefix="im"]
 * @param {boolean} [props.framer] - Framer Motion scroll reveals
 */
const ServiceStatsSection = forwardRef((props, ref) => {
  const { sectionLabel, title, description, items = [], dir, classPrefix = "im", framer } = props;
  const p = classPrefix;

  if (framer) {
    return (
      <section className={`${p}-section`} dir={dir}>
        <div className={`${p}-container`}>
          <Motion.div className="text-center max-w-2xl mx-auto mb-2" {...benefitsSection.headerWrap}>
            <span className={`${p}-label`}>{sectionLabel}</span>
            <h2 className={`${p}-title font-antonio`}>{title}</h2>
            <p className={`${p}-desc`}>{description}</p>
          </Motion.div>
          <div ref={ref} className={`${p}-stats-banner`}>
            {Array.isArray(items) &&
              items.map((s, i) => (
                <Motion.div key={i} className={`${p}-stat-card`} {...benefitsSection.item(i)}>
                  <span className={`${p}-stat-card__value`}>{s.value}</span>
                  <span className={`${p}-stat-card__label`}>{s.label}</span>
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
        <div className="text-center max-w-2xl mx-auto mb-2">
          <span className={`${p}-label`}>{sectionLabel}</span>
          <h2 className={`${p}-title font-antonio`}>{title}</h2>
          <p className={`${p}-desc`}>{description}</p>
        </div>
        <div ref={ref} className={`${p}-stats-banner`}>
          {Array.isArray(items) &&
            items.map((s, i) => (
              <div key={i} className={`${p}-stat-card`}>
                <span className={`${p}-stat-card__value`}>{s.value}</span>
                <span className={`${p}-stat-card__label`}>{s.label}</span>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
});

ServiceStatsSection.displayName = "ServiceStatsSection";

export default ServiceStatsSection;
