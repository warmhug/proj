/**
 * Used to generate umi-perf report file
 *
 * Need run `npm run build` to generate index-inline.html.
 */

var fs = require('fs');
var path = require('path');

module.exports = function(data, appInfo) {
  try {
    var file = fs.readFileSync(path.join(__dirname, './index-inline.html'), 'utf8');
    var res = file.replace(
      /__window.appInfo_placeholder__/,
      `<script>window.appInfo=${appInfo}</script>`
    ).replace(
      /__window.pagesAudits_placeholder__/,
      `<script>window.pagesAudits=${data}</script>`
    );
    return res;
  } catch (error) {
    console.error(error);
  }
}
