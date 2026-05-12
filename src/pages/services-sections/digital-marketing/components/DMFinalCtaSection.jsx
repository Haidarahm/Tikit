import { motion } from "framer-motion";
import {
  dmSubpageContainerVariants as containerVariants,
  dmSubpageItemVariants as itemVariants,
  VIEWPORT_DM_SUBPAGE as viewport,
} from "@/helpers/framerMotion";

/**
 * Centered closing CTA: title, description, primary button.
 */
export default function DMFinalCtaSection({
  title,
  description,
  buttonText,
  buttonHref = "/contact-us",
  fontClass,
}) {
  return (
    <section className="dm-section dm-section-alt">
      <motion.div
        className="dm-container text-center"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={containerVariants}
      >
        <motion.h2
          variants={itemVariants}
          className={`dm-section-title ${fontClass} max-w-3xl mx-auto`}
        >
          {title}
        </motion.h2>
        <motion.p variants={itemVariants} className="dm-text max-w-2xl mx-auto mt-4">
          {description}
        </motion.p>
        <motion.div variants={itemVariants} className="mt-8 flex justify-center">
          <a href={buttonHref} className="dm-cta-btn">
            {buttonText}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
