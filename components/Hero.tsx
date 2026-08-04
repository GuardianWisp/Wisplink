"use client";

import { motion } from "framer-motion";
import RenderPlaceholder from "./RenderPlaceholder";
import Doodle from "./Doodle";

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
        Фриланс
        <br />
        <span className="relative inline-block">
          3D-генералист.
          <Doodle
            variant="underline"
            className="absolute -bottom-2 left-0 w-full md:-bottom-3"
            delay={0.9}
          />
        </span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.25, ease }}
        className="mt-10 grid grid-cols-1 gap-6 md:mt-14 md:grid-cols-12"
      >
        <p className="text-lg leading-relaxed text-muted md:col-span-5">
          Я создаю трёхмерную графику для клиентов, которые ценят результат
          на годы вперёд, а не на квартал. Один человек ведёт проект от
          моделинга до моушна, айдентики и режиссуры — от начала до конца,
          без передачи между разными специалистами.
        </p>
        <div className="hidden md:col-span-1 md:block" />
        <p className="text-lg leading-relaxed text-muted md:col-span-5">
          Россия, работаю удалённо. Беру в работу небольшое количество новых
          проектов каждый год.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4, ease }}
        className="mt-16 md:mt-24"
      >
        <RenderPlaceholder
          label="Рендер скоро появится"
          index="INDEX — 00"
          aspect="wide"
          priority
        />
      </motion.div>
    </section>
  );
}
