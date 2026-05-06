import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../../store/ThemeContext.jsx";
import "./work.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactUs from "../Home/ContactUs";
import { useWorksSectionsStore } from "../../store/work/worksSectionsStore";
import { useWorkItemsStore } from "../../store/work/worksItemsStore";
import { useI18nLanguage } from "../../store/I18nLanguageContext.jsx";
import { useFontClass } from "../../hooks/useFontClass";
import { useTranslation } from "react-i18next";
import SEOHead from "../../components/SEOHead";
import WorkHero from "./components/WorkHero";
import WorkSectionSelector from "./components/WorkSectionSelector";
import WorkItemsGrid from "./components/WorkItemsGrid";

const TYPE_KEY_MAP = {
  influence: "influence",
  social: "social",
  creative: "creative",
  digital: "digital",
  event: "events",
  events: "events",
};

gsap.registerPlugin(ScrollTrigger);

// Keep section-item cache across Work page unmount/remount.
const sectionItemsCache = new Map();

const Work = () => {
  const { theme } = useTheme();
  const { localizedNavigate, language, isRtl } = useI18nLanguage();
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
    resetAll,
  } = useWorkItemsStore();
  const { fontBody } = useFontClass();
  const { t } = useTranslation();
  const sectionItemsCacheRef = useRef(sectionItemsCache);
  const [activeSectionSlug, setActiveSectionSlug] = useState(null);
  const [activeType, setActiveType] = useState(null);
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
      localizedNavigate(`/work/${encodeURIComponent(fallback.slug)}`, { replace: true });
    }

    if (activeSectionSlug !== fallback.slug) {
      setActiveSectionSlug(fallback.slug);
    }
    if (activeType !== fallback.type) {
      setActiveType(fallback.type);
    }
  }, [sections, workSlug, activeSectionSlug, activeType, localizedNavigate]);

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
    const cacheKey = `${activeType}:${language}:${activeSectionSlug}`;
    if (sectionItemsCacheRef.current.has(cacheKey)) return;

    loader({
      lang: language,
      page: 1,
      per_page: 14,
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
  const cacheKey =
    activeType && activeSectionSlug
      ? `${activeType}:${language}:${activeSectionSlug}`
      : null;
  const cachedSectionState = cacheKey
    ? sectionItemsCacheRef.current.get(cacheKey)
    : null;
  const currentItems = cachedSectionState?.items ?? activeState?.items ?? [];
  const itemsLoading = !cachedSectionState && Boolean(activeState?.loading);
  const itemsError = cachedSectionState?.error ?? activeState?.error;
  const isDigitalActive = activeKey === "digital";
  const selectedSection =
    sections?.find((section) => section.slug === activeSectionSlug) ?? null;
  const containerKey = `${activeKey ?? "none"}-${activeSectionSlug ?? "none"}`;

  const getWorkItemHref = (detailId) => {
    if (detailId == null) return null;
    const encodedId = encodeURIComponent(detailId);

    if (activeKey === "influence") return `/work/influence/${encodedId}`;
    if (activeKey === "social") return `/work/social/${encodedId}`;
    if (activeKey === "creative") return `/work/creative/${encodedId}`;
    if (activeKey === "events") return `/work/event/${encodedId}`;
    return `/details/${encodedId}`;
  };

  const handleViewDetails = (detailId) => {
    const targetHref = getWorkItemHref(detailId);
    if (!targetHref) return;
    localizedNavigate(targetHref);
  };

  useEffect(() => {
    if (!cacheKey || !activeSectionSlug || !activeType || !activeState) return;
    if (activeState.loading) return;
    if (activeState.activeWorkSlug !== activeSectionSlug) return;
    if (!activeState.requestId) return;

    sectionItemsCacheRef.current.set(cacheKey, {
      items: activeState.items ?? [],
      error: activeState.error ?? null,
    });
  }, [cacheKey, activeSectionSlug, activeType, activeState]);

  return (
    <div
   
      className={`work-section min-h-[100vh] flex flex-col ${fontBody}`}
    >
      <SEOHead
        title={t("seo.pages.work.title")}
        description={t("seo.pages.work.description")}
        keywords={t("seo.pages.work.keywords")}
        canonicalUrl="/work"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Case Studies", url: "/work" }
        ]}
      />
      <WorkHero t={t} />

      <WorkSectionSelector
        sections={sections}
        loading={sectionsLoading}
        error={sectionsError}
        activeSectionSlug={activeSectionSlug}
        onSelect={(section) => {
          if (section.slug === activeSectionSlug) return;
          // Navigate with preserveScroll flag to prevent scroll-to-top from triggering
          localizedNavigate(`/work/${encodeURIComponent(section.slug)}`, {
            state: { preserveScroll: true }
          });
        }}
        isRtl={isRtl}
      />

      <WorkItemsGrid
        key={containerKey}
        containerKey={containerKey}
        items={currentItems}
        isDigital={isDigitalActive}
        activeKey={activeKey}
        selectedSection={selectedSection}
        loading={itemsLoading}
        error={itemsError}
        language={language}
        getItemHref={getWorkItemHref}
        onViewDetails={(detailId, itemMeta) => {
          if (detailId == null) return;
          if (activeKey === "influence") {
            localizedNavigate(`/work/influence/${encodeURIComponent(detailId)}`, {
              state: {
                prefersCaseStudy: Boolean(itemMeta?.hasReels),
              },
            });
          } else if (activeKey === "social") {
            localizedNavigate(`/work/social/${encodeURIComponent(detailId)}`);
          } else if (activeKey === "creative") {
            localizedNavigate(`/work/creative/${encodeURIComponent(detailId)}`);
          } else if (activeKey === "events") {
            localizedNavigate(`/work/event/${encodeURIComponent(detailId)}`);
          } else {
            handleViewDetails(detailId);
          }
        }}
        t={t}
      />
      <ContactUs />
      
    </div>
  );
};

export default Work;

/* work.css */
