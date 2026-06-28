import { IconMoon, IconSun } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/theme"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label="Toggle theme"
      title="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-full bg-background/70 backdrop-blur"
    >
      {isDark ? <IconSun className="size-4" /> : <IconMoon className="size-4" />}
    </Button>
  )
}
