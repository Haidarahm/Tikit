import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Skeleton } from "antd";
import { useTranslation } from "react-i18next";
import { useWorkItemDetailsStore } from "../../store/work/workItemDetailsStore";
import { useI18nLanguage } from "../../store/I18nLanguageContext.jsx";
import { useTheme } from "../../store/ThemeContext.jsx";
import SEOHead from "../../components/SEOHead";
import Footer from "../../components/Footer";
import ContactUs from "../Home/ContactUs";
import GradientText from "../../components/GradientText";
import { FiUsers, FiEye, FiActivity, FiArrowLeft } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";

const InfluenceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language, isRtl } = useI18nLanguage();
  const { theme } = useTheme();
  const { t } = useTranslation();
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
    if (itemData?.title) return itemData.title;
  }, [itemData, language]);

  const objective = useMemo(() => {
    console.log(itemData);
    if (itemData?.objective) return itemData.objective;
  }, [itemData, language]);

  const metrics = useMemo(() => {
    if (!itemData) return [];
    return [
      {
        label: t("work.details.influence.reach"),
        value: itemData.reach ? itemData.reach.toLocaleString() : null,
        Icon: FiUsers,
      },
      {
        label: t("work.details.influence.views"),
        value: itemData.views ? itemData.views.toLocaleString() : null,
        Icon: FiEye,
      },
      {
        label: t("work.details.influence.engagementRate"),
        value:
          itemData.engagement_rate != null
            ? `${parseFloat(itemData.engagement_rate).toFixed(2)}%`
            : null,
        Icon: FiActivity,
      },
    ].filter((metric) => metric.value != null);
  }, [itemData, t]);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div
      className={`influence-details min-h-screen ${
        isRtl ? "font-cairo" : "font-hero-light"
      }`}
    >
      <SEOHead
        title={
          title
            ? `${title} | ${t("work.details.influence.title")}`
            : t("work.details.influence.title")
        }
        description={objective ?? ""}
        canonicalUrl={`/work/influence/${id}`}
      />

      {influence.loading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 px-4 md:px-6 pt-28 pb-10">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={`influence-skeleton-${index}`}
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
            <div className="relative overflow-hidden rounded-[32px] border border-[var(--foreground)]/10 bg-[var(--background)] p-8 md:p-10 shadow-xl">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-32 right-0 h-64 w-64 rounded-full bg-[var(--secondary)]/20 blur-3xl" />
                <div className="absolute -bottom-24 left-10 h-48 w-48 rounded-full bg-[var(--secondary)]/15 blur-3xl" />
              </div>
              <div className="relative z-10 flex flex-col gap-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-1 items-start gap-5">
                    {itemData.logo && (
                      <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-[var(--foreground)]/10 bg-[var(--background)]/50 p-2 shadow-lg">
                        <img
                          src={itemData.logo}
                          alt={title}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    )}
                    <div className="space-y-3">
                      <p className="text-xs uppercase tracking-[0.5em] text-[var(--foreground)]/60">
                        {t("work.details.influence.campaign")}
                      </p>
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
                        className="text-[32px] md:text-[48px] font-bold leading-tight"
                      >
                        {title}
                      </GradientText>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--foreground)]/10 bg-[var(--container-bg)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--foreground)] transition hover:bg-[var(--foreground)] hover:text-[var(--background)]"
                  >
                    <FiArrowLeft className="h-4 w-4" />
                    {t("work.details.influence.back")}
                  </button>
                </div>

                {metrics.length > 0 && (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {metrics.map(({ label, value, Icon }) => (
                      <div
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

            {/* Two Column Layout - Media and Objective */}
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Media Column */}
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
                          <div className="group relative overflow-hidden rounded-[28px] border border-[var(--foreground)]/10 bg-[var(--container-bg)]/60 shadow-2xl">
                            <img
                              src={src}
                              alt={`${title} media ${index + 1}`}
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
                  <div className="rounded-3xl bg-[var(--container-bg)]/70 p-10 text-center text-sm text-[var(--foreground)]/60 shadow-inner">
                    {t("work.details.influence.noMedia")}
                  </div>
                )}
              </div>

              {/* Objective Column */}
              {objective && (
                <div className="relative overflow-hidden rounded-[28px] border border-[var(--foreground)]/10 bg-[var(--container-bg)] p-8 md:p-10 shadow-xl">
                  <div className="relative space-y-4">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.6em] text-[var(--foreground)]/60">
                      {t("work.details.influence.objective")}
                    </h2>
                    <p className="text-base leading-relaxed md:text-lg text-[var(--foreground)]">
                      {objective}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center py-24">
          <div className="text-center text-sm text-red-400">
            {influence.error ?? t("work.details.influence.notAvailable")}
          </div>
        </div>
      )}

      <ContactUs />
      <Footer />
    </div>
  );
};

export default InfluenceDetails;
