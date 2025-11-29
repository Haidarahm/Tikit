import React, { useState, useRef, useEffect } from "react";

// Sample content fields/categories
const contentFields = [
  { id: "fashion", name: "Fashion & Style", icon: "👗" },
  { id: "beauty", name: "Beauty & Makeup", icon: "💄" },
  { id: "fitness", name: "Fitness & Health", icon: "💪" },
  { id: "travel", name: "Travel & Adventure", icon: "✈️" },
  { id: "food", name: "Food & Cooking", icon: "🍳" },
  { id: "tech", name: "Technology & Gadgets", icon: "📱" },
  { id: "gaming", name: "Gaming", icon: "🎮" },
  { id: "music", name: "Music & Entertainment", icon: "🎵" },
  { id: "lifestyle", name: "Lifestyle", icon: "🌟" },
  { id: "photography", name: "Photography", icon: "📸" },
  { id: "art", name: "Art & Design", icon: "🎨" },
  { id: "education", name: "Education & Learning", icon: "📚" },
  { id: "business", name: "Business & Finance", icon: "💼" },
  { id: "sports", name: "Sports", icon: "⚽" },
  { id: "automotive", name: "Automotive & Cars", icon: "🚗" },
  { id: "parenting", name: "Parenting & Family", icon: "👨‍👩‍👧" },
  { id: "pets", name: "Pets & Animals", icon: "🐾" },
  { id: "comedy", name: "Comedy & Humor", icon: "😂" },
  { id: "motivation", name: "Motivation & Inspiration", icon: "🔥" },
  { id: "diy", name: "DIY & Crafts", icon: "🔨" },
  { id: "real-estate", name: "Real Estate", icon: "🏠" },
  { id: "wellness", name: "Wellness & Mental Health", icon: "🧘" },
  { id: "luxury", name: "Luxury & Premium", icon: "💎" },
  { id: "sustainability", name: "Sustainability & Eco", icon: "🌱" },
];

const ContentFieldInput = ({
  label = "Content Fields",
  placeholder = "Search and select your content fields...",
  selectedFields = [],
  onChange,
  name = "contentFields",
  required = false,
  disabled = false,
  className = "",
  maxSelections = 5,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Filter fields based on search query and exclude already selected
  const filteredFields = contentFields.filter(
    (field) =>
      !selectedFields.some((s) => s.id === field.id) &&
      (field.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        field.id.toLowerCase().includes(searchQuery.toLowerCase()))
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

  // Reset highlighted index when search changes
  useEffect(() => {
    setHighlightedIndex(0);
  }, [searchQuery]);

  // Scroll highlighted item into view
  useEffect(() => {
    if (listRef.current && filteredFields.length > 0) {
      const highlightedElement = listRef.current.children[highlightedIndex];
      if (highlightedElement) {
        highlightedElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [highlightedIndex, filteredFields.length]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (!isOpen) setIsOpen(true);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredFields.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case "Enter":
        e.preventDefault();
        if (filteredFields[highlightedIndex]) {
          handleSelect(filteredFields[highlightedIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        setSearchQuery("");
        break;
      case "Backspace":
        if (searchQuery === "" && selectedFields.length > 0) {
          handleRemove(selectedFields[selectedFields.length - 1]);
        }
        break;
      default:
        break;
    }
  };

  const handleSelect = (field) => {
    if (selectedFields.length >= maxSelections) return;
    if (onChange) {
      onChange([...selectedFields, field]);
    }
    setSearchQuery("");
    setHighlightedIndex(0);
    inputRef.current?.focus();
  };

  const handleRemove = (field) => {
    if (onChange) {
      onChange(selectedFields.filter((s) => s.id !== field.id));
    }
  };

  const canAddMore = selectedFields.length < maxSelections;

  return (
    <div
      className={`flex flex-col gap-2 w-full ${className}`}
      ref={containerRef}
    >
      {label && (
        <div className="flex items-center justify-between">
          <label
            htmlFor={name}
            className="text-[var(--foreground)] text-sm md:text-base font-medium"
          >
            {label}
          </label>
          <span className="text-xs text-gray-400">
            {selectedFields.length} / {maxSelections} selected
          </span>
        </div>
      )}

      {/* Input Container */}
      <div className="relative w-full">
        <div
          className={`flex flex-wrap items-center gap-2 w-full min-h-[48px] md:min-h-[56px] px-3 md:px-4 py-2 md:py-3 rounded-[20px] bg-[#f5f5f5] dark:bg-[var(--container-bg)] border border-transparent transition-all duration-300 ease-in-out ${
            isOpen ? "border-[var(--secondary)]" : ""
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() => !disabled && inputRef.current?.focus()}
        >
          {/* Selected Tags */}
          {selectedFields.map((field) => (
            <span
              key={field.id}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--secondary)]/10 text-[var(--secondary)] rounded-full text-sm font-medium transition-all duration-200 hover:bg-[var(--secondary)]/20"
            >
              <span>{field.icon}</span>
              <span>{field.name}</span>
              {!disabled && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(field);
                  }}
                  className="ml-1 hover:text-red-500 transition-colors"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </span>
          ))}

          {/* Search Input */}
          {canAddMore && (
            <input
              ref={inputRef}
              id={name}
              name={name}
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onKeyDown={handleKeyDown}
              placeholder={
                selectedFields.length === 0 ? placeholder : "Add more..."
              }
              disabled={disabled}
              autoComplete="off"
              className="flex-1 min-w-[120px] bg-transparent text-[var(--foreground)] placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm md:text-base outline-none"
            />
          )}
        </div>

        {/* Dropdown Menu */}
        <div
          className={`absolute bottom-full left-0 right-0 mb-2 w-full bg-white dark:bg-[var(--container-bg)] rounded-[16px] shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden transition-all duration-300 ease-out origin-bottom ${
            isOpen && canAddMore
              ? "opacity-100 scale-y-100 translate-y-0"
              : "opacity-0 scale-y-95 translate-y-2 pointer-events-none"
          }`}
        >
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Select up to {maxSelections} content fields that best describe
              your content
            </p>
          </div>

          {/* Fields List */}
          <ul
            ref={listRef}
            className="max-h-[250px] overflow-y-auto py-2"
            role="listbox"
          >
            {filteredFields.length > 0 ? (
              filteredFields.map((field, index) => (
                <li
                  key={field.id}
                  role="option"
                  aria-selected={false}
                  onClick={() => handleSelect(field)}
                  className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors duration-150 ${
                    index === highlightedIndex
                      ? "bg-[var(--secondary)]/10"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <span className="text-2xl flex-shrink-0">{field.icon}</span>
                  <span className="flex-1 text-sm md:text-base text-[var(--foreground)]">
                    {field.name}
                  </span>
                  <svg
                    className="w-5 h-5 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </li>
              ))
            ) : (
              <li className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                {searchQuery
                  ? "No matching content fields found"
                  : "All content fields have been selected"}
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Hidden inputs for form submission */}
      {required && selectedFields.length === 0 && (
        <input type="hidden" name={name} value="" required />
      )}
      {selectedFields.map((field) => (
        <input
          key={field.id}
          type="hidden"
          name={`${name}[]`}
          value={field.id}
        />
      ))}
    </div>
  );
};

export default ContentFieldInput;
