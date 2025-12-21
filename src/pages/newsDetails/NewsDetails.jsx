import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useI18nLanguage } from '../../store/I18nLanguageContext'
import NewsDetailsHeader from './NewsDetailsHeader'

gsap.registerPlugin(ScrollTrigger)

const NewsDetails = () => {
  const { isRtl } = useI18nLanguage()
  const sectionRef = useRef(null)
  const paragraphsRef = useRef([])

  // Fake data array - paragraphes (as requested)
  const paragraphes = [
    {
      title: "The Future of Digital Marketing",
      subtitle: "Exploring New Trends",
      description: "Digital marketing continues to evolve at a rapid pace, with new technologies and strategies emerging constantly. Brands are now focusing more on authentic connections with their audiences, leveraging data-driven insights to create personalized experiences that resonate on a deeper level.",
      images: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
      ]
    },
    {
      title: "Social Media Revolution",
      subtitle: "Platforms That Changed Everything",
      description: "Social media platforms have transformed how we communicate, share information, and build communities. From Facebook's early days to TikTok's meteoric rise, each platform has brought unique features that have shaped digital culture and marketing strategies worldwide.",
      images: [
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1611162616305-c69b3c7b5c0f?w=800&h=600&fit=crop"
      ]
    },
    {
      title: "Content Creation in 2024",
      subtitle: "The Art of Storytelling",
      description: "Content creation has become an art form that combines creativity, strategy, and technology. Today's creators use advanced tools and platforms to tell compelling stories that engage audiences across multiple channels, from video content to interactive experiences.",
      images: [
        "https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=800&h=600&fit=crop"
      ]
    },
    {
      title: "Influencer Marketing Growth",
      subtitle: "Building Authentic Partnerships",
      description: "Influencer marketing has grown from a niche strategy to a mainstream marketing channel. Brands are now partnering with creators who align with their values, creating authentic content that drives engagement and conversions while building long-term relationships with audiences.",
      images: [
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop"
      ]
    },
    {
      title: "Data Analytics and Insights",
      subtitle: "Making Informed Decisions",
      description: "The power of data analytics cannot be overstated in modern marketing. By analyzing consumer behavior, engagement metrics, and conversion patterns, brands can make informed decisions that optimize their marketing efforts and maximize return on investment.",
      images: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
      ]
    },
    {
      title: "Brand Identity Evolution",
      subtitle: "Creating Memorable Experiences",
      description: "Brand identity goes beyond logos and color schemes. It encompasses the entire customer experience, from first interaction to long-term loyalty. Successful brands create cohesive narratives that connect emotionally with their target audiences across all touchpoints.",
      images: [
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop"
      ]
    }
  ]

  useEffect(() => {
    if (!sectionRef.current) return

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
  }, [])

  return (
    <div data-nav-color="black" ref={sectionRef} className="news-details w-full overflow-hidden py-12 md:py-20 px-4 md:px-8">
      {/* Header Section */}
      <NewsDetailsHeader />

      {/* Paragraphs Section */}
      <div className="max-w-6xl mx-auto space-y-20 md:space-y-32">
        {paragraphes.map((paragraph, index) => {
          const imageCount = paragraph.images.length
          
          return (
            <div
              key={index}
              ref={(el) => (paragraphsRef.current[index] = el)}
              className="paragraph-item"
            >
              {/* Title and Subtitle */}
              <div className="mb-6 md:mb-8">
                <h2 className={`paragraph-title text-2xl md:text-4xl font-bold text-[var(--foreground)] mb-3 ${isRtl ? "font-cairo" : "font-antonio"}`}>
                  {paragraph.title}
                </h2>
                <h3 className="paragraph-subtitle text-lg md:text-xl text-[var(--foreground)]/60 mb-4">
                  {paragraph.subtitle}
                </h3>
              </div>

              {/* Description */}
              <p className="paragraph-description text-base md:text-lg text-[var(--foreground)]/80 leading-relaxed mb-8 md:mb-12">
                {paragraph.description}
              </p>

              {/* Images Container - Different layouts based on image count */}
              <div className="paragraph-images">
                {imageCount === 1 ? (
                  // Single image - Full width with rounded corners
                  <div className="single-image-container">
                    <img
                      src={paragraph.images[0]}
                      alt={`${paragraph.title} - Image 1`}
                      className="w-full h-[400px] md:h-[600px] object-cover rounded-3xl"
                      loading="lazy"
                    />
                  </div>
                ) : imageCount === 2 ? (
                  // Two images - Side by side with gap
                  <div className="two-images-container grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <img
                      src={paragraph.images[0]}
                      alt={`${paragraph.title} - Image 1`}
                      className="w-full h-[300px] md:h-[500px] object-cover rounded-2xl"
                      loading="lazy"
                    />
                    <img
                      src={paragraph.images[1]}
                      alt={`${paragraph.title} - Image 2`}
                      className="w-full h-[300px] md:h-[500px] object-cover rounded-2xl"
                      loading="lazy"
                    />
                  </div>
                ) : imageCount === 3 ? (
                  // Three images - Grid layout with one larger image
                  <div className="three-images-container grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    <img
                      src={paragraph.images[0]}
                      alt={`${paragraph.title} - Image 1`}
                      className="w-full h-[250px] md:h-[400px] object-cover rounded-xl"
                      loading="lazy"
                    />
                    <img
                      src={paragraph.images[1]}
                      alt={`${paragraph.title} - Image 2`}
                      className="w-full h-[250px] md:h-[400px] object-cover rounded-xl"
                      loading="lazy"
                    />
                    <img
                      src={paragraph.images[2]}
                      alt={`${paragraph.title} - Image 3`}
                      className="w-full h-[250px] md:h-[400px] object-cover rounded-xl"
                      loading="lazy"
                    />
                  </div>
                ) : null}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default NewsDetails
