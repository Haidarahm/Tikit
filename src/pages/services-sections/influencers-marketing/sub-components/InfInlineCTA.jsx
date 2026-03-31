import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { useFontClass } from "../../../../hooks/useFontClass";

const InfInlineCTA = forwardRef(
  ({ label, title, description, buttonText, buttonHref = "/contact-us", subtle = false }, ref) => {
    const { fontHeading } = useFontClass();

    return (
      <section ref={ref} className={`inf-section ${subtle ? "inf-section--alt" : ""}`}>
        <div className="inf-container">
          <div
            className="inf-reveal rounded-2xl border p-6 md:p-8 text-center"
            style={{
              borderColor: "color-mix(in srgb, var(--secondary) 22%, transparent)",
              background: subtle
                ? "color-mix(in srgb, var(--secondary) 8%, var(--background) 92%)"
                : "linear-gradient(135deg, color-mix(in srgb, var(--secondary) 18%, transparent), color-mix(in srgb, var(--secondary) 4%, var(--background) 96%))",
            }}
          >
            {label ? <span className="inf-label mb-4">{label}</span> : null}
            {title ? <h3 className={`inf-heading text-2xl md:text-3xl mb-3 ${fontHeading}`}>{title}</h3> : null}
            {description ? <p className="inf-desc mx-auto mb-6 max-w-3xl">{description}</p> : null}
            <Link to={buttonHref} className="im-cta-btn inline-flex">
              {buttonText}
            </Link>
          </div>
        </div>
      </section>
    );
  }
);

InfInlineCTA.displayName = "InfInlineCTA";

export default InfInlineCTA;
