// const fs = require('fs');
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
  const module = await import('./xx.mjs');
  console.log('module: ', module);
}
loadModule();

const cwd = process.cwd();
const pkgPath = path.join(cwd, 'packages', 'pkg');
console.log('pkgPath: ', pkgPath);

console.log('log env: ', process.env);
console.log('log npm_lifecycle_event: ', process.env.npm_lifecycle_event);
console.log(process.env.HOME, process.env.HOMEPATH);
console.log(process.argv, process.execPath, process.uptime());
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
  process.exit(1);
}
printErrorAndExit('直接 node bash-node.mjs 执行此文件、会显示颜色');
printErrorAndExit('被 bash 直接调用、会显示颜色');
printErrorAndExit('被 bash 这样 $(node bash-node.mjs) 调用、不会显示颜色');

console.log(os.homedir());
