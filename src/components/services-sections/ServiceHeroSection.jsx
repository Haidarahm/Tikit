import { forwardRef } from "react";
import HeroWithBadge from "../HeroWithBadge";

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
  } = props;

  return (
    <section
      className={`im-hero ${heroClassName}`.trim()}
      {...(dataNavColor != null ? { "data-nav-color": dataNavColor } : {})}
    >
      <div className="im-hero__image-wrapper">
        <img src={imageSrc} alt={imageAlt} className="im-hero__image" />
        <div className="im-hero__overlay" />
      </div>
      <div ref={ref} className="im-hero__inner" style={{ opacity: 0 }}>
        <HeroWithBadge
          badge={badge}
          badgeVariant={badgeVariant}
          title={title}
          mainWord={mainWord}
          description={description}
        />
      </div>
    </section>
  );
});

ServiceHeroSection.displayName = "ServiceHeroSection";

export default ServiceHeroSection;
