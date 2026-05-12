import { forwardRef } from "react";
import { useFontClass } from "../../../../hooks/useFontClass";
import {
  AnimatedSection,
  AnimatedTitle,
  AnimatedText,
  AnimatedGroup,
  AnimatedCard,
} from "@/components/animations";

const InfIndustries = forwardRef(({ label, title, description, industries }, ref) => {
  const { fontHeading } = useFontClass();

  return (
    <AnimatedSection ref={ref} className="inf-section inf-section--alt">
      <div className="inf-container">
        <AnimatedText as="span" className="inf-label">{label}</AnimatedText>
        <AnimatedTitle as="h2" className={`inf-heading ${fontHeading}`} delay={0.05}>{title}</AnimatedTitle>
        <AnimatedText className="inf-desc" delay={0.1}>{description}</AnimatedText>

        <AnimatedGroup as="div" className="flex flex-wrap gap-4" stagger={0.05}>
          {industries.map((industry, idx) => (
            <AnimatedCard
              key={industry?.title || `industry-${idx}`}
              className="inf-industry-tag"
            >
              <span className="text-lg">{industry.icon}</span>
              <span>{industry.title}</span>
            </AnimatedCard>
          ))}
        </AnimatedGroup>
      </div>
    </AnimatedSection>
  );
});

InfIndustries.displayName = "InfIndustries";
export default InfIndustries;
