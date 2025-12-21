import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useI18nLanguage } from '../../store/I18nLanguageContext'

const NewsDetailsHeader = () => {
  const { isRtl } = useI18nLanguage()
  const headerImageRef = useRef(null)
  const headerTitleRef = useRef(null)
  const headerSubtitleRef = useRef(null)

  useEffect(() => {
    // Set initial states for header elements
    gsap.set(headerImageRef.current, { opacity: 0, scale: 1.1, clipPath: "inset(0 0 100% 0)" })
    gsap.set(headerTitleRef.current, { opacity: 0, y: 50 })
    gsap.set(headerSubtitleRef.current, { opacity: 0, y: 30 })

    // Header animations - run immediately on first render
    const headerTl = gsap.timeline({ defaults: { ease: "power2.out" } })
    
    headerTl
      .to(headerImageRef.current, {
        opacity: 1,
        scale: 1,
        clipPath: "inset(0 0 0% 0)",
        duration: 1.2,
        ease: "power3.out",
      })
      .to(headerTitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, "-=0.6")
      .to(headerSubtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, "-=0.6")

    return () => {
      headerTl.kill()
    }
  }, [])

  return (
    <div className="max-w-6xl mx-auto mb-16 md:mb-24">
      <div 
        ref={headerImageRef}
        className="header-image-container mb-8 rounded-2xl overflow-hidden"
      >
        <img
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop"
          alt="News Header"
          className="w-full h-[300px] md:h-[500px] object-cover"
          loading="eager"
        />
      </div>
      <h1 
        ref={headerTitleRef}
        className={`text-3xl md:text-5xl font-bold text-[var(--foreground)] mb-4 ${isRtl ? "font-cairo" : "font-antonio"}`}
      >
        Breaking News: The Latest in Digital Marketing
      </h1>
      <p 
        ref={headerSubtitleRef}
        className="text-lg md:text-xl text-[var(--foreground)]/70"
      >
        Discover the trends, strategies, and innovations shaping the future of marketing
      </p>
    </div>
  )
}

export default NewsDetailsHeader

