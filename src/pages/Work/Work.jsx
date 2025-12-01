import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "../../store/ThemeContext.jsx";
import "./work.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  const { workId } = useParams();
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
  const lenisCleanupTimeout = useRef(null);

  // Only scroll to top on initial mount (when coming from another page)
  // ScrollToTop component now handles preventing scroll when navigating between sections
  useEffect(() => {
    window.scrollTo(0, 0);
    gsap.ticker.add(() => ScrollTrigger.update());
  }, []);
  const gradientColors =
    theme === "light"
      ? ["#52C3C5", "#5269C5", "#52C3C5", "#52A0C5", "#52C3C5"] // Light theme colors
      : ["#07D9F5", "#06AEC4", "#4E7CC6", "#CE88C6", "#FB8DEF"]; // Dark theme colors (original)

  useEffect(() => {
    const htmlEl = document.documentElement;
    htmlEl.classList.remove("has-scroll-smooth", "has-scroll-init");
    document.body.style.removeProperty("overflow");

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
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

    const matched =
      sections.find((section) => String(section.id) === String(workId)) ?? null;

    if (matched) {
      if (activeSectionId !== matched.id) {
        setActiveSectionId(matched.id);
      }
      if (activeType !== matched.type) {
        setActiveType(matched.type);
      }
      return;
    }

    const fallback = sections[0];
    if (!fallback) return;

    if (workId == null || String(workId) !== String(fallback.id)) {
      navigate(`/work/${fallback.id}`, { replace: true });
    }

    if (activeSectionId !== fallback.id) {
      setActiveSectionId(fallback.id);
    }
    if (activeType !== fallback.type) {
      setActiveType(fallback.type);
    }
  }, [sections, workId, activeSectionId, activeType, navigate]);

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
    data-nav-color="black"
      className={`work-section min-h-[100vh] flex flex-col  ${
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
          if (section.id === activeSectionId) return;
          navigate(`/work/${section.id}`);
        }}
        isRtl={isRtl}
      />

      {itemsLoading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 px-4 md:px-6 pt-10 pb-8">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={`work-skeleton-${index}`}
              className="h-[260px] rounded-3xl bg-[var(--container-bg)]/80 p-6"
            >
              <Skeleton.Node active className="w-full h-full" />
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
          language={language}
          onViewDetails={(detailId) => {
            if (detailId == null) return;
            if (activeKey === "influence") {
              navigate(`/work/influence/${encodeURIComponent(detailId)}`);
            } else if (activeKey === "social") {
              navigate(`/work/social/${encodeURIComponent(detailId)}`);
            } else if (activeKey === "creative") {
              navigate(`/work/creative/${encodeURIComponent(detailId)}`);
            } else if (activeKey === "events") {
              navigate(`/work/event/${encodeURIComponent(detailId)}`);
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
