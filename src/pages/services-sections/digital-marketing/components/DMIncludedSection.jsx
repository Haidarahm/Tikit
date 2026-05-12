import { HiCheckCircle } from "react-icons/hi";
import {
  AnimatedSection,
  AnimatedTitle,
  AnimatedText,
  AnimatedGroup,
  AnimatedCard,
} from "@/components/animations";

/**
 * Two-column checklist section (included / scope items).
 */
export default function DMIncludedSection({
  title,
  subtitle,
  items,
  fontClass,
  sectionClassName = "dm-section",
}) {
  const lines = Array.isArray(items) ? items : [];

  return (
    <AnimatedSection className={sectionClassName}>
      <div className="dm-container">
        <AnimatedTitle as="h2" className={`dm-section-title ${fontClass}`}>{title}</AnimatedTitle>
        <AnimatedText className="dm-section-subtitle" delay={0.05}>{subtitle}</AnimatedText>
        <AnimatedGroup as="ul" className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10" stagger={0.06}>
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
