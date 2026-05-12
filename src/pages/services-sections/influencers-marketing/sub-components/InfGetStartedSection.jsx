import { forwardRef } from "react";
import { LocaleLink as Link } from "@/components/LocaleLink.jsx";
import { FiArrowRight } from "react-icons/fi";
import { useFontClass } from "../../../../hooks/useFontClass";
import {
  AnimatedSection,
  AnimatedTitle,
  AnimatedText,
  AnimatedButton,
} from "@/components/animations";

const InfGetStartedSection = forwardRef(
  ({ label, title, description, buttonText = "Let's Talk", buttonHref = "/contact-us" }, ref) => {
    const { fontHeading } = useFontClass();

    return (
      <AnimatedSection ref={ref} className="inf-section">
        <div className="inf-container">
          <div className="mx-auto max-w-4xl text-center">
            {label ? <AnimatedText as="span" className="inf-label mb-4">{label}</AnimatedText> : null}
            {title ? <AnimatedTitle as="h3" className={`inf-heading text-2xl md:text-4xl mb-4 ${fontHeading}`} delay={0.05}>{title}</AnimatedTitle> : null}
            {description ? <AnimatedText className="inf-desc mx-auto mb-6 max-w-3xl" delay={0.1}>{description}</AnimatedText> : null}
            <AnimatedButton as="a" href={buttonHref} className="im-cta-btn inline-flex items-center gap-2" delay={0.15}>
              {buttonText}
              <FiArrowRight />
            </AnimatedButton>
          </div>
        </div>
      </AnimatedSection>
    );
  }
);

InfGetStartedSection.displayName = "InfGetStartedSection";

export default InfGetStartedSection;
