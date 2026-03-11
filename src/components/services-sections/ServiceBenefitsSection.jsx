import { forwardRef } from "react";

/**
 * Reusable benefits section with label, title, description, and benefit items (icon + title + text).
 * @param {Object} props
 * @param {string} props.sectionLabel
 * @param {string} props.title
 * @param {string} props.description
 * @param {Array<{ title: string, text: string }>} props.items
 * @param {React.ReactNode[]} props.icons
 * @param {string} [props.dir]
 * @param {string} [props.classPrefix="im"]
 */
const ServiceBenefitsSection = forwardRef((props, ref) => {
  const { sectionLabel, title, description, items = [], icons = [], dir, classPrefix = "im" } = props;
  const p = classPrefix;

  return (
    <section className={`${p}-section`} dir={dir}>
      <div className={`${p}-container`}>
        <div className="text-center max-w-2xl mx-auto mb-2">
          <span className={`${p}-label`}>{sectionLabel}</span>
          <h2 className={`${p}-title font-antonio`}>{title}</h2>
          <p className={`${p}-desc`}>{description}</p>
        </div>
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
