import { forwardRef } from "react";

/**
 * Reusable case study block: tag, title, stats (optional animated counters via data-target/data-suffix), tags, quote.
 * @param {Object} props
 * @param {string} props.sectionLabel
 * @param {string} props.title
 * @param {string} props.tag - Small tag line
 * @param {string} props.caseTitle - Main case study heading
 * @param {Array<{ value: string, label: string, dataTarget?: string, dataSuffix?: string }>} props.stats
 * @param {string[]} props.tags - Pill labels
 * @param {string} props.quote
 * @param {string} [props.dir]
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
  } = props;

  return (
    <section className="im-section--alt" dir={dir}>
      <div className="im-container">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="im-section-label">{sectionLabel}</span>
          <h2 className="im-section-title">{title}</h2>
        </div>
        <div ref={ref} className="im-case-study">
          <div className="im-case-study__glow" />
          <span className="im-case-study__tag">{tag}</span>
          <h3 className="im-case-study__title">{caseTitle}</h3>
          <div className="im-case-study__stats">
            {Array.isArray(stats) &&
              stats.map((stat, i) => (
                <div key={i}>
                  <span
                    className="im-case-study__stat-value"
                    {...(stat.dataTarget != null ? { "data-target": stat.dataTarget } : {})}
                    {...(stat.dataSuffix != null ? { "data-suffix": stat.dataSuffix } : {})}
                  >
                    {stat.value}
                  </span>
                  <span className="im-case-study__stat-label">{stat.label}</span>
                </div>
              ))}
          </div>
          <div className="flex flex-wrap gap-3 mb-6">
            {Array.isArray(tags) &&
              tags.map((t) => (
                <span
                  key={t}
                  className="text-xs px-3 py-1 rounded-full font-semibold"
                  style={{
                    background: "color-mix(in srgb, var(--secondary) 12%, transparent)",
                    color: "var(--secondary)",
                  }}
                >
                  {t}
                </span>
              ))}
          </div>
          <blockquote className="im-case-study__quote">{quote}</blockquote>
        </div>
      </div>
    </section>
  );
});

ServiceCaseStudySection.displayName = "ServiceCaseStudySection";

export default ServiceCaseStudySection;
