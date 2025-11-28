import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import FloatingInput from "./ui/FloatingInput";
import SVGComponent from "../assets/logo";
import { useTheme } from "../store/ThemeContext.jsx";
import { useSubscriptionStore } from "../store/subscriptionStore";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../store/I18nLanguageContext.jsx";

const Footer = ({ className }) => {
  const { theme } = useTheme();
  const { subscribe, loading } = useSubscriptionStore();
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleSubscribe = async () => {
    if (!formData.name || !formData.email) return;
    await subscribe(formData);
    setFormData({ name: "", email: "" });
  };

  const social = [
    { href: "https://facebook.com", labelKey: "facebook", Icon: FaFacebookF },
    { href: "https://instagram.com", labelKey: "instagram", Icon: FaInstagram },
    { href: "https://linkedin.com", labelKey: "linkedin", Icon: FaLinkedinIn },
    { href: "https://x.com", labelKey: "twitter", Icon: FaXTwitter },
  ];
  return (
    <footer
      data-scroll-section
      className={`w-full  px-[15px] min-h-[700px]  md:px-[80px]  flex flex-col text-[var(--foreground)] ${
        isRtl ? "font-cairo" : "font-hero-light"
      } ${className}`}
    >
      <div className="top-section  w-full mx-auto border-b-[1px] border-[#5D5D5D] py-8 flex items-center justify-between  md:gap-6">
        <div className="logo w-[70px] md:w-[220px] h-[30px] md:h-[80px]">
          <SVGComponent
            color={theme === "dark" ? "#FFFFFF" : "#363737"}
            logoJumpColor={theme === "dark" ? "#52C3C5" : "#52C3C5"}
            className="p-1 md:p-2 h-full overflow-visible"
          />
        </div>
        <nav aria-label="social" className="flex items-center gap-3">
          {social.map(({ href, labelKey, Icon }) => {
            const label = t(`footer.social.${labelKey}`);
            return (
              <a
                key={labelKey}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
                className="group inline-flex
               items-center
                justify-center
                 w-10 h-10 rounded-full
                  border border-[var(--base)]
                 bg-white text-[var(--base)]
                 hover:bg-[var(--base)]
                 hover:text-white 
                 transition-colors duration-200"
              >
                <Icon
                  size={18}
                  className="transition-transform duration-200 group-hover:scale-110"
                />
              </a>
            );
          })}
        </nav>
      </div>
      <div className="bottom-section justify-between w-full pt-[30px] md:pt-[80px] pb-[20px] md:pb-[60px]  flex flex-1 flex-col md:flex-row gap-8 md:gap-0">
        <div className="left-section gap-[20px] flex flex-col justify-around">
          <p className="text-[15px] md:text-start text-center md:text-[24px] text-gray-500 leading-[30px]">
            {t("footer.contactText")}
          </p>
          <h1 className="text-[24px] font-antonio md:text-[62px] text-center  md:text-start">
            <span className="font-bold  tikit-gradient">{t("footer.contactTitle")}</span>{" "}
            {t("footer.contactSubtitle")}
          </h1>
          <div className="location  flex font-light justify-around text-gray-500 md:gap-[40px] text-[20px]">
            <p>{t("footer.locationDubai")}</p>{" "}
            <p>{t("footer.locationLondon")}</p>
          </div>
          <div className="copyright hidden md:block text-[16px] text-gray-500">
            {t("footer.copyright")}
          </div>
        </div>
        <div className="right-section md:mt-[30px] md:w-[30%]  flex flex-col">
          <div className="items w-full justify-between flex font-light ">
            <ul className="items-1 md:text-start text-center flex flex-col gap-4">
              <li>{t("footer.links.aboutUs")}</li>
              <li>{t("footer.links.services")}</li>
              <li>{t("footer.links.work")}</li>
              <li>{t("footer.links.contact")}</li>
            </ul>
            <ul className="items-2 md:text-start text-center flex flex-col gap-4">
              <li>{t("footer.services.influencerMarketing")}</li>
              <li>{t("footer.services.socialMedia")}</li>
              <li>{t("footer.services.branding")}</li>
              <li>{t("footer.services.production")}</li>
            </ul>
          </div>
          <div className="subscription w-full flex items-end gap-4">
            <FloatingInput
              id="contact-name"
              label={t("newsletter.name")}
              containerClassName="mt-8 flex-1"
              inputProps={{
                value: formData.name,
                onChange: (e) =>
                  setFormData({ ...formData, name: e.target.value }),
              }}
            />
            <FloatingInput
              id="contact-email"
              label={t("newsletter.email")}
              containerClassName="mt-8 flex-1"
              inputProps={{
                value: formData.email,
                onChange: (e) =>
                  setFormData({ ...formData, email: e.target.value }),
              }}
            />
            <button
              onClick={handleSubscribe}
              disabled={loading}
              className={`bg-[var(--secondary)] 
            hover:text-[var(--secondary)]
            hover:bg-transparent
            border-[var(--secondary)]
            text-[var(--background)]
            transition 
              cursor-pointer border   px-2 text-[14px] h-[30px] rounded-full ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "..." : t("newsletter.subscribe")}
            </button>
          </div>
        </div>
      </div>
      <div className="terms pb-[30px] flex justify-center items-center">
        <ul className="flex gap-2  md:gap-4 text-[12px] md:text-[16px] text-gray-500">
          <li>{t("footer.terms.privacyPolicy")}</li>
          <div className="point">•</div>
          <li>{t("footer.terms.aboutUs")}</li>
          <div className="point">•</div>
          <li>{t("footer.terms.cookieSettings")}</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
