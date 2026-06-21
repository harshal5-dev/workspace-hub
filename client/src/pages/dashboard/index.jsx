import {
  ArrowUpRight,
  CheckCircle2,
  FolderKanban,
  ListTodo,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const stats = [
  {
    label: "Projects",
    value: "8",
    detail: "4 active this sprint",
    icon: FolderKanban,
    accent: "bg-primary/10 text-primary ring-primary/20",
  },
  {
    label: "Open tasks",
    value: "24",
    detail: "12 due this week",
    icon: ListTodo,
    accent: "bg-muted text-muted-foreground ring-border",
  },
  {
    label: "Members",
    value: "10",
    detail: "Owner, admin, viewer roles",
    icon: UsersRound,
    accent: "bg-card text-primary ring-primary/15",
  },
];

const priorityProjects = [
  {
    name: "Workspace dashboard",
    status: "Active",
    progress: 78,
    detail: "Task board and member access",
  },
  {
    name: "Project templates",
    status: "Review",
    progress: 64,
    detail: "Reusable setup for new tenants",
  },
  {
    name: "Invite flow",
    status: "Planned",
    progress: 38,
    detail: "Role-based teammate onboarding",
  },
];

const recentActivities = [
  {
    initials: "HP",
    name: "Harshal",
    text: "moved dashboard polish into review",
    time: "Now",
  },
  {
    initials: "SC",
    name: "Sarah",
    text: "completed task board QA",
    time: "28m",
  },
  {
    initials: "AM",
    name: "Aisha",
    text: "joined Personal Workspace",
    time: "2h",
  },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-5">
      <section className="animate-fade-in-up overflow-hidden rounded-2xl border bg-card shadow-sm">
        <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <Badge
              variant="outline"
              className="mb-4 border-primary/20 bg-primary/10 text-primary"
            >
              <ShieldCheck className="size-3" />
              Workspace tenant
            </Badge>
            <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Manage projects and tasks from one workspace.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              WorkspaceHub keeps each tenant focused: projects, tasks, members,
              and role-based access in a clean protected dashboard.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link
              to="/dashboard/projects"
              className={buttonVariants({
                className: "h-10 gap-2 rounded-xl shadow-lg shadow-primary/20",
              })}
            >
              View projects
              <ArrowUpRight className="size-4" />
            </Link>
            <Link
              to="/dashboard/users"
              className={buttonVariants({
                variant: "outline",
                className: "h-10 gap-2 rounded-xl bg-card",
              })}
            >
              Manage members
              <UsersRound className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, index) => (
          <Card
            key={stat.label}
            className="animate-fade-in-up bg-card shadow-sm"
            style={{
              animationDelay: `${index * 70}ms`,
              animationFillMode: "backwards",
            }}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <CardAction>
                <div
                  className={cn(
                    "flex size-10 items-center justify-center rounded-xl ring-1",
                    stat.accent
                  )}
                >
                  <stat.icon className="size-5" />
                </div>
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="font-heading text-3xl font-semibold tracking-tight">
                {stat.value}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {stat.detail}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.58fr_0.42fr]">
        <Card className="animate-fade-in-up bg-card shadow-sm">
          <CardHeader>
            <CardTitle>Priority projects</CardTitle>
            <CardDescription>
              Minimal project health for the current workspace.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {priorityProjects.map((project) => (
              <div
                key={project.name}
                className="rounded-2xl border bg-muted/25 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{project.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {project.detail}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="shrink-0 border-primary/15 bg-card text-primary"
                  >
                    {project.status}
                  </Badge>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <Progress value={project.progress} className="h-2 flex-1" />
                  <span className="w-10 text-right text-xs text-muted-foreground">
                    {project.progress}%
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="animate-fade-in-up bg-card shadow-sm">
          <CardHeader>
            <CardTitle>Workspace activity</CardTitle>
            <CardDescription>
              Recent movement across projects and tasks.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={`${activity.name}-${activity.time}`}
                className="flex items-center gap-3 rounded-2xl border bg-muted/25 p-3"
              >
                <Avatar className="size-10 rounded-xl">
                  <AvatarFallback className="rounded-xl bg-primary/10 text-xs font-semibold text-primary">
                    {activity.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{activity.name}</span>{" "}
                    <span className="text-muted-foreground">
                      {activity.text}
                    </span>
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {activity.time}
                </span>
              </div>
            ))}

            <div className="rounded-2xl border border-primary/15 bg-primary/10 p-4 text-sm text-primary">
              <div className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="size-4" />
                Tenant scope is clear
              </div>
              <p className="mt-2 text-primary/80">
                Every project, task, and member belongs to Personal Workspace.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
