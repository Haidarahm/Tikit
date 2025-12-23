import React, { useState, useEffect, useMemo, useRef } from "react";
import influencerPlaceholder from "../../../assets/influncer/1.png";
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
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./influencers.css";

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
  const [swiperInstance, setSwiperInstance] = useState(null);
  const sectionRef = useRef(null);
  const hasLoadedSectionsRef = useRef(false);

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

  // Defer sections API call until component is near viewport
  useEffect(() => {
    if (!sectionRef.current || hasLoadedSectionsRef.current) return;

    // Use IntersectionObserver to load data when component is about to be visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            hasLoadedSectionsRef.current = true;
            loadSections({ lang: language });
            observer.disconnect(); // Only load once
          }
        });
      },
      {
        rootMargin: '200px', // Start loading 200px before component is visible
        threshold: 0.01,
      }
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
    };
  }, [loadSections, language]);

  useEffect(() => {
    clearSection();
    setActiveSectionId(null);
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
      // Reset Swiper to first slide when section changes
      if (swiperInstance) {
        swiperInstance.slideTo(0);
      }
      return;
    }
    loadInfluencers(activeSectionId, { lang: language, per_page: 20 });
  }, [activeSectionId, influencersBySection, loadInfluencers, language]);

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
    if (swiperInstance) {
      swiperInstance.slideTo(0);
    }
  };

  const arrowIcon = isRtl ? "←" : "→";

  return (
    <section
      ref={sectionRef}
      className="influencers-scope influencers-home min-h-[880px] py-8 px-4 relative overflow-hidden bg-[var(--background)]"
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
        >
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center max-w-5xl px-2">
            {sectionsLoading && sections.length === 0 ? (
              <div className="flex gap-3 sm:gap-4">
                {[...Array(5)].map((_, idx) => (
                  <div
                    key={idx}
                    className="h-10 sm:h-12 w-20 sm:w-24 rounded-full bg-gradient-to-r from-[var(--foreground)]/10 via-[var(--foreground)]/20 to-[var(--foreground)]/10 animate-pulse"
                    style={{
                      animationDelay: `${idx * 100}ms`,
                      animationDuration: '1.5s'
                    }}
                  />
                ))}
              </div>
            ) : sections.length === 0 ? (
              null
            ) : (
              sections.map((section, idx) => {
                const isActive = isSectionActive(section);
                return (
                  <button
                    key={section?.id ?? section?.slug ?? idx}
                    onClick={() => handleSectionChange(section)}
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
            <div className="flex justify-center items-center min-h-[370px]">
              <div className="flex gap-4 sm:gap-6 md:gap-8">
                {[...Array(4)].map((_, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center text-center"
                    style={{
                      animationDelay: `${idx * 150}ms`,
                    }}
                  >
                    {/* Circular Image Skeleton */}
                    <div
                      className="w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-r from-[var(--foreground)]/10 via-[var(--foreground)]/20 to-[var(--foreground)]/10 animate-pulse mb-3 sm:mb-4"
                      style={{
                        animationDuration: '1.5s'
                      }}
                    />
                    {/* Name Skeleton */}
                    <div
                      className="h-4 sm:h-5 md:h-6 w-24 sm:w-32 md:w-40 rounded-full bg-gradient-to-r from-[var(--foreground)]/10 via-[var(--foreground)]/20 to-[var(--foreground)]/10 animate-pulse mb-2 sm:mb-3"
                      style={{
                        animationDuration: '1.5s'
                      }}
                    />
                    {/* Subtitle Skeleton */}
                    <div
                      className="h-3 sm:h-4 w-20 sm:w-28 md:w-36 rounded-full bg-gradient-to-r from-[var(--foreground)]/10 via-[var(--foreground)]/20 to-[var(--foreground)]/10 animate-pulse mb-2"
                      style={{
                        animationDuration: '1.5s'
                      }}
                    />
                    {/* Social Links Skeleton */}
                    <div className="flex gap-1.5 sm:gap-2 justify-center mt-2">
                      {[...Array(3)].map((_, socialIdx) => (
                        <div
                          key={socialIdx}
                          className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-[var(--foreground)]/10 via-[var(--foreground)]/20 to-[var(--foreground)]/10 animate-pulse"
                          style={{
                            animationDuration: '1.5s',
                            animationDelay: `${(idx * 150) + (socialIdx * 100)}ms`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : influencers.length === 0 ? (
            null
          ) : (
            <div className="relative">
              <Swiper
                onSwiper={setSwiperInstance}
                modules={[Navigation, Pagination]}
                spaceBetween={40}
                slidesPerView={2}
                slidesPerGroup={2}
                // navigation={{
                //   prevEl: ".influencers-swiper-prev",
                //   nextEl: ".influencers-swiper-next",
                // }}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                  renderBullet: (index, className) => {
                    return `<span class="${className} influencers-pagination-bullet"></span>`;
                  },
                }}
                breakpoints={{
                  0: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    spaceBetween: 30,
                  },
                  1024: {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                    spaceBetween: 40,
                  },
                }}
                dir={isRtl ? "rtl" : "ltr"}
                className="influencers-swiper"
              >
                {influencers.map((inf, idx) => (
                  <SwiperSlide key={inf.id}>
                    <div className="flex flex-col items-center justify-center text-center h-full">
                      {/* Influencer Image */}
                      <div className="relative w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48 mb-3 sm:mb-4 rounded-full overflow-hidden bg-gradient-to-br from-[#52C3C5]/20 to-[#5269C5]/20 shadow-xl transition-all duration-500 overflow- hover:shadow-2xl hover:shadow-[#52C3C5]/30 mx-auto">
                        <img
                          src={inf.image}
                          alt={inf.name}
                          width={300}
                          height={400}
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
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Navigation Arrows */}
              {/* {influencers.length > 4 && (
                <>
                  <button
                    className="influencers-swiper-prev absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-[#52C3C5] hover:text-white hover:scale-110"
                    aria-label="Previous"
                  >
                    <FaChevronLeft className="text-lg md:text-xl" />
                  </button>

                  <button
                    className="influencers-swiper-next absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-[#52C3C5] hover:text-white hover:scale-110"
                    aria-label="Next"
                  >
                    <FaChevronRight className="text-lg md:text-xl" />
                  </button>
                </>
              )} */}
            </div>
          )}
        </div>

        <div className=" flex justify-center">
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
