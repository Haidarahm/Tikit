import React, { useEffect, useState, useRef, memo } from "react";
import FloatingInput from "../../components/ui/FloatingInput";
import LogoLoop from "../../components/LogoLoop";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../store/I18nLanguageContext.jsx";
import { useContactStore } from "../../store/contactStore";
import { useToastStore } from "../../store/toastStore";
import { useTheme } from "../../store/ThemeContext";
import {
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaSnapchat,
  FaLink,
} from "react-icons/fa";
import TikitTitle2 from "../../components/TikitTitle2.jsx";
import ReactCountryFlag from "react-country-flag";
import CountryList from "country-list-with-dial-code-and-flag";

// Dynamic brand image loading to reduce initial bundle size
const getBrandImages = async (theme) => {
  if (theme === "light") {
    const images = await Promise.all([
      import("../../assets/brands/light/1.webp"),
      import("../../assets/brands/light/2.webp"),
      import("../../assets/brands/light/3.webp"),
      import("../../assets/brands/light/4.webp"),
      import("../../assets/brands/light/5.webp"),
      import("../../assets/brands/light/6.webp"),
      import("../../assets/brands/light/7.webp"),
      import("../../assets/brands/light/8.webp"),
      import("../../assets/brands/light/9.webp"),
      import("../../assets/brands/light/10.webp"),
      import("../../assets/brands/light/11.webp"),
      import("../../assets/brands/light/12.webp"),
      import("../../assets/brands/light/13.webp"),
      import("../../assets/brands/light/14.webp"),
      import("../../assets/brands/light/15.webp"),
      import("../../assets/brands/light/16.webp"),
      import("../../assets/brands/light/17.webp"),
      import("../../assets/brands/light/18.webp"),
      import("../../assets/brands/light/19.webp"),
      import("../../assets/brands/light/20.webp"),
      import("../../assets/brands/light/21.webp"),
      import("../../assets/brands/light/22.webp"),
      import("../../assets/brands/light/23.webp"),
      import("../../assets/brands/light/24.webp"),
      import("../../assets/brands/light/25.webp"),
    ]);
    return images.map(img => img.default);
  } else {
    const images = await Promise.all([
      import("../../assets/brands/dark/1.webp"),
      import("../../assets/brands/dark/2.webp"),
      import("../../assets/brands/dark/3.webp"),
      import("../../assets/brands/dark/4.webp"),
      import("../../assets/brands/dark/5.webp"),
      import("../../assets/brands/dark/6.webp"),
      import("../../assets/brands/dark/7.webp"),
      import("../../assets/brands/dark/8.webp"),
      import("../../assets/brands/dark/9.webp"),
      import("../../assets/brands/dark/10.webp"),
      import("../../assets/brands/dark/11.webp"),
      import("../../assets/brands/dark/12.webp"),
      import("../../assets/brands/dark/13.webp"),
      import("../../assets/brands/dark/14.webp"),
      import("../../assets/brands/dark/15.webp"),
      import("../../assets/brands/dark/16.webp"),
      import("../../assets/brands/dark/17.webp"),
      import("../../assets/brands/dark/18.webp"),
      import("../../assets/brands/dark/19.webp"),
      import("../../assets/brands/dark/20.webp"),
      import("../../assets/brands/dark/21.webp"),
      import("../../assets/brands/dark/22.webp"),
      import("../../assets/brands/dark/23.webp"),
      import("../../assets/brands/dark/24.webp"),
      import("../../assets/brands/dark/25.webp"),
    ]);
    return images.map(img => img.default);
  }
};

// Social media platforms with icons
const SOCIAL_PLATFORMS = [
  { value: "instagram", label: "Instagram", icon: FaInstagram },
  { value: "tiktok", label: "TikTok", icon: FaTiktok },
  { value: "youtube", label: "YouTube", icon: FaYoutube },
  { value: "facebook", label: "Facebook", icon: FaFacebook },
  { value: "twitter", label: "Twitter", icon: FaTwitter },
  { value: "linkedin", label: "LinkedIn", icon: FaLinkedin },
  { value: "snapchat", label: "Snapchat", icon: FaSnapchat },
  { value: "other", label: "Other", icon: FaLink },
];

// Get all countries from the library
const ALL_COUNTRIES = CountryList.getAll();

// Country Code Dropdown with flags
const CountryCodeDropdown = ({ value, onChange, isRtl, t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter countries based on search term
  const filteredCountries = searchTerm
    ? ALL_COUNTRIES.filter(
        (c) =>
          c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.dial_code.includes(searchTerm)
      )
    : ALL_COUNTRIES;

  const selectedCountry = ALL_COUNTRIES.find((c) => c.dial_code === value) || ALL_COUNTRIES[0];

  return (
    <div className="relative" ref={dropdownRef}>
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-2 py-2 bg-transparent border border-[#363737] dark:border-white/30 rounded-lg text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none flex items-center gap-2 ${
          isRtl ? "text-right flex-row-reverse" : "text-left"
        } ${isOpen ? "border-[var(--secondary)]" : ""}`}
      >
        <ReactCountryFlag
          countryCode={selectedCountry.code}
          svg
          style={{ width: "1.4em", height: "1.4em" }}
        />
        <span className="flex-1 truncate text-sm font-medium">
          {selectedCountry.dial_code}
        </span>
        <svg
          className={`w-3 h-3 text-[var(--foreground)] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div 
          className="absolute z-50 overflow-hidden mt-1 w-64 bg-[var(--background)] border border-[#363737] dark:border-white/30 rounded-lg shadow-xl"
          style={{ maxHeight: "300px" }}
        >
          {/* Search input */}
          <div className="p-2 border-b border-[#363737] dark:border-white/20 sticky top-0 bg-[var(--background)] z-10">
            <input
              id="contact-country-search"
              name="contact_country_search"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-1.5 bg-transparent border border-[#363737] dark:border-white/30 rounded-md text-[var(--foreground)] text-sm focus:outline-none focus:border-[var(--secondary)]"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          
          {/* Scrollable list */}
          <div 
            ref={listRef}
            data-lenis-prevent
            className="overflow-y-auto overscroll-contain"
            style={{ maxHeight: "240px" }}
            onWheelCapture={(e) => {
              // Ensure the wheel scrolls this list instead of the page
              const target = e.currentTarget;
              const atTop = target.scrollTop === 0 && e.deltaY < 0;
              const atBottom =
                target.scrollTop + target.clientHeight >= target.scrollHeight &&
                e.deltaY > 0;

              if (!atTop && !atBottom) {
                e.stopPropagation();
              }
            }}
          >
            {filteredCountries.length === 0 ? (
              <div className="px-3 py-4 text-center text-sm text-[var(--foreground)]/60">
                No countries found
              </div>
            ) : (
              filteredCountries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => {
                    onChange(country.dial_code);
                    setIsOpen(false);
                    setSearchTerm("");
                  }}
                  className={`w-full px-3 py-2.5 flex items-center gap-3 hover:bg-[var(--secondary)]/10 transition-colors ${
                    value === country.dial_code ? "bg-[var(--secondary)]/20" : ""
                  } ${isRtl ? "flex-row-reverse text-right" : "text-left"}`}
                >
                  <ReactCountryFlag
                    countryCode={country.code}
                    svg
                    style={{ width: "1.5em", height: "1.5em" }}
                  />
                  <span className="text-sm text-[var(--foreground)] truncate flex-1">{country.name}</span>
                  <span className="text-xs text-[var(--foreground)]/60 flex-shrink-0">
                    {country.dial_code}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Social Platform Dropdown
const SocialPlatformDropdown = ({ value, onChange, isRtl, t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = SOCIAL_PLATFORMS.find((opt) => opt.value === value);
  const SelectedIcon = selectedOption?.icon || FaLink;

  const getTranslatedLabel = (platformValue) => {
    return (
      t(`contact.action.socialPlatforms.${platformValue}`) ||
      selectedOption?.label
    );
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-3 py-2 bg-transparent border border-[#363737] dark:border-white/30 rounded-lg text-[var(--foreground)] focus:border-[var(--foreground)] focus:outline-none social-select flex items-center gap-2 ${
          isRtl ? "text-right" : "text-left"
        } ${isOpen ? "border-[var(--secondary)]" : ""}`}
      >
        <SelectedIcon
          className="text-[var(--foreground)] opacity-70 flex-shrink-0"
          size={18}
        />
        <span className="flex-1 truncate text-sm">
          {getTranslatedLabel(value) || t("contact.action.selectPlatform")}
        </span>
        <svg
          className={`w-3 h-3 text-[var(--foreground)] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="custom-dropdown-menu">
          {SOCIAL_PLATFORMS.map((option) => {
            const OptionIcon = option.icon;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`custom-dropdown-item ${
                  value === option.value ? "selected" : ""
                }`}
              >
                <OptionIcon
                  className="text-[var(--foreground)] flex-shrink-0"
                  size={18}
                />
                <span className="truncate text-sm">
                  {getTranslatedLabel(option.value)}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

const SocialLinkInput = ({
  index,
  platform,
  link,
  onPlatformChange,
  onLinkChange,
  onRemove,
  canRemove,
  isRtl,
  removingIndex,
  t,
}) => {
  const inputId = `social-link-${index}`;

  return (
    <div
      className={`col-span-1 flex gap-2 social-link-container ${
        removingIndex === index ? "removing" : ""
      }`}
    >
      <div className="relative flex-none w-32">
        <SocialPlatformDropdown
          value={platform}
          onChange={(value) => onPlatformChange(index, value)}
          isRtl={isRtl}
          t={t}
        />
      </div>
      <div className="relative flex-1">
        <input
          type="url"
          id={inputId}
          name={`social_link_${index}`}
          value={link}
          onChange={(e) => onLinkChange(index, e.target.value)}
          className={`w-full px-3 py-2 bg-transparent border border-[#363737] dark:border-white/30 rounded-lg text-[var(--foreground)] text-sm placeholder-transparent focus:border-[var(--foreground)] focus:outline-none peer social-link-input ${
            isRtl ? "text-right" : ""
          }`}
          placeholder="Enter link"
        />
        <label
          htmlFor={inputId}
          className={`absolute ${
            isRtl ? "right-3" : "left-3"
          } -top-2.5 bg-[#F5F7FB] dark:bg-[#000] px-1 text-[var(--foreground)] text-xs transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-xs`}
        >
          {t("contact.action.form.link")}
        </label>
      </div>
      {canRemove && (
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="flex-none w-8 h-8 flex items-center justify-center rounded-lg border border-red-500/50 text-red-500 hover:bg-red-500/10 social-remove-btn text-lg"
        >
          ×
        </button>
      )}
    </div>
  );
};

const ContactUs = memo(({ className = "" }) => {
  const [isSecondSlide, setIsSecondSlide] = useState(false);
  const [socialLinks, setSocialLinks] = useState([
    { platform: "instagram", link: "" },
  ]);
  const [removingIndex, setRemovingIndex] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [phoneCountryCode, setPhoneCountryCode] = useState("+971");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const { sendContactEmail, sendContactAsInfluencer, loading } = useContactStore();

  const handleSlideClick = (slideNumber) => {
    setIsSecondSlide(slideNumber === 2);
  };

  const addSocialLink = () => {
    setSocialLinks([...socialLinks, { platform: "instagram", link: "" }]);
  };

  const removeSocialLink = (index) => {
    if (socialLinks.length > 1) {
      setRemovingIndex(index);
      setTimeout(() => {
        setSocialLinks(socialLinks.filter((_, i) => i !== index));
        setRemovingIndex(null);
      }, 300);
    }
  };

  const updateSocialPlatform = (index, platform) => {
    const updated = [...socialLinks];
    updated[index].platform = platform;
    setSocialLinks(updated);
  };

  const updateSocialLink = (index, link) => {
    const updated = [...socialLinks];
    updated[index].link = link;
    setSocialLinks(updated);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    const cleanedLocalPhone = formData.phone.replace(/\s+/g, "");
    const combinedPhone =
      cleanedLocalPhone && phoneCountryCode
        ? `${phoneCountryCode}${cleanedLocalPhone}`
        : "";

    // Basic validation
    if (!formData.email || !formData.email.trim()) {
      useToastStore
        .getState()
        .addToast("Please enter your email address", "error");
      return;
    }

    if (isSecondSlide) {
      // Format data for influencer registration
      const influencerData = {
        name: formData.name,
        email: formData.email,
        phone: combinedPhone,
        subject: formData.subject || "Influencer Registration",
        message: formData.message || "Influencer registration request",
        social_links: socialLinks
          .filter((social) => social.link && social.link.trim())
          .map((social) => ({
            link: social.link,
            link_type: social.platform,
          })),
      };

      const success = await sendContactAsInfluencer(influencerData);
      if (success) {
        // Reset form on success
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setSocialLinks([{ platform: "instagram", link: "" }]);
        setShowMessage(false);
      }
    } else {
      // Regular contact form
      const emailData = {
        name: formData.name,
        email: formData.email,
        phone: combinedPhone,
        subject: formData.subject || "Contact Form",
        message: formData.message,
      };

      const success = await sendContactEmail(emailData);
      if (success) {
        // Reset form on success
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setSocialLinks([{ platform: "instagram", link: "" }]);
        setPhoneCountryCode("+971");
      }
    }
  };

  const { theme } = useTheme();
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();

  const [brandImages, setBrandImages] = React.useState([]);
  const [imagesLoading, setImagesLoading] = React.useState(true);

  // Load brand images dynamically when component mounts or theme changes
  React.useEffect(() => {
    let isMounted = true;
    setImagesLoading(true);
    
    getBrandImages(theme).then(images => {
      if (isMounted) {
        setBrandImages(images);
        setImagesLoading(false);
      }
    });

    return () => { isMounted = false; };
  }, [theme]);

  const imageLogos = React.useMemo(() => {
    if (imagesLoading || brandImages.length === 0) {
      // Return placeholder logos while loading
      return Array.from({ length: 25 }, (_, index) => ({
        src: '',
        alt: `Brand ${index + 1}`,
        isLoading: true,
      }));
    }
    
    return brandImages.map((src, index) => ({
      src,
      alt: `Brand ${index + 1}`,
    }));
  }, [brandImages, imagesLoading]);

  return (
    <div
      className={`relative my-5 md:my-10 gap-3.5 overflow-hidden text-[var(--foreground)] ${
        isRtl ? "font-cairo" : "font-hero-light"
      } rounded-[25px] flex flex-col mx-auto py-[40px] md:py-[60px] px-[40px] md:px-[50px] w-[95vw] dark:bg-black ${className}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="email w-full flex flex-col md:flex-row h-2/3 justify-between items-center md:items-stretch relative z-10">
        <div className="texts flex flex-col relative">
          <h3 className="subtitle text-center md:text-start text-[16px] md:text-[50px]">
            {t("home.contactUs.subtitle")}
          </h3>

          <p className="description hidden md:block text-[16px] md:text-[24px] font-light w-full">
            {t("home.contactUs.description")} <br className="hidden md:block" />{" "}
            {t("home.contactUs.description2")}
          </p>
        </div>
        <div className="action w-full md:w-[45%] gap-[20px] md:gap-4 flex-col flex justify-between">
          <div className="title text-center font-light md:font-medium md:text-start text-[20px] md:text-[24px]">
            {t("home.contactUs.helpText")}
          </div>
          <div
            className={`swiper-wrapper-contact shadow-xl shadow-[#000]/15 justify-center items-center w-full border flex relative border-[var(--secondary)] h-[50px] rounded-full`}
          >
            <div
              className={`contact-swiper-wrapper relative h-[calc(100%-3px)] w-[calc(100%-3px)] flex items-center justify-center ${
                isRtl ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`move-item absolute w-1/2 h-full bg-[var(--secondary)] rounded-full transition-all duration-300 ease-in-out ${
                  isSecondSlide
                    ? isRtl
                      ? "right-0"
                      : "left-1/2"
                    : isRtl
                    ? "right-1/2"
                    : "left-0"
                }`}
              />
              <div
                className={`swiper-slide-contact w-1/2 flex justify-center items-center relative z-10 cursor-pointer ${
                  !isSecondSlide
                    ? "text-[var(--background)]"
                    : "text-[var(--foreground)] "
                }`}
                onClick={() => handleSlideClick(1)}
              >
                {t("home.contactUs.client")}
              </div>
              <div
                className={`swiper-slide-contact w-1/2 flex justify-center items-center relative z-10 cursor-pointer ${
                  isSecondSlide
                    ? "text-[var(--background)]"
                    : "text-[var(--foreground)] "
                }`}
                onClick={() => handleSlideClick(2)}
              >
                {t("home.contactUs.influencer")}
              </div>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="inputs-wrapper flex flex-col gap-4 mt-3"
          >
            <div className="inputs flex flex-col md:flex-row justify-between gap-3 md:gap-[20px]">
              <FloatingInput
                id="name"
                label={t("home.contactUs.name")}
                containerClassName="flex-1"
                inputProps={{
                  value: formData.name,
                  onChange: (e) => handleInputChange("name", e.target.value),
                }}
              />
              <FloatingInput
                id="email"
                label={t("home.contactUs.email")}
                containerClassName="flex-1"
                inputProps={{
                  value: formData.email,
                  onChange: (e) => handleInputChange("email", e.target.value),
                  type: "email",
                }}
              />
            </div>

            <div className="w-full flex flex-col sm:flex-row gap-3">
              <div className="w-full sm:w-32">
                <CountryCodeDropdown
                  value={phoneCountryCode}
                  onChange={setPhoneCountryCode}
                  isRtl={isRtl}
                  t={t}
                />
              </div>
              <FloatingInput
                id="phone"
                label={t("contact.action.form.phone")}
                type="tel"
                containerClassName="flex-1"
                inputProps={{
                  value: formData.phone,
                  onChange: (e) => handleInputChange("phone", e.target.value),
                }}
              />
            </div>

            {!isSecondSlide ? (
              <>
                <FloatingInput
                  id="subject"
                  label={t("contact.action.form.subject")}
                  containerClassName="w-full"
                  inputProps={{
                    value: formData.subject,
                    onChange: (e) =>
                      handleInputChange("subject", e.target.value),
                  }}
                />
                <div className="relative">
                  <textarea
                    id="message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange("message", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-transparent border border-[var(--foreground)]/40 rounded-lg text-[var(--foreground)] placeholder-transparent focus:border-[var(--foreground)] focus:outline-none peer resize-y min-h-[80px] text-sm"
                    placeholder={t("contact.action.form.message")}
                  />
                  <label
                    htmlFor="message"
                    className={`absolute ${
                      isRtl ? "right-3" : "left-3"
                    } -top-2.5 bg-[#F5F7FB] dark:bg-[#000] px-1 text-[var(--foreground)] text-xs transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-xs`}
                  >
                    {t("contact.action.form.message")}
                  </label>
                </div>
              </>
            ) : (
              <>
                {socialLinks.map((social, index) => (
                  <SocialLinkInput
                    key={index}
                    index={index}
                    platform={social.platform}
                    link={social.link}
                    onPlatformChange={updateSocialPlatform}
                    onLinkChange={updateSocialLink}
                    onRemove={removeSocialLink}
                    canRemove={socialLinks.length > 1}
                    isRtl={isRtl}
                    removingIndex={removingIndex}
                    t={t}
                  />
                ))}

                <button
                  type="button"
                  onClick={addSocialLink}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-transparent border border-[var(--secondary)] dark:border-white/30 rounded-lg text-[var(--secondary)] hover:bg-[var(--secondary)]/10 social-add-btn text-sm"
                >
                  <span className="text-lg font-bold">+</span>
                  <span>
                    {t("contact.action.addSocialLink") || "Add Social Link"}
                  </span>
                </button>

                {/* Message Toggle Button */}
                <button
                  type="button"
                  onClick={() => setShowMessage(!showMessage)}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-transparent border border-[var(--foreground)]/40 dark:border-white/30 rounded-lg text-[var(--foreground)] hover:bg-[var(--foreground)]/10 text-sm"
                >
                  <span className="text-lg font-bold">{showMessage ? "−" : "+"}</span>
                  <span>
                    {showMessage
                      ? t("contact.action.hideMessage")
                      : t("contact.action.addMessage")}
                  </span>
                </button>

                {/* Message Textarea */}
                {showMessage && (
                  <div className="relative w-full">
                    <textarea
                      id="influencer-message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-transparent border border-[var(--foreground)]/40 rounded-lg text-[var(--foreground)] placeholder-transparent focus:border-[var(--foreground)] focus:outline-none peer resize-y min-h-[80px] text-sm"
                      placeholder={t("contact.action.form.message")}
                    />
                    <label
                      htmlFor="influencer-message"
                      className={`absolute ${
                        isRtl ? "right-3" : "left-3"
                      } -top-2.5 bg-[#F5F7FB] dark:bg-[#000] px-1 text-[var(--foreground)] text-xs transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-2 peer-focus:-top-2.5 peer-focus:text-xs`}
                    >
                      {t("contact.action.form.message")}
                    </label>
                  </div>
                )}
              </>
            )}
          </form>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className={`px-5 shadow-xl shadow-[#000]/15 h-12 md:h-14 cursor-pointer relative mt-3 rounded-full group font-medium bg-transparent text-[var(--secondary)] border border-[var(--secondary)] flex items-center justify-center transition-all hover:scale-105 overflow-hidden ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out rounded-full transform translate-y-0 bg-[var(--secondary)] group-hover:h-full opacity-90"></span>
            <span className="relative uppercase group-hover:text-[var(--background)] text-sm md:text-base font-semibold flex items-center gap-2">
              {loading && (
                <svg
                  className="animate-spin h-4 w-4 md:h-5 md:w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              {t("home.contactUs.button")}
            </span>
          </button>
        </div>
      </div>
      <div className="brands flex-1 w-full relative z-10">
        <div className="flex w-full justify-between items-center gap-4 mb-4">
          <div className="h-[1px] w-[42%] bg-gray-400"></div>

          <div className="title font-light text-[14px] text-center">
            {t("home.contactUs.brandsTrust")}
          </div>

          <div className="h-[1px] w-[42%] bg-gray-400"></div>
        </div>
        <div
          style={{
            height: "120px",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
          }}
        >
          <LogoLoop
            logos={imageLogos}
            speed={50}
            direction={isRtl ? "right" : "left"}
            logoHeight={100}
            gap={100}
            pauseOnHover
            scaleOnHover
            className={isRtl ? "flex-row-reverse" : ""}
            fadeOut
            fadeOutColor={theme === "light" ? "#F5F7FB" : "#000"}
            ariaLabel="Brand partners"
          />
        </div>
      </div>
    </div>
  );
});

ContactUs.displayName = "ContactUs";

export default ContactUs;