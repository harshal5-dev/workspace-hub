import {
  BellRing,
  Building2,
  KeyRound,
  Settings2,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const settings = [
  {
    icon: Building2,
    title: "Workspace profile",
    description: "Personal Workspace is the active tenant for this demo.",
    enabled: true,
  },
  {
    icon: ShieldCheck,
    title: "Role based access",
    description: "Owner, admin, member, and viewer permissions are modeled.",
    enabled: true,
  },
  {
    icon: BellRing,
    title: "Task updates",
    description: "Notify members when assigned tasks move across the board.",
    enabled: false,
  },
  {
    icon: KeyRound,
    title: "Protected dashboard",
    description: "Dashboard routes stay behind the demo sign-in flow.",
    enabled: true,
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-5">
      <section className="animate-fade-in-up rounded-2xl border bg-card/92 p-5 shadow-sm backdrop-blur sm:p-6">
        <Badge
          variant="outline"
          className="mb-4 border-primary/20 bg-primary/10 text-primary"
        >
          <Settings2 className="size-3.5" />
          Workspace settings
        </Badge>
        <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          Settings
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
          Configure the current workspace tenant, access rules, and project
          management preferences.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.62fr_0.38fr]">
        <Card className="animate-fade-in-up bg-card/92 shadow-sm backdrop-blur">
          <CardHeader>
            <CardTitle>Workspace controls</CardTitle>
            <CardDescription>
              Clean settings preview for the portfolio dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {settings.map((item) => (
              <div
                key={item.title}
                className="flex items-center justify-between gap-4 rounded-2xl border bg-background/72 p-4 shadow-sm"
              >
                <div className="flex min-w-0 items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                    <item.icon className="size-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-medium">{item.title}</p>
                    <p className="mt-1 text-sm leading-5 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
                <Switch defaultChecked={item.enabled} aria-label={item.title} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="animate-fade-in-up bg-foreground text-background shadow-xl shadow-foreground/10">
          <CardHeader>
            <div className="mb-2 flex size-11 items-center justify-center rounded-xl bg-background/10 text-primary ring-1 ring-background/10">
              <UsersRound className="size-5" />
            </div>
            <CardTitle>Tenant summary</CardTitle>
            <CardDescription className="text-background/65">
              A focused settings surface for workspace-owned data.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {[
              ["Workspace", "Personal Workspace"],
              ["Projects", "8 active records"],
              ["Tasks", "24 open assignments"],
              ["Members", "10 invited users"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between gap-3 rounded-xl bg-background/10 px-3 py-2"
              >
                <span className="text-background/65">{label}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
