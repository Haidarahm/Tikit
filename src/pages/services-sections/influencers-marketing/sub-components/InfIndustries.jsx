import { forwardRef } from "react";
import { useFontClass } from "../../../../hooks/useFontClass";

const InfIndustries = forwardRef(({ label, title, description, industries }, ref) => {
  const { fontHeading } = useFontClass();

  return (
    <section ref={ref} className="inf-section inf-section--alt">
      <div className="inf-container">
        <span className="inf-label">{label}</span>
        <h2 className={`inf-heading ${fontHeading}`}>{title}</h2>
        <p className="inf-desc">{description}</p>

        <div className="flex flex-wrap gap-4">
          {industries.map((industry, idx) => (
            <div key={industry?.title || JSON.stringify(industry) || `industry-${idx}`} className="inf-industry-tag inf-reveal">
              <span className="text-lg">{industry.icon}</span>
              <span>{industry.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

InfIndustries.displayName = "InfIndustries";
export default InfIndustries;
