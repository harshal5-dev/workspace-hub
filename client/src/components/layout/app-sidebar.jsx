import { IconDashboard, IconFolderCode, IconUsers } from "@tabler/icons-react";
import {
  Check,
  ChevronsUpDown,
  Pencil,
  Plus,
  Settings2,
  Sparkles,
  SquareKanban,
  Star,
  Trash2,
} from "lucide-react";

import { NavMain } from "@/components/layout/nav-main";
import { NavUser } from "@/components/layout/nav-user";
import { workspaceOptions } from "@/components/layout/workspace-options";
import { Logo } from "@/components/shared/logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "Overview",
    description: "Workspace snapshot",
    url: "/dashboard",
    icon: IconDashboard,
    badge: "Live",
  },
  {
    title: "Projects",
    description: "Project delivery",
    url: "/dashboard/projects",
    icon: IconFolderCode,
    badge: "8",
  },
  {
    title: "Kanban board",
    description: "Your assigned tasks",
    url: "/dashboard/kanban",
    icon: SquareKanban,
    badge: "24",
  },
  {
    title: "Members",
    description: "Team and roles",
    url: "/dashboard/users",
    icon: IconUsers,
    badge: "10",
  },
  {
    title: "Settings",
    description: "Workspace config",
    url: "/dashboard/settings",
    icon: Settings2,
  },
];

const mockUser = {
  name: "Harshal Patil",
  email: "Workspace owner",
  avatar: "",
};

function WorkspaceSwitcher({
  activeWorkspace,
  onWorkspaceChange,
  workspaces = workspaceOptions,
}) {
  const { isMobile } = useSidebar();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            className="group flex w-full items-center gap-3 rounded-2xl border bg-background/78 p-3 text-left shadow-sm backdrop-blur transition hover:border-border hover:bg-background/95 data-open:border-border data-open:bg-background/95"
          />
        }
      >
        <Logo
          collapsed
          className="shrink-0"
          iconClassName="size-10 rounded-xl"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate font-heading text-sm font-semibold">
            {activeWorkspace.name}
          </p>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary" />
            {activeWorkspace.description}
          </div>
        </div>
        <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground transition group-data-open:rotate-180" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        side={isMobile ? "bottom" : "right"}
        sideOffset={10}
        className="z-[70] w-[21rem] rounded-2xl border bg-popover p-2 shadow-2xl ring-1 ring-foreground/10"
      >
        <div className="px-2 py-2 text-sm font-semibold text-muted-foreground">
          Workspaces
        </div>

        <div className="space-y-1">
          {workspaces.map((workspace) => {
            const isActive = workspace.name === activeWorkspace.name;

            return (
              <DropdownMenuItem
                key={workspace.name}
                className={cn(
                  "rounded-xl border border-transparent p-2.5 transition-colors hover:bg-muted/50 focus:bg-muted/50",
                  isActive && "border-border bg-muted/40"
                )}
                onClick={() => onWorkspaceChange(workspace)}
              >
                <Logo
                  collapsed
                  className="shrink-0"
                  iconClassName="size-9 rounded-lg"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate font-heading font-semibold">
                      {workspace.name}
                    </span>
                    {isActive ? (
                      <span className="rounded-full border border-primary/20 bg-background px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                        Active
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {workspace.meta}
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-1 text-muted-foreground">
                  {workspace.favorite ? (
                    <Star className="size-4 fill-primary/20 text-primary" />
                  ) : null}
                  {isActive ? <Check className="size-4 text-primary" /> : null}
                </div>
              </DropdownMenuItem>
            );
          })}
        </div>

        <DropdownMenuSeparator className="my-2" />

        <div className="grid grid-cols-3 gap-1 px-1">
          {[
            ["Favorite", Star],
            ["Rename", Pencil],
            ["Delete", Trash2],
          ].map(([label, Icon]) => (
            <button
              key={label}
              type="button"
              className="flex items-center justify-center gap-1.5 rounded-xl border bg-background/70 px-2 py-2 text-xs text-muted-foreground transition hover:border-primary/15 hover:bg-muted/55 hover:text-foreground"
            >
              <Icon className="size-3.5" />
              {label}
            </button>
          ))}
        </div>

        <DropdownMenuSeparator className="my-2" />

        <DropdownMenuItem className="rounded-xl border border-transparent p-2.5 text-muted-foreground transition-colors hover:bg-muted/50 focus:bg-muted/50 focus:text-foreground">
          <span className="flex size-9 items-center justify-center rounded-xl border bg-background text-primary">
            <Plus className="size-4" />
          </span>
          <div>
            <p className="font-heading font-semibold">Add workspace</p>
            <p className="text-xs text-muted-foreground">
              Create another tenant for projects
            </p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AppSidebarContent({
  activeWorkspace = workspaceOptions[0],
  onWorkspaceChange = () => {},
  ...props
}) {
  return (
    <Sidebar
      collapsible="offcanvas"
      className="border-r bg-background/82 backdrop-blur-xl [&_[data-sidebar=sidebar]]:bg-background/82 [&_[data-sidebar=sidebar]]:backdrop-blur-xl"
      {...props}
    >
      <SidebarHeader className="p-3">
        <WorkspaceSwitcher
          activeWorkspace={activeWorkspace}
          onWorkspaceChange={onWorkspaceChange}
          workspaces={workspaceOptions}
        />
      </SidebarHeader>

      <SidebarContent className="px-2 py-1 pt-2">
        <div className="mx-1 mb-4 flex items-center gap-2 rounded-2xl border bg-background/68 px-3 py-2 text-xs text-muted-foreground shadow-sm">
          <Sparkles className="size-3.5 shrink-0" />
          {activeWorkspace.name} owns every project, task, and member.
        </div>
        <NavMain
          items={navItems}
          label="Manage"
          subtitle="Projects, tasks, and workspace controls"
        />
      </SidebarContent>

      <SidebarFooter className="p-3">
        <NavUser user={mockUser} />
      </SidebarFooter>
    </Sidebar>
  );
}

function AppSidebar(props) {
  return <AppSidebarContent {...props} />;
}

export { AppSidebar };
