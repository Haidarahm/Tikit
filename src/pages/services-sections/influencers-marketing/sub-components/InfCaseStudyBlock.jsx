import { forwardRef } from "react";
import { useFontClass } from "../../../../hooks/useFontClass";

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
      <section ref={ref} className="inf-section">
        <div className="inf-container">
          <span className="inf-label">{label}</span>
          <h2 className={`inf-heading ${fontHeading}`}>{title}</h2>
          <p className="inf-desc">{description}</p>

          <div
            className="inf-reveal rounded-2xl border p-6 md:p-8"
            style={{
              borderColor: "color-mix(in srgb, var(--foreground) 10%, transparent)",
              background: "color-mix(in srgb, var(--secondary) 4%, var(--background) 96%)",
            }}
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
          </div>

          {footer ? <p className="inf-desc mt-8 mb-0 max-w-3xl">{footer}</p> : null}
        </div>
      </section>
    );
  }
);

InfCaseStudyBlock.displayName = "InfCaseStudyBlock";
export default InfCaseStudyBlock;
