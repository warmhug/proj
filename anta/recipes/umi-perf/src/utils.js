exports.CATE_NAME = 'Performance';

exports.insertScript = function (scriptUrl, callback) {
  if (!scriptUrl) {
    return;
  }
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.onload = function() {
    callback();
  }
  script.src = scriptUrl;
  head.appendChild(script);
}

// format date object  e.g. 2017-01-01
exports.genDateStr = function (date) {
  let mday = date.getDate();
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  mday = mday < 10 ? `0${mday}` : mday;
  return `${date.getFullYear()}-${month}-${mday} ${date.getHours()}:${date.getMinutes()}`;
}
// console.log(genDateStr(new Date()));

// https://github.com/GoogleChrome/lighthouse/blob/master/docs/scoring.md#how-do-performance-metrics-get-scored
const THRESHOLD_FAIL = 44;
const THRESHOLD_PASS = 74;
exports.THRESHOLD_FAIL = THRESHOLD_FAIL;
exports.THRESHOLD_PASS = THRESHOLD_PASS;
exports.getColor = function (score) {
  if (typeof score === 'number') {
    let color = '';
    if (score <= THRESHOLD_FAIL) {
      color = 'fail';
    } else if (score <= THRESHOLD_PASS) {
      color = 'pass';
    } else {
      color = 'great';
    }
    return color;
  }
}
// getSummaryData 函数用于在 云凤蝶网站 展示 `未通过 / 合格 / 优秀` 的页面数量、应用是否通过 性能检测 的判断标准
exports.getSummaryData = function (pagesAudits) {
  const summaryData = {
    fail: [],
    pass: [],
    great: [],
  }
  pagesAudits.forEach(item => {
    if (!item.score || item.score <= THRESHOLD_FAIL) {
      summaryData.fail.push(item);
    } else if (item.score <= THRESHOLD_PASS) {
      summaryData.pass.push(item);
    } else {
      summaryData.great.push(item);
    }
  });
  return summaryData;
}
