import { forwardRef } from "react";
import { useFontClass } from "../../../../hooks/useFontClass";

const sizeLabels = ["1K–10K", "10K–100K", "100K–1M", "1M+"];

const InfInfluencerTypes = forwardRef(({ label, title, description, types }, ref) => {
  const { fontHeading } = useFontClass();

  return (
    <section ref={ref} className="inf-section inf-section--alt">
      <div className="inf-container">
        <span className="inf-label">{label}</span>
        <h2 className={`inf-heading ${fontHeading}`}>{title}</h2>
        <p className="inf-desc">{description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {types.map((type, idx) => (
            <div key={idx} className="inf-type-card inf-reveal">
              <div className="inf-type-card__badge">{type.icon}</div>
              <div className="flex-1">
                <h3 className="inf-service-card__title">{type.title}</h3>
                <p className="inf-service-card__text">{type.description}</p>
                <span
                  className="inline-block mt-2 text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                  style={{
                    color: "var(--secondary)",
                    background: "color-mix(in srgb, var(--secondary) 10%, transparent)",
                  }}
                >
                  {sizeLabels[idx]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

InfInfluencerTypes.displayName = "InfInfluencerTypes";
export default InfInfluencerTypes;
