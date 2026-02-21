import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const url = process.argv[2] || "http://localhost:3000";
const label = process.argv[3] || "";

const screenshotDir = path.join(__dirname, "temporary screenshots");

// Create directory if it doesn't exist
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

// Find the next screenshot number by scanning existing files
function getNextNumber() {
  const files = fs.readdirSync(screenshotDir);
  let maxN = 0;
  for (const file of files) {
    const match = file.match(/^screenshot-(\d+)/);
    if (match) {
      const n = parseInt(match[1], 10);
      if (n > maxN) maxN = n;
    }
  }
  return maxN + 1;
}

const n = getNextNumber();
const filename = label
  ? `screenshot-${n}-${label}.png`
  : `screenshot-${n}.png`;
const filepath = path.join(screenshotDir, filename);

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });

  // Scroll through the entire page to trigger IntersectionObserver reveals
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 300;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= document.body.scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 100);
    });
  });

  // Force all reveal elements to be visible for screenshot
  await page.evaluate(() => {
    document.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('visible');
    });
  });

  // Wait for reveal animations to complete
  await new Promise(r => setTimeout(r, 1500));

  await page.screenshot({ path: filepath, fullPage: true });
  await browser.close();

  console.log(`Screenshot saved: ${filepath}`);
})();
