/**
 * node模块文件
 *  信息描述
 *      插入到压缩后的文件中
 */

var shimDes = '/* laputa shim file \n ' +
    'config options: \n' +
    'console.log(window.laputa.shim) → { ... }  */\n';

var combineDes = '/* include: \n' +
    'angular.js -- 1.2.16 \n' +
    'angular-animate.js -- 1.2.16 \n' +
    'angular-sanitize.js -- 1.2.16 \n' +
    'and do not need like this: "angular.module(\'app\', [\'ngAnimate\', \'ngSanitize\']);" \n*/\n';

module.exports = {
    shimDes : shimDes,
    combineDes : combineDes
};