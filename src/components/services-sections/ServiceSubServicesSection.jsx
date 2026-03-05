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
  } = props;

  return (
    <section className="im-section--alt" dir={dir}>
      <div className="im-container">
        <div className="text-center max-w-2xl mx-auto mb-2">
          <span className="im-section-label">{sectionLabel}</span>
          <h2 className="im-section-title">{title}</h2>
          <p className="im-section-desc">{description}</p>
        </div>
        <div ref={ref} className="im-subservices-grid">
          {Array.isArray(items) &&
            items.map((s, i) => (
              <Link
                key={hrefs[i] || i}
                to={hrefs[i] || "#"}
                className="im-subservice-card"
              >
                <div className="im-subservice-card__icon">{icons[i]}</div>
                <h3 className="im-subservice-card__title">{s.title}</h3>
                <p className="im-subservice-card__desc">{s.desc}</p>
                <span className="im-subservice-card__cta">
                  {learnMoreText} <FiArrowRight />
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
