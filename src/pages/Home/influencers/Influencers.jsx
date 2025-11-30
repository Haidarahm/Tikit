import React, { useState, useEffect, useMemo, useRef } from "react";
import influencerPlaceholder from "../../../assets/influncer/1.png";
import AOS from "aos";
import {
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaTwitter,
  FaLinkedinIn,
  FaFacebookF,
  FaSnapchatGhost,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useInfluencersStore } from "../../../store/influencersStore";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../../store/I18nLanguageContext.jsx";
import TikitTitle from "../../../components/TikitTitle.jsx";

const SOCIAL_ICON_MAP = {
  instagram: FaInstagram,
  ig: FaInstagram,
  youtube: FaYoutube,
  yt: FaYoutube,
  tiktok: FaTiktok,
  tik_tok: FaTiktok,
  twitter: FaTwitter,
  x: FaTwitter,
  linkedin: FaLinkedinIn,
  facebook: FaFacebookF,
  fb: FaFacebookF,
  snapchat: FaSnapchatGhost,
  snap: FaSnapchatGhost,
};

const getSectionLabel = (section) =>
  section?.title ||
  section?.name ||
  section?.label ||
  section?.slug ||
  "Untitled";

const normalizeSocialLinks = (links) => {
  if (!Array.isArray(links) || links.length === 0) return [];
  return links
    .map((link) => {
      if (!link) return null;
      if (typeof link === "string") {
        return { platform: link.toLowerCase(), href: link };
      }
      const platform =
        link?.platform ||
        link?.type ||
        link?.name ||
        link?.label ||
        link?.title ||
        link?.link_type;
      const href = link?.href || link?.url || link?.link;
      if (!platform || !href) return null;
      return {
        platform: String(platform).toLowerCase(),
        href,
      };
    })
    .filter(Boolean);
};

const Influencers = () => {
  const navigate = useNavigate();
  const [activeSectionId, setActiveSectionId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [itemsPerPage, setItemsPerPage] = useState(4); // Pagination items per page
  const [gapSize, setGapSize] = useState(1.5); // rem units
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const animationRef = useRef(null);

  const sections = useInfluencersStore((state) => state.sections);
  const sectionsLoading = useInfluencersStore((state) => state.sectionsLoading);
  const sectionsError = useInfluencersStore((state) => state.sectionsError);
  const loadSections = useInfluencersStore((state) => state.loadSections);
  const influencersBySection = useInfluencersStore(
    (state) => state.influencersBySection
  );
  const influencersLoading = useInfluencersStore(
    (state) => state.influencersLoading
  );
  const influencersError = useInfluencersStore(
    (state) => state.influencersError
  );
  const loadInfluencers = useInfluencersStore((state) => state.loadInfluencers);
  const clearSection = useInfluencersStore((state) => state.clearSection);
  const { t } = useTranslation();
  const { language, isRtl } = useI18nLanguage();

  // Responsive items per view, pagination, and gap size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const newItemsPerView =
        width >= 1024
          ? 4 // Laptop
          : width >= 768
          ? 3 // iPad
          : 2; // Mobile

      // Pagination: 4 items per page on laptop, 2 items per page on mobile/tablet
      const newItemsPerPage = width >= 1024 ? 4 : 2;

      const newGapSize = width >= 768 ? 1.5 : 1; // gap-6 (1.5rem) on desktop, gap-4 (1rem) on mobile

      setItemsPerView((prev) => {
        if (prev !== newItemsPerView) {
          return newItemsPerView;
        }
        return prev;
      });

      setItemsPerPage((prev) => {
        if (prev !== newItemsPerPage) {
          return newItemsPerPage;
        }
        return prev;
      });

      setGapSize(newGapSize);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    loadSections({ lang: language });
  }, [loadSections, language]);

  useEffect(() => {
    clearSection();
    setActiveSectionId(null);
    setCurrentIndex(0);
  }, [language, clearSection]);

  useEffect(() => {
    if (!sections || sections.length === 0) {
      setActiveSectionId(null);
      return;
    }

    setActiveSectionId((prev) => {
      if (prev && sections.some((section) => section?.id === prev)) {
        return prev;
      }
      return sections[0]?.id ?? sections[0]?.slug ?? sections[0]?.key ?? null;
    });
  }, [sections]);

  useEffect(() => {
    if (!activeSectionId) return;
    if (influencersBySection[activeSectionId]) {
      if (window.AOS && window.aosInitialized) {
        AOS.refresh();
      }
      return;
    }
    loadInfluencers(activeSectionId, { lang: language, per_page: 20 });
  }, [activeSectionId, influencersBySection, loadInfluencers, language]);

  useEffect(() => {
    if (window.AOS && window.aosInitialized) {
      AOS.refresh();
    }
  }, [activeSectionId, influencersBySection]);

  const influencers = useMemo(() => {
    if (!activeSectionId) return [];
    const list = influencersBySection[activeSectionId] || [];
    if (!Array.isArray(list)) return [];
    return list.map((influencer, index) => ({
      id: influencer?.id ?? `${activeSectionId}-${index}`,
      name:
        influencer?.name ||
        influencer?.full_name ||
        influencer?.title ||
        "Unnamed Influencer",
      primarySubtitle:
        influencer?.primarySubtitle ||
        influencer?.primary_subtitle ||
        influencer?.subtitle ||
        influencer?.role ||
        "",
      secondarySubtitle: influencer?.secondary_subtitle || "",
      image: influencer?.image || influencerPlaceholder,
      followers: influencer?.followers,
      socialLinks: normalizeSocialLinks(influencer?.links),
    }));
  }, [activeSectionId, influencersBySection]);

  const isSectionActive = (section) => {
    if (!section) return false;
    const id = section?.id || section?.slug || section?.key;
    return id === activeSectionId;
  };

  const handleSectionChange = (section) => {
    const nextId = section?.id || section?.slug || section?.key;
    if (!nextId || nextId === activeSectionId) return;
    setActiveSectionId(nextId);
    setCurrentIndex(0);
  };

  // Calculate total pages (pagination) - responsive: 4 on laptop, 2 on mobile
  const totalPages = Math.ceil(influencers.length / itemsPerPage);
  const maxPageIndex = Math.max(0, totalPages - 1);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxPageIndex, prev + 1));
  };

  // Drag handlers
  const getPositionX = (e) => {
    return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartX(getPositionX(e));
    setPrevTranslate(currentTranslate);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleDragMove = (e) => {
    if (!isDragging || !carouselRef.current) return;

    const currentPosition = getPositionX(e);
    const diff = currentPosition - startX;
    const newTranslate = prevTranslate + diff;

    // Calculate boundaries
    const containerWidth = carouselRef.current.offsetWidth;
    const itemWidth = containerWidth / itemsPerView;
    const maxTranslate = 0;
    const totalItemsWidth = influencers.length * itemWidth;
    const visibleWidth = itemsPerView * itemWidth;
    const minTranslate = -(totalItemsWidth - visibleWidth);

    // Apply boundaries with elastic effect
    let boundedTranslate = newTranslate;
    if (newTranslate > maxTranslate) {
      boundedTranslate = maxTranslate + (newTranslate - maxTranslate) * 0.3;
    } else if (newTranslate < minTranslate) {
      boundedTranslate = minTranslate + (newTranslate - minTranslate) * 0.3;
    }

    setCurrentTranslate(boundedTranslate);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (!carouselRef.current) return;

    const containerWidth = carouselRef.current.offsetWidth;
    const itemWidth = containerWidth / itemsPerView;
    const pageWidth = itemWidth * itemsPerPage; // Responsive: 4 on laptop, 2 on mobile
    const movedBy = currentTranslate - prevTranslate;

    // Determine if we should move to next/prev page
    if (movedBy < -pageWidth / 3 && currentIndex < maxPageIndex) {
      setCurrentIndex((prev) => prev + 1);
    } else if (movedBy > pageWidth / 3 && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      // Snap back to current position
      const targetTranslate = -currentIndex * itemsPerPage * itemWidth;
      setCurrentTranslate(targetTranslate);
      setPrevTranslate(targetTranslate);
    }
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    handleDragStart(e);
  };

  const handleTouchStart = (e) => {
    handleDragStart(e);
  };

  const handleMouseMove = (e) => {
    handleDragMove(e);
  };

  const handleTouchMove = (e) => {
    handleDragMove(e);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleDragEnd();
    }
  };

  useEffect(() => {
    if (!isDragging && carouselRef.current) {
      const containerWidth = carouselRef.current.offsetWidth;
      const itemWidth = containerWidth / itemsPerView;
      // Move by itemsPerPage items per page (responsive: 4 on laptop, 2 on mobile)
      const targetTranslate = -currentIndex * itemsPerPage * itemWidth;
      setPrevTranslate(targetTranslate);
      setCurrentTranslate(targetTranslate);
    }
  }, [currentIndex, itemsPerView, itemsPerPage, isDragging]);

  // Reset index when itemsPerView or itemsPerPage changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [itemsPerView, itemsPerPage]);

  const arrowIcon = isRtl ? "←" : "→";

  return (
    <section
      className="influencers-scope min-h-[980px] py-8 px-4 relative overflow-hidden bg-[var(--background)]"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#52C3C5]/5 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#52C3C5]/10 dark:bg-[#52C3C5]/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#52C3C5] animate-pulse"></span>
            <span className="text-sm font-medium text-[#52C3C5]">
              {t("home.influencers.badge")}
            </span>
          </div>

          <TikitTitle
            title={t("home.influencers.title")}
            mainWord={t("home.influencers.mainWord")}
          />
          <p className="text-[var(--foreground)]/70 max-w-2xl mx-auto">
            {t("home.influencers.subtitle")}
          </p>
        </div>

        {/* Category Menu Bar */}
        <div
          className="flex justify-center mb-12"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center max-w-5xl px-2">
            {sectionsLoading && sections.length === 0 ? (
              <div className="text-sm text-[var(--foreground)]/70">
                {t("home.influencers.loadingCategories")}
              </div>
            ) : sectionsError ? (
              <div className="text-sm text-red-500">
                {sectionsError || t("home.influencers.categoriesError")}
              </div>
            ) : sections.length === 0 ? (
              <div className="text-sm text-[var(--foreground)]/70">
                {t("home.influencers.noCategories")}
              </div>
            ) : (
              sections.map((section, idx) => {
                const isActive = isSectionActive(section);
                return (
                  <button
                    key={section?.id ?? section?.slug ?? idx}
                    onClick={() => handleSectionChange(section)}
                    data-aos="zoom-in"
                    data-aos-duration="400"
                    data-aos-delay={idx * 60}
                    className={`chip flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border transition-all duration-400 ease-out text-sm sm:text-base font-medium tracking-wide ${
                      isActive
                        ? "bg-[#52C3C5] text-white border-[#52C3C5] shadow-lg shadow-[#52C3C5]/30"
                        : "bg-transparent text-[var(--foreground)] border-[var(--foreground)]/15 hover:border-[#52C3C5]/60 hover:text-[#52C3C5] hover:bg-[#52C3C5]/10"
                    }`}
                  >
                    {getSectionLabel(section)}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative min-h-[370px]">
          {influencersLoading && !influencers.length ? (
            <div className="text-center text-sm text-[var(--foreground)]/70">
              {t("home.influencers.loadingInfluencers")}
            </div>
          ) : influencersError && !influencers.length ? (
            <div className="text-center text-sm text-red-500">
              {influencersError || t("home.influencers.influencersError")}
            </div>
          ) : influencers.length === 0 ? (
            <div className="text-center text-sm text-[var(--foreground)]/70 max-w-md mx-auto">
              {t("home.influencers.noInfluencers")}
            </div>
          ) : (
            <>
              {/* Navigation Arrows */}
              {influencers.length > itemsPerPage && (
                <>
                  <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className={`absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center transition-all duration-300 ${
                      currentIndex === 0
                        ? "opacity-30 cursor-not-allowed"
                        : "hover:bg-[#52C3C5] hover:text-white hover:scale-110"
                    }`}
                    aria-label="Previous"
                  >
                    <FaChevronLeft className="text-lg md:text-xl" />
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={currentIndex >= maxPageIndex}
                    className={`absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center transition-all duration-300 ${
                      currentIndex >= maxPageIndex
                        ? "opacity-30 cursor-not-allowed"
                        : "hover:bg-[#52C3C5] hover:text-white hover:scale-110"
                    }`}
                    aria-label="Next"
                  >
                    <FaChevronRight className="text-lg md:text-xl" />
                  </button>
                </>
              )}

              {/* Carousel */}
              <div
                ref={carouselRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className="overflow-hidden cursor-grab active:cursor-grabbing px-8 md:px-12"
                style={{ userSelect: "none" }}
              >
                <div
                  className={`flex gap-10  ${
                    isDragging
                      ? ""
                      : "transition-transform duration-500 ease-out"
                  }`}
                  style={{
                    transform: `translateX(${currentTranslate}px)`,
                  }}
                >
                  {influencers.map((inf, idx) => {
                    const itemWidth = `calc((100% - ${
                      (itemsPerView - 1) * gapSize
                    }rem) / ${itemsPerView})`;

                    return (
                      <div
                        key={inf.id}
                        data-aos="fade-up"
                        data-aos-duration="600"
                        data-aos-delay={idx * 100}
                        className="flex flex-col items-center text-center flex-shrink-0"
                        style={{
                          width: itemWidth,
                          minWidth: "0",
                          flexBasis: itemWidth,
                        }}
                      >
                        {/* Influencer Image */}
                        <div className="relative w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48 mb-3 sm:mb-4 rounded-full overflow-hidden bg-gradient-to-br from-[#52C3C5]/20 to-[#5269C5]/20 shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#52C3C5]/30 mx-auto">
                          <img
                            src={inf.image}
                            alt={inf.name}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                            loading="lazy"
                            draggable="false"
                          />
                        </div>

                        {/* Name */}
                        <h3 className="text-sm sm:text-base md:text-xl font-bold mb-1 sm:mb-2 text-[var(--foreground)] transition-colors duration-300 hover:text-[#52C3C5] px-2">
                          {inf.name}
                        </h3>

                        {/* Primary Subtitle */}
                        {inf.primarySubtitle && (
                          <p className="text-[10px] sm:text-xs md:text-sm text-[#52C3C5] font-medium mb-1 px-2">
                            {inf.primarySubtitle}
                          </p>
                        )}

                        {/* Secondary Subtitle */}
                        {inf.secondarySubtitle && (
                          <p className="text-[9px] sm:text-[10px] md:text-xs text-[var(--foreground)]/60 mb-2 sm:mb-4 px-2">
                            {inf.secondarySubtitle}
                          </p>
                        )}

                        {/* Social Links */}
                        <div className="flex gap-1 sm:gap-1.5 md:gap-2 justify-center flex-wrap">
                          {inf.socialLinks?.map((social, socialIdx) => {
                            const Icon =
                              SOCIAL_ICON_MAP[social.platform] || FaInstagram;
                            return (
                              <a
                                key={`${inf.id}-${social.platform}`}
                                href={social.href}
                                target="_blank"
                                rel="noreferrer noopener"
                                aria-label={social.platform}
                                className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#52C3C5] to-[#5269C5] text-white transition-all duration-500 hover:scale-125 hover:-rotate-12 shadow-lg hover:shadow-2xl hover:shadow-[#52C3C5]/50"
                                style={{
                                  transitionDelay: `${socialIdx * 50}ms`,
                                }}
                              >
                                <Icon className="text-[10px] sm:text-xs md:text-base" />
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pagination Dots */}
              {influencers.length > itemsPerPage && totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === currentIndex
                          ? "bg-[#52C3C5] w-8"
                          : "bg-[var(--foreground)]/20 hover:bg-[#52C3C5]/50 w-2"
                      }`}
                      aria-label={`Go to page ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => navigate("/influencer")}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-[#52C3C5] text-[#52C3C5] font-semibold tracking-wide uppercase text-sm transition-all duration-300 hover:bg-[#52C3C5] hover:text-white shadow-lg shadow-[#52C3C5]/30"
          >
            {t("home.influencers.showAll")}
            <span aria-hidden="true">{arrowIcon}</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Influencers;
