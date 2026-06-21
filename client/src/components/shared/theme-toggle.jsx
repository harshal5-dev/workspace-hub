import { IconSun, IconMoon } from "@tabler/icons-react";
import { useTheme } from "@/theme";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function ThemeToggle({ className, ...props }) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      className={cn("relative cursor-pointer", className)}
      onClick={toggleTheme}
      aria-label="Toggle theme"
      {...props}
    >
      <IconSun className="size-4 scale-100 rotate-0 transition-all duration-300 ease-in-out dark:scale-0 dark:-rotate-90" />
      <IconMoon className="absolute size-4 scale-0 rotate-90 transition-all duration-300 ease-in-out dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

export { ThemeToggle };
