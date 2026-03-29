import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../../store/I18nLanguageContext";
import {
  FiUsers,
  FiTarget,
  FiBarChart2,
  FiMapPin,
  FiUserPlus,
  FiLayers,
  FiMessageSquare,
  FiPieChart,
  FiShield,
  FiActivity,
  FiStar,
  FiInstagram,
  FiVideo,
  FiTag,
  FiTrendingUp,
  FiBriefcase,
  FiGlobe,
} from "react-icons/fi";
import SEOHead from "../../../components/SEOHead";
import FAQ from "../../../components/FAQ";
import {
  ServiceHeroSection,
  ServiceAudiencePainSection,
  ServiceProblemsSection,
  ServiceProcessSection,
  ServiceStatsSection,
  ServiceBenefitsSection,
  ServiceWhyUsSection,
  ServiceLocalAuthoritySection,
  ServiceSubServicesSection,
  ServiceCTASection,
} from "../../../components/services-sections";
import "../../../components/services-sections/ServiceSections.css";

gsap.registerPlugin(ScrollTrigger);

const TK = "serviceSections.influencerMarketing.subPages.microInfluencer";

const problemIcons = [<FiUsers key="1" />, <FiTarget key="2" />, <FiBarChart2 key="3" />, <FiMapPin key="4" />];
const benefitIcons = [<FiUserPlus key="1" />, <FiUsers key="2" />, <FiPieChart key="3" />, <FiTag key="4" />, <FiMapPin key="5" />];
const whyUsIcons = [<FiLayers key="1" />, <FiActivity key="2" />, <FiMessageSquare key="3" />, <FiShield key="4" />];
const localAuthorityIcons = [<FiTrendingUp key="1" />, <FiBriefcase key="2" />, <FiGlobe key="3" />];
const subServiceIcons = [
  <FiActivity key="1" />,
  <FiUsers key="2" />,
  <FiStar key="3" />,
  <FiPieChart key="4" />,
  <FiInstagram key="5" />,
  <FiVideo key="6" />,
  <FiTag key="7" />,
];

const subServiceHrefs = [
  "/influencer-marketing-agency-dubai/campaign-management-dubai",
  "/influencer-marketing-agency-dubai/micro-influencer-marketing-uae",
  "/influencer-marketing-agency-dubai/luxury-influencer-marketing",
  "/influencer-marketing-agency-dubai/roi-analytics",
  "/influencer-marketing-agency-dubai/instagram-influencer-marketing",
  "/influencer-marketing-agency-dubai/tiktok-influencer-marketing",
  "/influencer-marketing-agency-dubai/influencer-marketing-cost-uae",
];

function revealChildren(containerRef, selector, fromVars = {}, staggerVal = 0.1) {
  if (!containerRef.current) return;
  const els = containerRef.current.querySelectorAll(selector);
  if (!els.length) return;
  gsap.fromTo(
    els,
    { opacity: 0, y: 36, ...fromVars },
    {
      opacity: 1,
      y: 0,
      duration: 0.75,
      stagger: staggerVal,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 82%",
      },
    }
  );
}

const toArray = (val) => (Array.isArray(val) ? val : []);

const MicroInfluencerMarketing = () => {
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();
  const dir = isRtl ? "rtl" : "ltr";

  const heroRef = useRef(null);
  const problemsRef = useRef(null);
  const processRef = useRef(null);
  const outcomesRef = useRef(null);
  const benefitsRef = useRef(null);
  const whyRef = useRef(null);
  const subServicesRef = useRef(null);
  const localAuthorityRef = useRef(null);
  const ctaRef = useRef(null);
  const audienceRef = useRef(null);

  const breadcrumbs = [
    { name: t("nav.home"), url: "/" },
    { name: t("nav.services"), url: "/services" },
    { name: t("serviceSections.influencerMarketing.badge"), url: "/influencer-marketing-agency-dubai" },
    { name: t(`${TK}.badge`), url: "/influencer-marketing-agency-dubai/micro-influencer-marketing-uae" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", delay: 0.15 }
      );
      revealChildren(problemsRef, ".im-problem-card", {}, 0.12);
      revealChildren(audienceRef, ".im-audience-reveal", {}, 0.16);
      revealChildren(processRef, ".im-step-card", {}, 0.1);
      revealChildren(outcomesRef, ".im-stat-card", {}, 0.1);
      revealChildren(benefitsRef, ".im-benefit-item", {}, 0.1);
      revealChildren(whyRef, ".im-whyus-card", {}, 0.1);
      revealChildren(localAuthorityRef, ".im-local-authority-reveal", {}, 0.12);
      revealChildren(subServicesRef, ".im-subservice-card", {}, 0.08);
      revealChildren(ctaRef, ".im-reveal", {}, 0.12);
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="im-page" data-nav-color="black" dir={dir}>
      <SEOHead
        title={t(`${TK}.seo.title`)}
        description={t(`${TK}.seo.description`)}
        keywords={t(`${TK}.seo.keywords`)}
        canonicalUrl="/influencer-marketing-agency-dubai/micro-influencer-marketing-uae"
        serviceType={t(`${TK}.seo.serviceType`)}
        breadcrumbs={breadcrumbs}
      />

      <ServiceHeroSection
        ref={heroRef}
        imageSrc="/services-images/influencer-marketing.webp"
        imageAlt={t(`${TK}.seo.serviceType`)}
        badge={t(`${TK}.badge`)}
        title={t(`${TK}.hero.title`)}
        mainWord={t(`${TK}.hero.mainWord`)}
        description={t(`${TK}.hero.description`)}
        dataNavColor="black"
        classPrefix="im"
      />

      <ServiceAudiencePainSection
        ref={audienceRef}
        sectionLabel={t(`${TK}.audience.sectionLabel`)}
        title={t(`${TK}.audience.title`)}
        paragraphs={toArray(t(`${TK}.audience.paragraphs`, { returnObjects: true }))}
        imageSrc="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80"
        imageAlt="B2B team meeting in Dubai office"
        dir={dir}
        classPrefix="im"
      />

      <ServiceProblemsSection
        ref={problemsRef}
        sectionLabel={t(`${TK}.problems.sectionLabel`)}
        title={t(`${TK}.problems.title`)}
        description={t(`${TK}.problems.description`)}
        items={toArray(t(`${TK}.problems.items`, { returnObjects: true }))}
        icons={problemIcons}
        dir={dir}
        classPrefix="im"
      />

      <ServiceProcessSection
        ref={processRef}
        sectionLabel={t(`${TK}.process.sectionLabel`)}
        title={t(`${TK}.process.title`)}
        description={t(`${TK}.process.description`)}
        steps={toArray(t(`${TK}.process.steps`, { returnObjects: true }))}
        dir={dir}
        classPrefix="im"
      />

      <ServiceStatsSection
        ref={outcomesRef}
        sectionLabel={t(`${TK}.outcomes.sectionLabel`)}
        title={t(`${TK}.outcomes.title`)}
        description={t(`${TK}.outcomes.description`)}
        items={toArray(t(`${TK}.outcomes.items`, { returnObjects: true }))}
        dir={dir}
        classPrefix="im"
      />

      <ServiceBenefitsSection
        ref={benefitsRef}
        sectionLabel={t(`${TK}.features.sectionLabel`)}
        title={t(`${TK}.features.title`)}
        description={t(`${TK}.features.description`)}
        items={toArray(t(`${TK}.features.items`, { returnObjects: true }))}
        icons={benefitIcons}
        dir={dir}
        classPrefix="im"
      />

      <ServiceWhyUsSection
        ref={whyRef}
        sectionLabel={t(`${TK}.whyUs.sectionLabel`)}
        title={t(`${TK}.whyUs.title`)}
        items={toArray(t(`${TK}.whyUs.items`, { returnObjects: true }))}
        icons={whyUsIcons}
        dir={dir}
        classPrefix="im"
      />

      <ServiceLocalAuthoritySection
        ref={localAuthorityRef}
        sectionLabel={t(`${TK}.localAuthority.sectionLabel`)}
        title={t(`${TK}.localAuthority.title`)}
        description={t(`${TK}.localAuthority.description`)}
        items={toArray(t(`${TK}.localAuthority.items`, { returnObjects: true }))}
        footer={t(`${TK}.localAuthority.footer`)}
        icons={localAuthorityIcons}
        imageSrc="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1400&q=80"
        imageAlt="Dubai business district skyline"
        secondaryImageSrc="https://images.unsplash.com/photo-1460472178825-e5240623afd5?auto=format&fit=crop&w=1200&q=80"
        secondaryImageAlt="Business team discussing strategy"
        dir={dir}
        classPrefix="im"
      />

      <ServiceSubServicesSection
        ref={subServicesRef}
        sectionLabel={t("serviceSections.influencerMarketing.subServices.sectionLabel")}
        title={t("serviceSections.influencerMarketing.subServices.title")}
        description={t("serviceSections.influencerMarketing.subServices.description")}
        learnMoreText={t("serviceSections.influencerMarketing.subServices.learnMore")}
        items={toArray(t("serviceSections.influencerMarketing.subServices.items", { returnObjects: true }))}
        hrefs={subServiceHrefs}
        icons={subServiceIcons}
        dir={dir}
        classPrefix="im"
      />

      <FAQ
        title={t(`${TK}.faq.title`)}
        items={toArray(t(`${TK}.faq.items`, { returnObjects: true }))}
      />

      <ServiceCTASection
        ref={ctaRef}
        sectionLabel={t(`${TK}.cta.sectionLabel`)}
        title={t(`${TK}.cta.title`)}
        description={t(`${TK}.cta.description`)}
        primaryButtonText={t(`${TK}.cta.primaryButton`)}
        secondaryButtonText={t(`${TK}.cta.secondaryButton`)}
        primaryHref="/contact-us"
        secondaryHref="tel:+97145774042"
        dir={dir}
        classPrefix="im"
      />
    </div>
  );
};

export default MicroInfluencerMarketing;
