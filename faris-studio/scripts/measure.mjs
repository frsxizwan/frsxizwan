// Quick local performance probe: transfer sizes, LCP and CLS for the home page.
// Usage: BASE_URL=http://localhost:3000 node scripts/measure.mjs
import { chromium } from "@playwright/test";

const base = process.env.BASE_URL ?? "http://localhost:3000";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(base, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
const result = await page.evaluate(async () => {
  const observe = (type) =>
    new Promise((resolve) => {
      new PerformanceObserver((list) => resolve(list.getEntries())).observe({ type, buffered: true });
      setTimeout(() => resolve([]), 1000);
    });
  const lcp = (await observe("largest-contentful-paint")).at(-1);
  const cls = (await observe("layout-shift")).reduce((sum, e) => sum + (e.hadRecentInput ? 0 : e.value), 0);
  const resources = performance.getEntriesByType("resource");
  const kb = (filter) => Math.round(resources.filter(filter).reduce((s, r) => s + r.transferSize, 0) / 1024);
  return {
    lcpMs: Math.round(lcp?.startTime ?? 0),
    lcpElement: lcp?.element?.tagName,
    cls: Number(cls.toFixed(4)),
    jsKb: kb((r) => r.name.endsWith(".js")),
    totalKb: kb(() => true),
    requests: resources.length,
  };
});
console.log(result);
await browser.close();
