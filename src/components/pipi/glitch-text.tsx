"use client"

import { useEffect, useState } from "react"

import "@/styling/pipi.css"

interface GlitchTextProps {
  text: string
  className?: string
  glitchOnHover?: boolean
  continuous?: boolean
}

export default function GlitchText({
  text,
  className = "",
  glitchOnHover = false,
  continuous = false,
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(continuous)

  useEffect(() => {
    if (continuous) {
      // Random glitch intervals
      const interval = setInterval(() => {
        setIsGlitching(true)
        setTimeout(() => {
          setIsGlitching(false)
        }, 200)
      }, 3000 + Math.random() * 2000)

      return () => clearInterval(interval)
    }
  }, [continuous])

  return (
    <span
      className={`relative inline-block ${className} ${
        isGlitching || (glitchOnHover && "hover:animate-glitch")
      }`}
      onMouseEnter={() => glitchOnHover && setIsGlitching(true)}
      onMouseLeave={() => glitchOnHover && setIsGlitching(false)}
    >
      <span className="relative z-10">{text}</span>
      {isGlitching && (
        <>
          <span
            className="absolute top-0 left-0 text-[#ff00ff] animate-glitch z-0"
            style={{ clipPath: "inset(40% 0 61% 0)" }}
            aria-hidden="true"
          >
            {text}
          </span>
          <span
            className="absolute top-0 left-0 text-[#00ffff] animate-glitch-2 z-0"
            style={{ clipPath: "inset(25% 0 58% 0)" }}
            aria-hidden="true"
          >
            {text}
          </span>
        </>
      )}
    </span>
  )
}
