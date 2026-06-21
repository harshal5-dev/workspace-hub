import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Filter,
  FolderKanban,
  GitPullRequest,
  Plus,
  Search,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const projects = [
  {
    name: "Website redesign",
    description:
      "Refresh the marketing site, polish key pages, and prepare launch tasks.",
    status: "active",
    progress: 82,
    members: ["HP", "SC", "AM"],
    tech: ["Design", "Frontend"],
    updated: "Just now",
  },
  {
    name: "Mobile app launch",
    description:
      "Coordinate QA, release notes, store assets, and launch checklist work.",
    status: "active",
    progress: 68,
    members: ["HP", "JD"],
    tech: ["Launch", "QA"],
    updated: "2 hours ago",
  },
  {
    name: "API integration",
    description:
      "Connect workspace data, task updates, notifications, and reporting APIs.",
    status: "in-review",
    progress: 74,
    members: ["SC", "RK"],
    tech: ["Backend", "Data"],
    updated: "4 hours ago",
  },
  {
    name: "Customer onboarding",
    description:
      "Create guided setup tasks, invite flows, and first workspace templates.",
    status: "in-review",
    progress: 64,
    members: ["JD", "RK"],
    tech: ["Ops"],
    updated: "6 hours ago",
  },
  {
    name: "Sprint planning",
    description:
      "Plan priorities, assign owners, and track tasks across the current sprint.",
    status: "completed",
    progress: 100,
    members: ["HP"],
    tech: ["Planning"],
    updated: "1 day ago",
  },
  {
    name: "Design QA",
    description:
      "Review spacing, states, forms, and responsive behavior before release.",
    status: "completed",
    progress: 100,
    members: ["HP", "AM"],
    tech: ["Design", "QA"],
    updated: "1 day ago",
  },
  {
    name: "Invite workflow",
    description:
      "Improve invitation emails, member roles, and workspace access handoff.",
    status: "active",
    progress: 42,
    members: ["SC"],
    tech: ["Members"],
    updated: "2 days ago",
  },
  {
    name: "Task automation",
    description:
      "Add recurring task templates and lightweight workflow automation.",
    status: "active",
    progress: 58,
    members: ["AM", "HP"],
    tech: ["Tasks"],
    updated: "3 days ago",
  },
];

const statusConfig = {
  active: {
    label: "Active",
    icon: Clock3,
    className: "border-primary/20 bg-primary/10 text-primary",
    dotClass: "bg-primary",
  },
  "in-review": {
    label: "In Review",
    icon: GitPullRequest,
    className:
      "border-chart-2/20 bg-chart-2/10 text-amber-700 dark:text-amber-300",
    dotClass: "bg-chart-2",
  },
  completed: {
    label: "Completed",
    icon: CheckCircle2,
    className:
      "border-chart-3/20 bg-chart-3/10 text-emerald-700 dark:text-emerald-300",
    dotClass: "bg-chart-3",
  },
};

function ProjectCard({ project, index }) {
  const status = statusConfig[project.status];
  const StatusIcon = status.icon;

  return (
    <Card
      className="animate-fade-in-up group bg-card/90 shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-foreground/5"
      style={{
        animationDelay: `${index * 55}ms`,
        animationFillMode: "backwards",
      }}
    >
      <CardHeader>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <Badge variant="outline" className={cn("gap-1", status.className)}>
            <StatusIcon className="size-3" />
            {status.label}
          </Badge>
          {project.tech.slice(0, 2).map((item) => (
            <Badge
              key={item}
              variant="outline"
              className="border-border bg-muted/45 text-muted-foreground"
            >
              {item}
            </Badge>
          ))}
        </div>
        <CardTitle className="flex items-center justify-between gap-3 text-base">
          {project.name}
          <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
        </CardTitle>
        <CardDescription className="line-clamp-2 leading-6">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-auto space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-heading font-medium">{project.progress}%</span>
        </div>
        <Progress value={project.progress} />
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-3 bg-muted/30">
        <AvatarGroup>
          {project.members.map((member) => (
            <Avatar key={member} size="sm">
              <AvatarFallback className="bg-primary/10 text-[10px] font-semibold text-primary">
                {member}
              </AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
        <span className="truncate text-xs text-muted-foreground">
          Updated {project.updated}
        </span>
      </CardFooter>
    </Card>
  );
}

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const counts = useMemo(
    () => ({
      all: projects.length,
      active: projects.filter((project) => project.status === "active").length,
      "in-review": projects.filter((project) => project.status === "in-review")
        .length,
      completed: projects.filter((project) => project.status === "completed")
        .length,
    }),
    []
  );

  const filteredProjects = projects.filter((project) => {
    const query = search.toLowerCase();
    const matchesSearch =
      project.name.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.tech.some((item) => item.toLowerCase().includes(query));
    const matchesTab = activeTab === "all" || project.status === activeTab;

    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6">
      <section className="animate-fade-in-up grid gap-5 rounded-2xl border bg-card/90 p-5 shadow-sm backdrop-blur sm:p-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <FolderKanban className="size-3.5" />
            {projects.length} workspace projects
          </div>
          <h1 className="font-heading text-3xl font-semibold tracking-tight">
            Projects
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Manage workspace projects, track progress, assign members, and
            review task work across active, in-review, and completed projects.
          </p>
        </div>
        <Button className="h-10 gap-2 rounded-xl shadow-lg shadow-primary/20">
          <Plus className="size-4" />
          New project
        </Button>
      </section>

      <section className="animate-fade-in-up animation-delay-100 grid gap-4 rounded-2xl border bg-card/85 p-3 shadow-sm lg:grid-cols-[1fr_auto] lg:items-center">
        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <TabsList className="max-w-full overflow-x-auto">
            <TabsTrigger value="all">All ({counts.all})</TabsTrigger>
            <TabsTrigger value="active">Active ({counts.active})</TabsTrigger>
            <TabsTrigger value="in-review">
              Review ({counts["in-review"]})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Done ({counts.completed})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            variant="outline"
            size="sm"
            className="h-9 gap-2 rounded-xl bg-background/75"
          >
            <Filter className="size-4" />
            Filters
          </Button>
          <InputGroup className="sm:w-72">
            <InputGroupAddon>
              <InputGroupText>
                <Search className="size-4" />
              </InputGroupText>
            </InputGroupAddon>
            <InputGroupInput
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search projects..."
              value={search}
            />
          </InputGroup>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.name} index={index} project={project} />
        ))}
      </section>

      {filteredProjects.length === 0 ? (
        <Card className="animate-fade-in bg-card/90">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 flex size-14 items-center justify-center rounded-xl bg-muted text-muted-foreground">
              <Search className="size-6" />
            </div>
            <h3 className="font-heading text-lg font-medium">
              No projects found
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Try another search term or status filter.
            </p>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
