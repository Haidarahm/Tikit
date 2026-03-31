import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../../store/I18nLanguageContext";
import {
  FiTarget,
  FiClock,
  FiPieChart,
  FiTrendingDown,
  FiUsers,
  FiEye,
  FiMapPin,
  FiUserCheck,
  FiBarChart2,
  FiLayers,
  FiCalendar,
  FiFilm,
  FiPackage,
  FiGlobe,
  FiZap,
  FiAward,
  FiInstagram,
  FiFileText,
} from "react-icons/fi";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

import influencerHero from "../../../assets/services/Influencer-Marketing.webp";
import SEOHead from "../../../components/SEOHead";
import FAQ from "../../../components/FAQ";
import { ServiceHeroSection, ServiceSubServicesSection, ServiceCTASection } from "../../../components/services-sections";

import InfServicesGrid from "./sub-components/InfServicesGrid";
import InfFullService from "./sub-components/InfFullService";
import InfPlatforms from "./sub-components/InfPlatforms";
import InfCampaignProcess from "./sub-components/InfCampaignProcess";
import InfIndustries from "./sub-components/InfIndustries";
import InfWhyChooseUs from "./sub-components/InfWhyChooseUs";
import InfIconCardGrid from "./sub-components/InfIconCardGrid";
import InfCaseStudyBlock from "./sub-components/InfCaseStudyBlock";
import {
  INFLUENCER_MARKETING_BASE,
  influencerMarketingSubServiceHrefs,
  influencerMarketingSubServiceIcons,
  getInfluencerMarketingSubServiceItems,
} from "./influencerMarketingSubServices";
import { revealChildren, toArray } from "./influencerUtils";

import "./influencerMarketing.css";

gsap.registerPlugin(ScrollTrigger);

const BASE = INFLUENCER_MARKETING_BASE;
const TK = "serviceSections.influencerMarketing.campaignManagement";

const challengeIcons = [<FiTarget key="ch1" />, <FiClock key="ch2" />, <FiPieChart key="ch3" />];
const whyMattersIcons = [<FiTrendingDown key="wm1" />, <FiUsers key="wm2" />, <FiEye key="wm3" />];
const structuredIcons = [<FiMapPin key="sr1" />, <FiUserCheck key="sr2" />, <FiBarChart2 key="sr3" />];
const campaignTypeIcons = [<FiPackage key="ct1" />, <FiGlobe key="ct2" />, <FiZap key="ct3" />, <FiAward key="ct4" />];
const pricingIcons = [<FiUsers key="pr1" />, <FiInstagram key="pr2" />, <FiCalendar key="pr3" />, <FiFilm key="pr4" />];
const insightIcons = [<FiInstagram key="in1" />, <FiUsers key="in2" />, <FiLayers key="in3" />];
const nicheIcons = [<HiSparkles key="ni1" />, <FiAward key="ni2" />, <FiGlobe key="ni3" />];
const whyUsIcons = [<FiMapPin key="wu1" />, <FiUsers key="wu2" />, <FiBarChart2 key="wu3" />, <FiFileText key="wu4" />];
const platformIcons = [<FaInstagram key="pl1" />, <FaTiktok key="pl2" />, <FaYoutube key="pl3" />];

const CampaignManagement = () => {
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();
  const dir = isRtl ? "rtl" : "ltr";

  const subServices = getInfluencerMarketingSubServiceItems(t);
  const challengeCards = toArray(t(`${TK}.challenge.items`, { returnObjects: true })).map((item, i) => ({
    icon: challengeIcons[i],
    title: item?.title ?? "",
    description: item?.description ?? "",
  }));

  const unstructuredProblems = toArray(t(`${TK}.whyMatters.items`, { returnObjects: true })).map((item, i) => ({
    icon: whyMattersIcons[i],
    title: item?.title ?? "",
    description: item?.description ?? "",
  }));

  const structuredBenefits = toArray(t(`${TK}.structuredResults.items`, { returnObjects: true })).map((item, i) => ({
    icon: structuredIcons[i],
    title: item?.title ?? "",
    description: item?.description ?? "",
  }));

  const processSteps = toArray(t(`${TK}.process.steps`, { returnObjects: true }));

  const platforms = toArray(t(`${TK}.platforms.items`, { returnObjects: true })).map((item, i) => ({
    icon: platformIcons[i],
    title: item?.title ?? "",
    description: item?.description ?? "",
    tags: item?.tags ?? [],
  }));

  const campaignTypes = toArray(t(`${TK}.campaignTypes.items`, { returnObjects: true })).map((item, i) => ({
    icon: campaignTypeIcons[i],
    title: item?.title ?? "",
    description: item?.description ?? "",
  }));

  const pricingFactors = toArray(t(`${TK}.pricing.items`, { returnObjects: true })).map((item, i) => ({
    icon: pricingIcons[i],
    title: item?.title ?? "",
    description: item?.description ?? "",
  }));

  const marketInsightCards = toArray(t(`${TK}.insights.items`, { returnObjects: true })).map((item, i) => ({
    icon: insightIcons[i],
    title: item?.title ?? "",
    description: item?.description ?? "",
  }));

  const popularNiches = toArray(t(`${TK}.popularNiches.items`, { returnObjects: true })).map((item, i) => ({
    icon: nicheIcons[i],
    title: item?.title ?? "",
  }));

  const whyChooseUs = toArray(t(`${TK}.whyChooseUs.items`, { returnObjects: true })).map((item, i) => ({
    icon: whyUsIcons[i],
    title: item?.title ?? "",
    description: item?.description ?? "",
  }));

  const faqItems = toArray(t(`${TK}.faq.items`, { returnObjects: true }));

  const heroRef = useRef(null);
  const challengesRef = useRef(null);
  const unstructuredRef = useRef(null);
  const structuredBenefitsRef = useRef(null);
  const hubLinkRef = useRef(null);
  const processRef = useRef(null);
  const platformsRef = useRef(null);
  const campaignTypesRef = useRef(null);
  const costRef = useRef(null);
  const caseStudyRef = useRef(null);
  const insightsRef = useRef(null);
  const nichesRef = useRef(null);
  const whyUsRef = useRef(null);
  const subServicesRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", delay: 0.15 }
      );

      revealChildren(challengesRef, ".inf-reveal", 0.1);
      revealChildren(unstructuredRef, ".inf-reveal", 0.12);
      revealChildren(structuredBenefitsRef, ".inf-reveal", 0.1);

      if (hubLinkRef.current) {
        gsap.fromTo(
          hubLinkRef.current.querySelectorAll(".inf-hub-link"),
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: hubLinkRef.current, start: "top 82%" },
          }
        );
      }

      revealChildren(processRef, ".inf-reveal", 0.12);
      revealChildren(platformsRef, ".inf-reveal", 0.15);
      revealChildren(campaignTypesRef, ".inf-reveal", 0.1);
      revealChildren(costRef, ".inf-reveal", 0.1);
      revealChildren(caseStudyRef, ".inf-reveal", 0.12);
      revealChildren(insightsRef, ".inf-reveal", 0.1);
      revealChildren(nichesRef, ".inf-industry-tag", 0.08);
      revealChildren(whyUsRef, ".inf-reveal", 0.1);
      revealChildren(subServicesRef, ".im-subservice-card", 0.08);

      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current.querySelectorAll(".im-reveal"),
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: ctaRef.current, start: "top 85%" },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const breadcrumbs = [
    { name: t("nav.home"), url: "/" },
    { name: t("nav.services"), url: "/services" },
    { name: t("serviceSections.influencerMarketing.badge"), url: BASE },
    { name: t(`${TK}.badge`), url: `${BASE}/campaign-management-dubai` },
  ];

  return (
    <>
      <SEOHead
        title={t(`${TK}.seo.title`)}
        description={t(`${TK}.seo.description`)}
        keywords={t(`${TK}.seo.keywords`)}
        canonicalUrl={`${BASE}/campaign-management-dubai`}
        serviceType={t(`${TK}.seo.serviceType`)}
        breadcrumbs={breadcrumbs}
        faqItems={faqItems}
      />

      <ServiceHeroSection
        ref={heroRef}
        imageSrc={influencerHero}
        imageAlt={t(`${TK}.seo.serviceType`)}
        badge={t(`${TK}.badge`)}
        badgeVariant="pulse"
        title={t(`${TK}.hero.title`)}
        mainWord={t(`${TK}.hero.mainWord`)}
        description={t(`${TK}.hero.description`)}
        dataNavColor="black"
      />

      <InfServicesGrid
        ref={challengesRef}
        label={t(`${TK}.challenge.label`)}
        title={t(`${TK}.challenge.title`)}
        description={t(`${TK}.challenge.description`)}
        services={challengeCards}
      />

      <InfFullService
        ref={unstructuredRef}
        label={t(`${TK}.whyMatters.label`)}
        title={t(`${TK}.whyMatters.title`)}
        description={t(`${TK}.whyMatters.description`)}
        items={unstructuredProblems}
      />

      <InfWhyChooseUs
        ref={structuredBenefitsRef}
        label={t(`${TK}.structuredResults.label`)}
        title={t(`${TK}.structuredResults.title`)}
        description={t(`${TK}.structuredResults.description`)}
        reasons={structuredBenefits}
      />

      <section ref={hubLinkRef} className="inf-section inf-section--alt" dir={dir}>
        <div className="inf-container">
          <p className="inf-desc inf-hub-link mb-4 max-w-3xl">
            {t(`${TK}.hubLink.before`)}{" "}
            <Link to={BASE} className="font-semibold underline underline-offset-4 hover:opacity-80" style={{ color: "var(--secondary)" }}>
              {t(`${TK}.hubLink.linkText`)}
            </Link>{" "}
            {t(`${TK}.hubLink.after`)}
          </p>
          <p className="inf-desc inf-hub-link mb-0 max-w-3xl">
            {t(`${TK}.hubLink.secondLine`)}
          </p>
        </div>
      </section>

      <InfCampaignProcess
        ref={processRef}
        label={t(`${TK}.process.label`)}
        title={t(`${TK}.process.title`)}
        description={t(`${TK}.process.description`)}
        steps={processSteps}
      />

      <InfPlatforms
        ref={platformsRef}
        label={t(`${TK}.platforms.label`)}
        title={t(`${TK}.platforms.title`)}
        description={t(`${TK}.platforms.description`)}
        platforms={platforms}
      />

      <InfIconCardGrid
        ref={campaignTypesRef}
        label={t(`${TK}.campaignTypes.label`)}
        title={t(`${TK}.campaignTypes.title`)}
        description={t(`${TK}.campaignTypes.description`)}
        items={campaignTypes}
        columns={2}
      />

      <InfServicesGrid
        ref={costRef}
        label={t(`${TK}.pricing.label`)}
        title={t(`${TK}.pricing.title`)}
        description={t(`${TK}.pricing.description`)}
        services={pricingFactors}
        footer={t(`${TK}.pricing.footer`)}
      />

      <InfCaseStudyBlock
        ref={caseStudyRef}
        label={t(`${TK}.caseStudy.label`)}
        title={t(`${TK}.caseStudy.title`)}
        description={t(`${TK}.caseStudy.description`)}
        caseTitle={t(`${TK}.caseStudy.caseTitle`)}
        objective={t(`${TK}.caseStudy.objective`)}
        strategyTitle={t(`${TK}.caseStudy.strategyTitle`)}
        strategyItems={toArray(t(`${TK}.caseStudy.strategyItems`, { returnObjects: true }))}
        outcomeTitle={t(`${TK}.caseStudy.outcomeTitle`)}
        outcomeItems={toArray(t(`${TK}.caseStudy.outcomeItems`, { returnObjects: true }))}
        footer={t(`${TK}.caseStudy.footer`)}
      />

      <InfServicesGrid
        ref={insightsRef}
        label={t(`${TK}.insights.label`)}
        title={t(`${TK}.insights.title`)}
        description={t(`${TK}.insights.description`)}
        services={marketInsightCards}
      />

      <InfIndustries
        ref={nichesRef}
        label={t(`${TK}.popularNiches.label`)}
        title={t(`${TK}.popularNiches.title`)}
        description={t(`${TK}.popularNiches.description`)}
        industries={popularNiches}
      />

      <InfWhyChooseUs
        ref={whyUsRef}
        label={t(`${TK}.whyChooseUs.label`)}
        title={t(`${TK}.whyChooseUs.title`)}
        description={t(`${TK}.whyChooseUs.description`)}
        reasons={whyChooseUs}
      />

      <ServiceSubServicesSection
        ref={subServicesRef}
        sectionLabel={t("serviceSections.influencerMarketing.subServices.sectionLabel")}
        title={t("serviceSections.influencerMarketing.subServices.title")}
        description={t("serviceSections.influencerMarketing.subServices.description")}
        learnMoreText={t("serviceSections.influencerMarketing.subServices.learnMore")}
        items={subServices}
        hrefs={influencerMarketingSubServiceHrefs}
        icons={influencerMarketingSubServiceIcons}
        dir={dir}
        classPrefix="im"
      />

      <FAQ items={faqItems} title={t(`${TK}.faq.title`)} />

      <ServiceCTASection
        ref={ctaRef}
        classPrefix="im"
        sectionLabel={t(`${TK}.cta.sectionLabel`)}
        title={t(`${TK}.cta.title`)}
        description={t(`${TK}.cta.description`)}
        primaryButtonText={t(`${TK}.cta.primaryButtonText`)}
        primaryHref="/contact-us"
        secondaryButtonText={t(`${TK}.cta.secondaryButtonText`)}
        secondaryHref="tel:+97145774042"
        dir={dir}
      />
    </>
  );
};

export default CampaignManagement;
