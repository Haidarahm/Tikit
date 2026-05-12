import { forwardRef } from "react";
import { useFontClass } from "../../../../hooks/useFontClass";
import {
  AnimatedSection,
  AnimatedTitle,
  AnimatedText,
  AnimatedCard,
} from "@/components/animations";

const InfComparisonTable = forwardRef(({ label, title, description, rows, footer, headerFeature = "Feature", headerInfluencer = "Influencer Marketing", headerTraditional = "Traditional Advertising" }, ref) => {
  const { fontHeading } = useFontClass();

  return (
    <AnimatedSection ref={ref} className="inf-section inf-section--alt">
      <div className="inf-container">
        <div>
          <AnimatedText as="span" className="inf-label">{label}</AnimatedText>
          <AnimatedTitle as="h2" className={`inf-heading ${fontHeading}`} delay={0.05}>{title}</AnimatedTitle>
          <AnimatedText className="inf-desc" delay={0.1}>{description}</AnimatedText>
        </div>

        <AnimatedCard as="div" className="overflow-x-auto" delay={0.15}>
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
        </AnimatedCard>

        {footer && (
          <AnimatedText
            className="mt-6 text-sm leading-relaxed"
            style={{ color: "color-mix(in srgb, var(--foreground) 65%, transparent)" }}
            delay={0.2}
          >
            {footer}
          </AnimatedText>
        )}
      </div>
    </AnimatedSection>
  );
});

InfComparisonTable.displayName = "InfComparisonTable";
export default InfComparisonTable;
