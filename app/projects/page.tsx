import Link from "next/link";
import ProjectCard from "../components/ProjectCard";
import { fetchGithubRepos } from "../../lib/github";
import { siteConfig } from "../../lib/site";

export const metadata = { title: "Projects — Mohamed Dhia Chairet" };

export default async function ProjectsPage() {
  const repos = await fetchGithubRepos();
  const username = siteConfig.githubUsername;
  const pinned = new Set((siteConfig.pinnedRepos || []).map((n) => n.toLowerCase()));
  const pinnedRepos = (siteConfig.pinnedRepos || [])
    .map((name) => repos.find((r) => r.name.toLowerCase() === name.toLowerCase()))
    .filter(Boolean);
  const otherRepos = repos.filter((r) => !pinned.has(r.name.toLowerCase()));

  return (
    <section className="space-y-8">
      <div className="surface-panel rounded-3xl p-8 sm:p-10">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Projects</p>
       
        <p className="text-sm text-slate-300 mt-4 max-w-2xl">
          A showcase of my development work, from full-stack web applications to mobile apps and backend systems. Each project demonstrates different technologies and problem-solving approaches.
        </p>
        {username && (
          <div className="mt-5">
            <Link className="inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 transition" href={`https://github.com/${username}`} target="_blank">
              View GitHub profile →
            </Link>
          </div>
        )}
      </div>
      {repos.length === 0 ? (
        <p className="text-sm text-slate-400">
          {username ? "No repositories found or API limit reached." : "Set NEXT_PUBLIC_GITHUB_USERNAME in .env.local to load repos."}
        </p>
      ) : (
        <div className="space-y-10">
          {pinnedRepos.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Pinned</h2>
                <span className="text-xs uppercase tracking-[0.2em] text-slate-500">Top picks</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {pinnedRepos.map((r) => (
                  <ProjectCard
                    key={r.id}
                    title={r.name}
                    description={r.description || "No description provided."}
                    githubUrl={r.html_url}
                    liveUrl={r.homepage || null}
                    tags={r.topics || []}
                    stars={r.stargazers_count}
                    videoUrl={r.videoUrl}
                    technologies={r.technologies}
                  />
                ))}
              </div>
            </div>
          )}

          <div>
            {pinnedRepos.length > 0 && <h2 className="text-lg font-semibold mb-4 text-white">All repositories</h2>}
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {(pinnedRepos.length > 0 ? otherRepos : repos).map((r) => (
                <ProjectCard
                  key={r.id}
                  title={r.name}
                  description={r.description || "No description provided."}
                  githubUrl={r.html_url}
                  liveUrl={r.homepage || null}
                  tags={r.topics || []}
                  stars={r.stargazers_count}
                  videoUrl={r.videoUrl}
                  technologies={r.technologies}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}


