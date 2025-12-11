import "@/styling/pipi.css"

interface StatCardProps {
  label: string
  value: string | number
  subtext?: string
  icon?: React.ReactNode
  className?: string
}

export default function StatCard({ label, value, subtext, icon, className = "" }: StatCardProps) {
  return (
    <div
      className={`rounded-base border-2 border-border bg-secondary-background p-4 md:p-6 shadow-shadow ${className}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs md:text-sm text-foreground/60 uppercase tracking-wider mb-1">{label}</p>
          <p className="text-2xl md:text-3xl font-heading text-foreground">{value}</p>
          {subtext && <p className="text-xs md:text-sm text-foreground/50 mt-1">{subtext}</p>}
        </div>
        {icon && <div className="text-main text-2xl md:text-3xl">{icon}</div>}
      </div>
    </div>
  )
}
