"use client";

import { useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import ProjectCard from "./ProjectCard";
import type { Repo } from "../../lib/github";
import { cn } from "../../lib/utils";

const ALL = "__all";
const LIVE = "__live";
const OTHER = "Other";

// Language filters are derived from the repos themselves, so new repos
// (and new languages) show up here automatically.
type ProjectsExplorerProps = {
  repos: Repo[];
  startIndex?: number;
  // Server-rendered logo nodes keyed by repo id
  extras?: Record<number, { stack?: ReactNode; languageIcon?: ReactNode }>;
};

export default function ProjectsExplorer({ repos, startIndex = 0, extras = {} }: ProjectsExplorerProps) {
  const [filter, setFilter] = useState(ALL);

  const filters = useMemo(() => {
    const counts = new Map<string, number>();
    for (const repo of repos) {
      const lang = repo.language || OTHER;
      counts.set(lang, (counts.get(lang) ?? 0) + 1);
    }
    const languages = [...counts.entries()]
      .sort((a, b) => (a[0] === OTHER ? 1 : b[0] === OTHER ? -1 : b[1] - a[1]))
      .map(([lang, count]) => ({ id: lang, label: lang, count }));
    const liveCount = repos.filter((r) => r.homepage).length;

    return [
      { id: ALL, label: "All", count: repos.length },
      ...(liveCount > 0 ? [{ id: LIVE, label: "Live demos", count: liveCount }] : []),
      ...languages,
    ];
  }, [repos]);

  const visible = repos.filter((repo) => {
    if (filter === ALL) return true;
    if (filter === LIVE) return Boolean(repo.homepage);
    return (repo.language || OTHER) === filter;
  });

  return (
    <div>
      <LayoutGroup id="repo-filters">
        <div className="no-scrollbar -mx-4 mb-8 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <div
            role="group"
            aria-label="Filter repositories"
            className="inline-flex gap-1 rounded-full border border-line bg-linear-to-b from-zinc-900 to-zinc-950 p-1.5 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05),0_10px_20px_rgba(0,0,0,0.4)]"
          >
            {filters.map((f) => {
              const active = f.id === filter;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f.id)}
                  className="relative whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {active && (
                    <motion.span
                      layoutId="repo-filter-pill"
                      className="absolute inset-0 rounded-full border border-transparent bg-zinc-100"
                      transition={{ type: "spring", stiffness: 380, damping: 30, mass: 0.9 }}
                    />
                  )}
                  <span
                    className={cn(
                      "relative z-10 transition-colors duration-200",
                      active ? "text-zinc-950" : "text-zinc-500 hover:text-zinc-300",
                    )}
                  >
                    {f.label} <span className="font-mono text-xs opacity-60">{f.count}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </LayoutGroup>

      <motion.ul layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((repo) => (
            <motion.li
              key={repo.id}
              layout
              initial={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
              transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
            >
              <ProjectCard
                title={repo.name}
                description={repo.description || "No description provided."}
                githubUrl={repo.html_url}
                liveUrl={repo.homepage || null}
                tags={repo.topics || []}
                stars={repo.stargazers_count}
                videoUrl={repo.videoUrl}
                stack={extras[repo.id]?.stack}
                languageIcon={extras[repo.id]?.languageIcon}
                language={repo.language}
                updatedAt={repo.pushed_at}
                index={startIndex + repos.indexOf(repo) + 1}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
