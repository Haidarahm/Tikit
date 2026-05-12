import { forwardRef } from "react";
import { motion as Motion } from "framer-motion";
import { whyUsSection } from "@/helpers/framerMotion";

/**
 * Reusable "Why Us" section: label, title, grid of cards (icon + title + text).
 * @param {boolean} [props.framer] - Framer Motion scroll reveals
 */
const ServiceWhyUsSection = forwardRef((props, ref) => {
  const { sectionLabel, title, items = [], icons = [], dir, classPrefix = "im", microCta, framer } = props;
  const p = classPrefix;

  const footer =
    microCta?.before || microCta?.highlight || microCta?.after ? (
      <p className={`${p}-whyus-footer`}>
        {microCta?.before ? microCta.before : ""}
        {microCta?.highlight ? <strong>{microCta.highlight}</strong> : ""}
        {microCta?.after ? microCta.after : ""}
      </p>
    ) : null;

  if (framer) {
    return (
      <section className={`${p}-section`} dir={dir}>
        <div className={`${p}-container `}>
          <Motion.div className="text-center max-w-2xl mx-auto mb-2" {...whyUsSection.headerContainer}>
            <Motion.span className={`${p}-label`} variants={whyUsSection.labelVariants}>
              {sectionLabel}
            </Motion.span>
            <Motion.h2 className={`${p}-title font-antonio`} variants={whyUsSection.titleVariants}>
              {title}
            </Motion.h2>
          </Motion.div>
          <div ref={ref} className="im-whyus-grid">
            {Array.isArray(items) &&
              items.map((w, i) => (
                <Motion.div key={i} className="im-whyus-card" {...whyUsSection.card(i)}>
                  <Motion.div className="im-whyus-card__icon" {...whyUsSection.cardIcon(i)}>
                    {icons[i]}
                  </Motion.div>
                  <h3 className="im-whyus-card__title font-antonio">{w.title}</h3>
                  <p className="im-whyus-card__text">{w.text}</p>
                </Motion.div>
              ))}
          </div>
          {footer ? (
            <Motion.div {...whyUsSection.footer}>
              {footer}
            </Motion.div>
          ) : null}
        </div>
      </section>
    );
  }

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
                <div className="im-whyus-card__icon">{icons[i]}</div>
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
