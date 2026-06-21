import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Project", href: "#project" },
];

function SiteHeader() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean);

    if (!sections.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-32% 0px -58% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b bg-background/82 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" aria-label="WorkspaceHub home" className="shrink-0">
          <Logo />
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Primary navigation"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1);

            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setActiveSection(item.href.slice(1))}
                className={cn(
                  "group relative inline-flex h-9 items-center text-sm font-medium transition-colors after:absolute after:right-0 after:-bottom-1 after:left-0 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-primary after:transition-transform",
                  isActive
                    ? "text-foreground after:scale-x-100"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle className="rounded-lg" />
          <Link
            to="/login"
            className={buttonVariants({
              size: "sm",
              className: "h-8 gap-2 px-3 shadow-sm shadow-primary/20",
            })}
          >
            Sign in
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export { SiteHeader };
