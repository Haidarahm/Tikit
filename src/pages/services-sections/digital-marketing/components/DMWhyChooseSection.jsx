import {
  MotionDiv,
  MotionH2,
  dmContainerVariants as containerVariants,
  dmItemVariants as itemVariants,
  dmViewport as viewport,
} from "../dmMotion";

/**
 * “Why choose” grid: title + two-column cards with title + body.
 *
 * @param {Array<{ title: string, description: string }>} rows
 */
export default function DMWhyChooseSection({ title, rows, fontClass }) {
  const list = Array.isArray(rows) ? rows : [];

  return (
    <section className="dm-section dm-section-alt">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {list.map((row, idx) => (
            <MotionDiv
              key={`${row.title}-${idx}`}
              variants={itemVariants}
              className="dm-process-card"
            >
              <h3 className="dm-step-title">{row.title}</h3>
              <p className="dm-step-desc">{row.description}</p>
            </MotionDiv>
          ))}
        </div>
      </MotionDiv>
    </section>
  );
}
