import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

/**
 * Reusable sub-services grid: label, title, description, link cards (icon, title, desc, CTA text, href).
 * @param {Object} props
 * @param {string} props.sectionLabel
 * @param {string} props.title
 * @param {string} props.description
 * @param {string} props.learnMoreText - Text for "Learn more" link
 * @param {Array<{ title: string, desc: string }>} props.items
 * @param {string[]} props.hrefs - Routes for each card (same length as items)
 * @param {React.ReactNode[]} props.icons
 * @param {string} [props.dir]
 * @param {string} [props.classPrefix="im"]
 */
const ServiceSubServicesSection = forwardRef((props, ref) => {
  const {
    sectionLabel,
    title,
    description,
    learnMoreText,
    items = [],
    hrefs = [],
    icons = [],
    dir,
    classPrefix = "im",
  } = props;
  const p = classPrefix;

  return (
    <section className={`${p}-section--alt`} dir={dir}>
      <div className={`${p}-container`}>
        <div className="text-center max-w-2xl mx-auto mb-2">
          <span className={`${p}-label`}>{sectionLabel}</span>
          <h2 className={`${p}-title font-antonio`}>{title}</h2>
          <p className={`${p}-desc`}>{description}</p>
        </div>
        <div ref={ref} className={`${p}-subservices-grid`}>
          {Array.isArray(items) &&
            items.map((s, i) => (
              <Link
                key={hrefs[i] ?? s.href ?? i}
                to={hrefs[i] ?? s.href ?? "#"}
                className={`${p}-subservice-card`}
              >
                <div className={`${p}-subservice-card__icon`}>{icons[i] ?? s.icon}</div>
                <h3 className={`${p}-subservice-card__title font-antonio`}>{s.title}</h3>
                <p className={`${p}-subservice-card__desc`}>{s.desc}</p>
                <span className={`${p}-subservice-card__cta`}>
                  {learnMoreText ?? s.cta} <FiArrowRight />
                </span>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
});

ServiceSubServicesSection.displayName = "ServiceSubServicesSection";

export default ServiceSubServicesSection;
