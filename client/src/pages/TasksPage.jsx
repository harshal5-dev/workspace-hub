import { SectionPage } from "./SectionPage"

export default function TasksPage() {
  return (
    <SectionPage
      eyebrow="Sprint execution"
      title="Tasks"
      description="Organize backlog, priority work, assignments, status changes, and sprint-level execution."
      stats={[
        ["Open tasks", "186", "42 high priority"],
        ["In review", "19", "Waiting for approval"],
        ["Done", "1,284", "+18% sprint velocity"],
      ]}
      items={[
        "Task board grouped by status",
        "Priority, assignee, and due date fields",
        "Activity timeline for status changes",
      ]}
    />
  )
}
