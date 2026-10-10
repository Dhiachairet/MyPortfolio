import { ArrowUpRight } from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import ProjectsExplorer from "../components/ProjectsExplorer";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { GithubIcon } from "../components/icons";
import { TechList, languageIcon } from "../components/TechIcon";
import { ButtonLink, Eyebrow, Serif } from "../components/ui";
import { fetchGithubRepos, type Repo } from "../../lib/github";
import { siteConfig } from "../../lib/site";

export const metadata = { title: "Projects" };

export default async function ProjectsPage() {
  const repos = await fetchGithubRepos();
  const username = siteConfig.githubUsername;
  const pinned = new Set((siteConfig.pinnedRepos || []).map((n) => n.toLowerCase()));
  const pinnedRepos = (siteConfig.pinnedRepos || [])
    .map((name) => repos.find((r) => r.name.toLowerCase() === name.toLowerCase()))
    .filter((repo): repo is Repo => Boolean(repo));
  const otherRepos = repos.filter((r) => !pinned.has(r.name.toLowerCase()));
  const explorerRepos = pinnedRepos.length > 0 ? otherRepos : repos;

  return (
    <>
      <header className="relative">
        <div aria-hidden="true" className="bg-grid full-bleed absolute -top-40 -z-10 h-[40rem]" />
        <Reveal>
          <Eyebrow>Index / Projects</Eyebrow>
          <h1 className="mt-6 text-[clamp(3rem,10vw,9rem)] leading-[0.9] font-medium tracking-[-0.05em]">
            Things I&apos;ve <Serif>built</Serif>
            {repos.length > 0 && (
              <sup className="ml-2 align-top font-mono text-base tracking-normal text-accent sm:text-2xl">
                ({repos.length})
              </sup>
            )}
          </h1>
        </Reveal>
        <Reveal
          delay={0.1}
          className="mt-10 grid gap-8 border-t border-line pt-8 md:grid-cols-[1fr_auto] md:items-end"
        >
          <p className="max-w-2xl text-lg leading-relaxed text-muted">
            A showcase of my development work, from full-stack web applications to mobile apps and backend systems.
            Each project demonstrates different technologies and problem-solving approaches.
          </p>
          <div className="flex flex-col items-start gap-3 md:items-end">
            {username && (
              <ButtonLink href={`https://github.com/${username}`} external>
                <GithubIcon className="size-4" />
                View GitHub profile
                <ArrowUpRight className="size-4" />
              </ButtonLink>
            )}
            <p className="inline-flex items-center gap-2 font-mono text-xs text-subtle">
              <span className="size-1.5 animate-pulse rounded-full bg-accent" />
              Synced from GitHub
            </p>
          </div>
        </Reveal>
      </header>

      {repos.length === 0 ? (
        <p className="mt-16 text-muted">
          {username
            ? "No repositories found or API limit reached."
            : "Set NEXT_PUBLIC_GITHUB_USERNAME in .env.local to load repos."}
        </p>
      ) : (
        <div className="mt-20 space-y-28 sm:mt-28">
          {pinnedRepos.length > 0 && (
            <section>
              <SectionHeading
                index="01"
                label="Pinned"
                title={
                  <>
                    Top <Serif>picks</Serif>
                  </>
                }
              />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {pinnedRepos.map((r, i) => (
                  <Reveal key={r.id} delay={(i % 3) * 0.08}>
                    <ProjectCard
                      title={r.name}
                      description={r.description || "No description provided."}
                      githubUrl={r.html_url}
                      liveUrl={r.homepage || null}
                      tags={r.topics || []}
                      stars={r.stargazers_count}
                      videoUrl={r.videoUrl}
                      stack={<TechList items={r.technologies} />}
                      languageIcon={languageIcon(r.language)}
                      language={r.language}
                      updatedAt={r.pushed_at}
                      index={i + 1}
                    />
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          {explorerRepos.length > 0 && (
            <section>
              <SectionHeading
                index={pinnedRepos.length > 0 ? "02" : "01"}
                label="Repositories"
                title={
                  <>
                    All <Serif>repositories</Serif>
                  </>
                }
              />
              <ProjectsExplorer
                repos={explorerRepos}
                startIndex={pinnedRepos.length}
                extras={Object.fromEntries(
                  explorerRepos.map((r) => [
                    r.id,
                    { stack: <TechList items={r.technologies} />, languageIcon: languageIcon(r.language) },
                  ]),
                )}
              />
            </section>
          )}
        </div>
      )}
    </>
  );
}
