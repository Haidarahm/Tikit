import { forwardRef } from "react";
import { useFontClass } from "../../../../hooks/useFontClass";

const InfFullService = forwardRef(({ label, title, description, items }, ref) => {
  const { fontHeading } = useFontClass();

  return (
    <section ref={ref} className="inf-section inf-section--alt">
      <div className="inf-container">
        <span className="inf-label">{label}</span>
        <h2 className={`inf-heading ${fontHeading}`}>{title}</h2>
        <p className="inf-desc">{description}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="inf-service-card inf-reveal group"
              style={{ borderLeftWidth: "3px", borderLeftColor: "var(--secondary)" }}
            >
              <div className="inf-service-card__icon">{item.icon}</div>
              <h3 className="inf-service-card__title">{item.title}</h3>
              <p className="inf-service-card__text">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

InfFullService.displayName = "InfFullService";
export default InfFullService;
