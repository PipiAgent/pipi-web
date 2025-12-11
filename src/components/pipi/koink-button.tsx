"use client"

import { ArrowUpRight } from "lucide-react"

import "@/styling/pipi.css"

interface KoinkButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: "default" | "secondary" | "outline"
  size?: "default" | "lg" | "sm"
  pulse?: boolean
  className?: string
  icon?: boolean
}

export default function KoinkButton({
  children,
  href,
  onClick,
  variant = "default",
  size = "default",
  pulse = false,
  className = "",
  icon = false,
}: KoinkButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-heading rounded-base border-2 border-border transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"

  const variantClasses = {
    default: "bg-main text-main-foreground shadow-shadow",
    secondary: "bg-secondary-background text-foreground shadow-shadow",
    outline: "bg-transparent text-foreground shadow-shadow hover:bg-main hover:text-main-foreground",
  }

  const sizeClasses = {
    sm: "px-4 py-1.5 text-sm",
    default: "px-6 py-2.5 text-base",
    lg: "px-10 py-3 text-lg md:text-xl",
  }

  const pulseClass = pulse ? "animate-koink-pulse" : ""

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${pulseClass} ${className}`

  if (href) {
    return (
      <a href={href} className={combinedClasses} target="_blank" rel="noopener noreferrer">
        {children}
        {icon && <ArrowUpRight className="size-5" />}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={combinedClasses}>
      {children}
      {icon && <ArrowUpRight className="size-5" />}
    </button>
  )
}
