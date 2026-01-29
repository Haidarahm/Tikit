import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../store/I18nLanguageContext";
import {
  FaInstagram,
  FaYoutube,
  FaFacebookF,
  FaSnapchatGhost,
  FaLinkedinIn,
  FaPinterestP,
  FaLink,
  FaDollarSign,
  FaPlus,
  FaMinus,
  FaTimes,
  FaChevronDown,
  FaImage,
  FaVideo,
  FaFilm,
  FaAd,
  FaRegNewspaper,
} from "react-icons/fa";
import { FaXTwitter, FaTiktok } from "react-icons/fa6";

const SOCIAL_PLATFORMS = [
  {
    value: "instagram",
    label: "Instagram",
    icon: FaInstagram,
    color: "#E4405F",
  },
  { value: "tiktok", label: "TikTok", icon: FaTiktok, color: "#000000" },
  { value: "youtube", label: "YouTube", icon: FaYoutube, color: "#FF0000" },
  { value: "facebook", label: "Facebook", icon: FaFacebookF, color: "#1877F2" },
  {
    value: "twitter",
    label: "Twitter / X",
    icon: FaXTwitter,
    color: "#000000",
  },
  {
    value: "snapchat",
    label: "Snapchat",
    icon: FaSnapchatGhost,
    color: "#FFFC00",
  },
  {
    value: "linkedin",
    label: "LinkedIn",
    icon: FaLinkedinIn,
    color: "#0A66C2",
  },
];

const PRICE_TYPES = [
  { value: "post", label: "Post", icon: FaImage },
  { value: "story", label: "Story", icon: FaRegNewspaper },
  { value: "reel", label: "Reel", icon: FaFilm },
  { value: "video", label: "Video", icon: FaVideo },
  { value: "sponsored", label: "Sponsored", icon: FaAd },
];

const SocialLinksInput = ({
  label,
  socialLinks = [],
  onChange,
  name = "socialLinks",
  className = "",
}) => {
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();

  // Get translated labels
  const defaultLabel = t(
    "influencerRegister.fields.socialLinks",
    "Social Links"
  );
  const displayLabel = label || defaultLabel;

  const addSocialLink = () => {
    const newLink = {
      platform: "",
      link: "",
      prices: [{ type: "", price: "" }],
    };
    onChange([...socialLinks, newLink]);
  };

  const removeSocialLink = (index) => {
    onChange(socialLinks.filter((_, i) => i !== index));
  };

  const updateSocialLink = (index, field, value) => {
    const updated = [...socialLinks];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const addPrice = (linkIndex) => {
    const updated = [...socialLinks];
    updated[linkIndex].prices = [
      ...updated[linkIndex].prices,
      { type: "", price: "" },
    ];
    onChange(updated);
  };

  const removePrice = (linkIndex, priceIndex) => {
    const updated = [...socialLinks];
    updated[linkIndex].prices = updated[linkIndex].prices.filter(
      (_, i) => i !== priceIndex
    );
    onChange(updated);
  };

  const updatePrice = (linkIndex, priceIndex, field, value) => {
    const updated = [...socialLinks];
    updated[linkIndex].prices[priceIndex] = {
      ...updated[linkIndex].prices[priceIndex],
      [field]: value,
    };
    onChange(updated);
  };

  const getPlatform = (platformValue) => {
    return SOCIAL_PLATFORMS.find((p) => p.value === platformValue);
  };

  const getPriceType = (typeValue) => {
    return PRICE_TYPES.find((p) => p.value === typeValue);
  };

  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      {/* Label */}
      {displayLabel && (
        <label
          dir={isRtl ? "rtl" : "ltr"}
          className="text-[var(--foreground)] text-sm md:text-base font-medium"
        >
          {displayLabel}
        </label>
      )}

      {/* Social Links Container */}
      <div className="flex flex-col gap-3">
        {socialLinks.map((socialLink, linkIndex) => (
          <SocialLinkCard
            key={linkIndex}
            socialLink={socialLink}
            linkIndex={linkIndex}
            isRtl={isRtl}
            getPlatform={getPlatform}
            getPriceType={getPriceType}
            updateSocialLink={updateSocialLink}
            removeSocialLink={removeSocialLink}
            addPrice={addPrice}
            removePrice={removePrice}
            updatePrice={updatePrice}
          />
        ))}

        {/* Add Social Link Button */}
        <button
          type="button"
          onClick={addSocialLink}
          className={`w-full py-4 md:py-5 rounded-[20px] border-2 border-dashed border-gray-300 dark:border-gray-600 bg-[#f5f5f5]/50 dark:bg-[var(--container-bg)]/50 text-gray-500 dark:text-gray-400 hover:border-[var(--secondary)] hover:text-[var(--secondary)] hover:bg-[var(--secondary)]/5 transition-all duration-300 ease-in-out flex items-center justify-center gap-2 ${
            isRtl ? "flex-row-reverse" : ""
          }`}
        >
          <FaPlus className="w-4 h-4" />
          <span className="text-sm md:text-base font-medium">
            {t("influencerRegister.fields.addSocialLink", "Add Social Link")}
          </span>
        </button>
      </div>
    </div>
  );
};

// Separate component for each social link card
const SocialLinkCard = ({
  socialLink,
  linkIndex,
  isRtl,
  getPlatform,
  getPriceType,
  updateSocialLink,
  removeSocialLink,
  addPrice,
  removePrice,
  updatePrice,
}) => {
  const { t } = useTranslation();
  const platform = getPlatform(socialLink.platform);
  const PlatformIcon = platform?.icon || FaLink;

  // Get translated platform label
  const getPlatformLabel = (platformValue) => {
    if (!platformValue) return `Social Link ${linkIndex + 1}`;
    return t(
      `influencerRegister.fields.platforms.${platformValue}`,
      platform?.label || `Social Link ${linkIndex + 1}`
    );
  };

  return (
    <div className="relative p-4 md:p-5 rounded-[20px] bg-[#f5f5f5] dark:bg-[var(--container-bg)] border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out hover:border-gray-300 dark:hover:border-gray-600">
      {/* Card Header */}
      <div
        className={`flex items-center justify-between mb-4 ${
          isRtl ? "flex-row-reverse" : ""
        }`}
      >
        <div
          className={`flex items-center gap-2.5 ${
            isRtl ? "flex-row-reverse" : ""
          }`}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: platform?.color
                ? `${platform.color}20`
                : "rgba(107, 114, 128, 0.2)",
            }}
          >
            <PlatformIcon
              className="w-4 h-4"
              style={{ color: platform?.color || "#6B7280" }}
            />
          </div>
          <h4 className="text-sm md:text-base font-medium text-[var(--foreground)]">
            {getPlatformLabel(socialLink.platform)}
          </h4>
        </div>
        <button
          type="button"
          onClick={() => removeSocialLink(linkIndex)}
          className="p-1.5 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 text-gray-400 hover:text-red-500 transition-all duration-200"
          aria-label="Remove social link"
        >
          <FaTimes className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Platform & Link Row */}
      <div
        className={`flex flex-col md:flex-row gap-3 mb-4 ${
          isRtl ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Platform Dropdown */}
        <PlatformDropdown
          value={socialLink.platform}
          onChange={(value) => updateSocialLink(linkIndex, "platform", value)}
          isRtl={isRtl}
        />

        {/* Link URL Input */}
        <div className="relative flex-1">
          <div
            className={`absolute top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 ${
              isRtl ? "right-4" : "left-4"
            }`}
          >
            <FaLink className="w-4 h-4" />
          </div>
          <input
            id={`social-link-${linkIndex}`}
            name={`social_link_${linkIndex}`}
            type="url"
            value={socialLink.link || ""}
            onChange={(e) =>
              updateSocialLink(linkIndex, "link", e.target.value)
            }
            placeholder="https://instagram.com/username"
            dir={isRtl ? "rtl" : "ltr"}
            className={`w-full py-3 md:py-4 rounded-[20px] bg-white dark:bg-gray-800/50 text-[var(--foreground)] placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm md:text-base outline-none border border-gray-200 dark:border-gray-700 focus:border-[var(--secondary)] dark:focus:border-[var(--secondary)] transition-all duration-300 ease-in-out ${
              isRtl ? "pr-11 pl-4 text-right" : "pl-11 pr-4 text-left"
            }`}
          />
        </div>
      </div>

      {/* Prices Section */}
      <div className="flex flex-col gap-3">
        <div
          className={`flex items-center justify-between ${
            isRtl ? "flex-row-reverse" : ""
          }`}
        >
          <span className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">
            {t("influencerRegister.fields.pricingOptions", "Pricing Options")}
          </span>
          <button
            type="button"
            onClick={() => addPrice(linkIndex)}
            className={`flex items-center gap-1.5 text-xs md:text-sm text-[var(--secondary)] hover:opacity-80 transition-opacity ${
              isRtl ? "flex-row-reverse" : ""
            }`}
          >
            <FaPlus className="w-3 h-3" />
            <span>{t("influencerRegister.fields.addPrice", "Add Price")}</span>
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {socialLink.prices?.map((price, priceIndex) => (
            <div
              key={priceIndex}
              className={`flex items-center gap-2 ${
                isRtl ? "flex-row-reverse" : ""
              }`}
            >
              {/* Price Type Dropdown */}
              <PriceTypeDropdown
                value={price.type}
                onChange={(value) =>
                  updatePrice(linkIndex, priceIndex, "type", value)
                }
                isRtl={isRtl}
              />

              {/* Price Input */}
              <div className="relative flex-1">
                <div
                  className={`absolute top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 ${
                    isRtl ? "right-3" : "left-3"
                  }`}
                >
                  <FaDollarSign className="w-3.5 h-3.5" />
                </div>
                <input
                  type="number"
                  value={price.price || ""}
                  onChange={(e) =>
                    updatePrice(linkIndex, priceIndex, "price", e.target.value)
                  }
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  dir={isRtl ? "rtl" : "ltr"}
                  className={`w-full py-2.5 md:py-3 rounded-[16px] bg-white dark:bg-gray-800/50 text-[var(--foreground)] placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm outline-none border border-gray-200 dark:border-gray-700 focus:border-[var(--secondary)] dark:focus:border-[var(--secondary)] transition-all duration-300 ease-in-out ${
                    isRtl ? "pr-8 pl-3 text-right" : "pl-8 pr-3 text-left"
                  }`}
                />
              </div>

              {/* Remove Price Button */}
              {socialLink.prices.length > 1 && (
                <button
                  type="button"
                  onClick={() => removePrice(linkIndex, priceIndex)}
                  className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 text-gray-400 hover:text-red-500 transition-all duration-200 flex-shrink-0"
                  aria-label="Remove price"
                >
                  <FaMinus className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Platform Dropdown Component (similar to other dropdowns in the project)
const PlatformDropdown = ({ value, onChange, isRtl }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef(null);
  const listRef = useRef(null);

  const selectedPlatform = SOCIAL_PLATFORMS.find((p) => p.value === value);
  const SelectedIcon = selectedPlatform?.icon || FaLink;

  // Get translated platform label
  const getPlatformLabel = (platformValue) => {
    return t(
      `influencerRegister.fields.platforms.${platformValue}`,
      SOCIAL_PLATFORMS.find((p) => p.value === platformValue)?.label ||
        platformValue
    );
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll highlighted item into view
  useEffect(() => {
    if (listRef.current && SOCIAL_PLATFORMS.length > 0) {
      const highlightedElement = listRef.current.children[highlightedIndex];
      if (highlightedElement) {
        highlightedElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [highlightedIndex]);

  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < SOCIAL_PLATFORMS.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case "Enter":
        e.preventDefault();
        if (SOCIAL_PLATFORMS[highlightedIndex]) {
          onChange(SOCIAL_PLATFORMS[highlightedIndex].value);
          setIsOpen(false);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  const handleSelect = (platform) => {
    onChange(platform.value);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full md:w-1/3" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={`flex items-center gap-3 w-full px-4 py-3 md:py-4 rounded-[20px] bg-white dark:bg-gray-800/50 text-[var(--foreground)] text-sm md:text-base outline-none border transition-all duration-300 ease-in-out ${
          isOpen
            ? "border-[var(--secondary)] dark:border-[var(--secondary)]"
            : "border-gray-200 dark:border-gray-700"
        } ${isRtl ? "flex-row-reverse" : ""}`}
      >
        {selectedPlatform ? (
          <>
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${selectedPlatform.color}20` }}
            >
              <SelectedIcon
                className="w-3 h-3"
                style={{ color: selectedPlatform.color }}
              />
            </div>
            <span className={`flex-1 ${isRtl ? "text-right" : "text-left"}`}>
              {getPlatformLabel(selectedPlatform.value)}
            </span>
          </>
        ) : (
          <>
            <FaLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span
              className={`flex-1 text-gray-400 ${
                isRtl ? "text-right" : "text-left"
              }`}
            >
              {t("influencerRegister.fields.selectPlatform", "Select Platform")}
            </span>
          </>
        )}
        <FaChevronDown
          className={`w-3 h-3 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute top-full mt-2 w-full bg-white dark:bg-[var(--container-bg)] rounded-[16px] shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden transition-all duration-300 ease-out origin-top ${
          isRtl ? "right-0" : "left-0"
        } ${
          isOpen
            ? "opacity-100 scale-y-100 translate-y-0"
            : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <ul
          ref={listRef}
          className="py-2 max-h-[250px] overflow-y-auto"
          role="listbox"
        >
          {SOCIAL_PLATFORMS.map((platform, index) => {
            const Icon = platform.icon;
            return (
              <li
                key={platform.value}
                role="option"
                aria-selected={value === platform.value}
                onClick={() => handleSelect(platform)}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors duration-150 ${
                  isRtl ? "flex-row-reverse" : ""
                } ${
                  index === highlightedIndex
                    ? "bg-[var(--secondary)]/10"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                } ${value === platform.value ? "bg-[var(--secondary)]/5" : ""}`}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${platform.color}20` }}
                >
                  <Icon className="w-4 h-4" style={{ color: platform.color }} />
                </div>
                <span className="flex-1 text-sm md:text-base text-[var(--foreground)]">
                  {getPlatformLabel(platform.value)}
                </span>
                {value === platform.value && (
                  <svg
                    className="w-4 h-4 text-[var(--secondary)] flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

// Price Type Dropdown Component
const PriceTypeDropdown = ({ value, onChange, isRtl }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef(null);
  const listRef = useRef(null);

  const selectedType = PRICE_TYPES.find((p) => p.value === value);
  const SelectedIcon = selectedType?.icon || FaImage;

  // Get translated price type label
  const getPriceTypeLabel = (typeValue) => {
    return t(
      `influencerRegister.fields.priceTypes.${typeValue}`,
      PRICE_TYPES.find((p) => p.value === typeValue)?.label || typeValue
    );
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll highlighted item into view
  useEffect(() => {
    if (listRef.current && PRICE_TYPES.length > 0) {
      const highlightedElement = listRef.current.children[highlightedIndex];
      if (highlightedElement) {
        highlightedElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [highlightedIndex]);

  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < PRICE_TYPES.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case "Enter":
        e.preventDefault();
        if (PRICE_TYPES[highlightedIndex]) {
          onChange(PRICE_TYPES[highlightedIndex].value);
          setIsOpen(false);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  const handleSelect = (priceType) => {
    onChange(priceType.value);
    setIsOpen(false);
  };

  return (
    <div className="relative flex-1" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={`flex items-center gap-2 w-full px-3 py-2.5 md:py-3 rounded-[16px] bg-white dark:bg-gray-800/50 text-[var(--foreground)] text-sm outline-none border transition-all duration-300 ease-in-out ${
          isOpen
            ? "border-[var(--secondary)] dark:border-[var(--secondary)]"
            : "border-gray-200 dark:border-gray-700"
        } ${isRtl ? "flex-row-reverse" : ""}`}
      >
        {selectedType ? (
          <>
            <SelectedIcon className="w-3.5 h-3.5 text-[var(--secondary)] flex-shrink-0" />
            <span className={`flex-1 ${isRtl ? "text-right" : "text-left"}`}>
              {getPriceTypeLabel(selectedType.value)}
            </span>
          </>
        ) : (
          <>
            <FaImage className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <span
              className={`flex-1 text-gray-400 ${
                isRtl ? "text-right" : "text-left"
              }`}
            >
              {t("influencerRegister.fields.contentType", "Content Type")}
            </span>
          </>
        )}
        <FaChevronDown
          className={`w-2.5 h-2.5 text-gray-400 transition-transform duration-200 flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute top-full mt-2 w-full bg-white dark:bg-[var(--container-bg)] rounded-[12px] shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden transition-all duration-300 ease-out origin-top ${
          isRtl ? "right-0" : "left-0"
        } ${
          isOpen
            ? "opacity-100 scale-y-100 translate-y-0"
            : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
        }`}
      >
        <ul ref={listRef} className="py-1" role="listbox">
          {PRICE_TYPES.map((priceType, index) => {
            const Icon = priceType.icon;
            return (
              <li
                key={priceType.value}
                role="option"
                aria-selected={value === priceType.value}
                onClick={() => handleSelect(priceType)}
                className={`flex items-center gap-2.5 px-3 py-2.5 cursor-pointer transition-colors duration-150 ${
                  isRtl ? "flex-row-reverse" : ""
                } ${
                  index === highlightedIndex
                    ? "bg-[var(--secondary)]/10"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                } ${
                  value === priceType.value ? "bg-[var(--secondary)]/5" : ""
                }`}
              >
                <Icon className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span className="flex-1 text-sm text-[var(--foreground)]">
                  {getPriceTypeLabel(priceType.value)}
                </span>
                {value === priceType.value && (
                  <svg
                    className="w-3.5 h-3.5 text-[var(--secondary)] flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SocialLinksInput;
