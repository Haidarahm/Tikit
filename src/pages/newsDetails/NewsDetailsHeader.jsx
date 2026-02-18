import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useI18nLanguage } from '../../store/I18nLanguageContext'

gsap.registerPlugin(ScrollTrigger)

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

  // Reset image load state when news data changes
  useEffect(() => {
    if (propNewsData) {
      const currentSlug = propNewsData.slug || propNewsData.id
      if (currentSlug !== lastFetchedSlugRef.current) {
        setImageLoaded(false) // Reset image load state when news changes
        lastFetchedSlugRef.current = currentSlug
      }
    } else {
      setImageLoaded(false)
      lastFetchedSlugRef.current = null
    }
  }, [propNewsData])

  // Use news data from props
  const currentNewsData = propNewsData
  const isLoading = propLoading || !currentNewsData || !imageLoaded

  useEffect(() => {
    if (!currentNewsData || propLoading || !imageLoaded) return

    // Wait for refs to be attached (elements must be rendered)
    if (!headerImageRef.current || !headerTitleRef.current) return

    // Set initial states for header elements
    if (headerImageRef.current) {
      gsap.set(headerImageRef.current, { opacity: 0, scale: 1.08, y: 30 })
    }
    if (headerTitleRef.current) {
      gsap.set(headerTitleRef.current, { opacity: 0, y: 50 })
    }
    if (headerSubtitleRef.current) {
      gsap.set(headerSubtitleRef.current, { opacity: 0, y: 30 })
    }
    if (descriptionRef.current) {
      gsap.set(descriptionRef.current, { opacity: 0, y: 30 })
    }
    if (badgeRef.current) {
      gsap.set(badgeRef.current, { opacity: 0, scale: 0.9, y: 20 })
    }
    if (dateRef.current) {
      gsap.set(dateRef.current, { opacity: 0, x: isRtl ? 30 : -30 })
    }
    if (lineRef.current) {
      gsap.set(lineRef.current, { scaleX: 0 })
    }

    // Header animations - run immediately on first render
    const headerTl = gsap.timeline({ defaults: { ease: "power3.out" } })
    
    if (headerImageRef.current) {
      headerTl.to(headerImageRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
      })
    }
    if (badgeRef.current) {
      headerTl.to(badgeRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.7,
      }, "-=0.9")
    }
    if (dateRef.current) {
      headerTl.to(dateRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.8,
      }, "-=0.7")
    }
    if (headerTitleRef.current) {
      headerTl.to(headerTitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      }, "-=0.5")
    }
    if (headerSubtitleRef.current) {
      headerTl.to(headerSubtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
      }, "-=0.7")
    }
    if (descriptionRef.current) {
      headerTl.to(descriptionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
      }, "-=0.6")
    }
    if (lineRef.current) {
      headerTl.to(lineRef.current, {
        scaleX: 1,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.4")
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

    return () => {
      headerTl.kill()
      // Kill any ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars?.trigger === headerImageRef.current) {
          trigger.kill()
        }
      })
    }
  }, [isRtl, currentNewsData, propLoading, imageLoaded])

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
              {(currentNewsData?.image || currentNewsData?.images) && (
                <img
                  src={currentNewsData.image || currentNewsData.images}
                  alt={currentNewsData.title || "News Header"}
                  className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  loading="eager"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageLoaded(true)}
                />
              )}
              
              {/* Gradient Overlay */}
              {imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/50" />
              )}
              
              {/* Badge and Date Overlay */}
              {currentNewsData && imageLoaded && (
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

