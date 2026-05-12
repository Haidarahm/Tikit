import HeroWithBadge from "../../../../components/HeroWithBadge";

/**
 * DM subpage hero: gradient overlay, badge title, optional secondary line + CTA.
 */
export default function DMHeroSection({
  badge,
  title,
  mainWord,
  description,
  heroSecondary,
  heroCta,
  ctaHref = "/contact-us",
}) {
  return (
    <section className="dm-hero">
      <div className="dm-hero-overlay">
        <div className="dm-hero-gradient" />
      </div>
      <div className="dm-hero-content relative z-10">
        <div>
          <HeroWithBadge
            badge={badge}
            title={title}
            mainWord={mainWord}
            description={description}
            titleClassName="block"
            descriptionClassName="dm-hero-desc"
            contentClassName="relative z-10 max-w-6xl mx-auto text-center mt-6"
            disableAnimation
          />
        </div>
        {heroSecondary ? (
          <p className="dm-hero-desc dm-hero-desc--secondary mt-6">{heroSecondary}</p>
        ) : null}
        {heroCta ? (
          <div className="mt-10 flex justify-center">
            <a href={ctaHref} className="dm-cta-btn">
              {heroCta}
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}
