import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { caseStudyProjects, categories, getProject } from "@/content/projects";
import { site } from "@/content/site";
import { statusLabel } from "@/lib/status";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudyProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title: `${project.title} — ${site.studio}`,
      description: project.summary,
      url: `/projects/${project.slug}`,
      images: project.cover ? [{ url: project.cover.src, width: project.cover.width, height: project.cover.height, alt: project.cover.alt }] : undefined,
    },
  };
}

function Part({ label, title, children }: { label: string; title: string; children: ReactNode }) {
  return (
    <section className="border-t border-line py-16 md:py-24">
      <Reveal>
        <p className="eyebrow">{label}</p>
        <h2 className="mt-4 text-3xl font-medium tracking-[-0.02em] md:text-4xl">{title}</h2>
      </Reveal>
      <div className="mt-10 md:mt-14">{children}</div>
    </section>
  );
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project?.caseStudy) notFound();
  const study = project.caseStudy;
  const category = categories.find((c) => c.id === project.category);
  const index = caseStudyProjects.findIndex((p) => p.slug === project.slug);
  const next = caseStudyProjects[(index + 1) % caseStudyProjects.length];

  return (
    <article className="container-page pt-32 md:pt-40">
      <Link
        href="/#work"
        data-testid="back-link"
        className="inline-flex items-center gap-2 text-[13px] text-muted transition-colors hover:text-fg"
      >
        <ArrowLeft /> All work
      </Link>

      <header className="pb-16 pt-10 md:pb-24">
        <p className="eyebrow">
          {category?.title} · {statusLabel[project.status]}
          {project.year ? ` · ${project.year}` : ""}
        </p>
        <h1 className="mt-6 max-w-4xl text-balance text-5xl font-medium leading-[1.04] tracking-[-0.04em] md:text-7xl">
          {project.title}
        </h1>
        <p className="mt-8 max-w-2xl text-pretty text-xl leading-relaxed text-muted">{project.summary}</p>

        <div className="mt-10 flex flex-wrap gap-4">
          {project.repo ? (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="repo-link"
              className="inline-flex items-center gap-2.5 rounded-full bg-fg px-6 py-3.5 text-[15px] font-medium text-ink transition-colors hover:bg-white"
            >
              View source <span className="sr-only">(opens in a new tab)</span>
              <ArrowUpRight />
            </a>
          ) : null}
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-line-strong px-6 py-3.5 text-[15px] font-medium transition-colors hover:border-white/40"
            >
              Live demo <span className="sr-only">(opens in a new tab)</span>
              <ArrowUpRight />
            </a>
          ) : null}
        </div>
      </header>

      <div>
        <section className="grid gap-12 border-t border-line py-16 md:grid-cols-12 md:gap-10 md:py-24">
          <Reveal className="md:col-span-5">
            <p className="eyebrow">Problem</p>
            <p className="mt-5 text-pretty text-2xl leading-snug tracking-tight">{study.problem}</p>
          </Reveal>
          <Reveal className="md:col-span-6 md:col-start-7" delay={0.08}>
            <h2 className="eyebrow">Approach</h2>
            <ol className="mt-5">
              {study.approach.map((step, i) => (
                <li key={step} className="flex gap-5 border-t border-line py-5 first:border-t-0 first:pt-0">
                  <span className="pt-0.5 font-mono text-xs text-faint">0{i + 1}</span>
                  <span className="leading-relaxed text-muted">{step}</span>
                </li>
              ))}
            </ol>
            <h2 className="eyebrow mt-10">Stack</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <li key={s} className="rounded-full border border-line px-3.5 py-1.5 font-mono text-xs text-muted">
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        <Part label="Architecture" title="How the parts connect">
          <ArchitectureDiagram layers={study.architecture} />
          {study.architectureNote ? <p className="mt-6 text-sm text-faint">{study.architectureNote}</p> : null}
        </Part>

        <Part label="Screenshots" title="What it looks like">
          <ul className={`grid gap-6 ${study.screenshots.length > 1 ? "md:grid-cols-2" : ""}`}>
            {study.screenshots.map((shot, i) => (
              <li key={shot.src} className={study.screenshots.length % 2 === 1 && i === 0 ? "md:col-span-2" : undefined}>
                <Reveal delay={i * 0.06}>
                  <figure data-testid="screenshot">
                    <div className="overflow-hidden rounded-2xl border border-line bg-surface">
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        width={shot.width}
                        height={shot.height}
                        quality={90}
                        priority={i === 0}
                        sizes={study.screenshots.length % 2 === 1 && i === 0 ? "(min-width: 1280px) 72rem, 100vw" : "(min-width: 768px) 50vw, 100vw"}
                        className="h-auto w-full"
                      />
                    </div>
                    <figcaption className="mt-3 text-sm text-faint">{shot.caption}</figcaption>
                  </figure>
                </Reveal>
              </li>
            ))}
          </ul>
        </Part>

        <Part label="Demo" title="Storyboard">
          <ol className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3" data-testid="storyboard">
            {study.storyboard.map((step, i) => (
              <li key={step.title}>
                <Reveal delay={(i % 3) * 0.06} className="border-t border-line-strong pt-5">
                  <p className="font-mono text-xs text-accent">Step {i + 1}</p>
                  <h3 className="mt-3 text-lg font-medium tracking-tight">{step.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{step.description}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Part>

        <Part label="Scope" title="Limitations">
          <ul className="max-w-3xl" data-testid="limitations">
            {study.limitations.map((item) => (
              <li key={item} className="flex gap-5 border-t border-line py-5 first:border-t-0 first:pt-0">
                <span aria-hidden="true" className="mt-3 h-px w-4 shrink-0 bg-faint" />
                <span className="leading-relaxed text-muted">{item}</span>
              </li>
            ))}
          </ul>
        </Part>
      </div>

      {next && next.slug !== project.slug ? (
        <Link
          href={`/projects/${next.slug}`}
          data-testid="next-project"
          className="group mb-24 flex items-center justify-between gap-6 border-y border-line py-12 md:py-16"
        >
          <span>
            <span className="eyebrow block">Next case study</span>
            <span className="mt-3 block text-3xl font-medium tracking-[-0.02em] transition-colors group-hover:text-accent md:text-5xl">
              {next.title}
            </span>
          </span>
          <ArrowRight width={28} height={28} className="shrink-0 text-faint transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-accent" />
        </Link>
      ) : null}
    </article>
  );
}
