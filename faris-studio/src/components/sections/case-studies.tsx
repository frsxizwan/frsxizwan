import Link from "next/link";
import { caseStudyProjects, categories } from "@/content/projects";
import { ArrowRight } from "../icons";
import { Reveal } from "../reveal";
import { Section } from "../section";

export function CaseStudies() {
  const featured = caseStudyProjects.filter((p) => p.featured);
  return (
    <Section
      id="case-studies"
      eyebrow="Case studies"
      title="How each one is built"
      intro="Architecture, screenshots, a demo storyboard and a list of limitations for every project with a public repository."
    >
      <ul className="border-t border-line">
        {featured.map((project, i) => {
          const category = categories.find((c) => c.id === project.category);
          return (
            <li key={project.slug} className="border-b border-line">
              <Reveal delay={i * 0.05}>
                <Link
                  href={`/projects/${project.slug}`}
                  data-testid="case-study-link"
                  className="group grid items-baseline gap-x-10 gap-y-3 py-8 md:grid-cols-12 md:py-10"
                >
                  <span className="font-mono text-xs text-faint md:col-span-1">0{i + 1}</span>
                  <span className="text-2xl font-medium tracking-tight transition-colors group-hover:text-accent md:col-span-5 md:text-3xl">
                    {project.title}
                  </span>
                  <span className="text-[15px] leading-relaxed text-muted md:col-span-4">
                    {category?.title} · {project.caseStudy?.architecture.length} layers ·{" "}
                    {project.caseStudy?.storyboard.length}-step demo
                  </span>
                  <span className="hidden justify-self-end text-faint transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-accent md:col-span-2 md:block">
                    <ArrowRight width={20} height={20} />
                  </span>
                </Link>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
