import React, { useState, useEffect, useRef, useCallback } from "react";

/**
 * Video Component
 *
 * @param {Object} props
 * @param {string} props.src - Video source URL or file
 * @param {string} props.uploadProgress - Upload progress percentage (0-100)
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.poster - Video poster image
 * @param {boolean} props.controls - Show video controls (default: true)
 * @param {boolean} props.autoplay - Autoplay video (default: false)
 * @param {boolean} props.loop - Loop video (default: false)
 * @param {boolean} props.muted - Muted video (default: false)
 * @param {Object} props.style - Additional inline styles
 * @param {Function} props.onLoadStart - Callback when upload starts
 * @param {Function} props.onUploadComplete - Callback when upload completes
 * @param {Function} props.onError - Callback on error
 */
const Video = ({
  src,
  uploadProgress = 0,
  className = "",
  poster,
  controls = true,
  autoplay = false,
  loop = false,
  muted = false,
  style = {},
  onLoadStart,
  onUploadComplete,
  onError,
}) => {
  const [isUploading, setIsUploading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const uploadCompleteTimeoutRef = useRef(null);

  // Start upload when component mounts (only once)
  useEffect(() => {
    if (!src || isLoaded) {
      return;
    }

    setIsUploading(true);
    setError(null);
    onLoadStart?.();

    return () => {
      if (uploadCompleteTimeoutRef.current) {
        clearTimeout(uploadCompleteTimeoutRef.current);
      }
    };
  }, [src, isLoaded, onLoadStart]);

  // Handle external upload progress updates
  useEffect(() => {
    if (uploadProgress >= 100 && isUploading) {
      uploadCompleteTimeoutRef.current = setTimeout(() => {
        setIsUploading(false);
        onUploadComplete?.();
      }, 500);
    }
  }, [uploadProgress, isUploading, onUploadComplete]);

  // Handle video load events when file is provided (not URL)
  const handleCanPlay = useCallback(() => {
    setIsLoaded(true);
    if (isUploading) {
      setIsUploading(false);
      onUploadComplete?.();
    }
  }, [isUploading, onUploadComplete]);

  const handleLoadedData = useCallback(() => {
    if (!uploadProgress && isUploading) {
      // If no external upload progress, wait for video to load
      setIsLoaded(true);
      setTimeout(() => {
        setIsUploading(false);
        onUploadComplete?.();
      }, 500);
    }
  }, [isUploading, uploadProgress, onUploadComplete]);

  const handleError = useCallback(
    (e) => {
      setError("Failed to load video");
      setIsUploading(false);
      onError?.(e);
    },
    [onError]
  );

  // If no source, show nothing
  if (!src) {
    return null;
  }

  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-10">
          <div className="text-center text-red-500">
            <p>Error loading video</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls={false}
        autoPlay={autoplay}
        loop={loop}
        muted={muted}
        className={`w-full rounded-lg border-primary shadow-2xl shadow-black border-4 h-full transition-opacity duration-300 ${
          isUploading ? "opacity-0" : "opacity-100"
        }`}
        onCanPlay={handleCanPlay}
        onLoadedData={handleLoadedData}
        onError={handleError}
      />
    </div>
  );
};

export default Video;
