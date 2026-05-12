import { forwardRef } from "react";
import { motion as Motion } from "framer-motion";
import {
  influencerCardGridContainer,
  influencerCardGridItem,
  influencerSectionIntro,
  VIEWPORT_INFLUENCER_CARDS,
} from "@/helpers/framerMotion";
import { useFontClass } from "../../../../hooks/useFontClass";

const InfIndustries = forwardRef(({ label, title, description, industries }, ref) => {
  const { fontHeading } = useFontClass();

  return (
    <section ref={ref} className="inf-section inf-section--alt">
      <div className="inf-container">
        <Motion.div {...influencerSectionIntro}>
          <span className="inf-label">{label}</span>
          <h2 className={`inf-heading ${fontHeading}`}>{title}</h2>
          <p className="inf-desc">{description}</p>
        </Motion.div>

        <Motion.div
          className="flex flex-wrap gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_INFLUENCER_CARDS}
          variants={influencerCardGridContainer}
        >
          {industries.map((industry, idx) => (
            <Motion.div
              key={industry?.title || JSON.stringify(industry) || `industry-${idx}`}
              className="inf-industry-tag"
              variants={influencerCardGridItem}
            >
              <span className="text-lg">{industry.icon}</span>
              <span>{industry.title}</span>
            </Motion.div>
          ))}
        </Motion.div>
      </div>
    </section>
  );
});

InfIndustries.displayName = "InfIndustries";
export default InfIndustries;
