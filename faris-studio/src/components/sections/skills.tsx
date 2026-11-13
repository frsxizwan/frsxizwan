import { skillGroups, skillLevels } from "@/content/profile";
import type { SkillLevel } from "@/content/types";
import { Reveal } from "../reveal";
import { Section } from "../section";

function Steps({ level }: { level: SkillLevel }) {
  return (
    <span aria-hidden="true" className="flex gap-1">
      {[1, 2, 3].map((n) => (
        <span key={n} className={`h-1 w-4 rounded-full ${n <= skillLevels[level].steps ? "bg-accent" : "bg-white/10"}`} />
      ))}
    </span>
  );
}

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="What I can show, and what I can't yet"
      intro="No percentage bars. Each skill is placed on a three-step scale defined by evidence, not by confidence."
    >
      <Reveal>
        <dl className="grid gap-6 rounded-2xl border border-line bg-surface p-7 md:grid-cols-3 md:gap-10 md:p-9">
          {(Object.keys(skillLevels) as SkillLevel[]).map((level) => (
            <div key={level}>
              <dt className="flex items-center justify-between gap-4 text-[15px] font-medium">
                {skillLevels[level].label}
                <Steps level={level} />
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted">{skillLevels[level].description}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <div className="mt-14 grid gap-x-16 gap-y-14 md:grid-cols-2">
        {skillGroups.map((group, i) => (
          <Reveal key={group.title} delay={(i % 2) * 0.08}>
            <h3 className="eyebrow">{group.title}</h3>
            <ul className="mt-4">
              {group.skills.map((skill) => (
                <li
                  key={skill.name}
                  data-testid="skill"
                  data-level={skill.level}
                  className="flex items-center justify-between gap-6 border-t border-line py-4"
                >
                  <span>
                    <span className="text-[15px]">{skill.name}</span>
                    {skill.evidence ? (
                      <span className="mt-0.5 block text-xs text-faint">Evidence: {skill.evidence}</span>
                    ) : null}
                  </span>
                  <span className="flex shrink-0 items-center gap-3">
                    <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint max-sm:sr-only">
                      {skillLevels[skill.level].label}
                    </span>
                    <Steps level={skill.level} />
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
