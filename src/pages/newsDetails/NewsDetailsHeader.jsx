import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useI18nLanguage } from '../../store/I18nLanguageContext'

gsap.registerPlugin(ScrollTrigger)

// Detect if we're in prerendering mode (react-snap)
const isPrerendering = typeof window !== "undefined" && 
  (window.navigator?.userAgent?.includes("HeadlessChrome") || 
   window.navigator?.userAgent?.includes("PhantomJS"))

const NewsDetailsHeader = ({ newsData: propNewsData, loading: propLoading }) => {
  const { isRtl } = useI18nLanguage()
  const [imageLoaded, setImageLoaded] = useState(false)
  const lastFetchedSlugRef = useRef(null)
  
  const headerRef = useRef(null)
  const headerImageRef = useRef(null)
  const headerTitleRef = useRef(null)
  const headerSubtitleRef = useRef(null)
  const descriptionRef = useRef(null)
  const badgeRef = useRef(null)
  const dateRef = useRef(null)
  const lineRef = useRef(null)

  // Get image URL from data (handles both image string and images array)
  const getImageUrl = (data) => {
    if (!data) return null
    if (data.image) return data.image
    if (data.images) {
      // If images is an array, get first item; if string, use it directly
      return Array.isArray(data.images) ? data.images[0] : data.images
    }
    return null
  }

  // Format date from ISO string
  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  // Debug: Log when data changes (only in development, not during prerendering)
  useEffect(() => {
    if (isPrerendering) return // Skip logging during prerendering
    
    if (process.env.NODE_ENV === 'development') {
      if (propNewsData) {
        const imageUrl = getImageUrl(propNewsData)
        console.log('NewsDetailsHeader - Received data:', {
          title: propNewsData.title,
          image: propNewsData.image,
          images: propNewsData.images,
          imageUrl: imageUrl,
          slug: propNewsData.slug
        })
      } else {
        console.log('NewsDetailsHeader - No data received, propLoading:', propLoading)
      }
    }
  }, [propNewsData, propLoading])

  // Reset image load state when news data changes
  useEffect(() => {
    if (propNewsData) {
      const currentSlug = propNewsData.slug || propNewsData.id
      if (currentSlug !== lastFetchedSlugRef.current) {
        // Check if there's an image - if not, mark as loaded immediately
        const imageUrl = getImageUrl(propNewsData)
        if (!imageUrl) {
          setImageLoaded(true) // If no image, set to true immediately
        } else {
          // During prerendering, mark images as loaded immediately to ensure content appears
          if (isPrerendering) {
            setImageLoaded(true)
          } else {
            setImageLoaded(false) // Reset to false when new image URL
            // Fallback: if image doesn't load within 1 second, show it anyway
            const timeout = setTimeout(() => {
              setImageLoaded(true)
            }, 1000)
            
            return () => clearTimeout(timeout)
          }
        }
        lastFetchedSlugRef.current = currentSlug
      }
    } else {
      setImageLoaded(false)
      lastFetchedSlugRef.current = null
    }
  }, [propNewsData])

  // Use news data from props
  const currentNewsData = propNewsData
  // Show loading skeleton only when explicitly loading OR when we have no data
  // Image loading state is handled separately for the image element itself
  const isLoading = propLoading === true || !currentNewsData

  // Track if this is the first render with data
  const hasAnimatedRef = useRef(false)
  const animationTimeoutRef = useRef(null)

  useEffect(() => {
    if (!currentNewsData || propLoading) return

    // Wait for refs to be attached (elements must be rendered)
    if (!headerImageRef.current || !headerTitleRef.current) return

    // Skip animations during prerendering - content should be visible immediately
    if (isPrerendering) {
      // During snap, ensure content is visible and skip animations
      if (headerImageRef.current) {
        gsap.set(headerImageRef.current, { opacity: 1, scale: 1, y: 0 })
      }
      if (headerTitleRef.current) {
        gsap.set(headerTitleRef.current, { opacity: 1, y: 0 })
      }
      if (headerSubtitleRef.current) {
        gsap.set(headerSubtitleRef.current, { opacity: 1, y: 0 })
      }
      if (descriptionRef.current) {
        gsap.set(descriptionRef.current, { opacity: 1, y: 0 })
      }
      if (badgeRef.current) {
        gsap.set(badgeRef.current, { opacity: 1, scale: 1, y: 0 })
      }
      if (dateRef.current) {
        gsap.set(dateRef.current, { opacity: 1, x: 0 })
      }
      if (lineRef.current) {
        gsap.set(lineRef.current, { scaleX: 1 })
      }
      hasAnimatedRef.current = true
      return
    }

    // Clear any pending timeouts
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current)
    }

    // If we've already animated once, skip animation and show content immediately
    if (hasAnimatedRef.current) {
      // Just set up parallax, no entrance animation
      if (headerImageRef.current) {
        const imgElement = headerImageRef.current.querySelector('img')
        if (imgElement) {
          gsap.to(imgElement, {
            scale: 1.08,
            ease: "none",
            scrollTrigger: {
              trigger: headerImageRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          })
        }
      }
      return
    }

    // First render - animate in quickly (but don't hide content first if data exists)
    // Use a very short delay to ensure DOM is ready, then animate
    animationTimeoutRef.current = setTimeout(() => {
      // Set initial states for header elements only if they're not already visible
      // This allows content to show immediately when data exists
      if (headerImageRef.current && headerImageRef.current.style.opacity !== '1') {
        gsap.set(headerImageRef.current, { opacity: 0, scale: 1.08, y: 30 })
      }
      if (headerTitleRef.current && headerTitleRef.current.style.opacity !== '1') {
        gsap.set(headerTitleRef.current, { opacity: 0, y: 50 })
      }
      if (headerSubtitleRef.current && headerSubtitleRef.current.style.opacity !== '1') {
        gsap.set(headerSubtitleRef.current, { opacity: 0, y: 30 })
      }
      if (descriptionRef.current && descriptionRef.current.style.opacity !== '1') {
        gsap.set(descriptionRef.current, { opacity: 0, y: 30 })
      }
      if (badgeRef.current && badgeRef.current.style.opacity !== '1') {
        gsap.set(badgeRef.current, { opacity: 0, scale: 0.9, y: 20 })
      }
      if (dateRef.current && dateRef.current.style.opacity !== '1') {
        gsap.set(dateRef.current, { opacity: 0, x: isRtl ? 30 : -30 })
      }
      if (lineRef.current && lineRef.current.style.scaleX !== '1') {
        gsap.set(lineRef.current, { scaleX: 0 })
      }

      // Header animations - fast animation
      const headerTl = gsap.timeline({ defaults: { ease: "power3.out" } })
      
      if (headerImageRef.current) {
        headerTl.to(headerImageRef.current, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.3,
        }, 0)
      }
      if (badgeRef.current) {
        headerTl.to(badgeRef.current, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.2,
        }, 0.1)
      }
      if (dateRef.current) {
        headerTl.to(dateRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.2,
        }, 0.1)
      }
      if (headerTitleRef.current) {
        headerTl.to(headerTitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        }, 0.05)
      }
      if (headerSubtitleRef.current) {
        headerTl.to(headerSubtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.2,
          ease: "power2.out",
        }, 0.15)
      }
      if (descriptionRef.current) {
        headerTl.to(descriptionRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.2,
          ease: "power2.out",
        }, 0.1)
      }
      if (lineRef.current) {
        headerTl.to(lineRef.current, {
          scaleX: 1,
          duration: 0.2,
          ease: "power2.out",
        }, 0.2)
      }

      // Parallax effect on scroll for image
      if (headerImageRef.current) {
        const imgElement = headerImageRef.current.querySelector('img')
        if (imgElement) {
          gsap.to(imgElement, {
            scale: 1.08,
            ease: "none",
            scrollTrigger: {
              trigger: headerImageRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          })
        }
      }

      hasAnimatedRef.current = true
    }, 50) // Very short delay - just to ensure DOM is ready

    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current)
      }
      // Kill any ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars?.trigger === headerImageRef.current) {
          trigger.kill()
        }
      })
    }
  }, [isRtl, currentNewsData, propLoading])

  return (
    <header
      ref={headerRef}
      className="relative w-full mt-16 sm:mt-20 md:mt-24 lg:mt-[104px] py-4 sm:py-6 md:py-8"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start">
          {/* Image Container - Takes 8 columns on large screens */}
          <div className="lg:col-span-8">
            <div 
              ref={headerImageRef}
              className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[650px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl group"
            >
              {/* Skeleton Loader */}
              {isLoading && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-300/20 dark:from-gray-700/40 via-gray-200/30 dark:via-gray-600/30 to-gray-300/20 dark:to-gray-700/40 animate-pulse rounded-3xl" />
              )}
              
              {/* Image */}
              {(() => {
                const imageUrl = getImageUrl(currentNewsData)
                if (!imageUrl) return null
                
                return (
                  <img
                    key={imageUrl} // Force re-render when URL changes
                    src={imageUrl}
                    alt={currentNewsData.title || "News Header"}
                    className={`w-full h-full object-cover transition-opacity duration-700 group-hover:scale-105 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    loading="eager"
                    onLoad={() => {
                      if (process.env.NODE_ENV === 'development' && !isPrerendering) {
                        console.log('Image loaded successfully:', imageUrl)
                      }
                      setImageLoaded(true)
                    }}
                    onError={(e) => {
                      if (process.env.NODE_ENV === 'development' && !isPrerendering) {
                        console.error('Image failed to load:', imageUrl, e)
                      }
                      setImageLoaded(true) // Set to true even on error to show content
                    }}
                    style={{ display: imageLoaded ? 'block' : 'block' }} // Always render, just control opacity
                  />
                )
              })()}
              
              {/* Gradient Overlay */}
              {imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/50" />
              )}
              
              {/* Badge and Date Overlay */}
              {currentNewsData && (imageLoaded || !getImageUrl(currentNewsData)) && (
                <div className={`absolute ${isRtl ? 'top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8' : 'top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8'} flex flex-col gap-2 sm:gap-3 z-10`}>
                  <div
                    ref={badgeRef}
                    className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-full bg-gradient-to-r from-[#6ACBCC] to-[#1C6F6C] text-white text-xs sm:text-sm md:text-base font-semibold backdrop-blur-md shadow-xl border border-white/20"
                  >
                    News
                  </div>
                  <div
                    ref={dateRef}
                    className="text-white text-xs sm:text-sm md:text-base font-medium bg-black/50 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-full border border-white/10 shadow-lg"
                  >
                    {formatDate(currentNewsData.created_at || currentNewsData.updated_at)}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Content Section - Takes 4 columns on large screens */}
          <div className="lg:col-span-4 flex flex-col justify-center pt-4 sm:pt-6 md:pt-8 lg:pt-8">
            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              {isLoading ? (
                // Skeleton for content
                <>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="h-6 sm:h-8 md:h-10 lg:h-12 w-full bg-gradient-to-r from-[var(--foreground)]/20 via-[var(--foreground)]/10 to-[var(--foreground)]/20 rounded-lg animate-pulse" />
                    <div className="h-6 sm:h-8 md:h-10 w-3/4 bg-gradient-to-r from-[var(--foreground)]/20 via-[var(--foreground)]/10 to-[var(--foreground)]/20 rounded-lg animate-pulse" />
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="h-4 sm:h-5 md:h-6 w-full bg-gradient-to-r from-[var(--foreground)]/20 via-[var(--foreground)]/10 to-[var(--foreground)]/20 rounded animate-pulse" />
                    <div className="h-4 sm:h-5 md:h-6 w-5/6 bg-gradient-to-r from-[var(--foreground)]/20 via-[var(--foreground)]/10 to-[var(--foreground)]/20 rounded animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 sm:h-4 md:h-5 w-full bg-gradient-to-r from-[var(--foreground)]/20 via-[var(--foreground)]/10 to-[var(--foreground)]/20 rounded animate-pulse" />
                    <div className="h-3 sm:h-4 md:h-5 w-full bg-gradient-to-r from-[var(--foreground)]/20 via-[var(--foreground)]/10 to-[var(--foreground)]/20 rounded animate-pulse" />
                    <div className="h-3 sm:h-4 md:h-5 w-4/5 bg-gradient-to-r from-[var(--foreground)]/20 via-[var(--foreground)]/10 to-[var(--foreground)]/20 rounded animate-pulse" />
                  </div>
                  <div className="h-0.5 w-full bg-gradient-to-r from-[var(--foreground)]/20 via-[var(--foreground)]/10 to-transparent rounded-full animate-pulse" />
                </>
              ) : (
                <>
                  {/* Title */}
                  <h1 
                    ref={headerTitleRef}
                    className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground)] leading-[1.1] ${isRtl ? "font-cairo" : "font-antonio"}`}
                  >
                    {currentNewsData?.title || ""}
                  </h1>

                  {/* Subtitle */}
                  {currentNewsData?.subtitle && (
                    <p 
                      ref={headerSubtitleRef}
                      className="text-base sm:text-lg md:text-xl lg:text-2xl text-[var(--foreground)]/80 leading-relaxed font-medium"
                    >
                      {currentNewsData.subtitle}
                    </p>
                  )}

                  {/* Description */}
                  {currentNewsData?.description && (
                    <p 
                      ref={descriptionRef}
                      className="text-sm sm:text-base md:text-lg text-[var(--foreground)]/70 leading-relaxed"
                    >
                      {currentNewsData.description}
                    </p>
                  )}

                  {/* Decorative Line */}
                  <div 
                    ref={lineRef}
                    className="w-full h-0.5 bg-gradient-to-r from-[#6ACBCC] via-[#1C6F6C] to-transparent rounded-full origin-left"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default NewsDetailsHeader

