import { forwardRef } from "react";
import { FiArrowRight, FiPhone } from "react-icons/fi";
import {
  AnimatedSection,
  AnimatedTitle,
  AnimatedText,
  AnimatedGroup,
  AnimatedButton,
} from "@/components/animations";

/**
 * Reusable CTA section: label, title, description, primary + secondary buttons.
 *
 * Buttons live inside an `AnimatedGroup` so they stagger in side-by-side
 * once the section enters the viewport.
 */
const ServiceCTASection = forwardRef((props, ref) => {
  const {
    sectionLabel,
    title,
    description,
    primaryButtonText,
    primaryHref = "/contact",
    secondaryButtonText,
    secondaryHref = "tel:+97145774042",
    dir,
    classPrefix = "im",
  } = props;
  const p = classPrefix;
  const isSecondaryExternal = typeof secondaryHref === "string" && secondaryHref.startsWith("http");

  return (
    <AnimatedSection ref={ref} className={`${p}-cta`} dir={dir}>
      <div className={`${p}-cta__inner`}>
        <AnimatedText as="p" className={`${p}-label text-center mb-4 block`}>{sectionLabel}</AnimatedText>
        <AnimatedTitle as="h2" className={`${p}-cta__title font-antonio`} delay={0.05}>{title}</AnimatedTitle>
        <AnimatedText className={`${p}-cta__desc`} delay={0.1}>{description}</AnimatedText>
        <AnimatedGroup as="div" className={`${p}-cta__buttons`} stagger={0.1} delayChildren={0.15}>
          <AnimatedButton as="a" href={primaryHref} className={`${p}-btn-primary`}>
            <FiArrowRight />
            {primaryButtonText}
          </AnimatedButton>
          <AnimatedButton
            as="a"
            href={secondaryHref}
            {...(isSecondaryExternal ? { target: "_blank", rel: "noreferrer noopener" } : {})}
            className={`${p}-btn-secondary`}
          >
            <FiPhone />
            {secondaryButtonText}
          </AnimatedButton>
        </AnimatedGroup>
      </div>
    </AnimatedSection>
  );
});

ServiceCTASection.displayName = "ServiceCTASection";

export default ServiceCTASection;
