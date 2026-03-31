import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { useFontClass } from "../../../../hooks/useFontClass";

const InfGetStartedSection = forwardRef(
  ({ label, title, description, buttonText = "Let's Talk", buttonHref = "/contact-us" }, ref) => {
    const { fontHeading } = useFontClass();

    return (
      <section ref={ref} className="inf-section">
        <div className="inf-container">
          <div className="inf-reveal mx-auto max-w-4xl text-center">
            {label ? <span className="inf-label mb-4">{label}</span> : null}
            {title ? <h3 className={`inf-heading text-2xl md:text-4xl mb-4 ${fontHeading}`}>{title}</h3> : null}
            {description ? <p className="inf-desc mx-auto mb-6 max-w-3xl">{description}</p> : null}
            <Link to={buttonHref} className="im-cta-btn inline-flex items-center gap-2">
              {buttonText}
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    );
  }
);

InfGetStartedSection.displayName = "InfGetStartedSection";

export default InfGetStartedSection;
