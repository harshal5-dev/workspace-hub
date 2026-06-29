import { Link } from "react-router-dom"
import {
  IconArrowLeft,
  IconArrowRight,
  IconCompass,
  IconHome,
  IconMapSearch,
} from "@tabler/icons-react"

import { BrandLogo } from "@/components/brand-logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function NotFoundPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <section className="relative min-h-screen">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,color-mix(in_oklch,var(--primary),transparent_72%),transparent_32rem),radial-gradient(circle_at_86%_80%,color-mix(in_oklch,var(--accent),transparent_84%),transparent_30rem)]" />

        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
          <Link to="/" aria-label="Workspace Hub home">
            <BrandLogo />
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" render={<Link to="/" />}>
              <IconHome />
              Home
            </Button>
          </div>
        </nav>

        <div className="mx-auto flex max-w-7xl items-center px-6 py-16 lg:min-h-[calc(100vh-6rem)] lg:px-8 lg:py-20">
          <div className="grid w-full gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-card/70 px-3 py-1 text-sm text-muted-foreground shadow-sm backdrop-blur">
                <IconCompass className="size-4 text-primary" />
                Route not found
              </div>
              <h1 className="font-heading text-7xl font-semibold tracking-tight sm:text-8xl">
                404
              </h1>
              <p className="mt-5 max-w-xl text-xl leading-8 text-muted-foreground">
                This workspace route does not exist or may have moved. Head back
                to the product dashboard or return to the home page.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" render={<Link to="/dashboard" />}>
                  Go to dashboard
                  <IconArrowRight data-icon="inline-end" />
                </Button>
                <Button size="lg" variant="outline" render={<Link to="/" />}>
                  <IconArrowLeft />
                  Back home
                </Button>
              </div>
            </div>

            <Card className="relative overflow-hidden bg-card/80 shadow-2xl shadow-primary/10 backdrop-blur">
              <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary via-primary/60 to-transparent" />
              <CardHeader>
                <span className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <IconMapSearch className="size-6" />
                </span>
                <CardTitle>Lost in the workspace?</CardTitle>
                <CardDescription>
                  Use these working routes to continue exploring the portfolio app.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                {[
                  ["Home", "/"],
                  ["Login", "/login"],
                  ["Dashboard", "/dashboard"],
                  ["Projects", "/dashboard/projects"],
                ].map(([label, url]) => (
                  <Button key={url} variant="outline" className="justify-between" render={<Link to={url} />}>
                    {label}
                    <IconArrowRight data-icon="inline-end" />
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}
