import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { caseStudyProjects } from "../src/content/projects";
import { navigation, site } from "../src/content/site";

const isMobile = (page: Page) => (page.viewportSize()?.width ?? 0) < 768;

/** Navigates via whichever navigation the viewport shows. */
async function navigateTo(page: Page, label: string) {
  if (isMobile(page)) {
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.getByRole("navigation", { name: "Mobile" }).getByRole("link", { name: label, exact: true }).click();
  } else {
    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: label, exact: true }).click();
  }
}

test.describe("home", () => {
  test("renders identity, tagline and every section", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(new RegExp(site.name));
    const h1 = page.getByRole("heading", { level: 1 });
    for (const line of site.tagline) await expect(h1).toContainText(line);
    for (const item of navigation) await expect(page.locator(`section#${item.id}`)).toBeAttached();
  });

  test("navigation scrolls to each section", async ({ page }) => {
    await page.goto("/");
    for (const item of navigation) {
      await navigateTo(page, item.label);
      await expect(page).toHaveURL(new RegExp(`#${item.id}$`));
      await expect(page.locator(`#${item.id}-title`)).toBeInViewport();
    }
  });

  test("hero call-to-action jumps to the work section", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "View the work" }).click();
    await expect(page.locator("#work-title")).toBeInViewport();
  });

  test("hero 3D scene initialises, or falls back without breaking the page", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("[data-hero-scene]")).toHaveAttribute("data-hero-scene", /ready|failed/, { timeout: 15_000 });
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("contact links are functional", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("email-link")).toHaveAttribute("href", `mailto:${site.links.email}`);
    for (const [id, href] of [["github-link", site.links.github], ["linkedin-link", site.links.linkedin]] as const) {
      const link = page.getByTestId(id);
      await expect(link).toHaveAttribute("href", href);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", /noopener/);
    }
  });

  test("skills expose an evidence-based level, never a percentage", async ({ page }) => {
    await page.goto("/");
    const skills = page.getByTestId("skill");
    expect(await skills.count()).toBeGreaterThan(5);
    for (const level of await skills.evaluateAll((els) => els.map((el) => el.getAttribute("data-level")))) {
      expect(["demonstrated", "practiced", "learning"]).toContain(level);
    }
    await expect(page.locator("#skills")).not.toContainText("%");
  });
});

test.describe("mobile navigation", () => {
  test("opens, closes with Escape, and closes after choosing a link", async ({ page }) => {
    test.skip(!isMobile(page), "mobile only");
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Open menu" });
    const menu = page.locator("#mobile-menu");

    await expect(menu).toBeHidden();
    await toggle.click();
    await expect(menu).toBeVisible();
    await expect(page.getByRole("button", { name: "Close menu" })).toHaveAttribute("aria-expanded", "true");

    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();

    await toggle.click();
    await menu.getByRole("link", { name: "Contact" }).click();
    await expect(menu).toBeHidden();
    await expect(page.locator("#contact-title")).toBeInViewport();
  });

  test("desktop hides the menu button", async ({ page }) => {
    test.skip(isMobile(page), "desktop only");
    await page.goto("/");
    await expect(page.getByRole("button", { name: "Open menu" })).toBeHidden();
  });
});

test.describe("projects", () => {
  test("a project card opens its case study, and the back link returns to the work section", async ({ page }) => {
    await page.goto("/");
    const first = caseStudyProjects[0];
    await page.getByTestId("project-card").getByRole("link", { name: new RegExp(first.title) }).click();
    await expect(page).toHaveURL(new RegExp(`/projects/${first.slug}$`));
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(first.title);

    await page.getByTestId("back-link").click();
    await expect(page).toHaveURL(/\/#work$/);
    await expect(page.locator("#work-title")).toBeInViewport();
  });

  test("placeholder cards are labelled and not clickable", async ({ page }) => {
    test.skip(!site.showPlaceholders, "placeholders hidden");
    await page.goto("/");
    const placeholder = page.locator('[data-testid="project-card"][data-placeholder="true"]').first();
    await expect(placeholder).toContainText("Placeholder");
    await expect(placeholder.getByRole("link")).toHaveCount(0);
  });

  for (const project of caseStudyProjects) {
    test(`case study: ${project.slug}`, async ({ page }) => {
      await page.goto(`/projects/${project.slug}`);
      await expect(page).toHaveTitle(new RegExp(project.title));
      await expect(page.getByTestId("architecture").locator("> li")).toHaveCount(project.caseStudy!.architecture.length);
      await expect(page.getByTestId("screenshot")).toHaveCount(project.caseStudy!.screenshots.length);
      await expect(page.getByTestId("storyboard").locator("> li")).toHaveCount(project.caseStudy!.storyboard.length);
      await expect(page.getByTestId("limitations").locator("> li")).toHaveCount(project.caseStudy!.limitations.length);
      await expect(page.getByTestId("repo-link")).toHaveAttribute("href", project.repo!);

      // Every screenshot actually loads.
      for (const img of await page.getByTestId("screenshot").locator("img").all()) {
        await img.scrollIntoViewIfNeeded();
        await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
      }
    });
  }

  test("case studies chain to the next project", async ({ page }) => {
    test.skip(caseStudyProjects.length < 2, "needs two case studies");
    await page.goto(`/projects/${caseStudyProjects[0].slug}`);
    await page.getByTestId("next-project").click();
    await expect(page).toHaveURL(new RegExp(`/projects/${caseStudyProjects[1].slug}$`));
  });

  test("unknown project returns 404", async ({ page }) => {
    const response = await page.goto("/projects/does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Nothing here.");
  });
});

test.describe("reduced motion", () => {
  test("toggle switches the mode and the choice survives a reload", async ({ page }) => {
    await page.goto("/");
    const html = page.locator("html");
    await expect(html).toHaveAttribute("data-motion", "full");

    const toggle = page.getByRole("contentinfo").getByRole("button", { name: "Reduce motion" });
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
    await expect(html).toHaveAttribute("data-motion", "reduced");

    await page.reload();
    await expect(html).toHaveAttribute("data-motion", "reduced");
    await expect(page.getByRole("contentinfo").getByRole("button", { name: "Reduce motion" })).toHaveAttribute("aria-pressed", "true");
  });

  test("respects the operating-system preference by default", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-motion", "reduced");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await context.close();
  });
});

test.describe("accessibility and SEO", () => {
  test("skip link moves focus target to main content", async ({ page }) => {
    test.skip(isMobile(page), "keyboard flow");
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toBeFocused();
    await skip.press("Enter");
    await expect(page).toHaveURL(/#main$/);
  });

  for (const path of ["/", `/projects/${caseStudyProjects[0].slug}`]) {
    test(`no WCAG A/AA violations on ${path}`, async ({ browser }) => {
      // Reduced motion renders content in its final state, so contrast is measured on what users read.
      const context = await browser.newContext({ reducedMotion: "reduce" });
      const page = await context.newPage();
      await page.goto(path);
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 600) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 60));
        }
      });
      await expect
        .poll(() => page.evaluate(() => [...document.querySelectorAll<HTMLElement>("main div")].every((d) => d.style.opacity !== "0")))
        .toBe(true);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
      expect(results.violations.map((v) => `${v.id}: ${v.nodes.length} node(s) — ${v.nodes[0]?.html}`)).toEqual([]);
      await context.close();
    });
  }

  test("exposes metadata, structured data, sitemap and robots", async ({ page, request }) => {
    await page.goto("/");
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", site.description);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", new RegExp(site.name));
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /opengraph-image/);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    const jsonLd = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}");
    expect(jsonLd["@type"]).toBe("Person");
    expect(jsonLd.name).toBe(site.name);

    const sitemap = await (await request.get("/sitemap.xml")).text();
    for (const p of caseStudyProjects) expect(sitemap).toContain(`/projects/${p.slug}`);
    expect((await request.get("/robots.txt")).ok()).toBe(true);
    expect((await request.get("/opengraph-image")).headers()["content-type"]).toContain("image/png");
  });

  test("page has no horizontal overflow", async ({ page }) => {
    await page.goto("/");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
