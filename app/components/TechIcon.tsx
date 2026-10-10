import { getTechIcon } from "../../lib/tech-icons";
import { cn } from "../../lib/utils";

type TechIconProps = {
  name: string;
  className?: string;
};

// Brand logo for a technology name; renders nothing for unknown names
export function TechIcon({ name, className }: TechIconProps) {
  const icon = getTechIcon(name);
  if (!icon) return null;

  if (icon.kind === "glyph") {
    const { Icon } = icon;
    return (
      <Icon
        aria-hidden="true"
        focusable="false"
        strokeWidth={1.75}
        className={cn("shrink-0", className)}
        style={{ color: icon.color }}
      />
    );
  }

  return (
    <svg
      viewBox={icon.viewBox}
      aria-hidden="true"
      focusable="false"
      fill="currentColor"
      className={cn("shrink-0", className)}
      style={{ color: icon.color }}
    >
      <path
        d={icon.path}
        fillRule={icon.evenOdd ? "evenodd" : undefined}
        clipRule={icon.evenOdd ? "evenodd" : undefined}
      />
    </svg>
  );
}

const chipSizes = {
  sm: "gap-1.5 border-line bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-muted",
  md: "gap-2 border-line-strong bg-linear-to-b from-white/[0.06] to-white/[0.01] px-3.5 py-1.5 text-sm text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors duration-200 hover:border-white/30",
};

export function TechChip({ name, size = "sm" }: { name: string; size?: keyof typeof chipSizes }) {
  return (
    <li className={cn("inline-flex items-center rounded-full border", chipSizes[size])}>
      <TechIcon name={name} className={size === "sm" ? "size-3" : "size-4"} />
      {name}
    </li>
  );
}

// Logo for a repo's GitHub language, or undefined so callers can fall back to a color dot
export function languageIcon(language?: string | null) {
  if (!language || !getTechIcon(language)) return undefined;
  return <TechIcon name={language} className="size-3" />;
}

// Render this on the server and hand it to client components as a prop,
// so the logo data never ships in the client bundle
export function TechList({ items, label = "Technologies" }: { items?: string[]; label?: string }) {
  if (!items || items.length === 0) return null;
  return (
    <ul aria-label={label} className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <TechChip key={item} name={item} />
      ))}
    </ul>
  );
}
