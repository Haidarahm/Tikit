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
 * @param {string} [props.classPrefix="im"]
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
    classPrefix = "im",
  } = props;
  const p = classPrefix;
  const isSecondaryExternal = typeof secondaryHref === "string" && secondaryHref.startsWith("http");

  return (
    <section ref={ref} className={`${p}-cta`} dir={dir}>
      <div className={`${p}-cta__inner`}>
        <p className={`${p}-reveal ${p}-label text-center mb-4 block`}>
          {sectionLabel}
        </p>
        <h2 className={`${p}-reveal ${p}-cta__title font-antonio`}>{title}</h2>
        <p className={`${p}-reveal ${p}-cta__desc`}>{description}</p>
        <div className={`${p}-reveal ${p}-cta__buttons`}>
          <a href={primaryHref} className={`${p}-btn-primary`}>
            <FiArrowRight />
            {primaryButtonText}
          </a>
          <a
            href={secondaryHref}
            {...(isSecondaryExternal ? { target: "_blank", rel: "noreferrer noopener" } : {})}
            className={`${p}-btn-secondary`}
          >
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
