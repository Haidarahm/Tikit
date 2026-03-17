import { forwardRef } from "react";
import { useFontClass } from "../../../../hooks/useFontClass";

const InfServicesGrid = forwardRef(({ label, title, description, services }, ref) => {
  const { fontHeading } = useFontClass();

  return (
    <section ref={ref} className="inf-section">
      <div className="inf-container">
        <span className="inf-label">{label}</span>
        <h2 className={`inf-heading ${fontHeading}`}>{title}</h2>
        <p className="inf-desc">{description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div key={idx} className="inf-service-card inf-reveal">
              <div className="inf-service-card__icon">{service.icon}</div>
              <h3 className="inf-service-card__title">{service.title}</h3>
              <p className="inf-service-card__text">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

InfServicesGrid.displayName = "InfServicesGrid";
export default InfServicesGrid;
