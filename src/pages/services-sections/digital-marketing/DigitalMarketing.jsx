import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../../store/I18nLanguageContext";
import {
  FiTarget,
  FiTrendingUp,
  FiBarChart2,
  FiGlobe,
  FiSearch,
  FiLayers,
  FiZap,
  FiMessageSquare,
  FiShield,
  FiDollarSign,
  FiUsers,
  FiActivity,
  FiStar,
  FiPieChart,
  FiInstagram,
  FiVideo,
  FiTag,
} from "react-icons/fi";

import influencerHero from "../../../assets/services/Influencer-Marketing.webp";
import SEOHead from "../../../components/SEOHead";
import FAQ from "../../../components/FAQ";
import {
  ServiceHeroSection,
  ServiceProblemsSection,
  ServiceProcessSection,
  ServiceBenefitsSection,
  ServiceCaseStudySection,
  ServiceWhyUsSection,
  ServiceSubServicesSection,
  ServiceMultiCTASection,
} from "../../../components/services-sections";

import "../../../components/services-sections/ServiceSections.css";

gsap.registerPlugin(ScrollTrigger);

const problemIcons = [<FiTarget key="1" />, <FiDollarSign key="2" />, <FiBarChart2 key="3" />, <FiGlobe key="4" />];
const benefitIcons = [<FiTrendingUp key="1" />, <FiBarChart2 key="2" />, <FiZap key="3" />, <FiGlobe key="4" />];
const whyUsIcons = [<FiLayers key="1" />, <FiShield key="2" />, <FiSearch key="3" />, <FiMessageSquare key="4" />];
const marketExpertiseIcons = [<FiGlobe key="me1" />, <FiMessageSquare key="me2" />, <FiUsers key="me3" />];
const subServiceIcons = [<FiSearch key="1" />, <FiTrendingUp key="2" />, <FiActivity key="3" />];

const subServiceHrefs = [
  "/digital-marketing-agency-dubai/seo-services",
  "/digital-marketing-agency-dubai/paid-ads-management",
  "/digital-marketing-agency-dubai/conversion-optimization",
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

const DigitalMarketing = () => {
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();

  const heroRef = useRef(null);
  const problemsRef = useRef(null);
  const stepsRef = useRef(null);
  const benefitsRef = useRef(null);
  const caseRef = useRef(null);
  const marketExpertiseRef = useRef(null);
  const whyRef = useRef(null);
  const ctaRef = useRef(null);
  const subServicesRef = useRef(null);

  const toArray = (val) => (Array.isArray(val) ? val : []);

  const problems = toArray(t("serviceSections.digitalMarketing.problems.items", { returnObjects: true }));
  const steps = toArray(t("serviceSections.digitalMarketing.process.steps", { returnObjects: true }));
  const benefits = toArray(t("serviceSections.digitalMarketing.benefits.items", { returnObjects: true }));
  const whyUsItems = toArray(t("serviceSections.digitalMarketing.whyUs.items", { returnObjects: true }));
  const marketExpertiseItems = toArray(t("serviceSections.digitalMarketing.marketExpertise.items", { returnObjects: true }));
  const subServices = [
    {
      title: t("serviceSections.digitalMarketing.seoServices.badge", { defaultValue: "SEO Services" }),
      desc: "Improve search visibility and organic traffic with technical, on-page, and content SEO strategies.",
    },
    {
      title: t("serviceSections.digitalMarketing.paidAds.badge", { defaultValue: "Paid Ads Management" }),
      desc: "Launch and optimize paid campaigns across Google and social channels to generate qualified leads.",
    },
    {
      title: t("serviceSections.digitalMarketing.conversionOptimization.badge", {
        defaultValue: "Conversion Optimization",
      }),
      desc: "Turn more visitors into customers through CRO audits, testing, and landing-page performance improvements.",
    },
  ];
  const caseStatsRaw = toArray(t("serviceSections.digitalMarketing.caseStudy.stats", { returnObjects: true }));
  const caseTags = toArray(t("serviceSections.digitalMarketing.caseStudy.tags", { returnObjects: true }));
  const faqItems = toArray(t("serviceSections.digitalMarketing.faq.items", { returnObjects: true }));
  const finalCtaCards = toArray(t("serviceSections.digitalMarketing.finalCta.cards", { returnObjects: true }));

  const marketExpertiseMicroCta = {
    before: t("serviceSections.digitalMarketing.marketExpertise.microCta.before"),
    highlight: t("serviceSections.digitalMarketing.marketExpertise.microCta.highlight"),
    after: t("serviceSections.digitalMarketing.marketExpertise.microCta.after"),
  };

  const whyUsMicroCta = {
    before: t("serviceSections.digitalMarketing.whyUs.microCta.before"),
    highlight: t("serviceSections.digitalMarketing.whyUs.microCta.highlight"),
    after: t("serviceSections.digitalMarketing.whyUs.microCta.after"),
  };

  const caseStats = caseStatsRaw.map((stat, i) => ({
    ...stat,
    dataTarget: i === 0 ? "3" : i === 1 ? "90" : undefined,
    dataSuffix: i === 0 ? "x" : i === 1 ? "%" : undefined,
  }));

  const breadcrumbs = [
    { name: t("serviceSections.digitalMarketing.breadcrumb.home", { defaultValue: "Home" }), url: "/" },
    { name: t("serviceSections.digitalMarketing.breadcrumb.services", { defaultValue: "Services" }), url: "/services" },
    { name: t("serviceSections.digitalMarketing.seo.serviceType"), url: "/influencer-marketing-agency-dubai" },
  ];

  const dir = isRtl ? "rtl" : "ltr";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", delay: 0.15 }
      );

      revealChildren(problemsRef, ".im-problem-card", {}, 0.12);
      revealChildren(stepsRef, ".im-step-card", {}, 0.1);
      revealChildren(benefitsRef, ".im-benefit-item", {}, 0.11);
      revealChildren(marketExpertiseRef, ".im-whyus-card", {}, 0.1);
      revealChildren(whyRef, ".im-whyus-card", {}, 0.1);
      revealChildren(subServicesRef, ".im-subservice-card", {}, 0.08);

      if (caseRef.current) {
        gsap.fromTo(
          caseRef.current,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: caseRef.current, start: "top 80%" },
          }
        );

        const statValues = caseRef.current.querySelectorAll(".im-case-study__stat-value[data-target]");
        statValues.forEach((el) => {
          const target = parseFloat(el.dataset.target);
          const isMultiple = el.dataset.suffix === "x";
          const counter = { val: 0 };
          gsap.to(counter, {
            val: target,
            duration: 1.8,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = isMultiple ? `${Math.round(counter.val)}x` : `${Math.round(counter.val)}`;
            },
            scrollTrigger: { trigger: caseRef.current, start: "top 78%" },
          });
        });
      }

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

  return (
    <>
      <SEOHead
        title={t("serviceSections.digitalMarketing.seo.title")}
        description={t("serviceSections.digitalMarketing.seo.description")}
        serviceType={t("serviceSections.digitalMarketing.seo.serviceType")}
        breadcrumbs={breadcrumbs}
        faqItems={faqItems}
      />

      <ServiceHeroSection
        ref={heroRef}
        imageSrc={influencerHero}
        imageAlt={t("serviceSections.digitalMarketing.seo.serviceType")}
        badge={t("serviceSections.digitalMarketing.hero.badge")}
        badgeVariant="pulse"
        title={t("serviceSections.digitalMarketing.hero.title")}
        mainWord={t("serviceSections.digitalMarketing.hero.mainWord")}
        description={t("serviceSections.digitalMarketing.hero.description")}
        dataNavColor="black"
      />

      <ServiceProblemsSection
        ref={problemsRef}
        sectionLabel={t("serviceSections.digitalMarketing.problems.sectionLabel")}
        title={t("serviceSections.digitalMarketing.problems.title")}
        description={t("serviceSections.digitalMarketing.problems.description")}
        items={problems}
        icons={problemIcons}
        dir={dir}
      />

      <ServiceProcessSection
        ref={stepsRef}
        sectionLabel={t("serviceSections.digitalMarketing.process.sectionLabel")}
        title={t("serviceSections.digitalMarketing.process.title")}
        description={t("serviceSections.digitalMarketing.process.description")}
        steps={steps}
        dir={dir}
      />

      <ServiceBenefitsSection
        ref={benefitsRef}
        sectionLabel={t("serviceSections.digitalMarketing.benefits.sectionLabel")}
        title={t("serviceSections.digitalMarketing.benefits.title")}
        description={t("serviceSections.digitalMarketing.benefits.description")}
        items={benefits}
        icons={benefitIcons}
        dir={dir}
      />

      <ServiceCaseStudySection
        ref={caseRef}
        sectionLabel={t("serviceSections.digitalMarketing.caseStudy.sectionLabel")}
        title={t("serviceSections.digitalMarketing.caseStudy.title")}
        tag={t("serviceSections.digitalMarketing.caseStudy.tag")}
        caseTitle={t("serviceSections.digitalMarketing.caseStudy.caseTitle")}
        stats={caseStats}
        tags={caseTags}
        quote={t("serviceSections.digitalMarketing.caseStudy.quote")}
        dir={dir}
      />

      <ServiceWhyUsSection
        ref={marketExpertiseRef}
        sectionLabel={t("serviceSections.digitalMarketing.marketExpertise.sectionLabel")}
        title={t("serviceSections.digitalMarketing.marketExpertise.title")}
        items={marketExpertiseItems}
        icons={marketExpertiseIcons}
        microCta={marketExpertiseMicroCta}
        dir={dir}
      />

      <ServiceWhyUsSection
        ref={whyRef}
        sectionLabel={t("serviceSections.digitalMarketing.whyUs.sectionLabel")}
        title={t("serviceSections.digitalMarketing.whyUs.title")}
        items={whyUsItems}
        icons={whyUsIcons}
        microCta={whyUsMicroCta}
        dir={dir}
      />

      <ServiceSubServicesSection
        ref={subServicesRef}
        sectionLabel="Sub-Services"
        title="Explore Digital Marketing Sub-Services"
        description="Choose a focused digital service based on your growth objective: visibility, paid acquisition, or conversion rate growth."
        learnMoreText="Learn More"
        items={subServices}
        hrefs={subServiceHrefs}
        icons={subServiceIcons}
        dir={dir}
      />

      <FAQ
        items={faqItems}
        title={t("serviceSections.digitalMarketing.faq.title")}
      />

      <ServiceMultiCTASection
        ref={ctaRef}
        title={t("serviceSections.digitalMarketing.finalCta.title")}
        cards={finalCtaCards}
        finalLine={t("serviceSections.digitalMarketing.finalCta.finalLine")}
        dir={dir}
      />
    </>
  );
};

export default DigitalMarketing;
