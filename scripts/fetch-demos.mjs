/**
 * Fetches the latest demos list from the ui-demos GitHub Pages deployment
 * and writes it to lib/demos-data.json for the portfolio build to consume.
 *
 * Falls back to the committed lib/demos-data.json if the fetch fails
 * (useful for local dev without network access).
 */

import { writeFileSync, readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dir, "..");
const OUT = join(ROOT, "lib", "demos-data.json");
const DEMOS_URL = "https://alainprocs.github.io/ui-demos/demos.json";

async function main() {
  console.log(`[fetch-demos] Fetching ${DEMOS_URL} …`);

  try {
    const res = await fetch(DEMOS_URL, { signal: AbortSignal.timeout(10_000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    writeFileSync(OUT, JSON.stringify(data, null, 2) + "\n", "utf8");
    console.log(`[fetch-demos] ✓ Written ${data.length} demos to lib/demos-data.json`);
  } catch (err) {
    if (existsSync(OUT)) {
      console.warn(`[fetch-demos] ⚠ Fetch failed (${err.message}) — using existing lib/demos-data.json`);
    } else {
      console.error(`[fetch-demos] ✗ Fetch failed and no fallback exists: ${err.message}`);
      process.exit(1);
    }
  }
}

main();
