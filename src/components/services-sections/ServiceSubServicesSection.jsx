import { forwardRef } from "react";
import { motion as Motion } from "framer-motion";
import { LocaleLink as Link } from "@/components/LocaleLink.jsx";
import { FiArrowRight } from "react-icons/fi";

const viewport = { once: true, amount: 0.25, margin: "0px 0px -12% 0px" };

/**
 * Reusable sub-services grid: label, title, description, link cards (icon, title, desc, CTA text, href).
 * @param {boolean} [props.framer] - Framer Motion scroll reveals
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
    framer,
  } = props;
  const p = classPrefix;

  if (framer) {
    return (
      <section className={`${p}-section--alt`} dir={dir}>
        <div className={`${p}-container`}>
          <Motion.div
            className="text-center max-w-2xl mx-auto mb-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={`${p}-label`}>{sectionLabel}</span>
            <h2 className={`${p}-title font-antonio`}>{title}</h2>
            <Motion.p
              className={`${p}-desc`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.5, delay: 0.08 }}
            >
              {description}
            </Motion.p>
          </Motion.div>
          <div ref={ref} className={`${p}-subservices-grid`} style={{ perspective: 1400 }}>
            {Array.isArray(items) &&
              items.map((s, i) => (
                <Motion.div
                  key={hrefs[i] ?? s.href ?? i}
                  initial={{ opacity: 0, y: 52, rotateX: 12, z: -40 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
                  viewport={viewport}
                  transition={{
                    type: "spring",
                    stiffness: 76,
                    damping: 19,
                    delay: i * 0.07,
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="h-full min-h-0"
                >
                  <Link
                    to={hrefs[i] ?? s.href ?? "#"}
                    className={`${p}-subservice-card h-full flex flex-col`}
                  >
                    <div className={`${p}-subservice-card__icon`}>{icons[i] ?? s.icon}</div>
                    <h3 className={`${p}-subservice-card__title font-antonio`}>{s.title}</h3>
                    <p className={`${p}-subservice-card__desc`}>{s.desc}</p>
                    <span className={`${p}-subservice-card__cta`}>
                      {learnMoreText ?? s.cta} <FiArrowRight />
                    </span>
                  </Link>
                </Motion.div>
              ))}
          </div>
        </div>
      </section>
    );
  }

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
