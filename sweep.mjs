import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const BASE_URL = process.env.SWEEP_BASE_URL || "http://localhost:3000";
const OUT_DIR = process.env.SWEEP_OUT_DIR || "./out";
const routes = ["/", "/about-us", "/services", "/portfolio", "/contact-us", "/faqs"];
const widths = [360, 390, 430, 768, 1024, 1280, 1440, 1920];
const HEIGHT = 900;

fs.mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch();
const overflows = [];

for (const route of routes) {
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: HEIGHT } });
    const url = BASE_URL + route;
    try {
      // "load" not "networkidle" — the looping hero video keeps making
      // range requests forever, so networkidle would never resolve.
      await page.goto(url, { waitUntil: "load", timeout: 30000 });
      // let reveal/stagger/tilt animations settle
      await page.waitForTimeout(1200);

      const overflowed = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth + 1
      );
      if (overflowed) overflows.push({ route, width });

      const safeRoute = route === "/" ? "home" : route.replace(/\//g, "");
      const fileName = `${safeRoute}_${width}.png`;
      await page.screenshot({
        path: path.join(OUT_DIR, fileName),
        fullPage: true,
      });
      console.log(`${overflowed ? "OVERFLOW" : "ok      "}  ${route.padEnd(14)} ${width}px`);
    } catch (err) {
      console.error(`ERROR     ${route.padEnd(14)} ${width}px — ${err.message}`);
    } finally {
      await page.close();
    }
  }
}

await browser.close();

console.log("\n=== Summary ===");
if (overflows.length === 0) {
  console.log("No horizontal overflow detected across any route/width combination.");
} else {
  console.log(`${overflows.length} overflow violation(s):`);
  for (const o of overflows) console.log(`  - ${o.route} @ ${o.width}px`);
}
