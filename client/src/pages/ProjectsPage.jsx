import { SectionPage } from "./SectionPage"

export default function ProjectsPage() {
  return (
    <SectionPage
      eyebrow="Delivery management"
      title="Projects"
      description="Track client initiatives, delivery progress, milestones, and project health inside each workspace."
      stats={[
        ["Open projects", "24", "6 shipping soon"],
        ["At risk", "3", "Need owner review"],
        ["Completed", "18", "Closed this quarter"],
      ]}
      items={[
        "Project list with tenant scoped filters",
        "Milestone progress and status summaries",
        "Owner assignment and project health signals",
      ]}
    />
  )
}
