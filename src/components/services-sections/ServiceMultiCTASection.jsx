import { forwardRef } from "react";
import {
  AnimatedSection,
  AnimatedTitle,
  AnimatedText,
  AnimatedGroup,
  AnimatedCard,
} from "@/components/animations";

/**
 * Multi-CTA section with 3 text cards + a final closing line.
 */
const ServiceMultiCTASection = forwardRef((props, ref) => {
  const { title, cards = [], finalLine, dir, classPrefix = "im" } = props;
  const p = classPrefix;

  return (
    <AnimatedSection ref={ref} className={`${p}-multi-cta`} dir={dir}>
      <div className={`${p}-multi-cta__inner`}>
        <AnimatedTitle as="h2" className={`${p}-multi-cta__title font-antonio`}>{title}</AnimatedTitle>

        <AnimatedGroup as="div" className={`${p}-multi-cta__grid`} stagger={0.12}>
          {Array.isArray(cards) &&
            cards.map((c, i) => (
              <AnimatedCard key={i} className={`${p}-multi-cta__card`}>
                <h3 className={`${p}-multi-cta__card-title font-antonio`}>{c.title}</h3>
                <p className={`${p}-multi-cta__card-desc`}>{c.description}</p>
              </AnimatedCard>
            ))}
        </AnimatedGroup>

        {finalLine ? <AnimatedText className={`${p}-multi-cta__final`} delay={0.15}>{finalLine}</AnimatedText> : null}
      </div>
    </AnimatedSection>
  );
});

ServiceMultiCTASection.displayName = "ServiceMultiCTASection";

export default ServiceMultiCTASection;
