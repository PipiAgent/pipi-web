"use client"

import "@/styling/pipi.css"
import { useEffect, useState } from "react"
import { GridScan } from "@/components/pipi/grid-scan"
import Treasures from "@/components/pipi/treasures"
import BubbleMenu from "@/components/pipi/BubbleMenu"

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
  const [morphProgress, setMorphProgress] = useState(0)

  useEffect(() => {
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
  }, [])

  // Progress: 1 = bottom (mud), 0 = top (marble)
  // Bottom 67% of scroll = mud, top 33% transitions to marble
  // As user scrolls UP (progress decreases): mud fades out, marble fades in
  const mudOpacity = morphProgress > 0.33
    ? 1
    : morphProgress / 0.33

  const marbleOpacity = morphProgress > 0.33
    ? 0
    : 1 - (morphProgress / 0.33)

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

  return (
    <main className="relative w-full" style={{ height: "3141px" }}>
      {/* GridScan background - fixed */}
      <div className="fixed inset-0 z-0">
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
        className="fixed inset-0 z-20 flex items-center justify-center pointer-events-none"
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
      <img
        src="/pipi-2.png"
        alt="PIPI Character"
        className="fixed bottom-[11vh] left-1/2 -translate-x-1/2 w-[70vw] md:w-[40vw] max-w-[400px] h-auto z-50"
      />

      {/* Left side - Doge speak on curved path */}
      <div
        className="fixed left-4 md:left-8 bottom-[18vh] z-[100] pointer-events-none select-none"
        style={{
          opacity: morphProgress > 0.5 ? 1 : morphProgress * 2,
          transition: "opacity 0.3s ease-out",
        }}
      >
        <svg width="180" height="140" viewBox="0 0 180 140" className="overflow-visible">
          <defs>
            <path
              id="wavyPath"
              d="M 10 120 Q 50 60, 90 80 T 170 30"
              fill="none"
            />
          </defs>
          <text
            className="text-base md:text-lg font-black fill-current drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
          >
            <textPath href="#wavyPath" startOffset="0%">
              <tspan className="fill-yellow-400">Much Koins</tspan>
              <tspan className="fill-pink-400"> Very Round</tspan>
              <tspan className="fill-cyan-400"> Wow</tspan>
            </textPath>
          </text>
        </svg>
      </div>

      {/* Right side - Scroll up indicator */}
      <div
        className="fixed right-4 md:right-8 bottom-[18vh] z-[100] pointer-events-none select-none"
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
