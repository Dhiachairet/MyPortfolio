"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { ArrowRight, Download } from "lucide-react";
import { ButtonLink, Serif } from "./ui";
import { siteConfig } from "../../lib/site";
import { cn } from "../../lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

// Dividers for a 2x2 grid on mobile that becomes a single row on large screens
const statBorders = [
  "",
  "border-l pl-4 sm:pl-6",
  "border-t lg:border-t-0 lg:border-l lg:pl-6",
  "border-t border-l pl-4 sm:pl-6 lg:border-t-0",
];

const headline: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

const word: Variants = {
  hidden: { opacity: 0, y: "0.35em", filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease } },
};

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 16, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.8, ease, delay },
  };
}

function Words({ text }: { text: string }) {
  return text.split(" ").map((w, i) => (
    <span key={`${w}-${i}`}>
      <motion.span variants={word} className="inline-block">
        {w}
      </motion.span>{" "}
    </span>
  ));
}

export default function Hero({ repoCount }: { repoCount: number }) {
  const stats = [
    { label: "Public repos", value: repoCount > 0 ? String(repoCount) : "N/A", note: "Synced from GitHub" },
    { label: "Internships", value: "4", note: "Java · Angular · MERN" },
    { label: "Based in", value: "Tunisia", note: "Remote friendly" },
    { label: "Focus", value: "Full-stack", note: "& back-end systems" },
  ];

  return (
    <section className="relative">
      <div aria-hidden="true" className="bg-grid full-bleed absolute -top-40 -z-10 h-[44rem]" />

      <motion.div
        {...fadeUp(0)}
        className="flex flex-wrap items-center gap-x-4 gap-y-3 font-mono text-xs uppercase tracking-[0.18em] text-subtle"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1.5 font-sans text-[13px] normal-case tracking-normal text-foreground">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          Open to PFE internships
        </span>
        <span>Software Engineer · {siteConfig.location}</span>
      </motion.div>

      <motion.h1
        variants={headline}
        initial="hidden"
        animate="show"
        className="mt-8 max-w-6xl text-[clamp(2.6rem,8vw,7.25rem)] leading-[0.98] font-medium tracking-[-0.045em]"
      >
        <Words text="Hi, I'm" />
        <motion.span variants={word} className="inline-block align-[-0.08em]">
          <Image
            src="/avatar.jpg"
            alt="Portrait of Mohamed Dhia Chairet"
            width={240}
            height={160}
            priority
            className="inline-block h-[0.78em] w-[1.25em] -rotate-3 rounded-full object-cover ring-1 ring-white/15 transition-transform duration-500 hover:rotate-0"
          />
        </motion.span>{" "}
        <Words text="Dhia. I build full-stack apps that" />
        <motion.span variants={word} className="inline-block">
          <Serif className="text-accent">actually ship.</Serif>
        </motion.span>
      </motion.h1>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <motion.p {...fadeUp(0.7)} className="max-w-xl text-lg leading-relaxed text-muted">
          Final-year software engineering student at TEK-UP University. I build full-stack web apps from scratch:
          backend, database, UI, the whole thing. Everything in my portfolio is something I actually finished and
          got working.
        </motion.p>

        <motion.div {...fadeUp(0.8)} className="flex flex-wrap items-center gap-3">
          <ButtonLink href="/projects" variant="primary">
            View projects <ArrowRight className="size-4" />
          </ButtonLink>
          <ButtonLink href={siteConfig.resumeUrl} download>
            Download CV <Download className="size-4" />
          </ButtonLink>
          <ButtonLink href="/contact" variant="ghost">
            Let&apos;s talk
          </ButtonLink>
        </motion.div>
      </div>

      <motion.dl
        {...fadeUp(0.95)}
        className="mt-16 grid grid-cols-2 border-t border-line sm:mt-20 lg:grid-cols-4"
      >
        {stats.map((stat, i) => (
          <div key={stat.label} className={cn("border-line py-6 pr-4", statBorders[i])}>
            <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">{stat.label}</dt>
            <dd className="mt-3 text-3xl font-medium tracking-[-0.04em] sm:text-4xl">{stat.value}</dd>
            <dd className="mt-1 text-sm text-subtle">{stat.note}</dd>
          </div>
        ))}
      </motion.dl>
    </section>
  );
}
