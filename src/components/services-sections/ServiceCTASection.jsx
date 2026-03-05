import { forwardRef } from "react";
import { FiArrowRight, FiPhone } from "react-icons/fi";

/**
 * Reusable CTA section: label, title, description, primary + secondary buttons.
 * @param {Object} props
 * @param {string} props.sectionLabel
 * @param {string} props.title
 * @param {string} props.description
 * @param {string} props.primaryButtonText
 * @param {string} [props.primaryHref] - Default "/contact"
 * @param {string} props.secondaryButtonText
 * @param {string} [props.secondaryHref] - Default "tel:+97145774042"
 * @param {string} [props.dir]
 */
const ServiceCTASection = forwardRef((props, ref) => {
  const {
    sectionLabel,
    title,
    description,
    primaryButtonText,
    primaryHref = "/contact",
    secondaryButtonText,
    secondaryHref = "tel:+97145774042",
    dir,
  } = props;

  return (
    <section ref={ref} className="im-cta" dir={dir}>
      <div className="im-cta__inner">
        <p className="im-reveal im-section-label text-center mb-4 block">
          {sectionLabel}
        </p>
        <h2 className="im-reveal im-cta__title">{title}</h2>
        <p className="im-reveal im-cta__desc">{description}</p>
        <div className="im-reveal im-cta__buttons">
          <a href={primaryHref} className="im-btn-primary">
            <FiArrowRight />
            {primaryButtonText}
          </a>
          <a href={secondaryHref} className="im-btn-secondary">
            <FiPhone />
            {secondaryButtonText}
          </a>
        </div>
      </div>
    </section>
  );
});

ServiceCTASection.displayName = "ServiceCTASection";

export default ServiceCTASection;
