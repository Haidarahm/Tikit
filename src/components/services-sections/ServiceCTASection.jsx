import { forwardRef } from "react";
import { motion as Motion } from "framer-motion";
import { FiArrowRight, FiPhone } from "react-icons/fi";
import { influencerCtaLine } from "@/helpers/framerMotion";

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
 * @param {boolean} [props.framer] - Framer Motion scroll reveals
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
    framer,
  } = props;
  const p = classPrefix;
  const isSecondaryExternal = typeof secondaryHref === "string" && secondaryHref.startsWith("http");

  if (framer) {
    return (
      <section ref={ref} className={`${p}-cta`} dir={dir}>
        <div className={`${p}-cta__inner`}>
          <Motion.p className={`${p}-label text-center mb-4 block`} {...influencerCtaLine(0)}>
            {sectionLabel}
          </Motion.p>
          <Motion.h2 className={`${p}-cta__title font-antonio`} {...influencerCtaLine(1)}>
            {title}
          </Motion.h2>
          <Motion.p className={`${p}-cta__desc`} {...influencerCtaLine(2)}>
            {description}
          </Motion.p>
          <Motion.div className={`${p}-cta__buttons`} {...influencerCtaLine(3)}>
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
          </Motion.div>
        </div>
      </section>
    );
  }

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
