import { forwardRef } from "react";
import { useFontClass } from "../../../../hooks/useFontClass";
import {
  AnimatedSection,
  AnimatedTitle,
  AnimatedText,
  AnimatedGroup,
  AnimatedCard,
} from "@/components/animations";

const InfFullService = forwardRef(({ label, title, description, items }, ref) => {
  const { fontHeading } = useFontClass();

  return (
    <AnimatedSection ref={ref} className="inf-section inf-section--alt">
      <div className="inf-container">
        <AnimatedText as="span" className="inf-label">{label}</AnimatedText>
        <AnimatedTitle as="h2" className={`inf-heading ${fontHeading}`} delay={0.05}>{title}</AnimatedTitle>
        <AnimatedText className="inf-desc" delay={0.1}>{description}</AnimatedText>

        <AnimatedGroup as="div" className="grid grid-cols-1 md:grid-cols-3 gap-6" stagger={0.1}>
          {items.map((item, idx) => (
            <AnimatedCard
              key={item?.title || `item-${idx}`}
              className="inf-service-card inf-service-card--accent-bar group"
            >
              <div className="inf-service-card__icon">{item.icon}</div>
              <h3 className="inf-service-card__title">{item.title}</h3>
              <p className="inf-service-card__text">{item.description}</p>
            </AnimatedCard>
          ))}
        </AnimatedGroup>
      </div>
    </AnimatedSection>
  );
});

InfFullService.displayName = "InfFullService";
export default InfFullService;
