"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { Download } from "lucide-react";
import { siteConfig } from "../../lib/site";
import { cn } from "../../lib/utils";

const links = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

// Floating pill nav: sliding active pill from Watermelon UI's continuous-tabs,
// scroll progress ring from its scroll-island
export default function Navbar() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, mass: 0.3 });
  const ring = useTransform(
    progress,
    (v) => `conic-gradient(var(--accent) ${v * 360}deg, rgb(255 255 255 / 0.12) 0deg)`,
  );

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <motion.nav
        aria-label="Main"
        initial={{ y: -24, opacity: 0, filter: "blur(6px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{ type: "spring", bounce: 0.2, duration: 0.8 }}
        className="pointer-events-auto flex items-center gap-1 rounded-full border border-line bg-surface/75 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_12px_32px_-12px_rgba(0,0,0,0.7)] backdrop-blur-xl"
      >
        <Link href="/" aria-label="Home" className="relative mr-1 grid size-9 shrink-0 place-items-center rounded-full">
          <motion.span aria-hidden="true" className="absolute inset-0 rounded-full" style={{ background: ring }} />
          <span aria-hidden="true" className="absolute inset-[2px] rounded-full bg-background" />
          <span className="relative font-mono text-[11px] font-semibold tracking-tight">DC</span>
        </Link>

        <ul className="flex items-center">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative block rounded-full px-3 py-2 text-[13px] font-medium transition-colors duration-200 sm:px-4 sm:text-sm",
                    active ? "text-background" : "text-muted hover:text-foreground",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full border border-transparent bg-foreground"
                      transition={{ type: "spring", stiffness: 380, damping: 30, mass: 0.9 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <a
          href={siteConfig.resumeUrl}
          download
          aria-label="Download resume"
          className="ml-1 inline-flex size-9 shrink-0 items-center justify-center gap-2 rounded-full bg-accent text-sm font-medium text-accent-foreground transition-shadow duration-300 hover:shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent)_22%,transparent)] sm:w-auto sm:px-4"
        >
          <span className="hidden sm:inline">Resume</span>
          <Download className="size-4" />
        </a>
      </motion.nav>
    </header>
  );
}
