import { motion } from "framer-motion";
import {
  dmSubpageContainerVariants as containerVariants,
  dmSubpageItemVariants as itemVariants,
  VIEWPORT_DM_SUBPAGE as viewport,
} from "@/helpers/framerMotion";
import { HiCheckCircle } from "react-icons/hi";

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
    <section className={sectionClassName}>
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
        <motion.p variants={itemVariants} className="dm-section-subtitle">
          {subtitle}
        </motion.p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
          {lines.map((item, idx) => (
            <motion.li key={idx} variants={itemVariants} className="dm-check-item">
              <HiCheckCircle className="dm-check-icon" />
              <span className="dm-text-sm">{item}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
