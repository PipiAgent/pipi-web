"use client"

import { useEffect, useState } from "react"

import "@/styling/pipi.css"

import PipiGame from "./pipi-game"

interface SplashScreenProps {
  onComplete: () => void
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [showSkip, setShowSkip] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  // Show skip button after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkip(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const handleComplete = () => {
    setIsExiting(true)
    setTimeout(() => {
      // Set session flag
      if (typeof window !== "undefined") {
        sessionStorage.setItem("pipi_visited", "true")
      }
      onComplete()
    }, 500)
  }

  const handleSkip = () => {
    handleComplete()
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ff69b422_1px,transparent_1px),linear-gradient(to_bottom,#ff69b422_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-6xl opacity-20 animate-float">
        <span className="text-main">
          {"\u03C0"}
        </span>
      </div>
      <div className="absolute bottom-10 right-10 text-6xl opacity-20 animate-float" style={{ animationDelay: "1s" }}>
        <span className="text-main">
          {"\u03C0"}
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-4">
        {/* Title */}
        <div className="text-center mb-4">
          <h1 className="text-4xl md:text-6xl font-heading text-main mb-2 glitch-wrapper" data-text="$PIPI">
            $PIPI
          </h1>
          <p className="text-foreground/70 text-sm md:text-base">
            Escape the bear market... if you can
          </p>
        </div>

        {/* Game container */}
        <div className="relative max-w-full overflow-hidden">
          <div className="scale-[0.5] sm:scale-75 md:scale-100 origin-center">
            <PipiGame onGameComplete={handleComplete} />
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center text-sm text-foreground/60 mt-2">
          <p>
            <span className="text-main font-bold">SPACE</span> / <span className="text-main font-bold">CLICK</span> / <span className="text-main font-bold">TAP</span> to jump
          </p>
          <p className="mt-1">Avoid red candles. Collect diamonds.</p>
        </div>

        {/* Skip button */}
        {showSkip && (
          <button
            onClick={handleSkip}
            className="absolute bottom-4 right-4 text-xs text-foreground/40 hover:text-foreground/70 transition-colors underline"
          >
            Skip to site →
          </button>
        )}
      </div>

      {/* Bottom tagline */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
        <p className="text-main/60 text-xs">
          Feels irrational man... {"\u03C0"}
          <span className="text-xs">.</span>
          {"\u03C0"}
        </p>
      </div>
    </div>
  )
}
