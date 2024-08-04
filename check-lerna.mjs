import parser from 'yargs-parser';
import chalk from 'chalk';
import { join } from 'path';

const args = parser(process.argv);
const cwd = process.cwd();
// console.log('args: ', args);
console.log('args: ', chalk.red(args));

const pkgFile = join(__dirname, './packages');
console.log('pkgFile: ', pkgFile);

const pkgPath = join(cwd, 'packages', pkg.replace('', ''));
console.log('pkgPath: ', pkgPath);
