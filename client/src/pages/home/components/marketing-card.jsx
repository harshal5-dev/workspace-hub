import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

function SectionIntro({ badge, title, description, className }) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {badge ? (
        <Badge
          variant="outline"
          className="mb-4 border-primary/20 bg-primary/10 text-primary"
        >
          {badge}
        </Badge>
      ) : null}
      <h2 className="font-heading text-3xl font-semibold sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}

function AccentCard({ item, className }) {
  return (
    <Card
      className={cn(
        "transition hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/5",
        className
      )}
    >
      <CardHeader>
        <div
          className={cn(
            "mb-3 flex size-10 items-center justify-center rounded-lg ring-1",
            item.accent
          )}
        >
          <item.icon className="size-5" />
        </div>
        {item.status ? (
          <Badge
            variant="outline"
            className={cn("mb-1 w-fit", item.statusClass)}
          >
            {item.status}
          </Badge>
        ) : null}
        <CardTitle>{item.title}</CardTitle>
        <CardDescription className="leading-6">
          {item.description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

function DetailTile({ item }) {
  return (
    <Card className="bg-card/80">
      <CardContent className="flex gap-3 pt-0">
        <div
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-lg",
            item.accent
          )}
        >
          <item.icon className="size-5" />
        </div>
        <div>
          <h3 className="font-heading text-base font-semibold">{item.label}</h3>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            {item.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export { AccentCard, DetailTile, SectionIntro };
