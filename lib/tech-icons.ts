import type { LucideIcon } from "lucide-react";
import { AudioLines, Braces, FlaskConical, KeyRound, LayoutDashboard, Network, Repeat, ShieldCheck, Upload, Zap } from "lucide-react";
import {
  siAngular,
  siCplusplus,
  siCss,
  siDart,
  siDocker,
  siDoctrine,
  siElevenlabs,
  siExpress,
  siFigma,
  siFlutter,
  siGit,
  siGithub,
  siGithubactions,
  siGitlab,
  siGoogle,
  siGooglegemini,
  siHtml5,
  siJavascript,
  siJsonwebtokens,
  siJunit5,
  siLinux,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siPhp,
  siPostgresql,
  siPostman,
  siPython,
  siReact,
  siSpringboot,
  siSpringsecurity,
  siSwagger,
  siSymfony,
  siThymeleaf,
  siTypescript,
  siVercel,
} from "simple-icons";

export type TechIconData =
  | { kind: "svg"; title: string; path: string; viewBox: string; evenOdd?: boolean; color: string }
  | { kind: "glyph"; title: string; Icon: LucideIcon; color: string };

const FOREGROUND = "#f4f4f5";
const GLYPH_COLOR = "#d4d4d8";

// Brand colors that are too dark to read on the near-black background get lifted
function readableColor(hex: string) {
  const value = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16) / 255);
  const linear = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const luminance = 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
  if (luminance < 0.03) return FOREGROUND;
  if (luminance < 0.12) return `color-mix(in oklab, #${value} 60%, white)`;
  return `#${value}`;
}

function brand(icon: { title: string; path: string; hex: string }): TechIconData {
  return { kind: "svg", title: icon.title, path: icon.path, viewBox: "0 0 24 24", color: readableColor(icon.hex) };
}

function glyph(title: string, Icon: LucideIcon): TechIconData {
  return { kind: "glyph", title, Icon, color: GLYPH_COLOR };
}

// Not in Simple Icons, or its version is a wordmark that is unreadable at chip size.
// Java, VS Code, MySQL and .NET from Devicon (MIT), OpenAI from Lobe Icons (MIT).
const java: TechIconData = {
  kind: "svg",
  title: "Java",
  viewBox: "0 0 128 128",
  color: "#ea2d2e",
  path: "M47.617 98.12c-19.192 5.362 11.677 16.439 36.115 5.969-4.003-1.556-6.874-3.351-6.874-3.351-10.897 2.06-15.952 2.222-25.844 1.092-8.164-.935-3.397-3.71-3.397-3.71zm33.189-10.46c-14.444 2.779-22.787 2.69-33.354 1.6-8.171-.845-2.822-4.805-2.822-4.805-21.137 7.016 11.767 14.977 41.309 6.336-3.14-1.106-5.133-3.131-5.133-3.131zm11.319-60.575c.001 0-42.731 10.669-22.323 34.187 6.024 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.793 15.634-29.58zm9.998 81.144s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.095.171-4.45-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.952-3.487-32.013 6.85-13.742 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM85 77.896c2.395-1.634 5.703-3.053 5.703-3.053s-9.424 1.685-18.813 2.474c-11.494.964-23.823 1.154-30.012.326-14.652-1.959 8.033-7.348 8.033-7.348s-8.812-.596-19.644 4.644C17.455 81.134 61.958 83.958 85 77.896zm5.609 15.145c-.108.29-.468.616-.468.616 31.273-8.221 19.775-28.979 4.822-23.725-1.312.464-2 1.543-2 1.543s.829-.334 2.678-.72c7.559-1.575 18.389 10.119-5.032 22.286zM64.181 70.069c-4.614-10.429-20.26-19.553.007-35.559C89.459 14.563 76.492 1.587 76.492 1.587c5.23 20.608-18.451 26.833-26.999 39.667-5.821 8.745 2.857 18.142 14.688 28.815zm27.274 51.748c-19.187 3.612-42.854 3.191-56.887.874 0 0 2.874 2.38 17.646 3.331 22.476 1.437 57-.8 57.816-11.436.001 0-1.57 4.032-18.575 7.231z",
};

const vscode: TechIconData = {
  kind: "svg",
  title: "VS Code",
  viewBox: "0 0 128 128",
  evenOdd: true,
  color: "#3c99d4",
  path: "M90.767 127.126a7.968 7.968 0 0 0 6.35-.244l26.353-12.681a8 8 0 0 0 4.53-7.209V21.009a8 8 0 0 0-4.53-7.21L97.117 1.12a7.97 7.97 0 0 0-9.093 1.548l-50.45 46.026L15.6 32.013a5.328 5.328 0 0 0-6.807.302l-7.048 6.411a5.335 5.335 0 0 0-.006 7.888L20.796 64 1.74 81.387a5.336 5.336 0 0 0 .006 7.887l7.048 6.411a5.327 5.327 0 0 0 6.807.303l21.974-16.68 50.45 46.025a7.96 7.96 0 0 0 2.743 1.793Zm5.252-92.183L57.74 64l38.28 29.058V34.943Z",
};

const mysql: TechIconData = {
  kind: "svg",
  title: "MySQL",
  viewBox: "0 0 128 128",
  color: readableColor("#00618a"),
  path: "M117.688 98.242c-6.973-.191-12.297.461-16.852 2.379-1.293.547-3.355.559-3.566 2.18.711.746.82 1.859 1.387 2.777 1.086 1.754 2.922 4.113 4.559 5.352 1.789 1.348 3.633 2.793 5.551 3.961 3.414 2.082 7.223 3.27 10.504 5.352 1.938 1.23 3.859 2.777 5.75 4.164.934.684 1.563 1.75 2.773 2.18v-.195c-.637-.812-.801-1.93-1.387-2.777l-2.578-2.578c-2.52-3.344-5.719-6.281-9.117-8.719-2.711-1.949-8.781-4.578-9.91-7.73l-.199-.199c1.922-.219 4.172-.914 5.949-1.391 2.98-.797 5.645-.59 8.719-1.387l4.164-1.187v-.793c-1.555-1.594-2.664-3.707-4.359-5.152-4.441-3.781-9.285-7.555-14.273-10.703-2.766-1.746-6.184-2.883-9.117-4.363-.988-.496-2.719-.758-3.371-1.586-1.539-1.961-2.379-4.449-3.566-6.738-2.488-4.793-4.93-10.023-7.137-15.066-1.504-3.437-2.484-6.828-4.359-9.91-9-14.797-18.687-23.73-33.695-32.508-3.195-1.867-7.039-2.605-11.102-3.57l-6.543-.395c-1.332-.555-2.715-2.184-3.965-2.977C16.977 3.52 4.223-3.312.539 5.672-1.785 11.34 4.016 16.871 6.09 19.746c1.457 2.012 3.32 4.273 4.359 6.539.688 1.492.805 2.984 1.391 4.559 1.438 3.883 2.695 8.109 4.559 11.695.941 1.816 1.98 3.727 3.172 5.352.727.996 1.98 1.438 2.18 2.973-1.227 1.715-1.297 4.375-1.984 6.543-3.098 9.77-1.926 21.91 2.578 29.137 1.383 2.223 4.641 6.98 9.117 5.156 3.918-1.598 3.043-6.539 4.164-10.902.254-.988.098-1.715.594-2.379v.199l3.57 7.133c2.641 4.254 7.324 8.699 11.297 11.699 2.059 1.555 3.68 4.242 6.344 5.152v-.199h-.199c-.516-.805-1.324-1.137-1.98-1.781-1.551-1.523-3.277-3.414-4.559-5.156-3.613-4.902-6.805-10.27-9.711-15.855-1.391-2.668-2.598-5.609-3.77-8.324-.453-1.047-.445-2.633-1.387-3.172-1.281 1.988-3.172 3.598-4.164 5.945-1.582 3.754-1.789 8.336-2.375 13.082-.348.125-.195.039-.398.199-2.762-.668-3.73-3.508-4.758-5.949-2.594-6.164-3.078-16.09-.793-23.191.59-1.836 3.262-7.617 2.18-9.316-.516-1.691-2.219-2.672-3.172-3.965-1.18-1.598-2.355-3.703-3.172-5.551-2.125-4.805-3.113-10.203-5.352-15.062-1.07-2.324-2.875-4.676-4.359-6.738-1.645-2.289-3.484-3.977-4.758-6.742-.453-.984-1.066-2.559-.398-3.566.215-.684.516-.969 1.191-1.191 1.148-.887 4.352.297 5.547.793 3.18 1.32 5.832 2.578 8.527 4.363 1.289.855 2.598 2.512 4.16 2.973h1.785c2.789.641 5.914.195 8.523.988 4.609 1.402 8.738 3.582 12.488 5.949 11.422 7.215 20.766 17.48 27.156 29.734 1.027 1.973 1.473 3.852 2.379 5.945 1.824 4.219 4.125 8.559 5.941 12.688 1.816 4.113 3.582 8.27 6.148 11.695 1.348 1.801 6.551 2.766 8.918 3.766 1.66.699 4.379 1.43 5.949 2.379 3 1.809 5.906 3.965 8.723 5.945 1.402.992 5.73 3.168 5.945 4.957zm-88.605-75.52c-1.453-.027-2.48.156-3.566.395v.199h.195c.695 1.422 1.918 2.34 2.777 3.566l1.98 4.164.199-.195c1.227-.867 1.789-2.25 1.781-4.363-.492-.52-.562-1.164-.992-1.785-.562-.824-1.66-1.289-2.375-1.98zm0 0",
};

const dotnet: TechIconData = {
  kind: "svg",
  title: ".NET",
  viewBox: "0 0 128 128",
  evenOdd: true,
  color: "#1384c8",
  path: "M82.108 78.432c.479-1.232 1.022-2.445 1.427-3.701 2.288-7.097 4.554-14.2 6.805-21.309.865-2.731 1.813-5.42 3.515-7.767 2.692-3.709 6.442-5.652 10.88-6.331a37.456 37.456 0 015.28-.406c5.267-.05 10.536-.015 15.804-.01.28 0 .56.029.957.052-.129.304-.199.525-.311.724-1.955 3.494-3.872 7.009-5.885 10.468-3.505 6.022-7.016 12.042-10.631 17.998-2.319 3.819-4.834 7.52-7.687 10.974-2.105 2.548-4.321 4.984-7.146 6.77-1.925 1.217-3.981 1.929-6.315 1.917-8.278-.045-16.556-.012-24.834-.024-2.461-.004-4.568-.941-6.356-2.603-2.563-2.381-4.093-5.412-5.345-8.608-2.284-5.835-3.563-11.951-5.031-18.014-.688-2.838-1.47-5.654-2.215-8.478-.048-.183-.142-.354-.25-.617l-.577.542c-3.228 3.207-6.071 6.741-8.615 10.498-.693 1.024-.926 2.374-1.313 3.591-1.424 4.47-2.722 8.983-4.264 13.411-1.477 4.242-4.125 7.616-8.264 9.61a18.565 18.565 0 01-7.689 1.855c-3.98.088-7.962.098-11.943.134-.952.009-.996-.069-.748-.99 1.707-6.338 3.87-12.514 6.58-18.492 2.794-6.167 6.085-12.048 10.231-17.419 2.823-3.657 5.941-7.031 9.843-9.582 1.979-1.293 4.083-2.315 6.477-2.584.394-.045.793-.073 1.189-.073 8.478-.004 16.956.082 25.433-.039 4.547-.065 7.839 1.855 10.304 5.515 1.533 2.276 2.63 4.761 3.553 7.328 1.861 5.178 3.018 10.547 4.325 15.878.748 3.051 1.581 6.081 2.379 9.12.06.228.157.446.238.668l.199-.006z",
};

const openai: TechIconData = {
  kind: "svg",
  title: "OpenAI",
  viewBox: "0 0 24 24",
  evenOdd: true,
  color: FOREGROUND,
  path: "M9.205 8.658v-2.26c0-.19.072-.333.238-.428l4.543-2.616c.619-.357 1.356-.523 2.117-.523 2.854 0 4.662 2.212 4.662 4.566 0 .167 0 .357-.024.547l-4.71-2.759a.797.797 0 00-.856 0l-5.97 3.473zm10.609 8.8V12.06c0-.333-.143-.57-.429-.737l-5.97-3.473 1.95-1.118a.433.433 0 01.476 0l4.543 2.617c1.309.76 2.189 2.378 2.189 3.948 0 1.808-1.07 3.473-2.76 4.163zM7.802 12.703l-1.95-1.142c-.167-.095-.239-.238-.239-.428V5.899c0-2.545 1.95-4.472 4.591-4.472 1 0 1.927.333 2.712.928L8.23 5.067c-.285.166-.428.404-.428.737v6.898zM12 15.128l-2.795-1.57v-3.33L12 8.658l2.795 1.57v3.33L12 15.128zm1.796 7.23c-1 0-1.927-.332-2.712-.927l4.686-2.712c.285-.166.428-.404.428-.737v-6.898l1.974 1.142c.167.095.238.238.238.428v5.233c0 2.545-1.974 4.472-4.614 4.472zm-5.637-5.303l-4.544-2.617c-1.308-.761-2.188-2.378-2.188-3.948A4.482 4.482 0 014.21 6.327v5.423c0 .333.143.571.428.738l5.947 3.449-1.95 1.118a.432.432 0 01-.476 0zm-.262 3.9c-2.688 0-4.662-2.021-4.662-4.519 0-.19.024-.38.047-.57l4.686 2.71c.286.167.571.167.856 0l5.97-3.448v2.26c0 .19-.07.333-.237.428l-4.543 2.616c-.619.357-1.356.523-2.117.523zm5.899 2.83a5.947 5.947 0 005.827-4.756C22.287 18.339 24 15.84 24 13.296c0-1.665-.713-3.282-1.998-4.448.119-.5.19-.999.19-1.498 0-3.401-2.759-5.947-5.946-5.947-.642 0-1.26.095-1.88.31A5.962 5.962 0 0010.205 0a5.947 5.947 0 00-5.827 4.757C1.713 5.447 0 7.945 0 10.49c0 1.666.713 3.283 1.998 4.448-.119.5-.19 1-.19 1.499 0 3.401 2.759 5.946 5.946 5.946.642 0 1.26-.095 1.88-.309a5.96 5.96 0 004.162 1.713z",
};

// Keys are lowercase; version suffixes like "Java 17" or "Next.js 16" are stripped before lookup
const icons: Record<string, TechIconData> = {
  java,
  "vs code": vscode,
  openai,
  "openai api": openai,
  typescript: brand(siTypescript),
  javascript: brand(siJavascript),
  python: brand(siPython),
  php: brand(siPhp),
  dart: brand(siDart),
  "c++": brand(siCplusplus),
  "next.js": brand(siNextdotjs),
  react: brand(siReact),
  angular: brand(siAngular),
  flutter: brand(siFlutter),
  thymeleaf: brand(siThymeleaf),
  "html/css": brand(siHtml5),
  html: brand(siHtml5),
  css: brand(siCss),
  "node.js": brand(siNodedotjs),
  express: brand(siExpress),
  "express.js": brand(siExpress),
  "spring boot": brand(siSpringboot),
  "spring security": brand(siSpringsecurity),
  symfony: brand(siSymfony),
  ".net": dotnet,
  gemini: brand(siGooglegemini),
  "gemini api": brand(siGooglegemini),
  "gemini ai": brand(siGooglegemini),
  elevenlabs: brand(siElevenlabs),
  "google oauth": brand(siGoogle),
  mongodb: brand(siMongodb),
  mysql,
  postgresql: brand(siPostgresql),
  junit: brand(siJunit5),
  postman: brand(siPostman),
  swagger: brand(siSwagger),
  git: brand(siGit),
  github: brand(siGithub),
  gitlab: brand(siGitlab),
  "github actions": brand(siGithubactions),
  docker: brand(siDocker),
  linux: brand(siLinux),
  vercel: brand(siVercel),
  figma: brand(siFigma),
  jwt: brand(siJsonwebtokens),
  "jwt authentication": brand(siJsonwebtokens),
  "doctrine orm": brand(siDoctrine),
  doctrine: brand(siDoctrine),
  // No official mark available, so use a neutral glyph
  twig: glyph("Twig", Braces),
  vapi: glyph("Vapi", AudioLines),
  "vapi ai": glyph("Vapi AI", AudioLines),
  mockito: glyph("Mockito", FlaskConical),
  "thunder client": glyph("Thunder Client", Zap),
  "nextauth.js": glyph("NextAuth.js", KeyRound),
  easyadmin: glyph("EasyAdmin", LayoutDashboard),
  vichuploaderbundle: glyph("VichUploaderBundle", Upload),
  "rest apis": glyph("REST APIs", Network),
  rbac: glyph("RBAC", ShieldCheck),
  agile: glyph("Agile", Repeat),
};

export function getTechIcon(name: string): TechIconData | undefined {
  const key = name.trim().toLowerCase();
  return icons[key] ?? icons[key.replace(/\s+v?\d+(\.\d+)*$/, "")];
}
