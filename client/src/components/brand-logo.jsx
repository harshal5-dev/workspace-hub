import { IconLayoutKanban, IconSparkles } from "@tabler/icons-react"

import { cn } from "@/lib/utils"

export function BrandLogo({ className, showText = true }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-primary/20 bg-primary text-primary-foreground shadow-lg shadow-primary/20">
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,color-mix(in_oklch,var(--primary-foreground),transparent_62%),transparent_42%),linear-gradient(135deg,color-mix(in_oklch,var(--primary),white_14%),var(--primary))]" />
        <IconLayoutKanban className="relative size-5" />
        <IconSparkles className="absolute right-1 top-1 size-3 text-primary-foreground/80" />
      </span>
      {showText && (
        <span data-logo-text className="grid leading-tight">
          <span className="font-heading text-base font-semibold tracking-tight">
            Workspace Hub
          </span>
          <span className="text-xs font-normal text-muted-foreground">
            Multi-tenant tasks
          </span>
        </span>
      )}
    </div>
  )
}
