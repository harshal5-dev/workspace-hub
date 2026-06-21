import { ShieldCheck, Workflow } from "lucide-react";

import { Logo } from "@/components/shared/logo";

function SiteFooter() {
  return (
    <footer className="border-t bg-card/75">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <Logo />
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <a href="#project" className="transition hover:text-foreground">
            Project
          </a>
          <span className="hidden h-4 w-px bg-border sm:block" />
          <span className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-primary" />
            Protected demo
          </span>
          <span className="flex items-center gap-2">
            <Workflow className="size-4 text-primary" />
            shadcn dashboard
          </span>
        </div>
      </div>
    </footer>
  );
}

export { SiteFooter };
