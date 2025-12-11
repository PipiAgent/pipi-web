"use client"

import { useCallback, useEffect, useRef, useState } from "react"

interface PipiGameProps {
  onGameComplete: () => void
}

interface GameObject {
  x: number
  y: number
  width: number
  height: number
  type: "candle" | "diamond"
}

const GAME_WIDTH = 800
const GAME_HEIGHT = 300
const GROUND_HEIGHT = 50
const GRAVITY = 0.8
const JUMP_FORCE = -15
const GAME_SPEED = 6
const PIPI_SIZE = 60

export default function PipiGame({ onGameComplete }: PipiGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameLoopRef = useRef<number | undefined>(undefined)
  const pipiImageRef = useRef<HTMLImageElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [showInstructions, setShowInstructions] = useState(true)

  // Game state refs (to avoid stale closures)
  const pipiRef = useRef({
    x: 80,
    y: GAME_HEIGHT - GROUND_HEIGHT - PIPI_SIZE,
    width: PIPI_SIZE,
    height: PIPI_SIZE,
    velocityY: 0,
    isJumping: false,
  })
  const obstaclesRef = useRef<GameObject[]>([])
  const frameCountRef = useRef(0)
  const scoreRef = useRef(0)

  // Load PIPI image
  useEffect(() => {
    const img = new Image()
    img.src = "/pipi-character.png"
    img.onload = () => {
      pipiImageRef.current = img
    }
  }, [])

  // Draw functions
  const drawBackground = useCallback((ctx: CanvasRenderingContext2D) => {
    // Sky gradient (dark with pink tint)
    const gradient = ctx.createLinearGradient(0, 0, 0, GAME_HEIGHT - GROUND_HEIGHT)
    gradient.addColorStop(0, "#1a0a10")
    gradient.addColorStop(1, "#2d1020")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT - GROUND_HEIGHT)

    // Grid pattern
    ctx.strokeStyle = "rgba(255, 100, 150, 0.1)"
    ctx.lineWidth = 1
    for (let x = 0; x < GAME_WIDTH; x += 40) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, GAME_HEIGHT - GROUND_HEIGHT)
      ctx.stroke()
    }
    for (let y = 0; y < GAME_HEIGHT - GROUND_HEIGHT; y += 40) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(GAME_WIDTH, y)
      ctx.stroke()
    }

    // Ground (mud)
    const mudGradient = ctx.createLinearGradient(0, GAME_HEIGHT - GROUND_HEIGHT, 0, GAME_HEIGHT)
    mudGradient.addColorStop(0, "#5c3d2e")
    mudGradient.addColorStop(1, "#3d2820")
    ctx.fillStyle = mudGradient
    ctx.fillRect(0, GAME_HEIGHT - GROUND_HEIGHT, GAME_WIDTH, GROUND_HEIGHT)

    // Ground border
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.moveTo(0, GAME_HEIGHT - GROUND_HEIGHT)
    ctx.lineTo(GAME_WIDTH, GAME_HEIGHT - GROUND_HEIGHT)
    ctx.stroke()
  }, [])

  const drawPipi = useCallback((ctx: CanvasRenderingContext2D) => {
    const pipi = pipiRef.current

    if (pipiImageRef.current) {
      // Draw PIPI character image
      ctx.drawImage(pipiImageRef.current, pipi.x, pipi.y, pipi.width, pipi.height)
    } else {
      // Fallback: pink circle with face
      ctx.fillStyle = "#ff69b4"
      ctx.beginPath()
      ctx.arc(pipi.x + pipi.width / 2, pipi.y + pipi.height / 2, pipi.width / 2, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = "#000"
      ctx.lineWidth = 3
      ctx.stroke()

      // Eyes
      ctx.fillStyle = "#000"
      ctx.beginPath()
      ctx.arc(pipi.x + 20, pipi.y + 20, 5, 0, Math.PI * 2)
      ctx.arc(pipi.x + 40, pipi.y + 20, 5, 0, Math.PI * 2)
      ctx.fill()

      // Tear
      ctx.fillStyle = "#00bfff"
      ctx.beginPath()
      ctx.ellipse(pipi.x + 45, pipi.y + 30, 3, 5, 0, 0, Math.PI * 2)
      ctx.fill()
    }
  }, [])

  const drawObstacle = useCallback((ctx: CanvasRenderingContext2D, obj: GameObject) => {
    if (obj.type === "candle") {
      // Red candle (bearish)
      ctx.fillStyle = "#ff4444"
      ctx.fillRect(obj.x, obj.y, obj.width, obj.height)

      // Candle wick
      ctx.fillStyle = "#000"
      ctx.fillRect(obj.x + obj.width / 2 - 2, obj.y - 15, 4, 15)

      // Border
      ctx.strokeStyle = "#000"
      ctx.lineWidth = 3
      ctx.strokeRect(obj.x, obj.y, obj.width, obj.height)
    } else if (obj.type === "diamond") {
      // Diamond collectible
      ctx.fillStyle = "#00ffff"
      ctx.beginPath()
      ctx.moveTo(obj.x + obj.width / 2, obj.y)
      ctx.lineTo(obj.x + obj.width, obj.y + obj.height / 2)
      ctx.lineTo(obj.x + obj.width / 2, obj.y + obj.height)
      ctx.lineTo(obj.x, obj.y + obj.height / 2)
      ctx.closePath()
      ctx.fill()

      ctx.strokeStyle = "#000"
      ctx.lineWidth = 2
      ctx.stroke()

      // Sparkle
      ctx.fillStyle = "#fff"
      ctx.beginPath()
      ctx.arc(obj.x + obj.width / 3, obj.y + obj.height / 3, 3, 0, Math.PI * 2)
      ctx.fill()
    }
  }, [])

  const drawScore = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = "#ff69b4"
    ctx.font = "bold 24px monospace"
    ctx.textAlign = "right"
    ctx.fillText(`SCORE: ${scoreRef.current}`, GAME_WIDTH - 20, 35)
  }, [])

  const drawGameOver = useCallback((ctx: CanvasRenderingContext2D) => {
    // Overlay
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

    // Game Over text
    ctx.fillStyle = "#ff69b4"
    ctx.font = "bold 48px monospace"
    ctx.textAlign = "center"
    ctx.fillText("REKT!", GAME_WIDTH / 2, GAME_HEIGHT / 2 - 20)

    ctx.fillStyle = "#fff"
    ctx.font = "20px monospace"
    ctx.fillText("Entering the pen...", GAME_WIDTH / 2, GAME_HEIGHT / 2 + 20)
  }, [])

  const drawInstructions = useCallback((ctx: CanvasRenderingContext2D) => {
    // Semi-transparent overlay
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

    // Title
    ctx.fillStyle = "#ff69b4"
    ctx.font = "bold 36px monospace"
    ctx.textAlign = "center"
    ctx.fillText("PIPI RUN", GAME_WIDTH / 2, GAME_HEIGHT / 2 - 60)

    // Instructions
    ctx.fillStyle = "#fff"
    ctx.font = "18px monospace"
    ctx.fillText("Dodge the red candles!", GAME_WIDTH / 2, GAME_HEIGHT / 2 - 10)
    ctx.fillText("Collect diamonds for bonus points!", GAME_WIDTH / 2, GAME_HEIGHT / 2 + 20)

    // Start prompt
    ctx.fillStyle = "#ff69b4"
    ctx.font = "bold 24px monospace"
    ctx.fillText("SPACE / CLICK / TAP to KOINK!", GAME_WIDTH / 2, GAME_HEIGHT / 2 + 70)
  }, [])

  // Collision detection
  const checkCollision = useCallback((a: { x: number; y: number; width: number; height: number }, b: GameObject) => {
    const padding = 10 // Forgiveness padding
    return (
      a.x + padding < b.x + b.width &&
      a.x + a.width - padding > b.x &&
      a.y + padding < b.y + b.height &&
      a.y + a.height - padding > b.y
    )
  }, [])

  // Game loop
  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const pipi = pipiRef.current

    // Clear canvas
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

    // Draw background
    drawBackground(ctx)

    // Update PIPI position
    pipi.velocityY += GRAVITY
    pipi.y += pipi.velocityY

    // Ground collision
    const groundY = GAME_HEIGHT - GROUND_HEIGHT - pipi.height
    if (pipi.y >= groundY) {
      pipi.y = groundY
      pipi.velocityY = 0
      pipi.isJumping = false
    }

    // Spawn obstacles
    frameCountRef.current++
    if (frameCountRef.current % 80 === 0) {
      const isCandle = Math.random() > 0.3
      if (isCandle) {
        const height = 40 + Math.random() * 40
        obstaclesRef.current.push({
          x: GAME_WIDTH,
          y: GAME_HEIGHT - GROUND_HEIGHT - height,
          width: 30,
          height: height,
          type: "candle",
        })
      }
    }

    if (frameCountRef.current % 120 === 0 && Math.random() > 0.5) {
      obstaclesRef.current.push({
        x: GAME_WIDTH,
        y: GAME_HEIGHT - GROUND_HEIGHT - 100 - Math.random() * 50,
        width: 30,
        height: 30,
        type: "diamond",
      })
    }

    // Update and draw obstacles
    obstaclesRef.current = obstaclesRef.current.filter((obj) => {
      obj.x -= GAME_SPEED

      // Check collision
      if (checkCollision(pipi, obj)) {
        if (obj.type === "candle") {
          // Game over
          setGameOver(true)
          setIsPlaying(false)
          return false
        } else if (obj.type === "diamond") {
          // Collect diamond
          scoreRef.current += 100
          setScore(scoreRef.current)
          return false
        }
      }

      // Draw obstacle
      if (obj.x > -obj.width) {
        drawObstacle(ctx, obj)
        return true
      }

      // Score for passing candles
      if (obj.type === "candle" && obj.x + obj.width < pipi.x) {
        scoreRef.current += 10
        setScore(scoreRef.current)
      }

      return obj.x > -obj.width
    })

    // Draw PIPI
    drawPipi(ctx)

    // Draw score
    drawScore(ctx)

    // Continue loop
    gameLoopRef.current = requestAnimationFrame(gameLoop)
  }, [drawBackground, drawPipi, drawObstacle, drawScore, checkCollision])

  // Handle jump
  const jump = useCallback(() => {
    if (showInstructions) {
      setShowInstructions(false)
      setIsPlaying(true)
      return
    }

    if (gameOver) return

    const pipi = pipiRef.current
    if (!pipi.isJumping) {
      pipi.velocityY = JUMP_FORCE
      pipi.isJumping = true
    }
  }, [showInstructions, gameOver])

  // Input handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault()
        jump()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [jump])

  // Start game loop
  useEffect(() => {
    if (isPlaying && !gameOver) {
      gameLoopRef.current = requestAnimationFrame(gameLoop)
    }

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
      }
    }
  }, [isPlaying, gameOver, gameLoop])

  // Draw initial state or game over
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    if (showInstructions) {
      drawBackground(ctx)
      drawPipi(ctx)
      drawInstructions(ctx)
    } else if (gameOver) {
      drawBackground(ctx)
      drawPipi(ctx)
      drawGameOver(ctx)

      // Auto transition after 2 seconds
      const timer = setTimeout(() => {
        onGameComplete()
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [showInstructions, gameOver, drawBackground, drawPipi, drawInstructions, drawGameOver, onGameComplete])

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={GAME_WIDTH}
        height={GAME_HEIGHT}
        className="rounded-base border-4 border-border shadow-shadow cursor-pointer game-container"
        onClick={jump}
        onTouchStart={(e) => {
          e.preventDefault()
          jump()
        }}
      />
      {showInstructions && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-main text-sm animate-pulse">
          Tap anywhere to start!
        </div>
      )}
    </div>
  )
}
