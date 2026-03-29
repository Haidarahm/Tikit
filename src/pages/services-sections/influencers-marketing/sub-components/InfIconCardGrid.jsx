import { forwardRef } from "react";
import { useFontClass } from "../../../../hooks/useFontClass";

const InfIconCardGrid = forwardRef(({ label, title, description, items, columns = 2 }, ref) => {
  const { fontHeading } = useFontClass();
  const gridClass =
    columns === 3
      ? "grid grid-cols-1 md:grid-cols-3 gap-6"
      : "grid grid-cols-1 sm:grid-cols-2 gap-5";

  return (
    <section ref={ref} className="inf-section inf-section--alt">
      <div className="inf-container">
        <span className="inf-label">{label}</span>
        <h2 className={`inf-heading ${fontHeading}`}>{title}</h2>
        <p className="inf-desc">{description}</p>

        <div className={gridClass}>
          {items.map((item, idx) => (
            <div key={idx} className="inf-type-card inf-reveal">
              <div className="inf-type-card__badge">{item.icon}</div>
              <div className="flex-1">
                <h3 className="inf-service-card__title">{item.title}</h3>
                <p className="inf-service-card__text">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

InfIconCardGrid.displayName = "InfIconCardGrid";
export default InfIconCardGrid;
