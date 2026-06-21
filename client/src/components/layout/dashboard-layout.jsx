import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Building2, ShieldCheck } from "lucide-react";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { workspaceOptions } from "@/components/layout/workspace-options";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Badge } from "@/components/ui/badge";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const pageMeta = {
  "/dashboard": "Workspace overview",
  "/dashboard/projects": "Projects",
  "/dashboard/kanban": "Kanban board",
  "/dashboard/users": "Members",
  "/dashboard/settings": "Settings",
};

export default function DashboardLayout() {
  const location = useLocation();
  const title = pageMeta[location.pathname] ?? "Workspace";
  const [activeWorkspace, setActiveWorkspace] = useState(workspaceOptions[0]);

  return (
    <SidebarProvider
      open={true}
      className="dashboard-surface"
      style={{
        "--sidebar-width": "18rem",
      }}
    >
      <AppSidebar
        activeWorkspace={activeWorkspace}
        onWorkspaceChange={setActiveWorkspace}
      />
      <SidebarInset className="dashboard-grid min-h-svh bg-transparent">
        <header className="sticky top-0 z-40 border-b bg-background/82 backdrop-blur-xl">
          <div className="mx-auto flex h-14 w-full max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
            <SidebarTrigger className="-ml-1 size-8 rounded-xl border bg-background/75 shadow-sm hover:bg-muted md:hidden" />

            <div className="hidden min-w-0 flex-1 md:block">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-primary shadow-sm shadow-primary/40" />
                <p className="font-heading text-base font-semibold tracking-tight">
                  {title}
                </p>
                <Badge
                  variant="outline"
                  className="h-5 border-primary/15 bg-primary/10 px-2 text-[11px] text-primary"
                >
                  Tenant
                </Badge>
              </div>
            </div>

            <div className="min-w-0 flex-1 md:hidden">
              <p className="truncate font-heading text-sm font-semibold">
                {title}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                Workspace tenant
              </p>
            </div>

            <div className="ml-auto hidden items-center gap-3 rounded-full border bg-background/70 px-3 py-1.5 text-xs shadow-sm backdrop-blur sm:flex">
              <div className="flex items-center gap-1.5 font-medium">
                <Building2 className="size-3.5 text-primary" />
                {activeWorkspace.name}
              </div>
              <span className="h-4 w-px bg-border" />
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <ShieldCheck className="size-3.5 text-primary" />
                {activeWorkspace.description}
              </div>
            </div>

            <ThemeToggle className="rounded-xl border bg-background/75 shadow-sm" />
          </div>
        </header>

        <main className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
