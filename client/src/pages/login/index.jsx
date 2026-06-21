import {
  ArrowRight,
  CheckCircle2,
  Home,
  KeyRound,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Workflow,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth";

const accessHighlights = [
  {
    icon: ShieldCheck,
    label: "Protected routes",
    description: "Dashboard opens only after demo sign in.",
  },
  {
    icon: UsersRound,
    label: "Team access",
    description: "Roles, members, and workspace views are ready.",
  },
  {
    icon: Workflow,
    label: "Product flow",
    description: "Overview, projects, and users share one polished shell.",
  },
];

const quickStats = [
  ["3", "Protected pages"],
  ["8", "Projects"],
  ["10", "Members"],
];

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;
  const redirectTo = from
    ? `${from.pathname}${from.search ?? ""}${from.hash ?? ""}`
    : "/dashboard";

  function handleSubmit(event) {
    event.preventDefault();
    signIn();
    navigate(redirectTo, { replace: true });
  }

  return (
    <div className="app-surface min-h-svh bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b bg-background/82 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" aria-label="WorkspaceHub home" className="shrink-0">
            <Logo />
          </Link>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className={buttonVariants({
                variant: "outline",
                size: "sm",
                className: "h-8 gap-2 bg-background/75 px-3",
              })}
            >
              <Home className="size-3.5" />
              Home
            </Link>
            <ThemeToggle className="rounded-lg" />
          </div>
        </div>
      </header>

      <main className="relative px-4 pt-20 pb-10 sm:px-6 sm:pt-24 lg:px-8">
        <div className="pointer-events-none absolute top-24 right-0 h-72 w-1/2 rounded-l-full bg-primary/5 blur-3xl" />
        <div className="mx-auto grid min-h-[calc(100svh-7rem)] max-w-6xl items-center gap-10 lg:grid-cols-[1fr_0.78fr]">
          <section className="animate-fade-in-up max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <LockKeyhole className="size-3.5" />
              Demo workspace access
            </div>
            <h1 className="font-heading text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl lg:text-[3.5rem]">
              Welcome back to WorkspaceHub.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Sign in with any email and password to open the redesigned
              dashboard. The login screen now follows the same clean warm style
              as the home page.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {quickStats.map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border bg-background/80 px-4 py-3 shadow-sm backdrop-blur"
                >
                  <p className="font-heading text-2xl font-semibold tracking-tight">
                    {value}
                  </p>
                  <p className="mt-1 text-xs font-medium text-muted-foreground">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {accessHighlights.map((item) => (
                <Card key={item.label} className="bg-card/82 shadow-sm">
                  <CardHeader className="p-4">
                    <div className="mb-3 flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                      <item.icon className="size-4" />
                    </div>
                    <CardTitle className="text-base">{item.label}</CardTitle>
                    <CardDescription className="leading-6">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </section>

          <Card className="animate-fade-in-up animation-delay-100 overflow-hidden rounded-[1.65rem] bg-card/92 shadow-2xl shadow-foreground/10 backdrop-blur">
            <div className="border-b bg-muted/30 px-5 py-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                    <KeyRound className="size-5" />
                  </div>
                  <div>
                    <CardTitle className="font-heading text-xl">
                      Sign in
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Any credentials work for this demo.
                    </CardDescription>
                  </div>
                </div>
                <div className="hidden items-center gap-1.5 rounded-full border bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground sm:inline-flex">
                  <CheckCircle2 className="size-3.5 text-primary" />
                  Ready
                </div>
              </div>
            </div>

            <CardContent className="space-y-6 p-5 sm:p-6">
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@workspace.dev"
                      className="h-11 rounded-xl bg-background/75 pl-9"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Use any password"
                      className="h-11 rounded-xl bg-background/75 pl-9"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Checkbox id="remember" />
                    <Label
                      htmlFor="remember"
                      className="text-sm font-normal text-muted-foreground"
                    >
                      Keep me signed in
                    </Label>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    <Sparkles className="size-3.5" />
                    Demo login
                  </span>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="h-11 w-full gap-2 rounded-xl shadow-lg shadow-primary/20"
                >
                  Open dashboard
                  <ArrowRight className="size-4" />
                </Button>
              </form>

              <div className="rounded-2xl border bg-muted/35 p-4">
                <p className="text-sm font-medium">After login</p>
                <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
                  {[
                    "Workspace control room",
                    "Projects workflow",
                    "Team member directory",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
