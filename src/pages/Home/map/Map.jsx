import React, { useState, useEffect, useRef } from 'react'
import mapXml from './map.xml?raw'

const Map = ({ 
  strokeColor = '#4ec0c3', 
  pinColor = '#4baaad'
}) => {
  const [currentStrokeColor, setCurrentStrokeColor] = useState(strokeColor)
  const [currentPinColor, setCurrentPinColor] = useState(pinColor)
  const svgRef = useRef(null)
  const [svgContent, setSvgContent] = useState('')

  // Load SVG content
  useEffect(() => {
    setSvgContent(mapXml)
  }, [])

  // Update colors in the SVG
  useEffect(() => {
    if (svgRef.current) {
      const svgElement = svgRef.current.querySelector('svg')
      if (svgElement) {
        // Find or create a style element for dynamic colors
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
        
        // Update the dynamic style with current colors
        dynamicStyle.textContent = `
          .st17, .st18, .st19 {
            stroke: ${currentStrokeColor} !important;
          }
          .st0, .st1, .st2, .st3, .st4, .st34, .st42, .st44 {
            fill: ${currentPinColor} !important;
          }
        `
      }
    }
  }, [currentStrokeColor, currentPinColor, svgContent])

  useEffect(() => {
    setCurrentStrokeColor(strokeColor)
  }, [strokeColor])

  useEffect(() => {
    setCurrentPinColor(pinColor)
  }, [pinColor])

  return (
    <div className='w-full h-screen relative overflow-hidden'>
      <div 
        ref={svgRef}
        dangerouslySetInnerHTML={{ __html: svgContent }}
        className='w-full h-full [&>svg]:w-full [&>svg]:h-full [&>svg]:object-contain'
      />
    </div>
  )
}

export default Map
