import { siteConfig } from "./site";

export type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  homepage?: string | null;
  topics?: string[];
  stargazers_count?: number;
  language?: string | null;
  pushed_at?: string;
  fork?: boolean;
  videoUrl?: string;
  technologies?: string[];
};

// Live URLs for specific repositories
const liveUrls: Record<string, string> = {
  "LearnAI-Hub-E-Learning-platform": "https://learn-ai-hub-e-learning-platform-nx.vercel.app",
};

// Video URLs for specific repositories
const videoUrls: Record<string, string> = {
  "LearnAI-Hub-E-Learning-platform": "/LeanAiHub.mp4",
};

// Technologies used in specific repositories
const projectTechnologies: Record<string, string[]> = {
  "LearnAI-Hub-E-Learning-platform": ["Next.js 16", "TypeScript", "MongoDB", "OpenAI", "Gemini AI", "NextAuth.js", "JWT", "Vercel"],
  "Employee-Management-System-EMS-": ["Java 17", "Spring Boot 3", "Spring Security", "JWT", "Thymeleaf", "MySQL", "Docker"],
  "HealthCareSystem": ["Symfony 6", "Doctrine ORM", "MySQL", "Twig", "EasyAdmin", "VichUploaderBundle"],
  "Ai-Interview-Simulator": ["Next.js", "TypeScript", "OpenAI API", "Vapi", "MongoDB", "Vercel"],
  "Irescomath-Research-Lab-Management": ["MongoDB", "Express.js", "React", "Node.js"],
};

export async function fetchGithubRepos(): Promise<Repo[]> {
  const username = siteConfig.githubUsername;
  if (!username) return [];

  const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
    // Revalidate server-side every 12 hours
    next: { revalidate: 43200 },
    headers: {
      Accept: "application/vnd.github+json",
    },
  });

  if (!res.ok) return [];
  const data = (await res.json()) as Repo[];

  // Filter out forks and archived repos; sort by stargazers desc
  const filtered = data.filter((r) => !r.fork);
  
  // Add live URLs, video URLs, and technologies for known repos
  filtered.forEach((repo) => {
    if (liveUrls[repo.name]) {
      repo.homepage = liveUrls[repo.name];
    }
    if (videoUrls[repo.name]) {
      repo.videoUrl = videoUrls[repo.name];
    }
    if (projectTechnologies[repo.name]) {
      repo.technologies = projectTechnologies[repo.name];
    }
  });
  
  filtered.sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0));
  return filtered;
}


