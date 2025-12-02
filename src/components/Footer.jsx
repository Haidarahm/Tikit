import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
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
    {
      href: "https://www.instagram.com/tikit.ae/",
      labelKey: "instagram",
      Icon: FaInstagram,
    },
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
        <Link to="/home" className="logo w-[70px] md:w-[220px] h-[30px] md:h-[80px] block">
          <SVGComponent
            color={theme === "dark" ? "#FFFFFF" : "#363737"}
            logoJumpColor={theme === "dark" ? "#52C3C5" : "#52C3C5"}
            className="p-1 md:p-2 h-full overflow-visible"
          />
        </Link>
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
        <div className="left-section gap-[20px] flex flex-col justify-around md:w-[60%]">
          <p className="text-[15px] md:text-start text-center md:text-[24px] text-gray-500 leading-[30px]">
            {t("footer.contactText")}
          </p>
          <h1
            style={{ fontFamily: isRtl ? "Cairo" : "Antonio" }}
            className="text-[24px]  md:text-[62px] text-center  md:text-start"
          >
            <span className="font-bold   tikit-gradient">
              {t("footer.contactTitle")}
            </span>{" "}
            {t("footer.contactSubtitle")}
          </h1>
          
          {/* Contact Info */}
          <div className="contact-info flex flex-col md:flex-row md:items-center gap-4 md:gap-8 text-center md:text-start">
            <a 
              href="tel:+971568881133" 
              className="text-[var(--secondary)] hover:underline text-lg md:text-xl font-medium"
            >
              +971 56 888 1133
            </a>
            <a 
              href="mailto:Hello@tikit.ae" 
              className="text-[var(--secondary)] hover:underline text-lg md:text-xl font-medium"
            >
              Hello@tikit.ae
            </a>
          </div>
          
          {/* Locations */}
          <div className="location flex flex-wrap font-light justify-center md:justify-start text-gray-500 gap-3 md:gap-6 text-[14px] md:text-[18px]">
            <p>{t("footer.locationDubai")}</p>
            <span className="hidden md:inline text-gray-400">•</span>
            <p>{t("footer.locationKSA", "Saudi Arabia - KSA")}</p>
            <span className="hidden md:inline text-gray-400">•</span>
            <p>{t("footer.locationTurkey", "Istanbul - Türkiye")}</p>
            <span className="hidden md:inline text-gray-400">•</span>
            <p>{t("footer.locationSyria")}</p>
          </div>
          
          <div className="copyright hidden md:block text-[16px] text-gray-500">
            {t("footer.copyright")}
          </div>
        </div>
        <div className="right-section md:mt-[30px] md:w-[35%] flex flex-col">
          <div className="items w-full justify-between flex font-light">
            {/* Navigation Links */}
            <nav aria-label="Footer navigation" className="items-1 md:text-start text-center flex flex-col gap-4">
              <h4 className="font-semibold text-[var(--foreground)] mb-2">{t("nav.home", "Quick Links")}</h4>
              <Link to="/about" className="text-gray-500 hover:text-[var(--secondary)] transition-colors">
                {t("footer.links.aboutUs")}
              </Link>
              <Link to="/services" className="text-gray-500 hover:text-[var(--secondary)] transition-colors">
                {t("footer.links.services")}
              </Link>
              <Link to="/work" className="text-gray-500 hover:text-[var(--secondary)] transition-colors">
                {t("footer.links.work")}
              </Link>
              <Link to="/contact" className="text-gray-500 hover:text-[var(--secondary)] transition-colors">
                {t("footer.links.contact")}
              </Link>
            </nav>
            
            {/* Services Links */}
            <nav aria-label="Services" className="items-2 md:text-start text-center flex flex-col gap-4">
              <h4 className="font-semibold text-[var(--foreground)] mb-2">{t("nav.services", "Services")}</h4>
              <Link to="/influencer-marketing-dubai" className="text-gray-500 hover:text-[var(--secondary)] transition-colors">
                {t("footer.services.influencerMarketing")}
              </Link>
              <Link to="/services" className="text-gray-500 hover:text-[var(--secondary)] transition-colors">
                {t("footer.services.socialMedia")}
              </Link>
              <Link to="/services" className="text-gray-500 hover:text-[var(--secondary)] transition-colors">
                {t("footer.services.branding")}
              </Link>
              <Link to="/services" className="text-gray-500 hover:text-[var(--secondary)] transition-colors">
                {t("footer.services.production")}
              </Link>
            </nav>
          </div>
          
          {/* Newsletter Subscription */}
          <div className="subscription w-full flex flex-col md:flex-row items-stretch md:items-end gap-4 mt-8">
            <FloatingInput
              id="contact-name"
              label={t("newsletter.name")}
              containerClassName="flex-1"
              inputProps={{
                value: formData.name,
                onChange: (e) =>
                  setFormData({ ...formData, name: e.target.value }),
              }}
            />
            <FloatingInput
              id="contact-email"
              label={t("newsletter.email")}
              containerClassName="flex-1"
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
                cursor-pointer border px-4 text-[14px] h-[40px] md:h-[30px] rounded-full whitespace-nowrap ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              {loading ? "..." : t("newsletter.subscribe")}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Copyright */}
      <div className="copyright md:hidden text-center text-[14px] text-gray-500 pb-4">
        {t("footer.copyright")}
      </div>
      
      {/* Terms & Policies */}
      <div className="terms pb-[30px] flex justify-center items-center border-t border-gray-800/20 pt-6">
        <ul className="flex flex-wrap justify-center gap-2 md:gap-4 text-[12px] md:text-[16px] text-gray-500">
          <li>
            <Link to="/privacy-policy" className="hover:text-[var(--secondary)] transition-colors">
              {t("footer.terms.privacyPolicy")}
            </Link>
          </li>
          <span className="point">•</span>
          <li>
            <Link to="/about" className="hover:text-[var(--secondary)] transition-colors">
              {t("footer.terms.aboutUs")}
            </Link>
          </li>
          <span className="point">•</span>
          <li>
            <button className="hover:text-[var(--secondary)] transition-colors">
              {t("footer.terms.cookieSettings")}
            </button>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
