import fs from 'fs';
import { writeFile } from 'node:fs/promises'

if (fs.existsSync('pnpm-lock.yaml')) {
  fs.unlinkSync('pnpm-lock.yaml');
}

// https://github.com/pnpm/trusted-deps/blob/main/updateList.ts
async function fetchToJson (
  url = 'https://raw.githubusercontent.com/oven-sh/bun/refs/heads/main/src/install/default-trusted-dependencies.txt',
) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`)
  }

  const text = await response.text()

  // Split into lines, trim whitespace, drop blanks & comments
  const entries = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"))

  const outPath = `allow.json`
  await writeFile(outPath, JSON.stringify(entries, null, 2), "utf8")

  console.log(`✅  Saved ${entries.length} items to ${outPath}`)
}

fetchToJson().catch((err) => {
  console.error(`❌  ${err.message}`)
  process.exitCode = 1
})
