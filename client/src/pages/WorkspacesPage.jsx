import { SectionPage } from "./SectionPage"

export default function WorkspacesPage() {
  return (
    <SectionPage
      eyebrow="Tenant management"
      title="Workspaces"
      description="Manage tenant accounts, workspace metadata, subscription state, and organization-level settings."
      stats={[
        ["Active workspaces", "8", "2 created this month"],
        ["Owners", "11", "Across production tenants"],
        ["Pending setup", "3", "Waiting for invite acceptance"],
      ]}
      items={[
        "Workspace profile and tenant slug",
        "Owner and admin access overview",
        "Tenant status, limits, and onboarding checklist",
      ]}
    />
  )
}
