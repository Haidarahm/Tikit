import { forwardRef } from "react";
import { useFontClass } from "../../../../hooks/useFontClass";

const InfWhyChooseUs = forwardRef(({ label, title, description, reasons, footerContent }, ref) => {
  const { fontHeading } = useFontClass();

  return (
    <section ref={ref} className="inf-section">
      <div className="inf-container">
        <span className="inf-label">{label}</span>
        <h2 className={`inf-heading ${fontHeading}`}>{title}</h2>
        <p className="inf-desc">{description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, idx) => (
            <div key={idx} className="inf-why-card inf-reveal">
              <div className="inf-why-card__icon">{reason.icon}</div>
              <h3 className="inf-service-card__title">{reason.title}</h3>
              <p className="inf-service-card__text">{reason.description}</p>
            </div>
          ))}
        </div>

        {footerContent ? (
          <div className="mt-12">
            {footerContent}
          </div>
        ) : null}
      </div>
    </section>
  );
});

InfWhyChooseUs.displayName = "InfWhyChooseUs";
export default InfWhyChooseUs;
