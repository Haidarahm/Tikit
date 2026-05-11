import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../../store/I18nLanguageContext";
import { HiCheckCircle, HiGlobeAlt } from "react-icons/hi";
import {
  FaGoogle,
  FaFacebook,
  FaTiktok,
  FaSnapchatGhost,
  FaLinkedin,
} from "react-icons/fa";
import HeroWithBadge from "../../../components/HeroWithBadge";
import SEOHead from "../../../components/SEOHead";
import FAQ from "../../../components/FAQ";
import ServiceCard from "../../../components/ServiceCard";
import DMCTA from "./components/DMCTA";
import DMRelatedServices from "./components/DMRelatedServices";
import {
  MotionDiv,
  MotionP,
  MotionH2,
  MotionLi,
  MotionSection,
  dmContainerVariants as containerVariants,
  dmItemVariants as itemVariants,
  dmViewport as viewport,
} from "./dmMotion";
import "./digitalMarketing.css";

const SERVICE_KEYS = [
  "googleAds",
  "metaAds",
  "tiktokAds",
  "snapchatAds",
  "linkedinAds",
  "programmaticDisplay",
];

const SERVICE_ICONS = [
  FaGoogle,
  FaFacebook,
  FaTiktok,
  FaSnapchatGhost,
  FaLinkedin,
  HiGlobeAlt,
];

const PROCESS_KEYS = ["audit", "setup", "optimize", "report"];

const toArray = (value) => (Array.isArray(value) ? value : []);

const PaidAdsManagement = () => {
  const { t } = useTranslation();
  const { isRtl, language } = useI18nLanguage();
  const fontClass = language === "ar" ? "font-cairo" : "font-antonio";

  const faqItems = toArray(
    t("serviceSections.digitalMarketing.paidAds.faqItems", {
      returnObjects: true,
    }),
  );
  const benefitsList = toArray(
    t("serviceSections.digitalMarketing.paidAds.definition.benefitsList", {
      returnObjects: true,
    }),
  );
  const includedItems = toArray(
    t("serviceSections.digitalMarketing.paidAds.included.items", {
      returnObjects: true,
    }),
  );
  const whyChooseItems = toArray(
    t("serviceSections.digitalMarketing.paidAds.whyChoose.items", {
      returnObjects: true,
    }),
  ).filter(
    (row) =>
      row &&
      typeof row === "object" &&
      typeof row.title === "string" &&
      typeof row.description === "string",
  );

  return (
    <div
      data-nav-color="black"
      className={`dm-page ${isRtl ? "font-cairo" : "font-hero-light"}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <SEOHead
        title="Paid Ads Management Dubai & UAE | Google, Meta & TikTok | Tikit"
        description="Paid ads management in Dubai and the UAE: Google Ads, Meta, TikTok, Snapchat, LinkedIn, and programmatic. Precision, creative, and optimisation—built for measurable growth."
        keywords="paid ads management Dubai, PPC agency UAE, Google Ads Dubai, Meta ads UAE, TikTok ads Dubai, Snapchat ads UAE, LinkedIn ads Dubai"
        canonicalUrl="/digital-marketing-agency-dubai/paid-ads-management"
        serviceType="Paid Ads Management"
        faqItems={faqItems}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: "Digital Marketing", url: "/digital-marketing-agency-dubai" },
          {
            name: "Paid Ads Management",
            url: "/digital-marketing-agency-dubai/paid-ads-management",
          },
        ]}
      />

      <section className="dm-hero">
        <div className="dm-hero-overlay">
          <div className="dm-hero-gradient" />
        </div>
        <MotionDiv
          className="dm-hero-content relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={containerVariants}
        >
          <MotionDiv variants={itemVariants}>
            <HeroWithBadge
              badge={t("serviceSections.digitalMarketing.paidAds.badge")}
              title={t("serviceSections.digitalMarketing.paidAds.hero.title")}
              mainWord={t(
                "serviceSections.digitalMarketing.paidAds.hero.mainWord",
              )}
              description={t(
                "serviceSections.digitalMarketing.paidAds.hero.description",
              )}
              titleClassName="block"
              descriptionClassName="dm-hero-desc"
              contentClassName="relative z-10 max-w-6xl mx-auto text-center mt-6"
              disableAnimation
            />
          </MotionDiv>
          <MotionP
            variants={itemVariants}
            className="dm-hero-desc dm-hero-desc--secondary mt-6"
          >
            {t("serviceSections.digitalMarketing.paidAds.heroSecondary")}
          </MotionP>
          <MotionDiv
            variants={itemVariants}
            className="mt-10 flex justify-center"
          >
            <a href="/contact-us" className="dm-cta-btn">
              {t("serviceSections.digitalMarketing.paidAds.heroCta")}
            </a>
          </MotionDiv>
        </MotionDiv>
      </section>

      <div className="dm-divider-wrap">
        <div className="dm-divider" />
      </div>

      <section className="dm-section">
        <div className="dm-container">
          <h2 className={`dm-heading ${fontClass}`}>
            {t(
              "serviceSections.digitalMarketing.paidAds.definition.whatIsTitle",
            )}
          </h2>
          <p className="dm-text">
            {t(
              "serviceSections.digitalMarketing.paidAds.definition.paragraph",
            )}
          </p>
          <p className="dm-text">
            {t(
              "serviceSections.digitalMarketing.paidAds.definition.paragraph2",
            )}
          </p>
          <p className="dm-benefits-label font-semibold mb-3 mt-6">
            {t(
              "serviceSections.digitalMarketing.paidAds.definition.benefitsLabel",
            )}
          </p>
          <ul className="space-y-3">
            {benefitsList.map((item, idx) => (
              <li key={idx} className="dm-check-item">
                <HiCheckCircle className="dm-check-icon" />
                <span className="dm-text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="dm-divider-wrap">
        <div className="dm-divider" />
      </div>

      <section className="dm-section dm-section-alt">
        <MotionDiv
          className="dm-container-wide"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={containerVariants}
        >
          <MotionH2
            variants={itemVariants}
            className={`dm-section-title ${fontClass}`}
          >
            {t("serviceSections.digitalMarketing.paidAds.services.title")}
          </MotionH2>
          <MotionP variants={itemVariants} className="dm-section-subtitle">
            {t("serviceSections.digitalMarketing.paidAds.services.subtitle")}
          </MotionP>
          <div className="dm-feature-grid">
            {SERVICE_KEYS.map((key, idx) => (
              <MotionDiv key={key} variants={itemVariants}>
                <ServiceCard
                  icon={SERVICE_ICONS[idx]}
                  title={t(
                    `serviceSections.digitalMarketing.paidAds.services.items.${key}.title`,
                  )}
                  description={t(
                    `serviceSections.digitalMarketing.paidAds.services.items.${key}.description`,
                  )}
                  iconWrapperClassName="dm-card-icon"
                  iconClassName="w-8 h-8 text-white"
                  titleClassName="dm-card-title"
                  descriptionClassName="dm-card-desc"
                />
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>
      </section>

      <div className="dm-divider-wrap">
        <div className="dm-divider" />
      </div>

      <section className="dm-section">
        <MotionDiv
          className="dm-container"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={containerVariants}
        >
          <MotionH2
            variants={itemVariants}
            className={`dm-section-title ${fontClass}`}
          >
            {t("serviceSections.digitalMarketing.paidAds.included.title")}
          </MotionH2>
          <MotionP variants={itemVariants} className="dm-section-subtitle">
            {t("serviceSections.digitalMarketing.paidAds.included.subtitle")}
          </MotionP>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
            {includedItems.map((item, idx) => (
              <MotionLi
                key={idx}
                variants={itemVariants}
                className="dm-check-item"
              >
                <HiCheckCircle className="dm-check-icon" />
                <span className="dm-text-sm">{item}</span>
              </MotionLi>
            ))}
          </ul>
        </MotionDiv>
      </section>

      <div className="dm-divider-wrap">
        <div className="dm-divider" />
      </div>

      <section className="dm-section dm-section-alt">
        <MotionDiv
          className="dm-container"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={containerVariants}
        >
          <MotionH2
            variants={itemVariants}
            className={`dm-section-title ${fontClass}`}
          >
            {t("serviceSections.digitalMarketing.paidAds.whyChoose.title")}
          </MotionH2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {whyChooseItems.map((row, idx) => (
              <MotionDiv
                key={`${row.title}-${idx}`}
                variants={itemVariants}
                className="dm-process-card"
              >
                <h3 className="dm-step-title">{row.title}</h3>
                <p className="dm-step-desc">{row.description}</p>
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>
      </section>

      <div className="dm-divider-wrap">
        <div className="dm-divider" />
      </div>

      <section className="dm-section">
        <MotionDiv
          className="dm-container"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={containerVariants}
        >
          <MotionH2
            variants={itemVariants}
            className={`dm-section-title ${fontClass}`}
          >
            {t("serviceSections.digitalMarketing.paidAds.process.title")}
          </MotionH2>
          <MotionP variants={itemVariants} className="dm-section-subtitle">
            {t("serviceSections.digitalMarketing.paidAds.process.subtitle")}
          </MotionP>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {PROCESS_KEYS.map((step, idx) => (
              <MotionDiv
                key={step}
                variants={itemVariants}
                className="dm-process-card"
              >
                <div className="dm-step-number">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <h3 className="dm-step-title">
                  {t(
                    `serviceSections.digitalMarketing.paidAds.process.steps.${step}.title`,
                  )}
                </h3>
                <p className="dm-step-desc">
                  {t(
                    `serviceSections.digitalMarketing.paidAds.process.steps.${step}.description`,
                  )}
                </p>
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>
      </section>

      <div className="dm-divider-wrap">
        <div className="dm-divider" />
      </div>

      <section className="dm-section dm-section-alt">
        <MotionDiv
          className="dm-container text-center"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={containerVariants}
        >
          <MotionH2
            variants={itemVariants}
            className={`dm-section-title ${fontClass} max-w-3xl mx-auto`}
          >
            {t("serviceSections.digitalMarketing.paidAds.finalCta.title")}
          </MotionH2>
          <MotionP
            variants={itemVariants}
            className="dm-text max-w-2xl mx-auto mt-4"
          >
            {t("serviceSections.digitalMarketing.paidAds.finalCta.description")}
          </MotionP>
          <MotionDiv variants={itemVariants} className="mt-8 flex justify-center">
            <a href="/contact-us" className="dm-cta-btn">
              {t("serviceSections.digitalMarketing.paidAds.finalCta.button")}
            </a>
          </MotionDiv>
        </MotionDiv>
      </section>

      <div className="dm-divider-wrap">
        <div className="dm-divider" />
      </div>

      <FAQ
        items={faqItems}
        title={t("serviceSections.digitalMarketing.paidAds.faqTitle")}
      />

      <MotionSection
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={itemVariants}
      >
        <DMRelatedServices current="paidAds" />
      </MotionSection>

      <DMCTA />
    </div>
  );
};

export default PaidAdsManagement;
