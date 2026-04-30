"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#0b0b10]/70 border-b border-white/10">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-10 justify-start">
        <Link href="/" className="font-semibold text-lg tracking-tight text-slate-100 hover:text-white transition-colors">
          Mohamed Dhia Chairet Portfolio
        </Link>
        <nav className="ml-auto flex items-center gap-6 text-sm">
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


