import { forwardRef } from "react";
import { motion as Motion } from "framer-motion";
import { influencerRevealPanel } from "@/helpers/framerMotion";
import { useFontClass } from "../../../../hooks/useFontClass";

const statementCardStyle = {
  borderColor: "color-mix(in srgb, var(--secondary) 18%, transparent)",
  background:
    "linear-gradient(180deg, color-mix(in srgb, var(--secondary) 8%, transparent), color-mix(in srgb, var(--background) 96%, white))",
};

const InfPositioningStatement = forwardRef(({ label, title, description }, ref) => {
  const { fontHeading } = useFontClass();

  return (
    <section ref={ref} className="inf-section inf-section--alt">
      <div className="inf-container">
        <Motion.div
          className="rounded-2xl border px-6 py-8 md:px-10 md:py-12 text-center"
          style={statementCardStyle}
          {...influencerRevealPanel}
        >
          {label ? <span className="inf-label mb-4">{label}</span> : null}
          {title ? <h3 className={`inf-heading text-2xl md:text-4xl mb-4 ${fontHeading}`}>{title}</h3> : null}
          {description ? <p className="inf-desc mx-auto max-w-3xl">{description}</p> : null}
        </Motion.div>
      </div>
    </section>
  );
});

InfPositioningStatement.displayName = "InfPositioningStatement";

export default InfPositioningStatement;
