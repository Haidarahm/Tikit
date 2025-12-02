import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
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
    { href: "https://www.instagram.com/tikit.ae/", labelKey: "instagram", Icon: FaInstagram },
    { href: "https://linkedin.com", labelKey: "linkedin", Icon: FaLinkedinIn },
    { href: "https://x.com", labelKey: "twitter", Icon: FaXTwitter },
  ];

  const quickLinks = [
    { to: "/about", label: t("footer.links.aboutUs") },
    { to: "/services", label: t("footer.links.services") },
    { to: "/work", label: t("footer.links.work") },
    { to: "/contact", label: t("footer.links.contact") },
    { to: "/influencer", label: t("nav.influencers", "Influencers") },
  ];

  const serviceLinks = [
    { to: "/influencer-marketing-dubai", label: t("footer.services.influencerMarketing") },
    { to: "/services", label: t("footer.services.socialMedia") },
    { to: "/services", label: t("footer.services.branding") },
    { to: "/services", label: t("footer.services.production") },
  ];

  const locations = [
    { name: t("footer.locationDubai"), flag: "🇦🇪" },
    { name: t("footer.locationKSA", "Saudi Arabia"), flag: "🇸🇦" },
    { name: t("footer.locationTurkey", "Istanbul, Türkiye"), flag: "🇹🇷" },
    { name: t("footer.locationSyria"), flag: "🇸🇾" },
  ];

  return (
    <footer
      data-scroll-section
      className={`w-full bg-gradient-to-b from-transparent to-[var(--secondary)]/5 text-[var(--foreground)] ${
        isRtl ? "font-cairo" : "font-hero-light"
      } ${className}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Newsletter Section */}
      <div className="w-full bg-[var(--secondary)] py-12 px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-start">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {t("newsletter.title", "Stay Updated")}
              </h3>
              <p className="text-white/80 text-sm md:text-base">
                {t("newsletter.description", "Subscribe to our newsletter for the latest updates")}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="text"
                placeholder={t("newsletter.name")}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:border-white/50 min-w-[150px]"
              />
              <input
                type="email"
                placeholder={t("newsletter.email")}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:border-white/50 min-w-[200px]"
              />
              <button
                onClick={handleSubscribe}
                disabled={loading}
                className={`px-6 py-3 bg-white text-[var(--secondary)] font-semibold rounded-full hover:bg-white/90 transition-all duration-300 whitespace-nowrap ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "..." : t("newsletter.subscribe")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="w-full px-6 md:px-20 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
            
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <Link to="/home" className="inline-block mb-6">
                <SVGComponent
                  color={theme === "dark" ? "#FFFFFF" : "#363737"}
                  logoJumpColor="#52C3C5"
                  className="h-12 md:h-14 w-auto"
                />
              </Link>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                {t("footer.contactText")}
              </p>
              
              {/* Social Icons */}
              <div className="flex items-center gap-3">
                {social.map(({ href, labelKey, Icon }) => (
                  <a
                    key={labelKey}
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={t(`footer.social.${labelKey}`)}
                    className="group w-10 h-10 rounded-full bg-[var(--secondary)]/10 flex items-center justify-center text-[var(--secondary)] hover:bg-[var(--secondary)] hover:text-white transition-all duration-300"
                  >
                    <Icon size={16} className="group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-[var(--foreground)] mb-6 relative">
                {t("nav.home", "Quick Links")}
                <span className="absolute bottom-[-8px] left-0 w-8 h-0.5 bg-[var(--secondary)]"></span>
              </h4>
              <nav className="flex flex-col gap-3">
                {quickLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-gray-500 hover:text-[var(--secondary)] hover:translate-x-1 transition-all duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold text-[var(--foreground)] mb-6 relative">
                {t("nav.services", "Services")}
                <span className="absolute bottom-[-8px] left-0 w-8 h-0.5 bg-[var(--secondary)]"></span>
              </h4>
              <nav className="flex flex-col gap-3">
                {serviceLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.to}
                    className="text-gray-500 hover:text-[var(--secondary)] hover:translate-x-1 transition-all duration-300 text-sm"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold text-[var(--foreground)] mb-6 relative">
                {t("nav.contact", "Contact Us")}
                <span className="absolute bottom-[-8px] left-0 w-8 h-0.5 bg-[var(--secondary)]"></span>
              </h4>
              
              <div className="space-y-4">
                {/* Phone */}
                <a 
                  href="tel:+971568881133" 
                  className="flex items-center gap-3 text-gray-500 hover:text-[var(--secondary)] transition-colors group"
                >
                  <span className="w-8 h-8 rounded-full bg-[var(--secondary)]/10 flex items-center justify-center text-[var(--secondary)] group-hover:bg-[var(--secondary)] group-hover:text-white transition-all">
                    <FaPhone size={12} />
                  </span>
                  <span className="text-sm">+971 56 888 1133</span>
                </a>
                
                {/* Email */}
                <a 
                  href="mailto:Hello@tikit.ae" 
                  className="flex items-center gap-3 text-gray-500 hover:text-[var(--secondary)] transition-colors group"
                >
                  <span className="w-8 h-8 rounded-full bg-[var(--secondary)]/10 flex items-center justify-center text-[var(--secondary)] group-hover:bg-[var(--secondary)] group-hover:text-white transition-all">
                    <FaEnvelope size={12} />
                  </span>
                  <span className="text-sm">Hello@tikit.ae</span>
                </a>
                
                {/* Address */}
                <div className="flex items-start gap-3 text-gray-500">
                  <span className="w-8 h-8 rounded-full bg-[var(--secondary)]/10 flex items-center justify-center text-[var(--secondary)] flex-shrink-0">
                    <FaMapMarkerAlt size={12} />
                  </span>
                  <span className="text-sm">Jumeirah 1, Dubai, UAE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Locations Bar */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {locations.map((location, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-500 text-sm">
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
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 order-2 md:order-1">
              <Link to="/privacy-policy" className="hover:text-[var(--secondary)] transition-colors">
                {t("footer.terms.privacyPolicy")}
              </Link>
              <span className="hidden md:inline">•</span>
              <Link to="/about" className="hover:text-[var(--secondary)] transition-colors">
                {t("footer.terms.aboutUs")}
              </Link>
              <span className="hidden md:inline">•</span>
              <button className="hover:text-[var(--secondary)] transition-colors">
                {t("footer.terms.cookieSettings")}
              </button>
            </div>
            
            {/* Copyright - Center */}
            <div className="text-center text-gray-500 text-sm order-1 md:order-2">
              {t("footer.copyright")}
            </div>
            
            {/* Back to top (optional) */}
            <div className="hidden md:block order-3">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-sm text-gray-500 hover:text-[var(--secondary)] transition-colors flex items-center gap-2"
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
