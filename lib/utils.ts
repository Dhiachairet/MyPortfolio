export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

// "Employee-Management-System-EMS-" -> "Employee Management System EMS"
// "HealthCareSystem" -> "Health Care System"
export function formatRepoName(name: string) {
  return name
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .trim();
}

// Fixed timezone so server and client render the same string
const monthFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function formatMonth(iso: string) {
  return monthFormatter.format(new Date(iso));
}

// GitHub linguist colors for the languages most likely to show up
const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Java: "#b07219",
  Python: "#3572a5",
  PHP: "#4f5d95",
  Dart: "#00b4ab",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  HTML: "#e34c26",
  CSS: "#663399",
  SCSS: "#c6538c",
  Twig: "#c1d026",
  Vue: "#41b883",
  Kotlin: "#a97bff",
  Go: "#00add8",
  Rust: "#dea584",
  Shell: "#89e051",
  "Jupyter Notebook": "#da5b0b",
};

export function languageColor(language?: string | null) {
  return (language && languageColors[language]) || "#a1a1aa";
}
