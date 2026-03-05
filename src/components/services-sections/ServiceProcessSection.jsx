import { forwardRef } from "react";

/**
 * Reusable process/steps section with label, title, description, and step cards.
 * @param {Object} props
 * @param {string} props.sectionLabel
 * @param {string} props.title
 * @param {string} props.description
 * @param {Array<{ n: string, title: string, text: string }>} props.steps
 * @param {string} [props.dir]
 */
const ServiceProcessSection = forwardRef((props, ref) => {
  const { sectionLabel, title, description, steps = [], dir } = props;

  return (
    <section className="im-section--alt" dir={dir}>
      <div className="im-container">
        <div className="text-center max-w-2xl mx-auto mb-2">
          <span className="im-section-label">{sectionLabel}</span>
          <h2 className="im-section-title">{title}</h2>
          <p className="im-section-desc">{description}</p>
        </div>
        <div ref={ref} className="im-steps">
          {Array.isArray(steps) &&
            steps.map((s, i) => (
              <div key={i} className="im-step-card">
                <div className="im-step-card__number">{s.n}</div>
                <h3 className="im-step-card__title">{s.title}</h3>
                <p className="im-step-card__text">{s.text}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
});

ServiceProcessSection.displayName = "ServiceProcessSection";

export default ServiceProcessSection;
