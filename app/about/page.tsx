import Image from "next/image";
import { ArrowUpRight, Download, MapPin } from "lucide-react";
import ExperienceList from "../components/ExperienceList";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { LinkedinIcon } from "../components/icons";
import { TechChip } from "../components/TechIcon";
import { ButtonLink, Eyebrow, Serif } from "../components/ui";
import { education, involvement, skills, spokenLanguages } from "../../lib/content";
import { siteConfig } from "../../lib/site";

export const metadata = { title: "About" };

const quickFacts = [
  { label: "Location", value: siteConfig.location },
  { label: "Status", value: "Final-year student" },
  { label: "Open to", value: "PFE internship" },
  { label: "Interests", value: "Clean UI & solid backend systems" },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative">
        <div aria-hidden="true" className="bg-grid full-bleed absolute -top-40 -z-10 h-[40rem]" />
        <div className="grid gap-14 lg:grid-cols-[1fr_22rem] lg:items-end">
          <Reveal>
            <Eyebrow>About</Eyebrow>
            <h1 className="mt-6 text-[clamp(3rem,8.5vw,7.5rem)] leading-[0.92] font-medium tracking-[-0.05em]">
              Mohamed Dhia <Serif className="text-accent">Chairet</Serif>
            </h1>
            <p className="mt-4 font-mono text-sm text-subtle">Software Engineering student • Full-stack developer</p>
            <div className="mt-8 max-w-2xl space-y-4 text-lg leading-relaxed text-muted">
              <p>
                Final-year Software Engineering student at TEK-UP University with four internships across Java/Spring
                Boot, Angular and MERN. I like building websites and seeing them come to life: the backend, the
                database, the UI, all of it.
              </p>
              <p>
                I&apos;ve built a few complete systems on my own, including an AI-powered e-learning platform and a
                voice-based AI interview simulator. Still figuring things out as I go, but everything you see here
                actually runs.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <ButtonLink href={siteConfig.resumeUrl} variant="primary" download>
                Download CV <Download className="size-4" />
              </ButtonLink>
              <ButtonLink href={siteConfig.linkedinUrl} external>
                <LinkedinIcon className="size-4" /> LinkedIn <ArrowUpRight className="size-4" />
              </ButtonLink>
              <ButtonLink href="/contact" variant="ghost">
                Contact
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="mx-auto w-full max-w-xs lg:max-w-none">
            <figure className="group relative rotate-2 overflow-hidden rounded-[2rem] border border-line bg-surface p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] transition-transform duration-500 hover:rotate-0">
              <Image
                src="/avatar.jpg"
                alt="Portrait of Mohamed Dhia Chairet"
                width={640}
                height={800}
                priority
                className="aspect-[4/5] w-full rounded-[1.5rem] object-cover grayscale-[35%] transition duration-700 group-hover:grayscale-0"
              />
              <figcaption className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-full border border-white/10 bg-black/55 px-4 py-2 text-xs backdrop-blur-md">
                <span className="font-medium">Dhia Chairet</span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-white/70">
                  <MapPin className="size-3" /> Tunis
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-4">
            {quickFacts.map((fact) => (
              <div key={fact.label} className="bg-background p-5 sm:p-6">
                <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">{fact.label}</dt>
                <dd className="mt-3 text-base font-medium tracking-[-0.01em] sm:text-lg">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      <section className="mt-28 sm:mt-40">
        <SectionHeading
          index="01"
          label="Experience"
          title={
            <>
              Where I&apos;ve <Serif>worked</Serif>
            </>
          }
        />
        <ExperienceList detailed />
      </section>

      <section className="mt-28 sm:mt-40">
        <SectionHeading
          index="02"
          label="Skills"
          title={
            <>
              Tools of the <Serif>trade</Serif>
            </>
          }
        />
        <dl className="border-b border-line">
          {skills.map((skill, i) => (
            <Reveal
              key={skill.group}
              delay={(i % 4) * 0.04}
              className="grid gap-4 border-t border-line py-6 md:grid-cols-[14rem_1fr] md:gap-10"
            >
              <dt className="pt-1.5 font-mono text-xs uppercase tracking-[0.16em] text-subtle">{skill.group}</dt>
              <dd>
                <ul className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <TechChip key={item} name={item} size="md" />
                  ))}
                </ul>
              </dd>
            </Reveal>
          ))}
        </dl>
      </section>

      <section className="mt-28 sm:mt-40">
        <SectionHeading
          index="03"
          label="Education"
          title={
            <>
              Where I <Serif>learned</Serif>
            </>
          }
        />
        <ol className="border-b border-line">
          {education.map((item) => (
            <li key={item.school} className="border-t border-line">
              <Reveal className="grid gap-4 py-8 md:grid-cols-[14rem_1fr] md:gap-10">
                <div className="font-mono text-xs uppercase tracking-[0.16em] text-subtle">
                  <p className="text-muted">{item.period}</p>
                  <p className="mt-2">{item.location}</p>
                </div>
                <div>
                  <h3 className="text-2xl font-medium tracking-[-0.03em] sm:text-3xl">{item.school}</h3>
                  <p className="mt-2 text-muted">{item.degree}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-28 sm:mt-40">
        <SectionHeading
          index="04"
          label="Beyond code"
          title={
            <>
              A little <Serif>more</Serif>
            </>
          }
        />
        <div className="grid gap-4 md:grid-cols-2">
          <Reveal className="rounded-3xl border border-line bg-surface/60 p-6 sm:p-8">
            <Eyebrow>Languages</Eyebrow>
            <ul className="mt-6 divide-y divide-line">
              {spokenLanguages.map((lang) => (
                <li key={lang.name} className="flex items-baseline justify-between py-3">
                  <span className="text-xl font-medium tracking-[-0.02em]">{lang.name}</span>
                  <span className="font-mono text-xs text-subtle">{lang.level}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08} className="rounded-3xl border border-line bg-surface/60 p-6 sm:p-8">
            <Eyebrow>Involvement</Eyebrow>
            <ul className="mt-6 divide-y divide-line">
              {involvement.map((item) => (
                <li key={item.name} className="flex items-baseline justify-between py-3">
                  <span className="text-xl font-medium tracking-[-0.02em]">{item.name}</span>
                  <span className="font-mono text-xs text-subtle">{item.period}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
