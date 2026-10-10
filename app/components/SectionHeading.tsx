import type { ReactNode } from "react";
import Reveal from "./Reveal";
import { Eyebrow } from "./ui";

type SectionHeadingProps = {
  index: string;
  label: string;
  title: ReactNode;
  action?: ReactNode;
};

export default function SectionHeading({ index, label, title, action }: SectionHeadingProps) {
  return (
    <Reveal className="mb-10 flex flex-col gap-6 border-t border-line pt-6 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <Eyebrow>
          <span className="text-accent">{index}</span> / {label}
        </Eyebrow>
        <h2 className="mt-5 text-4xl font-medium tracking-[-0.04em] sm:text-5xl lg:text-6xl">{title}</h2>
      </div>
      {action}
    </Reveal>
  );
}
