import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useI18nLanguage } from '../../store/I18nLanguageContext'
import { useNewsStore } from '../../store/newsStore'
import SEOHead from '../../components/SEOHead'
import NewsDetailsHeader from './NewsDetailsHeader'
import Footer from '../../components/Footer'
import { getBlogSEOProps } from '../news/Content'
gsap.registerPlugin(ScrollTrigger)

const NewsDetails = () => {
  const { slug } = useParams()
  const { isRtl, language } = useI18nLanguage()
  const { loadOneNews, loadNewsDetails, newsDetails, loading } = useNewsStore()
  const [detailsData, setDetailsData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const loadingRef = useRef(false)
  
  const sectionRef = useRef(null)
  const paragraphsRef = useRef([])

  // Ensure scroll to top when component mounts (backup for scroll hook)
  useEffect(() => {
    // Reset native scroll positions
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    
    // Also handle Lenis if available
    const lenisInstance = document.querySelector("[data-lenis-root]")?.__lenis__ || window.lenis
    if (lenisInstance && typeof lenisInstance.scrollTo === "function") {
      lenisInstance.scrollTo(0, { immediate: true })
    }
  }, [slug])

  // Load news details (paragraphs) by slug - only one API call needed
  useEffect(() => {
    if (!slug) {
      setIsLoading(false)
      return
    }

    // Prevent duplicate calls
    if (loadingRef.current) {
      return
    }

    loadingRef.current = true
    setIsLoading(true)

    const fetchDetails = async () => {
      try {
        // Check if header data already exists in store (from Content.jsx or previous load)
        const existingBlogData = newsDetails[slug]
        
        // If paragraphs are already cached for this slug, use them
        if (existingBlogData?.paragraphs && Array.isArray(existingBlogData.paragraphs)) {
          setDetailsData(existingBlogData.paragraphs)
          return
        }

        // Only fetch paragraphs/details - header data should come from Content.jsx or store
        // If header data doesn't exist, it will be handled by the parent or we'll show loading state
        const response = await loadNewsDetails(slug, language)
        const data = Array.isArray(response?.data) ? response.data : []
        setDetailsData(data)
      } catch (error) {
        console.error('Failed to load news details:', error)
        setDetailsData([])
      } finally {
        setIsLoading(false)
        loadingRef.current = false
      }
    }

    fetchDetails()

    return () => {
      loadingRef.current = false
    }
  }, [slug, language, loadNewsDetails, newsDetails])

  // Get current blog header & paragraphs (both keyed by slug in store)
  const blogData = newsDetails[slug]
  const paragraphes = detailsData || (blogData?.paragraphs && Array.isArray(blogData.paragraphs) ? blogData.paragraphs : [])
  const seoProps = getBlogSEOProps(blogData, slug)

  useEffect(() => {
    if (!sectionRef.current || !paragraphes.length || isLoading) return

    const ctx = gsap.context(() => {
      // Paragraphs animations
      paragraphsRef.current.forEach((paragraphEl, index) => {
        if (!paragraphEl) return

        const titleEl = paragraphEl.querySelector('.paragraph-title')
        const subtitleEl = paragraphEl.querySelector('.paragraph-subtitle')
        const descriptionEl = paragraphEl.querySelector('.paragraph-description')
        const imagesContainer = paragraphEl.querySelector('.paragraph-images')

        // Detect mobile for responsive animations
        const isMobile = window.matchMedia("(max-width: 767px)").matches
        const startPosition = isMobile ? "top 90%" : "top 80%"

        // Title animation
        if (titleEl) {
          gsap.fromTo(
            titleEl,
            { opacity: 0, x: isMobile ? -20 : -50 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: paragraphEl,
                start: startPosition,
                once: true,
              },
            }
          )
        }

        // Subtitle animation
        if (subtitleEl) {
          gsap.fromTo(
            subtitleEl,
            { opacity: 0, y: isMobile ? 20 : 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              delay: 0.1,
              scrollTrigger: {
                trigger: paragraphEl,
                start: startPosition,
                once: true,
              },
            }
          )
        }

        // Description animation
        if (descriptionEl) {
          gsap.fromTo(
            descriptionEl,
            { opacity: 0, y: isMobile ? 30 : 40 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power2.out",
              delay: 0.2,
              scrollTrigger: {
                trigger: paragraphEl,
                start: startPosition,
                once: true,
              },
            }
          )
        }

        // Images animation
        if (imagesContainer) {
          const images = imagesContainer.querySelectorAll('img')
          gsap.fromTo(
            images,
            { opacity: 0, scale: isMobile ? 0.95 : 0.9, y: isMobile ? 30 : 50 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              stagger: isMobile ? 0.1 : 0.15,
              delay: 0.3,
              scrollTrigger: {
                trigger: paragraphEl,
                start: startPosition,
                once: true,
              },
            }
          )
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [paragraphes, isLoading])

  return (
    <>
      <SEOHead
        title={seoProps.title}
        description={seoProps.description}
        keywords={seoProps.keywords}
        canonicalUrl={seoProps.canonicalUrl}
        ogImage={seoProps.ogImage}
        ogType="article"
        articleData={seoProps.articleData}
        breadcrumbs={seoProps.breadcrumbs}
      />
      
      {/* Hidden SEO content for better indexing */}
      {blogData && (
        <section className="sr-only" aria-hidden="true">
          <h1>{blogData.title || "Blog Post"}</h1>
          {blogData.subtitle && <h2>{blogData.subtitle}</h2>}
          <p>{blogData.description || seoProps.description}</p>
          <p>
            Read this article on Tikit Agency blog. {blogData.title && `Learn about ${blogData.title.toLowerCase()}.`} 
            {`Visit tikit.ae/blogs/${slug || 'blog-post'} for more insights on influencer marketing, social media management, and digital marketing trends.`}
          </p>
        </section>
      )}
      
    <div data-nav-color="black" ref={sectionRef} className="news-details w-full overflow-hidden   ">
      {/* Header Section */}
      <NewsDetailsHeader newsData={blogData} loading={loading || isLoading} />

      {/* Paragraphs Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-32 my-8 sm:my-10 md:my-12 lg:my-16">
        {isLoading ? (
          // Skeleton Loaders
          Array.from({ length: 3 }).map((_, skeletonIndex) => (
            <div key={`skeleton-${skeletonIndex}`} className="paragraph-item">
              {/* Title and Subtitle Skeleton */}
              <div className="mb-4 sm:mb-6 md:mb-8 space-y-3 sm:space-y-4">
                <div className="h-6 sm:h-8 md:h-10 w-3/4 bg-gradient-to-r from-[var(--foreground)]/20 via-[var(--foreground)]/10 to-[var(--foreground)]/20 rounded-lg animate-pulse" />
                <div className="h-5 sm:h-6 md:h-7 w-1/2 bg-gradient-to-r from-[var(--foreground)]/20 via-[var(--foreground)]/10 to-[var(--foreground)]/20 rounded-lg animate-pulse" />
              </div>

              {/* Description Skeleton */}
              <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 space-y-2 sm:space-y-3">
                <div className="h-4 sm:h-5 md:h-6 w-full bg-gradient-to-r from-[var(--foreground)]/20 via-[var(--foreground)]/10 to-[var(--foreground)]/20 rounded animate-pulse" />
                <div className="h-4 sm:h-5 md:h-6 w-full bg-gradient-to-r from-[var(--foreground)]/20 via-[var(--foreground)]/10 to-[var(--foreground)]/20 rounded animate-pulse" />
                <div className="h-4 sm:h-5 md:h-6 w-5/6 bg-gradient-to-r from-[var(--foreground)]/20 via-[var(--foreground)]/10 to-[var(--foreground)]/20 rounded animate-pulse" />
              </div>

              {/* Images Skeleton */}
              <div className="paragraph-images">
                <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-gradient-to-br from-gray-300/20 dark:from-gray-700/40 via-gray-200/30 dark:via-gray-600/30 to-gray-300/20 dark:to-gray-700/40 rounded-2xl sm:rounded-3xl animate-pulse" />
              </div>
            </div>
          ))
        ) : paragraphes.length > 0 ? (
          paragraphes.map((paragraph, index) => {
            const imageCount = paragraph.images?.length || 0
            
            return (
              <div
                key={paragraph.id || index}
                ref={(el) => (paragraphsRef.current[index] = el)}
                className="paragraph-item"
              >
                {/* Title and Subtitle */}
                <div className="mb-4 sm:mb-6 md:mb-8">
                  {paragraph.title && (
                    <h2 className={`paragraph-title text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--foreground)] mb-2 sm:mb-3 ${isRtl ? "font-cairo" : "font-antonio"}`}>
                      {paragraph.title}
                    </h2>
                  )}
                  {paragraph.subtitle && (
                    <h3 className="paragraph-subtitle text-base sm:text-lg md:text-xl text-[var(--foreground)]/60 mb-3 sm:mb-4">
                      {paragraph.subtitle}
                    </h3>
                  )}
                </div>

                {/* Description */}
                {paragraph.description && (
                  <p className="paragraph-description text-sm sm:text-base md:text-lg text-[var(--foreground)]/80 leading-relaxed mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                    {paragraph.description}
                  </p>
                )}

                {/* Images Container - Different layouts based on image count */}
                {imageCount > 0 && (
                  <div className="paragraph-images">
                    {imageCount === 1 ? (
                      // Single image - Full width with rounded corners
                      <div data-nav-color="white" className="single-image-container">
                        <img
                          src={paragraph.images[0]}
                          alt={`${paragraph.title || 'News'} - Image 1`}
                          className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover rounded-2xl sm:rounded-3xl"
                          loading="lazy"
                        />
                      </div>
                    ) : imageCount === 2 ? (
                      // Two images - Side by side with gap
                      <div data-nav-color="white" className="two-images-container grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                        <img
                          src={paragraph.images[0]}
                          alt={`${paragraph.title || 'News'} - Image 1`}
                          className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-xl sm:rounded-2xl"
                          loading="lazy"
                        />
                        <img
                          src={paragraph.images[1]}
                          alt={`${paragraph.title || 'News'} - Image 2`}
                          className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-xl sm:rounded-2xl"
                          loading="lazy"
                        />
                      </div>
                    ) : imageCount >= 3 ? (
                      // Three images - Grid layout
                      <div className="three-images-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                        {paragraph.images.slice(0, 3).map((img, imgIndex) => (
                          <img
                            key={imgIndex}
                            src={img}
                            alt={`${paragraph.title || 'News'} - Image ${imgIndex + 1}`}
                            className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] object-cover rounded-lg sm:rounded-xl"
                            loading="lazy"
                          />
                        ))}
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            )
          })
        ) : (
          // Empty state when no data
          <div className="text-center py-12 sm:py-16 md:py-20">
            <p className="text-[var(--foreground)]/60 text-base sm:text-lg">
              No content available for this news item.
            </p>
          </div>
        )}
      </div>
      <Footer/>
    </div>
    </>
  )
}

export default NewsDetails
