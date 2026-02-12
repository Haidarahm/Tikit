import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useI18nLanguage } from '../../store/I18nLanguageContext'
import { useNewsStore } from '../../store/newsStore'

gsap.registerPlugin(ScrollTrigger)

const NewsDetailsHeader = () => {
  const { slug } = useParams()
  const { isRtl, language } = useI18nLanguage()
  const { loadOneNews, newsDetails, loading } = useNewsStore()
  const [newsData, setNewsData] = useState(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const loadingRef = useRef(false)
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

  // Load news data
  useEffect(() => {
    if (!slug) {
      setNewsData(null)
      setImageLoaded(false)
      loadingRef.current = false
      lastFetchedSlugRef.current = null
      return
    }

    // If we already fetched this slug, don't fetch again
    if (lastFetchedSlugRef.current === slug) {
      // Check if we have data in store or local state
      const existingData = newsData || newsDetails[slug]
      if (existingData && typeof existingData === 'object' && (existingData.id || existingData.slug)) {
        return
      }
    }

    // Check if data already exists in store for this slug
    const existingData = newsDetails[slug]
    if (existingData && typeof existingData === 'object' && (existingData.id || existingData.slug)) {
      setNewsData(existingData)
      setImageLoaded(false) // Still need to wait for image to load
      lastFetchedSlugRef.current = slug
      loadingRef.current = false
      return
    }

    // Prevent duplicate calls - check if already loading for this specific slug
    if (loadingRef.current === slug) {
      return
    }

    loadingRef.current = slug
    lastFetchedSlugRef.current = slug
    setImageLoaded(false) // Reset image loaded state when fetching new news

    let isCancelled = false

    const fetchNews = async () => {
      try {
        const data = await loadOneNews(slug, language)
        // Only update if we're still loading the same slug and not cancelled
        if (!isCancelled && loadingRef.current === slug && lastFetchedSlugRef.current === slug) {
          setNewsData(data)
        }
      } catch (error) {
        console.error('Failed to load news:', error)
        // Only update if we're still loading the same slug and not cancelled
        if (!isCancelled && loadingRef.current === slug && lastFetchedSlugRef.current === slug) {
          setImageLoaded(true) // Allow skeleton to hide even on error
        }
      } finally {
        // Only clear if we're still on the same slug
        if (!isCancelled && loadingRef.current === slug) {
          loadingRef.current = false
        }
      }
    }

    fetchNews()

    return () => {
      isCancelled = true
      // Clear ref if component unmounts or slug changes
      if (loadingRef.current === slug) {
        loadingRef.current = false
      }
    }
  }, [slug, language]) // Only depend on slug and language

  // Get news data from store or local state
  const currentNewsData = newsData || newsDetails[slug]
  const isLoading = loading || !currentNewsData || !imageLoaded

  useEffect(() => {
    if (!currentNewsData || loading || !imageLoaded) return

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
  }, [isRtl, currentNewsData, loading, imageLoaded])

  return (
    <header
      ref={headerRef}
      className="relative w-full  mt-[104px] py-4"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Image Container - Takes 8 columns on large screens */}
          <div className="lg:col-span-8">
            <div 
              ref={headerImageRef}
              className="relative w-full h-[450px] md:h-[550px] lg:h-[650px] rounded-3xl overflow-hidden shadow-2xl group"
            >
              {/* Skeleton Loader */}
              {isLoading && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-300/20 dark:from-gray-700/40 via-gray-200/30 dark:via-gray-600/30 to-gray-300/20 dark:to-gray-700/40 animate-pulse rounded-3xl" />
              )}
              
              {/* Image */}
              {currentNewsData?.image && (
                <img
                  src={currentNewsData.image}
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
                <div className={`absolute ${isRtl ? 'top-6 right-6 md:top-8 md:right-8' : 'top-6 left-6 md:top-8 md:left-8'} flex flex-col gap-3 z-10`}>
                  <div
                    ref={badgeRef}
                    className="inline-flex items-center px-5 py-2.5 rounded-full bg-gradient-to-r from-[#6ACBCC] to-[#1C6F6C] text-white text-sm md:text-base font-semibold backdrop-blur-md shadow-xl border border-white/20"
                  >
                    News
                  </div>
                  <div
                    ref={dateRef}
                    className="text-white text-sm md:text-base font-medium bg-black/50 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 shadow-lg"
                  >
                    {formatDate(currentNewsData.created_at || currentNewsData.updated_at)}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Content Section - Takes 4 columns on large screens */}
          <div className="lg:col-span-4 flex flex-col justify-center lg:pt-8">
            <div className="space-y-6 md:space-y-8">
              {isLoading ? (
                // Skeleton for content
                <>
                  <div className="space-y-4">
                    <div className="h-8 md:h-10 lg:h-12 w-full bg-gradient-to-r from-[var(--foreground)]/20 via-[var(--foreground)]/10 to-[var(--foreground)]/20 rounded-lg animate-pulse" />
                    <div className="h-8 md:h-10 w-3/4 bg-gradient-to-r from-[var(--foreground)]/20 via-[var(--foreground)]/10 to-[var(--foreground)]/20 rounded-lg animate-pulse" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-5 md:h-6 w-full bg-gradient-to-r from-[var(--foreground)]/20 via-[var(--foreground)]/10 to-[var(--foreground)]/20 rounded animate-pulse" />
                    <div className="h-5 md:h-6 w-5/6 bg-gradient-to-r from-[var(--foreground)]/20 via-[var(--foreground)]/10 to-[var(--foreground)]/20 rounded animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 md:h-5 w-full bg-gradient-to-r from-[var(--foreground)]/20 via-[var(--foreground)]/10 to-[var(--foreground)]/20 rounded animate-pulse" />
                    <div className="h-4 md:h-5 w-full bg-gradient-to-r from-[var(--foreground)]/20 via-[var(--foreground)]/10 to-[var(--foreground)]/20 rounded animate-pulse" />
                    <div className="h-4 md:h-5 w-4/5 bg-gradient-to-r from-[var(--foreground)]/20 via-[var(--foreground)]/10 to-[var(--foreground)]/20 rounded animate-pulse" />
                  </div>
                  <div className="h-0.5 w-full bg-gradient-to-r from-[var(--foreground)]/20 via-[var(--foreground)]/10 to-transparent rounded-full animate-pulse" />
                </>
              ) : (
                <>
                  {/* Title */}
                  <h1 
                    ref={headerTitleRef}
                    className={`text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground)] leading-[1.1] ${isRtl ? "font-cairo" : "font-antonio"}`}
                  >
                    {currentNewsData?.title || ""}
                  </h1>

                  {/* Subtitle */}
                  {currentNewsData?.subtitle && (
                    <p 
                      ref={headerSubtitleRef}
                      className="text-lg md:text-xl lg:text-2xl text-[var(--foreground)]/80 leading-relaxed font-medium"
                    >
                      {currentNewsData.subtitle}
                    </p>
                  )}

                  {/* Description */}
                  {currentNewsData?.description && (
                    <p 
                      ref={descriptionRef}
                      className="text-base md:text-lg text-[var(--foreground)]/70 leading-relaxed"
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

