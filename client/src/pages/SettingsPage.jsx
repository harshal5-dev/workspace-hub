import { SectionPage } from "./SectionPage"

export default function SettingsPage() {
  return (
    <SectionPage
      eyebrow="Workspace controls"
      title="Settings"
      description="Configure organization preferences, API keys, notifications, and secure tenant defaults."
      stats={[
        ["API keys", "4", "2 production keys"],
        ["Notifications", "12", "Rules configured"],
        ["Audit events", "842", "Last 30 days"],
      ]}
      items={[
        "Organization profile and workspace preferences",
        "API key management for Gin backend integrations",
        "Notification, audit, and security settings",
      ]}
    />
  )
}
