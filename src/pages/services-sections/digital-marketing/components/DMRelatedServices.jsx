import { LocaleLink as Link } from "@/components/LocaleLink.jsx";
import { useTranslation } from "react-i18next";
import {
  HiChartBar,
  HiSearchCircle,
  HiCurrencyDollar,
  HiTrendingUp,
  HiLightningBolt,
} from "react-icons/hi";
import { useI18nLanguage } from "../../../../store/I18nLanguageContext";

const SERVICES_CONFIG = {
  seoServices: {
    icon: HiSearchCircle,
    path: "/digital-marketing-agency-dubai/seo-services",
  },
  paidAds: {
    icon: HiCurrencyDollar,
    path: "/digital-marketing-agency-dubai/paid-ads-management",
  },
  conversionOptimization: {
    icon: HiTrendingUp,
    path: "/digital-marketing-agency-dubai/conversion-optimization",
  },
  performanceMarketing: {
    icon: HiLightningBolt,
    path: "/digital-marketing-agency-dubai/performance-marketing",
  },
};

const ALL_KEYS = Object.keys(SERVICES_CONFIG);

const DMRelatedServices = ({ current }) => {
  const { t } = useTranslation();
  const { language } = useI18nLanguage();
  const fontClass = language === "ar" ? "font-cairo" : "font-antonio";

  const siblingKeys = ALL_KEYS.filter((key) => key !== current);

  return (
    <section className="dm-section">
      <div className="dm-container-wide">
        <h2 className={`dm-section-title ${fontClass}`}>
          {t("serviceSections.digitalMarketing.relatedTitle")}
        </h2>
        <div className="dm-link-grid mt-10">
          <div className="min-h-0">
            <Link
              to="/digital-marketing-agency-dubai"
              className="dm-link-card block h-full"
            >
              <div className="dm-link-card-icon">
                <HiChartBar />
              </div>
              <h3 className="dm-link-card-title">
                {t("serviceSections.digitalMarketing.hubLinkTitle")}
              </h3>
              <p className="dm-link-card-desc">
                {t("serviceSections.digitalMarketing.hubLinkDesc")}
              </p>
              <span className="dm-link-card-arrow">View Hub →</span>
            </Link>
          </div>

          {siblingKeys.map((key) => {
            const { icon: Icon, path } = SERVICES_CONFIG[key];
            return (
              <div key={key} className="min-h-0">
                <Link to={path} className="dm-link-card block h-full">
                  <div className="dm-link-card-icon">
                    <Icon />
                  </div>
                  <h3 className="dm-link-card-title">
                    {t(`serviceSections.digitalMarketing.subServices.${key}.title`)}
                  </h3>
                  <p className="dm-link-card-desc">
                    {t(
                      `serviceSections.digitalMarketing.subServices.${key}.description`,
                    )}
                  </p>
                  <span className="dm-link-card-arrow">
                    {t("serviceSections.digitalMarketing.subServices.learnMore")} →
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DMRelatedServices;
