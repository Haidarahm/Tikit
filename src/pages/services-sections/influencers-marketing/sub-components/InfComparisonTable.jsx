import { forwardRef } from "react";
import { useFontClass } from "../../../../hooks/useFontClass";

const InfComparisonTable = forwardRef(({ label, title, description, rows, footer }, ref) => {
  const { fontHeading } = useFontClass();

  return (
    <section ref={ref} className="inf-section inf-section--alt">
      <div className="inf-container">
        <span className="inf-label">{label}</span>
        <h2 className={`inf-heading ${fontHeading}`}>{title}</h2>
        <p className="inf-desc">{description}</p>

        <div className="overflow-x-auto">
          <table className="inf-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Influencer Marketing</th>
                <th>Traditional Advertising</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={idx}>
                  <td className="font-semibold" style={{ color: "var(--foreground)" }}>
                    {row.feature}
                  </td>
                  <td>{row.influencer}</td>
                  <td>{row.traditional}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
