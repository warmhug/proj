
<h1 align="center">ant audits</h1>

<p align="center">
  <img title="Progressive web metrics" src='https://gw.alipayobjects.com/zos/rmsportal/nkVhlBNkvPWetqDJrBuv.png' />
</p>

> 2017-11~2018-03

CLI tool and lib to gather app audits via [Lighthouse](https://github.com/GoogleChrome/lighthouse/). IN BETA.

**Based on the code in [pwmetrics](https://github.com/paulirish/pwmetrics/), this repository removes features such as Upload / Command Line Chart.
Thanks in addition to pwmetrics for additional work on the lighthouse basis: stripping out the perf test section separately; supporting flexible customization of audit metrics; and a single command to run multiple times.**

**此仓库在 [pwmetrics](https://github.com/paulirish/pwmetrics/) 的代码基础上，去掉了“上传”/"命令行图表"等功能。
另外感谢 pwmetrics 在 lighthouse 的基础上额外做出的这些工作：单独剥离出了 perf 测试部分；支持灵活的定制 audit 指标；一个命令可以运行多次。**

```sh
$ npm i
```

## API

```js
const Metrics = require('anta');

const options = {
  flags: {
    // runs: '1', // number or runs
    // expectations: false // turn on assertation metrics results against provides values
    chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox'] // CentOS need it.
  }
};

> Note: on real device of Alipay APP, the options may not work!

const pwMetrics = new Metrics('http://example.com/'/*, options */);
pwMetrics.start().then((results) => {
    console.log(JSON.stringify(results.runs[0], null, 2));
  }).catch((e) => {
    console.error(e);
  });
```

#### Added `umi-perf` view

Use like this:

```js
const getHtml = require('anta/recipes/umi-perf/scripts/getHtml.js');
const { getSummaryData } = require('anta/recipes/umi-perf/src/utils.js');

// reportData's format should be below
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
// appInfo's format should be below
const appInfo = {
  appName: 'yfd', userName: 'jm', version: '1.0.0', submitTime: '2018-03-21'
};

const html = getHtml(JSON.stringify(reportData), JSON.stringify(appInfo));
const summaryData = getSummaryData(reportData);
// summaryData like this
{
  fail: [
    { name: 'index.html', score: '0.8333', resultUrl: [Object] },
    { name: 'index1.html', score: '0.9333', resultUrl: [Object] }
  ],
  pass: [],
  great: [],
}

```


## CLI Usage

```sh
$ anta <url> <flags>
$ anta --help

anta https://mobile.ant.design/kitchen-sink/

# --runs=n     Does n runs (eg. 3, 5), and reports the median run's numbers.
#              Median run selected by run with the median TTI.
anta https://mobile.ant.design/kitchen-sink/ --runs=3

# --json       Reports json details to stdout.
anta https://mobile.ant.design/kitchen-sink/ --json

# --output-path       File path to save results.
anta https://mobile.ant.design/kitchen-sink/ --json --output-path='./lh-report.json'

# --config        Provide configuration (defaults to `package.json`). See _Defining config_ below.
anta --config=anta-config.js

# --expectations  Assert metrics results against provides values.
# run anta with config in package.json
anta --expectations
```

### All available configuration options

```sh
# run anta with config in package.json
anta --config
```

`package.json`
```
...
  "anta": {
    "url": "http://example.com/",
    // other configuration options
    "expectations": {
      ...
    }
  }
...
```

`anta-config.js`

```js
module.exports = {
  url: 'http://example.com/',
  flags: { // AKA feature flags
    runs: '3', // number or runs
    // submit: true, // turn on submitting to Google Sheets
    // upload: true, // turn on uploading to Google Drive
    // view: true, // open uploaded traces to Google Drive in DevTools
    expectations: true // turn on assertation metrics results against provides values
    chromePath: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary' //optional path to specific Chrome location
    chromeFlags: [] // custom flags to pass to Chrome. For a full list of flags, see http://peter.sh/experiments/chromium-command-line-switches/.
    // Note: supports all flags from Lighthouse
  },
  expectations: {
    // these expectations values are examples, for your cases set your own
    // it's not required to use all metrics, you can use just a few of them
    // Read _Available metrics_ where all keys are defined
    ttfcp: {
      warn: '>=1500',
      error: '>=2000'
    },
    ttfmp: {
      warn: '>=2000',
      error: '>=3000'
    },
    fv: {
      ...
    },
    psi: {
      ...
    },
    vc85: {
      ...
    },
    vs100: {
      ...
    },
    ttfi: {
      ...
    },
    ttci: {
      ...
    }
  }
}
```

```sh
# run anta with config in anta-config.js
anta --expectations --config=anta-config.js
```

#### Available metrics:

 - `ttfcp` - First Contentful Paint
 - `ttfmp` - First Meaningful Paint
 - `psi` - Perceptual Speed Index
 - `fv` - First Visual Change
 - `vc` - Visually Complete 100%
 - `ttfi` - First Interactive (vBeta)
 - `ttci` - Time to Consistently Interactive (vBeta)
 - `vc85` - Visually Complete 85%

 - `dom-size` - dom size

Read article [Performance metrics. What’s this all about?](https://medium.com/@denar90/performance-metrics-whats-this-all-about-1128461ad6b) or [前端感官性能的衡量和优化实践](https://tech.meituan.com/Optimization_of_front_end_sensory_properties.html) which is decoding this metrics.


## Recipes

- [gulp](/recipes/gulp/gulpfile.js)
