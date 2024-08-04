import parser from 'yargs-parser';
import chalk from 'chalk';
import { join } from 'path';

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
