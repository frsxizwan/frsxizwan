/**
 * Site-wide identity and links.
 * Everything a visitor sees about "who" lives here — edit this file, not the components.
 * Values marked PLACEHOLDER must be replaced before launch.
 */
export const site = {
  name: "Faris Izwan",
  studio: "Faris Studio",
  roles: ["Cybersecurity Engineer", "AI Product Developer", "Creative Technologist"],
  tagline: ["Beyond Code.", "Engineering Intelligence.", "Designing Experiences."],
  description:
    "Portfolio of Faris Izwan — security tooling, AI-assisted products and interactive experiences, documented with their architecture and their limits.",
  location: "Penang, Malaysia",

  /** Canonical URL. Set NEXT_PUBLIC_SITE_URL in your host's environment. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-domain.example", // PLACEHOLDER

  links: {
    email: "frsxizwan.mfi@gmail.com",
    github: "https://github.com/frsxizwan",
    linkedin: "https://www.linkedin.com/in/faris-izwan",
  },

  /**
   * Path to a PDF in /public (e.g. "/faris-izwan-resume.pdf").
   * Leave null until the file exists — the UI shows an honest "not yet published" state.
   */
  resumePdf: null as string | null, // PLACEHOLDER

  /** Set to false to hide cards flagged `placeholder: true` in projects.ts. */
  showPlaceholders: true,
} as const;

export const navigation = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "case-studies", label: "Case studies" },
  { id: "skills", label: "Skills" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
] as const;
