const { readdirSync } = require('fs');
const { join } = require('path');
const glob = require('glob');

// console.log('log process.argv: ', process.argv);
console.log('log process.env: ', process.env);
console.log('log process.env.npm_lifecycle_event: ', process.env.npm_lifecycle_event);

function updateAlias() {
  // 根据项目结构匹配所有 package.json 文件
  glob('./packages/package.json', (err, files) => {
    if (err) throw err;
    console.log('log files: ', files);
  });
}
updateAlias();
