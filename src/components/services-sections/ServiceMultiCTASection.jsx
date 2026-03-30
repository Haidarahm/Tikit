import { forwardRef } from "react";

/**
 * Multi-CTA section with 3 text cards + a final closing line.
 * @param {Object} props
 * @param {string} props.title
 * @param {Array<{ title: string, description: string }>} props.cards
 * @param {string} props.finalLine
 * @param {string} [props.dir]
 * @param {string} [props.classPrefix="im"]
 */
const ServiceMultiCTASection = forwardRef((props, ref) => {
  const { title, cards = [], finalLine, dir, classPrefix = "im" } = props;
  const p = classPrefix;

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

