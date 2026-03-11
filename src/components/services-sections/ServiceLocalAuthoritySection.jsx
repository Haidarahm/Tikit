import { forwardRef } from "react";

/**
 * Reusable local authority section with icon bullets and image collage.
 */
const ServiceLocalAuthoritySection = forwardRef((props, ref) => {
  const {
    sectionLabel,
    title,
    description,
    items = [],
    footer,
    icons = [],
    imageSrc,
    imageAlt = "",
    secondaryImageSrc,
    secondaryImageAlt = "",
    dir,
    classPrefix = "im",
  } = props;

  const p = classPrefix;

  return (
    <section className={`${p}-section ${p}-local-authority`} dir={dir}>
      <div className={`${p}-container`}>
        <div className={`${p}-local-authority__head text-center max-w-3xl mx-auto`}>
          {sectionLabel ? <span className={`${p}-label im-local-authority-reveal`}>{sectionLabel}</span> : null}
          <h2 className={`${p}-title font-antonio im-local-authority-reveal`}>{title}</h2>
          {description ? <p className={`${p}-desc im-local-authority-reveal`}>{description}</p> : null}
        </div>

        <div ref={ref} className={`${p}-local-authority__layout`}>
          <div className={`${p}-local-authority__points`}>
            {Array.isArray(items) &&
              items.map((item, i) => (
                <div key={i} className={`${p}-local-authority__point im-local-authority-reveal`}>
                  <span className={`${p}-local-authority__icon`}>{icons[i] ?? item.icon}</span>
                  <p className={`${p}-local-authority__text`}>{item}</p>
                </div>
              ))}
            {footer ? <p className={`${p}-local-authority__footer im-local-authority-reveal`}>{footer}</p> : null}
          </div>

          <div className={`${p}-local-authority__media im-local-authority-reveal`}>
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={imageAlt}
                className={`${p}-local-authority__image ${p}-local-authority__image--main`}
                loading="lazy"
                decoding="async"
              />
            ) : null}
            {secondaryImageSrc ? (
              <img
                src={secondaryImageSrc}
                alt={secondaryImageAlt}
                className={`${p}-local-authority__image ${p}-local-authority__image--secondary`}
                loading="lazy"
                decoding="async"
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
});

ServiceLocalAuthoritySection.displayName = "ServiceLocalAuthoritySection";

export default ServiceLocalAuthoritySection;

