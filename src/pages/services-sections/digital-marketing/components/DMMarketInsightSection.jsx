import {
  MotionDiv,
  MotionH2,
  MotionP,
  dmContainerVariants as containerVariants,
  dmItemVariants as itemVariants,
  dmViewport as viewport,
} from "../dmMotion";

/**
 * Title + two prose paragraphs (e.g. market / insight copy). Uses `dm-insight-block` styling.
 */
export default function DMMarketInsightSection({
  title,
  paragraph,
  paragraph2,
  fontClass,
}) {
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
        <MotionP variants={itemVariants} className="dm-text dm-insight-block">
          {paragraph}
        </MotionP>
        <MotionP variants={itemVariants} className="dm-text dm-insight-block">
          {paragraph2}
        </MotionP>
      </MotionDiv>
    </section>
  );
}
