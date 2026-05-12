import { forwardRef, useEffect, useRef, useState } from "react";
import { animate, motion as Motion, useInView } from "framer-motion";
import { caseStudySection, statCounterTween } from "@/helpers/framerMotion";

function FramerStatValue({ stat, className }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.45 });
  const suffix = stat.dataSuffix ?? "";
  const isX = suffix === "x";
  const [display, setDisplay] = useState(() =>
    stat.dataTarget != null ? (isX ? "0x" : suffix === "%" ? "0%" : "0") : stat.value
  );

  useEffect(() => {
    if (!isInView || stat.dataTarget == null) return undefined;
    const target = parseFloat(String(stat.dataTarget));
    const isXLocal = suffix === "x";

    const ctrl = animate(0, target, {
      ...statCounterTween,
      onUpdate: (v) => {
        const r = Math.round(v);
        setDisplay(isXLocal ? `${r}x` : suffix === "%" ? `${r}%` : `${r}`);
      },
    });
    return () => ctrl.stop();
  }, [isInView, stat.dataTarget, stat.value, suffix, isX]);

  return (
    <Motion.span
      ref={ref}
      className={className}
      {...caseStudySection.statMotion}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
    >
      {display}
    </Motion.span>
  );
}

/**
 * Reusable case study block: tag, title, stats (optional animated counters via data-target/data-suffix), tags, quote.
 * @param {boolean} [props.framer] - Framer Motion + Framer-driven stat counters (page should not run GSAP on this block)
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
    framer,
  } = props;
  const p = classPrefix;

  const inner = (
    <>
      <div className={`${p}-case-study__glow`} />
      {p === "br" && <div className="br-case-study__glow--left" />}
      <span className={`${p}-case-study__tag`}>{tag}</span>
      <h3 className={`${p}-case-study__title font-antonio`}>{caseTitle}</h3>
      <div className={`${p}-case-study__stats`}>
        {Array.isArray(stats) &&
          stats.map((stat, i) => (
            <div key={i}>
              {framer && stat.dataTarget != null ? (
                <FramerStatValue stat={stat} className={`${p}-case-study__stat-value`} />
              ) : framer ? (
                <Motion.span className={`${p}-case-study__stat-value`} {...caseStudySection.statPlain}>
                  {stat.value}
                </Motion.span>
              ) : (
                <span
                  className={`${p}-case-study__stat-value`}
                  {...(stat.dataTarget != null ? { "data-target": stat.dataTarget } : {})}
                  {...(stat.dataSuffix != null ? { "data-suffix": stat.dataSuffix } : {})}
                >
                  {stat.value}
                </span>
              )}
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
    </>
  );

  if (framer) {
    return (
      <section className={`${p}-section--alt`} dir={dir}>
        <div className={`${p}-container`}>
          <Motion.div className="text-center max-w-2xl mx-auto mb-10" {...caseStudySection.heading}>
            <span className={`${p}-label`}>{sectionLabel}</span>
            <h2 className={`${p}-title font-antonio`}>{title}</h2>
          </Motion.div>
          <Motion.div ref={ref} className={`${p}-case-study`} {...caseStudySection.panel}>
            {inner}
          </Motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className={`${p}-section--alt`} dir={dir}>
      <div className={`${p}-container`}>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className={`${p}-label`}>{sectionLabel}</span>
          <h2 className={`${p}-title font-antonio`}>{title}</h2>
        </div>
        <div ref={ref} className={`${p}-case-study`}>
          {inner}
        </div>
      </div>
    </section>
  );
});

ServiceCaseStudySection.displayName = "ServiceCaseStudySection";

export default ServiceCaseStudySection;
