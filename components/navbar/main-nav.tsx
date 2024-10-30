import Link from "next/link";

import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav className={cn("", className)} {...props}>
      <Link
        href="/books"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Books
      </Link>
      <Link
        href="/books"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Fiction
      </Link>
      <Link
        href="/books"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        NonFiction
      </Link>
      <Link
        href="/books"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        eBooks
      </Link>
    </nav>
  );
}
