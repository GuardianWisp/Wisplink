"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import RenderPlaceholder from "./RenderPlaceholder";
import { useLocale } from "./LocaleProvider";

const ease = [0.16, 1, 0.3, 1] as const;

function toTitleCase(text: string) {
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

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
    <span className="inline-flex h-[1em] items-center align-top">
      <span aria-hidden="true">{text}</span>
      <span
        aria-hidden="true"
        className="ml-[0.06em] h-[0.85em] w-[0.07em] shrink-0 animate-pulse bg-ink"
      />
      <span className="sr-only">{roles.join(" / ")}</span>
    </span>
  );
}

export default function Hero({
  image,
  imageAlt,
}: {
  image?: string;
  imageAlt?: string;
}) {
  const { t } = useLocale();

  return (
    <section className="container-studio pb-20 pt-16 md:pb-28 md:pt-20">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-start md:gap-12">
        <div className="md:col-span-7">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            className="block font-sans text-2xl font-normal text-ink"
          >
            {toTitleCase(t.personName)}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.1, ease }}
            className="mt-4 text-[clamp(2.5rem,5.4vw,5.5rem)] font-medium leading-[0.96] tracking-tightest"
          >
            <TypewriterRole roles={t.hero.roles} />
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease }}
            className="mt-8 flex max-w-xl flex-col gap-4 md:mt-10"
          >
            <p className="text-lg leading-relaxed text-muted">
              {t.hero.paragraph1}
            </p>
            <p className="text-lg leading-relaxed text-muted">
              {t.hero.paragraph2}
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease }}
          className="md:col-span-5"
        >
          <RenderPlaceholder
            src={image}
            alt={imageAlt}
            label={t.renderPlaceholder.comingSoon}
            index="INDEX — 00"
            aspect="portrait"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
