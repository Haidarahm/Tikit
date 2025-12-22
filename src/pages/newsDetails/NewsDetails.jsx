import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useI18nLanguage } from '../../store/I18nLanguageContext'
import { useNewsStore } from '../../store/newsStore'
import NewsDetailsHeader from './NewsDetailsHeader'
import Footer from '../../components/Footer'
gsap.registerPlugin(ScrollTrigger)

const NewsDetails = () => {
  const { id } = useParams()
  const { isRtl, language } = useI18nLanguage()
  const { loadNewsDetails, newsDetails, loading } = useNewsStore()
  const [detailsData, setDetailsData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const loadingRef = useRef(false)
  
  const sectionRef = useRef(null)
  const paragraphsRef = useRef([])

  // Load news details
  useEffect(() => {
    if (!id) {
      setIsLoading(false)
      return
    }

    // Check if data already exists in store for this id
    const existingData = newsDetails[id]
    if (existingData && Array.isArray(existingData)) {
      setDetailsData(existingData)
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
        const response = await loadNewsDetails(id, language)
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
  }, [id, language, newsDetails])

  // Get current details data
  const paragraphes = detailsData || (newsDetails[id] && Array.isArray(newsDetails[id]) ? newsDetails[id] : [])

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

        // Title animation
        if (titleEl) {
          gsap.fromTo(
            titleEl,
            { opacity: 0, x: -50 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: paragraphEl,
                start: "top 80%",
                once: true,
              },
            }
          )
        }

        // Subtitle animation
        if (subtitleEl) {
          gsap.fromTo(
            subtitleEl,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              delay: 0.1,
              scrollTrigger: {
                trigger: paragraphEl,
                start: "top 80%",
                once: true,
              },
            }
          )
        }

        // Description animation
        if (descriptionEl) {
          gsap.fromTo(
            descriptionEl,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power2.out",
              delay: 0.2,
              scrollTrigger: {
                trigger: paragraphEl,
                start: "top 80%",
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
            { opacity: 0, scale: 0.9, y: 50 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              stagger: 0.15,
              delay: 0.3,
              scrollTrigger: {
                trigger: paragraphEl,
                start: "top 80%",
                once: true,
              },
            }
          )

          // Parallax effect on images
          images.forEach((img) => {
            gsap.to(img, {
              yPercent: -20,
              ease: "none",
              scrollTrigger: {
                trigger: img,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            })
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [paragraphes, isLoading])

  return (
    <div data-nav-color="black" ref={sectionRef} className="news-details w-full overflow-hidden   ">
      {/* Header Section */}
      <NewsDetailsHeader />

      {/* Paragraphs Section */}
      <div className="max-w-6xl mx-auto space-y-20 md:space-y-32">
        {isLoading ? (
          // Skeleton Loaders
          Array.from({ length: 3 }).map((_, skeletonIndex) => (
            <div key={`skeleton-${skeletonIndex}`} className="paragraph-item">
              {/* Title and Subtitle Skeleton */}
              <div className="mb-6 md:mb-8 space-y-4">
                <div className="h-8 md:h-10 w-3/4 bg-gradient-to-r from-[var(--foreground)]/20 via-[var(--foreground)]/10 to-[var(--foreground)]/20 rounded-lg animate-pulse" />
                <div className="h-6 md:h-7 w-1/2 bg-gradient-to-r from-[var(--foreground)]/20 via-[var(--foreground)]/10 to-[var(--foreground)]/20 rounded-lg animate-pulse" />
              </div>

              {/* Description Skeleton */}
              <div className="mb-8 md:mb-12 space-y-3">
                <div className="h-5 md:h-6 w-full bg-gradient-to-r from-[var(--foreground)]/20 via-[var(--foreground)]/10 to-[var(--foreground)]/20 rounded animate-pulse" />
                <div className="h-5 md:h-6 w-full bg-gradient-to-r from-[var(--foreground)]/20 via-[var(--foreground)]/10 to-[var(--foreground)]/20 rounded animate-pulse" />
                <div className="h-5 md:h-6 w-5/6 bg-gradient-to-r from-[var(--foreground)]/20 via-[var(--foreground)]/10 to-[var(--foreground)]/20 rounded animate-pulse" />
              </div>

              {/* Images Skeleton */}
              <div className="paragraph-images">
                <div className="w-full h-[400px] md:h-[600px] bg-gradient-to-br from-gray-300/20 dark:from-gray-700/40 via-gray-200/30 dark:via-gray-600/30 to-gray-300/20 dark:to-gray-700/40 rounded-3xl animate-pulse" />
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
                <div className="mb-6 md:mb-8">
                  {paragraph.title && (
                    <h2 className={`paragraph-title text-2xl md:text-4xl font-bold text-[var(--foreground)] mb-3 ${isRtl ? "font-cairo" : "font-antonio"}`}>
                      {paragraph.title}
                    </h2>
                  )}
                  {paragraph.subtitle && (
                    <h3 className="paragraph-subtitle text-lg md:text-xl text-[var(--foreground)]/60 mb-4">
                      {paragraph.subtitle}
                    </h3>
                  )}
                </div>

                {/* Description */}
                {paragraph.description && (
                  <p className="paragraph-description text-base md:text-lg text-[var(--foreground)]/80 leading-relaxed mb-8 md:mb-12">
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
                          className="w-full h-[400px] md:h-[600px] object-cover rounded-3xl"
                          loading="lazy"
                        />
                      </div>
                    ) : imageCount === 2 ? (
                      // Two images - Side by side with gap
                      <div data-nav-color="white" className="two-images-container grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <img
                          src={paragraph.images[0]}
                          alt={`${paragraph.title || 'News'} - Image 1`}
                          className="w-full h-[300px] md:h-[500px] object-cover rounded-2xl"
                          loading="lazy"
                        />
                        <img
                          src={paragraph.images[1]}
                          alt={`${paragraph.title || 'News'} - Image 2`}
                          className="w-full h-[300px] md:h-[500px] object-cover rounded-2xl"
                          loading="lazy"
                        />
                      </div>
                    ) : imageCount >= 3 ? (
                      // Three images - Grid layout
                      <div className="three-images-container grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        {paragraph.images.slice(0, 3).map((img, imgIndex) => (
                          <img
                            key={imgIndex}
                            src={img}
                            alt={`${paragraph.title || 'News'} - Image ${imgIndex + 1}`}
                            className="w-full h-[250px] md:h-[400px] object-cover rounded-xl"
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
          <div className="text-center py-20">
            <p className="text-[var(--foreground)]/60 text-lg">
              No content available for this news item.
            </p>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  )
}

export default NewsDetails
