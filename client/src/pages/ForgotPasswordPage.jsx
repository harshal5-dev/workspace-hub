import { Link } from "react-router-dom";
import {
  IconArrowLeft,
  IconArrowRight,
  IconCheck,
  IconHome,
  IconLockCode,
  IconMail,
  IconShieldCheck,
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

const recoverySteps = [
  "Enter your workspace email address.",
  "Receive a secure reset link if the account exists.",
  "Create a new password and return to your workspace.",
];

export default function ForgotPasswordPage() {
  return (
    <main className="grid min-h-screen bg-background lg:grid-cols-[0.95fr_1.05fr]">
        <aside className="relative hidden overflow-hidden border-r bg-muted/30 p-10 lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,color-mix(in_oklch,var(--primary),transparent_74%),transparent_30rem),radial-gradient(circle_at_80%_85%,color-mix(in_oklch,var(--accent),transparent_82%),transparent_28rem)]" />
          <div className="relative flex items-center justify-between">
            <Link to="/" aria-label="Workspace Hub home">
              <BrandLogo />
            </Link>
            <ThemeToggle />
          </div>

          <div className="animate-fade-slide-right animation-delay-100 relative max-w-lg">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-card/70 px-3 py-1 text-sm text-muted-foreground backdrop-blur">
              <IconShieldCheck className="size-4 text-primary" />
              Secure account recovery
            </div>
            <h1 className="font-heading text-5xl font-semibold tracking-tight">
              Reset access without losing tenant security.
            </h1>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              A clean recovery flow for workspace owners, admins, and members in
              your multi-tenant task management platform.
            </p>
          </div>

          <Card className="animate-fade-slide-up animation-delay-300 relative bg-card/70 backdrop-blur">
            <CardContent className="space-y-4 p-5">
              {recoverySteps.map((step) => (
                <div key={step} className="flex items-center gap-3">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <IconCheck className="size-4" />
                  </span>
                  <span className="text-sm text-muted-foreground">{step}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>

        <section className="relative flex items-center justify-center px-6 py-10">
          <div className="absolute top-6 right-6 flex items-center gap-2 lg:top-8 lg:right-8">
            <Button variant="ghost" render={<Link to="/" />}>
              <IconHome />
              Home
            </Button>
            <div className="lg:hidden">
              <ThemeToggle />
            </div>
          </div>

          <div className="w-full max-w-md pt-16 lg:pt-0">
            <div className="mb-8 lg:hidden">
              <Link to="/" aria-label="Workspace Hub home">
                <BrandLogo />
              </Link>
            </div>

            <Card className="animate-fade-slide-up overflow-hidden shadow-xl shadow-primary/5">
              <div className="h-1 bg-linear-to-r from-primary via-primary/60 to-transparent" />
              <CardHeader>
                <span className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <IconLockCode className="size-6" />
                </span>
                <CardTitle className="text-2xl">Forgot password?</CardTitle>
                <CardDescription>
                  Enter your email and we will send instructions to reset your
                  workspace password.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid gap-3">
                  <label
                    className="text-sm font-medium"
                    htmlFor="recovery-email"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <IconMail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="recovery-email"
                      type="email"
                      placeholder="you@company.com"
                      className="h-10 pl-9"
                    />
                  </div>
                </div>

                <Button className="w-full" size="lg">
                  Send reset link
                  <IconArrowRight data-icon="inline-end" />
                </Button>

                <div className="rounded-xl border bg-muted/35 p-4 text-sm leading-6 text-muted-foreground">
                  For security, the response is the same whether the account
                  exists or not. Your Gin API can handle this without exposing
                  tenant data.
                </div>

                <Button
                  variant="ghost"
                  className="w-full"
                  render={<Link to="/login" />}
                >
                  <IconArrowLeft />
                  Back to login
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
    </main>
  );
}
