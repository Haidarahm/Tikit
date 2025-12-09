import React, { useEffect, useState, useMemo, memo } from "react";
import FlowingMenu from "../../components/FlowingMenu";
import { useServicesStore } from "../../store/servicesStore";
import { useNavigate } from "react-router-dom";
import { useI18nLanguage } from "../../store/I18nLanguageContext.jsx";
import { useTranslation } from "react-i18next";

const Services = memo(() => {
  const navigate = useNavigate();
  const { services, loadServices, loading, error } = useServicesStore();
  const { language, isRtl } = useI18nLanguage();
  const { t } = useTranslation();
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side before making API calls
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      loadServices({ lang: language, page: 1, per_page: 4 });
    }
  }, [language, loadServices, isClient]);

  const items = useMemo(
    () =>
      (services || []).map((s) => ({
        link: `service-details/${s?.id}`,
        text: s?.title,
        image: s?.media,
      })),
    [services]
  );

  // Skeleton loader component
  const SkeletonLoader = () => {
    const skeletonItems = Array.from({ length: 4 }).map((_, index) => (
      <div
        key={index}
        className={`flex pb-4 justify-center text-[20px] mb-4 ${
          index < 3 ? "border-[var(--secondary)] border-b-2" : ""
        }`}
      >
        <div className="h-6 w-48 bg-gradient-to-r from-[var(--foreground)]/20 via-[var(--foreground)]/10 to-[var(--foreground)]/20 rounded animate-pulse" />
      </div>
    ));

    return (
      <>
        {/* Desktop skeleton */}
        <div
          className="hidden md:block"
          style={{ position: "relative", height: "100%" }}
        >
          <div className="w-full h-full overflow-hidden">
            <nav className="flex flex-col h-full m-0 p-0">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div
                  key={idx}
                  className="flex-1 relative overflow-hidden text-center shadow-[0_-1px_0_0_var(--secondary)] py-6 flex items-center justify-center"
                >
                  <div className="h-8 w-64 bg-gradient-to-r from-[var(--foreground)]/20 via-[var(--foreground)]/10 to-[var(--foreground)]/20 rounded animate-pulse" />
                </div>
              ))}
            </nav>
          </div>
        </div>
        {/* Mobile skeleton */}
        <div className="mobile-view flex flex-col md:hidden">
          {skeletonItems}
        </div>
      </>
    );
  };

  const renderContent = () => {
    // Show skeleton loader during initial load or if there's an error (retry silently)
    if (!isClient || loading || error) {
      return <SkeletonLoader />;
    }

    // Show content only if we have items
    if (!items || items.length === 0) {
      return <SkeletonLoader />;
    }

    // Main content
    return (
      <>
        <div
          className="hidden md:block"
          style={{ position: "relative", height: "100%" }}
        >
          <FlowingMenu items={items} />
        </div>
        <div className="mobile-view flex flex-col md:hidden">
          {items.map((item, index) => (
            <div
              key={index}
              className={`flex pb-4 justify-center text-[20px] mb-4 ${
                index < items.length - 1
                  ? "border-[var(--secondary)] border-b-2"
                  : ""
              }`}
              data-aos="flip-up"
              data-aos-delay={index * 150}
              data-aos-duration="600"
              data-aos-easing="ease-out-cubic"
              data-aos-once="false"
              data-aos-mirror="true"
            >
              <h2 className="text-lg font-semibold mt-2 text-[var(--secondary)]">
                {item.text}
              </h2>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div
      className={`section my-4 md:my-8 relative  md:min-h-[450px] 2xl:min-h-[490px] ${
        isRtl ? "font-cairo" : "font-hero-light"
      } flex flex-col mx-auto z-10 w-full justify-center`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="headline mb-4 px-6 md:px-10 flex w-full justify-between items-center">
        <h1 className="text-[var(--foreground)] font-antonio md:text-center font-bold text-[18px] md:text-[40px]">
          {t("home.services.title")}
        </h1>
        {!loading && !error && items && items.length > 0 && (
          <button
            onClick={() => navigate("/services")}
            className="bg-transparent hover:text-[var(--background)] shadow-lg shadow-[#52C3C5]/30 font-bold dark:shadow-[#000]/30 hover:bg-[var(--secondary)] border-[var(--secondary)] text-[var(--secondary)] transition duration-75 ease-in border px-2 h-8 md:h-10 text-[14px] rounded-full uppercase"
          >
            {t("home.services.explore")}
          </button>
        )}
      </div>
      {renderContent()}
    </div>
  );
});

Services.displayName = "Services";

export default Services;
