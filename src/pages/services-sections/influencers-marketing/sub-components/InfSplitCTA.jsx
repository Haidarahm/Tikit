import { forwardRef } from "react";
import { LocaleLink as Link } from "@/components/LocaleLink.jsx";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { useFontClass } from "../../../../hooks/useFontClass";
import {
  AnimatedSection,
  AnimatedCard,
  AnimatedTitle,
  AnimatedText,
  AnimatedGroup,
  AnimatedButton,
} from "@/components/animations";

const outerCardStyle = {
  borderColor: "color-mix(in srgb, var(--secondary) 26%, transparent)",
  background:
    "radial-gradient(120% 120% at 0% 0%, color-mix(in srgb, var(--secondary) 20%, transparent), var(--background) 65%)",
};

const panelCardStyle = {
  borderColor: "color-mix(in srgb, var(--secondary) 20%, transparent)",
  background:
    "linear-gradient(165deg, color-mix(in srgb, var(--secondary) 10%, white) 0%, color-mix(in srgb, var(--secondary) 4%, var(--background) 96%) 100%)",
  boxShadow:
    "0 18px 48px -28px color-mix(in srgb, var(--secondary) 45%, transparent), inset 0 1px 0 color-mix(in srgb, white 65%, transparent)",
};

const secondaryButtonStyle = {
  borderColor: "color-mix(in srgb, var(--secondary) 42%, transparent)",
  color: "var(--foreground)",
  background: "color-mix(in srgb, var(--background) 88%, white)",
};

const highlightsListStyle = {
  borderColor: "color-mix(in srgb, var(--secondary) 18%, transparent)",
};

const checkIconStyle = {
  color: "color-mix(in srgb, var(--secondary) 72%, white)",
};

const InfSplitCTA = forwardRef(
  (
    {
      label,
      title,
      description,
      primaryText,
      primaryHref = "/contact-us",
      secondaryText = "Call Us Now",
      secondaryHref = "tel:+97145774042",
      highlights = [],
    },
    ref
  ) => {
    const { fontHeading } = useFontClass();

    return (
      <AnimatedSection ref={ref} className="inf-section">
        <div className="inf-container">
          <AnimatedCard className="rounded-3xl border p-6 md:p-10" style={outerCardStyle}>
            <div className="grid gap-6 md:grid-cols-[1.25fr_0.75fr] md:items-center">
              <div>
                {label ? <AnimatedText as="span" className="inf-label mb-3">{label}</AnimatedText> : null}
                {title ? <AnimatedTitle as="h3" className={`inf-heading text-2xl md:text-4xl mb-3 ${fontHeading}`} delay={0.05}>{title}</AnimatedTitle> : null}
                {description ? <AnimatedText className="inf-desc max-w-2xl" delay={0.1}>{description}</AnimatedText> : null}
              </div>

              <AnimatedCard
                className="rounded-2xl border p-5 md:p-6"
                style={panelCardStyle}
                delay={0.15}
              >
                <div className="mb-4">
                  <p className="text-xs uppercase tracking-[0.18em] opacity-70">Start your campaign</p>
                </div>

                <AnimatedGroup as="div" className="flex flex-col gap-2.5" stagger={0.08}>
                  <AnimatedButton
                    as="a"
                    href={primaryHref}
                    className="im-cta-btn inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm md:text-base"
                  >
                    {primaryText}
                    <FiArrowRight />
                  </AnimatedButton>
                  <AnimatedButton
                    as="a"
                    href={secondaryHref}
                    className="inline-flex items-center justify-center rounded-xl border px-4 py-3 text-sm font-semibold transition hover:-translate-y-0.5 hover:opacity-90"
                    style={secondaryButtonStyle}
                  >
                    {secondaryText}
                  </AnimatedButton>
                </AnimatedGroup>

                {highlights.length ? (
                  <AnimatedGroup
                    as="ul"
                    className="mt-5 space-y-2.5 border-t pt-4"
                    style={highlightsListStyle}
                    stagger={0.06}
                  >
                    {highlights.map((item) => (
                      <AnimatedCard
                        as="li"
                        key={item}
                        className="flex items-start gap-2.5 text-sm leading-relaxed"
                      >
                        <FiCheckCircle className="mt-0.5 shrink-0" style={checkIconStyle} />
                        <span className="opacity-90">{item}</span>
                      </AnimatedCard>
                    ))}
                  </AnimatedGroup>
                ) : null}
              </AnimatedCard>
            </div>
          </AnimatedCard>
        </div>
      </AnimatedSection>
    );
  }
);

InfSplitCTA.displayName = "InfSplitCTA";

export default InfSplitCTA;
