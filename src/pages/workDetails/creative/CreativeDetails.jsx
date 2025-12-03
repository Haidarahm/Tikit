import React, { useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useWorkItemDetailsStore } from "../../../store/work/workItemDetailsStore.js";
import { useI18nLanguage } from "../../../store/I18nLanguageContext.jsx";
import { useTheme } from "../../../store/ThemeContext.jsx";
import SEOHead from "../../../components/SEOHead.jsx";
import Footer from "../../../components/Footer.jsx";
import ContactUs from "../../Home/ContactUs.jsx";
import CreativeHero from "./components/CreativeHero.jsx";
import CreativeMediaShowcase from "./components/CreativeMediaShowcase.jsx";
import CreativeLoading from "./components/CreativeLoading.jsx";
import CreativeNoMedia from "./components/CreativeNoMedia.jsx";
import "./creative.css";

const CreativeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language, isRtl } = useI18nLanguage();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const creative = useWorkItemDetailsStore((state) => state.creative);
  const loadCreativeDetail = useWorkItemDetailsStore(
    (state) => state.loadCreativeDetail
  );
  const resetCategory = useWorkItemDetailsStore((state) => state.resetCategory);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  useEffect(() => {
    if (!id) return;

    loadCreativeDetail(id, { lang: language }).catch((error) => {
      console.error("Failed to load creative details", error);
    });

    return () => {
      resetCategory("creative");
    };
  }, [id, language, loadCreativeDetail, resetCategory]);

  const itemData = creative.item;
  const media = creative.media || [];

  const title = useMemo(() => {
    if (!itemData) return "";
    if (itemData?.title) return itemData.title;
  }, [itemData, language]);

  const mainImage = useMemo(() => {
    if (!itemData) return null;
    return itemData.main_image || null;
  }, [itemData]);

  const mediaImages = useMemo(() => {
    return Array.isArray(media) ? media : [];
  }, [media]);

  const brandImages = useMemo(() => {
    if (!itemData) return [];
    return [
      itemData.brand_image_1,
      itemData.brand_image_2,
      itemData.brand_image_3,
    ].filter(Boolean);
  }, [itemData]);

  return (
    <div
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
        description={title ?? ""}
        canonicalUrl={`/work/creative/${id}`}
      />

      {creative.loading ? (
        <CreativeLoading />
      ) : itemData ? (
        <div className="px-4 md:px-10 pb-20 pt-28">
          <div className="space-y-12">
            <CreativeHero
              mainImage={mainImage}
              title={title}
              logo={itemData.logo}
              theme={theme}
              isRtl={isRtl}
              t={t}
              onBack={() => navigate(-1)}
            />

            <CreativeMediaShowcase
              mediaImages={mediaImages}
              brandImages={brandImages}
              title={title}
              t={t}
            />

            {!mainImage &&
              mediaImages.length === 0 &&
              brandImages.length === 0 && (
                <CreativeNoMedia message={t("work.details.creative.noMedia")} />
              )}
          </div>
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center py-24">
          <div className="text-center text-sm text-red-400">
            {creative.error ?? t("work.details.creative.notAvailable")}
          </div>
        </div>
      )}

      <ContactUs />
      <Footer />
    </div>
  );
};

export default CreativeDetails;
