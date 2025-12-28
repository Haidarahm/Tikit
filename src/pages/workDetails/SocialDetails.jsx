import React, { useEffect, useMemo, useState, useLayoutEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Skeleton } from "antd";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";
import { FiTrendingUp, FiActivity, FiUsers, FiArrowLeft } from "react-icons/fi";

import { useWorkItemDetailsStore } from "../../store/work/workItemDetailsStore";
import { useI18nLanguage } from "../../store/I18nLanguageContext.jsx";
import { useTheme } from "../../store/ThemeContext.jsx";
import SEOHead from "../../components/SEOHead";
import Footer from "../../components/Footer";
import ContactUs from "../Home/ContactUs";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Format number to K (thousands) or M (millions)
const formatNumber = (num) => {
  if (!num && num !== 0) return null;
  const number = typeof num === 'string' ? parseFloat(num) : num;
  if (isNaN(number)) return num;
  
  // If number has 6 zeros (1,000,000 or more), convert to M
  if (number >= 1000000) {
    const millions = number / 1000000;
    // Remove decimal if it's a whole number
    return millions % 1 === 0 ? `${millions}M` : `${millions.toFixed(1)}M`;
  }
  // If number has 3 zeros (1,000 or more), convert to K
  if (number >= 1000) {
    const thousands = number / 1000;
    // Remove decimal if it's a whole number
    return thousands % 1 === 0 ? `${thousands}K` : `${thousands.toFixed(1)}K`;
  }
  // Return as is for numbers less than 1000
  return number.toString();
};

const SocialDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language, isRtl } = useI18nLanguage();
  const { theme } = useTheme();
  const { t } = useTranslation();

  const social = useWorkItemDetailsStore((state) => state.social);
  const loadSocialDetail = useWorkItemDetailsStore(
    (state) => state.loadSocialDetail
  );
  const resetCategory = useWorkItemDetailsStore((state) => state.resetCategory);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const headerRef = useRef(null);
  const mediaRef = useRef(null);
  const textRef = useRef(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  useEffect(() => {
    if (!id) return;

    loadSocialDetail(id, { lang: language }).catch((error) => {
      console.error("Failed to load social details", error);
    });

    return () => {
      resetCategory("social");
    };
  }, [id, language, loadSocialDetail, resetCategory]);

  const itemData = social.item;
  const media = useMemo(() => {
    if (Array.isArray(social.media) && social.media.length > 0) {
      return social.media;
    }
    if (Array.isArray(itemData?.media)) {
      return itemData.media;
    }
    return [];
  }, [social.media, itemData]);

  const title = useMemo(() => {
    if (!itemData) return "";
    if (itemData.title) return itemData.title;

    if (language === "ar")
      return itemData.title_ar ?? itemData.title_en ?? itemData.title_fr;
    if (language === "fr")
      return itemData.title_fr ?? itemData.title_en ?? itemData.title_ar;
    return itemData.title_en ?? itemData.title_ar ?? itemData.title_fr ?? "";
  }, [itemData, language]);

  const objective = useMemo(() => {
    if (!itemData) return "";
    if (itemData.objective) return itemData.objective;
  }, [itemData, language]);

  const approach = useMemo(() => {
    if (!itemData) return "";

    if (itemData.approach) return itemData.approach;
  }, [itemData, language]);

  const metrics = useMemo(() => {
    if (!itemData) return [];
    return [
      {
        label: t("work.details.social.followerGrowth"),
        value:
          itemData.follower_growth != null
            ? `${itemData.follower_growth}%`
            : null,
        Icon: FiTrendingUp,
      },
      {
        label: t("work.details.social.engagementRate"),
        value:
          itemData.engagement_rate != null
            ? `${parseFloat(itemData.engagement_rate).toFixed(2)}%`
            : null,
        Icon: FiActivity,
      },
      {
        label: t("work.details.social.totalAudience"),
        value: itemData.audience_size != null
          ? formatNumber(itemData.audience_size)
          : null,
        Icon: FiUsers,
      },
    ].filter((metric) => metric.value != null);
  }, [itemData, t]);

  useLayoutEffect(() => {
    if (!itemData || !headerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { autoAlpha: 0, y: 70, scale: 0.95 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power4.out",
        }
      );

      const headerChildren = headerRef.current.querySelectorAll(
        "[data-header-child]"
      );
      if (headerChildren.length) {
        gsap.from(headerChildren, {
          autoAlpha: 0,
          y: 25,
          stagger: 0.08,
          duration: 0.55,
          ease: "power3.out",
          delay: 0.1,
        });
      }

      if (mediaRef.current) {
        gsap.from(mediaRef.current, {
          autoAlpha: 0,
          y: 60,
          rotateX: 6,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mediaRef.current,
            start: "top 80%",
          },
        });
      }

      if (textRef.current) {
        const blocks = textRef.current.querySelectorAll("[data-text-card]");
        gsap.from(blocks, {
          autoAlpha: 0,
          y: 35,
          stagger: 0.12,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 85%",
          },
        });
      }
    }, headerRef);

    return () => ctx.revert();
  }, [itemData?.id, media.length]);

  return (
    <div
      className={`social-details min-h-screen ${
        isRtl ? "font-cairo" : "font-hero-light"
      }`}
    >
      <SEOHead
        title={
          title
            ? `${title} | ${t("work.details.social.title")}`
            : t("work.details.social.title")
        }
        description={objective ?? ""}
        canonicalUrl={`/work/social/${id}`}
      />

      {social.loading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 px-4 md:px-6 pt-28 pb-10">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={`social-skeleton-${index}`}
              className="h-[260px] rounded-3xl bg-[var(--container-bg)]/80 p-6"
            >
              <Skeleton.Node active className="w-full h-full" />
            </div>
          ))}
        </div>
      ) : itemData ? (
        <div className="px-4 md:px-10 pb-20 pt-28">
          <div className="space-y-12">
            {/* Header Card with Title, Logo, and Metrics */}
            <div
              ref={headerRef}
              className="relative overflow-hidden rounded-[32px] border border-[var(--foreground)]/10 bg-[var(--background)] p-8 md:p-10 shadow-xl"
            >
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-32 right-0 h-64 w-64 rounded-full bg-[var(--secondary)]/20 blur-3xl" />
                <div className="absolute -bottom-24 left-10 h-48 w-48 rounded-full bg-[var(--secondary)]/15 blur-3xl" />
              </div>
              <div className="relative z-10 flex flex-col gap-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-1 items-start gap-5" data-header-child>
                    {itemData.logo && (
                      <div className="flex h-20 w-20 items-center bg-[#f7f9fa] justify-center rounded-2xl border border-[var(--foreground)]/10 bg-[var(--background)]/50 p-2 shadow-lg">
                        <img
                          src={itemData.logo}
                          alt={title}
                          width={80}
                          height={80}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    )}
                    <div className="space-y-3" data-header-child>
                      <p className="text-xs uppercase tracking-[0.5em] text-[var(--foreground)]/60">
                        {t("work.details.social.campaign")}
                      </p>
                      <h1 className={`text-[32px] md:text-[48px] font-bold leading-tight text-[var(--foreground)] ${isRtl ? "font-cairo" : "font-antonio"}`}>
                        {title}
                      </h1>
                    </div>
                  </div>

                  <button
                    data-header-child
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--foreground)]/10 bg-[var(--container-bg)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--foreground)] transition hover:bg-[var(--foreground)] hover:text-[var(--background)]"
                  >
                    <FiArrowLeft className="h-4 w-4" />
                    {t("work.details.social.back")}
                  </button>
                </div>

                {metrics.length > 0 && (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {metrics.map(({ label, value, Icon }) => (
                      <div
                        data-header-child
                        key={label}
                        className="relative overflow-hidden rounded-2xl border border-[var(--foreground)]/10 bg-[var(--container-bg)]/50 p-4 backdrop-blur-sm shadow-inner"
                      >
                        <div className="relative flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--secondary)]/40 text-[var(--background)]">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-[0.4em] text-[var(--foreground)]/60">
                              {label}
                            </p>
                            <p className="text-xl font-semibold text-[var(--foreground)]">
                              {value}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Two Column Layout - Media and Text Content */}
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16" ref={textRef}>
              {/* Media Column */}
              <div className="space-y-4" ref={mediaRef}>
                {media.length > 0 ? (
                  <>
                    <Swiper
                      modules={[Autoplay, Thumbs]}
                      autoplay={{ delay: 3000, disableOnInteraction: false }}
                      loop
                      thumbs={{
                        swiper:
                          thumbsSwiper && !thumbsSwiper.destroyed
                            ? thumbsSwiper
                            : null,
                      }}
                      className="w-full rounded-3xl shadow-xl"
                    >
                      {media.map((src, index) => (
                        <SwiperSlide key={`${src}-${index}`}>
                          <div className="group relative overflow-hidden rounded-[28px] border border-[var(--foreground)]/10 bg-[var(--container-bg)]/60 shadow-2xl">
                            <img
                              src={src}
                              alt={`${title} media ${index + 1}`}
                              width={600}
                              height={380}
                              className="h-full w-full max-h-[380px] object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/60 via-[var(--background)]/10 to-transparent transition-opacity duration-300 group-hover:opacity-100" />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    {media.length > 1 && (
                      <Swiper
                        modules={[Thumbs]}
                        onSwiper={setThumbsSwiper}
                        watchSlidesProgress
                        spaceBetween={12}
                        slidesPerView={Math.min(media.length, 4)}
                        className="w-full rounded-2xl"
                      >
                        {media.map((src, index) => (
                          <SwiperSlide
                            key={`thumb-${index}`}
                            className="cursor-pointer"
                          >
                            <img
                              src={src}
                              alt={`Thumb ${index + 1}`}
                              className="h-[70px] w-full rounded-2xl object-cover opacity-80 transition border border-[var(--foreground)]/10 bg-[var(--container-bg)]/70 hover:opacity-100"
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    )}
                  </>
                ) : (
                  <div
                    className="rounded-3xl bg-[var(--container-bg)]/70 p-10 text-center text-sm text-[var(--foreground)]/60 shadow-inner"
                    data-text-card
                  >
                    {t("work.details.social.noMedia")}
                  </div>
                )}
              </div>

              {/* Text Content Column */}
              <div className="space-y-8">
                {objective && (
                <div
                  className="relative overflow-hidden rounded-[28px] border border-[var(--foreground)]/10 bg-[var(--container-bg)] p-8 md:p-10 shadow-xl"
                  data-text-card
                >
                    <div className="relative space-y-4">
                      <h2 className="text-xs font-semibold uppercase tracking-[0.6em] text-[var(--foreground)]/60">
                        {t("work.details.social.objective")}
                      </h2>
                      <p className="text-base leading-relaxed md:text-lg text-[var(--foreground)]">
                        {objective}
                      </p>
                    </div>
                  </div>
                )}

                {approach && (
                  <div
                    className="relative overflow-hidden rounded-[28px] border border-[var(--foreground)]/10 bg-[var(--container-bg)] p-8 md:p-10 shadow-xl"
                    data-text-card
                  >
                    <div className="relative space-y-4">
                      <h2 className="text-xs font-semibold uppercase tracking-[0.6em] text-[var(--foreground)]/60">
                        {t("work.details.social.approach")}
                      </h2>
                      <p className="text-base leading-relaxed md:text-lg text-[var(--foreground)]">
                        {approach}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center py-24">
          <div className="text-center text-sm text-red-400">
            {social.error ?? t("work.details.social.notAvailable")}
          </div>
        </div>
      )}

      <ContactUs />
      <Footer />
    </div>
  );
};

export default SocialDetails;
