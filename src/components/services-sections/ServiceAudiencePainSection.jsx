import { forwardRef } from "react";

/**
 * Narrative section used for long-form problem framing blocks.
 */
const ServiceAudiencePainSection = forwardRef((props, ref) => {
  const {
    sectionLabel,
    title,
    paragraphs = [],
    imageSrc,
    imageAlt = "",
    dir,
    classPrefix = "im",
  } = props;
  const p = classPrefix;

  return (
    <section ref={ref} className={`${p}-section`} dir={dir}>
      <div className={`${p}-container`}>
        <div className="max-w-4xl mx-auto text-center">
          {sectionLabel ? <span className={`${p}-label im-audience-reveal`}>{sectionLabel}</span> : null}
          <h2 className={`${p}-title mt-2 im-audience-reveal`}>{title}</h2>

          <div className="mt-8 grid lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-3 space-y-4 text-left rtl:text-right">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={`im-audience-reveal leading-8 ${
                    index === 0
                      ? "text-[var(--foreground)] font-medium text-[1.02rem]"
                      : "text-[var(--foreground)]/80"
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {imageSrc ? (
              <div className="lg:col-span-2 im-audience-reveal rounded-2xl overflow-hidden border border-[var(--secondary)]/20 shadow-lg">
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className="w-full h-[260px] md:h-[320px] lg:h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
});

ServiceAudiencePainSection.displayName = "ServiceAudiencePainSection";

export default ServiceAudiencePainSection;

