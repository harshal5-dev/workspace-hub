import {
  CalendarClock,
  CheckCircle2,
  CircleDot,
  ListTodo,
  SquareKanban,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const columns = [
  {
    title: "To do",
    count: 4,
    icon: ListTodo,
    tasks: [
      {
        title: "Create workspace invite email",
        project: "Invite flow",
        due: "Today",
        priority: "High",
      },
      {
        title: "Draft empty-state copy",
        project: "Project templates",
        due: "Tomorrow",
        priority: "Medium",
      },
    ],
  },
  {
    title: "In progress",
    count: 3,
    icon: CircleDot,
    tasks: [
      {
        title: "Polish dashboard sidebar states",
        project: "Workspace dashboard",
        due: "Today",
        priority: "High",
      },
      {
        title: "Connect task filters",
        project: "Task board",
        due: "Jun 24",
        priority: "Medium",
      },
    ],
  },
  {
    title: "Review",
    count: 2,
    icon: CalendarClock,
    tasks: [
      {
        title: "Validate member role badges",
        project: "Team access",
        due: "Jun 25",
        priority: "Low",
      },
    ],
  },
  {
    title: "Done",
    count: 5,
    icon: CheckCircle2,
    tasks: [
      {
        title: "Remove dashboard graph noise",
        project: "Workspace dashboard",
        due: "Done",
        priority: "Done",
      },
    ],
  },
];

export default function KanbanPage() {
  return (
    <div className="space-y-5">
      <section className="animate-fade-in-up rounded-2xl border bg-card/92 p-5 shadow-sm backdrop-blur sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Badge
              variant="outline"
              className="mb-4 border-primary/20 bg-primary/10 text-primary"
            >
              <SquareKanban className="size-3.5" />
              My task board
            </Badge>
            <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Kanban board
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Track assigned tasks across the current workspace tenant without
              leaving the project dashboard.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 rounded-2xl border bg-background/70 p-2 text-center shadow-sm">
            {[
              ["14", "Tasks"],
              ["3", "Active"],
              ["78%", "Focus"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-xl px-3 py-2">
                <p className="font-heading text-lg font-semibold">{value}</p>
                <p className="text-[11px] text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-4">
        {columns.map((column, index) => (
          <Card
            key={column.title}
            className="animate-fade-in-up bg-card/92 shadow-sm backdrop-blur"
            style={{
              animationDelay: `${index * 80}ms`,
              animationFillMode: "backwards",
            }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                    <column.icon className="size-4" />
                  </span>
                  <div>
                    <CardTitle className="text-base">{column.title}</CardTitle>
                    <CardDescription>{column.count} tasks</CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className="bg-background/70">
                  {column.count}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {column.tasks.map((task) => (
                <div
                  key={task.title}
                  className="rounded-2xl border bg-background/72 p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm leading-5 font-semibold">
                      {task.title}
                    </p>
                    <Badge
                      variant="outline"
                      className={cn(
                        "shrink-0 bg-card text-[11px]",
                        task.priority === "High" &&
                          "border-primary/25 text-primary",
                        task.priority === "Done" &&
                          "border-primary/20 bg-primary/10 text-primary"
                      )}
                    >
                      {task.priority}
                    </Badge>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {task.project}
                  </p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="size-7 rounded-lg">
                        <AvatarFallback className="rounded-lg bg-primary/10 text-[10px] font-semibold text-primary">
                          HP
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">
                        Assigned to you
                      </span>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">
                      {task.due}
                    </span>
                  </div>
                </div>
              ))}

              <div className="rounded-2xl border border-dashed bg-muted/20 p-3">
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="font-medium text-muted-foreground">
                    Column progress
                  </span>
                  <span className="text-muted-foreground">
                    {Math.min(column.count * 18, 100)}%
                  </span>
                </div>
                <Progress value={Math.min(column.count * 18, 100)} />
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
