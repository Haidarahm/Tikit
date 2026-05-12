import { forwardRef } from "react";
import { motion as Motion } from "framer-motion";
import { benefitsSection } from "@/helpers/framerMotion";

/**
 * Reusable benefits section with label, title, description, and benefit items (icon + title + text).
 * @param {boolean} [props.framer] - Framer Motion scroll reveals
 */
const ServiceBenefitsSection = forwardRef((props, ref) => {
  const { sectionLabel, title, description, items = [], icons = [], dir, classPrefix = "im", framer } = props;
  const p = classPrefix;

  const header = (
    <>
      <span className={`${p}-label`}>{sectionLabel}</span>
      <h2 className={`${p}-title font-antonio`}>{title}</h2>
      <p className={`${p}-desc`}>{description}</p>
    </>
  );

  if (framer) {
    return (
      <section className={`${p}-section`} dir={dir}>
        <div className={`${p}-container`}>
          <Motion.div className="text-center max-w-2xl mx-auto mb-2" {...benefitsSection.headerWrap}>
            <Motion.span className={`${p}-label`} {...benefitsSection.label}>
              {sectionLabel}
            </Motion.span>
            <h2 className={`${p}-title font-antonio`}>{title}</h2>
            <p className={`${p}-desc`}>{description}</p>
          </Motion.div>
          <div ref={ref} className={`${p}-benefits-grid`}>
            {Array.isArray(items) &&
              items.map((b, i) => (
                <Motion.div key={i} className={`${p}-benefit-item`} {...benefitsSection.item(i)}>
                  <Motion.div className={`${p}-benefit-item__icon`} {...benefitsSection.itemIcon(i)}>
                    {icons[i] ?? b.icon}
                  </Motion.div>
                  <div>
                    <h3 className={`${p}-benefit-item__title font-antonio`}>{b.title}</h3>
                    <p className={`${p}-benefit-item__text`}>{b.text}</p>
                  </div>
                </Motion.div>
              ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`${p}-section`} dir={dir}>
      <div className={`${p}-container`}>
        <div className="text-center max-w-2xl mx-auto mb-2">{header}</div>
        <div ref={ref} className={`${p}-benefits-grid`}>
          {Array.isArray(items) &&
            items.map((b, i) => (
              <div key={i} className={`${p}-benefit-item`}>
                <div className={`${p}-benefit-item__icon`}>{icons[i] ?? b.icon}</div>
                <div>
                  <h3 className={`${p}-benefit-item__title font-antonio`}>{b.title}</h3>
                  <p className={`${p}-benefit-item__text`}>{b.text}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
});

ServiceBenefitsSection.displayName = "ServiceBenefitsSection";

export default ServiceBenefitsSection;
