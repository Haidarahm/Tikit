import { forwardRef } from "react";
import { LocaleLink as Link } from "@/components/LocaleLink.jsx";
import { useFontClass } from "../../../../hooks/useFontClass";
import {
  AnimatedSection,
  AnimatedCard,
  AnimatedTitle,
  AnimatedText,
  AnimatedButton,
} from "@/components/animations";

const subtleContainerStyle = {
  borderColor: "color-mix(in srgb, var(--secondary) 22%, transparent)",
  background: "color-mix(in srgb, var(--secondary) 8%, var(--background) 92%)",
};

const defaultContainerStyle = {
  borderColor: "color-mix(in srgb, var(--secondary) 22%, transparent)",
  background:
    "linear-gradient(135deg, color-mix(in srgb, var(--secondary) 18%, transparent), color-mix(in srgb, var(--secondary) 4%, var(--background) 96%))",
};

const InfInlineCTA = forwardRef(
  ({ label, title, description, buttonText, buttonHref = "/contact-us", subtle = false }, ref) => {
    const { fontHeading } = useFontClass();

    return (
      <AnimatedSection ref={ref} className={`inf-section ${subtle ? "inf-section--alt" : ""}`}>
        <div className="inf-container">
          <AnimatedCard
            className="rounded-2xl border p-6 md:p-8 text-center"
            style={subtle ? subtleContainerStyle : defaultContainerStyle}
          >
            {label ? <AnimatedText as="span" className="inf-label mb-4">{label}</AnimatedText> : null}
            {title ? <AnimatedTitle as="h3" className={`inf-heading text-2xl md:text-3xl mb-3 ${fontHeading}`} delay={0.05}>{title}</AnimatedTitle> : null}
            {description ? <AnimatedText className="inf-desc mx-auto mb-6 max-w-3xl" delay={0.1}>{description}</AnimatedText> : null}
            <AnimatedButton as="a" href={buttonHref} className="im-cta-btn inline-flex" delay={0.15}>
              {buttonText}
            </AnimatedButton>
          </AnimatedCard>
        </div>
      </AnimatedSection>
    );
  }
);

InfInlineCTA.displayName = "InfInlineCTA";

export default InfInlineCTA;
