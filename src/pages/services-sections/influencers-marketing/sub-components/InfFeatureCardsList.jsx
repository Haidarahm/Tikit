import { forwardRef } from "react";
import { motion as Motion } from "framer-motion";
import { influencerRevealItem } from "@/helpers/framerMotion";
import { useFontClass } from "../../../../hooks/useFontClass";

const InfFeatureCardsList = forwardRef(({ label, title, description, items = [] }, ref) => {
  const { fontHeading } = useFontClass();

  return (
    <section ref={ref} className="inf-section">
      <div className="inf-container">
        <span className="inf-label">{label}</span>
        <h2 className={`inf-heading ${fontHeading}`}>{title}</h2>
        <p className="inf-desc">{description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, idx) => (
            <Motion.div
              key={item?.title || item?.description || JSON.stringify(item) || `feature-card-${idx}`}
              className="inf-service-card"
              {...influencerRevealItem(idx, 0.08)}
            >
              <div className="inf-service-card__icon">{item.icon}</div>
              <h3 className="inf-service-card__title">{item.title}</h3>
              {item.description ? <p className="inf-service-card__text">{item.description}</p> : null}
              {Array.isArray(item.features) && item.features.length > 0 ? (
                <ul className="inf-service-card__text list-disc pl-5 mt-3 space-y-1">
                  {item.features.map((feature, featureIndex) => (
                    <li key={`${item?.title || "item"}-${feature || featureIndex}`}>{feature}</li>
                  ))}
                </ul>
              ) : null}
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

InfFeatureCardsList.displayName = "InfFeatureCardsList";

export default InfFeatureCardsList;
