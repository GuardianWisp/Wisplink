"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import RenderPlaceholder from "./RenderPlaceholder";
import { useLocale } from "./LocaleProvider";

const ease = [0.16, 1, 0.3, 1] as const;

const TYPE_MS = 65;
const DELETE_MS = 40;
const PAUSE_TYPED_MS = 1500;
const PAUSE_EMPTY_MS = 300;

type Phase = "typing" | "deleting";

/**
 * Recursive setTimeout state machine rather than AnimatePresence — the
 * text itself is the only thing that changes, so there's no clipped
 * or overlapping layer to get wrong.
 */
function TypewriterRole({ roles }: { roles: string[] }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    setRoleIndex(0);
    setText("");
    setPhase("typing");
  }, [roles]);

  useEffect(() => {
    const current = roles[roleIndex] ?? "";

    if (phase === "typing") {
      if (text.length < current.length) {
        timeoutRef.current = setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          TYPE_MS
        );
      } else {
        timeoutRef.current = setTimeout(() => setPhase("deleting"), PAUSE_TYPED_MS);
      }
    } else {
      if (text.length > 0) {
        timeoutRef.current = setTimeout(
          () => setText(text.slice(0, -1)),
          DELETE_MS
        );
      } else {
        timeoutRef.current = setTimeout(() => {
          setRoleIndex((i) => (i + 1) % roles.length);
          setPhase("typing");
        }, PAUSE_EMPTY_MS);
      }
    }

    return () => clearTimeout(timeoutRef.current);
  }, [phase, text, roleIndex, roles]);

  return (
    <span className="inline-flex items-center">
      <span aria-hidden="true">{text}</span>
      <span
        aria-hidden="true"
        className="ml-[0.06em] h-[0.85em] w-[0.07em] shrink-0 animate-pulse bg-ink"
      />
      <span className="sr-only">{roles.join(" / ")}</span>
    </span>
  );
}

export default function Hero() {
  const { t } = useLocale();

  return (
    <section className="container-studio pb-20 pt-16 md:pb-28 md:pt-20">
      <motion.h1
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease }}
        className="min-h-[2.1em] max-w-5xl text-[clamp(2.75rem,7.4vw,6.5rem)] font-medium leading-[0.96] tracking-tightest"
      >
        <TypewriterRole roles={t.hero.roles} />
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.25, ease }}
        className="mt-10 grid grid-cols-1 gap-6 md:mt-14 md:grid-cols-12"
      >
        <p className="text-lg leading-relaxed text-muted md:col-span-5">
          {t.hero.paragraph1}
        </p>
        <div className="hidden md:col-span-1 md:block" />
        <p className="text-lg leading-relaxed text-muted md:col-span-5">
          {t.hero.paragraph2}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4, ease }}
        className="mt-16 md:mt-24"
      >
        <RenderPlaceholder
          label={t.renderPlaceholder.comingSoon}
          index="INDEX — 00"
          aspect="wide"
          priority
        />
      </motion.div>
    </section>
  );
}
