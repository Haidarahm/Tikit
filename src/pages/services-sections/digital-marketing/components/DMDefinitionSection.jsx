import { HiCheckCircle } from "react-icons/hi";
import {
  AnimatedSection,
  AnimatedTitle,
  AnimatedText,
  AnimatedGroup,
  AnimatedCard,
} from "@/components/animations";

/**
 * Long-form “what is …” block: heading, two paragraphs, label + checklist.
 */
export default function DMDefinitionSection({
  title,
  paragraph,
  paragraph2,
  benefitsLabel,
  benefitsList,
  fontClass,
}) {
  const lines = Array.isArray(benefitsList) ? benefitsList : [];

  return (
    <AnimatedSection className="dm-section">
      <div className="dm-container">
        <AnimatedTitle as="h2" className={`dm-heading ${fontClass}`}>{title}</AnimatedTitle>
        <AnimatedText className="dm-text" delay={0.05}>{paragraph}</AnimatedText>
        <AnimatedText className="dm-text" delay={0.1}>{paragraph2}</AnimatedText>
        <AnimatedText className="dm-benefits-label font-semibold mb-3 mt-6" delay={0.15}>{benefitsLabel}</AnimatedText>
        <AnimatedGroup as="ul" className="space-y-3" stagger={0.06}>
          {lines.map((item, idx) => (
            <AnimatedCard as="li" key={idx} className="dm-check-item">
              <HiCheckCircle className="dm-check-icon" />
              <span className="dm-text-sm">{item}</span>
            </AnimatedCard>
          ))}
        </AnimatedGroup>
      </div>
    </AnimatedSection>
  );
}
