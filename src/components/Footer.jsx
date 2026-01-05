import React from "react";
import {
  FaInstagram,
  FaLinkedinIn,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTiktok,
} from "react-icons/fa";
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
    {
      href: "https://www.instagram.com/tikit.ae/",
      labelKey: "instagram",
      Icon: FaInstagram,
      comingSoon: false,
    },
    {
      href: "https://www.linkedin.com/company/tikitmarketingmanagement",
      labelKey: "linkedin",
      Icon: FaLinkedinIn,
      comingSoon: false,
    },
    {
      href: "#",
      labelKey: "tiktok",
      Icon: FaTiktok,
      comingSoon: true,
    },
  ];

  const quickLinks = [
    { to: "/about-us", label: t("footer.links.aboutUs") },
    { to: "/services", label: t("footer.links.services") },
    { to: "/work", label: t("footer.links.work") },
    { to: "/contact-us", label: t("footer.links.contact") },
    { to: "/influencer", label: t("nav.influencers", "Influencers") },
    { to: "/faq", label: t("footer.links.faq", "FAQ") },
  ];

  const serviceLinks = [
    { to: "/influencer-marketing-dubai", label: t("footer.services.influencerMarketing") },
    { to: "/services", label: t("footer.services.socialMedia") },
    { to: "/services", label: t("footer.services.branding") },
    { to: "/services", label: t("footer.services.production") },
  ];

  const locations = [
    { name: t("footer.locations.uae"), flag: "🇦🇪" },
    { name: t("footer.locations.uk"), flag: "🇬🇧" },
    { name: t("footer.locations.ksa"), flag: "🇸🇦" },
    { name: t("footer.locations.turkey"), flag: "🇹🇷" },
    { name: t("footer.locations.syria"), flag: "🇸🇾" },
  ];

  return (
    <footer
      className={`w-full md:min-h-[670px] bg-gradient-to-b from-transparent to-[var(--secondary)]/5 text-[var(--foreground)] ${
        isRtl ? "font-cairo" : "font-hero-light"
      } ${className}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Newsletter Section */}
      <div
        className={`w-full py-12 px-6 md:px-20 ${
          theme === "dark" ? "bg-[#101b22]" : "bg-[var(--secondary)]"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-start">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {t("newsletter.title", "Stay Updated")}
              </h2>
              <p className="text-white text-sm md:text-base">
                {t("newsletter.description", "Subscribe to our newsletter for the latest updates")}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="text"
                placeholder={t("newsletter.name")}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="px-4 py-3 rounded-full bg-white/10 border border-white/30 text-white placeholder:text-white/70 focus:outline-none focus:border-white/60 min-w-[150px]"
              />
              <input
                type="email"
                placeholder={t("newsletter.email")}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="px-4 py-3 rounded-full bg-white/10 border border-white/30 text-white placeholder:text-white/70 focus:outline-none focus:border-white/60 min-w-[200px]"
              />
              <button
                onClick={handleSubscribe}
                disabled={loading}
                className={`px-6 py-3 font-semibold rounded-full transition-all duration-300 whitespace-nowrap ${
                  theme === "dark"
                    ? "bg-[var(--secondary)] text-[var(--background)] hover:bg-[var(--secondary)]/90"
                    : "bg-white text-[var(--secondary)] hover:bg-white/90"
                } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {loading ? "..." : t("newsletter.subscribe")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="w-full px-6 md:px-20 pt-16 pb-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
            
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <Link to="/home" className="inline-block mb-6" aria-label="Go to Tikit homepage">
                <SVGComponent
                  color={theme === "dark" ? "#FFFFFF" : "#363737"}
                  logoJumpColor="#52C3C5"
                  className="h-12 md:h-14 w-auto"
                  aria-hidden="true"
                />
              </Link>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
                {t("footer.contactText")}
              </p>
              
              {/* Social Icons */}
              <div className="flex items-center gap-3">
                {social.map(({ href, labelKey, Icon, comingSoon }) => {
                  const base =
                    "group relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300";
                  const themeClasses =
                    theme === "dark"
                      ? "bg-white/5 text-white/70 hover:bg-[var(--secondary)] hover:text-black"
                      : "bg-[var(--secondary)]/10 text-[var(--secondary)] hover:bg-[var(--secondary)] hover:text-white";
                  
                  const content = comingSoon ? (
                    <div
                      className={`${base} ${themeClasses} cursor-not-allowed`}
                      onClick={(e) => e.preventDefault()}
                      role="button"
                      aria-label={`${t(`footer.social.${labelKey}`)} - ${t("footer.social.comingSoon")}`}
                      tabIndex={0}
                    >
                      <Icon
                        size={16}
                        className="group-hover:scale-110 transition-transform"
                        aria-hidden="true"
                      />
                      {/* Tooltip */}
                      <span className={`absolute bottom-full ${isRtl ? "right-1/2 translate-x-1/2" : "left-1/2 -translate-x-1/2"} mb-2 px-3 py-1.5 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 ease-in-out shadow-lg z-50`}>
                        {t("footer.social.comingSoon")}
                        <span className={`absolute top-full ${isRtl ? "right-1/2 translate-x-1/2" : "left-1/2 -translate-x-1/2"} border-4 border-transparent border-t-gray-900 dark:border-t-gray-800`}></span>
                      </span>
                    </div>
                  ) : (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={t(`footer.social.${labelKey}`)}
                      className={`${base} ${themeClasses}`}
                    >
                      <Icon
                        size={16}
                        className="group-hover:scale-110 transition-transform"
                        aria-hidden="true"
                      />
                    </a>
                  );
                  
                  return <React.Fragment key={labelKey}>{content}</React.Fragment>;
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h2 className="text-lg font-semibold text-[var(--foreground)] mb-6 relative">
                {t("nav.home", "Quick Links")}
                <span className={`absolute bottom-[-8px] ${isRtl ? "right-0" : "left-0"} w-8 h-0.5 bg-[var(--secondary)]`}></span>
              </h2>
              <nav className="flex flex-col gap-3">
                {quickLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-gray-600 dark:text-gray-300 hover:text-[var(--secondary)] hover:translate-x-1 transition-all duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Services */}
            <div>
              <h2 className="text-lg font-semibold text-[var(--foreground)] mb-6 relative">
                {t("nav.services", "Services")}
                <span className={`absolute bottom-[-8px] ${isRtl ? "right-0" : "left-0"} w-8 h-0.5 bg-[var(--secondary)]`}></span>
              </h2>
              <nav className="flex flex-col gap-3">
                {serviceLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.to}
                    className="text-gray-600 dark:text-gray-300 hover:text-[var(--secondary)] hover:translate-x-1 transition-all duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <Link
                to="/careers"
                className={`inline-flex items-center justify-center px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 mt-4 ${
                  theme === "dark"
                    ? "bg-[var(--secondary)] text-[var(--background)] hover:bg-[var(--secondary)]/90"
                    : "bg-[var(--secondary)] text-white hover:bg-[var(--secondary)]/90"
                }`}
              >
                Join Our Team
              </Link>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-lg font-semibold text-[var(--foreground)] mb-6 relative">
                {t("nav.contact", "Contact Us")}
                <span className={`absolute bottom-[-8px] ${isRtl ? "right-0" : "left-0"} w-8 h-0.5 bg-[var(--secondary)]`}></span>
              </h2>
              
              <div className="space-y-4">
                {/* Phone */}
                <a
                  href="tel:+97145774042"
                  className={`flex items-center gap-3 transition-colors group ${
                    theme === "dark"
                      ? "text-gray-200 hover:text-[var(--secondary)]"
                      : "text-gray-600 hover:text-[var(--secondary)]"
                  }`}
                  aria-label="Call us at +971 4 577 4042"
                >
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      theme === "dark"
                        ? "bg-white/10 text-white group-hover:bg-[var(--secondary)] group-hover:text-black"
                        : "bg-[var(--secondary)]/15 text-[var(--secondary)] group-hover:bg-[var(--secondary)] group-hover:text-white"
                    }`}
                  >
                    <FaPhone size={12} />
                  </span>
                  <span className="text-sm">+971 4 577 4042</span>
                </a>
                
                {/* Email */}
                <a
                  href="mailto:Holla@tikit.ae"
                  className={`flex items-center gap-3 transition-colors group ${
                    theme === "dark"
                      ? "text-gray-200 hover:text-[var(--secondary)]"
                      : "text-gray-600 hover:text-[var(--secondary)]"
                  }`}
                  aria-label="Email us at Holla@tikit.ae"
                >
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      theme === "dark"
                        ? "bg-white/10 text-white group-hover:bg-[var(--secondary)] group-hover:text-black"
                        : "bg-[var(--secondary)]/15 text-[var(--secondary)] group-hover:bg-[var(--secondary)] group-hover:text-white"
                    }`}
                  >
                    <FaEnvelope size={12} />
                  </span>
                  <span className="text-sm">Holla@tikit.ae</span>
                </a>
                
                {/* Address */}
                <div
                  className={`flex items-start gap-3 flex-shrink-0 ${
                    theme === "dark" ? "text-gray-200" : "text-gray-600"
                  }`}
                >
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      theme === "dark"
                        ? "bg-white/10 text-white"
                        : "bg-[var(--secondary)]/15 text-[var(--secondary)]"
                    }`}
                  >
                    <FaMapMarkerAlt size={12} />
                  </span>
                  <span className="text-sm">
                    The Burlington Tower, Marasi Drive, Dubai – Office 309
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Locations Bar */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {locations.map((location, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm">
                  <span className="text-lg">{location.flag}</span>
                  <span>{location.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 md:px-20 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-300 order-2 md:order-1">
              <Link to="/privacy-policy" className="hover:text-[var(--secondary)] transition-colors">
                {t("footer.terms.privacyPolicy")}
              </Link>
              <span className="hidden md:inline">•</span>
              <Link to="/terms-of-service" className="hover:text-[var(--secondary)] transition-colors">
                {t("footer.terms.termsOfService", "Terms of Service")}
              </Link>
              <span className="hidden md:inline">•</span>
              <Link to="/about-us" className="hover:text-[var(--secondary)] transition-colors">
                {t("footer.terms.aboutUs")}
              </Link>
              <span className="hidden md:inline">•</span>
              <button 
                className="hover:text-[var(--secondary)] transition-colors"
                aria-label={t("footer.terms.cookieSettings") || "Cookie settings"}
              >
                {t("footer.terms.cookieSettings")}
              </button>
            </div>
            
            {/* Copyright - Center */}
            <div className="text-center text-gray-600 dark:text-gray-300 text-sm order-1 md:order-2">
              {t("footer.copyright")}
            </div>
            
            {/* Back to top (optional) */}
            <div className="hidden md:block order-3">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-[var(--secondary)] transition-colors flex items-center gap-2"
                aria-label="Scroll to top of page"
              >
                Back to top ↑
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
