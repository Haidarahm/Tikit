import { motion as Motion } from "framer-motion";
import { LocaleLink as Link } from "@/components/LocaleLink.jsx";
import {
  benefitsSection,
  dmRelatedLinkCard,
  dmSubpageItemVariants as itemVariants,
  VIEWPORT_DM_SUBPAGE as viewport,
} from "@/helpers/framerMotion";
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

const DMRelatedServices = ({ current, withScrollReveal = false }) => {
  const { t } = useTranslation();
  const { language } = useI18nLanguage();
  const fontClass = language === "ar" ? "font-cairo" : "font-antonio";

  const siblingKeys = ALL_KEYS.filter((key) => key !== current);

  const inner = (
    <section className="dm-section">
      <div className="dm-container-wide">
        <Motion.h2 className={`dm-section-title ${fontClass}`} {...benefitsSection.headerWrap}>
          {t("serviceSections.digitalMarketing.relatedTitle")}
        </Motion.h2>
        <div className="dm-link-grid mt-10">
          <Motion.div className="min-h-0" {...dmRelatedLinkCard(0)}>
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
          </Motion.div>

          {siblingKeys.map((key, idx) => {
            const { icon: Icon, path } = SERVICES_CONFIG[key];
            return (
              <Motion.div key={key} className="min-h-0" {...dmRelatedLinkCard(idx + 1)}>
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
              </Motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );

  if (withScrollReveal) {
    return (
      <Motion.section
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={itemVariants}
      >
        {inner}
      </Motion.section>
    );
  }

  return inner;
};

export default DMRelatedServices;

