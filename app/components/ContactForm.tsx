"use client";

import { useActionState, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, CircleAlert, LoaderCircle, Mail, MessageSquare, RotateCcw, User } from "lucide-react";
import { sendContactMessage, type ContactState } from "../contact/actions";
import { siteConfig } from "../../lib/site";
import { cn } from "../../lib/utils";

const initialState: ContactState = { status: "idle" };
const MESSAGE_MAX = 5000;
const ease = [0.22, 1, 0.36, 1] as const;

// Input styling adapted from Watermelon UI's contact blocks: inset highlight + hairline ring
const inputClass =
  "w-full rounded-xl border border-transparent bg-white/[0.03] py-3 pr-4 pl-10 text-[15px] text-foreground shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_0_0_1px_rgba(255,255,255,0.08)] transition-[box-shadow,background-color] duration-200 placeholder:text-muted/70 hover:bg-white/[0.05] focus:bg-white/[0.05] focus:outline-hidden focus:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_0_0_1px_var(--accent),0_0_0_4px_color-mix(in_oklab,var(--accent)_18%,transparent)] aria-[invalid=true]:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_0_0_1px_#f87171] aria-[invalid=true]:focus:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_0_0_1px_#f87171,0_0_0_4px_rgba(248,113,113,0.2)]";

// Network drops or a redeploy (stale action id) make the server action throw;
// turn that into an error state instead of crashing the page, and keep what was typed
async function submitContact(prev: ContactState, formData: FormData): Promise<ContactState> {
  try {
    return await sendContactMessage(prev, formData);
  } catch (error) {
    console.error("[contact] Server action failed:", error);
    const value = (key: string) => {
      const v = formData.get(key);
      return typeof v === "string" ? v.replace(/\r\n?/g, "\n") : "";
    };
    return {
      status: "error",
      message: `I couldn't reach the server, so your message wasn't sent. Check your connection and try again. If it keeps failing, refresh the page or email me at ${siteConfig.email}.`,
      values: { name: value("name"), email: value("email"), message: value("message") },
    };
  }
}

// Stable ref callback: move focus to the confirmation when it appears
function focusOnMount(el: HTMLElement | null) {
  el?.focus({ preventScroll: true });
}

type FieldProps = {
  id: string;
  label: string;
  icon: LucideIcon;
  error?: string;
  hint?: ReactNode;
  multiline?: boolean;
  children: ReactNode;
};

function Field({ id, label, icon: Icon, error, hint, multiline, children }: FieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}
        </label>
        {hint}
      </div>
      <div className="relative">
        <Icon
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute left-3.5 size-4 text-subtle",
            multiline ? "top-3.5" : "top-1/2 -translate-y-1/2",
          )}
        />
        {children}
      </div>
      {error && (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-sm text-red-400">
          <CircleAlert aria-hidden="true" className="size-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialState);
  // Remember which success result was dismissed so "Send another" shows the form again
  const [dismissed, setDismissed] = useState<ContactState | null>(null);
  const [messageLength, setMessageLength] = useState(0);
  const [lengthSource, setLengthSource] = useState<ContactState>(state);

  // Sync the counter with whatever the form was repopulated with after a submit
  if (lengthSource !== state) {
    setLengthSource(state);
    setMessageLength(state.values?.message.length ?? 0);
  }

  const formRef = useRef<HTMLFormElement | null>(null);
  const focusNameOnMount = useRef(false);

  // Disabling the submit button drops focus to <body>; bring it back to the first problem field
  // (or the button) once an error comes back
  useEffect(() => {
    if (pending || state.status !== "error") return;
    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"], button[type="submit"]')?.focus();
  }, [state, pending]);

  const setFormRef = useCallback((el: HTMLFormElement | null) => {
    formRef.current = el;
    if (el && focusNameOnMount.current) {
      focusNameOnMount.current = false;
      el.querySelector<HTMLInputElement>("#contact-name")?.focus();
    }
  }, []);

  const showSuccess = state.status === "success" && state !== dismissed;
  const errors = state.fieldErrors ?? {};
  const describedBy = (field: keyof typeof errors) => (errors[field] ? `contact-${field}-error` : undefined);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-line bg-surface/60 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {showSuccess ? (
          <motion.div
            key="success"
            role="status"
            initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
            transition={{ duration: 0.5, ease }}
            className="flex flex-col items-center py-10 text-center sm:py-14"
          >
            <svg viewBox="0 0 52 52" aria-hidden="true" className="size-16 text-accent">
              <motion.circle
                cx="26"
                cy="26"
                r="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                transform="rotate(-90 26 26)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, ease }}
              />
              <motion.path
                d="M15 27l7 7 15-15"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: 0.45, ease }}
              />
            </svg>
            <h3 ref={focusOnMount} tabIndex={-1} className="mt-6 text-3xl font-medium tracking-[-0.03em] outline-none">
              Message sent!
            </h3>
            <p className="mt-3 max-w-sm leading-relaxed text-muted">{state.message}</p>
            <button
              type="button"
              onClick={() => {
                focusNameOnMount.current = true;
                setDismissed(state);
                setMessageLength(0);
              }}
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-line-strong bg-linear-to-b from-white/[0.08] to-white/[0.02] px-5 py-3 text-sm font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-colors hover:border-white/25"
            >
              <RotateCcw className="size-4" />
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={setFormRef}
            action={formAction}
            initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
            transition={{ duration: 0.5, ease }}
            className="space-y-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="contact-name" label="Name" icon={User} error={errors.name}>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  minLength={2}
                  maxLength={100}
                  placeholder="Your name"
                  defaultValue={state.values?.name}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={describedBy("name")}
                  className={inputClass}
                />
              </Field>
              <Field id="contact-email" label="Email" icon={Mail} error={errors.email}>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  placeholder="you@company.com"
                  defaultValue={state.values?.email}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={describedBy("email")}
                  className={inputClass}
                />
              </Field>
            </div>

            <Field
              id="contact-message"
              label="Message"
              icon={MessageSquare}
              error={errors.message}
              multiline
              hint={
                <span className="font-mono text-[11px] text-muted tabular-nums">
                  {messageLength}/{MESSAGE_MAX}
                </span>
              }
            >
              <textarea
                id="contact-message"
                name="message"
                required
                minLength={10}
                maxLength={MESSAGE_MAX}
                rows={6}
                placeholder="Tell me about the internship, project, or idea you have in mind..."
                defaultValue={state.values?.message}
                onChange={(e) => setMessageLength(e.target.value.length)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={describedBy("message")}
                className={cn(inputClass, "min-h-40 resize-y")}
              />
            </Field>

            {/* Honeypot for bots, hidden from people and screen readers */}
            <div aria-hidden="true" className="absolute top-0 -left-[10000px] size-px overflow-hidden">
              <label htmlFor="contact-company">Company</label>
              <input id="contact-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <AnimatePresence initial={false}>
              {state.status === "error" && state.message && !pending && (
                <motion.p
                  role="alert"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <span className="flex items-start gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                    <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                    <span>{state.message}</span>
                  </span>
                </motion.p>
              )}
            </AnimatePresence>

            <div className="flex flex-col-reverse gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-relaxed text-muted">
                Goes straight to my inbox. Prefer email?{" "}
                <a href={`mailto:${siteConfig.email}`} className="text-foreground underline underline-offset-4 transition-colors hover:text-accent">
                  Write to me directly
                </a>
                .
              </p>
              <button
                type="submit"
                disabled={pending}
                className="group relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground transition-[box-shadow,opacity] duration-300 hover:shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent)_22%,transparent)] disabled:cursor-wait disabled:opacity-80"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                />
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={pending ? "sending" : "idle"}
                    initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                    transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                    className="relative inline-flex items-center gap-2"
                  >
                    {pending ? (
                      <>
                        <LoaderCircle className="size-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send message
                        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </>
                    )}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
