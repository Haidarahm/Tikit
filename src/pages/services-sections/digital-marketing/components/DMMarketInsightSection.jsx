import { motion } from "framer-motion";
import {
  dmSubpageContainerVariants as containerVariants,
  dmSubpageItemVariants as itemVariants,
  VIEWPORT_DM_SUBPAGE as viewport,
} from "@/helpers/framerMotion";

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
      <motion.div
        className="dm-container"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={containerVariants}
      >
        <motion.h2 variants={itemVariants} className={`dm-section-title ${fontClass}`}>
          {title}
        </motion.h2>
        <motion.p variants={itemVariants} className="dm-text dm-insight-block">
          {paragraph}
        </motion.p>
        <motion.p variants={itemVariants} className="dm-text dm-insight-block">
          {paragraph2}
        </motion.p>
      </motion.div>
    </section>
  );
}
