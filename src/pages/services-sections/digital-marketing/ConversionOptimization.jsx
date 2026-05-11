import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../../store/I18nLanguageContext";
import {
  HiCheckCircle,
  HiSearchCircle,
  HiTemplate,
  HiChartBar,
  HiUserGroup,
  HiAdjustments,
  HiClipboardCheck,
  HiDeviceMobile,
} from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import HeroWithBadge from "../../../components/HeroWithBadge";
import SEOHead from "../../../components/SEOHead";
import FAQ from "../../../components/FAQ";
import ServiceCard from "../../../components/ServiceCard";
import DMCTA from "./components/DMCTA";
import DMRelatedServices from "./components/DMRelatedServices";
import "./digitalMarketing.css";

const SERVICE_KEYS = [
  "croAudit",
  "landingPage",
  "abTesting",
  "userJourney",
  "uxFunnel",
  "formCheckout",
  "mobile",
  "whatsappChat",
];

const SERVICE_ICONS = [
  HiSearchCircle,
  HiTemplate,
  HiChartBar,
  HiUserGroup,
  HiAdjustments,
  HiClipboardCheck,
  HiDeviceMobile,
  FaWhatsapp,
];

const PROCESS_KEYS = ["discover", "diagnose", "design", "test", "implement"];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const viewport = { once: true, amount: 0.15, margin: "0px 0px -8% 0px" };

const toArray = (value) => (Array.isArray(value) ? value : []);

const ConversionOptimization = () => {
  const { t } = useTranslation();
  const { isRtl, language } = useI18nLanguage();

  const faqItems = toArray(
    t("serviceSections.digitalMarketing.conversionOptimization.faqItems", {
      returnObjects: true,
    }),
  );
  const benefitsList = toArray(
    t(
      "serviceSections.digitalMarketing.conversionOptimization.definition.benefitsList",
      { returnObjects: true },
    ),
  );
  const expectationsList = toArray(
    t(
      "serviceSections.digitalMarketing.conversionOptimization.expectations.items",
      { returnObjects: true },
    ),
  );
  const fontClass = language === "ar" ? "font-cairo" : "font-antonio";

  return (
    <div
      data-nav-color="black"
      className={`dm-page ${isRtl ? "font-cairo" : "font-hero-light"}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <SEOHead
        title="Conversion Rate Optimisation Dubai & UAE | CRO Agency | Tikit"
        description="Turn more visitors into customers with Tikit's CRO services in Dubai & UAE. Audit, A/B testing, landing page, funnel, mobile, and WhatsApp conversion optimisation."
        keywords="conversion rate optimisation Dubai, CRO agency UAE, A/B testing Dubai, landing page optimisation, funnel optimisation, mobile CRO, WhatsApp conversion"
        canonicalUrl="/digital-marketing-agency-dubai/conversion-optimization"
        serviceType="Conversion Rate Optimisation"
        faqItems={faqItems}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: "Digital Marketing", url: "/digital-marketing-agency-dubai" },
          {
            name: "Conversion Optimisation",
            url: "/digital-marketing-agency-dubai/conversion-optimization",
          },
        ]}
      />

      {/* Hero */}
      <section className="dm-hero">
        <div className="dm-hero-overlay">
          <div className="dm-hero-gradient" />
        </div>
        <motion.div
          className="dm-hero-content relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={containerVariants}
        >
          <motion.p
            variants={itemVariants}
            className="dm-hero-kicker"
          >
            {t(
              "serviceSections.digitalMarketing.conversionOptimization.heroTagline",
            )}
          </motion.p>
          <motion.div variants={itemVariants}>
            <HeroWithBadge
              badge={t(
                "serviceSections.digitalMarketing.conversionOptimization.badge",
              )}
              title={t(
                "serviceSections.digitalMarketing.conversionOptimization.hero.title",
              )}
              mainWord={t(
                "serviceSections.digitalMarketing.conversionOptimization.hero.mainWord",
              )}
              description={t(
                "serviceSections.digitalMarketing.conversionOptimization.hero.description",
              )}
              titleClassName="block"
              descriptionClassName="dm-hero-desc"
              contentClassName="relative z-10 max-w-6xl mx-auto text-center mt-6"
              disableAnimation
            />
          </motion.div>
          <motion.p
            variants={itemVariants}
            className="dm-hero-desc dm-hero-desc--secondary mt-6"
          >
            {t(
              "serviceSections.digitalMarketing.conversionOptimization.heroSecondary",
            )}
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="mt-10 flex justify-center"
          >
            <a href="/contact-us" className="dm-cta-btn">
              {t(
                "serviceSections.digitalMarketing.conversionOptimization.heroCta",
              )}
            </a>
          </motion.div>
        </motion.div>
      </section>

      <div className="dm-divider-wrap">
        <div className="dm-divider" />
      </div>

      {/* What is CRO & why it matters */}
      <section className="dm-section">
        <div className="dm-container">
          <h2 className={`dm-heading ${fontClass}`}>
            {t(
              "serviceSections.digitalMarketing.conversionOptimization.definition.whatIsTitle",
            )}
          </h2>
          <p className="dm-text">
            {t(
              "serviceSections.digitalMarketing.conversionOptimization.definition.paragraph",
            )}
          </p>
          <p className="dm-text">
            {t(
              "serviceSections.digitalMarketing.conversionOptimization.definition.paragraph2",
            )}
          </p>
          <p className="dm-benefits-label font-semibold mb-3 mt-6">
            {t(
              "serviceSections.digitalMarketing.conversionOptimization.definition.benefitsLabel",
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

      {/* Services */}
      <section className="dm-section dm-section-alt">
        <motion.div
          className="dm-container-wide"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={containerVariants}
        >
          <motion.h2
            variants={itemVariants}
            className={`dm-section-title ${fontClass}`}
          >
            {t(
              "serviceSections.digitalMarketing.conversionOptimization.services.title",
            )}
          </motion.h2>
          <motion.p variants={itemVariants} className="dm-section-subtitle">
            {t(
              "serviceSections.digitalMarketing.conversionOptimization.services.subtitle",
            )}
          </motion.p>
          <div className="dm-feature-grid">
            {SERVICE_KEYS.map((key, idx) => (
              <motion.div key={key} variants={itemVariants}>
                <ServiceCard
                  icon={SERVICE_ICONS[idx]}
                  title={t(
                    `serviceSections.digitalMarketing.conversionOptimization.services.items.${key}.title`,
                  )}
                  description={t(
                    `serviceSections.digitalMarketing.conversionOptimization.services.items.${key}.description`,
                  )}
                  iconWrapperClassName="dm-card-icon"
                  iconClassName="w-8 h-8 text-white"
                  titleClassName="dm-card-title"
                  descriptionClassName="dm-card-desc"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <div className="dm-divider-wrap">
        <div className="dm-divider" />
      </div>

      {/* Process */}
      <section className="dm-section">
        <motion.div
          className="dm-container"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={containerVariants}
        >
          <motion.h2
            variants={itemVariants}
            className={`dm-section-title ${fontClass}`}
          >
            {t(
              "serviceSections.digitalMarketing.conversionOptimization.process.title",
            )}
          </motion.h2>
          <motion.p variants={itemVariants} className="dm-section-subtitle">
            {t(
              "serviceSections.digitalMarketing.conversionOptimization.process.subtitle",
            )}
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {PROCESS_KEYS.map((step, idx) => (
              <motion.div key={step} variants={itemVariants} className="dm-process-card">
                <div className="dm-step-number">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <h3 className="dm-step-title">
                  {t(
                    `serviceSections.digitalMarketing.conversionOptimization.process.steps.${step}.title`,
                  )}
                </h3>
                <p className="dm-step-desc">
                  {t(
                    `serviceSections.digitalMarketing.conversionOptimization.process.steps.${step}.description`,
                  )}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <div className="dm-divider-wrap">
        <div className="dm-divider" />
      </div>

      {/* Expectations */}
      <section className="dm-section dm-section-alt">
        <motion.div
          className="dm-container"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={containerVariants}
        >
          <motion.h2
            variants={itemVariants}
            className={`dm-section-title ${fontClass}`}
          >
            {t(
              "serviceSections.digitalMarketing.conversionOptimization.expectations.title",
            )}
          </motion.h2>
          <motion.p variants={itemVariants} className="dm-section-subtitle">
            {t(
              "serviceSections.digitalMarketing.conversionOptimization.expectations.subtitle",
            )}
          </motion.p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
            {expectationsList.map((item, idx) => (
              <motion.li
                key={idx}
                variants={itemVariants}
                className="dm-check-item"
              >
                <HiCheckCircle className="dm-check-icon" />
                <span className="dm-text-sm">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </section>

      <div className="dm-divider-wrap">
        <div className="dm-divider" />
      </div>

      {/* Market insight */}
      <section className="dm-section">
        <motion.div
          className="dm-container"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={containerVariants}
        >
          <motion.h2
            variants={itemVariants}
            className={`dm-section-title ${fontClass}`}
          >
            {t(
              "serviceSections.digitalMarketing.conversionOptimization.marketInsight.title",
            )}
          </motion.h2>
          <motion.p variants={itemVariants} className="dm-text dm-insight-block">
            {t(
              "serviceSections.digitalMarketing.conversionOptimization.marketInsight.paragraph",
            )}
          </motion.p>
          <motion.p variants={itemVariants} className="dm-text dm-insight-block">
            {t(
              "serviceSections.digitalMarketing.conversionOptimization.marketInsight.paragraph2",
            )}
          </motion.p>
        </motion.div>
      </section>

      <div className="dm-divider-wrap">
        <div className="dm-divider" />
      </div>

      <FAQ
        items={faqItems}
        title={t(
          "serviceSections.digitalMarketing.conversionOptimization.faqTitle",
        )}
      />

      {/* Related services */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={itemVariants}
      >
        <DMRelatedServices current="conversionOptimization" />
      </motion.section>

      <DMCTA />
    </div>
  );
};

export default ConversionOptimization;
