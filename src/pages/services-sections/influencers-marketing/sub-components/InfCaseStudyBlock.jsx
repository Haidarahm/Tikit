import { forwardRef } from "react";
import { useFontClass } from "../../../../hooks/useFontClass";
import {
  AnimatedSection,
  AnimatedTitle,
  AnimatedText,
  AnimatedCard,
} from "@/components/animations";

const InfCaseStudyBlock = forwardRef(
  (
    {
      label,
      title,
      description,
      caseTitle,
      objective,
      strategyTitle,
      strategyItems,
      outcomeTitle,
      outcomeItems,
      footer,
    },
    ref
  ) => {
    const { fontHeading } = useFontClass();

    return (
      <AnimatedSection ref={ref} className="inf-section">
        <div className="inf-container">
          <div>
            <AnimatedText as="span" className="inf-label">{label}</AnimatedText>
            <AnimatedTitle as="h2" className={`inf-heading ${fontHeading}`} delay={0.05}>{title}</AnimatedTitle>
            <AnimatedText className="inf-desc" delay={0.1}>{description}</AnimatedText>
          </div>

          <AnimatedCard
            className="rounded-2xl border p-6 md:p-8"
            style={{
              borderColor: "color-mix(in srgb, var(--foreground) 10%, transparent)",
              background: "color-mix(in srgb, var(--secondary) 4%, var(--background) 96%)",
            }}
            delay={0.15}
          >
            <h3 className="inf-service-card__title text-xl mb-4">{caseTitle}</h3>
            <p className="inf-service-card__text mb-4">
              <span className="font-bold text-[var(--foreground)]">Objective: </span>
              {objective}
            </p>
            <p className="font-bold text-sm uppercase tracking-wider mb-2" style={{ color: "var(--secondary)" }}>
              {strategyTitle}
            </p>
            <ul className="inf-service-card__text list-disc pl-5 mb-6 space-y-1">
              {strategyItems.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
            <p className="font-bold text-sm uppercase tracking-wider mb-2" style={{ color: "var(--secondary)" }}>
              {outcomeTitle}
            </p>
            <ul className="inf-service-card__text list-disc pl-5 space-y-1">
              {outcomeItems.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </AnimatedCard>

          {footer ? <AnimatedText className="inf-desc mt-8 mb-0 max-w-3xl" delay={0.2}>{footer}</AnimatedText> : null}
        </div>
      </AnimatedSection>
    );
  }
);

InfCaseStudyBlock.displayName = "InfCaseStudyBlock";
export default InfCaseStudyBlock;
