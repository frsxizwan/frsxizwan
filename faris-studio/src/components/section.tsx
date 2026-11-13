import type { ReactNode } from "react";
import { Reveal } from "./reveal";

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="py-24 md:py-36">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2
            id={`${id}-title`}
            className="mt-5 max-w-3xl text-balance text-4xl font-medium tracking-[-0.03em] md:text-6xl"
          >
            {title}
          </h2>
          {intro ? <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted">{intro}</p> : null}
        </Reveal>
        <div className="mt-14 md:mt-20">{children}</div>
      </div>
    </section>
  );
}
