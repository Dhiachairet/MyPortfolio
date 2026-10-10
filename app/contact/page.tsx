import { ArrowUpRight } from "lucide-react";
import ContactForm from "../components/ContactForm";
import CopyEmail from "../components/CopyEmail";
import LocalTime from "../components/LocalTime";
import Reveal from "../components/Reveal";
import { Eyebrow, Serif } from "../components/ui";
import { siteConfig } from "../../lib/site";

export const metadata = {
  title: "Contact",
};

const channels = [
  { label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  {
    label: "GitHub",
    value: `github.com/${siteConfig.githubUsername}`,
    href: `https://github.com/${siteConfig.githubUsername}`,
    external: true,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/dhia-chairet-baba16249",
    href: siteConfig.linkedinUrl,
    external: true,
  },
  { label: "Resume", value: "Download PDF", href: siteConfig.resumeUrl, download: true },
];

export default function ContactPage() {
  return (
    <section className="relative">
      <div aria-hidden="true" className="bg-grid full-bleed absolute -top-40 -z-10 h-[40rem]" />

      <Reveal>
        <Eyebrow>Contact</Eyebrow>
        <h1 className="mt-6 max-w-6xl text-[clamp(3rem,9vw,8rem)] leading-[0.92] font-medium tracking-[-0.05em]">
          Let&apos;s build <Serif className="text-accent">something</Serif> together.
        </h1>
      </Reveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_22rem] lg:items-start">
        <Reveal delay={0.1}>
          <p className="max-w-xl text-lg leading-relaxed text-muted">
            Final-year software engineering student looking for an end-of-study internship (PFE) where I can actually
            write code and contribute. If you have something going on, send me a message below and it lands straight
            in my inbox.
          </p>
          <div id="message" className="mt-8 scroll-mt-28">
            <ContactForm />
          </div>
        </Reveal>

        <div className="space-y-4 lg:sticky lg:top-28">
          <Reveal delay={0.2} className="rounded-3xl border border-line bg-surface/60 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <Eyebrow>Status</Eyebrow>
            <p className="mt-3 flex items-center gap-2.5 text-lg font-medium">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              Open to PFE internships
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-6">
              <div>
                <Eyebrow>Local time</Eyebrow>
                <LocalTime
                  timeZone={siteConfig.timeZone}
                  className="mt-2 block text-2xl font-medium tracking-[-0.03em] tabular-nums"
                />
              </div>
              <div>
                <Eyebrow>Based in</Eyebrow>
                <p className="mt-2 text-2xl font-medium tracking-[-0.03em]">Tunisia</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.25} className="rounded-3xl border border-line bg-surface/60 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <Eyebrow>Prefer email?</Eyebrow>
            <p className="mt-3 text-sm leading-relaxed text-muted">Copy my address and write from your own inbox.</p>
            <div className="mt-5">
              <CopyEmail email={siteConfig.email} />
            </div>
          </Reveal>
        </div>
      </div>

      <ul className="mt-20 border-b border-line sm:mt-28">
        {channels.map((channel, i) => (
          <li key={channel.label} className="border-t border-line">
            <Reveal delay={i * 0.05}>
              <a
                href={channel.href}
                target={channel.external ? "_blank" : undefined}
                rel={channel.external ? "noreferrer" : undefined}
                download={channel.download || undefined}
                className="group flex items-center gap-4 py-6 sm:gap-8 sm:py-8"
              >
                <span className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:gap-8">
                  <span className="shrink-0 font-mono text-xs uppercase tracking-[0.16em] text-subtle sm:w-32">
                    {channel.label}
                  </span>
                  <span className="min-w-0 text-xl font-medium tracking-[-0.03em] [overflow-wrap:anywhere] transition-colors duration-300 group-hover:text-accent sm:text-4xl">
                    {channel.value}
                  </span>
                </span>
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line-strong transition-all duration-300 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground sm:size-12">
                  <ArrowUpRight className="size-5" />
                </span>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
