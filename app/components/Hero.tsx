export default function Hero() {
  return (
    <section className="surface-panel rounded-3xl p-8 sm:p-12 relative overflow-hidden">
      <div className="absolute -top-24 right-10 h-56 w-56 rounded-full bg-cyan-500/20 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 left-10 h-56 w-56 rounded-full bg-orange-500/10 blur-3xl" aria-hidden="true" />
      <div className="relative">
        <div className="reveal chip inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Available for internships &amp; Part-Time Jobs
        </div>
        <h1 className="reveal-delay text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight mt-6 leading-tight text-slate-50">
         Hi, I&rsquo;m Mohamed Dhia Chairet
        </h1>
        <p className="reveal-delay-lg text-slate-300 max-w-2xl mt-6 text-lg">
         Software engineering student at TEK-UP University. I build full-stack web apps from scratch backend, database, UI, the whole thing. Everything in my portfolio is something I actually finished and got working.
        </p>
        <div className="reveal-delay-lg flex flex-wrap gap-3 mt-8">
          <a href="/projects" className="inline-flex items-center rounded-full bg-white text-black px-5 py-2.5 text-sm font-semibold shadow-sm hover:shadow-md transition">
            View Projects
          </a>
          <a href="/contact" className="inline-flex items-center rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition">
            Let&apos;s Talk
          </a>
          <a href="/Mohameddhiachairetcv.pdf" download className="inline-flex items-center rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 transition">
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
}


