import {
  IconLogout,
  IconSelector,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import { Building2, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { signOut } from "@/lib/auth";

function NavUser({ user }) {
  const { isMobile } = useSidebar();
  const navigate = useNavigate();

  function handleLogout() {
    signOut();
    navigate("/", { replace: true });
  }

  const initials = user.name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="h-auto rounded-2xl border bg-background/78 p-3 shadow-sm backdrop-blur transition hover:border-primary/20 hover:bg-background/92 data-open:border-primary/20 data-open:bg-primary/10 data-open:text-sidebar-accent-foreground"
              />
            }
          >
            <Avatar
              size="sm"
              className="size-11 rounded-2xl ring-1 ring-primary/15"
            >
              <AvatarFallback className="rounded-2xl bg-primary text-sm font-semibold text-primary-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1 text-left text-sm leading-tight">
              <div className="flex min-w-0 items-center gap-2">
                <span className="truncate font-heading font-semibold">
                  {user.name}
                </span>
                <span className="shrink-0 rounded-full border border-primary/15 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                  Owner
                </span>
              </div>
              <span className="mt-0.5 flex items-center gap-1.5 truncate text-xs text-muted-foreground">
                <span className="size-1.5 rounded-full bg-primary" />
                {user.email}
              </span>
            </div>
            <IconSelector className="ml-auto size-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-64 rounded-2xl p-1"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={6}
          >
            <div className="p-1 font-normal">
              <div className="rounded-xl bg-primary/10 p-3 text-left text-sm ring-1 ring-primary/15">
                <div className="flex items-center gap-2.5">
                  <Avatar size="sm" className="size-10 rounded-xl">
                    <AvatarFallback className="rounded-xl bg-primary text-xs font-semibold text-primary-foreground">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-heading font-semibold">
                      {user.name}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      Workspace owner
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 rounded-lg bg-card px-2.5 py-2 text-xs text-muted-foreground">
                  <Building2 className="size-3.5 text-primary" />
                  Personal Workspace tenant
                </div>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconUser className="size-4" />
                Profile preview
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ShieldCheck className="size-4" />
                Demo session active
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconSettings className="size-4" />
                Workspace settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={handleLogout}
            >
              <IconLogout className="size-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export { NavUser };
