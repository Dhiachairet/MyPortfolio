import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import ProjectCard from "./components/ProjectCard";
import Reveal from "./components/Reveal";
import SectionHeading from "./components/SectionHeading";
import ExperienceList from "./components/ExperienceList";
import { TechList, languageIcon } from "./components/TechIcon";
import CopyEmail from "./components/CopyEmail";
import { ButtonLink, Eyebrow, Serif } from "./components/ui";
import { fetchGithubRepos, type Repo } from "../lib/github";
import { marqueeStack } from "../lib/content";
import { siteConfig } from "../lib/site";

export default async function Home() {
  const repos = await fetchGithubRepos();
  const pinnedRepos = (siteConfig.pinnedRepos || [])
    .map((name) => repos.find((repo) => repo.name.toLowerCase() === name.toLowerCase()))
    .filter((repo): repo is Repo => Boolean(repo));

  const sectionLink =
    "group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground";

  return (
    <>
      <Hero repoCount={repos.length} />

      <div className="mt-20 sm:mt-28">
        <Marquee items={marqueeStack} />
      </div>

      <section className="mt-28 sm:mt-40">
        <SectionHeading
          index="01"
          label="Selected work"
          title={
            <>
              Featured <Serif>projects</Serif>
            </>
          }
          action={
            <Link href="/projects" className={sectionLink}>
              All projects{repos.length > 0 ? ` (${repos.length})` : ""}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          }
        />
        {pinnedRepos.length === 0 ? (
          <p className="text-muted">No featured projects yet.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pinnedRepos.map((repo, i) => (
              <Reveal
                key={repo.id}
                delay={(i % 3) * 0.08}
                className={i === 0 ? "md:col-span-2 lg:row-span-2" : undefined}
              >
                <ProjectCard
                  title={repo.name}
                  description={repo.description || "No description provided."}
                  githubUrl={repo.html_url}
                  liveUrl={repo.homepage || null}
                  tags={repo.topics || []}
                  stars={repo.stargazers_count}
                  videoUrl={repo.videoUrl}
                  stack={<TechList items={repo.technologies} />}
                  languageIcon={languageIcon(repo.language)}
                  language={repo.language}
                  updatedAt={repo.pushed_at}
                  index={i + 1}
                  featured={i === 0}
                />
              </Reveal>
            ))}
            <Reveal delay={0.16}>
              <Link
                href="/projects"
                className="group flex h-full min-h-56 flex-col justify-between rounded-3xl border border-dashed border-line-strong p-6 transition-colors duration-300 hover:border-accent/60 hover:bg-accent/[0.04]"
              >
                <Eyebrow>Archive</Eyebrow>
                <div className="flex items-end justify-between gap-4">
                  <p className="text-2xl font-medium tracking-[-0.03em]">
                    Explore {repos.length > 0 ? `all ${repos.length}` : "all"} repositories
                  </p>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line-strong transition-all duration-300 group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
                    <ArrowUpRight className="size-5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>
        )}
      </section>

      <section className="mt-28 sm:mt-40">
        <SectionHeading
          index="02"
          label="Experience"
          title={
            <>
              Where I&apos;ve <Serif>shipped</Serif> code
            </>
          }
          action={
            <Link href="/about" className={sectionLink}>
              More about me
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          }
        />
        <ExperienceList />
      </section>

      <section className="mt-28 sm:mt-40">
        <Reveal className="relative overflow-hidden rounded-[2rem] border border-line bg-surface/60 px-6 py-14 sm:px-12 sm:py-20">
          <div aria-hidden="true" className="absolute -top-28 -right-28 size-80 rounded-full bg-accent/15 blur-3xl" />
          <Eyebrow>
            <span className="text-accent">03</span> / Contact
          </Eyebrow>
          <h2 className="relative mt-6 max-w-4xl text-[clamp(2.25rem,6vw,5rem)] leading-[1] font-medium tracking-[-0.045em]">
            Have an internship or project in <Serif className="text-accent">mind?</Serif>
          </h2>
          <p className="relative mt-6 max-w-xl text-lg leading-relaxed text-muted">
            I&apos;m looking for an end-of-study internship (PFE) in full-stack or back-end development. If you have
            something going on, feel free to reach out.
          </p>
          <div className="relative mt-10 flex flex-wrap items-center gap-3">
            <ButtonLink href="/contact#message" variant="primary">
              Send me a message <ArrowRight className="size-4" />
            </ButtonLink>
            <CopyEmail email={siteConfig.email} />
          </div>
        </Reveal>
      </section>
    </>
  );
}
