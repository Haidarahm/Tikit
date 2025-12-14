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
  
  // Use #363737 for stroke in light mode, otherwise use the provided strokeColor
  const currentStrokeColor = theme === 'light' ? '#363737' : strokeColor
  const currentPinColor = pinColor
  const svgRef = useRef(null)
  const containerRef = useRef(null)
  const leftSectionRef = useRef(null)
  const lastHoveredIdRef = useRef(null)
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


  // GSAP Animations
 

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
            
          </div>
        </div>
      </div>

   
    </section>
  )
}

export default Map
