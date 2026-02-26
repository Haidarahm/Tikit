import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../../../store/I18nLanguageContext";

const DMCTA = () => {
  const { t } = useTranslation();
  const { language } = useI18nLanguage();
  const fontClass = language === "ar" ? "font-cairo" : "font-antonio";

  return (
    <section className="dm-section">
      <div className="max-w-4xl mx-auto text-center">
        <h2
          className={`text-3xl md:text-5xl font-bold mb-6 ${fontClass}`}
          style={{ color: "var(--foreground)" }}
        >
          {t("serviceSections.digitalMarketing.cta.title")}
        </h2>
        <p className="dm-text" style={{ marginBottom: "2rem" }}>
          {t("serviceSections.digitalMarketing.cta.description")}
        </p>
        <a href="/contact-us" className="dm-cta-btn">
          {t("serviceSections.digitalMarketing.cta.button")}
        </a>
      </div>
    </section>
  );
};

export default DMCTA;

