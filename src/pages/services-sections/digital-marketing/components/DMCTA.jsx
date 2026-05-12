import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../../../store/I18nLanguageContext";
import {
  AnimatedSection,
  AnimatedTitle,
  AnimatedText,
  AnimatedButton,
} from "@/components/animations";

const DMCTA = () => {
  const { t } = useTranslation();
  const { language } = useI18nLanguage();
  const fontClass = language === "ar" ? "font-cairo" : "font-antonio";

  return (
    <AnimatedSection className="dm-section">
      <div className="max-w-4xl mx-auto text-center">
        <AnimatedTitle
          as="h2"
          className={`text-3xl md:text-5xl font-bold mb-6 ${fontClass}`}
          style={{ color: "var(--foreground)" }}
        >
          {t("serviceSections.digitalMarketing.cta.title")}
        </AnimatedTitle>
        <AnimatedText className="dm-text" style={{ marginBottom: "2rem" }} delay={0.05}>
          {t("serviceSections.digitalMarketing.cta.description")}
        </AnimatedText>
        <AnimatedButton as="a" href="/contact-us" className="dm-cta-btn" delay={0.15}>
          {t("serviceSections.digitalMarketing.cta.button")}
        </AnimatedButton>
      </div>
    </AnimatedSection>
  );
};

export default DMCTA;
