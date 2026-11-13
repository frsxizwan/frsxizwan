import { about } from "@/content/profile";
import { site } from "@/content/site";
import { Reveal } from "../reveal";
import { Section } from "../section";

export function About() {
  return (
    <Section id="about" eyebrow="About" title="Engineering philosophy">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-6">
          <p className="text-pretty text-2xl leading-snug tracking-tight md:text-[1.75rem]">{about.lead}</p>
          {about.paragraphs.map((p) => (
            <p key={p} className="mt-6 max-w-xl text-pretty leading-relaxed text-muted">
              {p}
            </p>
          ))}
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.14em] text-faint">Based in {site.location}</p>
        </Reveal>

        <ol className="lg:col-span-5 lg:col-start-8">
          {about.principles.map((p, i) => (
            <li key={p.title} className="border-t border-line py-7">
              <Reveal delay={i * 0.08} className="flex gap-6">
                <span className="pt-1 font-mono text-xs text-faint">0{i + 1}</span>
                <div>
                  <h3 className="text-lg font-medium tracking-tight">{p.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
