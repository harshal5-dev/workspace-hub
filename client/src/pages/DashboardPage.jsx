import {
  IconArrowUpRight,
  IconCalendarStats,
  IconCheck,
  IconClock,
  IconDatabase,
  IconGitBranch,
  IconPlus,
  IconShieldLock,
  IconUsers,
} from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const metrics = [
  ["Active tenants", "8", "+2 this month", "bg-primary/10 text-primary"],
  ["Open projects", "24", "6 shipping soon", "bg-muted text-muted-foreground"],
  ["Tasks completed", "1,284", "+18% sprint velocity", "bg-primary/10 text-primary"],
  ["Team members", "42", "Across 5 workspaces", "bg-muted text-muted-foreground"],
]

const projects = [
  ["API Platform Rewrite", "Backend", "78%", "Gin services, sqlc queries, tenant middleware"],
  ["Client Portal", "Frontend", "64%", "React routes, shadcn screens, role-aware views"],
  ["Reporting Workspace", "Analytics", "42%", "PostgreSQL views and project health metrics"],
]

const tasks = [
  ["Add organization scoped task filters", "High", "In progress", "Shraddha"],
  ["Generate sqlc project queries", "High", "Review", "Backend"],
  ["Polish dashboard empty states", "Medium", "Todo", "Frontend"],
  ["Model team invitations", "Medium", "Done", "API"],
]

const teams = [
  ["Core Product", "12 members", "Owns roadmap, UX, and tenant dashboards"],
  ["Platform API", "8 members", "Gin handlers, auth boundaries, sqlc query layer"],
  ["Client Success", "6 members", "Workspace onboarding and project templates"],
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm">
          <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_center,color-mix(in_oklch,var(--primary),transparent_78%),transparent_24rem)] md:block" />
          <div className="relative flex h-full flex-col justify-between gap-8">
            <div>
              <div className="mb-3 inline-flex rounded-full border bg-background/70 px-3 py-1 text-sm text-muted-foreground">
                Acme tenant · Owner workspace · Sprint 14
              </div>
              <h1 className="max-w-3xl font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                Manage tenant projects from planning to shipped work.
              </h1>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                A SaaS-style dashboard for portfolio reviewers: tenant-aware
                workspaces, project delivery, task ownership, team access, and a
                Go backend architecture represented in one product surface.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button>
                New project
                <IconPlus data-icon="inline-end" />
              </Button>
              <Button variant="outline">
                Invite team
                <IconUsers data-icon="inline-end" />
              </Button>
            </div>
          </div>
        </div>

        <Card className="overflow-hidden">
          <CardHeader className="border-b bg-muted/30">
            <CardTitle>Workspace pulse</CardTitle>
            <CardDescription>Live tenant delivery snapshot.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-5">
            {[
              ["Sprint completion", "72%", "w-[72%]"],
              ["Backend readiness", "84%", "w-[84%]"],
              ["UI polish", "68%", "w-[68%]"],
            ].map(([label, value, width]) => (
              <div key={label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-medium">{value}</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className={`h-2 rounded-full bg-primary ${width}`} />
                </div>
              </div>
            ))}
            <div className="rounded-xl border bg-background p-4">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <IconShieldLock className="size-5" />
                </span>
                <div>
                  <p className="font-medium">Tenant isolation active</p>
                  <p className="text-sm text-muted-foreground">Role checks and workspace scoping ready for API integration.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map(([label, value, note, tone]) => (
          <Card key={label}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between gap-3">
                <CardDescription>{label}</CardDescription>
                <span className={`size-2.5 rounded-full ${tone}`} />
              </div>
              <CardTitle className="text-3xl tracking-tight">{value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{note}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section id="projects" className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader className="flex-row items-start justify-between gap-4">
            <div>
              <CardTitle>Projects</CardTitle>
              <CardDescription>Delivery progress by workspace initiative.</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View all
              <IconArrowUpRight data-icon="inline-end" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {projects.map(([name, type, progress, description]) => (
              <div key={name} className="rounded-xl border bg-background p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-medium">{name}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{description}</div>
                  </div>
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                    {type}
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-2 flex-1 rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-primary" style={{ width: progress }} />
                  </div>
                  <span className="text-sm font-medium">{progress}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card id="platform" className="overflow-hidden">
          <CardHeader>
            <CardTitle>Backend architecture</CardTitle>
            <CardDescription>How the portfolio project is structured.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              [<IconUsers />, "Tenant middleware", "Resolve workspace and role before every protected request."],
              [<IconDatabase />, "sqlc repositories", "Typed PostgreSQL queries for projects, tasks, teams, and invites."],
              [<IconCalendarStats />, "Sprint metrics", "Aggregate task status for dashboard reporting and analytics."],
            ].map(([icon, title, description]) => (
              <div key={title} className="flex gap-3 rounded-xl border bg-background p-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary [&_svg]:size-5">
                  {icon}
                </span>
                <div>
                  <div className="font-medium">{title}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section id="roadmap" className="grid gap-6 lg:grid-cols-3">
        {[
          [<IconGitBranch />, "Sprint roadmap", "Ship tenant-scoped task filters, project views, and invite flows."],
          [<IconDatabase />, "Data layer", "Use sqlc generated repositories over PostgreSQL tenant tables."],
          [<IconShieldLock />, "Access model", "Separate owner, admin, and member actions across workspaces."],
        ].map(([icon, title, description]) => (
          <Card key={title}>
            <CardHeader>
              <span className="mb-2 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary [&_svg]:size-5">
                {icon}
              </span>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>

      <section id="tasks" className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <CardHeader>
            <CardTitle>Task pipeline</CardTitle>
            <CardDescription>Priority work across product and API teams.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {tasks.map(([task, priority, status, owner]) => (
              <div key={task} className="grid gap-3 rounded-xl border bg-background p-4 sm:grid-cols-[1fr_auto_auto] sm:items-center">
                <div>
                  <div className="font-medium">{task}</div>
                  <div className="mt-1 text-sm text-muted-foreground">Owner: {owner}</div>
                </div>
                <span className="w-fit rounded-full border px-2.5 py-1 text-xs text-muted-foreground">
                  {priority}
                </span>
                <span className="w-fit rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
                  {status}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card id="teams">
          <CardHeader>
            <CardTitle>Teams</CardTitle>
            <CardDescription>Role-aware groups for tenant collaboration.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3 xl:grid-cols-1">
            {teams.map(([name, members, description]) => (
              <div key={name} className="rounded-xl border bg-background p-4">
                <div className="mb-4 flex items-center justify-between">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <IconUsers className="size-5" />
                  </span>
                  <span className="text-sm text-muted-foreground">{members}</span>
                </div>
                <div className="font-medium">{name}</div>
                <p className="mt-1 text-sm text-muted-foreground">{description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section id="activity" className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
            <CardDescription>Tenant-scoped events ready for API integration.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              [<IconCheck />, "Project status updated", "API Platform Rewrite moved to implementation."],
              [<IconClock />, "Sprint planning", "12 tasks scheduled for the next tenant release."],
              [<IconUsers />, "Team invitation", "Backend reviewer invited to Platform API."],
            ].map(([icon, title, description]) => (
              <div key={title} className="flex gap-3">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground [&_svg]:size-4">
                  {icon}
                </span>
                <div>
                  <div className="font-medium">{title}</div>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card id="settings">
          <CardHeader>
            <CardTitle>Portfolio highlights</CardTitle>
            <CardDescription>What this UI communicates to reviewers.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            {[
              "Clean route structure for public and app screens.",
              "Tenant-aware content model for real SaaS workflows.",
              "Modern shadcn styling without changing theme tokens.",
              "Backend stack clearly represented in the product UX.",
            ].map((item) => (
              <div key={item} className="flex gap-2">
                <IconCheck className="mt-0.5 size-4 text-primary" />
                <span>{item}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
