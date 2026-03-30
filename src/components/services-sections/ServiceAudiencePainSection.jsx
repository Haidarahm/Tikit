import { forwardRef, useEffect, useRef, useState } from "react";
import { FiCheckCircle, FiInfo } from "react-icons/fi";

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
  const contentItems = paragraphs.filter(
    (paragraph) => typeof paragraph === "string" && paragraph.trim().length > 0
  );
  const hasImage = Boolean(imageSrc);
  const contentCount = contentItems.length;
  const contentGridCols =
    contentCount <= 1
      ? "grid-cols-1"
      : contentCount === 2
      ? "sm:grid-cols-2"
      : contentCount === 4
      ? "sm:grid-cols-2 xl:grid-cols-2"
      : "sm:grid-cols-2 xl:grid-cols-3";
  const getCardSpanClass = (index) => {
    if (contentCount === 2 && index === 0) return "sm:col-span-2";
    if (contentCount > 2 && index === 0) return "xl:col-span-3";
    if (contentCount > 3 && contentCount % 2 === 1 && index === contentCount - 1) {
      return "sm:col-span-2 xl:col-span-3";
    }
    return "";
  };
  const localRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!localRef.current) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(localRef.current);
    return () => observer.disconnect();
  }, []);

  const setSectionRef = (node) => {
    localRef.current = node;

    if (!ref) return;
    if (typeof ref === "function") {
      ref(node);
      return;
    }
    ref.current = node;
  };

  return (
    <section ref={setSectionRef} className={`${p}-section`} dir={dir}>
      <div className={`${p}-container`}>
        <div className="max-w-6xl mx-auto text-center">
          {sectionLabel ? <span className={`${p}-label im-audience-reveal`}>{sectionLabel}</span> : null}
          <h2 className={`${p}-title mt-2 im-audience-reveal font-antonio`}>{title}</h2>

          <div className={`mt-8 grid gap-8 items-center ${hasImage ? "lg:grid-cols-5" : ""}`}>
            <div
              className={`grid ${contentGridCols} gap-4 text-center ${
                hasImage ? "lg:col-span-3" : "max-w-5xl mx-auto w-full"
              }`}
            >
              {contentItems.map((paragraph, index) => (
                <article
                  key={index}
                  className={`im-audience-reveal rounded-xl border border-[var(--secondary)]/20 bg-white/90 backdrop-blur-sm p-5 shadow-sm transition-all duration-600 ${
                    getCardSpanClass(index)
                  } ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                  style={{ transitionDelay: `${index * 90}ms` }}
                >
                  <div className="flex flex-col items-center gap-3">
                    <span className="shrink-0 text-[var(--secondary)]">
                      {index === 0 ? <FiInfo size={18} /> : <FiCheckCircle size={18} />}
                    </span>
                    <p
                      className={`leading-7 ${
                        index === 0
                          ? "text-[var(--foreground)] font-medium text-[1.01rem]"
                          : "text-[var(--foreground)]/80"
                      }`}
                    >
                      {paragraph}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            {hasImage ? (
              <div
                className={`lg:col-span-2 im-audience-reveal rounded-2xl overflow-hidden border border-[var(--secondary)]/20 shadow-lg transition-all duration-700 ${
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
              >
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

