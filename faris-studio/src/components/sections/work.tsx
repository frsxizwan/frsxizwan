import { categories, visibleProjects } from "@/content/projects";
import { site } from "@/content/site";
import { ProjectCard } from "../project-card";
import { Reveal } from "../reveal";
import { Section } from "../section";

export function Work() {
  const projects = visibleProjects(site.showPlaceholders);
  return (
    <Section
      id="work"
      eyebrow="Work"
      title="Projects, by discipline"
      intro="Three areas of practice. Each project is labelled with its real status — prototype means prototype."
    >
      <div className="space-y-20 md:space-y-28">
        {categories.map((category) => {
          const items = projects.filter((p) => p.category === category.id);
          if (items.length === 0) return null;
          return (
            <div key={category.id} id={category.id} className="grid scroll-mt-24 gap-8 lg:grid-cols-12 lg:gap-10">
              <Reveal className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <p className="font-mono text-xs text-faint">{category.index}</p>
                  <h3 className="mt-3 text-2xl font-medium tracking-tight md:text-3xl">{category.title}</h3>
                  <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-muted">{category.summary}</p>
                </div>
              </Reveal>
              <ul className="grid gap-6 sm:grid-cols-2 lg:col-span-8">
                {items.map((project, i) => (
                  <li key={project.slug} className={items.length === 1 ? "sm:col-span-2" : undefined}>
                    <Reveal delay={i * 0.08} className="h-full">
                      <ProjectCard project={project} />
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
