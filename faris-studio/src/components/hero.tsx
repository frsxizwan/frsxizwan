"use client";

import { motion } from "framer-motion";
import { site } from "@/content/site";
import { HeroCanvas } from "./hero-canvas";
import { ArrowRight } from "./icons";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative flex min-h-[100svh] items-center overflow-hidden">
      <HeroCanvas />
      <div className="container-page relative pb-24 pt-32">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.1 }}
        >
          {site.name}
        </motion.p>

        <h1
          id="hero-title"
          className="mt-7 max-w-4xl text-[clamp(2.6rem,6.6vw,5.5rem)] font-medium leading-[1.02] tracking-[-0.04em]"
        >
          {site.tagline.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className={`block ${i === 0 ? "text-fg" : i === 1 ? "text-fg/70" : "text-fg/45"}`}
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.2 + i * 0.12, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.75, ease }}
        >
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-muted" aria-label="Roles">
            {site.roles.map((role) => (
              <li key={role} className="flex items-center gap-6">
                {role}
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="group inline-flex items-center gap-2.5 rounded-full bg-fg px-6 py-3.5 text-[15px] font-medium text-ink transition-colors hover:bg-white"
            >
              View the work
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-full border border-line-strong px-6 py-3.5 text-[15px] font-medium transition-colors hover:border-white/40"
            >
              Get in touch
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
