"use client"

import { useEffect, useState } from "react"

import "@/styling/pipi.css"

interface TearAnimationProps {
  count?: number
  className?: string
}

interface Tear {
  id: number
  x: number
  delay: number
  duration: number
}

export default function TearAnimation({ count = 5, className = "" }: TearAnimationProps) {
  const [tears, setTears] = useState<Tear[]>([])

  useEffect(() => {
    const newTears: Tear[] = []
    for (let i = 0; i < count; i++) {
      newTears.push({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 1.5 + Math.random() * 1,
      })
    }
    setTears(newTears)
  }, [count])

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {tears.map((tear) => (
        <div
          key={tear.id}
          className="absolute top-0"
          style={{
            left: `${tear.x}%`,
            animation: `tear-fall ${tear.duration}s ease-in ${tear.delay}s infinite`,
          }}
        >
          <svg
            width="12"
            height="18"
            viewBox="0 0 12 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 0C6 0 0 8 0 12C0 15.3137 2.68629 18 6 18C9.31371 18 12 15.3137 12 12C12 8 6 0 6 0Z"
              fill="#00bfff"
              fillOpacity="0.7"
            />
            <path
              d="M4 10C4 10 3 12 3 13C3 14.1046 3.89543 15 5 15"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>
        </div>
      ))}
    </div>
  )
}
