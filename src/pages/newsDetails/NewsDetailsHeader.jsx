import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useI18nLanguage } from '../../store/I18nLanguageContext'

gsap.registerPlugin(ScrollTrigger)

const NewsDetailsHeader = () => {
  const { isRtl } = useI18nLanguage()
  const headerRef = useRef(null)
  const headerImageRef = useRef(null)
  const headerTitleRef = useRef(null)
  const headerSubtitleRef = useRef(null)
  const descriptionRef = useRef(null)
  const badgeRef = useRef(null)
  const dateRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    // Set initial states for header elements
    gsap.set(headerImageRef.current, { opacity: 0, scale: 1.08, y: 30 })
    gsap.set(headerTitleRef.current, { opacity: 0, y: 50 })
    gsap.set(headerSubtitleRef.current, { opacity: 0, y: 30 })
    gsap.set(descriptionRef.current, { opacity: 0, y: 30 })
    gsap.set(badgeRef.current, { opacity: 0, scale: 0.9, y: 20 })
    gsap.set(dateRef.current, { opacity: 0, x: isRtl ? 30 : -30 })
    gsap.set(lineRef.current, { scaleX: 0 })

    // Header animations - run immediately on first render
    const headerTl = gsap.timeline({ defaults: { ease: "power3.out" } })
    
    headerTl
      .to(headerImageRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
      })
      .to(badgeRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.7,
      }, "-=0.9")
      .to(dateRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.8,
      }, "-=0.7")
      .to(headerTitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      }, "-=0.5")
      .to(headerSubtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
      }, "-=0.7")
      .to(descriptionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
      }, "-=0.6")
      .to(lineRef.current, {
        scaleX: 1,
        duration: 0.8,
        ease: "power2.out",
      }, "-=0.4")

    // Parallax effect on scroll for image
    gsap.to(headerImageRef.current?.querySelector('img'), {
      scale: 1.08,
      ease: "none",
      scrollTrigger: {
        trigger: headerImageRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.2,
      },
    })

    return () => {
      headerTl.kill()
    }
  }, [isRtl])

  return (
    <header
      ref={headerRef}
      className="relative w-full mb-20 md:mb-28 pt-10"
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
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&fit=crop"
                alt="News Header"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/50" />
              
              {/* Badge and Date Overlay */}
              <div className={`absolute ${isRtl ? 'top-6 right-6 md:top-8 md:right-8' : 'top-6 left-6 md:top-8 md:left-8'} flex flex-col gap-3 z-10`}>
                <div
                  ref={badgeRef}
                  className="inline-flex items-center px-5 py-2.5 rounded-full bg-gradient-to-r from-[#6ACBCC] to-[#1C6F6C] text-white text-sm md:text-base font-semibold backdrop-blur-md shadow-xl border border-white/20"
                >
                  Digital Marketing
                </div>
                <div
                  ref={dateRef}
                  className="text-white text-sm md:text-base font-medium bg-black/50 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10 shadow-lg"
                >
                  January 15, 2024
                </div>
              </div>
            </div>
          </div>

          {/* Content Section - Takes 4 columns on large screens */}
          <div className="lg:col-span-4 flex flex-col justify-center lg:pt-8">
            <div className="space-y-6 md:space-y-8">
              {/* Title */}
              <h1 
                ref={headerTitleRef}
                className={`text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground)] leading-[1.1] ${isRtl ? "font-cairo" : "font-antonio"}`}
              >
                Breaking News: The Latest in Digital Marketing
              </h1>

              {/* Subtitle */}
              <p 
                ref={headerSubtitleRef}
                className="text-lg md:text-xl lg:text-2xl text-[var(--foreground)]/80 leading-relaxed font-medium"
              >
                Exploring New Trends and Innovations
              </p>

              {/* Description */}
              <p 
                ref={descriptionRef}
                className="text-base md:text-lg text-[var(--foreground)]/70 leading-relaxed"
              >
                Discover the trends, strategies, and innovations shaping the future of marketing. Learn how brands are leveraging new technologies to create authentic connections and drive meaningful engagement.
              </p>

              {/* Decorative Line */}
              <div 
                ref={lineRef}
                className="w-full h-0.5 bg-gradient-to-r from-[#6ACBCC] via-[#1C6F6C] to-transparent rounded-full origin-left"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default NewsDetailsHeader

