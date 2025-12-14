import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTranslation } from 'react-i18next'
import { useI18nLanguage } from '../../../store/I18nLanguageContext'
import mapXml from './map.xml?raw'
import { useTheme } from '../../../store/ThemeContext'

gsap.registerPlugin(ScrollTrigger)

const Map = ({ 
  strokeColor = '#4ec0c3', 
  pinColor = '#4baaad'
}) => {
  const { theme } = useTheme()
  const { t, i18n } = useTranslation()
  const { isRtl } = useI18nLanguage()
  
  // Stroke color based on theme: white for dark, #363737 for light
  const currentStrokeColor = theme === 'dark' ? '#ffffff' : '#000'
  const currentPinColor = pinColor
  const svgRef = useRef(null)
  const containerRef = useRef(null)
  const leftSectionRef = useRef(null)
  const lastHoveredIdRef = useRef(null)
  const hasAnimatedRef = useRef(false)
  const svgContent = mapXml
  const [hoveredPin, setHoveredPin] = useState(null)
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 })

  // Get translated data
  const stats = useMemo(() => {
    const value = t('home.map.stats', { returnObjects: true })
    return Array.isArray(value) ? value : []
  }, [t, i18n.language])

  const locations = useMemo(() => {
    const value = t('home.map.locations', { returnObjects: true })
    return Array.isArray(value) ? value : []
  }, [t, i18n.language])

  // Update SVG colors dynamically based on theme
  useEffect(() => {
    if (!svgRef.current) return
    const svgElement = svgRef.current.querySelector('svg')
    if (!svgElement) return

    // Inject dynamic styles for theme-based colors
    let dynamicStyle = svgElement.querySelector('#map-dynamic-styles')
    
    if (!dynamicStyle) {
      dynamicStyle = document.createElementNS('http://www.w3.org/2000/svg', 'style')
      dynamicStyle.id = 'map-dynamic-styles'
      const defs = svgElement.querySelector('defs')
      if (defs) {
        defs.appendChild(dynamicStyle)
      } else {
        const newDefs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
        newDefs.appendChild(dynamicStyle)
        svgElement.insertBefore(newDefs, svgElement.firstChild)
      }
    }
    
    dynamicStyle.textContent = `
      /* Connection lines between pins - always #52c3c5 */
      path.cls-3, path.cls-4, path.cls-5,
      .cls-3, .cls-4, .cls-5 {
        stroke: #52c3c5 !important;
      }
      /* Map outline strokes - theme based: dark=#fff, light=#000 */
      path.cls-6, .cls-6,
      svg path:not(.cls-3):not(.cls-4):not(.cls-5):not(.cls-9):not(.cls-11) {
        stroke: ${currentStrokeColor} !important;
      }
      /* Remove strokes from cls-9 and cls-11 */
      .cls-9, .cls-11 {
        stroke: none !important;
      }
      /* Pin styles */
      circle, ellipse, .cls-1, .cls-7, .cls-9, .cls-11 {
        fill: ${currentPinColor} !important;
        cursor: pointer;
        filter: drop-shadow(0 0 8px ${currentPinColor}80);
        transition: filter 0.3s ease, transform 0.3s ease;
      }
      circle:hover, ellipse:hover {
        filter: drop-shadow(0 0 15px ${currentPinColor}) drop-shadow(0 0 30px ${currentPinColor}80);
      }
    `
  }, [svgContent, currentStrokeColor, currentPinColor])

  // GSAP Animations
  useLayoutEffect(() => {
    if (!svgRef.current || !containerRef.current || !svgContent) return
    if (hasAnimatedRef.current) return

    const svgElement = svgRef.current.querySelector('svg')
    if (!svgElement) return

    const cleanupFns = []

    const timeout = window.setTimeout(() => {
      const ctx = gsap.context(() => {
        // Get connection lines (cls-3, cls-4, cls-5) - always #52c3c5
        const connectionLines = svgElement.querySelectorAll('.cls-3, .cls-4, .cls-5')
        
        // Get map outline paths (cls-6) - theme based color
        const mapOutlines = svgElement.querySelectorAll('.cls-6')
        
        // Get all paths for animation
        const allPaths = svgElement.querySelectorAll('path')
        
        // Get pins (circles/ellipses)
        const pins = svgElement.querySelectorAll('circle, ellipse')
        const allPins = Array.from(pins)

        // ===== INITIAL STATES =====
        
        // Set initial state for connection lines - hidden with stroke dash, always #52c3c5
        connectionLines.forEach(path => {
          if (path.getTotalLength) {
            try {
              const length = path.getTotalLength()
              gsap.set(path, {
                strokeDasharray: length,
                strokeDashoffset: length,
                opacity: 0,
                stroke: '#52c3c5'
              })
            } catch (e) {
              gsap.set(path, { opacity: 0 })
            }
          } else {
            gsap.set(path, { opacity: 0 })
          }
        })
        
        // Set initial state for map outlines - hidden with stroke dash, theme-based color
        mapOutlines.forEach(path => {
          if (path.getTotalLength) {
            try {
              const length = path.getTotalLength()
              gsap.set(path, {
                strokeDasharray: length,
                strokeDashoffset: length,
                opacity: 0,
                stroke: currentStrokeColor
              })
            } catch (e) {
              gsap.set(path, { opacity: 0 })
            }
          } else {
            gsap.set(path, { opacity: 0 })
          }
        })

        // Pins - completely hidden until paths are drawn
        gsap.set(allPins, {
          opacity: 0,
          scale: 0,
          transformOrigin: 'center center'
        })

        // Left section text - hidden initially
        if (leftSectionRef.current) {
          const textElements = leftSectionRef.current.querySelectorAll('.animate-text')
          gsap.set(textElements, {
            opacity: 0,
            y: 40
          })
        }

        // ===== SCROLL TRIGGER ANIMATION =====
        const playAnimation = () => {
          if (hasAnimatedRef.current) return
          hasAnimatedRef.current = true

          const masterTl = gsap.timeline()

          // ========== STEP 1: Left section text fades in ==========
          if (leftSectionRef.current) {
            const textElements = leftSectionRef.current.querySelectorAll('.animate-text')
            masterTl.to(textElements, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: 'power3.out'
            }, 0)
          }

          // ========== STEP 2: Draw map strokes (paths) with stagger ==========
          allPaths.forEach((path, index) => {
            if (path.getTotalLength) {
              try {
                const length = path.getTotalLength()
                // First make visible
                masterTl.to(path, {
                  opacity: 1,
                  duration: 0.1,
                  ease: 'none'
                }, 0.2 + index * 0.03)
                
                // Then draw the stroke
                masterTl.to(path, {
                  strokeDashoffset: 0,
                  duration: 1.2,
                  ease: 'power2.inOut'
                }, 0.2 + index * 0.03)
              } catch (e) {
                masterTl.to(path, {
                  opacity: 1,
                  duration: 0.5,
                  ease: 'power2.out'
                }, 0.2 + index * 0.03)
              }
            } else {
              masterTl.to(path, {
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out'
              }, 0.2 + index * 0.03)
            }
          })

          // ========== STEP 3: Pins appear with stagger after paths ==========
          const pathsEndTime = 0.2 + (allPaths.length * 0.03) + 0.8 // Slightly before paths finish

          allPins.forEach((pin, index) => {
            masterTl.to(pin, {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              ease: 'back.out(1.7)'
            }, pathsEndTime + index * 0.12)

            // Add a subtle pulse after appearing
            masterTl.to(pin, {
              scale: 1.15,
              duration: 0.3,
              ease: 'power2.out'
            }, pathsEndTime + index * 0.12 + 0.6)
            
            masterTl.to(pin, {
              scale: 1,
              duration: 0.3,
              ease: 'power2.inOut'
            }, pathsEndTime + index * 0.12 + 0.9)
          })
        }

        // Create ScrollTrigger
        const trigger = ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top 75%',
          onEnter: playAnimation,
          once: true
        })

        cleanupFns.push(() => trigger.kill())

        // Check if already in view (e.g., if scrolled before component mounted)
        ScrollTrigger.refresh(true)

        // ===== PIN HOVER HANDLERS =====
        const pinCleanup = allPins.map((pin, index) => {
          const handleMouseEnter = () => {
            const rect = pin.getBoundingClientRect()
            const containerRect = containerRef.current?.getBoundingClientRect()
            if (!containerRect) return
            
            const x = rect.left + rect.width / 2 - containerRect.left
            const y = rect.top - containerRect.top
            
            const nextHovered = locations[index] || {
              title: `Location ${index + 1}`,
              description: 'Tikit Agency global presence'
            }
            const nextId = nextHovered.title

            if (lastHoveredIdRef.current !== nextId) {
              lastHoveredIdRef.current = nextId
              setHoveredPin(nextHovered)
            }

            setHoverPosition(prev => {
              if (prev.x === x && prev.y === y) return prev
              return { x, y }
            })
            
            // Hover animation - lift up and scale
            gsap.to(pin, {
              scale: 1.5,
              duration: 0.4,
              ease: 'back.out(1.7)'
            })
          }

          const handleMouseLeave = () => {
            if (lastHoveredIdRef.current) {
              lastHoveredIdRef.current = null
              setHoveredPin(null)
            }
            
            // Return to normal state
            gsap.to(pin, {
              scale: 1,
              duration: 0.3,
              ease: 'power2.out'
            })
          }

          pin.addEventListener('mouseenter', handleMouseEnter)
          pin.addEventListener('mouseleave', handleMouseLeave)

          return () => {
            pin.removeEventListener('mouseenter', handleMouseEnter)
            pin.removeEventListener('mouseleave', handleMouseLeave)
          }
        })

        cleanupFns.push(() => {
          pinCleanup.forEach(remove => remove())
        })

      }, containerRef)

      cleanupFns.push(() => ctx.revert())
    }, 100)

    return () => {
      window.clearTimeout(timeout)
      cleanupFns.forEach(fn => fn())
    }
  }, [svgContent, theme, locations, currentStrokeColor])

  // Font class based on language
  const titleFont = isRtl ? 'font-cairo' : 'font-antonio'

  return (
    <section 
      ref={containerRef} 
      className='w-full min-h-screen relative overflow-hidden bg-[var(--background)] py-16 md:py-24'
    >
      <div className='max-w-[1400px] mx-auto px-4 md:px-8 h-full'>
        <div className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 h-full`}>
          
          {/* Left Section - Agency Info */}
          <div ref={leftSectionRef} className={`w-full lg:w-2/5 flex flex-col justify-center ${isRtl ? 'text-right' : ''}`}>
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

            <div dir={isRtl ? 'rtl' : 'ltr'} className='animate-text flex flex-col gap-4'>
              {Array.isArray(stats) && stats.map((stat, index) => (
                <div key={index} className={`flex items-center gap-3`}>
                  <div className='w-2 h-2 rounded-full bg-[#4ec0c3]'></div>
                  <span className='text-[var(--foreground)] text-sm md:text-base'>{stat.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - Map */}
          <div className='w-full lg:w-3/5 relative'>
            <div 
              ref={svgRef}
              dangerouslySetInnerHTML={{ __html: svgContent }}
              className='w-full h-[400px] md:h-[500px] lg:h-[600px] [&>svg]:w-full [&>svg]:h-full [&>svg]:object-contain'
            />
            
            {/* Hover Card for Pin Info */}
            {hoveredPin && (
              <div
                className='absolute z-50 pointer-events-none'
                style={{
                  left: `${hoverPosition.x}px`,
                  top: `${hoverPosition.y}px`,
                  transform: 'translate(-50%, calc(-100% - 20px))',
                }}
              >
                <div className={`bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-5 min-w-[220px] max-w-[280px] border border-[#4ec0c3]/20 ${isRtl ? 'text-right' : ''}`}>
                  <div className={`flex items-center gap-2 mb-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <div className='w-3 h-3 rounded-full bg-[#4ec0c3] animate-pulse'></div>
                    <h3 className={`text-lg font-bold text-gray-900 ${titleFont}`}>
                      {hoveredPin.title}
                    </h3>
                  </div>
                  <p className='text-sm text-gray-600 leading-relaxed'>
                    {hoveredPin.description}
                  </p>
                </div>
                {/* Arrow */}
                <div className='absolute left-1/2 -translate-x-1/2 -bottom-2'>
                  <div className='w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-transparent border-t-white/95'></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Map
