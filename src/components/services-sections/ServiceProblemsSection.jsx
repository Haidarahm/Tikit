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
 * @param {string} [props.classPrefix="im"] - CSS class prefix (e.g. "br")
 */
const ServiceProblemsSection = forwardRef((props, ref) => {
  const { sectionLabel, title, description, items = [], icons = [], dir, classPrefix = "im" } = props;
  const p = classPrefix;

  return (
    <section className={`${p}-section`} dir={dir}>
      <div className={`${p}-container`}>
        <div className="text-center max-w-2xl mx-auto mb-2">
          <span className={`${p}-label`}>{sectionLabel}</span>
          <h2 className={`${p}-title`}>{title}</h2>
          <p className={`${p}-desc`}>{description}</p>
        </div>
        <div ref={ref} className={`${p}-problems-grid`}>
          {Array.isArray(items) &&
            items.map((item, i) => (
              <div key={i} className={`${p}-problem-card`}>
                <div className={`${p}-problem-card__icon`}>{icons[i] ?? item.icon}</div>
                <h3 className={`${p}-problem-card__title`}>{item.title}</h3>
                <p className={`${p}-problem-card__text`}>{item.text}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
});

ServiceProblemsSection.displayName = "ServiceProblemsSection";

export default ServiceProblemsSection;
