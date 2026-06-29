import { Link } from "react-router-dom";
import {
  IconArrowRight,
  IconBrandReact,
  IconBuilding,
  IconCheck,
  IconDatabase,
  IconGitBranch,
  IconServer,
  IconShieldLock,
} from "@tabler/icons-react";

import { BrandLogo } from "@/components/brand-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const stack = [
  "React",
  "JavaScript",
  "shadcn/ui",
  "Gin Go",
  "sqlc",
  "PostgreSQL",
];

const features = [
  {
    icon: <IconBuilding />,
    title: "Tenant-first workspaces",
    description:
      "Every company gets isolated projects, teams, roles, and task workflows from the first login.",
  },
  {
    icon: <IconGitBranch />,
    title: "Project delivery flow",
    description:
      "Plan milestones, assign owners, and move tasks from backlog to shipped with visible status.",
  },
  {
    icon: <IconShieldLock />,
    title: "Backend-ready product",
    description:
      "Designed for a Gin API, sqlc generated queries, PostgreSQL persistence, and clean auth boundaries.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <section className="relative border-b">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,color-mix(in_oklch,var(--primary),transparent_72%),transparent_34rem),radial-gradient(circle_at_85%_15%,color-mix(in_oklch,var(--accent),transparent_82%),transparent_24rem)]" />
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <Link to="/" aria-label="Workspace Hub home">
            <BrandLogo />
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" render={<Link to="/login" />}>
              Login
              <IconArrowRight data-icon="inline-end" />
            </Button>
          </div>
        </nav>

        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1fr_0.85fr] lg:px-8 lg:py-24">
          <div className="flex flex-col justify-center">
            <div className="animate-fade-slide-up mb-5 inline-flex w-fit items-center gap-2 rounded-full border bg-card/70 px-3 py-1 text-sm text-muted-foreground shadow-sm backdrop-blur">
              <span className="size-2 rounded-full bg-primary" />
              Multi-tenant task management portfolio project
            </div>
            <h1 className="animate-fade-slide-up animation-delay-100 max-w-4xl font-heading text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
              Run projects, tasks, and teams across every client workspace.
            </h1>
            <p className="animate-fade-slide-up animation-delay-200 mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Workspace Hub is a modern SaaS-style task management product built
              to showcase frontend design, tenant-aware UX, and a
              production-ready Go API architecture.
            </p>
            <div className="animate-fade-slide-up animation-delay-300 mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" render={<Link to="/login" />}>
                See login flow
                <IconArrowRight data-icon="inline-end" />
              </Button>
            </div>
            <div className="animate-fade-slide-up animation-delay-500 mt-10 flex flex-wrap gap-2" id="stack">
              {stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border bg-background/70 px-3 py-1 text-sm text-muted-foreground shadow-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <Card className="animate-fade-slide-up animation-delay-200 relative overflow-hidden bg-card/80 shadow-2xl shadow-primary/10 backdrop-blur lg:animate-soft-float">
            <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary via-primary/50 to-transparent" />
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Acme Workspace</CardTitle>
                  <CardDescription>Tenant health overview</CardDescription>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  Live sprint
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-5 p-5">
              <div className="grid grid-cols-3 gap-3">
                {[
                  ["24", "Projects"],
                  ["186", "Tasks"],
                  ["12", "Teams"],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-xl border bg-muted/40 p-4"
                  >
                    <div className="text-2xl font-semibold">{value}</div>
                    <div className="text-xs text-muted-foreground">{label}</div>
                  </div>
                ))}
              </div>
              <div className="rounded-xl border bg-background p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium">API Platform Rewrite</p>
                    <p className="text-sm text-muted-foreground">
                      Gin + sqlc + Postgres
                    </p>
                  </div>
                  <span className="text-sm font-medium text-primary">78%</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-2 w-[78%] rounded-full bg-primary" />
                </div>
              </div>
              <div className="space-y-3">
                {[
                  "Tenant permissions mapped",
                  "Task query layer generated",
                  "Team invite UI polished",
                ].map((task) => (
                  <div
                    key={task}
                    className="flex items-center gap-3 rounded-xl border bg-background p-3"
                  >
                    <span className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <IconCheck className="size-4" />
                    </span>
                    <span className="text-sm">{task}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-medium text-primary">Product depth</p>
          <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Built like a real SaaS dashboard, not a static portfolio screen.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="animate-fade-slide-up bg-card/70">
              <CardHeader>
                <span className="mb-3 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary [&_svg]:size-5">
                  {feature.icon}
                </span>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section
        id="architecture"
        className="mx-auto max-w-7xl px-6 pb-16 lg:px-8"
      >
        <Card className="animate-fade-slide-up overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-3">
            {[
              [
                <IconBrandReact />,
                "React + shadcn/ui",
                "Fast, responsive tenant dashboards with reusable primitives.",
              ],
              [
                <IconServer />,
                "Gin Go API",
                "REST endpoints shaped around organizations, projects, tasks, and members.",
              ],
              [
                <IconDatabase />,
                "sqlc + PostgreSQL",
                "Typed query generation and relational data modeling for tenant isolation.",
              ],
            ].map(([icon, title, description]) => (
              <div
                key={title}
                className="border-b p-6 last:border-b-0 lg:border-r lg:border-b-0 lg:last:border-r-0"
              >
                <div className="mb-4 text-primary [&_svg]:size-7">{icon}</div>
                <h3 className="font-heading text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <footer className="border-t bg-muted/20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:gap-16 lg:px-8">
          <div>
            <BrandLogo />
            <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
              A portfolio-grade multi-tenant task management UI designed to show
              product thinking, clean React structure, shadcn styling, and a
              backend-ready Gin, sqlc, and PostgreSQL architecture.
            </p>
          </div>
          <div className="lg:pl-6">
            <h3 className="font-heading text-sm font-semibold">Tech Stack</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border bg-background px-2.5 py-1 text-xs text-muted-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <span>© 2026 Workspace Hub. Built for a full-stack portfolio.</span>
            <span>React · shadcn/ui · Gin · sqlc · PostgreSQL</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
