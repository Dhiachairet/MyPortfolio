import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import LocalTime from "./LocalTime";
import { Eyebrow } from "./ui";
import { siteConfig } from "../../lib/site";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const elsewhere = [
    { href: `https://github.com/${siteConfig.githubUsername}`, label: "GitHub" },
    { href: siteConfig.linkedinUrl, label: "LinkedIn" },
  ];

  return (
    <footer className="relative mt-32 overflow-hidden border-t border-line sm:mt-40">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Eyebrow>Get in touch</Eyebrow>
            <a
              href={`mailto:${siteConfig.email}`}
              className="group mt-5 inline-flex max-w-full items-center gap-2 text-xl font-medium tracking-[-0.03em] transition-colors hover:text-accent sm:text-3xl"
            >
              <span className="break-all">{siteConfig.email}</span>
              <ArrowUpRight className="size-6 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          <nav aria-label="Footer">
            <Eyebrow>Navigate</Eyebrow>
            <ul className="mt-5 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <Eyebrow>Elsewhere</Eyebrow>
            <ul className="mt-5 space-y-2.5">
              {elsewhere.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                    <ArrowUpRight className="size-3.5" />
                  </a>
                </li>
              ))}
              <li>
                <a href={siteConfig.resumeUrl} download className="text-muted transition-colors hover:text-foreground">
                  Resume (PDF)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line py-6 font-mono text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Mohamed Dhia Chairet</span>
          <span>
            {siteConfig.location} · <LocalTime timeZone={siteConfig.timeZone} className="text-muted" />
          </span>
          <a href="#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
            Back to top <ArrowUp className="size-3.5" />
          </a>
        </div>
      </div>

      <div aria-hidden="true" className="pointer-events-none select-none">
        <p className="translate-y-[22%] whitespace-nowrap bg-linear-to-b from-white/[0.16] to-white/0 bg-clip-text text-center text-[15.5vw] leading-[0.8] font-semibold tracking-[-0.06em] text-transparent">
          Dhia Chairet
        </p>
      </div>
    </footer>
  );
}
