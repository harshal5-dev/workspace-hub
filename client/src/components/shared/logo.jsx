import { cn } from "@/lib/utils";

function Logo({ collapsed = false, className, iconClassName, ...props }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 overflow-hidden transition-all duration-300 ease-in-out",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "relative flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm ring-1 shadow-primary/20 ring-primary/20",
          iconClassName
        )}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="size-8"
          aria-hidden="true"
        >
          <rect
            x="6"
            y="6"
            width="20"
            height="20"
            rx="6"
            fill="currentColor"
            opacity="0.18"
          />
          <path
            d="M10 12.5c0-1.38 1.12-2.5 2.5-2.5h7c1.38 0 2.5 1.12 2.5 2.5v7c0 1.38-1.12 2.5-2.5 2.5h-7A2.5 2.5 0 0 1 10 19.5v-7Z"
            fill="currentColor"
          />
          <path d="M14 14h4v4h-4v-4Z" fill="var(--primary)" opacity="0.95" />
        </svg>
      </div>

      <div
        className={cn(
          "flex flex-col overflow-hidden transition-all duration-300 ease-in-out",
          collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
        )}
      >
        <span className="font-heading text-base leading-tight font-semibold tracking-tight whitespace-nowrap select-none">
          Workspace
          <span className="text-primary">Hub</span>
        </span>
      </div>
    </div>
  );
}

export { Logo };
