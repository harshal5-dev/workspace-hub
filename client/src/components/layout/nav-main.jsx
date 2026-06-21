import { Link, useLocation } from "react-router-dom";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

function NavMain({ items, label = "Workspace", subtitle }) {
  const location = useLocation();

  return (
    <SidebarGroup className="px-0">
      <div className="px-3 pb-2">
        <SidebarGroupLabel className="h-auto px-0 text-[11px] font-semibold tracking-[0.16em] text-muted-foreground/75 uppercase">
          {label}
        </SidebarGroupLabel>
        {subtitle ? (
          <p className="mt-1 text-xs leading-4 text-muted-foreground">
            {subtitle}
          </p>
        ) : null}
      </div>
      <SidebarMenu className="gap-1">
        {items.map((item, index) => {
          const isActive =
            item.url === "/dashboard"
              ? location.pathname === "/dashboard"
              : location.pathname.startsWith(item.url);

          return (
            <SidebarMenuItem
              key={item.title}
              className="animate-slide-in-left px-1 py-1"
              style={{
                animationDelay: `${index * 75}ms`,
                animationFillMode: "backwards",
              }}
            >
              <SidebarMenuButton
                isActive={isActive}
                tooltip={item.title}
                render={<Link to={item.url} />}
                className={cn(
                  "relative h-[3.75rem] overflow-hidden rounded-2xl border border-transparent bg-background/45 px-2.5 text-muted-foreground shadow-sm transition-all duration-300 hover:translate-x-1 hover:border-border hover:bg-muted/45 hover:text-foreground hover:shadow-md hover:shadow-foreground/5",
                  isActive &&
                    "border-border bg-background/80 text-foreground shadow-md ring-1 shadow-foreground/5 ring-border hover:bg-background/85 hover:text-foreground"
                )}
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/5 to-transparent opacity-0 transition duration-700 group-hover/menu-button:translate-x-full group-hover/menu-button:opacity-100" />
                {isActive ? (
                  <span className="absolute top-2 bottom-2 left-0 w-1 rounded-r-full bg-primary shadow-sm shadow-primary/40" />
                ) : null}
                {item.icon ? (
                  <span
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground ring-1 ring-transparent transition",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-sm ring-primary/20"
                        : "group-hover/menu-button:bg-background group-hover/menu-button:text-primary group-hover/menu-button:ring-primary/12"
                    )}
                  >
                    <item.icon className="size-4" />
                  </span>
                ) : null}
                <span className="relative min-w-0 flex-1 text-left leading-tight">
                  <span className="block truncate font-heading text-sm font-semibold">
                    {item.title}
                  </span>
                  {item.description ? (
                    <span className="mt-0.5 block truncate text-xs font-normal text-muted-foreground">
                      {item.description}
                    </span>
                  ) : null}
                </span>
                {item.badge ? (
                  <span
                    className={cn(
                      "relative ml-auto flex h-6 min-w-6 shrink-0 items-center justify-center rounded-full px-2 text-[11px] font-semibold transition",
                      isActive
                        ? "bg-background text-primary ring-1 ring-primary/15"
                        : "bg-muted text-muted-foreground ring-1 ring-border"
                    )}
                  >
                    {item.badge}
                  </span>
                ) : null}
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

export { NavMain };
