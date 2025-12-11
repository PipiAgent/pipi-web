"use client"

import { useEffect, useState } from "react"

import SplashScreen from "./splash-screen"

interface SplashWrapperProps {
  children: React.ReactNode
}

export function SplashWrapper({ children }: SplashWrapperProps) {
  const [showSplash, setShowSplash] = useState(true)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Check if user has already seen the splash this session
    const hasVisited = sessionStorage.getItem("pipi_visited")
    if (hasVisited) {
      setShowSplash(false)
    }
  }, [])

  const handleSplashComplete = () => {
    setShowSplash(false)
  }

  // Don't render anything until client-side hydration is complete
  if (!isClient) {
    return null
  }

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />
  }

  return <>{children}</>
}
