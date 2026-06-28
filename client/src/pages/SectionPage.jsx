import { IconArrowUpRight, IconCircleCheck } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionPage({ eyebrow, title, description, stats, items }) {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex rounded-full border bg-muted/40 px-3 py-1 text-sm text-muted-foreground">
              {eyebrow}
            </div>
            <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              {title}
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>
          </div>
          <Button>
            Open workflow
            <IconArrowUpRight data-icon="inline-end" />
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {stats.map(([label, value, note]) => (
          <Card key={label}>
            <CardHeader>
              <CardDescription>{label}</CardDescription>
              <CardTitle className="text-3xl">{value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{note}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card>
        <CardHeader>
          <CardTitle>{title} outline</CardTitle>
          <CardDescription>Basic component structure ready for API integration.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          {items.map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-xl border bg-background p-4">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <IconCircleCheck className="size-4" />
              </span>
              <span className="font-medium">{item}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
