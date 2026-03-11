import { forwardRef } from "react";
import TikitTitle from "../TikitTitle";

/**
 * Reusable hero section for service pages.
 * @param {Object} props
 * @param {string} props.imageSrc - Hero background image
 * @param {string} props.imageAlt - Alt text for image
 * @param {string} props.badge - Badge text
 * @param {string} [props.badgeVariant] - "default" | "pulse"
 * @param {string} props.title - Title line (e.g. "Leading Digital Marketing Agency in")
 * @param {string} props.mainWord - Highlighted word (e.g. "Dubai")
 * @param {string} [props.description] - Optional description
 * @param {string} [props.heroClassName] - Extra class for section
 * @param {string} [props.dataNavColor] - e.g. "black" for data-nav-color
 * @param {string} [props.classPrefix="im"] - CSS class prefix (e.g. "br" for Branding) so UI stays the same
 */
const ServiceHeroSection = forwardRef((props, ref) => {
  const {
    imageSrc,
    imageAlt,
    badge,
    badgeVariant = "pulse",
    title,
    mainWord,
    description,
    heroClassName = "",
    dataNavColor,
    classPrefix = "im",
  } = props;
  const p = classPrefix;

  return (
    <section
      className={`${p}-hero ${heroClassName}`.trim()}
      {...(dataNavColor != null ? { "data-nav-color": dataNavColor } : {})}
    >
      <div className={`${p}-hero__image-wrapper`}>
        <img src={imageSrc} alt={imageAlt} className={`${p}-hero__image`} />
        <div className={`${p}-hero__overlay`} />
        <div className={`${p}-hero__mesh`} />
        <div className={`${p}-hero__orb ${p}-hero__orb--one`} />
        <div className={`${p}-hero__orb ${p}-hero__orb--two`} />
      </div>
      <div ref={ref} className={`${p}-hero__inner`} style={{ opacity: 0 }}>
        <div className={`${p}-hero__content-card`}>
          {badge ? (
            <span className={`${p}-hero__badge ${badgeVariant === "pulse" ? `${p}-hero__badge--pulse` : ""}`}>
              <span className={`${p}-hero__badge-dot`} />
              {badge}
            </span>
          ) : null}

          <TikitTitle
            title={title}
            mainWord={mainWord}
            disableAnimation
            className={`${p}-hero__title hero-animate block font-antonio`}
          />

          {description ? <p className={`${p}-hero__description`}>{description}</p> : null}

          <div className={`${p}-hero__scroll-indicator`} aria-hidden="true">
            <span className={`${p}-hero__scroll-line`} />
          </div>
        </div>
      </div>
    </section>
  );
});

ServiceHeroSection.displayName = "ServiceHeroSection";

export default ServiceHeroSection;
