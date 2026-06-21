import { useMemo, useState } from "react";
import {
  Mail,
  MoreHorizontal,
  Pencil,
  Search,
  ShieldCheck,
  Trash2,
  UserPlus,
  UserRound,
  UsersRound,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const users = [
  {
    name: "Harshal Patil",
    email: "harshal@workspace.hub",
    role: "Owner",
    status: "active",
    lastActive: "Just now",
    initials: "HP",
  },
  {
    name: "Sarah Chen",
    email: "sarah@workspace.hub",
    role: "Admin",
    status: "active",
    lastActive: "5 min ago",
    initials: "SC",
  },
  {
    name: "John Doe",
    email: "john@workspace.hub",
    role: "Member",
    status: "active",
    lastActive: "1 hour ago",
    initials: "JD",
  },
  {
    name: "Aisha Mohammed",
    email: "aisha@workspace.hub",
    role: "Member",
    status: "active",
    lastActive: "3 hours ago",
    initials: "AM",
  },
  {
    name: "Raj Kumar",
    email: "raj@workspace.hub",
    role: "Admin",
    status: "active",
    lastActive: "30 min ago",
    initials: "RK",
  },
  {
    name: "Emily Wilson",
    email: "emily@workspace.hub",
    role: "Member",
    status: "inactive",
    lastActive: "2 days ago",
    initials: "EW",
  },
  {
    name: "Marcus Johnson",
    email: "marcus@workspace.hub",
    role: "Viewer",
    status: "active",
    lastActive: "15 min ago",
    initials: "MJ",
  },
  {
    name: "Lisa Park",
    email: "lisa@workspace.hub",
    role: "Member",
    status: "active",
    lastActive: "1 hour ago",
    initials: "LP",
  },
  {
    name: "David Brown",
    email: "david@workspace.hub",
    role: "Viewer",
    status: "inactive",
    lastActive: "5 days ago",
    initials: "DB",
  },
  {
    name: "Nina Patel",
    email: "nina@workspace.hub",
    role: "Member",
    status: "active",
    lastActive: "45 min ago",
    initials: "NP",
  },
];

const roleConfig = {
  Owner: {
    className: "border-primary/20 bg-primary/10 text-primary",
  },
  Admin: {
    className:
      "border-chart-2/20 bg-chart-2/10 text-amber-700 dark:text-amber-300",
  },
  Member: {
    className:
      "border-chart-3/20 bg-chart-3/10 text-emerald-700 dark:text-emerald-300",
  },
  Viewer: {
    className: "border-border bg-muted/45 text-muted-foreground",
  },
};

const roleOptions = ["Admin", "Member", "Viewer"];

function RoleBadge({ role }) {
  return (
    <Badge variant="outline" className={roleConfig[role].className}>
      {role}
    </Badge>
  );
}

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Member");

  const roleCounts = useMemo(
    () => ({
      all: users.length,
      admin: users.filter(
        (user) => user.role === "Admin" || user.role === "Owner"
      ).length,
      member: users.filter((user) => user.role === "Member").length,
      viewer: users.filter((user) => user.role === "Viewer").length,
      active: users.filter((user) => user.status === "active").length,
    }),
    []
  );

  const filteredUsers = users.filter((user) => {
    const query = search.toLowerCase();
    const matchesSearch =
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query);
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "admin" && ["Admin", "Owner"].includes(user.role)) ||
      user.role.toLowerCase() === activeTab;

    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-6">
      <section className="animate-fade-in-up grid gap-5 rounded-2xl border bg-card/90 p-5 shadow-sm backdrop-blur sm:p-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <UsersRound className="size-3.5" />
            {roleCounts.active} active members
          </div>
          <h1 className="font-heading text-3xl font-semibold tracking-tight">
            Members
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Manage workspace access, invite teammates, and review roles for the
            current workspace tenant.
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger
            render={
              <Button className="h-10 gap-2 rounded-xl shadow-lg shadow-primary/20">
                <UserPlus className="size-4" />
                Invite member
              </Button>
            }
          />
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Invite team member</DialogTitle>
              <DialogDescription>
                Add a teammate to the demo workspace with a selected role.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-5 py-2">
              <div className="space-y-2">
                <Label htmlFor="invite-email">Email address</Label>
                <InputGroup>
                  <InputGroupAddon>
                    <InputGroupText>
                      <Mail className="size-4" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput
                    id="invite-email"
                    onChange={(event) => setInviteEmail(event.target.value)}
                    placeholder="colleague@company.com"
                    type="email"
                    value={inviteEmail}
                  />
                </InputGroup>
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <div className="grid grid-cols-3 gap-2">
                  {roleOptions.map((role) => (
                    <Button
                      key={role}
                      onClick={() => setInviteRole(role)}
                      size="sm"
                      type="button"
                      variant={inviteRole === role ? "default" : "outline"}
                      className="rounded-xl"
                    >
                      {role}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter showCloseButton>
              <Button onClick={() => setDialogOpen(false)}>Send invite</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          {
            label: "Admins",
            value: roleCounts.admin,
            icon: ShieldCheck,
            accent: "bg-primary/10 text-primary ring-primary/20",
            detail: "Can manage workspace settings",
          },
          {
            label: "Members",
            value: roleCounts.member,
            icon: UsersRound,
            accent:
              "bg-chart-3/10 text-emerald-700 ring-chart-3/20 dark:text-emerald-300",
            detail: "Can collaborate on projects",
          },
          {
            label: "Viewers",
            value: roleCounts.viewer,
            icon: UserRound,
            accent:
              "bg-chart-2/10 text-amber-700 ring-chart-2/20 dark:text-amber-300",
            detail: "Can inspect workspace activity",
          },
        ].map((item, index) => (
          <Card
            key={item.label}
            className="animate-fade-in-up bg-card/90 shadow-sm"
            style={{
              animationDelay: `${index * 80}ms`,
              animationFillMode: "backwards",
            }}
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardDescription>{item.label}</CardDescription>
                  <CardTitle className="mt-1 text-3xl">{item.value}</CardTitle>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.detail}
                  </p>
                </div>
                <div
                  className={cn(
                    "flex size-11 items-center justify-center rounded-xl ring-1",
                    item.accent
                  )}
                >
                  <item.icon className="size-5" />
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </section>

      <section className="animate-fade-in-up animation-delay-100 grid gap-4 rounded-2xl border bg-card/85 p-3 shadow-sm lg:grid-cols-[1fr_auto] lg:items-center">
        <InputGroup className="lg:w-80">
          <InputGroupAddon>
            <InputGroupText>
              <Search className="size-4" />
            </InputGroupText>
          </InputGroupAddon>
          <InputGroupInput
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search members..."
            value={search}
          />
        </InputGroup>
        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <TabsList className="max-w-full overflow-x-auto">
            <TabsTrigger value="all">All ({roleCounts.all})</TabsTrigger>
            <TabsTrigger value="admin">Admin ({roleCounts.admin})</TabsTrigger>
            <TabsTrigger value="member">
              Member ({roleCounts.member})
            </TabsTrigger>
            <TabsTrigger value="viewer">
              Viewer ({roleCounts.viewer})
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </section>

      <Card className="animate-fade-in-up animation-delay-200 overflow-hidden bg-card/90 py-0 shadow-sm">
        <CardContent className="overflow-x-auto p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/35 hover:bg-muted/35">
                <TableHead className="min-w-[280px] px-4">User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last active</TableHead>
                <TableHead className="w-[56px]">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.email} className="group/row">
                  <TableCell className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                          {user.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <RoleBadge role={user.role} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "size-2 rounded-full",
                          user.status === "active"
                            ? "bg-primary"
                            : "bg-muted-foreground/50"
                        )}
                      />
                      <span className="text-sm capitalize">{user.status}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {user.lastActive}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button
                            className="transition-opacity sm:opacity-0 sm:group-hover/row:opacity-100"
                            size="icon-sm"
                            variant="ghost"
                          >
                            <MoreHorizontal className="size-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        }
                      />
                      <DropdownMenuContent align="end" className="w-44">
                        <DropdownMenuItem>
                          <UserRound className="size-4" />
                          View profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil className="size-4" />
                          Edit role
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">
                          <Trash2 className="size-4" />
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="animate-fade-in-up animation-delay-300 flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          Showing{" "}
          <span className="font-medium text-foreground">
            {filteredUsers.length}
          </span>{" "}
          of <span className="font-medium text-foreground">{users.length}</span>{" "}
          members
        </p>
        <div className="flex gap-2">
          <Button disabled size="sm" variant="outline">
            Previous
          </Button>
          <Button disabled size="sm" variant="outline">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
