export type CategoryId = "cybersecurity" | "ai-software" | "creative";

export interface Category {
  id: CategoryId;
  index: string;
  title: string;
  summary: string;
}

export interface ArchitectureLayer {
  /** Short label for the layer, e.g. "Ingest". */
  label: string;
  nodes: { name: string; detail: string }[];
}

export interface StoryboardStep {
  title: string;
  description: string;
}

export interface Screenshot {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

export type ProjectStatus = "shipped" | "prototype" | "in-progress";

export interface Project {
  slug: string;
  title: string;
  /** One-line description used on cards and in metadata. */
  summary: string;
  category: CategoryId;
  status: ProjectStatus;
  year?: string;
  stack: string[];
  repo?: string;
  demo?: string;
  cover?: Screenshot;
  /** Show in the "Case studies" strip on the home page. */
  featured?: boolean;
  /** Placeholder cards render as clearly-labelled empty slots and get no detail page. */
  placeholder?: boolean;
  /** Omit to render a card without a detail page (e.g. work in progress). */
  caseStudy?: {
    problem: string;
    approach: string[];
    architecture: ArchitectureLayer[];
    architectureNote?: string;
    screenshots: Screenshot[];
    storyboard: StoryboardStep[];
    /** Honest scope notes: what this is not, what is unfinished. */
    limitations: string[];
  };
}

export type SkillLevel = "demonstrated" | "practiced" | "learning";

export interface SkillGroup {
  title: string;
  skills: { name: string; level: SkillLevel; evidence?: string }[];
}
