const fs = require('fs');
const path = require('path');

const dirN = path.dirname("/Users/hua/inner/tests/_placeholder.test.ts");
console.log('log dirN: ', dirN);


console.log('log npm_lifecycle_event: ', process.env.npm_lifecycle_event);
console.log('log npm_execpath: ', process.env.npm_execpath);
console.log(process.env.HOME, process.env.HOMEPATH);
console.log(process.argv, process.execPath, process.uptime());
