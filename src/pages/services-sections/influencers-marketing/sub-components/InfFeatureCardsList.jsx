import { forwardRef } from "react";
import { useFontClass } from "../../../../hooks/useFontClass";
import {
  AnimatedSection,
  AnimatedTitle,
  AnimatedText,
  AnimatedGroup,
  AnimatedCard,
} from "@/components/animations";

const InfFeatureCardsList = forwardRef(({ label, title, description, items = [] }, ref) => {
  const { fontHeading } = useFontClass();

  return (
    <AnimatedSection ref={ref} className="inf-section">
      <div className="inf-container">
        <AnimatedText as="span" className="inf-label">{label}</AnimatedText>
        <AnimatedTitle as="h2" className={`inf-heading ${fontHeading}`} delay={0.05}>{title}</AnimatedTitle>
        <AnimatedText className="inf-desc" delay={0.1}>{description}</AnimatedText>

        <AnimatedGroup as="div" className="grid grid-cols-1 md:grid-cols-2 gap-6" stagger={0.12}>
          {items.map((item, idx) => (
            <AnimatedCard
              key={item?.title || `feature-card-${idx}`}
              className="inf-service-card"
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
            </AnimatedCard>
          ))}
        </AnimatedGroup>
      </div>
    </AnimatedSection>
  );
});

InfFeatureCardsList.displayName = "InfFeatureCardsList";

export default InfFeatureCardsList;
