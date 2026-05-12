import { forwardRef } from "react";
import { motion as Motion } from "framer-motion";
import { influencerRevealPanel, influencerSectionIntro } from "@/helpers/framerMotion";
import { useFontClass } from "../../../../hooks/useFontClass";

const InfComparisonTable = forwardRef(({ label, title, description, rows, footer, headerFeature = "Feature", headerInfluencer = "Influencer Marketing", headerTraditional = "Traditional Advertising" }, ref) => {
  const { fontHeading } = useFontClass();

  return (
    <section ref={ref} className="inf-section inf-section--alt">
      <div className="inf-container">
        <Motion.div {...influencerSectionIntro}>
          <span className="inf-label">{label}</span>
          <h2 className={`inf-heading ${fontHeading}`}>{title}</h2>
          <p className="inf-desc">{description}</p>
        </Motion.div>

        <Motion.div className="overflow-x-auto" {...influencerRevealPanel}>
          <table className="inf-table">
            <thead>
              <tr>
                <th>{headerFeature}</th>
                <th>{headerInfluencer}</th>
                <th>{headerTraditional}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={row?.feature || `row-${idx}`}>
                  <td className="font-semibold" style={{ color: "var(--foreground)" }}>
                    {row.feature}
                  </td>
                  <td>{row.influencer}</td>
                  <td>{row.traditional}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Motion.div>

        {footer && (
          <p
            className="mt-6 text-sm leading-relaxed"
            style={{ color: "color-mix(in srgb, var(--foreground) 65%, transparent)" }}
          >
            {footer}
          </p>
        )}
      </div>
    </section>
  );
});

InfComparisonTable.displayName = "InfComparisonTable";
export default InfComparisonTable;
