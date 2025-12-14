import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'
import { useI18nLanguage } from '../../../store/I18nLanguageContext'
import mapXml from './map.xml?raw'
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

  useEffect(() => {
    if (!mapContainerRef.current) return

    const container = mapContainerRef.current
    const svg = container.querySelector('svg')
    if (!svg) return

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
    
    // Set markers and pins with scale 0 for bounce effect
    gsap.set([...smallMarkers, ...largeMarkers, ...pins], { 
      opacity: 0,
      visibility: 'hidden',
      scale: 0
    })

    // Prepare map stroke paths for draw animation
    mapStrokes.forEach((path) => {
      try {
        if (path.getTotalLength) {
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
        gsap.set(path, { opacity: 0, visibility: 'hidden' })
      }
    })

    // Prepare destination lines for draw animation
    destinationLines.forEach((path) => {
      try {
        if (path.getTotalLength) {
          const length = path.getTotalLength()
          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
            opacity: 1,
            visibility: 'visible'
          })
        }
      } catch (e) {
        gsap.set(path, { opacity: 0, visibility: 'hidden' })
      }
    })

    // Create the main timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
        once: true
      }
    })

    // Phase 1: Draw map strokes smoothly (2 seconds)
    tl.to(mapStrokes, {
      strokeDashoffset: 0,
      duration: 2,
      ease: 'power1.inOut',
      stagger: {
        each: 0.03,
        from: 'start'
      }
    })

    // Phase 2: Draw destination lines with stagger (start after map is 60% done)
    .to(destinationLines, {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: 'power2.out',
      stagger: {
        each: 0.15,
        from: 'start'
      }
    }, '-=0.8')

    // Phase 3: Fade in small markers along the routes
    .to(smallMarkers, {
      opacity: 1,
      visibility: 'visible',
      scale: 1,
      duration: 0.4,
      ease: 'back.out(1.7)',
      stagger: {
        each: 0.1,
        from: 'start'
      }
    }, '-=0.5')

    // Phase 4: Fade in large endpoint markers
    .to(largeMarkers, {
      opacity: 1,
      visibility: 'visible',
      scale: 1,
      duration: 0.5,
      ease: 'back.out(1.7)',
      stagger: {
        each: 0.12,
        from: 'start'
      }
    }, '-=0.3')

    // Phase 5: Pins appear with bounce effect (at the end)
    .to(pins, {
      opacity: 1,
      visibility: 'visible',
      scale: 1,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
      stagger: {
        each: 0.15,
        from: 'random'
      }
    }, '-=0.2')

    // Phase 6: Text labels fade in last
    .to(textLabels, {
      opacity: 1,
      visibility: 'visible',
      duration: 0.5,
      ease: 'power2.out',
      stagger: {
        each: 0.06,
        from: 'start'
      }
    }, '-=0.3')

    animationRef.current = tl

    return () => {
      if (animationRef.current) {
        animationRef.current.kill()
      }
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars?.trigger === sectionRef.current) {
          trigger.kill()
        }
      })
    }
  }, [])

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
      className='tikit-map-section w-full min-h-screen relative overflow-hidden bg-[var(--background)] py-16 md:py-24'
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
        /* Destination route lines */
        .tikit-map-section .tikit-map-container svg .cls-3,
        .tikit-map-section .tikit-map-container svg .cls-4,
        .tikit-map-section .tikit-map-container svg .cls-5 {
          stroke: #4ec0c3;
          stroke-width: 2;
          fill: none;
        }
        /* Small ellipse markers */
        .tikit-map-section .tikit-map-container svg .cls-1 {
          fill: #4ec0c3;
          transform-origin: center center;
          transform-box: fill-box;
        }
        /* Large ellipse markers */
        .tikit-map-section .tikit-map-container svg .cls-7 {
          fill: #4ec0c3;
          transform-origin: center center;
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
            <div 
              ref={mapContainerRef}
              className='tikit-map-container w-full h-full'
              dangerouslySetInnerHTML={{ __html: mapXml }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Map
