"use client";

import Image from "next/image";
import Link from "next/link";
import type { PointerEvent } from "react";
import type { Project } from "@/content/types";
import { statusLabel } from "@/lib/status";
import { ArrowUpRight } from "./icons";

function trackPointer(e: PointerEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
}

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  const hasDetail = Boolean(project.caseStudy) && !project.placeholder;

  if (project.placeholder) {
    return (
      <article
        data-testid="project-card"
        data-placeholder="true"
        className="flex h-full min-h-64 flex-col justify-between rounded-2xl border border-dashed border-line-strong p-7"
      >
        <p className="eyebrow">Placeholder</p>
        <div>
          <h4 className="text-xl font-medium tracking-tight text-muted">{project.title}</h4>
          <p className="mt-3 text-[15px] leading-relaxed text-faint">{project.summary}</p>
        </div>
      </article>
    );
  }

  const body = (
    <>
      {project.cover ? (
        <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-ink-2">
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            priority={priority}
            quality={90}
            sizes="(min-width: 1024px) 48rem, 100vw"
            className="object-cover object-top opacity-90 transition-[transform,opacity] duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.025] group-hover:opacity-100"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-center justify-between gap-4">
          <p className="eyebrow">
            {statusLabel[project.status]}
            {project.year ? ` · ${project.year}` : ""}
          </p>
          {hasDetail ? (
            <ArrowUpRight className="text-faint transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
          ) : null}
        </div>
        <h4 className="mt-5 text-2xl font-medium tracking-tight">{project.title}</h4>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">{project.summary}</p>
        {project.stack.length > 0 ? (
          <ul className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-7 font-mono text-xs text-faint" aria-label="Stack">
            {project.stack.slice(0, 4).map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </>
  );

  const shell =
    "card-spot group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-[border-color,transform] duration-500 ease-[var(--ease-out-expo)]";

  return (
    <article data-testid="project-card" className="h-full">
      {hasDetail ? (
        <Link
          href={`/projects/${project.slug}`}
          onPointerMove={trackPointer}
          className={`${shell} hover:-translate-y-1 hover:border-line-strong`}
        >
          {body}
        </Link>
      ) : (
        <div className={shell}>{body}</div>
      )}
    </article>
  );
}
