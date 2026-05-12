import { forwardRef } from "react";
import { motion as Motion } from "framer-motion";
import { multiCtaSection } from "@/helpers/framerMotion";

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
          <Motion.h2 className={`${p}-multi-cta__title font-antonio`} {...multiCtaSection.title}>
            {title}
          </Motion.h2>

          <div className={`${p}-multi-cta__grid`}>
            {Array.isArray(cards) &&
              cards.map((c, i) => (
                <Motion.div key={i} className={`${p}-multi-cta__card`} {...multiCtaSection.card(i)}>
                  <h3 className={`${p}-multi-cta__card-title font-antonio`}>{c.title}</h3>
                  <p className={`${p}-multi-cta__card-desc`}>{c.description}</p>
                </Motion.div>
              ))}
          </div>

          {finalLine ? (
            <Motion.p className={`${p}-multi-cta__final`} {...multiCtaSection.finalLine}>
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
