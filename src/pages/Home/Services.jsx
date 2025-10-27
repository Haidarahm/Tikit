import React, { useEffect, useState } from "react";
import FlowingMenu from "../../components/FlowingMenu";
import { useServicesStore } from "../../store/servicesStore";
import { useNavigate } from "react-router-dom";
import { useI18nLanguage } from "../../store/I18nLanguageContext.jsx";
import { useTranslation } from "react-i18next";

const Services = () => {
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

  const items = (services || []).map((s) => ({
    link: `service-details/${s?.id}`,
    text: s?.title,
    image: s?.media,
  }));

  // Show loading state during initial load
  if (!isClient || loading) {
    return (
      <div
        className={`section my-6 md:my-16 relative ${
          isRtl ? "font-cairo" : "font-hero-light"
        } flex flex-col mx-auto z-10 w-full justify-center`}
        dir={isRtl ? "rtl" : "ltr"}
      >
        <div className="headline mb-4 px-6 md:px-10 flex w-full justify-between items-center">
          <h1 className="text-[var(--foreground)] md:text-center font-bold text-[18px] md:text-[32px]">
            {t("home.services.title")}
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
      <div
        className={`section my-6 md:my-16 relative ${
          isRtl ? "font-cairo" : "font-hero-light"
        } flex flex-col mx-auto z-10 w-full justify-center`}
        dir={isRtl ? "rtl" : "ltr"}
      >
        <div className="headline mb-4 px-6 md:px-10 flex w-full justify-between items-center">
          <h1 className="text-[var(--foreground)] md:text-center font-bold text-[18px] md:text-[32px]">
            {t("home.services.title")}
          </h1>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="text-red-500">Error loading services: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`section my-6 md:my-16 relative ${
        isRtl ? "font-cairo" : "font-hero-light"
      } flex flex-col mx-auto    z-10 w-full justify-center`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="headline mb-4 px-6 md:px-10 flex w-full justify-between items-center">
        <h1 className=" text-[var(--foreground)] md:text-center font-bold text-[18px] md:text-[32px] ">
          {t("home.services.title")}
        </h1>
        <button
          onClick={() => {
            navigate("/services");
          }}
          className="
          bg-transparent

            hover:text-[var(--background)]

            hover:bg-[var(--secondary)]
            border-[var(--secondary)]
            text-[var(--secondary)] 
         transition duration-75 ease-in
         border
            px-2 h-8 md:h-10
            text-[11px]  rounded-full
             uppercase"
        >
          {t("home.services.explore")}
        </button>
      </div>

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
    </div>
  );
};

export default Services;
