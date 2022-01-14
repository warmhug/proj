import {
  MainOptions, FeatureFlags, LighthouseResults, MetricsResults, PWMetricsResults,
  Timing, ExpectationMetrics, NormalizedExpectationMetrics,
} from '../typings/types';
import { launch, LaunchedChrome } from 'chrome-launcher';

const lighthouse = require('lighthouse');
const path = require('path');
const metrics = require('./metrics');
const expectations = require('./expectations');
const lhConfig = require('./lh-config');

const realDevice = require('./real-device');

interface GatewayOptions extends MainOptions {
  runEnv?: 'pcChrome' | 'alipayApp';
}

const MAX_LIGHTHOUSE_TRIES = 2;
const getScore = (result: MetricsResults) => {
  let score: number = 0;
  result.reportCategories.forEach((cate: any) => {
    if (cate.name === 'Performance') {
      score = cate.score;
    }
  });
  return score;
};

class AntA {
  flags: FeatureFlags = {
    runs: 3,
    view: false,
    expectations: false,
    json: false,
    chromeFlags: []
  };
  runs: number;
  expectations: ExpectationMetrics | NormalizedExpectationMetrics;
  tryLighthouseCounter: number;
  launcher: LaunchedChrome;
  runEnv: string;

  constructor(public urls: string | Array<string>, opts: GatewayOptions) {
    this.flags = Object.assign({}, this.flags, opts ? opts.flags : null);
    this.runs = this.flags.runs;
    this.expectations = opts ? opts.expectations : {};
    this.tryLighthouseCounter = 0;

    // normalize path if provided
    if (this.flags.chromePath) {
      this.flags.chromePath = path.normalize(this.flags.chromePath);
    }

    if (this.flags.expectations) {
      if (this.expectations) {
        expectations.validateMetrics(this.expectations);
        this.expectations = expectations.normalizeMetrics(this.expectations);
      } else throw new Error('NO_EXPECTATIONS_FOUND');
    }

    if (opts.runEnv === 'alipayApp') {
      this.runEnv = 'alipayApp';
    }
  }

  // public api, No arguments
  async start() {
    let finalResults: PWMetricsResults[] = [];
    if (typeof this.urls === 'string') {
      this.urls = [this.urls];
    }

    // on real device's Alipay APP
    if (this.runEnv === 'alipayApp') {
      // 重复设置 url 使之与 flags.runs 设置一样
      const urls: string[] = [];
      const resGroupArr: any = [];
      this.urls.forEach(item => {
        resGroupArr.push([]);
        for (let index = 0; index < this.runs; index++) {
          urls.push(item);
        }
      });

      const res: [any] = await realDevice(urls);

      for (let index = 0; index < res.length; index++) {
        const single = res[index];
        resGroupArr[this.urls.indexOf(single.initialUrl)].push(single);
        // console.log('res single', single.initialUrl);
      }
      // console.log('alipay...', urls, resGroupArr);

      const newRes: any = [];
      resGroupArr.forEach((arr: any) => {
        // 多次运行结果，根据分数由高到低排序，只取最高分数返回
        newRes.push(arr.sort((a: any, b: any) => getScore(b.runs[0]) - getScore(a.runs[0]))[0]);
      });

      return newRes;
    }

    // on pc chrome
    for (let url of this.urls) {
      const currentUrlMetric = await this.startInner(url);
      finalResults.push(currentUrlMetric);
    }
    return finalResults;
  }

  async startInner(url: string) {
    const runs = Array.apply(null, { length: +this.runs }).map(Number.call, Number);
    let metricsResults: MetricsResults[] = [];

    let resultHasExpectationErrors = false;

    for (let runIndex of runs) {
      try {
        const currentMetricResult: MetricsResults = await this.run(url);
        if (!resultHasExpectationErrors && this.flags.expectations) {
          resultHasExpectationErrors = this.resultHasExpectationErrors(currentMetricResult);
        }
        metricsResults[runIndex] = currentMetricResult;
        console.log('SUCCESS', 'SUCCESS_RUN', `Run ${runIndex + 1} of ${runs.length} finished successfully.`);
      } catch (error) {
        metricsResults[runIndex] = error;
        console.error('ERROR', 'FAILED_RUN', runIndex, runs.length, error.message);
      }
    }

    const res = metricsResults.filter(r => !(r instanceof Error));

    // 多次运行结果，根据分数由高到低排序
    let results: PWMetricsResults = { runs: res.sort((a, b) => getScore(b) - getScore(a)) };
    if (results.runs.length > 0) {
      // if (this.runs > 1 && !this.flags.submit) {
      //   results.median = this.findMedianRun(results.runs);
      //   console.log(messages.getMessage('MEDIAN_RUN'));
      //   this.displayOutput(results.median);
      // } else if (this.flags.submit) {
      //   const sheets = new Sheets(this.sheets, this.clientSecret);
      //   await sheets.appendResults(results.runs);
      // }
    }

    if (resultHasExpectationErrors && this.flags.expectations) {
      throw new Error('HAS_EXPECTATION_ERRORS');
    }

    return results;
  }

  resultHasExpectationErrors(metrics: MetricsResults): boolean {
    return metrics.timings.some((timing: Timing) => {
      const expectation = this.expectations[timing.id];
      if (!expectation) {
        return false;
      }
      const expectedErrorLimit = expectation.error;
      return expectedErrorLimit !== undefined && timing.timing >= expectedErrorLimit;
    });
  }

  async run(url: string): Promise<MetricsResults> {
    try {
      let lhResults: LighthouseResults;
      await this.launchChrome();

      if (process.env.CI) {
        // handling CRI_TIMEOUT issue - https://github.com/GoogleChrome/lighthouse/issues/833
        this.tryLighthouseCounter = 0;
        lhResults = await this.runLighthouseOnCI(url).then((lhResults: LighthouseResults) => {
          // fix for https://github.com/paulirish/pwmetrics/issues/63
          return new Promise<LighthouseResults>(resolve => {
            console.log('WAITING');
            setTimeout(_ => {
              return resolve(lhResults);
            }, 2000);
          });
        });
      } else {
        // lhResults = await lighthouse(url, this.flags, null); // use lh default config
        lhResults = await lighthouse(url, this.flags, lhConfig);
      }

      const metricsResults: MetricsResults = await this.recordLighthouseTrace(lhResults);
      await this.killLauncher();

      return metricsResults;
    } catch (error) {
      await this.killLauncher();
      throw error;
    }
  }

  async killLauncher() {
    if (typeof this.launcher !== 'undefined') {
      await this.launcher!.kill();
    }
  }

  async runLighthouseOnCI(url: string): Promise<LighthouseResults> {
    try {
      return await lighthouse(url, this.flags, lhConfig);
    } catch(error) {
      if (error.code === 'CRI_TIMEOUT' && this.tryLighthouseCounter <= MAX_LIGHTHOUSE_TRIES) {
        return await this.retryLighthouseOnCI(url);
      }

      if (this.tryLighthouseCounter > MAX_LIGHTHOUSE_TRIES) {
        throw new Error('CRI_TIMEOUT_REJECT');
      }
    }
  }

  async retryLighthouseOnCI(url: string): Promise<LighthouseResults> {
    this.tryLighthouseCounter++;
    console.log('CRI_TIMEOUT_RELAUNCH');

    try {
      return await this.runLighthouseOnCI(url);
    } catch(error) {
      console.error(error.message);
      console.error('CLOSING_CHROME');
      await this.killLauncher();
    }
  }

  async launchChrome(): Promise<LaunchedChrome|Error> {
    try {
      console.log('LAUNCHING_CHROME');
      this.launcher = await launch({
        port: this.flags.port,
        chromeFlags: this.flags.chromeFlags,
        chromePath: this.flags.chromePath
      });
      this.flags.port = this.launcher.port;
      return this.launcher;
    } catch(error) {
      await this.killLauncher();
      return error;
    }
  }

  async recordLighthouseTrace(data: LighthouseResults): Promise<MetricsResults> {
    try {
      const preparedData = metrics.prepareData(data);

      // if (this.flags.upload) {
      //   const driveResponse = await upload(data, this.clientSecret);
      //   this.view(driveResponse.id);
      // }

      // if (!this.flags.submit && this.runs <= 1) {
      //   this.displayOutput(preparedData);
      // }

      if (this.flags.expectations) {
        expectations.checkExpectations(preparedData.timings, this.expectations);
      }

      return preparedData;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AntA;
