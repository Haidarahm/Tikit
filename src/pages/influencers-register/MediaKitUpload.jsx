import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useI18nLanguage } from "../../store/I18nLanguageContext";
import UploadIcon from "../../assets/planes/upload.svg";

const MediaKitUpload = ({
  label,
  onFilesChange,
  name = "mediaKit",
  accept = "*/*",
  multiple = true,
  maxSize = 50 * 1024 * 1024, // 50MB
  className = "",
}) => {
  const { t } = useTranslation();
  const { isRtl } = useI18nLanguage();
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const validFiles = files.filter((file) => {
      if (file.size > maxSize) {
        // Could show error toast here
        return false;
      }
      return true;
    });

    const newFiles = [...uploadedFiles, ...validFiles];
    setUploadedFiles(newFiles);
    if (onFilesChange) {
      onFilesChange(newFiles);
    }
  };

  const handleRemoveFile = (index) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    if (onFilesChange) {
      onFilesChange(newFiles);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`flex flex-col gap-2 w-full ${className}`}>
      {label && (
        <label
          htmlFor={name}
          dir={isRtl ? "rtl" : "ltr"}
          className={`text-[var(--foreground)] text-sm md:text-base font-medium ${
            isRtl ? "text-right" : "text-left"
          }`}
        >
          {label}
        </label>
      )}

      {/* Upload Area */}
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`relative flex flex-col items-center justify-center w-full min-h-[180px] md:min-h-[200px] rounded-[20px] border-2 border-dashed transition-all duration-300 cursor-pointer ${
          isDragging
            ? "border-[var(--secondary)] bg-[var(--secondary)]/5 dark:bg-[var(--secondary)]/10"
            : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 bg-gray-50 dark:bg-gray-800/30"
        }`}
      >
        {/* Upload Icon */}
        <div className="mb-4 opacity-40">
          <img
            src={UploadIcon}
            alt="Upload"
            className="w-16 h-16 md:w-20 md:h-20 grayscale opacity-60"
          />
        </div>

        {/* Placeholder Text */}
        <div
          className={`text-center px-4 ${isRtl ? "text-right" : "text-left"}`}
          dir={isRtl ? "rtl" : "ltr"}
        >
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium mb-1">
            {t("influencerRegister.fields.mediaKitPlaceholder")}
          </p>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-500">
            {t("influencerRegister.fields.mediaKitHelp")}
          </p>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          id={name}
          name={name}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInput}
          className="hidden"
        />
      </div>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="mt-3 flex flex-col gap-2">
          {uploadedFiles.map((file, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded-[12px] bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 ${
                isRtl ? "flex-row-reverse" : ""
              }`}
            >
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <svg
                  className="w-5 h-5 text-gray-500 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span
                  className={`text-sm text-[var(--foreground)] truncate ${
                    isRtl ? "text-right" : "text-left"
                  }`}
                  dir={isRtl ? "rtl" : "ltr"}
                >
                  {file.name}
                </span>
                <span className="text-xs text-gray-500 flex-shrink-0">
                  ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile(index);
                }}
                className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full transition-colors ml-2"
              >
                <svg
                  className="w-4 h-4 text-red-500"
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaKitUpload;
