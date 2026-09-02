'use client'

import { useEffect, useState } from 'react'

export function SplashScreen() {
  const [show, setShow] = useState(true)
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    // Ensure this runs only on client
    const hasShown = sessionStorage.getItem('splash_shown')
    
    // Uncomment this if you want it to ONLY show once per session:
    if (hasShown) {
       setShow(false)
       return
    }

    // Start fade out after letters have appeared (e.g. 5 letters * 200ms = 1000ms + 1000ms pause)
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true)
    }, 2200)

    // completely remove from DOM after fade out transition (500ms)
    const removeTimer = setTimeout(() => {
      setShow(false)
      sessionStorage.setItem('splash_shown', 'true')
    }, 2700)

    return () => {
      clearTimeout(fadeOutTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  if (!show) return null

  const word = "Dilya"

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-all duration-500 ease-in-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex text-5xl sm:text-7xl font-script text-primary">
        {word.split('').map((letter, index) => (
          <span
            key={index}
            className="opacity-0 animate-splash-letter"
            style={{ 
              animationDelay: `${index * 150}ms`, 
              animationFillMode: 'forwards' 
            }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  )
}
