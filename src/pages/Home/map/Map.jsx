import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'
import { useI18nLanguage } from '../../../store/I18nLanguageContext'
import { useTheme } from '../../../store/ThemeContext'

gsap.registerPlugin(ScrollTrigger)

const Map = () => {
  const { theme } = useTheme()
  const { t } = useTranslation()
  const { isRtl } = useI18nLanguage()
  const titleFont = isRtl === "true" ? "font-cairo" : "font-antonio"
  
  const sectionRef = useRef(null)
  const mapContainerRef = useRef(null)
  const animationRef = useRef(null)
  const [mapXml, setMapXml] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Load map XML dynamically when component is about to be visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting && !mapXml) {
            try {
              setIsLoading(true)
              const response = await import('./map.xml?raw')
              setMapXml(response.default)
              setIsLoading(false)
              observer.disconnect()
            } catch (error) {
              console.error('Failed to load map:', error)
              setIsLoading(false)
              observer.disconnect()
            }
          }
        })
      },
      {
        rootMargin: '400px', // Start loading 400px before component is visible
        threshold: 0.01
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [mapXml])

  useEffect(() => {
    if (!mapContainerRef.current || !mapXml) return
    if (!sectionRef.current) return

    const section = sectionRef.current
    const container = mapContainerRef.current
    
    // Check if elements are still connected to DOM
    if (!section.isConnected || !container.isConnected) return

    const svg = container.querySelector('svg')
    if (!svg) return

    // Clean up any existing ScrollTrigger instances for this element BEFORE creating new ones
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger === section) {
        try {
          trigger.kill()
        } catch (e) {
          // Ignore errors during cleanup
        }
      }
    })

    // Use gsap.context for proper cleanup
    const ctx = gsap.context(() => {
      // Get all elements by their classes
      const mapStrokes = Array.from(svg.querySelectorAll('.cls-6')) // Main map outline
      const destinationLines = Array.from(svg.querySelectorAll('.cls-3, .cls-4, .cls-5')) // Route lines
      const smallMarkers = Array.from(svg.querySelectorAll('.cls-1')) // Small ellipse markers
      const largeMarkers = Array.from(svg.querySelectorAll('.cls-7')) // Large ellipse markers
      const pins = Array.from(svg.querySelectorAll('.cls-11')) // Location pin shapes
      const textLabels = Array.from(svg.querySelectorAll('.cls-9')) // Text labels

      // Initial state - hide everything
      gsap.set([...mapStrokes, ...destinationLines, ...textLabels], { 
        opacity: 0,
        visibility: 'hidden'
      })
      
      // Small markers: scale 0 for bounce effect
      gsap.set(smallMarkers, { 
        opacity: 0,
        visibility: 'hidden',
        scale: 0
      })
      // Large markers and pins: start below final position for fade-from-bottom
      gsap.set([...largeMarkers, ...pins], { 
        opacity: 0,
        visibility: 'hidden',
        y: 28
      })

      // Prepare map stroke paths for draw animation
      mapStrokes.forEach((path) => {
        try {
          if (path.getTotalLength && path.isConnected) {
            const length = path.getTotalLength()
            gsap.set(path, {
              strokeDasharray: length,
              strokeDashoffset: length,
              opacity: 1,
              visibility: 'visible'
            })
          }
        } catch (e) {
          // For non-path elements like polygons
          if (path.isConnected) {
            gsap.set(path, { opacity: 0, visibility: 'hidden' })
          }
        }
      })

      // Prepare destination lines for draw animation
      destinationLines.forEach((path) => {
        try {
          if (path.getTotalLength && path.isConnected) {
            const length = path.getTotalLength()
            // Clear any existing stroke-dasharray from original SVG before animating
            path.style.strokeDasharray = length
            path.style.strokeDashoffset = length
            gsap.set(path, {
              strokeDasharray: length,
              strokeDashoffset: length,
              opacity: 1,
              visibility: 'visible'
            })
          }
        } catch (e) {
          if (path.isConnected) {
            gsap.set(path, { opacity: 0, visibility: 'hidden' })
          }
        }
      })

      // Create main timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none none',
          once: true
        }
      })

      // Phase 1: Draw map strokes smoothly
      tl.to(mapStrokes, {
        strokeDashoffset: 0,
        duration: 1.8,
        ease: 'power2.inOut',
        stagger: {
          each: 0.015,
          from: 'start'
        }
      })

      // Phase 2: Draw destination lines with stagger - starts when map is 70% done
      .to(destinationLines, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: 'power2.out',
        stagger: {
          each: 0.2,
          from: 'start'
        }
      }, '-=0.6')

      // Phase 3: Small route markers pop in along paths
      .to(smallMarkers, {
        opacity: 1,
        visibility: 'visible',
        scale: 1,
        duration: 0.35,
        ease: 'back.out(2)',
        stagger: {
          each: 0.08,
          from: 'start'
        }
      }, '-=0.4')

      // Phase 3: Large endpoint markers fade in from bottom
      .to(largeMarkers, {
        opacity: 1,
        visibility: 'visible',
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
        stagger: {
          each: 0.1,
          from: 'start'
        }
      }, '-=0.15')

      // Phase 4: Location pins fade in from bottom
      .to(pins, {
        opacity: 1,
        visibility: 'visible',
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
        stagger: {
          each: 0.12,
          from: 'start'
        }
      }, '-=0.1')

      // Phase 5: Text labels fade in smoothly at end
      .to(textLabels, {
        opacity: 1,
        visibility: 'visible',
        duration: 0.4,
        ease: 'power3.out',
        stagger: {
          each: 0.04,
          from: 'start'
        }
      }, '-=0.35')

      animationRef.current = tl
    }, sectionRef)

    return () => {
      // Kill timeline first
      if (animationRef.current) {
        try {
          animationRef.current.kill()
        } catch (e) {
          // Ignore errors during cleanup
        }
        animationRef.current = null
      }
      
      // Get current section reference (may have changed)
      const currentSection = sectionRef.current
      
      // Kill ScrollTrigger instances FIRST
      ScrollTrigger.getAll().forEach((trigger) => {
        const triggerElement = trigger.trigger
        if (triggerElement === section || triggerElement === currentSection) {
          try {
            trigger.kill()
          } catch (e) {
            // Ignore errors during cleanup
          }
        }
      })
      // Skip ctx.revert on unmount - section is being removed by React, revert causes insertBefore conflict
      if (section?.isConnected && ctx) {
        try {
          ctx.revert()
        } catch (e) {
          // Ignore errors during cleanup
        }
      }
    }
  }, [mapXml])

  // Update stroke colors when theme changes
  useEffect(() => {
    if (!mapContainerRef.current) return
    
    const svg = mapContainerRef.current.querySelector('svg')
    if (!svg) return

    const mapStrokes = svg.querySelectorAll('.cls-6')
    const strokeColor = theme === 'dark' ? '#ffffff' : '#363737'
    
    mapStrokes.forEach((path) => {
      path.style.stroke = strokeColor
      path.style.strokeWidth = '2.5' // Bold strokes for map only
    })
  }, [theme])

  return (
    <section 
      ref={sectionRef}
      className='tikit-map-section w-full  relative overflow-hidden  py-16 md:py-24'
    >
      {/* Scoped styles for this component only */}
      <style>{`
        .tikit-map-section .tikit-map-container svg {
          width: 100%;
          height: auto;
          max-height: 80vh;
          overflow: visible;
        }
        /* Map strokes - bold and themed */
        .tikit-map-section .tikit-map-container svg .cls-6 {
          stroke: #363737;
          stroke-width: 2.5;
          fill: none;
        }
        .dark .tikit-map-section .tikit-map-container svg .cls-6 {
          stroke: #ffffff;
        }
        /* Destination route lines - override original dasharray for animation */
        .tikit-map-section .tikit-map-container svg .cls-3,
        .tikit-map-section .tikit-map-container svg .cls-4,
        .tikit-map-section .tikit-map-container svg .cls-5 {
          stroke: #4ec0c3;
          stroke-width: 12;
          fill: none;
        }
        /* Small ellipse markers */
        .tikit-map-section .tikit-map-container svg .cls-1 {
          fill: #4ec0c3;
          transform-origin: center center;
          transform-box: fill-box;
        }
        /* Large ellipse markers - center bottom for fade-from-bottom animation */
        .tikit-map-section .tikit-map-container svg .cls-7 {
          fill: #4ec0c3;
          transform-origin: center bottom;
          transform-box: fill-box;
        }
        /* Location pins */
        .tikit-map-section .tikit-map-container svg .cls-11 {
          fill: #4ec0c3;
          transform-origin: center bottom;
          transform-box: fill-box;
        }
        /* Text labels */
        .tikit-map-section .tikit-map-container svg .cls-9 {
          fill: var(--foreground);
        }
        /* Polygons */
        .tikit-map-section .tikit-map-container svg polygon.cls-6 {
          fill: var(--foreground);
          stroke: none;
        }
      `}</style>
      
      <div className='max-w-[1400px] mx-auto px-4 md:px-8 h-full'>
        <div className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 h-full`}>
          
          {/* Left Section - Agency Info */}
          <div className={`w-full lg:w-2/5 flex flex-col justify-center ${isRtl === "true" ? 'text-right' : ''}`}>
            <span className='animate-text text-[#4ec0c3] text-sm md:text-base font-medium tracking-widest uppercase mb-4'>
              {t('home.map.badge')}
            </span>
            
            <h2 className={`animate-text text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--foreground)] mb-6 leading-tight ${titleFont}`}>
              {t('home.map.title')}
              <span className='block text-[#4ec0c3]'>{t('home.map.titleHighlight')}</span>
            </h2>
            
            <p className='animate-text text-gray-400 text-base md:text-lg leading-relaxed mb-8 max-w-md'>
              {t('home.map.description')}
            </p>
          </div>

          {/* Right Section - Map */}
          <div className='w-full lg:w-3/5 relative'>
            {isLoading ? (
              <div className='w-full h-96 bg-gray-200/20 dark:bg-gray-800/20 rounded-lg animate-pulse flex items-center justify-center'>
                <div className='text-gray-500'>Loading map...</div>
              </div>
            ) : (
              <div 
                ref={mapContainerRef}
                className='tikit-map-container w-full h-full'
                dangerouslySetInnerHTML={{ __html: mapXml }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Map