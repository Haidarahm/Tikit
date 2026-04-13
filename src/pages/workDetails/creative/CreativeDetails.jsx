import React, {
  useEffect,
  useMemo,
  useState,
  useLayoutEffect,
  useRef,
} from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useWorkItemDetailsStore } from "../../../store/work/workItemDetailsStore.js";
import { useI18nLanguage } from "../../../store/I18nLanguageContext.jsx";
import SEOHead from "../../../components/SEOHead.jsx";
import ContactUs from "../../Home/ContactUs.jsx";
import Loader from "../../../components/Loader.jsx";
import CaseStudy, {
  workItemToCaseData,
} from "../../Work/components/CaseStudy.jsx";
import CreativeBrandImages from "./components/CreativeBrandImages.jsx";
import { FiUsers, FiEye, FiActivity, FiArrowLeft } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const formatNumber = (num) => {
  if (!num && num !== 0) return null;
  const number = typeof num === "string" ? parseFloat(num) : num;
  if (isNaN(number)) return num;
  if (number >= 1000000) {
    const millions = number / 1000000;
    return millions % 1 === 0 ? `${millions}M` : `${millions.toFixed(1)}M`;
  }
  if (number >= 1000) {
    const thousands = number / 1000;
    return thousands % 1 === 0 ? `${thousands}K` : `${thousands.toFixed(1)}K`;
  }
  return number.toString();
};

const CreativeDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { language, isRtl } = useI18nLanguage();
  const { t } = useTranslation();
  const creative = useWorkItemDetailsStore((state) => state.creative);
  const loadCreativeDetail = useWorkItemDetailsStore(
    (state) => state.loadCreativeDetail
  );
  const resetCategory = useWorkItemDetailsStore((state) => state.resetCategory);

  useEffect(() => {
    if (!slug) return;

    loadCreativeDetail(slug, { lang: language }).catch((error) => {
      console.error("Failed to load creative details", error);
    });

    return () => {
      resetCategory("creative");
    };
  }, [slug, language, loadCreativeDetail, resetCategory]);

  const itemData = creative.item;
  const media = creative.media || [];
  const hasReels = Array.isArray(itemData?.reels) && itemData.reels.length > 0;
  const prefersCaseStudy = Boolean(location.state?.prefersCaseStudy);
  const caseData = useMemo(
    () => (hasReels ? workItemToCaseData(itemData) : null),
    [hasReels, itemData]
  );

  const title = useMemo(() => {
    if (!itemData) return "";
    if (itemData?.title) return itemData.title;
  }, [itemData, language]);

  const subtitle = useMemo(() => {
    if (!itemData?.subtitle) return "";
    return String(itemData.subtitle).trim();
  }, [itemData]);

  const objective = useMemo(() => {
    if (itemData?.objective) return itemData.objective;
  }, [itemData, language]);

  const metrics = useMemo(() => {
    if (!itemData) return [];
    return [
      {
        label: t("work.details.creative.reach"),
        value: itemData.reach != null ? formatNumber(itemData.reach) : null,
        Icon: FiUsers,
      },
      {
        label: t("work.details.creative.views"),
        value: itemData.views != null ? formatNumber(itemData.views) : null,
        Icon: FiEye,
      },
      {
        label: t("work.details.creative.engagementRate"),
        value:
          itemData.engagement_rate != null
            ? `${parseFloat(itemData.engagement_rate).toFixed(2)}%`
            : null,
        Icon: FiActivity,
      },
    ].filter((metric) => metric.value != null);
  }, [itemData, t]);

  const brandImages = useMemo(() => {
    if (!itemData) return [];
    return [
      itemData.brand_image_1,
      itemData.brand_image_2,
      itemData.brand_image_3,
    ].filter(Boolean);
  }, [itemData]);

  const narrativeBlocks = useMemo(() => {
    if (!itemData) return [];
    return [
      { key: "brief", label: t("work.details.creative.brief"), text: itemData.brief },
      { key: "strategy", label: t("work.details.creative.strategy"), text: itemData.strategy },
      { key: "approach", label: t("work.details.creative.approach"), text: itemData.approach },
    ].filter((b) => b.text && String(b.text).trim());
  }, [itemData, t]);

  const logoSrc = itemData?.logo || itemData?.main_image || null;

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const headerRef = useRef(null);
  const mediaRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    if (!itemData || !headerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { autoAlpha: 0, y: 60, scale: 0.95 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
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
          duration: 0.5,
          ease: "power3.out",
          delay: 0.15,
        });
      }

      if (mediaRef.current) {
        gsap.from(mediaRef.current, {
          autoAlpha: 0,
          y: 60,
          rotateX: 8,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mediaRef.current,
            start: "top 80%",
          },
        });
      }

      if (textRef.current) {
        const cards = textRef.current.querySelectorAll("[data-text-card]");
        gsap.from(cards, {
          autoAlpha: 0,
          y: 40,
          stagger: 0.1,
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
      data-nav-color="black"
      className={`creative-details min-h-screen ${
        isRtl ? "font-cairo" : "font-hero-light"
      }`}
    >
      <SEOHead
        title={
          title
            ? `${title} | ${t("work.details.creative.title")}`
            : t("work.details.creative.title")
        }
        description={objective ?? subtitle ?? ""}
        canonicalUrl={`/work/creative/${slug}`}
      />

      {creative.loading ? (
        prefersCaseStudy ? (
          <CaseStudy caseData={caseData} loading />
        ) : (
          <Loader />
        )
      ) : itemData && hasReels && caseData ? (
        <CaseStudy
          caseData={caseData}
          loading={false}
          brandImages={brandImages}
          brandTitle={title}
          showBrandImages={brandImages.length > 0}
        />
      ) : itemData ? (
        <div className="px-4 md:px-10 pb-10 pt-28">
          <div className="space-y-12">
            {/* Header Card */}
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
                  <div
                    className="flex flex-1 items-start gap-5"
                    data-header-child
                  >
                    {logoSrc && (
                      <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-[var(--foreground)]/10 bg-[#f7f9fa] p-2 shadow-lg">
                        <img
                          src={logoSrc}
                          alt={title}
                          width={80}
                          height={80}
                          className="h-full w-full object-contain"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="space-y-3" data-header-child>
                      <p className="text-xs uppercase tracking-[0.5em] text-[var(--foreground)]/60">
                        {t("work.details.creative.campaign")}
                      </p>
                      <h1
                        className={`text-[32px] md:text-[48px] font-bold leading-tight text-[var(--foreground)] ${
                          isRtl ? "font-cairo" : "font-antonio"
                        }`}
                      >
                        {title}
                      </h1>
                      {subtitle && (
                        <p className="max-w-2xl text-base text-[var(--foreground)]/70 md:text-lg">
                          {subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    data-header-child
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--foreground)]/10 bg-[var(--container-bg)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--foreground)] transition hover:bg-[var(--foreground)] hover:text-[var(--background)]"
                  >
                    <FiArrowLeft className="h-4 w-4" />
                    {t("work.details.creative.back")}
                  </button>
                </div>

                {metrics.length > 0 && (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {metrics.map((metric) => {
                      const MetricIcon = metric.Icon;
                      return (
                      <div
                        data-header-child
                        key={metric.label}
                        className="relative overflow-hidden rounded-2xl border border-[var(--foreground)]/10 bg-[var(--container-bg)]/50 p-4 backdrop-blur-sm shadow-inner"
                      >
                        <div className="relative flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--secondary)]/40 text-[var(--background)]">
                            <MetricIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-[0.4em] text-[var(--foreground)]/60">
                              {metric.label}
                            </p>
                            <p className="text-xl font-semibold text-[var(--foreground)]">
                              {metric.value}
                            </p>
                          </div>
                        </div>
                      </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Two Column Layout - Media and Text */}
            <div
              className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16"
              ref={textRef}
            >
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
                      className="w-full rounded-3xl shadow-xl h-[500px] md:h-[600px]"
                    >
                      {media.map((src, index) => (
                        <SwiperSlide key={`${src}-${index}`}>
                          <div className="group relative h-full w-full overflow-hidden rounded-[28px] border border-[var(--foreground)]/10 bg-[var(--container-bg)]/60 shadow-2xl">
                            <img
                              src={src}
                              alt={`${title} media ${index + 1}`}
                              width={600}
                              height={400}
                              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                              loading="lazy"
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
                              width={100}
                              height={70}
                              className="h-[70px] w-full rounded-2xl object-cover opacity-80 transition border border-[var(--foreground)]/10 bg-[var(--container-bg)]/70 hover:opacity-100"
                              loading="lazy"
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
                    {t("work.details.creative.noMedia")}
                  </div>
                )}
              </div>

              {/* Text Column */}
              <div className="flex flex-col gap-6">
                {objective && (
                  <div
                    data-text-card
                    className="relative h-fit overflow-hidden rounded-[28px] border border-[var(--foreground)]/10 bg-[var(--container-bg)] p-8 md:p-10 shadow-xl"
                  >
                    <div className="relative space-y-4">
                      <h2 className="text-xs font-semibold uppercase tracking-[0.6em] text-[var(--foreground)]/60">
                        {t("work.details.creative.objective")}
                      </h2>
                      <p className="text-base leading-relaxed md:text-lg text-[var(--foreground)]">
                        {objective}
                      </p>
                    </div>
                  </div>
                )}

                {narrativeBlocks.map(({ key, label, text }) => (
                  <div
                    key={key}
                    data-text-card
                    className="relative h-fit overflow-hidden rounded-[28px] border border-[var(--foreground)]/10 bg-[var(--container-bg)] p-8 md:p-10 shadow-xl"
                  >
                    <div className="relative space-y-4">
                      <h2 className="text-xs font-semibold uppercase tracking-[0.6em] text-[var(--foreground)]/60">
                        {label}
                      </h2>
                      <p className="text-base leading-relaxed md:text-lg text-[var(--foreground)]">
                        {String(text).trim()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center py-24">
          <div className="text-center text-sm text-red-400">
            {creative.error ?? t("work.details.creative.notAvailable")}
          </div>
        </div>
      )}

      {!creative.loading && <ContactUs />}
    </div>
  );
};

export default CreativeDetails;
