import { useState } from "react";

/**
 * OptimizedImage component with responsive srcSet and lazy loading
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text
 * @param {string} className - Additional CSS classes
 * @param {string} sizes - Responsive sizes attribute
 * @param {string} loading - Loading strategy (lazy/eager)
 * @param {number} width - Explicit width for CLS optimization
 * @param {number} height - Explicit height for CLS optimization
 */
export default function OptimizedImage({
  src,
  alt,
  className = "",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  loading = "lazy",
  width,
  height,
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Generate srcSet if image is from API (you can customize this logic)
  const isExternal = src?.startsWith("http");
  const srcSet = isExternal
    ? undefined
    : `${src}?w=400 400w, ${src}?w=800 800w, ${src}?w=1200 1200w`;

  if (hasError) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-gray-200 dark:bg-gray-800`}
        style={{ width, height }}
      >
        <span className="text-gray-400 text-sm">Image not available</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      className={`${className} ${
        isLoaded ? "opacity-100" : "opacity-0"
      } transition-opacity duration-300`}
      loading={loading}
      onLoad={() => setIsLoaded(true)}
      onError={() => setHasError(true)}
      decoding="async"
    />
  );
}
