import React, { useState, useRef, useEffect } from "react";
import ReactCountryFlag from "react-country-flag";
import { useI18nLanguage } from "../../store/I18nLanguageContext";

// Complete list of countries
const countries = [
  { code: "AF", name: "Afghanistan" },
  { code: "AL", name: "Albania" },
  { code: "DZ", name: "Algeria" },
  { code: "AD", name: "Andorra" },
  { code: "AO", name: "Angola" },
  { code: "AG", name: "Antigua and Barbuda" },
  { code: "AR", name: "Argentina" },
  { code: "AM", name: "Armenia" },
  { code: "AU", name: "Australia" },
  { code: "AT", name: "Austria" },
  { code: "AZ", name: "Azerbaijan" },
  { code: "BS", name: "Bahamas" },
  { code: "BH", name: "Bahrain" },
  { code: "BD", name: "Bangladesh" },
  { code: "BB", name: "Barbados" },
  { code: "BY", name: "Belarus" },
  { code: "BE", name: "Belgium" },
  { code: "BZ", name: "Belize" },
  { code: "BJ", name: "Benin" },
  { code: "BT", name: "Bhutan" },
  { code: "BO", name: "Bolivia" },
  { code: "BA", name: "Bosnia and Herzegovina" },
  { code: "BW", name: "Botswana" },
  { code: "BR", name: "Brazil" },
  { code: "BN", name: "Brunei" },
  { code: "BG", name: "Bulgaria" },
  { code: "BF", name: "Burkina Faso" },
  { code: "BI", name: "Burundi" },
  { code: "KH", name: "Cambodia" },
  { code: "CM", name: "Cameroon" },
  { code: "CA", name: "Canada" },
  { code: "CV", name: "Cape Verde" },
  { code: "CF", name: "Central African Republic" },
  { code: "TD", name: "Chad" },
  { code: "CL", name: "Chile" },
  { code: "CN", name: "China" },
  { code: "CO", name: "Colombia" },
  { code: "KM", name: "Comoros" },
  { code: "CG", name: "Congo" },
  { code: "CD", name: "Congo (DRC)" },
  { code: "CR", name: "Costa Rica" },
  { code: "CI", name: "Côte d'Ivoire" },
  { code: "HR", name: "Croatia" },
  { code: "CU", name: "Cuba" },
  { code: "CY", name: "Cyprus" },
  { code: "CZ", name: "Czech Republic" },
  { code: "DK", name: "Denmark" },
  { code: "DJ", name: "Djibouti" },
  { code: "DM", name: "Dominica" },
  { code: "DO", name: "Dominican Republic" },
  { code: "EC", name: "Ecuador" },
  { code: "EG", name: "Egypt" },
  { code: "SV", name: "El Salvador" },
  { code: "GQ", name: "Equatorial Guinea" },
  { code: "ER", name: "Eritrea" },
  { code: "EE", name: "Estonia" },
  { code: "SZ", name: "Eswatini" },
  { code: "ET", name: "Ethiopia" },
  { code: "FJ", name: "Fiji" },
  { code: "FI", name: "Finland" },
  { code: "FR", name: "France" },
  { code: "GA", name: "Gabon" },
  { code: "GM", name: "Gambia" },
  { code: "GE", name: "Georgia" },
  { code: "DE", name: "Germany" },
  { code: "GH", name: "Ghana" },
  { code: "GR", name: "Greece" },
  { code: "GD", name: "Grenada" },
  { code: "GT", name: "Guatemala" },
  { code: "GN", name: "Guinea" },
  { code: "GW", name: "Guinea-Bissau" },
  { code: "GY", name: "Guyana" },
  { code: "HT", name: "Haiti" },
  { code: "HN", name: "Honduras" },
  { code: "HU", name: "Hungary" },
  { code: "IS", name: "Iceland" },
  { code: "IN", name: "India" },
  { code: "ID", name: "Indonesia" },
  { code: "IR", name: "Iran" },
  { code: "IQ", name: "Iraq" },
  { code: "IE", name: "Ireland" },
  { code: "IL", name: "Israel" },
  { code: "IT", name: "Italy" },
  { code: "JM", name: "Jamaica" },
  { code: "JP", name: "Japan" },
  { code: "JO", name: "Jordan" },
  { code: "KZ", name: "Kazakhstan" },
  { code: "KE", name: "Kenya" },
  { code: "KI", name: "Kiribati" },
  { code: "KP", name: "North Korea" },
  { code: "KR", name: "South Korea" },
  { code: "KW", name: "Kuwait" },
  { code: "KG", name: "Kyrgyzstan" },
  { code: "LA", name: "Laos" },
  { code: "LV", name: "Latvia" },
  { code: "LB", name: "Lebanon" },
  { code: "LS", name: "Lesotho" },
  { code: "LR", name: "Liberia" },
  { code: "LY", name: "Libya" },
  { code: "LI", name: "Liechtenstein" },
  { code: "LT", name: "Lithuania" },
  { code: "LU", name: "Luxembourg" },
  { code: "MG", name: "Madagascar" },
  { code: "MW", name: "Malawi" },
  { code: "MY", name: "Malaysia" },
  { code: "MV", name: "Maldives" },
  { code: "ML", name: "Mali" },
  { code: "MT", name: "Malta" },
  { code: "MH", name: "Marshall Islands" },
  { code: "MR", name: "Mauritania" },
  { code: "MU", name: "Mauritius" },
  { code: "MX", name: "Mexico" },
  { code: "FM", name: "Micronesia" },
  { code: "MD", name: "Moldova" },
  { code: "MC", name: "Monaco" },
  { code: "MN", name: "Mongolia" },
  { code: "ME", name: "Montenegro" },
  { code: "MA", name: "Morocco" },
  { code: "MZ", name: "Mozambique" },
  { code: "MM", name: "Myanmar" },
  { code: "NA", name: "Namibia" },
  { code: "NR", name: "Nauru" },
  { code: "NP", name: "Nepal" },
  { code: "NL", name: "Netherlands" },
  { code: "NZ", name: "New Zealand" },
  { code: "NI", name: "Nicaragua" },
  { code: "NE", name: "Niger" },
  { code: "NG", name: "Nigeria" },
  { code: "MK", name: "North Macedonia" },
  { code: "NO", name: "Norway" },
  { code: "OM", name: "Oman" },
  { code: "PK", name: "Pakistan" },
  { code: "PW", name: "Palau" },
  { code: "PS", name: "Palestine" },
  { code: "PA", name: "Panama" },
  { code: "PG", name: "Papua New Guinea" },
  { code: "PY", name: "Paraguay" },
  { code: "PE", name: "Peru" },
  { code: "PH", name: "Philippines" },
  { code: "PL", name: "Poland" },
  { code: "PT", name: "Portugal" },
  { code: "QA", name: "Qatar" },
  { code: "RO", name: "Romania" },
  { code: "RU", name: "Russia" },
  { code: "RW", name: "Rwanda" },
  { code: "KN", name: "Saint Kitts and Nevis" },
  { code: "LC", name: "Saint Lucia" },
  { code: "VC", name: "Saint Vincent and the Grenadines" },
  { code: "WS", name: "Samoa" },
  { code: "SM", name: "San Marino" },
  { code: "ST", name: "São Tomé and Príncipe" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "SN", name: "Senegal" },
  { code: "RS", name: "Serbia" },
  { code: "SC", name: "Seychelles" },
  { code: "SL", name: "Sierra Leone" },
  { code: "SG", name: "Singapore" },
  { code: "SK", name: "Slovakia" },
  { code: "SI", name: "Slovenia" },
  { code: "SB", name: "Solomon Islands" },
  { code: "SO", name: "Somalia" },
  { code: "ZA", name: "South Africa" },
  { code: "SS", name: "South Sudan" },
  { code: "ES", name: "Spain" },
  { code: "LK", name: "Sri Lanka" },
  { code: "SD", name: "Sudan" },
  { code: "SR", name: "Suriname" },
  { code: "SE", name: "Sweden" },
  { code: "CH", name: "Switzerland" },
  { code: "SY", name: "Syria" },
  { code: "TW", name: "Taiwan" },
  { code: "TJ", name: "Tajikistan" },
  { code: "TZ", name: "Tanzania" },
  { code: "TH", name: "Thailand" },
  { code: "TL", name: "Timor-Leste" },
  { code: "TG", name: "Togo" },
  { code: "TO", name: "Tonga" },
  { code: "TT", name: "Trinidad and Tobago" },
  { code: "TN", name: "Tunisia" },
  { code: "TR", name: "Turkey" },
  { code: "TM", name: "Turkmenistan" },
  { code: "TV", name: "Tuvalu" },
  { code: "UG", name: "Uganda" },
  { code: "UA", name: "Ukraine" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "GB", name: "United Kingdom" },
  { code: "US", name: "United States" },
  { code: "UY", name: "Uruguay" },
  { code: "UZ", name: "Uzbekistan" },
  { code: "VU", name: "Vanuatu" },
  { code: "VA", name: "Vatican City" },
  { code: "VE", name: "Venezuela" },
  { code: "VN", name: "Vietnam" },
  { code: "YE", name: "Yemen" },
  { code: "ZM", name: "Zambia" },
  { code: "ZW", name: "Zimbabwe" },
];

const ResidenceInput = ({
  label,
  countryPlaceholder = "Select country",
  cityPlaceholder = "Enter city",
  country,
  city,
  onCountryChange,
  onCityChange,
  name,
  required = false,
  disabled = false,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isRtl } = useI18nLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef(null);
  const searchInputRef = useRef(null);
  const listRef = useRef(null);

  // Find selected country
  const selectedCountry = country
    ? countries.find(
        (c) => c.code === country?.code || c.name === country?.name
      )
    : null;

  // Filter countries based on search query
  const filteredCountries = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  // Reset highlighted index when search changes
  useEffect(() => {
    setHighlightedIndex(0);
  }, [searchQuery]);

  // Scroll highlighted item into view
  useEffect(() => {
    if (listRef.current && filteredCountries.length > 0) {
      const highlightedElement = listRef.current.children[highlightedIndex];
      if (highlightedElement) {
        highlightedElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [highlightedIndex, filteredCountries.length]);

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
          prev < filteredCountries.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case "Enter":
        e.preventDefault();
        if (filteredCountries[highlightedIndex]) {
          handleCountrySelect(filteredCountries[highlightedIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        setSearchQuery("");
        break;
      default:
        break;
    }
  };

  const handleCountrySelect = (countryItem) => {
    if (onCountryChange) {
      onCountryChange(countryItem);
    }
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      {label && (
        <label
          htmlFor={name}
          dir={isRtl ? "rtl" : "ltr"}
          className="text-[var(--foreground)] text-sm md:text-base font-medium"
        >
          {label}
        </label>
      )}

      <div
        className={`flex w-full gap-2 md:gap-3 ${
          isRtl ? "flex-row-reverse" : ""
        }`}
      >
        {/* Country Dropdown */}
        <div className="relative w-[45%] md:w-[40%]" ref={containerRef}>
          <button
            type="button"
            onClick={() => !disabled && setIsOpen(!isOpen)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            className={`flex items-center gap-2 w-full px-3 md:px-4 py-3 md:py-4 rounded-[20px] bg-[#f5f5f5] dark:bg-[var(--container-bg)] text-[var(--foreground)] text-sm md:text-base outline-none border transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed ${
              isOpen
                ? "border-[var(--secondary)] dark:border-[var(--secondary)]"
                : "border-gray-200 dark:border-gray-700"
            }`}
          >
            {selectedCountry ? (
              <>
                <ReactCountryFlag
                  countryCode={selectedCountry.code}
                  svg
                  style={{
                    width: "1.25rem",
                    height: "1.25rem",
                  }}
                  className="flex-shrink-0"
                />
                <span
                  className={`flex-1 truncate ${
                    isRtl ? "text-right" : "text-left"
                  }`}
                >
                  {selectedCountry.name}
                </span>
              </>
            ) : (
              <span
                className={`flex-1 text-gray-400 dark:text-gray-500 truncate ${
                  isRtl ? "text-right" : "text-left"
                }`}
              >
                {countryPlaceholder}
              </span>
            )}
            <svg
              className={`w-4 h-4 transition-transform duration-300 flex-shrink-0 ${
                isOpen ? "" : "rotate-180"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          <div
            className={`absolute bottom-full mb-2 w-[280px] md:w-[320px] bg-white dark:bg-[var(--container-bg)] rounded-[16px] shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden transition-all duration-300 ease-out origin-bottom ${
              isRtl ? "right-0" : "left-0"
            } ${
              isOpen
                ? "opacity-100 scale-y-100 translate-y-0"
                : "opacity-0 scale-y-95 translate-y-2 pointer-events-none"
            }`}
          >
            {/* Search Input */}
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search country..."
                dir={isRtl ? "rtl" : "ltr"}
                className={`w-full px-3 py-2 rounded-[12px] bg-[#f5f5f5] dark:bg-[#2a2a2a] text-[var(--foreground)] placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm outline-none border border-transparent focus:border-[var(--secondary)] transition-all duration-200 ${
                  isRtl ? "text-right" : "text-left"
                }`}
              />
            </div>

            {/* Countries List */}
            <ul
              ref={listRef}
              className="max-h-[250px] overflow-y-auto py-2"
              role="listbox"
            >
              {filteredCountries.length > 0 ? (
                filteredCountries.map((countryItem, index) => (
                  <li
                    key={countryItem.code}
                    role="option"
                    aria-selected={selectedCountry?.code === countryItem.code}
                    onClick={() => handleCountrySelect(countryItem)}
                    className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors duration-150 ${
                      index === highlightedIndex
                        ? "bg-[var(--secondary)]/10"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    } ${
                      selectedCountry?.code === countryItem.code
                        ? "bg-[var(--secondary)]/5"
                        : ""
                    }`}
                  >
                    <ReactCountryFlag
                      countryCode={countryItem.code}
                      svg
                      style={{
                        width: "1.25rem",
                        height: "1.25rem",
                      }}
                      className="flex-shrink-0"
                    />
                    <span className="flex-1 text-sm text-[var(--foreground)] truncate">
                      {countryItem.name}
                    </span>
                    {selectedCountry?.code === countryItem.code && (
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
                ))
              ) : (
                <li className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center">
                  No countries found
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* City Input */}
        <input
          id={`${name}_city`}
          name={`${name}_city`}
          type="text"
          value={city || ""}
          onChange={(e) => onCityChange && onCityChange(e.target.value)}
          placeholder={cityPlaceholder}
          required={required}
          disabled={disabled}
          dir={isRtl ? "rtl" : "ltr"}
          className={`flex-1 px-4 py-3 md:py-4 rounded-[20px] bg-[#f5f5f5] dark:bg-[var(--container-bg)] text-[var(--foreground)] placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm md:text-base outline-none border border-gray-200 dark:border-gray-700 focus:border-[var(--secondary)] dark:focus:border-[var(--secondary)] transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed ${
            isRtl ? "text-right" : "text-left"
          }`}
        />
      </div>
    </div>
  );
};

export default ResidenceInput;
