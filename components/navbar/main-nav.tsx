import Link from "next/link";

import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn("", className)} {...props}>
      <Link
        href="/results/Fiction"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Fiction
      </Link>
      <Link
        href="/results/NonFiction"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        NonFiction
      </Link>
      <Link
        href="/results/eBooks"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        eBooks
      </Link>
    </nav>
  );
}
