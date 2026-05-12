import { forwardRef } from "react";
import { motion as Motion } from "framer-motion";

const viewport = { once: true, amount: 0.35, margin: "0px 0px -10% 0px" };

/**
 * Reusable "problems / why struggle" section with label, title, description, and card grid.
 * @param {Object} props
 * @param {string} props.sectionLabel - Small label above title
 * @param {string} props.title - Section heading
 * @param {string} props.description - Paragraph below title
 * @param {Array<{ title: string, text: string }>} props.items - Problem cards
 * @param {React.ReactNode[]} props.icons - Icons for each card (same length as items)
 * @param {string} [props.dir] - "ltr" | "rtl"
 * @param {string} [props.classPrefix="im"] - CSS class prefix (e.g. "br")
 * @param {boolean} [props.framer] - Use Framer Motion for scroll reveals instead of page-level GSAP
 */
const ServiceProblemsSection = forwardRef((props, ref) => {
  const { sectionLabel, title, description, items = [], icons = [], dir, classPrefix = "im", framer } = props;
  const p = classPrefix;

  const header = (
    <>
      <span className={`${p}-label`}>{sectionLabel}</span>
      <h2 className={`${p}-title font-antonio`}>{title}</h2>
      <p className={`${p}-desc`}>{description}</p>
    </>
  );

  const grid = (
    <>
      {Array.isArray(items) &&
        items.map((item, i) => (
          <div key={i} className={`${p}-problem-card`}>
            <div className={`${p}-problem-card__icon`}>{icons[i] ?? item.icon}</div>
            <h3 className={`${p}-problem-card__title font-antonio`}>{item.title}</h3>
            <p className={`${p}-problem-card__text`}>{item.text}</p>
          </div>
        ))}
    </>
  );

  if (framer) {
    return (
      <section className={`${p}-section ${p}-problems-section`} dir={dir}>
        <div className={`${p}-container`}>
          <Motion.div
            className="text-center max-w-2xl mx-auto mb-2"
            initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={viewport}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {header}
          </Motion.div>
          <div
            ref={ref}
            className={`${p}-problems-grid`}
            style={{ perspective: 1000 }}
          >
            {Array.isArray(items) &&
              items.map((item, i) => (
                <Motion.div
                  key={i}
                  className={`${p}-problem-card`}
                  initial={{ opacity: 0, y: 56, rotateX: 8 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={viewport}
                  transition={{
                    type: "spring",
                    stiffness: 70,
                    damping: 20,
                    delay: i * 0.09,
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                  whileHover={{
                    y: -4,
                    transition: { type: "spring", stiffness: 400, damping: 25 },
                  }}
                >
                  <div className={`${p}-problem-card__icon`}>{icons[i] ?? item.icon}</div>
                  <h3 className={`${p}-problem-card__title font-antonio`}>{item.title}</h3>
                  <p className={`${p}-problem-card__text`}>{item.text}</p>
                </Motion.div>
              ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`${p}-section ${p}-problems-section`} dir={dir}>
      <div className={`${p}-container`}>
        <div className="text-center max-w-2xl mx-auto mb-2">{header}</div>
        <div ref={ref} className={`${p}-problems-grid`}>
          {grid}
        </div>
      </div>
    </section>
  );
});

ServiceProblemsSection.displayName = "ServiceProblemsSection";

export default ServiceProblemsSection;
