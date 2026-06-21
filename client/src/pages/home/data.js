import {
  Boxes,
  Code2,
  Component,
  Database,
  FileCode2,
  KeyRound,
  LayoutDashboard,
  LockKeyhole,
  Palette,
  ServerCog,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Workflow,
} from "lucide-react";

const primaryAccent = "bg-primary/10 text-primary ring-primary/20";
const primaryStatus = "border-primary/20 bg-primary/10 text-primary";
const refinedAccent =
  "bg-emerald-500/10 text-emerald-700 ring-emerald-500/20 dark:text-emerald-300";
const refinedStatus =
  "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300";
const quietAccent = "bg-muted text-muted-foreground ring-border";
const quietStatus = "border-border bg-muted text-muted-foreground";

export const sectionCards = [
  {
    label: "Project",
    href: "#project",
    icon: LayoutDashboard,
    description: "Architecture, dashboard flow, auth guard, and UI modules.",
    accent: primaryAccent,
  },
  {
    label: "Stack",
    href: "#stack",
    icon: Component,
    description: "React, shadcn/ui, Go, Gin, sqlc, and PostgreSQL.",
    accent: refinedAccent,
  },
  {
    label: "Dashboard",
    href: "/login",
    icon: ShieldCheck,
    description: "Protected demo area that opens only after signing in.",
    accent: primaryAccent,
  },
];

export const projectHighlights = [
  {
    icon: Boxes,
    title: "Multi-tenant base",
    status: "Architecture",
    description:
      "Tenant-friendly workspace structure for projects, users, protected pages, and clean navigation.",
    accent: primaryAccent,
    statusClass: primaryStatus,
  },
  {
    icon: Palette,
    title: "Modern UI system",
    status: "Interface",
    description:
      "shadcn UI components, dark mode, responsive cards, badges, and reusable layout patterns.",
    accent: refinedAccent,
    statusClass: refinedStatus,
  },
  {
    icon: LockKeyhole,
    title: "Demo auth flow",
    status: "Protected",
    description:
      "Dashboard routes require signing in first, so the portfolio behaves more like a real app.",
    accent: primaryAccent,
    statusClass: primaryStatus,
  },
];

export const homeStats = [
  {
    label: "Public sections",
    value: "3",
    detail: "Home, Project, and Stack live on one smooth scrolling page.",
    icon: Workflow,
    accent: primaryAccent,
    barClass: "bg-primary",
  },
  {
    label: "Dashboard pages",
    value: "3",
    detail: "Overview, projects, and users are protected behind login.",
    icon: ShieldCheck,
    accent: refinedAccent,
    barClass: "bg-emerald-500",
  },
  {
    label: "Theme modes",
    value: "2",
    detail: "Light and dark mode keep your original shadcn color setup.",
    icon: Palette,
    accent:
      "bg-amber-500/10 text-amber-700 ring-amber-500/20 dark:text-amber-300",
    barClass: "bg-amber-500",
  },
];

export const projectModules = [
  {
    icon: LayoutDashboard,
    title: "Dashboard shell",
    status: "Ready",
    description:
      "Protected dashboard layout with sidebar navigation, breadcrumbs, charts, and activity cards.",
    accent: primaryAccent,
    statusClass: primaryStatus,
  },
  {
    icon: UsersRound,
    title: "Users workspace",
    status: "Managed",
    description:
      "User table, status badges, roles, avatars, and search-ready structure for tenant teams.",
    accent: refinedAccent,
    statusClass: refinedStatus,
  },
  {
    icon: Workflow,
    title: "Projects flow",
    status: "Tracked",
    description:
      "Project cards, filter tabs, progress indicators, owners, and technology labels.",
    accent: quietAccent,
    statusClass: quietStatus,
  },
  {
    icon: ShieldCheck,
    title: "Route guard",
    status: "Secured",
    description:
      "A lightweight demo auth layer blocks direct dashboard access until sign-in completes.",
    accent: primaryAccent,
    statusClass: primaryStatus,
  },
];

export const projectTimeline = [
  {
    step: "01",
    title: "Theme foundation",
    description:
      "Original shadcn tokens stay global while page styling uses restrained local accents.",
  },
  {
    step: "02",
    title: "Single page flow",
    description:
      "Project and Stack sit on the home page with smooth scroll navigation.",
  },
  {
    step: "03",
    title: "Dashboard protection",
    description:
      "The dashboard cannot be opened directly before login, and logout returns visitors home.",
  },
  {
    step: "04",
    title: "Portfolio polish",
    description:
      "The app shows product thinking without overloaded fake data or noisy colors.",
  },
];

export const stackGroups = [
  {
    title: "React frontend",
    icon: Component,
    description:
      "A Vite React app with routed public pages, protected dashboard views, and reusable UI composition.",
    items: ["React", "Vite", "React Router", "lucide icons"],
    accent: primaryAccent,
  },
  {
    title: "shadcn/ui system",
    icon: Sparkles,
    description:
      "shadcn/ui components, Tailwind CSS v4, theme tokens, dark mode, and clean application spacing.",
    items: ["shadcn/ui", "Tailwind CSS v4", "Geist", "Inter"],
    accent: refinedAccent,
  },
  {
    title: "Go API layer",
    icon: ServerCog,
    description:
      "Go with Gin gives the backend a simple, fast structure for auth, tenant APIs, and dashboard data.",
    items: ["Go", "Gin", "REST API", "Auth service"],
    accent: quietAccent,
  },
  {
    title: "Typed database",
    icon: Database,
    description:
      "sqlc and PostgreSQL keep database access explicit, typed, and ready for real tenant records.",
    items: ["sqlc", "PostgreSQL", "Typed queries", "Migrations"],
    accent: primaryAccent,
  },
];

export const stackDetails = [
  {
    icon: Code2,
    label: "React application",
    description: "Reusable page and card pieces keep the dashboard UI clean.",
    accent: "bg-primary/10 text-primary",
  },
  {
    icon: Sparkles,
    label: "shadcn/ui styling",
    description:
      "Buttons, cards, badges, inputs, and theme behavior use shadcn patterns.",
    accent: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  },
  {
    icon: ServerCog,
    label: "Go and Gin backend",
    description: "The server side is shaped for clean HTTP APIs and auth flow.",
    accent: "bg-primary/10 text-primary",
  },
  {
    icon: FileCode2,
    label: "sqlc queries",
    description: "Typed SQL helps keep data access readable and maintainable.",
    accent: "bg-muted text-muted-foreground",
  },
  {
    icon: Database,
    label: "PostgreSQL data",
    description:
      "Tenant records, projects, users, and roles can map to real tables.",
    accent: "bg-muted text-muted-foreground",
  },
  {
    icon: KeyRound,
    label: "Protected dashboard",
    description: "The app keeps dashboard routes behind the sign-in flow.",
    accent: "bg-primary/10 text-primary",
  },
];
