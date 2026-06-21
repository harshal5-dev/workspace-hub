import {
  ArrowLeft,
  ArrowRight,
  Home,
  LayoutDashboard,
  SearchX,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function NotFoundContent({ withinDashboard = false }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <section
      className={cn(
        "mx-auto flex w-full max-w-4xl flex-col items-center text-center",
        withinDashboard ? "py-10 sm:py-16" : "px-4 py-24 sm:px-6 lg:px-8"
      )}
    >
      <div className="animate-fade-in-up relative">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border bg-background/80 text-primary shadow-lg shadow-foreground/5 backdrop-blur">
          <SearchX className="size-7" />
        </div>
        <div className="absolute -top-2 -right-2 rounded-full border bg-primary px-2 py-0.5 font-heading text-xs font-semibold text-primary-foreground shadow-sm">
          404
        </div>
      </div>

      <Badge
        variant="outline"
        className="mt-6 border-primary/20 bg-background/75 text-primary"
      >
        Route not found
      </Badge>

      <h1 className="mt-5 max-w-2xl font-heading text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
        This workspace page does not exist.
      </h1>

      <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
        We could not find{" "}
        <span className="rounded-md border bg-muted/50 px-1.5 py-0.5 font-mono text-xs text-foreground">
          {location.pathname}
        </span>
        . Head back to a known workspace route and keep moving.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className={buttonVariants({
            variant: "outline",
            className: "h-11 gap-2 rounded-xl bg-background/75 px-5",
          })}
        >
          <ArrowLeft className="size-4" />
          Go back
        </button>

        <Link
          to={withinDashboard ? "/dashboard" : "/"}
          className={buttonVariants({
            className: "h-11 gap-2 rounded-xl px-5 shadow-lg shadow-primary/20",
          })}
        >
          {withinDashboard ? (
            <LayoutDashboard className="size-4" />
          ) : (
            <Home className="size-4" />
          )}
          {withinDashboard ? "Open dashboard" : "Go home"}
        </Link>
      </div>

      {withinDashboard ? (
        <div className="mt-8 grid w-full gap-3 sm:grid-cols-3">
          {[
            ["Projects", "/dashboard/projects"],
            ["Kanban board", "/dashboard/kanban"],
            ["Members", "/dashboard/users"],
          ].map(([label, href]) => (
            <Link
              key={href}
              to={href}
              className="group rounded-2xl border bg-card/90 p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md"
            >
              <p className="font-heading text-sm font-semibold">{label}</p>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                Open workspace route
                <ArrowRight className="size-3 transition group-hover:translate-x-0.5" />
              </p>
            </Link>
          ))}
        </div>
      ) : null}
    </section>
  );
}

export default function NotFoundPage({ withinDashboard = false }) {
  if (withinDashboard) {
    return <NotFoundContent withinDashboard />;
  }

  return (
    <div className="app-surface min-h-svh bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b bg-background/82 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" aria-label="WorkspaceHub home" className="shrink-0">
            <Logo />
          </Link>
          <ThemeToggle className="rounded-lg" />
        </div>
      </header>

      <main className="relative flex min-h-svh items-center">
        <div className="pointer-events-none absolute top-24 right-0 h-72 w-1/2 rounded-l-full bg-primary/5 blur-3xl" />
        <NotFoundContent />
      </main>
    </div>
  );
}
