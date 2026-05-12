import { forwardRef } from "react";
import { useFontClass } from "../../../../hooks/useFontClass";
import {
  AnimatedSection,
  AnimatedTitle,
  AnimatedText,
  AnimatedGroup,
  AnimatedCard,
} from "@/components/animations";

const InfIconCardGrid = forwardRef(({ label, title, description, items, columns = 2 }, ref) => {
  const { fontHeading } = useFontClass();
  const gridClass =
    columns === 3
      ? "grid grid-cols-1 md:grid-cols-3 gap-6"
      : "grid grid-cols-1 sm:grid-cols-2 gap-5";

  return (
    <AnimatedSection ref={ref} className="inf-section inf-section--alt">
      <div className="inf-container">
        <AnimatedText as="span" className="inf-label">{label}</AnimatedText>
        <AnimatedTitle as="h2" className={`inf-heading ${fontHeading}`} delay={0.05}>{title}</AnimatedTitle>
        <AnimatedText className="inf-desc" delay={0.1}>{description}</AnimatedText>

        <AnimatedGroup as="div" className={gridClass} stagger={0.1}>
          {items.map((item, idx) => (
            <AnimatedCard
              key={item?.title || `icon-card-${idx}`}
              className="inf-type-card"
            >
              <div className="inf-type-card__badge">{item.icon}</div>
              <div className="flex-1">
                <h3 className="inf-service-card__title">{item.title}</h3>
                {item.description ? <p className="inf-service-card__text">{item.description}</p> : null}
              </div>
            </AnimatedCard>
          ))}
        </AnimatedGroup>
      </div>
    </AnimatedSection>
  );
});

InfIconCardGrid.displayName = "InfIconCardGrid";
export default InfIconCardGrid;
