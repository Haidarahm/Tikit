import { HiCheckCircle } from "react-icons/hi";
import {
  MotionDiv,
  MotionH2,
  MotionP,
  MotionLi,
  dmContainerVariants as containerVariants,
  dmItemVariants as itemVariants,
  dmViewport as viewport,
} from "../dmMotion";

/**
 * Two-column checklist section (included / scope items).
 */
export default function DMIncludedSection({ title, subtitle, items, fontClass }) {
  const lines = Array.isArray(items) ? items : [];

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
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
          {lines.map((item, idx) => (
            <MotionLi key={idx} variants={itemVariants} className="dm-check-item">
              <HiCheckCircle className="dm-check-icon" />
              <span className="dm-text-sm">{item}</span>
            </MotionLi>
          ))}
        </ul>
      </MotionDiv>
    </section>
  );
}
