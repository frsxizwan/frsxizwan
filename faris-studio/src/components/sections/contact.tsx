import { site } from "@/content/site";
import { ArrowUpRight } from "../icons";
import { Reveal } from "../reveal";

export function Contact() {
  const links = [
    { label: "GitHub", href: site.links.github, handle: site.links.github.replace("https://", "") },
    { label: "LinkedIn", href: site.links.linkedin, handle: site.links.linkedin.replace("https://www.", "") },
  ];
  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line py-24 md:py-40">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h2
            id="contact-title"
            className="mt-5 max-w-4xl text-balance text-4xl font-medium tracking-[-0.03em] md:text-7xl"
          >
            Have a problem worth securing, automating or building?
          </h2>
          <a
            href={`mailto:${site.links.email}`}
            data-testid="email-link"
            className="group mt-12 inline-flex max-w-full items-center gap-3 break-all text-xl tracking-tight text-accent underline-offset-8 hover:underline md:text-3xl"
          >
            {site.links.email}
            <ArrowUpRight
              width={22}
              height={22}
              className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mt-16 grid gap-6 sm:grid-cols-2 md:max-w-2xl">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  data-testid={`${link.label.toLowerCase()}-link`}
                  className="group flex items-center justify-between rounded-2xl border border-line bg-surface px-6 py-5 transition-colors hover:border-line-strong"
                >
                  <span>
                    <span className="block text-[15px] font-medium">
                      {link.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </span>
                    <span className="mt-0.5 block font-mono text-xs text-faint">{link.handle}</span>
                  </span>
                  <ArrowUpRight className="text-faint transition-colors group-hover:text-accent" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
