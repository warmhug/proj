import chalk from 'chalk';

// const fs = require('fs');
import path from 'path';

// __dirname is not defined in ES module scope
// const pkgFile = path.join(__dirname, './packages');
// console.log('pkgFile: ', pkgFile);
const cwd = process.cwd();
const pkgPath = path.join(cwd, 'packages', 'pkg');
console.log('pkgPath: ', pkgPath);
console.log('resolve: ', path.resolve(__dirname, './package.json'));


function printErrorAndExit(message) {
  console.error(chalk.blue(message));
  console.log("\x1b[31m This text will be red \x1b[0m");
  console.log('this is log');
  process.exit(1);
}
printErrorAndExit('直接 node bash-node.mjs 执行此文件、会显示颜色');
printErrorAndExit('被 bash 直接调用、会显示颜色');
printErrorAndExit('被 bash 这样 $(node bash-node.mjs) 调用、不会显示颜色');

console.log(os.homedir());
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
