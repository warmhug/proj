#!/usr/bin/env node
const { Command } = require('commander');
const program = new Command();

program
  .command('hello')
  .description('An async example')
  .action(async () => {
    console.log('Start async task...');
    await new Promise((resolve) => setTimeout(resolve, 10000));
    console.log('Async task done!');
  });

program.parse(process.argv);

// program.parseAsync(process.argv).then(() => {
//   console.log('Command execution complete ✅');
// }).catch((err) => {
//   console.error('Command execution failed ❌', err);
//   process.exit(1);
// });
