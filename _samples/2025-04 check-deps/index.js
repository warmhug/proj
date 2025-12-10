#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const https = require('https');
const { URL } = require('url');
const semver = require('semver');

// ────────────────────────────────────────────────────────────────────────────
// Argument parsing (very light‑weight)
// ----------------------------------------------------------------------------
const args = process.argv.slice(2);
let registry = 'https://registry.npmjs.org';
for (let i = 0; i < args.length; i++) {
  if ((args[i] === '--registry' || args[i] === '-r') && args[i + 1]) {
    registry = args[i + 1].replace(/\/$/, ''); // trim trailing slash
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Utility to fetch package metadata JSON from the registry
// ----------------------------------------------------------------------------
function fetchPackageMeta(name) {
  return new Promise((resolve, reject) => {
    const url = new URL(`${registry}/${encodeURIComponent(name)}`);
    // console.log('log url: ', url);
    https.get(url, res => {
      // console.log('log res: ', res.statusCode);
      if (res.statusCode === 404) {
        // Not published at this registry
        res.resume();
        return resolve(null);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to fetch ${url}: HTTP ${res.statusCode}`));
      }
      let data = '';
      res.on('data', chunk => (data += chunk));
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

// ────────────────────────────────────────────────────────────────────────────
// Main logic
// ----------------------------------------------------------------------------
(async function main() {
  const pkgJsonPath = path.resolve(process.cwd(), 'package.json');
  let pkg;
  try {
    pkg = JSON.parse(await fs.readFile(pkgJsonPath, 'utf8'));
  } catch (err) {
    console.error('❌ Failed to read package.json:', err.message);
    process.exit(1);
  }

  const sections = [
    'dependencies',
    'devDependencies',
    'peerDependencies',
    'optionalDependencies',
  ];

  const deps = sections.flatMap(section => {
    const entries = pkg[section] || {};
    return Object.keys(entries).map(name => ({
      name,
      range: entries[name],
      section,
    }));
  });
  // console.log('log deps: ', deps);

  const missing = [];
  const unsatisfied = [];

  for (const { name, range, section } of deps) {
    // Skip non‑registry specs (file:, git:, workspace: etc.)
    if (/^(file:|git\+|workspace:|link:)/.test(range)) continue;

    let meta;
    try {
      meta = await fetchPackageMeta(name);
    } catch (err) {
      console.error(`⚠️  Could not fetch ${name} from registry:`, err.message);
      continue;
    }

    if (!meta) {
      missing.push({ name, range, section });
      continue;
    }

    const versions = Object.keys(meta.versions || {});
    const matched = versions.find(v => semver.satisfies(v, range, { includePrerelease: true }));
    if (!matched) {
      unsatisfied.push({ name, range, section });
    }
  }

  if (missing.length === 0 && unsatisfied.length === 0) {
    console.log(`✅ All dependency ranges are satisfied on ${registry}`);
    return;
  }

  console.log(`Results for registry: ${registry}\n`);

  if (missing.length) {
    console.log('🚫 Missing packages:');
    missing.forEach(({ name, range, section }) => {
      console.log(`  - ${name}@${range}  (${section})`);
    });
  }

  if (unsatisfied.length) {
    console.log('\n⚠️  No published version satisfies the declared range:');
    unsatisfied.forEach(({ name, range, section }) => {
      console.log(`  - ${name}@${range}  (${section})`);
    });
  }

  process.exitCode = 1; // signal failure for CI
})();
