import "@/styling/pipi.css"

interface EvolutionStageProps {
  stage: number
  name: string
  mcRange: string
  description: string
  tagline: string
  isActive?: boolean
  isCompleted?: boolean
  className?: string
}

export default function EvolutionStage({
  stage,
  name,
  mcRange,
  description,
  tagline,
  isActive = false,
  isCompleted = false,
  className = "",
}: EvolutionStageProps) {
  return (
    <div
      className={`relative rounded-base border-2 border-border p-4 md:p-6 transition-all ${
        isActive
          ? "bg-main text-main-foreground shadow-shadow scale-105"
          : isCompleted
            ? "bg-secondary-background text-foreground opacity-60"
            : "bg-secondary-background text-foreground shadow-shadow"
      } ${className}`}
    >
      {/* Stage number badge */}
      <div
        className={`absolute -top-3 -left-3 w-8 h-8 rounded-full border-2 border-border flex items-center justify-center font-heading text-sm ${
          isActive ? "bg-secondary-background text-foreground" : "bg-main text-main-foreground"
        }`}
      >
        {stage}
      </div>

      {/* Content */}
      <div className="mt-2">
        <h4 className="font-heading text-lg md:text-xl mb-1">{name}</h4>
        <p
          className={`text-xs md:text-sm mb-3 ${
            isActive ? "text-main-foreground/70" : "text-foreground/60"
          }`}
        >
          {mcRange}
        </p>
        <p className={`text-sm md:text-base mb-3 ${isActive ? "text-main-foreground" : "text-foreground"}`}>
          {description}
        </p>
        <p
          className={`text-xs md:text-sm italic ${
            isActive ? "text-main-foreground/80" : "text-main"
          }`}
        >
          &ldquo;{tagline}&rdquo;
        </p>
      </div>

      {/* Active indicator */}
      {isActive && (
        <div className="absolute -right-2 top-1/2 -translate-y-1/2">
          <div className="w-4 h-4 bg-main rounded-full border-2 border-border animate-pulse" />
        </div>
      )}
    </div>
  )
}
