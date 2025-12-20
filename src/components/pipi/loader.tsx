"use client"

import { useEffect, useState } from "react"

// All assets that need to be preloaded
const ASSETS_TO_LOAD = [
  "/pipi-text.png",
  "/pipi-2.png",
  "/floor-mud.png",
  "/floor-marble.png",
  "/koin-heads.png",
  "/koin-tail.png",
]

interface LoaderProps {
  onLoadComplete: () => void
}

export default function Loader({ onLoadComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0)
  const [loadedCount, setLoadedCount] = useState(0)

  useEffect(() => {
    let loaded = 0
    const total = ASSETS_TO_LOAD.length

    const preloadImage = (src: string): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image()
        img.onload = () => {
          loaded++
          setLoadedCount(loaded)
          setProgress(Math.round((loaded / total) * 100))
          resolve()
        }
        img.onerror = () => {
          // Still count as loaded to prevent hanging
          loaded++
          setLoadedCount(loaded)
          setProgress(Math.round((loaded / total) * 100))
          resolve()
        }
        img.src = src
      })
    }

    const loadAllAssets = async () => {
      await Promise.all(ASSETS_TO_LOAD.map(preloadImage))

      // Small delay for smooth transition
      setTimeout(() => {
        onLoadComplete()
      }, 500)
    }

    loadAllAssets()
  }, [onLoadComplete])

  return (
    <div className="fixed inset-0 z-[9999] bg-[#f8e8f0] flex flex-col items-center justify-center">
      {/* Animated PIPI text */}
      <div className="relative mb-8">
        <img
          src="/pipi-text.png"
          alt="PIPI"
          className="w-48 md:w-72 h-auto"
          style={{
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        />
      </div>

      {/* Flipping coin loader */}
      <div className="relative w-20 h-20 mb-8" style={{ perspective: "200px" }}>
        <div
          className="w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            animation: "coinFlip 1s ease-in-out infinite",
          }}
        >
          <img
            src="/koin-heads.png"
            alt="loading"
            className="absolute inset-0 w-full h-full object-contain"
            style={{ backfaceVisibility: "hidden" }}
          />
          <img
            src="/koin-tail.png"
            alt="loading"
            className="absolute inset-0 w-full h-full object-contain"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          />
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-64 md:w-80 h-4 bg-white border-2 border-black rounded-full overflow-hidden shadow-[4px_4px_0px_0px_#000]">
        <div
          className="h-full bg-pink-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Progress text */}
      <p className="mt-4 text-lg font-bold text-black">
        {progress}%
      </p>

      {/* Loading message */}
      <p className="mt-2 text-sm text-pink-600 font-medium animate-pulse">
        {progress < 100 ? "Loading treasures..." : "Ready!"}
      </p>
    </div>
  )
}
