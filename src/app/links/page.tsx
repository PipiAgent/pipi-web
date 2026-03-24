"use client"

import "@/styling/pipi.css"
import { useState } from "react"

const socialLinks = [
  {
    label: "Twitter / X",
    href: "https://x.com/pipi",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    color: "#000000",
    hoverColor: "#1DA1F2",
  },
  {
    label: "Telegram",
    href: "https://t.me/pipi",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
    color: "#0088cc",
    hoverColor: "#00aaff",
  },
  {
    label: "DexScreener",
    href: "https://dexscreener.com/solana/pipi",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: "#00D084",
    hoverColor: "#00ff99",
  },
  {
    label: "Buy on Raydium",
    href: "https://raydium.io/swap",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm2-1.645V14h-2v-1.5a1 1 0 0 1 1-1 1.5 1.5 0 1 0-1.471-1.794l-1.962-.393A3.501 3.501 0 1 1 13 13.355z" />
      </svg>
    ),
    color: "#5A4FCF",
    hoverColor: "#7B6FF0",
  },
  {
    label: "Website",
    href: "/",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
    ),
    color: "#ec4899",
    hoverColor: "#f472b6",
  },
]

export default function LinksPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 via-pink-50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating circles */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-pink-200 rounded-full opacity-50 animate-float" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-yellow-200 rounded-full opacity-50 animate-float" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-purple-200 rounded-full opacity-50 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-blue-200 rounded-full opacity-50 animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-start min-h-screen px-4 py-12">
        {/* Profile section */}
        <div className="flex flex-col items-center mb-10">
          {/* Avatar with glow effect */}
          <div className="relative mb-6">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255, 200, 50, 0.6) 0%, rgba(255, 180, 80, 0.3) 40%, transparent 70%)',
                filter: 'blur(20px)',
                transform: 'scale(1.3)',
              }}
            />
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-black bg-white overflow-hidden shadow-[4px_4px_0px_0px_#000]">
              <img
                src="/pipi-2.png"
                alt="PIPI"
                className="w-full h-full object-cover object-top scale-150 translate-y-4"
              />
            </div>
          </div>

          {/* PIPI Logo/Name */}
          <img
            src="/pipi-text.png"
            alt="PIPI"
            className="w-48 md:w-64 h-auto mb-2"
          />

          {/* Tagline */}
          <p className="text-lg md:text-xl text-gray-700 font-medium text-center max-w-md">
            From the mud to the moon 🐷✨
          </p>
        </div>

        {/* Links section */}
        <div className="w-full max-w-md space-y-4">
          {socialLinks.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('/') ? '_self' : '_blank'}
              rel="noopener noreferrer"
              className="group block w-full"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className="flex items-center gap-4 px-6 py-4 bg-white border-3 border-black rounded-xl transition-all duration-200"
                style={{
                  boxShadow: hoveredIndex === index
                    ? `6px 6px 0px 0px ${link.color}`
                    : '4px 4px 0px 0px #000',
                  transform: hoveredIndex === index ? 'translate(-2px, -2px)' : 'none',
                  borderColor: hoveredIndex === index ? link.color : '#000',
                }}
              >
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-lg transition-colors duration-200"
                  style={{
                    backgroundColor: hoveredIndex === index ? link.color : '#f3f4f6',
                    color: hoveredIndex === index ? '#fff' : '#374151',
                  }}
                >
                  {link.icon}
                </div>
                <span
                  className="flex-1 text-lg font-bold transition-colors duration-200"
                  style={{
                    color: hoveredIndex === index ? link.color : '#1f2937',
                  }}
                >
                  {link.label}
                </span>
                <svg
                  className="w-5 h-5 transition-all duration-200"
                  style={{
                    color: hoveredIndex === index ? link.color : '#9ca3af',
                    transform: hoveredIndex === index ? 'translateX(4px)' : 'none',
                  }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* Coin animation */}
        <div className="mt-12 mb-8">
          <div className="relative w-20 h-20">
            <div
              className="w-full h-full"
              style={{
                transformStyle: 'preserve-3d',
                animation: 'coinFlip 2s ease-in-out infinite',
              }}
            >
              <img
                src="/koin-heads.png"
                alt="PIPI Coin"
                className="absolute inset-0 w-full h-full object-contain"
                style={{ backfaceVisibility: 'hidden' }}
              />
              <img
                src="/koin-tail.png"
                alt="PIPI Coin"
                className="absolute inset-0 w-full h-full object-contain"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm">
          <p>© 2025 PIPI • All rights reserved</p>
        </div>
      </div>

      {/* Coin flip animation keyframes */}
      <style jsx>{`
        @keyframes coinFlip {
          0%, 100% {
            transform: rotateY(0deg);
          }
          50% {
            transform: rotateY(180deg);
          }
        }
      `}</style>
    </main>
  )
}
