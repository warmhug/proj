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

// 发布到 npm
// await execa('npm', ['publish', '--tag', 'beta'], {
//   cwd: path.join(packagesPath, pkg.replace(namePrefix, '')),
// });

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

test();
async function test() {
  console.log('patch: ', semver.inc('1.2.3-beta.1', 'patch'));
  console.log('semver.inc', semver.inc('1.2.3', 'prerelease', 'beta'));
  console.log('beta: ', semver.inc('1.2.3-beta', 'prerelease', 'beta'));
  console.log('beta: ', semver.inc('1.2.3-beta.0', 'prerelease', 'beta'));
  console.log('semver.valid', semver.valid('1.2.3-beta.20+aseds'));
  console.log('semver.parse: ', semver.parse('1.2.3'));

  return;
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
