"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue } from "motion/react";
import { ArrowUpRight, Play, Star, X } from "lucide-react";
import { GithubIcon } from "./icons";
import { cn, formatMonth, formatRepoName, languageColor } from "../../lib/utils";

type ProjectCardProps = {
  title: string;
  description: string;
  githubUrl: string;
  liveUrl?: string | null;
  tags?: string[];
  stars?: number;
  videoUrl?: string;
  // Pre-rendered on the server (see TechList) to keep logo data out of the client bundle
  stack?: ReactNode;
  // Server-rendered logo for the GitHub language; falls back to a color dot
  languageIcon?: ReactNode;
  language?: string | null;
  updatedAt?: string;
  index?: number;
  featured?: boolean;
  className?: string;
};

export default function ProjectCard({
  title,
  description,
  githubUrl,
  liveUrl,
  tags = [],
  stars,
  videoUrl,
  stack,
  languageIcon,
  language,
  updatedAt,
  index,
  featured = false,
  className,
}: ProjectCardProps) {
  const [showVideo, setShowVideo] = useState(false);
  const [mounted, setMounted] = useState(false);
  const previewRef = useRef<HTMLVideoElement>(null);
  const name = formatRepoName(title);

  // Cursor-following spotlight
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mouseX}px ${mouseY}px, color-mix(in oklab, var(--accent) 11%, transparent), transparent 70%)`;

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!showVideo) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setShowVideo(false);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [showVideo]);

  return (
    <>
      <article
        onMouseMove={handleMouseMove}
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface/60 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors duration-300 hover:border-line-strong sm:p-6",
          className,
        )}
      >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: spotlight }}
        />

        <div className="relative flex items-center justify-between gap-3 font-mono text-xs text-subtle">
          <span>{typeof index === "number" ? String(index).padStart(2, "0") : ""}</span>
          <div className="flex flex-wrap items-center justify-end gap-x-3 gap-y-1">
            {liveUrl && (
              <span className="inline-flex items-center gap-1.5 text-accent">
                <span className="size-1.5 rounded-full bg-accent" />
                Live
              </span>
            )}
            {language && (
              <span className="inline-flex items-center gap-1.5">
                {languageIcon ?? (
                  <span className="size-2 rounded-full" style={{ backgroundColor: languageColor(language) }} />
                )}
                {language}
              </span>
            )}
            {typeof stars === "number" && stars > 0 && (
              <span className="inline-flex items-center gap-1">
                <Star className="size-3" />
                {stars}
              </span>
            )}
          </div>
        </div>

        {videoUrl && (
          <button
            type="button"
            onClick={() => setShowVideo(true)}
            onMouseEnter={() => previewRef.current?.play().catch(() => {})}
            onMouseLeave={() => previewRef.current?.pause()}
            aria-label={`Play ${name} demo video`}
            className="group/video relative mt-5 block aspect-video w-full overflow-hidden rounded-2xl border border-line bg-black"
          >
            <video
              ref={previewRef}
              src={`${videoUrl}#t=0.1`}
              muted
              loop
              playsInline
              preload="metadata"
              className="size-full object-cover opacity-80 transition duration-700 group-hover/video:scale-[1.03] group-hover/video:opacity-100"
            />
            <span className="absolute inset-0 grid place-items-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-transform duration-300 group-hover/video:scale-105">
                <Play className="size-3.5 fill-current" />
                Watch demo
              </span>
            </span>
          </button>
        )}

        <h3
          className={cn(
            "relative mt-5 font-medium tracking-[-0.03em] text-foreground",
            featured ? "text-3xl sm:text-4xl" : "text-2xl",
          )}
        >
          {name}
        </h3>
        <p className={cn("relative mt-3 leading-relaxed text-muted", featured ? "text-base" : "line-clamp-3 text-[15px]")}>
          {description}
        </p>

        {stack && <div className="relative mt-5 empty:hidden">{stack}</div>}

        {tags.length > 0 && (
          <ul aria-label="Topics" className="relative mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-subtle">
            {tags.map((tag) => (
              <li key={tag}>#{tag}</li>
            ))}
          </ul>
        )}

        <div className="relative mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
          <div className="flex flex-wrap gap-2">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3.5 py-2 text-sm font-medium text-accent-foreground transition-shadow duration-300 hover:shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent)_22%,transparent)]"
              >
                Live demo
                <ArrowUpRight className="size-4" />
              </a>
            )}
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white/[0.03] px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:border-white/25 hover:bg-white/[0.07]"
            >
              <GithubIcon className="size-4" />
              Source
            </a>
          </div>
          {updatedAt && (
            <span className="font-mono text-[11px] text-subtle">Updated {formatMonth(updatedAt)}</span>
          )}
        </div>
      </article>

      {/* Portaled so ancestor transforms/filters can't trap the fixed overlay */}
      {mounted &&
        videoUrl &&
        createPortal(
          <AnimatePresence>
            {showVideo && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={`${name} demo video`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowVideo(false)}
                className="fixed inset-0 z-[100] grid place-items-center bg-black/80 p-4 backdrop-blur-md"
              >
                <motion.div
                  initial={{ scale: 0.94, y: 24, filter: "blur(8px)" }}
                  animate={{ scale: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ scale: 0.96, y: 12, opacity: 0 }}
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-5xl"
                >
                  <button
                    type="button"
                    onClick={() => setShowVideo(false)}
                    aria-label="Close video"
                    className="absolute -top-12 right-0 grid size-9 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20"
                  >
                    <X className="size-4" />
                  </button>
                  <video
                    src={videoUrl}
                    controls
                    autoPlay
                    playsInline
                    className="max-h-[80vh] w-full rounded-2xl border border-line bg-black"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
