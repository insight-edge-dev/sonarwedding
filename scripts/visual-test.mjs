import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const baseURL = "http://127.0.0.1:3001";
const output = "visual-qa";
const requested = process.argv.slice(2).map(Number).filter(Boolean);
const widths = requested.length ? requested : [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920];
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" });
const report = [];
for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 1000 }, deviceScaleFactor: 1 });
  page.setDefaultTimeout(5000);
  await page.goto(baseURL, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${output}/home-${width}.png`, fullPage: true });
  const metrics = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth, nav: document.querySelector(".wedding-nav__bar")?.getBoundingClientRect().toJSON() }));
  report.push({ width, ...metrics });
  if (width === 390 || width === 1440) {
    await page.locator(".wedding-nav__explore").click();
    await page.waitForTimeout(900);
    await page.screenshot({ path: `${output}/menu-${width}.png`, fullPage: false });
    await page.locator(".wedding-nav__close").click();
    await page.waitForTimeout(250);
    await page.locator("#experiences").scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `${output}/scroll-${width}.png`, fullPage: false });
  }
  await page.close();
}
console.log(JSON.stringify(report, null, 2));
await browser.close();
