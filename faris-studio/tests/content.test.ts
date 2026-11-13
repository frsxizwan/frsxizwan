import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { skillGroups, skillLevels } from "@/content/profile";
import { caseStudyProjects, categories, getProject, projects, visibleProjects } from "@/content/projects";
import { navigation, site } from "@/content/site";

/**
 * Guards the content configuration: a malformed project entry should fail here,
 * not at runtime in front of a visitor.
 */
describe("project configuration", () => {
  it("has unique, URL-safe slugs", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it("assigns every project to a defined category", () => {
    const ids = categories.map((c) => c.id);
    for (const p of projects) expect(ids).toContain(p.category);
  });

  it("populates every category", () => {
    for (const c of categories) expect(projects.some((p) => p.category === c.id)).toBe(true);
  });

  it("gives every case study an architecture, screenshots, a storyboard and limitations", () => {
    expect(caseStudyProjects.length).toBeGreaterThan(0);
    for (const p of caseStudyProjects) {
      const study = p.caseStudy!;
      expect(study.architecture.length, p.slug).toBeGreaterThan(1);
      expect(study.screenshots.length, p.slug).toBeGreaterThan(0);
      expect(study.storyboard.length, p.slug).toBeGreaterThan(2);
      expect(study.limitations.length, p.slug).toBeGreaterThan(0);
      expect(p.repo, p.slug).toMatch(/^https:\/\/github\.com\//);
    }
  });

  it("references image files that exist, with alt text", () => {
    const shots = projects.flatMap((p) => [...(p.cover ? [p.cover] : []), ...(p.caseStudy?.screenshots ?? [])]);
    for (const shot of shots) {
      expect(existsSync(join(process.cwd(), "public", shot.src)), shot.src).toBe(true);
      expect(shot.alt.length, shot.src).toBeGreaterThan(10);
    }
  });

  it("never gives a placeholder a detail page", () => {
    for (const p of projects.filter((x) => x.placeholder)) {
      expect(p.caseStudy).toBeUndefined();
      expect(getProject(p.slug)).toBeUndefined();
    }
    expect(visibleProjects(false).some((p) => p.placeholder)).toBe(false);
  });
});

describe("skills", () => {
  it("uses only defined levels and requires evidence for 'demonstrated'", () => {
    for (const group of skillGroups) {
      for (const skill of group.skills) {
        expect(Object.keys(skillLevels)).toContain(skill.level);
        if (skill.level === "demonstrated") expect(skill.evidence, skill.name).toBeTruthy();
      }
    }
  });
});

describe("site configuration", () => {
  it("has valid contact links", () => {
    expect(site.links.email).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
    expect(site.links.github).toMatch(/^https:\/\/github\.com\/.+/);
    expect(site.links.linkedin).toMatch(/^https:\/\/(www\.)?linkedin\.com\/in\/.+/);
  });

  it("has unique navigation targets", () => {
    const ids = navigation.map((n) => n.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
