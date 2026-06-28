import { Link, useLocation } from "react-router-dom"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

export function NavMain({
  items,
  label = "Workspace",
}) {
  const location = useLocation()
  const currentPath = `${location.pathname}${location.hash}`

  return (
    <SidebarGroup className="pt-3">
      <SidebarGroupLabel className="mb-1 px-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-sidebar-foreground/50">
        {label}
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item, index) => {
          const isActive =
            item.url === "/dashboard"
              ? location.pathname === "/dashboard" && !location.hash
              : currentPath === item.url

          return (
            <SidebarMenuItem
              key={item.title}
              className="animate-sidebar-menu-in"
              style={{ "--sidebar-menu-index": index }}
            >
              <SidebarMenuButton
                tooltip={item.title}
                isActive={isActive}
                render={<Link to={item.url} />}
                className={cn(
                  "group/menu-link relative h-10 overflow-hidden rounded-xl px-2.5 text-sidebar-foreground/75 transition-all duration-300 ease-out hover:translate-x-0.5 hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:text-sidebar-accent-foreground data-active:shadow-sm",
                  "group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:rounded-xl group-data-[collapsible=icon]:hover:translate-x-0 group-data-[collapsible=icon]:hover:bg-primary/10 group-data-[collapsible=icon]:data-active:bg-primary/12 group-data-[collapsible=icon]:data-active:text-primary group-data-[collapsible=icon]:data-active:shadow-none group-data-[collapsible=icon]:data-active:ring-1 group-data-[collapsible=icon]:data-active:ring-primary/20"
                )}
              >
                <span className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-sidebar-primary opacity-0 transition-opacity duration-300 group-data-active/menu-button:opacity-100 group-data-[collapsible=icon]:hidden" />
                <span
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-lg bg-transparent text-sidebar-foreground/65 transition-all duration-300 group-hover/menu-link:scale-105 group-hover/menu-link:bg-sidebar-accent group-hover/menu-link:text-sidebar-accent-foreground group-data-active/menu-button:bg-sidebar-primary group-data-active/menu-button:text-sidebar-primary-foreground group-data-[collapsible=icon]:size-4 group-data-[collapsible=icon]:rounded-none group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:text-sidebar-foreground/70 group-data-[collapsible=icon]:group-hover/menu-link:bg-transparent group-data-[collapsible=icon]:group-hover/menu-link:text-primary [&_svg]:size-4",
                    isActive &&
                      "group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:text-primary group-data-[collapsible=icon]:drop-shadow-sm"
                  )}
                >
                  {item.icon}
                </span>
                <span className="font-medium tracking-tight">{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
