import { forwardRef } from "react";
import { motion as Motion } from "framer-motion";

const viewport = { once: true, amount: 0.28, margin: "0px 0px -15% 0px" };

/**
 * Multi-CTA section with 3 text cards + a final closing line.
 * @param {boolean} [props.framer] - Framer Motion (omit `im-reveal` opacity trap)
 */
const ServiceMultiCTASection = forwardRef((props, ref) => {
  const { title, cards = [], finalLine, dir, classPrefix = "im", framer } = props;
  const p = classPrefix;

  if (framer) {
    return (
      <section ref={ref} className={`${p}-multi-cta`} dir={dir}>
        <div className={`${p}-multi-cta__inner`}>
          <Motion.h2
            className={`${p}-multi-cta__title font-antonio`}
            initial={{ opacity: 0, y: 36, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={viewport}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            {title}
          </Motion.h2>

          <div className={`${p}-multi-cta__grid`}>
            {Array.isArray(cards) &&
              cards.map((c, i) => (
                <Motion.div
                  key={i}
                  className={`${p}-multi-cta__card`}
                  initial={{ opacity: 0, y: 48, scale: 0.94 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={viewport}
                  transition={{
                    type: "spring",
                    stiffness: 88,
                    damping: 17,
                    delay: i * 0.12,
                  }}
                  whileHover={{
                    y: -6,
                    transition: { type: "spring", stiffness: 400, damping: 22 },
                  }}
                >
                  <h3 className={`${p}-multi-cta__card-title font-antonio`}>{c.title}</h3>
                  <p className={`${p}-multi-cta__card-desc`}>{c.description}</p>
                </Motion.div>
              ))}
          </div>

          {finalLine ? (
            <Motion.p
              className={`${p}-multi-cta__final`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewport}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              {finalLine}
            </Motion.p>
          ) : null}
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className={`${p}-multi-cta`} dir={dir}>
      <div className={`${p}-multi-cta__inner`}>
        <h2 className={`${p}-multi-cta__title ${p}-reveal font-antonio`}>{title}</h2>

        <div className={`${p}-multi-cta__grid`}>
          {Array.isArray(cards) &&
            cards.map((c, i) => (
              <div key={i} className={`${p}-multi-cta__card ${p}-reveal`}>
                <h3 className={`${p}-multi-cta__card-title font-antonio`}>{c.title}</h3>
                <p className={`${p}-multi-cta__card-desc`}>{c.description}</p>
              </div>
            ))}
        </div>

        {finalLine ? <p className={`${p}-multi-cta__final ${p}-reveal`}>{finalLine}</p> : null}
      </div>
    </section>
  );
});

ServiceMultiCTASection.displayName = "ServiceMultiCTASection";

export default ServiceMultiCTASection;
