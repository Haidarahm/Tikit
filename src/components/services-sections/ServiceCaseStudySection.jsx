import { forwardRef } from "react";

/**
 * Reusable case study block: tag, title, stats, tags, quote.
 */
const ServiceCaseStudySection = forwardRef((props, ref) => {
  const {
    sectionLabel,
    title,
    tag,
    caseTitle,
    stats = [],
    tags = [],
    quote,
    dir,
    classPrefix = "im",
  } = props;
  const p = classPrefix;

  return (
    <section className={`${p}-section--alt`} dir={dir}>
      <div className={`${p}-container`}>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className={`${p}-label`}>{sectionLabel}</span>
          <h2 className={`${p}-title font-antonio`}>{title}</h2>
        </div>
        <div ref={ref} className={`${p}-case-study`}>
          <div className={`${p}-case-study__glow`} />
          {p === "br" && <div className="br-case-study__glow--left" />}
          <span className={`${p}-case-study__tag`}>{tag}</span>
          <h3 className={`${p}-case-study__title font-antonio`}>{caseTitle}</h3>
          <div className={`${p}-case-study__stats`}>
            {Array.isArray(stats) &&
              stats.map((stat, i) => (
                <div key={i}>
                  <span
                    className={`${p}-case-study__stat-value`}
                    {...(stat.dataTarget != null ? { "data-target": stat.dataTarget } : {})}
                    {...(stat.dataSuffix != null ? { "data-suffix": stat.dataSuffix } : {})}
                  >
                    {stat.value}
                  </span>
                  <span className={`${p}-case-study__stat-label`}>{stat.label}</span>
                </div>
              ))}
          </div>
          <div className="flex flex-wrap gap-3 mb-6">
            {Array.isArray(tags) &&
              tags.map((t) => (
                <span
                  key={t}
                  className={p === "br" ? `${p}-case-study__pill` : "im-case-study__pill"}
                  style={
                    p !== "br"
                      ? { background: "color-mix(in srgb, var(--secondary) 12%, transparent)", color: "var(--secondary)" }
                      : undefined
                  }
                >
                  {t}
                </span>
              ))}
          </div>
          <blockquote className={`${p}-case-study__quote`}>{quote}</blockquote>
        </div>
      </div>
    </section>
  );
});

ServiceCaseStudySection.displayName = "ServiceCaseStudySection";

export default ServiceCaseStudySection;
