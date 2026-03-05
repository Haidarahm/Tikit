import { forwardRef } from "react";

/**
 * Reusable "problems / why struggle" section with label, title, description, and card grid.
 * @param {Object} props
 * @param {string} props.sectionLabel - Small label above title
 * @param {string} props.title - Section heading
 * @param {string} props.description - Paragraph below title
 * @param {Array<{ title: string, text: string }>} props.items - Problem cards
 * @param {React.ReactNode[]} props.icons - Icons for each card (same length as items)
 * @param {string} [props.dir] - "ltr" | "rtl"
 */
const ServiceProblemsSection = forwardRef((props, ref) => {
  const { sectionLabel, title, description, items = [], icons = [], dir } = props;

  return (
    <section className="im-section" dir={dir}>
      <div className="im-container">
        <div className="text-center max-w-2xl mx-auto mb-2">
          <span className="im-section-label">{sectionLabel}</span>
          <h2 className="im-section-title">{title}</h2>
          <p className="im-section-desc">{description}</p>
        </div>
        <div ref={ref} className="im-problems-grid">
          {Array.isArray(items) &&
            items.map((p, i) => (
              <div key={i} className="im-problem-card">
                <div className="im-problem-card__icon">{icons[i]}</div>
                <h3 className="im-problem-card__title">{p.title}</h3>
                <p className="im-problem-card__text">{p.text}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
});

ServiceProblemsSection.displayName = "ServiceProblemsSection";

export default ServiceProblemsSection;
