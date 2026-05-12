import { forwardRef } from "react";
import { motion as Motion } from "framer-motion";

const viewport = { once: true, amount: 0.32, margin: "0px 0px -10% 0px" };

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
          <Motion.div
            className="text-center max-w-2xl mx-auto mb-2"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.09, delayChildren: 0.04 },
              },
            }}
          >
            <Motion.span
              className={`${p}-label`}
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              {sectionLabel}
            </Motion.span>
            <Motion.h2
              className={`${p}-title font-antonio`}
              variants={{
                hidden: { opacity: 0, y: 22 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              {title}
            </Motion.h2>
          </Motion.div>
          <div ref={ref} className="im-whyus-grid">
            {Array.isArray(items) &&
              items.map((w, i) => (
                <Motion.div
                  key={i}
                  className="im-whyus-card"
                  initial={{ opacity: 0, y: 44 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport}
                  transition={{
                    duration: 0.55,
                    delay: i * 0.08,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                >
                  <Motion.div
                    className="im-whyus-card__icon"
                    initial={{ scale: 0.6, rotate: -25 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.12 + i * 0.06 }}
                  >
                    {icons[i]}
                  </Motion.div>
                  <h3 className="im-whyus-card__title font-antonio">{w.title}</h3>
                  <p className="im-whyus-card__text">{w.text}</p>
                </Motion.div>
              ))}
          </div>
          {footer ? (
            <Motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewport}
              transition={{ duration: 0.55, delay: 0.15 }}
            >
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
