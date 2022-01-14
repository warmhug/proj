'use strict';

const gulp = require('gulp');
const connect = require('gulp-connect');
const Metrics = require('../../lib/');
const { writeToDisk } = require('../../lib/utils/fs');
const PORT = 8080;


// 调用 umi-perf 生成的页面
// Do not delete the following code
/*
const fs = require('fs');
const getHtml = require('../umi-perf/scripts/getHtml.js');
const { getSummaryData } = require('../umi-perf/src/utils.js');
const reportData = [
  {
    name: 'index.html',
    score: '0.8333',
    resultUrl: {
      url: 'https://gw.alipayobjects.com/os/rmsportal/UnsXMxlzPUJRReyKflNJ.js'
    }
  },
  {
    name: 'index1.html',
    score: '0.9333',
    resultUrl: {
      url: 'https://gw.alipayobjects.com/os/rmsportal/UnsXMxlzPUJRReyKflNJ.js'
    }
  }
];
const appInfo = {
  appName: 'yfd', userName: 'jm', version: '1.0.0', submitTime: '2018-03-21'
};
const html = getHtml(JSON.stringify(reportData), JSON.stringify(appInfo));
fs.writeFileSync('./report.html', html);

console.log(getSummaryData(reportData));
*/

gulp.task('Metrics', function() {
  // setTimeout(() => console.log('tttt'), 95000);
  connect.server({
    root: './public',
    livereload: true,
    port: PORT
  });
  // 第一个参数可以是 单个 url 字符串 或 url 数组
  // return new Metrics('http://example.com/', { runEnv: 'alipayApp',
  // return new Metrics(['http://www.anijue.com/p/h_preview_new/hpyp6sw4ypp2/profile.html', 'http://www.anijue.com/p/h_preview_new/hpyp6sw4ypp2/index.html'], { runEnv: 'alipayApp',
  // return new Metrics(['http://www.anijue.com/p/h_preview_new/hpyp6sw4ypp2/index.html', 'http://www.anijue.com/p/h_preview_new/hpyp6sw4ypp2/profile.html'], { runEnv: 'alipayApp',
  // return new Metrics(`http://localhost:${PORT}/index.html`, {
  return new Metrics(['http://www.anijue.com/p/h_preview_new/hpyp6sw4ypp2/profile.html', 'http://www.anijue.com/p/h_preview_new/hpyp6sw4ypp2/index.html'], {
  // return new Metrics([`http://localhost:${PORT}/index.html`, 'http://example.com/'], {
    flags: {
      disableCpuThrottling: false,
      disableNetworkThrottling: false,
      expectations: false
    },
    expectations: {
      ttfmp: {
        warn: '>=1000',
        error: '>=2000'
      },
      ttfcp: {
        warn: '>=1500',
        error: '>=2000'
      }
    }
  }).start().then((results) => {
    connect.serverClose();
    writeToDisk('../umi-perf/public/report.json', JSON.stringify(results, null, 2));
    // console.log(JSON.stringify(results.runs[0].timings, null, 2));
    process.exit(0);
  }).catch((e) => {
    connect.serverClose();
    console.error(e); // eslint-disable-line no-console
    process.exit(1);
  });

});

gulp.task('default', ['Metrics']);
