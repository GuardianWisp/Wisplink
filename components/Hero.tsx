"use client";

import { motion } from "framer-motion";
import RenderPlaceholder from "./RenderPlaceholder";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  return (
    <section className="container-studio pb-20 pt-16 md:pb-28 md:pt-20">
      <motion.h1
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease }}
        className="max-w-5xl text-[clamp(2.75rem,7.4vw,6.5rem)] font-medium leading-[0.96] tracking-tightest"
      >
        A studio for
        <br />
        three&#8209;dimensional form.
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.25, ease }}
        className="mt-10 grid grid-cols-1 gap-6 md:mt-14 md:grid-cols-12"
      >
        <p className="text-lg leading-relaxed text-muted md:col-span-5">
          Forme designs and renders three-dimensional work for brands that
          measure success in decades, not quarters. We work in a narrow
          range — 3D, motion, identity, direction — and go deep rather
          than wide.
        </p>
        <div className="hidden md:col-span-1 md:block" />
        <p className="text-lg leading-relaxed text-muted md:col-span-5">
          Based between Amsterdam and Zürich. Available for a small number
          of new studio partnerships each year.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4, ease }}
        className="mt-16 md:mt-24"
      >
        <RenderPlaceholder
          label="Hero render"
          index="INDEX — 00"
          aspect="wide"
          priority
        />
      </motion.div>
    </section>
  );
}
