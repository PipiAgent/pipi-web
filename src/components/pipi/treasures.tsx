"use client"

import React, { useEffect, useRef, useState } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  rotation: number
  rotationSpeed: number
  type: 'diamond' | 'coin'
}

interface TreasuresProps {
  count?: number
  gravity?: number
  friction?: number
  wallBounce?: number
  followCursor?: boolean
  className?: string
}

const Treasures: React.FC<TreasuresProps> = ({
  count = 100,
  gravity = 0.3,
  friction = 0.99,
  wallBounce = 0.7,
  followCursor = true,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0, active: false })
  const rafRef = useRef<number>(0)
  const [, forceUpdate] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    // Check if mobile
    const isMobile = width < 768
    const baseSize = isMobile ? 30 : 40
    const sizeRange = isMobile ? 15 : 40

    // Initialize particles - 80% diamonds, 20% coins
    particlesRef.current = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height * 0.3,
      vx: (Math.random() - 0.5) * 0.5,
      vy: Math.random() * 0.5,
      size: baseSize + Math.random() * sizeRange,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2,
      type: Math.random() > 0.2 ? 'diamond' : 'coin'
    }))

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = container.getBoundingClientRect()
        const touchY = e.touches[0].clientY
        const floorThreshold = window.innerHeight * 0.86 // Top of floor (100% - 14%)

        // Only react to touch in floor zone (bottom 14vh)
        if (touchY >= floorThreshold) {
          mouseRef.current = {
            x: e.touches[0].clientX - rect.left,
            y: e.touches[0].clientY - rect.top,
            active: true
          }
        } else {
          mouseRef.current.active = false
        }
      }
    }

    const handleTouchEnd = () => {
      mouseRef.current.active = false
    }

    if (followCursor) {
      container.addEventListener('mousemove', handleMouseMove)
      container.addEventListener('mouseleave', handleMouseLeave)
      container.addEventListener('touchmove', handleTouchMove)
      container.addEventListener('touchend', handleTouchEnd)
    }

    let lastTime = performance.now()

    const animate = () => {
      const now = performance.now()
      const delta = Math.min((now - lastTime) / 16.67, 2) // Cap delta to prevent huge jumps
      lastTime = now

      const rect = container.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      const particles = particlesRef.current

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Apply gravity
        p.vy += gravity * delta

        // Apply friction
        p.vx *= friction
        p.vy *= friction

        // Cursor repulsion - very strong and large radius
        if (followCursor && mouseRef.current.active) {
          const dx = p.x - mouseRef.current.x
          const dy = p.y - mouseRef.current.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 200 && dist > 0) {
            const force = (200 - dist) / 200 * 15
            p.vx += (dx / dist) * force
            p.vy += (dy / dist) * force
          }
        }

        // Update position
        p.x += p.vx * delta
        p.y += p.vy * delta
        p.rotation += p.rotationSpeed * delta

        // Wall collisions
        const radius = p.size / 2
        if (p.x - radius < 0) {
          p.x = radius
          p.vx = -p.vx * wallBounce
        }
        if (p.x + radius > width) {
          p.x = width - radius
          p.vx = -p.vx * wallBounce
        }
        if (p.y - radius < 0) {
          p.y = radius
          p.vy = -p.vy * wallBounce
        }
        if (p.y + radius > height) {
          p.y = height - radius
          p.vy = -p.vy * wallBounce
        }

        // Particle collisions (simple)
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p2.x - p.x
          const dy = p2.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const minDist = (p.size + p2.size) / 2

          if (dist < minDist && dist > 0) {
            const overlap = (minDist - dist) / 2
            const nx = dx / dist
            const ny = dy / dist

            p.x -= nx * overlap
            p.y -= ny * overlap
            p2.x += nx * overlap
            p2.y += ny * overlap

            // Exchange velocities
            const dvx = p.vx - p2.vx
            const dvy = p.vy - p2.vy
            const dot = dvx * nx + dvy * ny

            p.vx -= dot * nx * wallBounce
            p.vy -= dot * ny * wallBounce
            p2.vx += dot * nx * wallBounce
            p2.vy += dot * ny * wallBounce
          }
        }
      }

      forceUpdate(n => n + 1)
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafRef.current)
      if (followCursor) {
        container.removeEventListener('mousemove', handleMouseMove)
        container.removeEventListener('mouseleave', handleMouseLeave)
        container.removeEventListener('touchmove', handleTouchMove)
        container.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [count, gravity, friction, wallBounce, followCursor])

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{ pointerEvents: 'auto', touchAction: 'pan-y' }}
    >
      {particlesRef.current.map((p) => (
        <div
          key={p.id}
          className="absolute pointer-events-none select-none"
          style={{
            left: p.x,
            top: p.y,
            fontSize: p.size,
            transform: `translate(-50%, -50%) rotate(${p.rotation}deg)`,
            willChange: 'transform, left, top',
          }}
        >
          {p.type === 'diamond' ? '💎' : '🪙'}
        </div>
      ))}
    </div>
  )
}

export default Treasures
