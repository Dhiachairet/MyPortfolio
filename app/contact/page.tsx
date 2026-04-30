export const metadata = {
  title: "Contact — Mohamed Dhia Chairet",
};

function IconMail(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" {...props}>
      <path d="M3.75 6.75h16.5v10.5a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V6.75Z" />
      <path d="M3.75 6.75 12 12l8.25-5.25" />
    </svg>
  );
}

function IconGithub(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.61-3.37-1.36-3.37-1.36-.45-1.18-1.12-1.5-1.12-1.5-.92-.64.07-.63.07-.63 1.02.07 1.55 1.07 1.55 1.07.9 1.57 2.36 1.12 2.93.85.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.27 2.75 1.05.8-.23 1.66-.35 2.52-.35s1.72.12 2.52.35c1.91-1.32 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.95-2.35 4.82-4.58 5.07.36.31.68.92.68 1.86 0 1.34-.01 2.41-.01 2.73 0 .27.18.6.69.49 3.96-1.35 6.83-5.18 6.83-9.7C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function IconLinkedIn(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.49 6A2.49 2.49 0 1 1 4.98 3.5ZM3 8h3v13H3V8Zm7 0h2.88v1.77h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.6V21H16v-6.2c0-1.48-.03-3.38-2.06-3.38-2.06 0-2.37 1.6-2.37 3.26V21H9V8Z" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <section className="space-y-8 max-w-2xl">
      <div className="surface-panel rounded-3xl p-8 sm:p-10">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Contact</p>
    
        <p className="text-sm text-slate-300 mt-4">
          Software engineering student looking for internships or part-time work where I can actually write code and contribute. If you have something going on, feel free to reach out.
        </p>
        <div className="mt-6 grid gap-3">
          <a href="mailto:mohameddhia.chairet@gmail.com" className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white hover:border-cyan-300/40 hover:bg-white/10 transition">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
              <IconMail className="h-5 w-5" />
            </span>
            <span className="font-semibold">mohameddhia.chairet@gmail.com</span>
          </a>

          <a href="https://github.com/Dhiachairet" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white hover:border-cyan-300/40 hover:bg-white/10 transition">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
              <IconGithub className="h-5 w-5" />
            </span>
            <span className="font-semibold">github.com/Dhiachairet</span>
          </a>

          <a href="https://www.linkedin.com/in/dhia-chairet-baba16249/" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white hover:border-cyan-300/40 hover:bg-white/10 transition">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
              <IconLinkedIn className="h-5 w-5" />
            </span>
            <span className="font-semibold">linkedin.com/in/dhia-chairet-baba16249</span>
          </a>
        </div>
      </div>
    </section>
  );
}


