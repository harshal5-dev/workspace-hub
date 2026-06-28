"use client"

import {
  IconBriefcase,
  IconBuildingCommunity,
  IconChecklist,
  IconLayoutDashboard,
  IconLayoutKanban,
  IconSettings,
  IconUsersGroup,
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Shraddha",
    email: "owner@workspacehub.dev",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Workspace",
      logo: <IconLayoutKanban />,
      plan: "Owner",
    },
    {
      name: "Nimbus Labs",
      logo: <IconBuildingCommunity />,
      plan: "Admin",
    },
    {
      name: "Orbit Studio",
      logo: <IconBriefcase />,
      plan: "Member",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <IconLayoutDashboard />,
      isActive: true,
    },
    {
      title: "Workspaces",
      url: "/dashboard/workspaces",
      icon: <IconBuildingCommunity />,
    },
    {
      title: "Projects",
      url: "/dashboard/projects",
      icon: <IconBriefcase />,
    },
    {
      title: "Tasks",
      url: "/dashboard/tasks",
      icon: <IconChecklist />,
    },
    {
      title: "Teams",
      url: "/dashboard/teams",
      icon: <IconUsersGroup />,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: <IconSettings />,
    },
  ],
}

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} label="Menu" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
