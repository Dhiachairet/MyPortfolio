import Image from "next/image";

export const metadata = { title: "About — Mohamed Dhia Chairet" };

export default function AboutPage() {
  return (
    <section className="space-y-10">
      <div className="surface-panel rounded-3xl p-8 sm:p-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
          <Image
            src="/avatar.jpg"
            alt="Mohamed Dhia Chairet"
            width={64}
            height={64}
            className="h-16 w-16 rounded-full object-cover ring-2 ring-white/20"
          />
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">About</p>
            <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight mt-2">Mohamed Dhia Chairet</h1>
            <p className="text-slate-300 text-base leading-relaxed">
              Software Engineering student • Full-stack developer
            </p>
          </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="/MohamedDhiaChairetResume.pdf" download className="inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 transition">Download CV</a>
            <a href="/contact" className="inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 transition">Contact</a>
            <a href="https://www.linkedin.com/in/dhia-chairet-baba16249/" target="_blank" rel="noreferrer" className="inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 transition">LinkedIn</a>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 surface-panel rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-white">About me</h2>
          <p className="text-base text-slate-300 leading-relaxed">
            Fourth-year Software Engineering student at TEK-UP University. I like building websites and seeing them come to
            life, the backend, the database, the UI, all of it. I&apos;ve built a few complete systems on my own, including an
            AI-powered e-learning platform. Still figuring things out as I go, but everything you see here actually runs.
          </p>
        </div>
        <div className="surface-panel rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-3 text-white">Quick facts</h3>
          <ul className="text-base space-y-2 text-slate-300 leading-relaxed">
            <li>Location: Tunisia</li>
            <li>Open to: internships and part-time</li>
            <li>Focus: Full-stack web development</li>
            <li>Interests: Clean UI and solid backend systems</li>
          </ul>
        </div>
      </div>

      <div className="surface-panel rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-6 text-white">Skills</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="text-base font-semibold text-slate-200 mb-3">Languages</h3>
            <div className="flex flex-wrap gap-2">
              {["Java", "TypeScript", "JavaScript", "Python", "PHP", "Dart", "C++"].map((s) => (
                <span key={s} className="chip text-xs rounded-full px-3 py-1.5 font-semibold">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-200 mb-3">Frontend</h3>
            <div className="flex flex-wrap gap-2">
              {["Next.js", "React", "Angular", "Thymeleaf", "Twig", "HTML/CSS"].map((s) => (
                <span key={s} className="chip text-xs rounded-full px-3 py-1.5 font-semibold">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-200 mb-3">Backend</h3>
            <div className="flex flex-wrap gap-2">
              {["Node.js", "Express.js", "Spring Boot", "Symfony", ".NET"].map((s) => (
                <span key={s} className="chip text-xs rounded-full px-3 py-1.5 font-semibold">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-200 mb-3">Databases</h3>
            <div className="flex flex-wrap gap-2">
              {["MongoDB", "MySQL", "PostgreSQL"].map((s) => (
                <span key={s} className="chip text-xs rounded-full px-3 py-1.5 font-semibold">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-200 mb-3">Testing & QA</h3>
            <div className="flex flex-wrap gap-2">
              {["Postman", "Thunder Client", "Swagger"].map((s) => (
                <span key={s} className="chip text-xs rounded-full px-3 py-1.5 font-semibold">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-200 mb-3">DevOps & Tools</h3>
            <div className="flex flex-wrap gap-2">
              {["Git", "GitHub", "GitLab", "GitHub Actions", "Docker (Basic)", "Vercel", "Figma", "VS Code"].map((s) => (
                <span key={s} className="chip text-xs rounded-full px-3 py-1.5 font-semibold">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-base font-semibold text-slate-200 mb-3">Others</h3>
          <div className="flex flex-wrap gap-2">
            {["REST APIs", "Agile", "RBAC", "JWT Authentication"].map((s) => (
              <span key={s} className="chip text-xs rounded-full px-3 py-1.5 font-semibold">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="surface-panel rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-white">Experience</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-semibold text-base text-white">Full-Stack Developer</h3>
                <span className="text-sm text-slate-400 font-medium">2024</span>
              </div>
              <div className="text-base text-slate-300 mb-2 font-medium">IResCoMath Lab</div>
              <ul className="text-sm text-slate-300 space-y-2 list-disc list-inside leading-relaxed">
                <li>Built a full-stack research management system serving 30+ members, covering authentication, publication tracking, and member administration.</li>
                <li>Developed a React frontend with Hooks-based state management and React Router, smoothing navigation across core views.</li>
                <li>Engineered a custom XML parser to sync publication data from DBLP.org into MongoDB, eliminating manual data entry.</li>
              </ul>
            </div>
            <div>
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-semibold text-base text-white">Mobile Developer Intern</h3>
                <span className="text-sm text-slate-400 font-medium">2023</span>
              </div>
              <div className="text-base text-slate-300 mb-2 font-medium">Mammut Web Solutions</div>
              <ul className="text-sm text-slate-300 space-y-2 list-disc list-inside leading-relaxed">
                <li>Built a Flutter quiz app for medical professionals with a clean, responsive UI across 10+ question categories.</li>
                <li>Designed and integrated a Node.js REST API handling quiz logic, user sessions, and result tracking.</li>
                <li>Tested endpoints with Postman to validate flows and edge cases.</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="surface-panel rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-white">Education</h2>
          <div className="space-y-4">
            <div>
              <div className="font-semibold text-base text-white">Bachelor of Software Engineering (GLSI)</div>
              <div className="text-base text-slate-300 leading-relaxed">TEK-UP University, Tunis, Tunisia</div>
              <div className="text-sm text-slate-400 font-medium">2025</div>
              <div className="text-sm text-slate-300 leading-relaxed">Fourth-year student focused on full-stack web development and software architecture.</div>
            </div>
            <div>
              <div className="font-semibold text-base text-white">License in Computer Science and Multimedia</div>
              <div className="text-base text-slate-300 leading-relaxed">ISIMG (Higher Institute of Computer Science and Multimedia), Gabes, Tunisia</div>
              <div className="text-sm text-slate-400 font-medium">2022</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


