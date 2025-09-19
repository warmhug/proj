// import fs from 'node:fs';
// import fs from 'node:fs/promises'
// import fs from 'fs/promises';
import fs from 'fs';
import os from 'os';
import net from 'net';
import { writeFile } from 'node:fs/promises'
import pkgInfo from './package.json' assert { type: 'json' };

console.log('log pkgInfo: ', typeof pkgInfo);

// __dirname is not defined in ES module scope
// in lib dir. SyntaxError: Cannot use 'import.meta' outside a module
// import { createRequire } from 'node:module';
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
import path from 'path';
import { fileURLToPath } from 'url';
export function getDirname(importMetaUrl) {
  return path.dirname(fileURLToPath(importMetaUrl));
}
const __dirname = getDirname(import.meta.url);
console.log('log __dirname: ', __dirname);

console.log('resolve: ', path.resolve(__dirname, './package.json'));

async function loadModule() {
  try {
    const module = await import('./xx.mjs');
    console.log('module: ', module);
  } catch (error) {
    console.log('log error: ', error);
  }
}
loadModule();

const pkgPath = path.join(process.cwd(), 'packages', 'pkg');
console.log('pkgPath: ', pkgPath);

console.log(os.homedir());
console.log(os.tmpdir());

process.nextTick(function () {
  console.log('nextTick callback');
});
process.on('exit', function () {
  process.emit('cleanup');
});
// catch ctrl+c event and exit normally
process.on('SIGINT', function () {
  process.exit(2);
});

function printErrorAndExit(message) {
  console.log(`\x1b[31m ${message} \x1b[0m`);
  console.log('\x1b[31m this is log \x1b[0m');
  // process.exit(1);
}
printErrorAndExit('直接 node bash-node.mjs 执行此文件、会显示颜色');
printErrorAndExit('被 bash 直接调用、会显示颜色');
printErrorAndExit('被 bash 这样 $(node bash-node.mjs) 调用、不会显示颜色');

function getAvailablePort() {
  return new Promise((resolve, reject) => {
    let port = 0;
    try {
      const server = net.createServer();
      server.listen(0, () => {
        const address = server.address();
        port = address.port;
      });
      server.on('listening', () => {
        server.close();
        server.unref();
      });
      server.on('error', (e) => reject(e));
      server.on('close', () => resolve(port));
    }
    catch (e) {
      reject(e);
    }
  });
}
getAvailablePort().then(res => {
  console.log('log res: ', res);
});

async function fetchToJson(
  url = 'https://raw.githubusercontent.com/oven-sh/bun/refs/heads/main/src/install/default-trusted-dependencies.txt',
) {
  if (fs.existsSync('pnpm-lock.yaml')) fs.unlinkSync('pnpm-lock.yaml');
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}:
  ${response.status} ${response.statusText}`);
  }
  const text = await response.text();
  await writeFile('base.txt', JSON.stringify(text, null, 2), "utf8");
  console.log('write base.txt');
}
fetchToJson().catch((err) => {
  console.error(`❌  ${err.message}`)
  // process.exitCode = 1
});

function isGitRepository(directory) {
  try {
    let currentDir = path.resolve(directory);
    while (true) {
      const gitDir = path.join(currentDir, '.git');
      // Check if .git exists (either as directory or file for worktrees)
      if (fs.existsSync(gitDir)) {
        return true;
      }
      const parentDir = path.dirname(currentDir);
      // If we've reached the root directory, stop searching
      if (parentDir === currentDir) {
        break;
      }
      currentDir = parentDir;
    }
    return false;
  } catch (_error) {
    // If any filesystem error occurs, assume not a git repo
    return false;
  }
}
const isGitRepo = isGitRepository(process.cwd());
console.log('log isGitRepo: ', isGitRepo);
