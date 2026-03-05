import { forwardRef } from "react";

/**
 * Reusable "Why Us" section: label, title, grid of cards (icon + title + text).
 * @param {Object} props
 * @param {string} props.sectionLabel
 * @param {string} props.title
 * @param {Array<{ title: string, text: string }>} props.items
 * @param {React.ReactNode[]} props.icons
 * @param {string} [props.dir]
 * @param {string} [props.classPrefix="im"]
 */
const ServiceWhyUsSection = forwardRef((props, ref) => {
  const { sectionLabel, title, items = [], icons = [], dir, classPrefix = "im" } = props;
  const p = classPrefix;

  return (
    <section className={`${p}-section`} dir={dir}>
      <div className={`${p}-container`}>
        <div className="text-center max-w-2xl mx-auto mb-2">
          <span className={`${p}-label`}>{sectionLabel}</span>
          <h2 className={`${p}-title`}>{title}</h2>
        </div>
        <div ref={ref} className="im-whyus-grid">
          {Array.isArray(items) &&
            items.map((w, i) => (
              <div key={i} className="im-whyus-card">
                <div className="im-whyus-card__icon">{icons[i]}</div>
                <h3 className="im-whyus-card__title">{w.title}</h3>
                <p className="im-whyus-card__text">{w.text}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
});

ServiceWhyUsSection.displayName = "ServiceWhyUsSection";

export default ServiceWhyUsSection;
