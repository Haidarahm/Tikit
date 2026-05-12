import { forwardRef } from "react";
import { motion as Motion } from "framer-motion";
import {
  influencerCardGridContainer,
  influencerCardGridItem,
  influencerSectionIntro,
  VIEWPORT_INFLUENCER_CARDS,
} from "@/helpers/framerMotion";
import { useFontClass } from "../../../../hooks/useFontClass";

const InfPlatforms = forwardRef(({ label, title, description, platforms }, ref) => {
  const { fontHeading } = useFontClass();

  return (
    <section ref={ref} className="inf-section">
      <div className="inf-container">
        <Motion.div {...influencerSectionIntro}>
          <span className="inf-label">{label}</span>
          <h2 className={`inf-heading ${fontHeading}`}>{title}</h2>
          <p className="inf-desc">{description}</p>
        </Motion.div>

        <Motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_INFLUENCER_CARDS}
          variants={influencerCardGridContainer}
        >
          {platforms.map((platform, idx) => (
            <Motion.div
              key={platform?.title || platform?.description || JSON.stringify(platform) || `platform-${idx}`}
              className="inf-platform-card"
              variants={influencerCardGridItem}
            >
              <div className="inf-platform-card__icon">{platform.icon}</div>
              <h3 className="inf-service-card__title">{platform.title}</h3>
              <p className="inf-service-card__text">{platform.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {platform.tags?.map((tag, ti) => (
                  <span
                    key={`${platform?.title || "platform"}-${tag || ti}`}
                    className="text-[11px] px-3 py-1 rounded-full font-medium"
                    style={{
                      background: "color-mix(in srgb, var(--secondary) 10%, transparent)",
                      color: "var(--secondary)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Motion.div>
          ))}
        </Motion.div>
      </div>
    </section>
  );
});

InfPlatforms.displayName = "InfPlatforms";
export default InfPlatforms;
