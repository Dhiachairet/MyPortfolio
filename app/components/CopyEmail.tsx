"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Copy, Mail } from "lucide-react";

// Adapted from Watermelon UI's copy-confirm micro-interaction
export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <a
        href={`mailto:${email}`}
        className="flex min-w-0 items-center gap-2.5 rounded-full border border-line-strong bg-surface px-4 py-3 text-sm font-medium transition-colors hover:border-white/25"
      >
        <Mail className="size-4 shrink-0 text-subtle" />
        <span className="truncate">{email}</span>
      </a>
      <motion.button
        type="button"
        onClick={handleCopy}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        animate={{ backgroundColor: copied ? "#c8f45a" : "#f4f4f5" }}
        aria-label={copied ? "Email address copied" : "Copy email address"}
        className="relative flex items-center gap-2 overflow-hidden rounded-full px-4 py-3 text-sm font-medium text-background"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={copied ? "check" : "copy"}
            initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
            transition={{ type: "spring", duration: 0.3, bounce: 0 }}
          >
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          </motion.span>
        </AnimatePresence>
        <AnimatedText from="Copy email" to="Copied!" isCopied={copied} />
      </motion.button>
    </div>
  );
}

function AnimatedText({ from, to, isCopied }: { from: string; to: string; isCopied: boolean }) {
  const activeText = isCopied ? to : from;

  return (
    <span aria-hidden="true" className="flex will-change-transform">
      <AnimatePresence mode="popLayout" initial={false}>
        {activeText.split("").map((char, index) => (
          <motion.span
            key={char + index}
            layout
            initial={{ opacity: 0, y: 5, scale: 0.7 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { type: "spring", stiffness: 200, damping: 20, delay: 0.03 * index },
            }}
            exit={{ opacity: 0, y: -5, scale: 0.7 }}
          >
            {char === " " ? " " : char}
          </motion.span>
        ))}
      </AnimatePresence>
    </span>
  );
}
