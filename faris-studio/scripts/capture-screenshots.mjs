// Captures the screenshots in docs/screenshots from a running site.
// Usage: npm run build && npm start   (in one terminal)
//        npm run screenshots          (in another)   — override the target with BASE_URL.
import { chromium, devices } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const base = process.env.BASE_URL ?? "http://localhost:3000";
const out = new URL("../docs/screenshots/", import.meta.url).pathname;
await mkdir(out, { recursive: true });

const browser = await chromium.launch();

/** Scroll the whole page once so every scroll-triggered reveal has played. */
async function settle(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 200));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await page.waitForTimeout(1200);
}

async function shoot(context, path, name, { fullPage = false, before } = {}) {
  const page = await context.newPage();
  await page.goto(base + path, { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);
  if (fullPage) await settle(page);
  if (before) await before(page);
  await page.screenshot({ path: `${out}${name}.png`, fullPage });
  await page.close();
  console.log("captured", name);
}

const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await shoot(desktop, "/", "01-hero-desktop");
await desktop.close();

// Full-page overviews are captured at 1x to keep file sizes reasonable.
const desktopFull = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await shoot(desktopFull, "/", "02-home-desktop-full", { fullPage: true });
await shoot(desktopFull, "/projects/soc-sentinel", "03-case-study-desktop-full", { fullPage: true });
await desktopFull.close();

const mobile = await browser.newContext({ ...devices["iPhone 14"] });
await shoot(mobile, "/", "04-hero-mobile");
await shoot(mobile, "/", "05-menu-mobile", {
  before: async (page) => {
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.waitForTimeout(400);
  },
});
await mobile.close();

const mobileFull = await browser.newContext({ ...devices["iPhone 14"], deviceScaleFactor: 1 });
await shoot(mobileFull, "/", "06-home-mobile-full", { fullPage: true });
await shoot(mobileFull, "/projects/shadow-zero", "07-case-study-mobile-full", { fullPage: true });
await mobileFull.close();

await browser.close();
