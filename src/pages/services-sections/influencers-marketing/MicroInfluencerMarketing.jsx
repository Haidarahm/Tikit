import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../../store/I18nLanguageContext";

import { FiUsers, FiTarget, FiBarChart2, FiTrendingUp, FiZap, FiShield, FiClock, FiFileText, FiGlobe, FiLayers } from "react-icons/fi";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { HiSparkles, HiShoppingCart, HiGlobeAlt, HiCamera } from "react-icons/hi";

import SEOHead from "../../../components/SEOHead";
import FAQ from "../../../components/FAQ";
import {
  ServiceHeroSection,
  ServiceCTASection,
  ServiceAudiencePainSection,
} from "../../../components/services-sections";
import influencerHero from "../../../assets/services/Influencer-Marketing.webp";

import InfCampaignProcess from "./sub-components/InfCampaignProcess";
import InfPlatforms from "./sub-components/InfPlatforms";
import InfIconCardGrid from "./sub-components/InfIconCardGrid";
import InfComparisonTable from "./sub-components/InfComparisonTable";
import InfIndustries from "./sub-components/InfIndustries";
import InfWhyChooseUs from "./sub-components/InfWhyChooseUs";
import InfCaseStudyBlock from "./sub-components/InfCaseStudyBlock";

import "./influencerMarketing.css";

gsap.registerPlugin(ScrollTrigger);

const TK = "serviceSections.influencerMarketing.microInfluencerMarketing";
const toArray = (val) => (Array.isArray(val) ? val : []);
const CTA_HREF = "/contact-us";

const MicroInfluencerMarketing = () => {
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();
  const dir = isRtl ? "rtl" : "ltr";

  const whatIsPriorities = toArray(t(`${TK}.whatIs.priorities`, { returnObjects: true }));
  const whatIsResults = toArray(t(`${TK}.whatIs.results`, { returnObjects: true }));

  const strategySteps = toArray(t(`${TK}.strategy.steps`, { returnObjects: true })).map((step) => ({
    title: typeof step === "string" ? step : step?.title ?? "",
    description: typeof step === "string" ? "" : step?.description ?? "",
  }));

  const platforms = toArray(t(`${TK}.platforms.items`, { returnObjects: true })).map((item, i) => ({
    icon: [<FaInstagram key="pl-insta" />, <FaTiktok key="pl-tt" />, <FaYoutube key="pl-yt" />][i],
    title: item?.title ?? "",
    description: item?.description ?? "",
    tags: item?.tags ?? [],
  }));

  const campaignTypeIcons = [
    <HiShoppingCart key="ct-product" />,
    <FiTrendingUp key="ct-awareness" />,
    <FiTarget key="ct-local" />,
    <FiBarChart2 key="ct-ecommerce" />,
    <HiSparkles key="ct-luxury" />,
  ];
  const campaignTypes = toArray(t(`${TK}.campaignTypes.items`, { returnObjects: true })).map((item, i) => ({
    icon: campaignTypeIcons[i],
    title: item?.title ?? "",
    description: item?.description ?? "",
  }));

  const comparisonRows = toArray(t(`${TK}.comparison.rows`, { returnObjects: true }));

  const costIcons = [<FiUsers key="cost-niche" />, <FiGlobe key="cost-platform" />, <FiClock key="cost-duration" />, <FiFileText key="cost-content" />];
  const costItems = toArray(t(`${TK}.cost.items`, { returnObjects: true })).map((item, i) => ({
    icon: costIcons[i],
    title: item?.title ?? item ?? "",
    description: item?.description ?? "",
  }));

  const keyInsightIcons = [<FiTrendingUp key="ins-1" />, <FiZap key="ins-2" />, <FiShield key="ins-3" />];
  const keyInsights = toArray(t(`${TK}.marketInsights.keyInsights.items`, { returnObjects: true })).map((item, i) => ({
    icon: keyInsightIcons[i],
    title: item?.title ?? item ?? "",
    description: item?.description ?? "",
  }));

  const nicheIcons = [<HiCamera key="ni-fashion" />, <HiGlobeAlt key="ni-beauty" />, <FiLayers key="ni-food" />];
  const niches = toArray(t(`${TK}.marketInsights.popularNiches.items`, { returnObjects: true })).map((item, i) => ({
    icon: nicheIcons[i],
    title: item?.title ?? item ?? "",
  }));

  const whyIcons = [<FiUsers key="why-network" />, <FiBarChart2 key="why-data" />, <FiZap key="why-engagement" />, <FiShield key="why-reporting" />];
  const whyReasons = toArray(t(`${TK}.whyChooseUs.reasons`, { returnObjects: true })).map((reason, i) => ({
    icon: whyIcons[i],
    title: reason?.title ?? "",
    description: reason?.description ?? "",
  }));

  const faqItems = toArray(t(`${TK}.faq.items`, { returnObjects: true }));

  const heroRef = useRef(null);
  const whatRef = useRef(null);
  const strategyRef = useRef(null);
  const platformsRef = useRef(null);
  const campaignTypesRef = useRef(null);
  const comparisonRef = useRef(null);
  const costRef = useRef(null);
  const resultsRef = useRef(null);
  const keyInsightsRef = useRef(null);
  const nichesRef = useRef(null);
  const whyRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", delay: 0.15 }
        );
      }

      const reveal = (ref, selector, staggerVal = 0.1) => {
        if (!ref.current) return;
        const els = ref.current.querySelectorAll(selector);
        if (!els.length) return;
        gsap.fromTo(
          els,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: staggerVal,
            ease: "power3.out",
            scrollTrigger: { trigger: ref.current, start: "top 82%" },
          }
        );
      };

      reveal(whatRef, ".im-audience-reveal", 0.06);
      reveal(strategyRef, ".inf-reveal", 0.08);
      reveal(platformsRef, ".inf-reveal", 0.10);
      reveal(campaignTypesRef, ".inf-reveal", 0.08);
      reveal(costRef, ".inf-reveal", 0.06);
      reveal(resultsRef, ".inf-reveal", 0.08);
      reveal(keyInsightsRef, ".inf-reveal", 0.06);
      reveal(nichesRef, ".inf-reveal", 0.06);
      reveal(whyRef, ".inf-reveal", 0.06);

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
    { name: t(`${TK}.badge`), url: "/influencer-marketing-agency-dubai" },
    { name: t(`${TK}.badge`), url: "/influencer-marketing-agency-dubai/micro-influencer-marketing-dubai" },
  ];

  const heroDescription = t(`${TK}.hero.description`);
  const heroDescriptionWithTopCta = `${heroDescription} ${t(`${TK}.topCtaText`)}`;

  return (
    <div dir={dir} className={isRtl ? "font-cairo" : ""}>
      <SEOHead
        title={t(`${TK}.seo.title`)}
        description={t(`${TK}.seo.description`)}
        keywords={t(`${TK}.seo.keywords`)}
        serviceType={t(`${TK}.seo.serviceType`)}
        canonicalUrl="/influencer-marketing-agency-dubai/micro-influencer-marketing-dubai"
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
        description={heroDescriptionWithTopCta}
        dataNavColor="black"
      />
      {/* What is micro influencer marketing */}
      <ServiceAudiencePainSection
        ref={whatRef}
        classPrefix="im"
        dir={dir}
        sectionLabel={t(`${TK}.whatIs.sectionLabel`)}
        title={t(`${TK}.whatIs.title`)}
        paragraphs={[
          `${t(`${TK}.whatIs.prioritiesIntro`)} ${whatIsPriorities.join(" • ")}`,
          `${t(`${TK}.whatIs.resultsIntro`)} ${whatIsResults.join(" • ")}`,
          t(`${TK}.whatIs.ctaText`),
        ]}
      />

      {/* Strategy */}
      <InfCampaignProcess
        ref={strategyRef}
        label={t(`${TK}.strategy.sectionLabel`)}
        title={t(`${TK}.strategy.title`)}
        description={`${t(`${TK}.strategy.description`)} ${t(`${TK}.strategy.ctaText`)}`}
        steps={strategySteps}
      />

      {/* Platforms */}
      <InfPlatforms
        ref={platformsRef}
        label={t(`${TK}.platforms.sectionLabel`)}
        title={t(`${TK}.platforms.title`)}
        description={`${t(`${TK}.platforms.description`)} ${t(`${TK}.platforms.ctaText`)}`}
        platforms={platforms}
      />

      {/* Campaign types */}
      <InfIconCardGrid
        ref={campaignTypesRef}
        label={t(`${TK}.campaignTypes.sectionLabel`)}
        title={t(`${TK}.campaignTypes.title`)}
        description={`${t(`${TK}.campaignTypes.description`)} ${t(`${TK}.campaignTypes.ctaText`)}`}
        items={campaignTypes}
        columns={2}
      />

      {/* Comparison */}
      <InfComparisonTable
        ref={comparisonRef}
        label={t(`${TK}.comparison.sectionLabel`)}
        title={t(`${TK}.comparison.title`)}
        description={`${t(`${TK}.comparison.description`)} ${t(`${TK}.comparison.ctaText`)}`}
        rows={comparisonRows}
        headerFeature={t(`${TK}.comparison.headerFeature`)}
        headerInfluencer={t(`${TK}.comparison.headerInfluencer`)}
        headerTraditional={t(`${TK}.comparison.headerTraditional`)}
        footer={t(`${TK}.comparison.footer`)}
      />

      {/* Cost */}
      <InfIconCardGrid
        ref={costRef}
        label={t(`${TK}.cost.sectionLabel`)}
        title={t(`${TK}.cost.title`)}
        description={`${t(`${TK}.cost.description`)} ${t(`${TK}.cost.ctaText`)}`}
        items={costItems}
        columns={2}
      />

      {/* Results (case study block style) */}
      <InfCaseStudyBlock
        ref={resultsRef}
        label={t(`${TK}.results.sectionLabel`)}
        title={t(`${TK}.results.title`)}
        description={t(`${TK}.results.description`)}
        caseTitle={t(`${TK}.results.caseTitle`)}
        objective={t(`${TK}.results.objective`)}
        strategyTitle={t(`${TK}.results.strategyTitle`)}
        strategyItems={toArray(t(`${TK}.results.strategyItems`, { returnObjects: true }))}
        outcomeTitle={t(`${TK}.results.outcomeTitle`)}
        outcomeItems={toArray(t(`${TK}.results.outcomeItems`, { returnObjects: true }))}
        footer={`${t(`${TK}.results.footer`)} ${t(`${TK}.results.ctaText`)}`}
      />

      {/* Market insights */}
      <InfIconCardGrid
        ref={keyInsightsRef}
        label={t(`${TK}.marketInsights.keyInsights.sectionLabel`)}
        title={t(`${TK}.marketInsights.keyInsights.title`)}
        description={t(`${TK}.marketInsights.keyInsights.description`)}
        items={keyInsights}
        columns={2}
      />

      <InfIndustries
        ref={nichesRef}
        label={t(`${TK}.marketInsights.popularNiches.sectionLabel`)}
        title={t(`${TK}.marketInsights.popularNiches.title`)}
        description={`${t(`${TK}.marketInsights.popularNiches.description`)} ${t(`${TK}.marketInsights.ctaText`)}`}
        industries={niches}
      />

      {/* Why choose */}
      <InfWhyChooseUs
        ref={whyRef}
        label={t(`${TK}.whyChooseUs.sectionLabel`)}
        title={t(`${TK}.whyChooseUs.title`)}
        description={t(`${TK}.whyChooseUs.description`)}
        reasons={whyReasons}
        footerContent={
          <>
            <p className="inf-desc mb-0 inf-reveal">
              {t(`${TK}.whyChooseUs.extra1.before`)}{" "}
              <a href={t(`${TK}.whyChooseUs.extra1.href`)} className="text-[var(--secondary)] font-bold">
                {t(`${TK}.whyChooseUs.extra1.linkText`)}
              </a>{" "}
              {t(`${TK}.whyChooseUs.extra1.after`)}
            </p>
            <p className="inf-desc inf-reveal" style={{ marginBottom: 10 }}>
              {t(`${TK}.whyChooseUs.extra2.before`)}{" "}
              <a href={t(`${TK}.whyChooseUs.extra2.href`)} className="text-[var(--secondary)] font-bold">
                {t(`${TK}.whyChooseUs.extra2.linkText`)}
              </a>{" "}
              {t(`${TK}.whyChooseUs.extra2.after`)}
            </p>

            <p className="inf-reveal mt-10 mb-0">
              <a href={CTA_HREF} className="text-[var(--secondary)] font-bold">
                {t(`${TK}.whyChooseUs.ctaText`)}
              </a>
            </p>
          </>
        }
      />

      {/* FAQ */}
      <FAQ
        items={faqItems}
        title={t(`${TK}.faq.title`)}
        ctaText={t(`${TK}.faq.askTeamCta`)}
        ctaHref={CTA_HREF}
      />

      {/* Final CTA */}
      <ServiceCTASection
        ref={ctaRef}
        classPrefix="im"
        dir={dir}
        sectionLabel={t(`${TK}.cta.sectionLabel`)}
        title={t(`${TK}.cta.title`)}
        description={t(`${TK}.cta.description`)}
        primaryButtonText={t(`${TK}.cta.primaryButtonText`)}
        primaryHref={CTA_HREF}
        secondaryButtonText={t(`${TK}.cta.secondaryButtonText`)}
        secondaryHref={CTA_HREF}
      />
    </div>
  );
};

export default MicroInfluencerMarketing;
