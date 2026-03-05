import { forwardRef } from "react";

/**
 * Reusable stats banner section: label, title, description, and stat cards (value + label).
 * @param {Object} props
 * @param {string} props.sectionLabel
 * @param {string} props.title
 * @param {string} props.description
 * @param {Array<{ value: string, label: string }>} props.items
 * @param {string} [props.dir]
 * @param {string} [props.classPrefix="im"]
 */
const ServiceStatsSection = forwardRef((props, ref) => {
  const { sectionLabel, title, description, items = [], dir, classPrefix = "im" } = props;
  const p = classPrefix;

  return (
    <section className={`${p}-section`} dir={dir}>
      <div className={`${p}-container`}>
        <div className="text-center max-w-2xl mx-auto mb-2">
          <span className={`${p}-label`}>{sectionLabel}</span>
          <h2 className={`${p}-title`}>{title}</h2>
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
