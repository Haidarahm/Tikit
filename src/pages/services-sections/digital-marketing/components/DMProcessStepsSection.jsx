import {
  MotionDiv,
  MotionH2,
  MotionP,
  dmContainerVariants as containerVariants,
  dmItemVariants as itemVariants,
  dmViewport as viewport,
} from "../dmMotion";

/**
 * Numbered process steps in a responsive grid.
 *
 * @param {Array<{ id: string, title: string, description: string }>} steps — order defines step numbers 01…
 */
export default function DMProcessStepsSection({ title, subtitle, steps, fontClass }) {
  const list = Array.isArray(steps) ? steps : [];

  return (
    <section className="dm-section">
      <MotionDiv
        className="dm-container"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={containerVariants}
      >
        <MotionH2 variants={itemVariants} className={`dm-section-title ${fontClass}`}>
          {title}
        </MotionH2>
        <MotionP variants={itemVariants} className="dm-section-subtitle">
          {subtitle}
        </MotionP>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {list.map((step, idx) => (
            <MotionDiv
              key={step.id}
              variants={itemVariants}
              className="dm-process-card"
            >
              <div className="dm-step-number">
                {String(idx + 1).padStart(2, "0")}
              </div>
              <h3 className="dm-step-title">{step.title}</h3>
              <p className="dm-step-desc">{step.description}</p>
            </MotionDiv>
          ))}
        </div>
      </MotionDiv>
    </section>
  );
}
