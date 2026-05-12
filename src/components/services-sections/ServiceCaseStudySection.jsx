import { forwardRef } from "react";
import {
  AnimatedSection,
  AnimatedTitle,
  AnimatedText,
  AnimatedGroup,
  AnimatedCard,
} from "@/components/animations";

/**
 * Reusable case study block: tag, title, stats, tags, quote.
 *
 * The wrapper section animates as a whole; the stat row uses an inner
 * `AnimatedGroup` so numbers stagger in.
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
    <AnimatedSection className={`${p}-section--alt`} dir={dir}>
      <div className={`${p}-container`}>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <AnimatedText as="span" className={`${p}-label`}>{sectionLabel}</AnimatedText>
          <AnimatedTitle as="h2" className={`${p}-title font-antonio`} delay={0.05}>{title}</AnimatedTitle>
        </div>
        <AnimatedCard as="div" ref={ref} className={`${p}-case-study`}>
          <div className={`${p}-case-study__glow`} />
          {p === "br" && <div className="br-case-study__glow--left" />}
          <span className={`${p}-case-study__tag`}>{tag}</span>
          <h3 className={`${p}-case-study__title font-antonio`}>{caseTitle}</h3>
          <AnimatedGroup as="div" className={`${p}-case-study__stats`} stagger={0.12}>
            {Array.isArray(stats) &&
              stats.map((stat, i) => (
                <AnimatedCard key={i}>
                  <span
                    className={`${p}-case-study__stat-value`}
                    {...(stat.dataTarget != null ? { "data-target": stat.dataTarget } : {})}
                    {...(stat.dataSuffix != null ? { "data-suffix": stat.dataSuffix } : {})}
                  >
                    {stat.value}
                  </span>
                  <span className={`${p}-case-study__stat-label`}>{stat.label}</span>
                </AnimatedCard>
              ))}
          </AnimatedGroup>
          <AnimatedGroup as="div" className="flex flex-wrap gap-3 mb-6" stagger={0.05}>
            {Array.isArray(tags) &&
              tags.map((t) => (
                <AnimatedCard
                  as="span"
                  key={t}
                  className={p === "br" ? `${p}-case-study__pill` : "im-case-study__pill"}
                  style={
                    p !== "br"
                      ? { background: "color-mix(in srgb, var(--secondary) 12%, transparent)", color: "var(--secondary)" }
                      : undefined
                  }
                >
                  {t}
                </AnimatedCard>
              ))}
          </AnimatedGroup>
          <AnimatedText as="div" className={`${p}-case-study__quote`} delay={0.15}>
            <blockquote>{quote}</blockquote>
          </AnimatedText>
        </AnimatedCard>
      </div>
    </AnimatedSection>
  );
});

ServiceCaseStudySection.displayName = "ServiceCaseStudySection";

export default ServiceCaseStudySection;
