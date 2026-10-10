import Reveal from "./Reveal";
import { TechChip } from "./TechIcon";
import { experience } from "../../lib/content";

export default function ExperienceList({ detailed = false }: { detailed?: boolean }) {
  return (
    <ol className="border-b border-line">
      {experience.map((job, i) => (
        <li key={job.company} className="border-t border-line">
          <Reveal
            delay={i * 0.05}
            className="grid gap-4 py-8 transition-colors duration-300 hover:bg-white/[0.015] md:grid-cols-[14rem_1fr] md:gap-10"
          >
            <div className="font-mono text-xs uppercase tracking-[0.16em] text-subtle">
              <p className="text-muted">{job.period}</p>
              <p className="mt-2">{job.location}</p>
            </div>
            <div>
              <h3 className="text-2xl font-medium tracking-[-0.03em] sm:text-3xl">
                {job.role} <span className="text-subtle">at</span> {job.company}
              </h3>
              <ul aria-label="Stack" className="mt-4 flex flex-wrap gap-1.5">
                {job.stack.map((tech) => (
                  <TechChip key={tech} name={tech} />
                ))}
              </ul>
              {detailed && (
                <ul className="mt-6 max-w-3xl space-y-3 text-[15px] leading-relaxed text-muted">
                  {job.highlights.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
