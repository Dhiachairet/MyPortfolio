export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 text-xs sm:text-sm text-center text-slate-400">
      <div className="container mx-auto px-4">
        © {new Date().getFullYear()} Mohamed Dhia Chairet — All rights reserved.
      </div>
    </footer>
  );
}


