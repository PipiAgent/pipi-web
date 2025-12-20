"use client"

import "@/styling/pipi.css"
import { useCallback, useEffect, useState } from "react"
import { GridScan } from "@/components/pipi/grid-scan"
import Treasures from "@/components/pipi/treasures"
import BubbleMenu from "@/components/pipi/BubbleMenu"
import Loader from "@/components/pipi/loader"

const menuItems = [
  {
    label: 'home',
    href: '#',
    ariaLabel: 'Home',
    rotation: -8,
    hoverStyles: { bgColor: '#ec4899', textColor: '#ffffff' }
  },
  {
    label: 'about',
    href: '#',
    ariaLabel: 'About',
    rotation: 8,
    hoverStyles: { bgColor: '#ec4899', textColor: '#ffffff' }
  },
  {
    label: 'projects',
    href: '#',
    ariaLabel: 'Projects',
    rotation: 8,
    hoverStyles: { bgColor: '#ec4899', textColor: '#ffffff' }
  },
  {
    label: 'blog',
    href: '#',
    ariaLabel: 'Blog',
    rotation: 8,
    hoverStyles: { bgColor: '#ec4899', textColor: '#ffffff' }
  },
  {
    label: 'contact',
    href: '#',
    ariaLabel: 'Contact',
    rotation: -8,
    hoverStyles: { bgColor: '#ec4899', textColor: '#ffffff' }
  }
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [morphProgress, setMorphProgress] = useState(0)

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  useEffect(() => {
    // Don't set up scroll handling until loading is complete
    if (isLoading) return

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      // Progress: 0 at top (marble), 1 at bottom (mud)
      // Scroll position naturally: 0 = top, maxScroll = bottom
      const progress = maxScroll > 0 ? scrollTop / maxScroll : 0
      setMorphProgress(progress)
    }

    // Start at bottom of page (in the mud)
    setTimeout(() => {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" })
      handleScroll()
    }, 0)

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isLoading])

  // Progress: 1 = bottom (mud), 0 = top (marble)
  // Bottom 67% of scroll = mud, top 33% transitions to marble
  // As user scrolls UP (progress decreases): mud fades out, marble fades in
  const mudOpacity = morphProgress > 0.33
    ? 1
    : morphProgress / 0.33

  const marbleOpacity = morphProgress > 0.33
    ? 0
    : 1 - (morphProgress / 0.33)

  // GridScan: scales up from start, fades out as floor turns to marble
  // At progress=1 (bottom/mud): scale=1, opacity=1
  // At progress=0 (top/marble): scale=2.5, opacity=0
  const gridScale = 1 + (1 - morphProgress) * 1.5 // Scale from 1 to 2.5 throughout entire scroll
  const gridOpacity = morphProgress > 0.33 ? 1 : morphProgress / 0.33

  // PiPi text: fade out and scale down as user scrolls UP (progress decreases from 1 to 0)
  // At progress=1 (bottom): fully visible, scale=1
  // At progress=0.5: starts fading and scaling
  // At progress=0: completely faded out and scaled down
  const textFadeStart = 0.7 // Start fading when scrolled 30% up from bottom
  const textOpacity = morphProgress > textFadeStart
    ? 1
    : morphProgress / textFadeStart
  const textScale = morphProgress > textFadeStart
    ? 1
    : 0.5 + (morphProgress / textFadeStart) * 0.5 // Scale from 0.5 to 1

  // Show loader while loading
  if (isLoading) {
    return <Loader onLoadComplete={handleLoadComplete} />
  }

  return (
    <main className="relative w-full" style={{ height: "3141px" }}>
      {/* GridScan background - fixed, scales up and fades as floor turns to marble */}
      <div
        className="fixed inset-0 z-0"
        style={{
          transform: `scale(${gridScale})`,
          opacity: gridOpacity,
          transition: "transform 0.15s ease-out, opacity 0.15s ease-out",
        }}
      >
        <GridScan
          sensitivity={0.55}
          lineThickness={1.5}
          linesColor="#d4c8e8"
          gridScale={0.1}
          scanColor="#FF9FFC"
          scanOpacity={0.4}
          enablePost
          bloomIntensity={0.6}
          chromaticAberration={0}
          noiseIntensity={0.01}
        />
      </div>

      {/* Fixed floor container - 14% of viewport height - TOP LAYER */}
      <div className="fixed bottom-0 left-0 right-0 z-50 h-[14vh]">
        {/* Mud floor layer */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/floor-mud.png')",
            backgroundSize: "auto 100%",
            backgroundPosition: "top center",
            backgroundRepeat: "repeat-x",
            opacity: mudOpacity,
            transition: "opacity 0.1s ease-out",
          }}
        />

        {/* Marble floor layer */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/floor-marble.png')",
            backgroundSize: "auto 100%",
            backgroundPosition: "top center",
            backgroundRepeat: "repeat-x",
            opacity: marbleOpacity,
            transition: "opacity 0.1s ease-out",
          }}
        />
      </div>

      {/* Treasures section - above floor */}
      <div className="fixed inset-0 overflow-hidden z-[60]">
        <Treasures
          count={25}
          gravity={0.3}
          friction={0.98}
          wallBounce={0.5}
          followCursor={true}
        />
      </div>

      {/* BubbleMenu */}
      <BubbleMenu
        logo={<span style={{ fontWeight: 700 }}>RB</span>}
        items={menuItems}
        menuAriaLabel="Toggle navigation"
        menuBg="#ffffff"
        menuContentColor="#111111"
        useFixedPosition={true}
        animationEase="back.out(1.5)"
        animationDuration={0.5}
        staggerDelay={0.12}
      />

      {/* PIPI text - fixed, fades and scales on scroll */}
      <div
        className="fixed inset-0 z-20 flex items-start justify-center pt-[15vh] pointer-events-none"
        style={{
          opacity: textOpacity,
          transform: `scale(${textScale})`,
          transition: "opacity 0.1s ease-out, transform 0.1s ease-out",
        }}
      >
        <img
          src="/pipi-text.png"
          alt="PIPI"
          className="w-[80vw] max-w-[800px] h-auto"
        />
      </div>

      {/* PIPI character - fixed, standing on floor */}
      <div className="fixed bottom-[11vh] left-1/2 -translate-x-1/2 z-50">
        {/* Soft golden glow */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255, 200, 50, 0.6) 0%, rgba(255, 180, 80, 0.3) 40%, transparent 70%)',
            filter: 'blur(25px)',
            animation: 'glowPulse 3s ease-in-out infinite',
          }}
        />
        <img
          src="/pipi-2.png"
          alt="PIPI Character"
          className="relative w-[70vw] md:w-[40vw] max-w-[400px] h-auto"
        />
      </div>

      {/* Left side - Rotating text around coin */}
      <div
        className="fixed left-2 md:left-8 bottom-[18vh] z-[100] pointer-events-none select-none scale-[0.6] md:scale-100 origin-bottom-left"
        style={{
          opacity: morphProgress > 0.5 ? 1 : morphProgress * 2,
          transition: "opacity 0.3s ease-out",
        }}
      >
        <div className="relative w-[140px] h-[140px]">
          {/* Flipping coin in center */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '200px' }}>
            <div
              className="relative w-24 h-24"
              style={{
                transformStyle: 'preserve-3d',
                animation: 'coinFlip 2s ease-in-out infinite',
              }}
            >
              {/* Heads side */}
              <img
                src="/koin-heads.png"
                alt="koin heads"
                className="absolute inset-0 w-full h-full object-contain"
                style={{ backfaceVisibility: 'hidden' }}
              />
              {/* Tails side */}
              <img
                src="/koin-tail.png"
                alt="koin tails"
                className="absolute inset-0 w-full h-full object-contain"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              />
            </div>
          </div>
          {/* Rotating text */}
          <svg width="140" height="140" viewBox="0 0 140 140" className="absolute inset-0">
            <defs>
              <path
                id="circlePath"
                d="M 70 70 m -50, 0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0"
                fill="none"
              />
            </defs>
            <g className="animate-spin" style={{ transformOrigin: '70px 70px', animationDuration: '10s' }}>
              <text
                className="font-black fill-black uppercase"
                style={{ fontSize: '10.5px', letterSpacing: '0.5px' }}
              >
                <textPath href="#circlePath" startOffset="0%" textLength={Math.PI * 100} lengthAdjust="spacingAndGlyphs">
                  much koink•very round wow•very round wow•
                </textPath>
              </text>
            </g>
          </svg>
        </div>
      </div>

      {/* Right side - Scroll up indicator */}
      <div
        className="fixed right-2 md:right-8 bottom-[18vh] z-[100] pointer-events-none select-none scale-[0.7] md:scale-100 origin-bottom-right"
        style={{
          opacity: morphProgress > 0.5 ? 1 : morphProgress * 2,
          transition: "opacity 0.3s ease-out",
        }}
      >
        <div className="flex flex-col items-center gap-1">
          {/* Bouncing arrow */}
          <div className="animate-bounce">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-pink-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
              <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Stacked text */}
          <div className="flex flex-col items-center">
            <span
              className="text-xl md:text-2xl font-black text-pink-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)] tracking-tight"
              style={{ transform: 'rotate(3deg)' }}
            >
              SCROLL UP
            </span>
            <span
              className="text-xs md:text-sm text-pink-400/80 italic mt-1"
              style={{ transform: 'rotate(-2deg)' }}
            >
              only up from the mud
            </span>
          </div>
        </div>
      </div>
    </main>
  )
}
