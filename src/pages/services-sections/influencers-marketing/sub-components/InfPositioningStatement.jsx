import { forwardRef } from "react";
import { useFontClass } from "../../../../hooks/useFontClass";
import {
  AnimatedSection,
  AnimatedCard,
  AnimatedTitle,
  AnimatedText,
} from "@/components/animations";

const statementCardStyle = {
  borderColor: "color-mix(in srgb, var(--secondary) 18%, transparent)",
  background:
    "linear-gradient(180deg, color-mix(in srgb, var(--secondary) 8%, transparent), color-mix(in srgb, var(--background) 96%, white))",
};

const InfPositioningStatement = forwardRef(({ label, title, description }, ref) => {
  const { fontHeading } = useFontClass();

  return (
    <AnimatedSection ref={ref} className="inf-section inf-section--alt">
      <div className="inf-container">
        <AnimatedCard
          className="rounded-2xl border px-6 py-8 md:px-10 md:py-12 text-center"
          style={statementCardStyle}
        >
          {label ? <AnimatedText as="span" className="inf-label mb-4">{label}</AnimatedText> : null}
          {title ? <AnimatedTitle as="h3" className={`inf-heading text-2xl md:text-4xl mb-4 ${fontHeading}`} delay={0.05}>{title}</AnimatedTitle> : null}
          {description ? <AnimatedText className="inf-desc mx-auto max-w-3xl" delay={0.1}>{description}</AnimatedText> : null}
        </AnimatedCard>
      </div>
    </AnimatedSection>
  );
});

InfPositioningStatement.displayName = "InfPositioningStatement";

export default InfPositioningStatement;
