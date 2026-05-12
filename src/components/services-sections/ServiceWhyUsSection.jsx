import { forwardRef } from "react";

/**
 * Reusable "Why Us" section: label, title, grid of cards (icon + title + text).
 */
const ServiceWhyUsSection = forwardRef((props, ref) => {
  const { sectionLabel, title, items = [], icons = [], dir, classPrefix = "im", microCta } = props;
  const p = classPrefix;

  const footer =
    microCta?.before || microCta?.highlight || microCta?.after ? (
      <p className={`${p}-whyus-footer`}>
        {microCta?.before ? microCta.before : ""}
        {microCta?.highlight ? <strong>{microCta.highlight}</strong> : ""}
        {microCta?.after ? microCta.after : ""}
      </p>
    ) : null;

  return (
    <section className={`${p}-section`} dir={dir}>
      <div className={`${p}-container `}>
        <div className="text-center max-w-2xl mx-auto mb-2">
          <span className={`${p}-label`}>{sectionLabel}</span>
          <h2 className={`${p}-title font-antonio`}>{title}</h2>
        </div>
        <div ref={ref} className="im-whyus-grid">
          {Array.isArray(items) &&
            items.map((w, i) => (
              <div key={i} className="im-whyus-card">
                <div className="im-whyus-card__icon">{icons[i] ?? w.icon}</div>
                <h3 className="im-whyus-card__title font-antonio">{w.title}</h3>
                <p className="im-whyus-card__text">{w.text}</p>
              </div>
            ))}
        </div>
        {footer}
      </div>
    </section>
  );
});

ServiceWhyUsSection.displayName = "ServiceWhyUsSection";

export default ServiceWhyUsSection;
