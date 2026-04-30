import Hero from "./components/Hero";
import ProjectCard from "./components/ProjectCard";
import { fetchGithubRepos, type Repo } from "../lib/github";
import { siteConfig } from "../lib/site";

export default async function Home() {
  const repos = await fetchGithubRepos();
  const pinnedRepos = (siteConfig.pinnedRepos || [])
    .map((name) => repos.find((repo) => repo.name.toLowerCase() === name.toLowerCase()))
    .filter((repo): repo is Repo => Boolean(repo));

  return (
    <div className="space-y-14">
      <Hero />
      <section>
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Selected Work</p>
            <h2 className="text-3xl font-semibold text-white">Featured Projects</h2>
          </div>
          <a href="/projects" className="text-sm text-slate-300 hover:text-white transition">
            View all →
          </a>
        </div>
        {pinnedRepos.length === 0 ? (
          <p className="text-sm text-slate-400">No featured projects yet.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pinnedRepos.map((repo) => (
              <ProjectCard
                key={repo.id}
                title={repo.name}
                description={repo.description || "No description provided."}
                githubUrl={repo.html_url}
                liveUrl={repo.homepage || null}
                tags={repo.topics || []}
                videoUrl={repo.videoUrl}
                technologies={repo.technologies}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
