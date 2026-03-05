import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiAlertCircle,
  FiLayout,
  FiCompass,
  FiEdit3,
  FiShield,
  FiGlobe,
  FiLink,
  FiArrowRight,
  FiPhone,
  FiBookOpen,
  FiRefreshCw,
  FiMap,
} from "react-icons/fi";

import brandingHero from "../../../assets/services/Branding.webp";
import SEOHead from "../../../components/SEOHead";
import FAQ from "../../../components/FAQ";
import {
  ServiceHeroSection,
  ServiceProblemsSection,
  ServiceProcessSection,
  ServiceStatsSection,
  ServiceBenefitsSection,
  ServiceCaseStudySection,
  ServiceSubServicesSection,
  ServiceCTASection,
} from "../../../components/services-sections";

import "./Branding.css";

gsap.registerPlugin(ScrollTrigger);

const problemIcons = [<FiAlertCircle key="1" />, <FiLayout key="2" />, <FiCompass key="3" />];
const benefitIcons = [<FiCompass key="1" />, <FiGlobe key="2" />, <FiShield key="3" />, <FiLink key="4" />];
const subServiceIcons = [<FiBookOpen key="1" />, <FiEdit3 key="2" />, <FiRefreshCw key="3" />, <FiMap key="4" />];

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

const TK = "serviceSections.branding.page";
const Branding = () => {
  const { t } = useTranslation();
  const heroRef = useRef(null);
  const problemsRef = useRef(null);
  const processRef = useRef(null);
  const statsRef = useRef(null);
  const benefitsRef = useRef(null);
  const caseRef = useRef(null);
  const subServicesRef = useRef(null);
  const ctaRef = useRef(null);

  const breadcrumbsRaw = t(`${TK}.breadcrumbs`, { returnObjects: true });
  const breadcrumbs = Array.isArray(breadcrumbsRaw) ? breadcrumbsRaw : [];
  const problemsData = t(`${TK}.problems.items`, { returnObjects: true });
  const problems = Array.isArray(problemsData) ? problemsData.map((p, i) => ({ ...p, icon: problemIcons[i] })) : [];
  const processSteps = t(`${TK}.process.steps`, { returnObjects: true });
  const stats = t(`${TK}.stats.items`, { returnObjects: true });
  const benefitsData = t(`${TK}.benefits.items`, { returnObjects: true });
  const benefits = Array.isArray(benefitsData) ? benefitsData.map((b, i) => ({ ...b, icon: benefitIcons[i] })) : [];
  const subServicesData = t(`${TK}.subServices.items`, { returnObjects: true });
  const subServices = Array.isArray(subServicesData) ? subServicesData.map((s, i) => ({ ...s, icon: subServiceIcons[i] })) : [];
  const faqItems = t(`${TK}.faqItems`, { returnObjects: true });

  const caseStudyStats = [
    { value: "40%", label: t(`${TK}.caseStudy.stat1Label`), dataTarget: "40", dataSuffix: "%" },
    { value: "Award", label: t(`${TK}.caseStudy.stat2Label`) },
    { value: "25+", label: t(`${TK}.caseStudy.stat3Label`) },
  ];
  const caseStudyPills = t(`${TK}.caseStudy.pills`, { returnObjects: true });
  const pillsArray = Array.isArray(caseStudyPills) ? caseStudyPills : [];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", delay: 0.15 }
      );

      revealChildren(problemsRef, ".br-problem-card", {}, 0.12);
      revealChildren(processRef, ".br-step-card", {}, 0.1);
      revealChildren(statsRef, ".br-stat-card", {}, 0.12);
      revealChildren(benefitsRef, ".br-benefit-item", {}, 0.11);
      revealChildren(subServicesRef, ".br-subservice-card", {}, 0.08);

      if (caseRef.current) {
        gsap.fromTo(
          caseRef.current,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: caseRef.current,
              start: "top 80%",
            },
          }
        );

        const statEls = caseRef.current.querySelectorAll(".br-case-study__stat-value[data-target]");
        statEls.forEach((el) => {
          const target = parseFloat(el.dataset.target);
          const suffix = el.dataset.suffix || "";
          const counter = { val: 0 };
          gsap.to(counter, {
            val: target,
            duration: 1.8,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = `${Math.round(counter.val)}${suffix}`;
            },
            scrollTrigger: {
              trigger: caseRef.current,
              start: "top 78%",
            },
          });
        });
      }

      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current.querySelectorAll(".br-reveal"),
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 85%",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <SEOHead
        title={t(`${TK}.seoTitle`)}
        description={t(`${TK}.seoDescription`)}
        serviceType="Branding Agency Dubai"
        breadcrumbs={breadcrumbs}
        faqItems={faqItems}
      />

      <ServiceHeroSection
        ref={heroRef}
        classPrefix="br"
        dataNavColor="black"
        imageSrc={brandingHero}
        imageAlt="Branding Agency Dubai"
        badge={t(`${TK}.hero.badge`)}
        badgeVariant="pulse"
        title={t(`${TK}.hero.title`)}
        mainWord={t(`${TK}.hero.mainWord`)}
        description={t(`${TK}.hero.description`)}
      />

      <ServiceProblemsSection
        ref={problemsRef}
        classPrefix="br"
        sectionLabel={t(`${TK}.problems.label`)}
        title={t(`${TK}.problems.title`)}
        description={t(`${TK}.problems.desc`)}
        items={problems}
        icons={problemIcons}
      />

      <ServiceProcessSection
        ref={processRef}
        classPrefix="br"
        sectionLabel={t(`${TK}.process.label`)}
        title={t(`${TK}.process.title`)}
        description={t(`${TK}.process.desc`)}
        steps={Array.isArray(processSteps) ? processSteps : []}
      />

      <ServiceStatsSection
        ref={statsRef}
        classPrefix="br"
        sectionLabel={t(`${TK}.stats.label`)}
        title={t(`${TK}.stats.title`)}
        description={t(`${TK}.stats.desc`)}
        items={Array.isArray(stats) ? stats : []}
      />

      <ServiceCaseStudySection
        ref={caseRef}
        classPrefix="br"
        sectionLabel={t(`${TK}.caseStudy.label`)}
        title={t(`${TK}.caseStudy.title`)}
        tag={t(`${TK}.caseStudy.tag`)}
        caseTitle={t(`${TK}.caseStudy.caseTitle`)}
        stats={caseStudyStats}
        tags={pillsArray}
        quote={t(`${TK}.caseStudy.quote`)}
      />

      <ServiceBenefitsSection
        ref={benefitsRef}
        classPrefix="br"
        sectionLabel={t(`${TK}.benefits.label`)}
        title={t(`${TK}.benefits.title`)}
        description={t(`${TK}.benefits.desc`)}
        items={benefits}
        icons={benefitIcons}
      />

      <ServiceSubServicesSection
        ref={subServicesRef}
        classPrefix="br"
        sectionLabel={t(`${TK}.subServices.label`)}
        title={t(`${TK}.subServices.title`)}
        description={t(`${TK}.subServices.desc`)}
        learnMoreText={t(`${TK}.subServices.learnMore`)}
        items={subServices}
        hrefs={subServices.map((s) => s.href)}
        icons={subServiceIcons}
      />

      <FAQ
        items={Array.isArray(faqItems) ? faqItems : []}
        title={t(`${TK}.faqTitle`)}
      />

      <ServiceCTASection
        ref={ctaRef}
        classPrefix="br"
        sectionLabel={t(`${TK}.cta.label`)}
        title={t(`${TK}.cta.title`)}
        description={t(`${TK}.cta.desc`)}
        primaryButtonText={t(`${TK}.cta.primaryBtn`)}
        primaryHref="/contact"
        secondaryButtonText={t(`${TK}.cta.secondaryBtn`)}
        secondaryHref="tel:+97145774042"
      />
    </>
  );
};

export default Branding;
