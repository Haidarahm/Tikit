import { forwardRef } from "react";
import { useFontClass } from "../../../../hooks/useFontClass";
import {
  AnimatedSection,
  AnimatedTitle,
  AnimatedText,
  AnimatedGroup,
  AnimatedCard,
} from "@/components/animations";

const InfPlatforms = forwardRef(({ label, title, description, platforms }, ref) => {
  const { fontHeading } = useFontClass();

  return (
    <AnimatedSection ref={ref} className="inf-section">
      <div className="inf-container">
        <AnimatedText as="span" className="inf-label">{label}</AnimatedText>
        <AnimatedTitle as="h2" className={`inf-heading ${fontHeading}`} delay={0.05}>{title}</AnimatedTitle>
        <AnimatedText className="inf-desc" delay={0.1}>{description}</AnimatedText>

        <AnimatedGroup as="div" className="grid grid-cols-1 md:grid-cols-3 gap-8" stagger={0.12}>
          {platforms.map((platform, idx) => (
            <AnimatedCard
              key={platform?.title || `platform-${idx}`}
              className="inf-platform-card"
            >
              <div className="inf-platform-card__icon">{platform.icon}</div>
              <h3 className="inf-service-card__title">{platform.title}</h3>
              <p className="inf-service-card__text">{platform.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {platform.tags?.map((tag, ti) => (
                  <span
                    key={`${platform?.title || "platform"}-${tag || ti}`}
                    className="text-[11px] px-3 py-1 rounded-full font-medium"
                    style={{
                      background: "color-mix(in srgb, var(--secondary) 10%, transparent)",
                      color: "var(--secondary)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </AnimatedCard>
          ))}
        </AnimatedGroup>
      </div>
    </AnimatedSection>
  );
});

InfPlatforms.displayName = "InfPlatforms";
export default InfPlatforms;
