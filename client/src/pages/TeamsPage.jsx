import { SectionPage } from "./SectionPage"

export default function TeamsPage() {
  return (
    <SectionPage
      eyebrow="People and roles"
      title="Teams"
      description="Manage product teams, workspace members, invitations, and role-based access boundaries."
      stats={[
        ["Members", "42", "Across 5 teams"],
        ["Invites", "7", "Awaiting response"],
        ["Roles", "3", "Owner, admin, member"],
      ]}
      items={[
        "Team directory with member counts",
        "Pending invitations and role assignment",
        "Workspace permissions mapped to backend rules",
      ]}
    />
  )
}
