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
  const { workSlug } = useParams();
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
  const [activeSectionSlug, setActiveSectionSlug] = useState(null);
  const [activeType, setActiveType] = useState(null);
  const lenisCleanupTimeout = useRef(null);

  useEffect(() => {
    const ticker = () => ScrollTrigger.update();
    gsap.ticker.add(ticker);
    return () => gsap.ticker.remove(ticker);
  }, []);

  useEffect(() => {
    const htmlEl = document.documentElement;
    htmlEl.classList.remove("has-scroll-smooth", "has-scroll-init");
    document.body.style.removeProperty("overflow");

    let isMounted = true;
    
    const safeRefresh = () => {
      if (!isMounted) return;
      try {
        const activeTriggers = ScrollTrigger.getAll().filter(t => 
          t.vars && t.vars.trigger && t.vars.trigger.isConnected
        );
        if (activeTriggers.length > 0) {
          ScrollTrigger.refresh();
        }
      } catch (e) {
        // Ignore refresh errors
      }
    };

    const timer = setTimeout(safeRefresh, 100);

    const handleResize = () => {
      safeRefresh();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
      
      // Kill ScrollTrigger instances FIRST
      ScrollTrigger.getAll().forEach((trigger) => {
        try {
          trigger.kill();
        } catch (e) {
          // Ignore errors during cleanup
        }
      });
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
      sections.find((section) => String(section.slug) === String(workSlug)) ?? null;

    if (matched) {
      if (activeSectionSlug !== matched.slug) {
        setActiveSectionSlug(matched.slug);
      }
      if (activeType !== matched.type) {
        setActiveType(matched.type);
      }
      return;
    }

    const fallback = sections[0];
    if (!fallback) return;

    if (workSlug == null || String(workSlug).trim() === "" || String(workSlug) !== String(fallback.slug)) {
      navigate(`/work/${encodeURIComponent(fallback.slug)}`, { replace: true });
    }

    if (activeSectionSlug !== fallback.slug) {
      setActiveSectionSlug(fallback.slug);
    }
    if (activeType !== fallback.type) {
      setActiveType(fallback.type);
    }
  }, [sections, workSlug, activeSectionSlug, activeType, navigate]);

  useEffect(() => {
    if (!activeSectionSlug || !activeType) return;

    const key = TYPE_KEY_MAP[activeType];
    if (!key) return;
    resetCategory(key);
  }, [activeSectionSlug, activeType, resetCategory]);

  useEffect(() => {
    if (!activeSectionSlug || !activeType) return;

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
      slug: activeSectionSlug,
    }).catch(() => {});
  }, [
    activeSectionSlug,
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
    sections?.find((section) => section.slug === activeSectionSlug) ?? null;
  const showEmptyState =
    !itemsLoading && !itemsError && currentItems.length === 0;
  const containerKey = `${activeKey ?? "none"}-${activeSectionSlug ?? "none"}`;

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
        title="Case Studies & Portfolio | Tikit Agency Dubai - 300+ Projects"
        description="Explore Tikit Agency's 300+ successful campaigns. Case studies in influencer marketing, social media & branding for brands across UAE & Saudi Arabia."
        keywords="marketing case studies Dubai, influencer campaign portfolio, social media project examples, UAE brand campaigns, Dubai agency portfolio, marketing ROI examples"
        canonicalUrl="/work"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Case Studies", url: "/work" }
        ]}
      />
      <WorkHero  t={t} isRtl={isRtl} />

      <WorkSectionSelector
        sections={sections}
        loading={sectionsLoading}
        error={sectionsError}
        activeSectionSlug={activeSectionSlug}
        onSelect={(section) => {
          if (section.slug === activeSectionSlug) return;
          // Navigate with preserveScroll flag to prevent scroll-to-top from triggering
          navigate(`/work/${encodeURIComponent(section.slug)}`, {
            state: { preserveScroll: true }
          });
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
