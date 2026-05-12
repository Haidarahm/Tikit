import DMRelatedServices from "./DMRelatedServices";
import {
  MotionSection,
  dmItemVariants as itemVariants,
  dmViewport as viewport,
} from "../dmMotion";

/**
 * Wraps `DMRelatedServices` with a light scroll reveal (same pattern as other DM blocks).
 */
export default function DMRelatedServicesReveal({ current }) {
  return (
    <MotionSection
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={itemVariants}
    >
      <DMRelatedServices current={current} />
    </MotionSection>
  );
}
