import { forwardRef } from "react";
import { useFontClass } from "../../../../hooks/useFontClass";
import {
  AnimatedSection,
  AnimatedTitle,
  AnimatedText,
  AnimatedGroup,
  AnimatedCard,
} from "@/components/animations";

const sizeLabels = ["1K–10K", "10K–100K", "100K–1M", "1M+"];

const InfInfluencerTypes = forwardRef(({ label, title, description, types }, ref) => {
  const { fontHeading } = useFontClass();

  return (
    <AnimatedSection ref={ref} className="inf-section inf-section--alt">
      <div className="inf-container">
        <AnimatedText as="span" className="inf-label">{label}</AnimatedText>
        <AnimatedTitle as="h2" className={`inf-heading ${fontHeading}`} delay={0.05}>{title}</AnimatedTitle>
        <AnimatedText className="inf-desc" delay={0.1}>{description}</AnimatedText>

        <AnimatedGroup as="div" className="grid grid-cols-1 sm:grid-cols-2 gap-5" stagger={0.1}>
          {types.map((type, idx) => (
            <AnimatedCard key={type?.title || `type-${idx}`} className="inf-type-card">
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
            </AnimatedCard>
          ))}
        </AnimatedGroup>
      </div>
    </AnimatedSection>
  );
});

InfInfluencerTypes.displayName = "InfInfluencerTypes";
export default InfInfluencerTypes;
