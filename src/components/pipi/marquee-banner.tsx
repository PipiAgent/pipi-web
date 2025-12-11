"use client"

import "@/styling/pipi.css"

interface MarqueeBannerProps {
  items: string[]
  separator?: React.ReactNode
  className?: string
  speed?: "slow" | "normal" | "fast"
  direction?: "left" | "right"
}

export default function MarqueeBanner({
  items,
  separator = "🐷",
  className = "",
  speed = "normal",
  direction = "left",
}: MarqueeBannerProps) {
  const speedClass = {
    slow: "[--duration:40s]",
    normal: "[--duration:25s]",
    fast: "[--duration:15s]",
  }

  const content = items.map((item, index) => (
    <span key={index} className="flex items-center gap-4 md:gap-8">
      <span className="whitespace-nowrap text-lg md:text-2xl font-heading">{item}</span>
      <span className="text-lg md:text-2xl">{separator}</span>
    </span>
  ))

  return (
    <div
      className={`overflow-hidden border-y-4 border-border bg-main py-3 md:py-4 ${speedClass[speed]} ${className}`}
    >
      <div
        className={`flex gap-4 md:gap-8 ${
          direction === "left" ? "animate-marquee" : "animate-marquee2"
        }`}
        style={{
          animationDuration: "var(--duration)",
        }}
      >
        {/* Repeat content for seamless loop */}
        {content}
        {content}
        {content}
        {content}
      </div>
    </div>
  )
}
