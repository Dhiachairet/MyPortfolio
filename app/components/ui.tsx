import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

// Italic serif accent used inside headlines
export function Serif({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("font-serif font-normal italic tracking-[-0.01em]", className)}>{children}</span>;
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("font-mono text-xs uppercase tracking-[0.2em] text-subtle", className)}>{children}</p>
  );
}

const buttonBase =
  "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-5 py-3 text-sm font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-300 active:scale-[0.98]";

const buttonVariants = {
  primary:
    "bg-accent text-accent-foreground hover:shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent)_22%,transparent)]",
  secondary:
    "border border-line-strong bg-linear-to-b from-white/[0.08] to-white/[0.02] text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_1px_2px_rgba(0,0,0,0.4)] hover:border-white/25 hover:from-white/[0.12] hover:to-white/[0.04]",
  ghost: "text-muted hover:text-foreground",
};

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: keyof typeof buttonVariants;
  className?: string;
  download?: boolean;
  external?: boolean;
};

export function ButtonLink({ href, children, variant = "secondary", className, download, external }: ButtonLinkProps) {
  const classes = cn(buttonBase, buttonVariants[variant], className);
  const content = (
    <>
      {variant === "primary" && (
        // Shimmer sweep adapted from Watermelon UI's shimmer-button
        <span
          aria-hidden="true"
          className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        />
      )}
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </>
  );

  if (download || external || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={classes}
        download={download || undefined}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
