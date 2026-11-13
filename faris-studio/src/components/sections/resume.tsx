import type { ReactNode } from "react";
import { resume } from "@/content/profile";
import { site } from "@/content/site";
import { Reveal } from "../reveal";
import { Section } from "../section";

function Pending({ what }: { what: string }) {
  return <span className="text-faint">{what} — to be added</span>;
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Reveal className="grid gap-4 border-t border-line py-10 md:grid-cols-12 md:gap-10">
      <h3 className="eyebrow md:col-span-3 md:pt-1">{title}</h3>
      <div className="md:col-span-9">{children}</div>
    </Reveal>
  );
}

export function Resume() {
  return (
    <Section id="resume" eyebrow="Resume" title="Background">
      <Block title="Experience">
        <ul className="space-y-9">
          {resume.experience.map((job) => (
            <li key={job.title}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <p className="text-xl font-medium tracking-tight">
                  {job.title} <span className="text-muted">· {job.organisation}</span>
                </p>
                <p className="font-mono text-xs">{job.period ?? <Pending what="Dates" />}</p>
              </div>
              <ul className="mt-3 space-y-1.5 text-[15px] leading-relaxed text-muted">
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Education">
        <ul className="space-y-6">
          {resume.education.map((item) => (
            <li key={item.title}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <p className="text-xl font-medium tracking-tight">{item.title}</p>
                <p className="font-mono text-xs">{item.period ?? <Pending what="Years" />}</p>
              </div>
              <p className="mt-2 text-[15px] text-muted">
                {item.institution ?? <Pending what="Institution" />} · {item.detail}
              </p>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Certifications">
        <ul className="gap-x-10 space-y-2.5 text-[15px] leading-relaxed text-muted sm:columns-2">
          {resume.certifications.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </Block>

      <Block title="Recognition">
        <ul className="space-y-2.5 text-[15px] leading-relaxed text-muted">
          {resume.recognition.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </Block>

      <Reveal className="border-t border-line pt-10">
        {site.resumePdf ? (
          <a
            href={site.resumePdf}
            download
            className="inline-flex items-center rounded-full bg-fg px-6 py-3.5 text-[15px] font-medium text-ink transition-colors hover:bg-white"
          >
            Download resume (PDF)
          </a>
        ) : (
          <p data-testid="resume-pending" className="text-[15px] text-faint">
            A PDF version is not published yet.{" "}
            <a
              href={`mailto:${site.links.email}?subject=Resume%20request`}
              className="text-fg underline underline-offset-4 hover:text-accent"
            >
              Request it by email
            </a>
            .
          </p>
        )}
      </Reveal>
    </Section>
  );
}
