import { motion } from "framer-motion";
import {
  dmSubpageContainerVariants as containerVariants,
  dmSubpageItemVariants as itemVariants,
  VIEWPORT_DM_SUBPAGE as viewport,
} from "@/helpers/framerMotion";

/**
 * Numbered process steps in a responsive grid.
 *
 * @param {Array<{ id: string, title: string, description: string }>} steps — order defines step numbers 01…
 */
export default function DMProcessStepsSection({ title, subtitle, steps, fontClass }) {
  const list = Array.isArray(steps) ? steps : [];

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
        <motion.p variants={itemVariants} className="dm-section-subtitle">
          {subtitle}
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {list.map((step, idx) => (
            <motion.div
              key={step.id}
              variants={itemVariants}
              className="dm-process-card"
            >
              <div className="dm-step-number">
                {String(idx + 1).padStart(2, "0")}
              </div>
              <h3 className="dm-step-title">{step.title}</h3>
              <p className="dm-step-desc">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
