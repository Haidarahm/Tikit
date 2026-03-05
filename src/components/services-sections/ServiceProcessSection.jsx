import { forwardRef } from "react";

/**
 * Reusable process/steps section with label, title, description, and step cards.
 * @param {Object} props
 * @param {string} props.sectionLabel
 * @param {string} props.title
 * @param {string} props.description
 * @param {Array<{ n: string, badge?: string, title: string, text: string }>} props.steps
 * @param {string} [props.dir]
 * @param {string} [props.classPrefix="im"]
 */
const ServiceProcessSection = forwardRef((props, ref) => {
  const { sectionLabel, title, description, steps = [], dir, classPrefix = "im" } = props;
  const p = classPrefix;

  return (
    <section className={`${p}-section--alt`} dir={dir}>
      <div className={`${p}-container`}>
        <div className="text-center max-w-2xl mx-auto mb-2">
          <span className={`${p}-label`}>{sectionLabel}</span>
          <h2 className={`${p}-title`}>{title}</h2>
          <p className={`${p}-desc`}>{description}</p>
        </div>
        <div ref={ref} className={`${p}-process-grid`}>
          {Array.isArray(steps) &&
            steps.map((s, i) => (
              <div key={i} className={`${p}-step-card`}>
                <div className={`${p}-step-card__number`}>{s.n}</div>
                {s.badge != null && <span className={`${p}-step-card__badge`}>{s.badge}</span>}
                <h3 className={`${p}-step-card__title`}>{s.title}</h3>
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
