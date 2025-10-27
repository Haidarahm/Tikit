import React, { useEffect, useMemo, useState } from "react";
import StickyPinnedSection from "../../components/ui/StickyPinnedSection";
import { useWorkStore } from "../../store/workStore";
import { useI18nLanguage } from "../../store/I18nLanguageContext.jsx";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function WorkSection() {
  const {
    works,
    loadWorks,
    loading,
    page,
    pageSize,
    setPage,
    nextPage,
    prevPage,
    getPagedWorks,
    error,
  } = useWorkStore();
  const { language, isRtl } = useI18nLanguage();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side before making API calls
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      loadWorks({ lang: language, page, per_page: pageSize });
    }
  }, [loadWorks, page, pageSize, language, isClient]);

  const items = useMemo(() => {
    if (!isClient) return []; // Return empty array during SSR

    const source = getPagedWorks ? getPagedWorks() : (works || []).slice(0, 3);
    return (source || []).map((w) => ({
      id: w.id,
      title: w.title ?? "",
      subtitle: w.subtitle ?? "",
      description: w.description ?? "",
      media: w.media ? (
        <img
          src={w.media}
          alt={w.title ?? "work"}
          className="h-full rounded-[20px] w-full object-cover"
          loading="lazy"
        />
      ) : null,
    }));
  }, [works, getPagedWorks, isClient]);

  // Show loading state during initial load
  if (!isClient || loading) {
    return (
      <div className="section work-section-container my-6 md:my-16 relative flex flex-col mx-auto z-10 w-full justify-center">
        <div className="headline mb-4 px-6 md:px-10 flex w-full justify-between items-center">
          <h1 className="text-[var(--foreground)] md:text-center font-bold text-[18px] md:text-[32px]">
            {t("home.work.title")}
          </h1>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="text-[var(--foreground)]">Loading...</div>
        </div>
      </div>
    );
  }

  // Show error state if API call failed
  if (error) {
    return (
      <div className="section my-6 md:my-16 relative flex flex-col mx-auto z-10 w-full justify-center">
        <div className="headline mb-4 px-6 md:px-10 flex w-full justify-between items-center">
          <h1 className="text-[var(--foreground)] md:text-center font-bold text-[18px] md:text-[32px]">
            {t("home.work.title")}
          </h1>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="text-red-500">Error loading works: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <>
      {items && items.length > 0 && (
        <div
          className={`relative hidden md:block z-10 w-full overflow-visible text-[var(--foreground)] ${
            isRtl ? "font-cairo" : "font-hero-light"
          }`}
          dir={isRtl ? "rtl" : "ltr"}
        >
          <StickyPinnedSection items={items} heightPerItemVh={100} />
        </div>
      )}
      <div
        className={`mobile-view gap-[30px] md:hidden relative text-[var(--foreground)] flex flex-col w-full px-[20px] ${
          isRtl ? "font-cairo" : "font-hero-light"
        }`}
        dir={isRtl ? "rtl" : "ltr"}
      >
        <div className="main-content w-full flex flex-col gap-[20px] mt-16">
          {(items || []).map((item, index) => (
            <div
              key={(item.title || "") + String(index)}
              className="element-wrapper flex flex-col w-full gap-[30px]"
            >
              <div className="text flex flex-col gap-[10px]">
                <div className="flex items-center justify-between">
                  {item.title && (
                    <h2 className="text-[20px] font-bold">{item.title}</h2>
                  )}
                  <button
                    className="rounded-full border font-light 
                    border-[var(--secondary)] text-[var(--secondary)] text-[11px] uppercase 
                    px-4 py-1 
                    transition-colors"
                    onClick={() =>
                      navigate(`/details/${encodeURIComponent(item.id)}`)
                    }
                  >
                    {t("home.work.viewWork")}
                  </button>
                </div>
                {item.subtitle ? (
                  <div className="subtitle text-[16px] opacity-80">
                    {item.subtitle}
                  </div>
                ) : null}
                {item.description ? (
                  <div className=" description text-[14px] opacity-80">
                    {item.description}
                  </div>
                ) : null}
              </div>
              {item.media ? (
                <div className="image relative w-full h-[250px] rounded-[20px] overflow-hidden">
                  {item.media}
                </div>
              ) : null}
            </div>
          ))}
          {(!items || items.length === 0) && !loading ? (
            <div className="text-center text-sm opacity-70">
              {t("home.work.noWorks")}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
