import {
  AnimatedSection,
  AnimatedTitle,
  AnimatedText,
} from "@/components/animations";

/**
 * Title + two prose paragraphs (e.g. market / insight copy). Uses
 * `dm-insight-block` styling.
 */
export default function DMMarketInsightSection({
  title,
  paragraph,
  paragraph2,
  fontClass,
}) {
  return (
    <AnimatedSection className="dm-section">
      <div className="dm-container">
        <AnimatedTitle as="h2" className={`dm-section-title ${fontClass}`}>{title}</AnimatedTitle>
        <AnimatedText className="dm-text dm-insight-block" delay={0.05}>{paragraph}</AnimatedText>
        <AnimatedText className="dm-text dm-insight-block" delay={0.1}>{paragraph2}</AnimatedText>
      </div>
    </AnimatedSection>
  );
}
