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
 */
const ServiceBenefitsSection = forwardRef((props, ref) => {
  const { sectionLabel, title, description, items = [], icons = [], dir } = props;

  return (
    <section className="im-section" dir={dir}>
      <div className="im-container">
        <div className="text-center max-w-2xl mx-auto mb-2">
          <span className="im-section-label">{sectionLabel}</span>
          <h2 className="im-section-title">{title}</h2>
          <p className="im-section-desc">{description}</p>
        </div>
        <div ref={ref} className="im-benefits-grid">
          {Array.isArray(items) &&
            items.map((b, i) => (
              <div key={i} className="im-benefit-item">
                <div className="im-benefit-item__icon">{icons[i]}</div>
                <div>
                  <h3 className="im-benefit-item__title">{b.title}</h3>
                  <p className="im-benefit-item__text">{b.text}</p>
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
