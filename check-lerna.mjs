/*
package.json 加入
"scripts": {
  "prepublish": "node ./check-lerna.mjs --prepublish",
  "preversion": "node ./check-lerna.mjs --preversion",
  "version": "node ./check-lerna.mjs --version",
  "postversion": "node ./check-lerna.mjs --postversion",
}
*/
import parser from 'yargs-parser';
import chalk from 'chalk';
import { join } from 'path';
import { spawn } from 'child_process';
import semver from 'semver';

import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const lernaCli = require.resolve('lerna/cli');
// console.log('lernaCli: ', lernaCli);

async function exec(command, args, opts) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      shell: true,
      stdio: 'inherit',
      env: process.env,
      ...opts,
    });
    child.once('error', (err) => {
      console.log(err);
      reject(err);
    });
    child.once('close', (code) => {
      if (code === 1) {
        process.exit(1);
      } else {
        resolve();
      }
    });
  });
}
// await exec('npm', ['run', 'build']);

testLerna();
async function testLerna() {
// https://warmhug.github.io/2024/08/06/lerna-usage.html
// dev:  npx lerna version --conventional-commits --conventional-prerelease --preid beta --yes
// prod: npx lerna version --conventional-commits --conventional-graduate --yes
  await exec('node', [
    [lernaCli],
    'version',
    'patch',
    '--message',
    'chore(release): Publish',
    '--conventional-commits',
  // ], {});
  ], { shell: false });

  console.log('semver.valid', semver.valid('1.2.3-beta.20+aseds'));
  // console.log('semver.inc', semver.inc('1.2.3', 'prerelease', 'beta'),
  // semver.inc('1.2.3-beta.0', 'prerelease', 'beta'),
  // semver.parse('1.2.3'),
  // semver.parse('1.2.3-beta.0'),
  // );
}

test();
function test() {
  const args = parser(process.argv);
  const cwd = process.cwd();
  // console.log('args: ', args);
  console.log('args: ', chalk.red(JSON.stringify(args)));

  // __dirname is not defined in ES module scope
  // const pkgFile = join(__dirname, './packages');
  // console.log('pkgFile: ', pkgFile);

  const pkgPath = join(cwd, 'packages', 'pkg'.replace('', ''));
  // console.log('pkgPath: ', pkgPath);

  // console.error('测试抛错');
  // process.exit(1);
  // console.log('process.exit(1): 后还会执行吗');
}
