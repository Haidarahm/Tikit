import {
  AnimatedSection,
  AnimatedTitle,
  AnimatedGroup,
  AnimatedCard,
} from "@/components/animations";

/**
 * “Why choose” grid: title + two-column cards with title + body.
 *
 * @param {Array<{ title: string, description: string }>} rows
 */
export default function DMWhyChooseSection({ title, rows, fontClass }) {
  const list = Array.isArray(rows) ? rows : [];

  return (
    <AnimatedSection className="dm-section dm-section-alt">
      <div className="dm-container">
        <AnimatedTitle as="h2" className={`dm-section-title ${fontClass}`}>{title}</AnimatedTitle>
        <AnimatedGroup as="div" className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12" stagger={0.1}>
          {list.map((row, idx) => (
            <AnimatedCard key={`${row.title}-${idx}`} className="dm-process-card">
              <h3 className="dm-step-title">{row.title}</h3>
              <p className="dm-step-desc">{row.description}</p>
            </AnimatedCard>
          ))}
        </AnimatedGroup>
      </div>
    </AnimatedSection>
  );
}
