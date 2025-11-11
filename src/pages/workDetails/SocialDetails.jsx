import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Skeleton } from "antd";
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
import GradientText from "../../components/GradientText";

const SocialDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language, isRtl } = useI18nLanguage();
  const { theme } = useTheme();

  const social = useWorkItemDetailsStore((state) => state.social);
  const loadSocialDetail = useWorkItemDetailsStore(
    (state) => state.loadSocialDetail
  );
  const resetCategory = useWorkItemDetailsStore((state) => state.resetCategory);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

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
  const media = social.media || [];

  const title = useMemo(() => {
    if (!itemData) return "";
    if (language === "ar")
      return itemData.title_ar ?? itemData.title_en ?? itemData.title_fr;
    if (language === "fr")
      return itemData.title_fr ?? itemData.title_en ?? itemData.title_ar;
    return itemData.title_en ?? itemData.title_ar ?? itemData.title_fr ?? "";
  }, [itemData, language]);

  const objective = useMemo(() => {
    if (!itemData) return "";
    if (language === "ar")
      return (
        itemData.objective_ar ?? itemData.objective_en ?? itemData.objective_fr
      );
    if (language === "fr")
      return (
        itemData.objective_fr ?? itemData.objective_en ?? itemData.objective_ar
      );
    return (
      itemData.objective_en ??
      itemData.objective_ar ??
      itemData.objective_fr ??
      ""
    );
  }, [itemData, language]);

  const approach = useMemo(() => {
    if (!itemData) return "";
    if (language === "ar")
      return (
        itemData.approach_ar ?? itemData.approach_en ?? itemData.approach_fr
      );
    if (language === "fr")
      return (
        itemData.approach_fr ?? itemData.approach_en ?? itemData.approach_ar
      );
    return (
      itemData.approach_en ?? itemData.approach_ar ?? itemData.approach_fr ?? ""
    );
  }, [itemData, language]);

  const metrics = useMemo(() => {
    if (!itemData) return [];
    return [
      {
        label: "Follower Growth",
        value:
          itemData.follower_growth != null
            ? `${itemData.follower_growth}%`
            : null,
        Icon: FiTrendingUp,
      },
      {
        label: "Engagement Rate",
        value:
          itemData.engagement_rate != null
            ? `${parseFloat(itemData.engagement_rate).toFixed(2)}%`
            : null,
        Icon: FiActivity,
      },
      {
        label: "Total Audience",
        value: itemData.audience_size
          ? itemData.audience_size.toLocaleString()
          : null,
        Icon: FiUsers,
      },
    ].filter((metric) => metric.value != null);
  }, [itemData]);

  return (
    <div
      className={`social-details min-h-screen ${
        isRtl ? "font-cairo" : "font-hero-light"
      }`}
    >
      <SEOHead
        title={title ? `${title} | Social Detail` : "Social Detail"}
        description={objective ?? ""}
        canonicalUrl={`/work/social/${id}`}
      />

      {social.loading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 px-4 md:px-6 pt-28 pb-10">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={`social-skeleton-${index}`}
              className="h-[260px] rounded-3xl bg-[var(--card-background)]/80 p-6"
            >
              <Skeleton.Node active className="w-full h-full" />
            </div>
          ))}
        </div>
      ) : itemData ? (
        <div className="px-4 md:px-10 pb-20 pt-28">
          <div className="space-y-12">
            {/* Header Card with Title, Logo, Metrics, and Back Button */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Title and Logo Card */}
              <div className="lg:col-span-2 relative overflow-hidden dark:border dark:border-white/40 rounded-3xl bg-[var(--card-background)] p-8 md:p-10 shadow-2xl backdrop-blur">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 via-transparent to-[var(--accent)]/10" />
                <div className="relative z-10 flex flex-col gap-6">
                  <div className="flex items-start gap-6">
                    {itemData.logo && (
                      <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-[var(--border)] bg-[var(--card-background)]/70 p-2 shadow-lg">
                        <img
                          src={itemData.logo}
                          alt={title}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    )}
                    <div className="space-y-4 flex-1">
                      <GradientText
                        colors={
                          theme === "dark"
                            ? ["#07D9F5", "#06AEC4", "#4E7CC6"]
                            : isRtl
                            ? ["#FB8DEF", "#CE88C6", "#4E7CC6"]
                            : ["#52C3C5", "#5269C5", "#52A0C5"]
                        }
                        animationSpeed={6}
                        showBorder={false}
                        className="text-[30px] md:text-[44px] font-bold leading-tight"
                      >
                        {title}
                      </GradientText>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(-1)}
                    className="self-start rounded-full px-6 py-3 text-sm uppercase tracking-wide
                      bg-[var(--card-background)]/60 text-[var(--foreground)]
                      transition border flex items-center gap-2 hover:bg-[var(--foreground)] hover:text-[var(--background)]"
                  >
                    <FiArrowLeft className="h-4 w-4" />
                    Back
                  </button>
                </div>
              </div>

              {/* Metrics Card */}
              {metrics.length > 0 && (
                <div className="relative overflow-hidden dark:border dark:border-white/40 rounded-3xl bg-[var(--card-background)] p-6 md:p-8 shadow-2xl backdrop-blur">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 via-transparent to-[var(--accent)]/10" />
                  <div className="relative z-10 flex flex-col gap-4 h-full justify-center">
                    {metrics.map(({ label, value, Icon }) => (
                      <div
                        key={label}
                        className="flex items-center gap-4 rounded-2xl border border-[var(--border)]/30 bg-[var(--card-background)]/70 p-4 transition-transform duration-300 hover:translate-x-1"
                      >
                        <div
                          className={`flex h-12 w-12 items-center justify-center flex-shrink-0 rounded-full bg-gradient-to-br ${
                            theme === "dark"
                              ? "from-slate-800/80 to-slate-700/40 text-sky-300"
                              : "from-[var(--accent)]/20 to-[var(--accent)]/10 text-[var(--foreground)]"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                          <div className="text-xl font-semibold text-[var(--foreground)]">
                            {value}
                          </div>
                          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--foreground)]/60">
                            {label}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Two Column Layout - Media and Text Content */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
              {/* Media Column */}
              <div className="space-y-4 order-2 lg:order-1">
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
                          <div className="group relative overflow-hidden rounded-3xl bg-[var(--card-background)]">
                            <img
                              src={src}
                              alt={`${title} media ${index + 1}`}
                              className="h-full w-full max-h-[280px] md:max-h-[380px] object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div
                              className={`absolute inset-0 transition-opacity duration-300 group-hover:opacity-100 ${
                                theme === "dark"
                                  ? "bg-gradient-to-t from-black/25 via-black/10 to-transparent"
                                  : "bg-gradient-to-t from-black/45 via-black/10 to-transparent"
                              }`}
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    {media.length > 1 && (
                      <Swiper
                        modules={[Thumbs]}
                        onSwiper={setThumbsSwiper}
                        watchSlidesProgress
                        spaceBetween={8}
                        slidesPerView={Math.min(media.length, 3)}
                        breakpoints={{
                          640: {
                            slidesPerView: Math.min(media.length, 4),
                            spaceBetween: 12,
                          },
                        }}
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
                              className="h-[60px] sm:h-[70px] w-full rounded-2xl object-cover opacity-80 transition hover:opacity-100"
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    )}
                  </>
                ) : (
                  <div className="rounded-3xl bg-[var(--card-background)]/70 p-10 text-center text-sm text-[var(--foreground)]/60 shadow-inner">
                    No media available for this work item.
                  </div>
                )}
              </div>

              {/* Text Content Column */}
              <div className="space-y-8 order-1 lg:order-2">
                {objective && (
                  <div className="rounded-3xl dark:border dark:border-white/40 bg-[var(--card-background)]/85 p-6 md:p-8 lg:p-10 shadow-xl">
                    <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.4em] text-[var(--foreground)]/50">
                      Objective
                    </h2>
                    <p className="mt-4 text-base leading-relaxed md:text-lg text-[var(--foreground)]/75">
                      {objective}
                    </p>
                  </div>
                )}

                {approach && (
                  <div className="rounded-3xl dark:border dark:border-white/40 bg-[var(--card-background)]/85 p-6 md:p-8 lg:p-10 shadow-xl">
                    <h2 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.4em] text-[var(--foreground)]/50">
                      Approach
                    </h2>
                    <p className="mt-4 text-base leading-relaxed md:text-lg text-[var(--foreground)]/75">
                      {approach}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center py-24">
          <div className="text-center text-sm text-red-400">
            {social.error ?? "Social details not available."}
          </div>
        </div>
      )}

      <ContactUs />
      <Footer />
    </div>
  );
};

export default SocialDetails;
