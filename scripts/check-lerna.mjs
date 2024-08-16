import parser from 'yargs-parser';
import chalk from 'chalk';
import { join } from 'path';
import { spawn } from 'child_process';
import semver from 'semver';

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

console.log('semver.valid', semver.valid('1.2.3-beta.20+aseds'));
// console.log('semver.inc', semver.inc('1.2.3', 'prerelease', 'beta'),
// semver.inc('1.2.3-beta.0', 'prerelease', 'beta'),
// semver.parse('1.2.3'),
// semver.parse('1.2.3-beta.0'),
// );

await exec('npm', ['run', 'build']);

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
