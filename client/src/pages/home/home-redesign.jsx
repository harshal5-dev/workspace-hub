import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Database,
  FolderKanban,
  GitPullRequest,
  KeyRound,
  LayoutDashboard,
  LockKeyhole,
  Sparkles,
  UsersRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { SiteFooter } from "@/pages/home/components/site-footer";
import { SiteHeader } from "@/pages/home/components/site-header";

const heroStats = [
  { label: "Workspaces", value: "1" },
  { label: "Projects", value: "8" },
  { label: "Open tasks", value: "24" },
];

const previewProjects = [
  {
    name: "Website redesign",
    status: "Active",
    progress: 82,
    tone: "bg-primary",
  },
  {
    name: "API integration",
    status: "Review",
    progress: 74,
    tone: "bg-chart-2",
  },
  {
    name: "Task board",
    status: "Ready",
    progress: 100,
    tone: "bg-chart-3",
  },
];

const productCards = [
  {
    icon: LayoutDashboard,
    title: "Workspace as tenant",
    description:
      "Each workspace is a tenant with its own projects, members, roles, and task activity.",
  },
  {
    icon: FolderKanban,
    title: "Project and task flow",
    description:
      "Track active, review, and completed work with progress, owners, and clear status states.",
  },
  {
    icon: UsersRound,
    title: "Member access",
    description:
      "Invite teammates, manage workspace roles, and keep protected areas behind login.",
  },
];

const workflowItems = [
  {
    icon: KeyRound,
    label: "Sign in",
    description: "Open the protected workspace with a polished demo login.",
  },
  {
    icon: FolderKanban,
    label: "Track projects",
    description:
      "Filter active, review, and complete project work with clear status UI.",
  },
  {
    icon: CheckCircle2,
    label: "Manage tasks",
    description: "Review open work, completed tasks, and project progress.",
  },
  {
    icon: UsersRound,
    label: "Manage access",
    description: "Review team roles and invite members from one place.",
  },
];

function StatStrip() {
  return (
    <div className="flex flex-wrap gap-3">
      {heroStats.map((stat) => (
        <div
          key={stat.label}
          className="min-w-32 rounded-2xl border bg-background/80 px-4 py-3 shadow-sm backdrop-blur"
        >
          <p className="font-heading text-2xl font-semibold tracking-tight">
            {stat.value}
          </p>
          <p className="mt-1 text-xs font-medium text-muted-foreground">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}

function ProductPreview() {
  return (
    <div className="animate-fade-in-up animation-delay-100 relative mx-auto w-full max-w-[31rem]">
      <div className="absolute -top-10 right-8 size-52 rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute -bottom-8 left-4 size-44 rounded-full bg-amber-400/20 blur-3xl" />

      <div className="relative overflow-hidden rounded-[1.65rem] border bg-card/92 shadow-2xl shadow-foreground/10 backdrop-blur">
        <div className="flex items-center justify-between border-b bg-muted/30 px-4 py-3.5">
          <div>
            <p className="font-heading text-sm font-semibold">
              Workspace pulse
            </p>
            <p className="text-xs text-muted-foreground">Projects and tasks</p>
          </div>
          <Badge
            variant="outline"
            className="border-primary/20 bg-primary/10 text-primary"
          >
            Live demo
          </Badge>
        </div>

        <div className="space-y-3.5 p-4">
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["Projects", "8", FolderKanban],
              ["Tasks", "24", CheckCircle2],
              ["Members", "10", UsersRound],
            ].map(([label, value, Icon]) => (
              <div
                key={label}
                className="rounded-2xl border bg-background/85 p-3 shadow-sm"
              >
                <div className="mb-3 flex size-8 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                  <Icon className="size-4" />
                </div>
                <p className="text-2xl font-semibold tracking-tight">{value}</p>
                <p className="text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_0.78fr]">
            <div className="rounded-2xl border bg-background/85 p-4 shadow-sm">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p className="font-heading text-lg font-semibold">
                    Task activity
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Created and completed work
                  </p>
                </div>
                <div className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                  +18%
                </div>
              </div>
              <div className="flex h-28 items-end gap-2">
                {[42, 64, 53, 78, 69, 92, 74, 88].map((height, index) => (
                  <div
                    key={height + index}
                    className="flex flex-1 items-end rounded-full bg-muted"
                  >
                    <div
                      className={cn(
                        "w-full rounded-full",
                        index > 5 ? "bg-primary" : "bg-primary/45"
                      )}
                      style={{ height: `${height}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border bg-background/85 p-4 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="font-heading text-lg font-semibold">Projects</p>
                <ArrowUpRight className="size-4 text-primary" />
              </div>
              <div className="space-y-4">
                {previewProjects.map((project) => (
                  <div key={project.name} className="space-y-2">
                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="truncate font-medium">
                        {project.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {project.status}
                      </span>
                    </div>
                    <Progress value={project.progress} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {["Workspace tenant", "Task progress", "Member roles"].map(
              (item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-2xl border bg-muted/25 px-3 py-2 text-sm"
                >
                  <CheckCircle2 className="size-4 text-primary" />
                  {item}
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <div className="absolute -right-2 -bottom-5 hidden rounded-2xl border bg-background/95 p-4 shadow-xl shadow-foreground/10 backdrop-blur sm:block">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {["HP", "SC", "AM"].map((item) => (
              <div
                key={item}
                className="flex size-8 items-center justify-center rounded-full border-2 border-background bg-primary/10 text-[11px] font-semibold text-primary"
              >
                {item}
              </div>
            ))}
          </div>
          <div>
            <p className="text-sm font-medium">10 active members</p>
            <p className="text-xs text-muted-foreground">Team access ready</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionIntro({ badge, title, description, className }) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <Badge
        variant="outline"
        className="mb-4 border-primary/20 bg-primary/10 text-primary"
      >
        {badge}
      </Badge>
      <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-base leading-7 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

export default function HomeRedesignPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main>
        <section
          id="home"
          className="app-surface relative overflow-hidden pt-24 pb-14 sm:pt-28 sm:pb-18 lg:pt-24 lg:pb-4"
        >
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background" />
          <div className="pointer-events-none absolute top-28 right-0 h-72 w-1/2 rounded-l-full bg-primary/5 blur-3xl" />

          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.95fr] lg:px-8">
            <div className="animate-fade-in-up max-w-xl">
              <Badge
                variant="outline"
                className="mb-5 border-primary/20 bg-primary/10 text-primary"
              >
                <Sparkles className="size-3" />
                Multi-tenant project management
              </Badge>
              <h1 className="font-heading text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl lg:text-[3.75rem]">
                Manage projects and tasks inside every workspace.
              </h1>
              <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
                WorkspaceHub is a multi-tenant project and task management app.
                Each workspace acts as a tenant with its own projects, members,
                roles, and protected dashboard.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/login"
                  className={buttonVariants({
                    size: "lg",
                    className:
                      "h-11 rounded-xl px-5 shadow-lg shadow-primary/20",
                  })}
                >
                  Open dashboard
                  <ArrowRight className="size-4" />
                </Link>
                <a
                  href="#project"
                  className={buttonVariants({
                    variant: "outline",
                    size: "lg",
                    className: "h-11 rounded-xl bg-background/75 px-5",
                  })}
                >
                  View project
                </a>
              </div>

              <div className="mt-7">
                <StatStrip />
              </div>

              <div className="mt-6 flex flex-wrap gap-2 text-sm text-muted-foreground">
                {["Workspace tenants", "Project tracking", "Task progress"].map(
                  (item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1"
                    >
                      <CheckCircle2 className="size-3.5 text-primary" />
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>

            <ProductPreview />
          </div>
        </section>

        <section className="border-y bg-card/65 py-8">
          <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
            {[
              ["Multi-tenant", "Workspace scoped projects, tasks, and members"],
              ["Project flow", "Status, progress, owners, and review states"],
              ["Full stack", "React UI with Go and PostgreSQL direction"],
            ].map(([title, detail]) => (
              <div key={title} className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                  <CheckCircle2 className="size-5" />
                </div>
                <div>
                  <p className="font-medium">{title}</p>
                  <p className="text-sm text-muted-foreground">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div
            id="project"
            className="mx-auto max-w-6xl scroll-mt-24 px-4 sm:px-6 lg:px-8"
          >
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1fr] lg:items-start">
              <SectionIntro
                badge="Project"
                title="A clean workspace for projects and tasks."
                description="WorkspaceHub keeps the product surface focused: create a workspace, track projects, manage tasks, and invite members with role-based access."
              />

              <div className="grid gap-4 sm:grid-cols-3">
                {productCards.map((item) => (
                  <Card
                    key={item.title}
                    className="bg-card/90 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/5"
                  >
                    <CardHeader>
                      <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                        <item.icon className="size-5" />
                      </div>
                      <CardTitle>{item.title}</CardTitle>
                      <CardDescription className="leading-6">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-4">
              {workflowItems.map((item, index) => (
                <Card key={item.label} className="bg-background/80 shadow-sm">
                  <CardHeader>
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-muted text-muted-foreground ring-1 ring-border">
                        <item.icon className="size-5" />
                      </div>
                      <span className="font-heading text-sm font-semibold text-primary">
                        0{index + 1}
                      </span>
                    </div>
                    <CardTitle>{item.label}</CardTitle>
                    <CardDescription className="leading-6">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y bg-muted/35 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-center">
              <div className="overflow-hidden rounded-2xl border bg-card shadow-xl shadow-foreground/5">
                <div className="border-b bg-muted/35 px-5 py-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-medium">Current workspace activity</p>
                      <p className="text-sm text-muted-foreground">
                        Recent signals from the protected demo
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-primary/20 bg-primary/10 text-primary"
                    >
                      <Clock3 className="size-3" />
                      Updated now
                    </Badge>
                  </div>
                </div>
                <div className="divide-y">
                  {[
                    [
                      "Harshal",
                      "refined dashboard layout",
                      "Just now",
                      GitPullRequest,
                    ],
                    [
                      "Sarah",
                      "reviewed sqlc query layer",
                      "28 min ago",
                      Database,
                    ],
                    [
                      "Aisha",
                      "checked responsive QA",
                      "1 hour ago",
                      CheckCircle2,
                    ],
                  ].map(([name, action, time, Icon]) => (
                    <div key={action} className="flex items-center gap-4 p-5">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="size-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm">
                          <span className="font-medium">{name}</span>{" "}
                          <span className="text-muted-foreground">
                            {action}
                          </span>
                        </p>
                      </div>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <SectionIntro
                badge="Experience"
                title="Dashboard details are no longer an afterthought."
                description="The app now uses tighter spacing, balanced contrast, useful empty states, responsive cards, and shadcn primitives that feel consistent from the public page to the protected workspace."
              />
            </div>
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border bg-foreground text-background shadow-xl shadow-foreground/10">
            <div className="grid gap-6 p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:p-8">
              <div>
                <div className="mb-3 flex items-center gap-2 text-sm text-background/70">
                  <LockKeyhole className="size-4 text-primary" />
                  Protected workspace is ready
                </div>
                <h2 className="font-heading text-2xl font-semibold sm:text-3xl">
                  Sign in and review the redesigned dashboard experience.
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-background/70">
                  Use any email and password. The local demo auth will open the
                  protected WorkspaceHub shell.
                </p>
              </div>
              <Link
                to="/login"
                className={buttonVariants({
                  variant: "secondary",
                  size: "lg",
                  className:
                    "h-11 bg-background text-foreground hover:bg-background/90",
                })}
              >
                Continue to login
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
