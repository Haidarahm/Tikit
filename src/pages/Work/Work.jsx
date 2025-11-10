import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../store/ThemeContext.jsx";
import "./work.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Footer from "../../components/Footer";
import ContactUs from "../Home/ContactUs";
import GradientText from "../../components/GradientText";
import { useWorksSectionsStore } from "../../store/work/worksSectionsStore";
import { useWorkItemsStore } from "../../store/work/worksItemsStore";
import { useI18nLanguage } from "../../store/I18nLanguageContext.jsx";
import { useTranslation } from "react-i18next";
import SEOHead from "../../components/SEOHead";

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
  const imagesRef = useRef([]);
  const imagesContainerRef = useRef(null);
  const paragraphContainerRef = useRef(null);
  const paragraphRef = useRef(null);
  const titleContainerRef = useRef(null);
  const titleRef = useRef(null);
  const descTitleWrapRef = useRef(null);
  const descTitleRef = useRef(null);
  const descParaWrapRef = useRef(null);
  const descParaRef = useRef(null);

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
  const itemsContainerClass = isDigitalActive
    ? "images grid grid-cols-1 gap-6 md:gap-8 p-4 md:px-6"
    : "images grid grid-cols-1 md:grid-cols-2 grid-rows-4 gap-4 md:h-[300vh] p-4";
  const containerKey = `${activeKey ?? "none"}-${activeSectionId ?? "none"}`;

  useEffect(() => {
    imagesRef.current = [];
  }, [containerKey]);

  if (!isDigitalActive) {
    imagesRef.current = imagesRef.current.slice(0, currentItems.length);
  }

  const extractMediaUrl = (value) => {
    if (!value) return null;
    if (typeof value === "string") return value;
    if (typeof value === "object") {
      return (
        value.media ??
        value.url ??
        value.src ??
        value.path ??
        value.image ??
        null
      );
    }
    return null;
  };

  const getFirstMediaUrl = (media) => {
    if (!Array.isArray(media) || media.length === 0) return null;
    return extractMediaUrl(media[0]);
  };

  const normalizeItem = (item, type, fallbackImage) => {
    switch (type) {
      case "influence": {
        const data = item?.influence ?? {};
        return {
          title: data?.title ?? "",
          subtitle: data?.objective ?? "",
          image:
            getFirstMediaUrl(item?.media) ??
            extractMediaUrl(data?.logo) ??
            fallbackImage ??
            "",
          detailId: data?.work_id ?? data?.id ?? null,
        };
      }
      case "social": {
        const data = item?.social ?? {};
        return {
          title: data?.title ?? "",
          subtitle: data?.objective ?? "",
          image:
            getFirstMediaUrl(item?.media) ??
            extractMediaUrl(data?.logo) ??
            fallbackImage ??
            "",
          detailId: data?.work_id ?? data?.id ?? null,
        };
      }
      case "creative": {
        const data = item?.creative ?? {};
        return {
          title: data?.title ?? "",
          subtitle: "",
          image:
            extractMediaUrl(data?.main_image) ??
            getFirstMediaUrl(data?.images) ??
            extractMediaUrl(data?.logo) ??
            fallbackImage ??
            "",
          detailId: data?.work_id ?? data?.id ?? null,
        };
      }
      case "event":
      case "events": {
        const data = item?.event ?? {};
        return {
          title: data?.title ?? "",
          subtitle: data?.objective ?? "",
          image:
            getFirstMediaUrl(item?.media) ??
            extractMediaUrl(data?.logo) ??
            fallbackImage ??
            "",
          detailId: data?.work_id ?? data?.id ?? null,
        };
      }
      default:
        return {
          title: "",
          subtitle: "",
          image: fallbackImage ?? "",
          detailId: null,
        };
    }
  };

  const handleViewDetails = (detailId) => {
    if (detailId == null) return;
    navigate(`/details/${encodeURIComponent(detailId)}`);
  };

  const renderDigitalCard = (item, index) => {
    const data = item?.digital ?? {};
    const metricsConfig = [
      { key: "objective", label: "Objective" },
      { key: "cpo", label: "CPO" },
      { key: "orders", label: "Orders" },
      { key: "roas", label: "ROAS" },
      { key: "top_search", label: "Top Search" },
      { key: "conversions", label: "Conversions" },
      { key: "traffic", label: "Traffic" },
      { key: "ctr", label: "CTR" },
      { key: "cpp", label: "CPP" },
      { key: "avg_cart", label: "Avg Cart" },
      { key: "cltv", label: "CLTV" },
      { key: "ftus", label: "FTUs" },
    ];

    const metrics = metricsConfig.filter((metric) => {
      const value = data?.[metric.key];
      return value !== undefined && value !== null && value !== "";
    });

    return (
      <div
        key={`digital-${data?.id ?? index}`}
        className="group relative rounded-3xl border border-white/10 bg-[var(--background)]/80 backdrop-blur p-6 md:p-8 shadow-lg"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            {data?.logo ? (
              <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/10 p-2">
                <img
                  src={data.logo}
                  alt={data.title ?? "logo"}
                  className="h-full w-full object-contain"
                  loading="lazy"
                />
              </div>
            ) : null}
            <div>
              <h3 className="text-[24px] font-bold text-white">
                {data?.title ?? t("work.viewWork")}
              </h3>
              {data?.objective ? (
                <p className="mt-1 text-sm text-white/70">{data.objective}</p>
              ) : null}
            </div>
          </div>
          <button
            className="whitespace-nowrap rounded-full border border-white bg-transparent px-4 py-2 text-white transition hover:bg-white hover:text-black"
            onClick={() => handleViewDetails(data?.work_id ?? data?.id ?? null)}
          >
            {t("work.viewWork")}
          </button>
        </div>

        {metrics.length ? (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {metrics.map((metric) => (
              <div
                key={metric.key}
                className="rounded-2xl bg-white/5 px-4 py-3 text-white shadow-inner"
              >
                <div className="text-xs font-semibold uppercase tracking-wide text-white/60">
                  {metric.label}
                </div>
                <div className="mt-1 text-lg font-semibold">
                  {data[metric.key]}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  };

  useLayoutEffect(() => {
    if (isDigitalActive) return;
    if (!imagesContainerRef.current) return;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const start = isMobile ? "top 80%" : "top 90%";
    const end = isMobile ? "top 60%" : "top 20%";

    const ctx = gsap.context(() => {
      imagesRef.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { height: "10%" },
          {
            height: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start,
              end,
              scrub: 0.5,
            },
          }
        );
      });
    }, imagesContainerRef);

    return () => ctx.revert();
  }, [currentItems, isDigitalActive]);

  useLayoutEffect(() => {
    if (!titleContainerRef.current || !titleRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: "150%", autoAlpha: 1 },
        { y: 0, duration: 0.9, ease: "power2.out", delay: 0.1 }
      );
    }, titleContainerRef);
    return () => ctx.revert();
  }, []);

  // Animate description (title then paragraph) after main title
  useLayoutEffect(() => {
    if (!descTitleRef.current || !descParaRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        descTitleRef.current,
        { y: "150%", autoAlpha: 1 },
        { y: 0, duration: 0.8, ease: "power2.out", delay: 0.4 }
      );
      gsap.fromTo(
        descParaRef.current,
        { y: "150%", autoAlpha: 1 },
        { y: 0, duration: 0.9, ease: "power2.out", delay: 0.55 }
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!paragraphContainerRef.current || !paragraphRef.current) return;
    gsap.set(paragraphRef.current, { yPercent: 100, opacity: 1 });
    gsap.to(paragraphRef.current, {
      yPercent: 0,
      duration: 0.9,
      ease: "power2.out",
      delay: 0.5,
    });
  }, []);

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
      <div className="h-[50vh] md:h-[70vh] flex flex-col justify-around items-center w-full description  mt-[104px]">
        <div className="w-full"></div>
        <div ref={titleContainerRef} className="overflow-hidden">
          <div
            ref={titleRef}
            className="title will-change-transform translate-y-full"
          >
            <GradientText
              colors={gradientColors}
              animationSpeed={5}
              showBorder={false}
              className="text-[42px] md:text-[96px] leading-[40px] md:leading-[150px] mb-8 capitalize font-bold"
            >
              {t("work.title")}
            </GradientText>
          </div>
        </div>
        <div
          className={`description w-full relative z-30 flex md:flex-row flex-col text-[var(--foreground)] px-[20px] md:px-[30px] gap-4 md:gap-12 justify-center items-center ${
            isRtl
              ? "text-center md:text-end md:flex-row-reverse"
              : " text-center md:text-start"
          }`}
        >
          <div ref={descTitleWrapRef} className="overflow-hidden  md:w-[20%]">
            <div
              ref={descTitleRef}
              className="title font-bold mt-4 md:mt-0 text-[20px] md:text-[24px] will-change-transform translate-y-full"
            >
              {t("work.specialTitle")}
            </div>
          </div>
          <div ref={descParaWrapRef} className="overflow-hidden">
            <div
              ref={descParaRef}
              className="paragraph text-[16px] md:text-[22px] will-change-transform translate-y-full"
            >
              {t("work.specialDescription")}
            </div>
          </div>
        </div>
      </div>
      {/* content section */}
      <div className="w-full mt-10">
        <div
          className={`section-swiper flex gap-6 overflow-x-auto px-6 py-2 md:px-10 md:py-4 scrollbar-hide relative ${
            isRtl ? "flex-row-reverse" : ""
          }`}
          dir={isRtl ? "rtl" : "ltr"}
        >
          {sectionsLoading && (!sections || sections.length === 0) ? (
            <div className="min-w-[200px] text-center text-sm opacity-70">
              Loading sections...
            </div>
          ) : null}

          {sectionsError ? (
            <div className="min-w-[200px] text-center text-sm text-red-400">
              {sectionsError}
            </div>
          ) : null}

          {(sections || []).map((section) => {
            const isActive = section.id === activeSectionId;
            return (
              <button
                key={section.id}
                type="button"
                className={`group relative h-[140px] min-w-[220px] shrink-0 overflow-hidden rounded-3xl border transition-all duration-500 ease-out md:h-[160px] md:min-w-[260px] ${
                  isActive
                    ? "scale-105 border-white/70 shadow-lg shadow-white/10"
                    : "opacity-80 hover:opacity-100 hover:scale-105 border-white/20"
                }`}
                style={{
                  backgroundImage: section.media
                    ? `url(${section.media})`
                    : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: "var(--muted)",
                }}
                onClick={() => {
                  if (section.id !== activeSectionId) {
                    setActiveSectionId(section.id);
                    setActiveType(section.type);
                  }
                }}
                aria-pressed={isActive}
              >
                {/* Overlay gradient */}
                <div
                  className={`absolute inset-0 transition-all duration-500 ${
                    isActive
                      ? "bg-gradient-to-br from-[var(--accent)]/50 to-[var(--accent-foreground)]/50 opacity-90"
                      : "bg-black/40 hover:bg-black/20"
                  }`}
                />

                {/* Title */}
                <span className="relative z-10 flex h-full w-full items-center justify-center px-6 text-center text-base font-semibold text-white md:text-xl">
                  {section.title}
                </span>

                {/* Animated underline */}
                <span
                  className={`absolute bottom-4 left-1/2 h-[3px] w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-foreground)] transition-all duration-500 ${
                    isActive
                      ? "w-3/4 opacity-100"
                      : "group-hover:w-3/4 opacity-80"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div
        key={containerKey}
        ref={imagesContainerRef}
        className={`${itemsContainerClass} relative`}
      >
        {itemsLoading ? (
          <div className="col-span-full text-center text-sm opacity-70">
            {t("work.loadingItems", { defaultValue: "Loading items..." })}
          </div>
        ) : null}

        {itemsError ? (
          <div className="col-span-full text-center text-sm text-red-400">
            {itemsError}
          </div>
        ) : null}

        {!itemsLoading && !itemsError
          ? isDigitalActive
            ? currentItems.map((item, index) => renderDigitalCard(item, index))
            : currentItems.map((item, index) => {
                const normalized = normalizeItem(
                  item,
                  activeKey,
                  selectedSection?.media
                );

                return (
                  <div
                    key={normalized.detailId ?? `${activeKey}-${index}`}
                    ref={(el) => {
                      imagesRef.current[index] = el;
                    }}
                    className="group relative overflow-hidden rounded-lg shadow-lg"
                    style={{ height: "10%" }}
                  >
                    {normalized.image ? (
                      <img
                        src={normalized.image}
                        alt={normalized.title || "work"}
                        className="h-full w-full rounded-lg object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-full w-full bg-[var(--muted)]" />
                    )}

                    <div className="content-work absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-black/30 opacity-100 transition-opacity duration-300 md:bg-black/60 md:opacity-0 md:group-hover:opacity-100">
                      {normalized.title ? (
                        <h3 className="text-center text-[26px] font-bold text-white md:text-[30px]">
                          {normalized.title}
                        </h3>
                      ) : null}
                      {normalized.subtitle ? (
                        <p className="mb-4 text-center text-[18px] text-gray-200 md:text-[20px]">
                          {normalized.subtitle}
                        </p>
                      ) : null}
                      <button
                        className="rounded-full border border-white bg-transparent px-4 py-2 text-white transition hover:bg-white hover:text-black"
                        onClick={() => handleViewDetails(normalized.detailId)}
                      >
                        {t("work.viewWork")}
                      </button>
                    </div>
                  </div>
                );
              })
          : null}

        {showEmptyState ? (
          <div className="col-span-full text-center text-sm opacity-70">
            {t("work.noWorks")}
          </div>
        ) : null}
      </div>
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Work;

/* work.css */
