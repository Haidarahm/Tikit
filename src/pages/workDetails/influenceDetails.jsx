import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Skeleton } from "antd";
import { useWorkItemDetailsStore } from "../../store/work/workItemDetailsStore";
import { useI18nLanguage } from "../../store/I18nLanguageContext.jsx";
import { useTheme } from "../../store/ThemeContext.jsx";
import SEOHead from "../../components/SEOHead";
import Footer from "../../components/Footer";
import ContactUs from "../Home/ContactUs";
import GradientText from "../../components/GradientText";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";

const InfluenceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language, isRtl } = useI18nLanguage();
  const { theme } = useTheme();
  const influence = useWorkItemDetailsStore((state) => state.influence);
  const loadInfluenceDetail = useWorkItemDetailsStore(
    (state) => state.loadInfluenceDetail
  );
  const resetCategory = useWorkItemDetailsStore((state) => state.resetCategory);

  useEffect(() => {
    if (!id) return;

    loadInfluenceDetail(id, { lang: language }).catch((error) => {
      console.error("Failed to load influence details", error);
    });

    return () => {
      resetCategory("influence");
    };
  }, [id, language, loadInfluenceDetail, resetCategory]);

  const itemData = influence.item;
  const media = influence.media || [];

  const title = useMemo(() => {
    if (!itemData) return "";
    if (language === "ar") return itemData.title_ar ?? itemData.title_en;
    if (language === "fr") return itemData.title_fr ?? itemData.title_en;
    return itemData.title_en ?? itemData.title_ar ?? itemData.title_fr;
  }, [itemData, language]);

  const objective = useMemo(() => {
    if (!itemData) return "";
    if (language === "ar")
      return itemData.objective_ar ?? itemData.objective_en;
    if (language === "fr")
      return itemData.objective_fr ?? itemData.objective_en;
    return (
      itemData.objective_en ?? itemData.objective_ar ?? itemData.objective_fr
    );
  }, [itemData, language]);

  const metrics = useMemo(() => {
    if (!itemData) return [];
    return [
      {
        label: "Reach",
        value: itemData.reach ? itemData.reach.toLocaleString() : null,
      },
      {
        label: "Views",
        value: itemData.views ? itemData.views.toLocaleString() : null,
      },
      {
        label: "Engagement Rate",
        value:
          itemData.engagement_rate != null
            ? `${parseFloat(itemData.engagement_rate).toFixed(2)}%`
            : null,
      },
    ].filter((metric) => metric.value != null);
  }, [itemData]);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div
      className={`influence-details min-h-screen ${
        isRtl ? "font-cairo" : "font-hero-light"
      }`}
    >
      <SEOHead
        title={title ? `${title} | Influence Detail` : "Influence Detail"}
        description={objective ?? ""}
        canonicalUrl={`/work/influence/${id}`}
      />

      {influence.loading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 px-4 md:px-6 pt-28 pb-10">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={`influence-skeleton-${index}`}
              className="h-[260px] rounded-3xl bg-[var(--card-background)]/80 p-6"
            >
              <Skeleton.Node active className="w-full h-full" />
            </div>
          ))}
        </div>
      ) : itemData ? (
        <div className="px-4 md:px-10 pb-20 pt-28">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Column */}
            <div className="space-y-10">
              <div className="relative overflow-hidden dark:border dark:border-white rounded-3xl bg-[var(--card-background)] p-8 md:p-10 shadow-2xl">
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
                    <div className="space-y-4">
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
                  {metrics.length > 0 && (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 rounded-2xl bg-[var(--card-background)]/70 p-4 ">
                      {metrics.map((metric) => (
                        <div key={metric.label} className="text-center">
                          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--foreground)]/50">
                            {metric.label}
                          </div>
                          <div className="mt-2 text-xl font-bold text-[var(--foreground)]">
                            {metric.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <button
                    onClick={() => navigate(-1)}
                    className="self-start rounded-full px-6 py-3 text-sm uppercase tracking-wide
                      bg-[var(--card-background)]/60 text-[var(--foreground)]
                      transition border hover:bg-[var(--foreground)] hover:text-[var(--background)]"
                  >
                    Back
                  </button>
                </div>
              </div>

              {objective && (
                <div className="rounded-3xl dark:border dark:border-white bg-[var(--card-background)]/85 p-8 md:p-10 shadow-xl">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-[var(--foreground)]/50">
                    Objective
                  </h2>
                  <p className="mt-4 text-base leading-relaxed md:text-lg text-[var(--foreground)]/75">
                    {objective}
                  </p>
                </div>
              )}
            </div>

            {/* Right Column - Media */}
            <div className="space-y-4">
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
                            className="h-full w-full max-h-[380px] object-cover transition-transform duration-700 group-hover:scale-105"
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
                          className="h-[70px] w-full rounded-2xl object-cover opacity-80 transition hover:opacity-100"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </>
              ) : (
                <div className="rounded-3xl bg-[var(--card-background)]/70 p-10 text-center text-sm text-[var(--foreground)]/60 shadow-inner">
                  No media available for this work item.
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center py-24">
          <div className="text-center text-sm text-red-400">
            {influence.error ?? "Influence details not available."}
          </div>
        </div>
      )}

      <ContactUs />
      <Footer />
    </div>
  );
};

export default InfluenceDetails;
