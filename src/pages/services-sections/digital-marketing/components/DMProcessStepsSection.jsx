import {
  AnimatedSection,
  AnimatedTitle,
  AnimatedText,
  AnimatedGroup,
  AnimatedCard,
} from "@/components/animations";

/**
 * Numbered process steps in a responsive grid.
 *
 * @param {Array<{ id: string, title: string, description: string }>} steps — order defines step numbers 01…
 */
export default function DMProcessStepsSection({ title, subtitle, steps, fontClass }) {
  const list = Array.isArray(steps) ? steps : [];

  return (
    <AnimatedSection className="dm-section">
      <div className="dm-container">
        <AnimatedTitle as="h2" className={`dm-section-title ${fontClass}`}>{title}</AnimatedTitle>
        <AnimatedText className="dm-section-subtitle" delay={0.05}>{subtitle}</AnimatedText>
        <AnimatedGroup as="div" className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12" stagger={0.1}>
          {list.map((step, idx) => (
            <AnimatedCard key={step.id} className="dm-process-card">
              <div className="dm-step-number">{String(idx + 1).padStart(2, "0")}</div>
              <h3 className="dm-step-title">{step.title}</h3>
              <p className="dm-step-desc">{step.description}</p>
            </AnimatedCard>
          ))}
        </AnimatedGroup>
      </div>
    </AnimatedSection>
  );
}
