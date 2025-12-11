import React, { useEffect, useMemo, useRef, useState } from 'react'
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
  
  // Use #363737 for stroke in light mode, otherwise use the provided strokeColor
  const currentStrokeColor = theme === 'light' ? '#363737' : strokeColor
  const currentPinColor = pinColor
  const svgRef = useRef(null)
  const containerRef = useRef(null)
  const leftSectionRef = useRef(null)
  const [svgContent] = useState(mapXml)
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

  // Update colors in the SVG
  useEffect(() => {
    if (!svgRef.current) return
    const svgElement = svgRef.current.querySelector('svg')
    if (!svgElement) return

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
      .st17, .st18, .st19 {
        stroke: ${currentStrokeColor} !important;
      }
      .st0, .st1, .st2, .st3, .st4, .st34, .st42, .st44 {
        fill: ${currentPinColor} !important;
      }
      .map-pin {
        cursor: pointer;
        filter: drop-shadow(0 0 8px ${currentPinColor}80);
        transition: filter 0.3s ease;
      }
      .map-pin:hover {
        filter: drop-shadow(0 0 15px ${currentPinColor}) drop-shadow(0 0 30px ${currentPinColor}80);
      }
    `
  }, [currentStrokeColor, currentPinColor, svgContent])

  // GSAP Animations
  useEffect(() => {
    if (!svgRef.current || !containerRef.current || !svgContent) return

    const svgElement = svgRef.current.querySelector('svg')
    if (!svgElement) return

    const cleanupFns = []

    const timeout = window.setTimeout(() => {
      const ctx = gsap.context(() => {
        // Get all stroke paths (connection lines)
        const strokePaths = svgElement.querySelectorAll('.st17, .st18, .st19')
        
        // Get the world map paths (continents outlines)
        const worldMapPaths = svgElement.querySelectorAll('.st12, .st13')
        
        // Get pin elements (the colored markers)
        const pinGroups = svgElement.querySelectorAll('.st0, .st1, .st2, .st3, .st4')
        const allPins = Array.from(pinGroups)
        
        // Get glow/marker elements (hide until animations complete) - st44, st32, st26, st30, st23, st45
        const glowElements = svgElement.querySelectorAll('.st44, .st32, .st26, .st30, .st23, .st45')

        // Add map-pin class to pins
        allPins.forEach(pin => {
          pin.classList.add('map-pin')
        })

        // ===== INITIAL STATES =====
        
        // World map paths - set up for drawing animation
        const mapStrokeColor = theme === 'light' ? '#363737' : '#ffffff'
        worldMapPaths.forEach(path => {
          if (path.getTotalLength) {
            try {
              const length = path.getTotalLength()
              gsap.set(path, {
                strokeDasharray: length,
                strokeDashoffset: length,
                opacity: 0,
                stroke: mapStrokeColor,
                strokeWidth: 0.5,
                fill: 'transparent'
              })
            } catch (e) {
              gsap.set(path, { opacity: 0 })
            }
          } else {
            gsap.set(path, { opacity: 0 })
          }
        })

        // Stroke paths (connection lines) - set up for line drawing
        strokePaths.forEach(path => {
          if (path.getTotalLength) {
            const length = path.getTotalLength()
            gsap.set(path, {
              strokeDasharray: length,
              strokeDashoffset: length,
              opacity: 0
            })
          }
        })

        // Pins - completely hidden until other animations finish
        gsap.set(allPins, {
          opacity: 0,
          scale: 0,
          y: 30,
          visibility: 'hidden',
          transformOrigin: 'center center'
        })
        
        // Glow elements (st44, st32, etc.) - completely hidden until other animations finish
        gsap.set(glowElements, {
          opacity: 0,
          scale: 0,
          visibility: 'hidden',
          transformOrigin: 'center center'
        })

        // Left section text
        if (leftSectionRef.current) {
          const textElements = leftSectionRef.current.querySelectorAll('.animate-text')
          gsap.set(textElements, {
            opacity: 0,
            y: 40
          })
        }

        // ===== SCROLL TRIGGER =====
        const trigger = ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top 75%',
          onEnter: () => {
            // Master timeline
            const masterTl = gsap.timeline()

            // ========== STEP 1: Left section text ==========
            if (leftSectionRef.current) {
              const textElements = leftSectionRef.current.querySelectorAll('.animate-text')
              masterTl.to(textElements, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.12,
                ease: 'power3.out'
              }, 0)
            }

            // ========== STEP 2: Draw the world map SUPER FAST ==========
            worldMapPaths.forEach((path, index) => {
              if (path.getTotalLength) {
                try {
                  // Draw outline very quickly
                  masterTl.to(path, {
                    strokeDashoffset: 0,
                    opacity: 1,
                    duration: 0.4,
                    ease: 'power2.out'
                  }, 0.02 + index * 0.002)
                  
                  // Fill in the continents immediately after
                  masterTl.to(path, {
                    fill: theme === 'light' ? '#363737' : '#ffffff',
                    duration: 0.2,
                    ease: 'power2.out'
                  }, 0.4 + index * 0.001)
                } catch (e) {
                  masterTl.to(path, {
                    opacity: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                  }, 0.1)
                }
              } else {
                masterTl.to(path, {
                  opacity: 1,
                  duration: 0.3,
                  ease: 'power2.out'
                }, 0.1)
              }
            })

            // ========== STEP 3: Draw connection lines (after map is complete) ==========
            const linesStartTime = 0.5 // Start quickly after map
            strokePaths.forEach((path, index) => {
              if (path.getTotalLength) {
                masterTl.to(path, {
                  strokeDashoffset: 0,
                  opacity: 1,
                  duration: 0.5,
                  ease: 'power2.inOut'
                }, linesStartTime + index * 0.08)
              }
            })

            // ========== STEP 4: Pins appear smoothly (after lines are done) ==========
            const linesEndTime = linesStartTime + (strokePaths.length * 0.08) + 0.4
            
            // First make pins visible
            masterTl.call(() => {
              allPins.forEach(pin => {
                gsap.set(pin, { visibility: 'visible' })
              })
            }, null, linesEndTime)

            // Animate pins in smoothly (NO infinite animation)
            allPins.forEach((pin, index) => {
              masterTl.to(pin, {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.5,
                ease: 'back.out(1.7)'
              }, linesEndTime + index * 0.05)
            })

            // ========== STEP 5: Glow elements (st44, st32, etc.) appear after pins ==========
            const pinsEndTime = linesEndTime + (allPins.length * 0.05) + 0.2
            
            // Make glow elements visible
            masterTl.call(() => {
              glowElements.forEach(el => {
                gsap.set(el, { visibility: 'visible' })
              })
            }, null, pinsEndTime)
            
            // Animate glow elements in smoothly
            glowElements.forEach((el, index) => {
              masterTl.to(el, {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: 'back.out(1.7)'
              }, pinsEndTime + index * 0.04)
            })

          },
          once: true
        })

        cleanupFns.push(() => trigger.kill())

        // ===== PIN HOVER HANDLERS =====
        const pinCleanup = allPins.map((pin, index) => {
          const handleMouseEnter = () => {
            const rect = pin.getBoundingClientRect()
            const containerRect = containerRef.current?.getBoundingClientRect()
            if (!containerRect) return
            
            const x = rect.left + rect.width / 2 - containerRect.left
            const y = rect.top - containerRect.top
            
            setHoverPosition({ x, y })
            setHoveredPin(locations[index] || {
              title: `Location ${index + 1}`,
              description: 'Tikit Agency global presence'
            })
            
            // Hover animation - lift up and scale
            gsap.to(pin, {
              scale: 1.5,
              y: -15,
              duration: 0.4,
              ease: 'back.out(1.7)'
            })
          }

          const handleMouseLeave = () => {
            setHoveredPin(null)
            
            // Return to normal state (no floating for pins)
            gsap.to(pin, {
              scale: 1,
              y: 0,
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
    }, 150)

    return () => {
      window.clearTimeout(timeout)
      cleanupFns.forEach(fn => fn())
    }
  }, [svgContent, theme, locations])

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
                <div key={index} className={`flex items-center gap-3 `}>
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
            
            {/* Hover Card */}
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
