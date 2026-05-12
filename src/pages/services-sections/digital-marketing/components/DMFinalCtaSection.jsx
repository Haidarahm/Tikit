import {
  MotionDiv,
  MotionH2,
  MotionP,
  dmContainerVariants as containerVariants,
  dmItemVariants as itemVariants,
  dmViewport as viewport,
} from "../dmMotion";

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
      <MotionDiv
        className="dm-container text-center"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={containerVariants}
      >
        <MotionH2
          variants={itemVariants}
          className={`dm-section-title ${fontClass} max-w-3xl mx-auto`}
        >
          {title}
        </MotionH2>
        <MotionP variants={itemVariants} className="dm-text max-w-2xl mx-auto mt-4">
          {description}
        </MotionP>
        <MotionDiv variants={itemVariants} className="mt-8 flex justify-center">
          <a href={buttonHref} className="dm-cta-btn">
            {buttonText}
          </a>
        </MotionDiv>
      </MotionDiv>
    </section>
  );
}
