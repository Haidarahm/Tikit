import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../store/ThemeContext.jsx";
import "./work.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Footer from "../../components/Footer";
import ContactUs from "../Home/ContactUs";
import { useWorksSectionsStore } from "../../store/work/worksSectionsStore";
import { useWorkItemsStore } from "../../store/work/worksItemsStore";
import { useI18nLanguage } from "../../store/I18nLanguageContext.jsx";
import { useTranslation } from "react-i18next";
import SEOHead from "../../components/SEOHead";
import WorkHero from "./components/WorkHero";
import WorkSectionSelector from "./components/WorkSectionSelector";
import WorkItemsGrid from "./components/WorkItemsGrid";
import { Skeleton } from "antd";

const TYPE_KEY_MAP = {
  influence: "influence",
  social: "social",
  creative: "creative",
  digital: "digital",
  event: "events",
  events: "events",
};

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const {
    sections,
    loadSections,
    loading: sectionsLoading,
    error: sectionsError,
  } = useWorksSectionsStore();
  const {
    influence,
    social,
    creative,
    digital,
    events,
    loadInfluenceItems,
    loadSocialItems,
    loadCreativeItems,
    loadDigitalItems,
    loadEventItems,
    resetCategory,
    resetAll,
  } = useWorkItemsStore();
  const { language, isRtl } = useI18nLanguage();
  const { t } = useTranslation();
  const [activeSectionId, setActiveSectionId] = useState(null);
  const [activeType, setActiveType] = useState(null);
  const lenisRef = useRef(null);

  const gradientColors =
    theme === "light"
      ? ["#52C3C5", "#5269C5", "#52C3C5", "#52A0C5", "#52C3C5"] // Light theme colors
      : ["#07D9F5", "#06AEC4", "#4E7CC6", "#CE88C6", "#FB8DEF"]; // Dark theme colors (original)

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    // Safety: ensure no leftover locomotive-scroll styles block scrolling
    const htmlEl = document.documentElement;
    htmlEl.classList.remove("has-scroll-smooth", "has-scroll-init");
    document.body.style.removeProperty("overflow");

    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
      wheelMultiplier: 1,
      lerp: 0.1,
      syncTouch: true,
      syncTouchLerp: 0.075,
      wrapper: window,
      content: document.documentElement,
    });

    // Connect Lenis with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Add a small delay to ensure all components are mounted before ScrollTrigger refresh
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // RAF loop for Lenis
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenisRef.current = lenis;

    // Handle window resize for responsive animations
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    loadSections({ lang: language, page: 1, per_page: 10 });
  }, [loadSections, language]);

  useEffect(
    () => () => {
      resetAll();
    },
    [resetAll]
  );

  useEffect(() => {
    if (!sections || sections.length === 0) return;
    const existing = sections.find((section) => section.id === activeSectionId);
    if (existing) {
      if (existing.type !== activeType) {
        setActiveType(existing.type);
      }
      return;
    }
    const first = sections[0];
    setActiveSectionId(first.id);
    setActiveType(first.type);
  }, [sections, activeSectionId, activeType]);

  useEffect(() => {
    if (!activeSectionId || !activeType) return;

    const key = TYPE_KEY_MAP[activeType];
    if (!key) return;
    resetCategory(key);
  }, [activeSectionId, activeType, resetCategory]);

  useEffect(() => {
    if (!activeSectionId || !activeType) return;

    const loaderMap = {
      influence: loadInfluenceItems,
      social: loadSocialItems,
      creative: loadCreativeItems,
      digital: loadDigitalItems,
      event: loadEventItems,
      events: loadEventItems,
    };

    const loader = loaderMap[activeType];
    if (!loader) return;

    loader({
      lang: language,
      page: 1,
      per_page: 10,
      work_id: activeSectionId,
    }).catch(() => {});
  }, [
    activeSectionId,
    activeType,
    language,
    loadInfluenceItems,
    loadSocialItems,
    loadCreativeItems,
    loadDigitalItems,
    loadEventItems,
  ]);

  const stateMap = {
    influence,
    social,
    creative,
    digital,
    events,
  };

  const activeKey = TYPE_KEY_MAP[activeType] ?? null;
  const activeState = activeKey ? stateMap[activeKey] : null;
  const currentItems = activeState?.items ?? [];
  const itemsLoading = activeState?.loading;
  const itemsError = activeState?.error;
  const isDigitalActive = activeKey === "digital";
  const selectedSection =
    sections?.find((section) => section.id === activeSectionId) ?? null;
  const showEmptyState =
    !itemsLoading && !itemsError && currentItems.length === 0;
  const containerKey = `${activeKey ?? "none"}-${activeSectionId ?? "none"}`;

  const handleViewDetails = (detailId) => {
    if (detailId == null) return;
    navigate(`/details/${encodeURIComponent(detailId)}`);
  };

  return (
    <div
      className={`work-section flex flex-col h-[calc(100%+10vh)] ${
        isRtl ? "font-cairo" : "font-hero-light"
      }`}
    >
      <SEOHead
        title="Our Work"
        description="Explore Tikit Agency's portfolio of successful projects and case studies. See how we've helped brands achieve their marketing goals through creative strategy and exceptional execution."
        keywords="portfolio, case studies, marketing projects, creative work, brand campaigns, digital marketing examples, UAE agency work"
        canonicalUrl="/work"
      />
      <WorkHero gradientColors={gradientColors} t={t} isRtl={isRtl} />

      <WorkSectionSelector
        sections={sections}
        loading={sectionsLoading}
        error={sectionsError}
        activeSectionId={activeSectionId}
        onSelect={(section) => {
          setActiveSectionId(section.id);
          setActiveType(section.type);
        }}
        isRtl={isRtl}
      />

      {itemsLoading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 px-4 md:px-6">
          {[0, 1].map((index) => (
            <div
              key={`work-skeleton-${index}`}
              className="rounded-3xl bg-[var(--card-background)] p-6 md:p-8 shadow-inner"
            >
              <Skeleton active style={{ width: "100%" }} />
            </div>
          ))}
        </div>
      ) : (
        <WorkItemsGrid
          key={containerKey}
          containerKey={containerKey}
          items={currentItems}
          isDigital={isDigitalActive}
          activeKey={activeKey}
          selectedSection={selectedSection}
          loading={itemsLoading}
          error={itemsError}
          showEmptyState={showEmptyState}
          onViewDetails={(detailId) => {
            if (detailId == null) return;
            if (activeKey === "influence") {
              navigate(`/work/influence/${encodeURIComponent(detailId)}`);
            } else {
              handleViewDetails(detailId);
            }
          }}
          t={t}
        />
      )}
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Work;

/* work.css */
