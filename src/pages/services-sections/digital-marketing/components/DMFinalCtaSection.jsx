import {
  AnimatedSection,
  AnimatedTitle,
  AnimatedText,
  AnimatedButton,
} from "@/components/animations";

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
    <AnimatedSection className="dm-section dm-section-alt">
      <div className="dm-container text-center">
        <AnimatedTitle as="h2" className={`dm-section-title ${fontClass} max-w-3xl mx-auto`}>{title}</AnimatedTitle>
        <AnimatedText className="dm-text max-w-2xl mx-auto mt-4" delay={0.05}>{description}</AnimatedText>
        <div className="mt-8 flex justify-center">
          <AnimatedButton as="a" href={buttonHref} className="dm-cta-btn" delay={0.15}>
            {buttonText}
          </AnimatedButton>
        </div>
      </div>
    </AnimatedSection>
  );
}
