import { TechIcon } from "./TechIcon";

export default function Marquee({ items }: { items: string[] }) {
  // Two identical halves so translating by -50% loops seamlessly
  const row = [...items, ...items];

  return (
    <div className="full-bleed marquee-mask overflow-hidden border-y border-line py-6">
      <p className="sr-only">Tech stack: {items.join(", ")}</p>
      <ul aria-hidden="true" className="animate-marquee flex w-max">
        {row.map((item, i) => (
          <li
            key={`${item}-${i}`}
            className="flex items-center gap-10 pr-10 text-2xl font-medium tracking-[-0.03em] text-subtle sm:text-4xl"
          >
            <span className="flex items-center gap-3 transition-colors duration-300 hover:text-foreground sm:gap-4">
              <TechIcon name={item} className="size-6 sm:size-8" />
              {item}
            </span>
            <span className="text-base text-accent sm:text-xl">✦</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
