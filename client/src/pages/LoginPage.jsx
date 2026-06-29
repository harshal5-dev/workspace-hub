import { Link } from "react-router-dom";
import {
  IconArrowRight,
  IconBrandGithub,
  IconHome,
  IconLock,
  IconMail,
} from "@tabler/icons-react";

import { BrandLogo } from "@/components/brand-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen bg-background lg:grid-cols-[0.95fr_1.05fr]">
      <section className="relative hidden overflow-hidden border-r bg-muted/30 p-10 lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,color-mix(in_oklch,var(--primary),transparent_74%),transparent_30rem),radial-gradient(circle_at_80%_85%,color-mix(in_oklch,var(--accent),transparent_82%),transparent_28rem)]" />
        <div className="relative flex items-center justify-between">
          <Link to="/" aria-label="Workspace Hub home">
            <BrandLogo />
          </Link>
          <ThemeToggle />
        </div>
        <div className="animate-fade-slide-right animation-delay-100 relative max-w-lg">
          <div className="mb-6 inline-flex rounded-full border bg-card/70 px-3 py-1 text-sm text-muted-foreground backdrop-blur">
            Secure tenant access
          </div>
          <h1 className="font-heading text-5xl font-semibold tracking-tight">
            One login for every workspace, project, and delivery team.
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Portfolio-ready authentication screen for a multi-tenant task
            platform backed by Gin, sqlc, and PostgreSQL.
          </p>
        </div>
        <Card className="animate-fade-slide-up animation-delay-300 relative bg-card/70 backdrop-blur">
          <CardContent className="grid grid-cols-3 gap-4 p-5">
            {[
              ["99.9%", "Tenant uptime"],
              ["3", "Roles"],
              ["2FA", "Ready"],
            ].map(([value, label]) => (
              <div key={label}>
                <div className="text-2xl font-semibold">{value}</div>
                <div className="text-xs text-muted-foreground">{label}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="relative flex items-center justify-center px-6 py-10">
        <div className="absolute top-8 right-8 hidden items-center gap-2 lg:flex">
          <Button variant="ghost" render={<Link to="/" />}>
            <IconHome />
            Home
          </Button>
        </div>
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center justify-between lg:hidden">
            <Link to="/" aria-label="Workspace Hub home">
              <BrandLogo />
            </Link>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button variant="ghost" render={<Link to="/" />}>
                <IconHome />
                Home
              </Button>
            </div>
          </div>

          <Card className="animate-fade-slide-up overflow-hidden shadow-xl shadow-primary/5">
            <div className="h-1 bg-linear-to-r from-primary via-primary/60 to-transparent" />
            <CardHeader>
              <CardTitle className="text-2xl">Welcome back</CardTitle>
              <CardDescription>
                Sign in to manage tenants, projects, tasks, and team members.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-3">
                <label className="text-sm font-medium" htmlFor="email">
                  Email
                </label>
                <div className="relative">
                  <IconMail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    className="pl-9"
                  />
                </div>
              </div>
              <div className="grid gap-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium" htmlFor="password">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <IconLock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    className="pl-9"
                  />
                </div>
              </div>
              <Button
                className="w-full"
                size="lg"
                render={<Link to="/dashboard" />}
              >
                Continue to dashboard
                <IconArrowRight data-icon="inline-end" />
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or</span>
                </div>
              </div>
              <Button variant="outline" className="w-full" size="lg">
                <IconBrandGithub />
                Continue with GitHub
              </Button>
              <div className="rounded-xl border bg-muted/40 p-4 text-sm text-muted-foreground">
                Demo tenant:{" "}
                <span className="font-medium text-foreground">acme</span> ·
                Role: <span className="font-medium text-foreground">Owner</span>{" "}
                · Backend:{" "}
                <span className="font-medium text-foreground">
                  Gin + PostgreSQL
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
