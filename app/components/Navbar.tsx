"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#0b0b10]/70 border-b border-white/10">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-3 sm:h-16 flex flex-wrap items-center gap-4 sm:gap-10 justify-start">
        <Link href="/" className="font-semibold text-base sm:text-lg tracking-tight text-slate-100 hover:text-white transition-colors leading-tight">
          Mohamed Dhia Chairet
          <span className="hidden sm:inline"> Portfolio</span>
        </Link>
        <nav className="w-full sm:w-auto sm:ml-auto flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm">
          <Link href="/about" className="hover:text-white text-slate-300 transition-colors">
            About
          </Link>
          <Link href="/projects" className="hover:text-white text-slate-300 transition-colors">
            Projects
          </Link>
          <Link href="/contact" className="hover:text-white text-slate-300 transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}


