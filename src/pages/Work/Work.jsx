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
import Lenis from "lenis";

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
  const lenisRef = useRef(null);
  const rafRef = useRef(null);

  // Only scroll to top on initial mount (when coming from another page)
  // ScrollToTop component now handles preventing scroll when navigating between sections
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const gradientColors =
    theme === "light"
      ? ["#52C3C5", "#5269C5", "#52C3C5", "#52A0C5", "#52C3C5"] // Light theme colors
      : ["#07D9F5", "#06AEC4", "#4E7CC6", "#CE88C6", "#FB8DEF"]; // Dark theme colors (original)

  useEffect(() => {
    const htmlEl = document.documentElement;
    htmlEl.classList.remove("has-scroll-smooth", "has-scroll-init");
    document.body.style.removeProperty("overflow");

    const handleResize = () => {
      if (lenisRef.current) {
        lenisRef.current.resize();
      }
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
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
  const isPageReady =
    !sectionsLoading && !itemsLoading && activeSectionId && activeType;

  // Initialize Lenis only after page is fully loaded
  useEffect(() => {
    if (!isPageReady) return;

    // Wait for window load event to ensure all resources are loaded
    const initializeLenis = () => {
      // Clean up any existing Lenis instance
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }

      const lenis = new Lenis({
        duration: 1.1,
        smoothWheel: true,
        smoothTouch: false,
        lerp: 0.08,
      });
      lenisRef.current = lenis;

      // Attach to ScrollTrigger
      ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
          return arguments.length
            ? lenis.scrollTo(value, { immediate: true })
            : lenis.scroll;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: "transform",
      });

      // RAF loop
      const raf = (time) => {
        lenis.raf(time);
        ScrollTrigger.update();
        rafRef.current = requestAnimationFrame(raf);
      };
      rafRef.current = requestAnimationFrame(raf);

      // Refresh once after Lenis activates
      setTimeout(() => {
        lenis.scrollTo(0, { immediate: true });
        ScrollTrigger.refresh();
      }, 200);
    };

    if (document.readyState === "complete") {
      initializeLenis();
    } else {
      window.addEventListener("load", initializeLenis, { once: true });
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isPageReady]);

  // Refresh Lenis when navigating between categories
  useEffect(() => {
    if (!lenisRef.current || !activeSectionId || !activeType) return;

    // Small delay to ensure DOM updates are complete
    const refreshTimer = setTimeout(() => {
      if (lenisRef.current) {
        lenisRef.current.resize();
        lenisRef.current.scrollTo(0, { immediate: true });
        ScrollTrigger.refresh();
      }
    }, 100);

    return () => {
      clearTimeout(refreshTimer);
    };
  }, [activeSectionId, activeType, containerKey]);

  const handleViewDetails = (detailId) => {
    if (detailId == null) return;
    navigate(`/details/${encodeURIComponent(detailId)}`);
  };

  return (
    <div
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
