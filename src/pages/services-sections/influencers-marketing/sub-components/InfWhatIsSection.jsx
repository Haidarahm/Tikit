import { forwardRef } from "react";
import { FiCheckCircle, FiTarget, FiTrendingUp, FiArrowRightCircle } from "react-icons/fi";
import { useFontClass } from "../../../../hooks/useFontClass";

const InfWhatIsSection = forwardRef(
  (
    {
      label,
      title,
      description,
      prioritiesIntro,
      priorities = [],
      resultsIntro,
      results = [],
      ctaText,
      ctaHref = "/contact-us",
      dir,
    },
    ref
  ) => {
    const { fontHeading } = useFontClass();
    const isRtl = dir === "rtl";

    return (
      <section ref={ref} className="inf-section inf-section--alt" dir={dir}>
        <div className="inf-container">
          <span className="inf-label inf-reveal">{label}</span>
          <h2 className={`inf-heading inf-reveal ${fontHeading}`}>{title}</h2>
          {description ? <p className="inf-desc inf-reveal">{description}</p> : null}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <article className="inf-type-card inf-reveal">
              <div className="inf-type-card__badge">
                <FiTarget />
              </div>
              <div className="flex-1">
                <h3 className="inf-service-card__title">{prioritiesIntro}</h3>
                <ul className="mt-3 space-y-2">
                  {priorities.map((item, idx) => (
                    <li key={`priority-${item || idx}`} className={`flex items-start gap-2 text-sm ${isRtl ? "text-right" : "text-left"}`}>
                      <FiCheckCircle className="mt-0.5 shrink-0 text-[var(--secondary)]" />
                      <span className="inf-service-card__text">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            <article className="inf-type-card inf-reveal">
              <div className="inf-type-card__badge">
                <FiTrendingUp />
              </div>
              <div className="flex-1">
                <h3 className="inf-service-card__title">{resultsIntro}</h3>
                <ul className="mt-3 space-y-2">
                  {results.map((item, idx) => (
                    <li key={`result-${item || idx}`} className={`flex items-start gap-2 text-sm ${isRtl ? "text-right" : "text-left"}`}>
                      <FiCheckCircle className="mt-0.5 shrink-0 text-[var(--secondary)]" />
                      <span className="inf-service-card__text">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>

          <a
            href={ctaHref}
            className="block inf-reveal mt-5 rounded-[inherit] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--secondary)]"
            aria-label={ctaText}
          >
            <article className="inf-type-card cursor-pointer transition-opacity duration-200 hover:opacity-90">
              <div className="inf-type-card__badge">
                <FiArrowRightCircle />
              </div>
              <p className="inf-service-card__title mb-0">{ctaText}</p>
            </article>
          </a>
        </div>
      </section>
    );
  }
);

InfWhatIsSection.displayName = "InfWhatIsSection";
export default InfWhatIsSection;

