import React, { Component } from 'react';
import classNames from 'classnames';
import marked from 'marked';
import { Collapse, Icon, Tree } from 'antd';
import { genDateStr, getColor, THRESHOLD_FAIL, CATE_NAME } from './utils';

function pieChart(percentage, size, cls) {
  var unit = (Math.PI * 2) / 100;
  var startangle = 0;
  var ra = 4;
  var endangle = percentage * unit - 0.001;
  var x1 = (size / ra) + (size / ra) * Math.sin(startangle);
  var y1 = (size / ra) - (size / ra) * Math.cos(startangle);
  var x2 = (size / ra) + (size / ra) * Math.sin(endangle);
  var y2 = (size / ra) - (size / ra) * Math.cos(endangle);
  var big = 0;
  if (endangle - startangle > Math.PI) {
      big = 1;
  }
  var d = "M " + (size / ra) + "," + (size / ra) +  // Start at circle center
      " L " + x1 + "," + y1 +     // Draw line to (x1,y1)
      " A " + (size / ra) + "," + (size / ra) +       // Draw an arc of radius r
      " 0 " + big + " 1 " +       // Arc details...
      x2 + "," + y2 +             // Arc goes to to (x2,y2)
      " Z";                       // Close path back to (cx,cy)

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size / 2} ${size / 2}`}>
      <circle cx={size / ra} cy={size / ra} r={size / ra} fill="#ebebeb"></circle>
      <path d={d} className={cls}></path>
      <circle cx={size / ra} cy={size / ra} r={size * 0.17} className="fcolor"></circle>
    </svg>
  );
}

const Panel = Collapse.Panel;

// console.log('md', marked('# Marked in browser\n\nRendered by **marked**.'))

const metricsMain = [
  'first-meaningful-paint',
  'first-interactive',
  'consistently-interactive',
  'speed-index-metric',
  'estimated-input-latency',
];
const metricsMainHelpText = [
  '首次有意义渲染 | 页面主要内容绘制时间',
  '首次可交互 | 页面最短可交互时间',
  '稳定可交互 | 页面完全稳定可交互时间',
  '感知加载速度 | 页面感知加载速度',
  '输入延迟 | 页面输入框输入延迟时间',
];
const metricsOthersKV = {
  'link-blocking-first-paint': '减少阻塞渲染的外部样式表 | 外部样式表阻止了您页面的首次渲染，通过`<style>`标签对关键CSS进行迭代并推迟非关键样式。[了解更多](https://developers.google.com/web/tools/lighthouse/audits/blocking-resources)',
  'script-blocking-first-paint': '减少阻塞渲染的外部脚本 | script 元素阻止您的页面的首次渲染，考虑内联关键脚本并推迟非关键脚本。[了解更多](https://developers.google.com/web/tools/lighthouse/audits/blocking-resources)',
  'uses-responsive-images': '响应式图片 | 提供适当大小的图像以节省移动数据流量并缩短加载时间。[了解更多](https://developers.google.com/web/tools/lighthouse/audits/oversized-images)',
  'offscreen-images': '屏幕外图片 | 考虑延迟加载屏幕外图像以提高页面加载速度和时间以进行交互。[了解更多](https://developers.google.com/web/tools/lighthouse/audits/offscreen-images)',
  'uses-optimized-images': '优化图片 | 优化后的图片能加载更快以及减少移动数据消耗。[了解更多](https://developers.google.com/web/tools/lighthouse/audits/optimize-images)',
  'uses-request-compression': '启动文本压缩 | 使用 gzip, deflate 或 brotli 压缩文本文件来最小化网络数据请求。[了解更多](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer)',
  'time-to-first-byte': '保持低的服务器响应时间(TTFB) | “第一个字节时间”标识服务器发送响应的时间。[了解更多](https://developers.google.com/web/tools/chrome-devtools/network-performance/issues)',
  'redirects': '避免重定向 | 在页面加载之前重定向会引入额外的延迟。[了解更多](https://developers.google.com/speed/docs/insights/AvoidRedirects)',
  'total-byte-weight': '避免大的网络负载 | 页面总字节较大时会导致用户花费更多金钱和时间。[了解更多](https://developers.google.com/web/tools/lighthouse/audits/network-payloads)',
  'uses-long-cache-ttl': '对静态资源使用高效的缓存策略 | 较长的缓存时间可以加速对页面的重复访问。[了解更多](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching#cache-control)',
  'dom-size': '避免过大的 DOM 数量 | 浏览器工程师推荐页面包含少于 1500 个 DOM 节点。最佳节点树深小于 32 个元素，少于 60 个孩子/父元素。大的 DOM 会增加内存使用量，导致更长的[样式计算](https://developers.google.com/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations)，并产生昂贵的[布局重排](https://developers.google.com/speed/articles/reflow)工作。[了解更多](https://developers.google.com/web/fundamentals/performance/rendering/)',
  'critical-request-chains': '关键请求链路 | 关键请求链路会显示哪些资源的问题比较大，考虑减少链的长度，减少资源的下载大小，或推迟下载不必要的资源以改善页面加载。[了解更多](https://developers.google.com/web/tools/lighthouse/audits/critical-request-chains)',
  'user-timings': '使用 User Timing API | 考虑在您的应用程序里使用 User Timing API 用以在真实环境里对关键用户体验做度量。[了解更多](https://developers.google.com/web/tools/lighthouse/audits/user-timing)',
  'bootup-time': 'JavaScript 启动时间 | 考虑减少解析，编译和执行JS所花费的时间。',
  'screenshot-thumbnails': '截图 | 网站加载过程的截图。',
  'mainthread-work-breakdown': '减少主 UI 线程工作量 | 考虑减少解析，编译和执行JS所花费的时间。',
};

// 目前 只展示 anta/lib/lh-config.ts 里 categories performance 下的 audits
const getMetrics = (cates) => {
  const mobj = {
    metricsOthers: [],
    perfScore: 100,
    perfName: '',
    perfDescription: '',
  };
  if (cates) {
    cates.forEach(cate => {
      if (cate.name === CATE_NAME) {
        mobj.metricsOthers = cate.audits.filter(audit => metricsMain.indexOf(audit.id) === -1);
        mobj.perfScore = cate.score;
        mobj.perfName = cate.name;
        mobj.perfDescription = cate.description;
      }
    });
  }
  return mobj;
};

export default class Audits extends Component {
  render() {
    const {
      runtimeConfig, userAgent, timings, generatedTime, lighthouseVersion,
      reportCategories, audits,
    } = this.props.currPageAudits.runs[0];
    const thumbnails = audits && audits['screenshot-thumbnails'];

    const getWidth = (time) => {
      if (!thumbnails || !thumbnails.details) {
        return 0;
      }
      const arr = thumbnails.details.items;
      let omitMarginValue = 0;
      for (let index = 0; index < arr.length; index++) {
        if (arr[index].timing > time) {
          omitMarginValue = 10 * index; // .img-container margin-right: 10px;
          omitMarginValue /= (70 * 10 + 10 * 9); // .timeline width
          break;
        }
      }
      return time / arr[arr.length - 1].timing * 100 - omitMarginValue;
    };

    const getMainHeader = () => {
      const { perfScore, perfName, perfDescription } = getMetrics(reportCategories);
      return (
        <div className="main-header">
          <div className="main-chart">
            {pieChart(perfScore, 72, getColor(perfScore))}
            <span className={classNames('main-chart-score', getColor(perfScore))}>
              {parseInt(perfScore, 10)}
            </span>
          </div>
          <div className="main-title">
            {/* <h3>{perfName}</h3> */}
            <h3>性能分析</h3>
            {/* <p>{perfDescription}</p> */}
            <p>以下展示了您的应用当前的主要性能指标和改进它的方法</p>
          </div>
        </div>
      );
    }

    const parseCrc = (item) => {
      const chains = item.result.details.chains;
      const arr = [];
      Object.keys(chains).forEach((key, index) => {
        const { url, startTime, endTime, transferSize } = chains[key].request;
        const obj = {
          url,
          dur: `${Math.round((endTime - startTime) * 1000)}ms`,
          size: `${Math.round(transferSize / 1024)} KB`,
          children: []
        };
        arr.push(obj);
        const childs = chains[key].children;
        Object.keys(childs).forEach((ck, ind) => {
          const { url, startTime, endTime, transferSize } = childs[ck].request;
          obj.children.push({
            url,
            dur: `${Math.round((endTime - startTime) * 1000)}ms`,
            size: `${Math.round(transferSize / 1024)} KB`
          });
        });
      });
      if (!arr.length) {
        return null;
      }
      return (
        <Tree className="crc-tree" showLine defaultExpandAll showIcon={false}>
          {arr.map(ar => <Tree.TreeNode
            title={<span>{ar.url} - <b>{ar.dur}</b> <b>{ar.size}</b></span>}
            key={ar.url}
          >
            {ar.children.length ? ar.children.map(tr => <Tree.TreeNode
              title={<span>{tr.url} - <b>{tr.dur}</b> <b>{tr.size}</b></span>}
              key={tr.url}
            />) : null}
          </Tree.TreeNode>)}
        </Tree>
      );
    }

    const getMetricsOthers = (passFlag, warn) => {
      const { metricsOthers } = getMetrics(reportCategories);
      const arr = metricsOthers.filter(item =>
        passFlag ? item.score > THRESHOLD_FAIL : item.score <= THRESHOLD_FAIL);
      return arr.length ? (
        <Collapse bordered={false}>
          {arr.map(item => (
            <Panel
              key={item.id}
              showArrow={false}
              header={
                <span key="ph">
                  <Icon type="caret-right" />
                  <span className="audit-header">
                    {/* <b>{item.result.description}</b> */}
                    <b>{metricsOthersKV[item.id].split(' | ')[0]}</b>
                    <span className={getColor(item.score)}>{item.result.displayValue}</span>
                  </span>
                </span>
              }
            >
              {/* <div className="help-txt" dangerouslySetInnerHTML={{__html: marked(item.result.helpText)}} /> */}
              {item.id === 'critical-request-chains' ? parseCrc(item) : <div className="help-txt" dangerouslySetInnerHTML={{ __html: marked(metricsOthersKV[item.id].split(' | ')[1]) }} />}
            </Panel>
          ))}
        </Collapse>
      ) : warn;
    };

    const isAlipayUC = /UCBrowser.*AlipayClient/.test(userAgent);
    let agent = '服务器浏览器环境';
    let osInfo = <p>操作系统: CentOS 7.2，CPU: 4 核，内存: 8 GB</p>;
    if (isAlipayUC) {
      agent = '真机支付宝容器';
      osInfo = null;
    } else if (document.body.className.indexOf('ide') !== -1) {
      agent = 'IDE 本地环境';
      osInfo = null;
    }

    return (
      <div className="main">
        <Collapse className="top-clps" bordered={false}>
          <Panel
            key="1"
            header={<span>
              {this.props.currentPageUrl}
              <span className="agent">{agent}</span>
            </span>}
          >
            {/* <p>Runtime Environment</p> */}
            <p>运行环境</p>
            <ul>
              {runtimeConfig && runtimeConfig.environment.map(item => (
                <li key={item.name}>{item.name} (enabled: {String(item.enabled)}) : {item.description}</li>
              ))}
            </ul>
            <p>浏览器: {userAgent}</p>
            {osInfo}
            <p>
              Generate at {genDateStr(new Date(generatedTime))} &nbsp;
              by lighthouse@{lighthouseVersion}
            </p>
          </Panel>
        </Collapse>

        {getMainHeader()}

        <div className="metrics-container">
          <div className="metrics-header">关键度量指标</div>
          {thumbnails && thumbnails.details ? <div className="metrics-thumbnails">
            {thumbnails.details.items.map(item => (
              <div key={item.timing} className="img-container">
                <span>{item.timing / 1000}s</span>
                <img src={`data:image/jpg;base64,${item.data}`} />
              </div>
            ))}
          </div> : null}
          <div className="metrics">
            <Collapse bordered={false}>
              {metricsMain.map((id, index) => (
                <Panel
                  key={id}
                  showArrow={false}
                  header={[
                    ['speed-index-metric', 'estimated-input-latency'].indexOf(id) === -1 ?
                      <div key="0" className="timeline">
                        <div
                          className={`timeline-mark bg-${getColor(audits[id].score)}`}
                          style={{ width: `${getWidth(audits[id].rawValue)}%` }}
                        />
                      </div> :
                      <div key="0" style={{ display: 'none' }} />,
                    <span key="ph">
                      <Icon type="caret-right" />
                      <span className="audit-header">
                        {/* <b>{audits[id].description}</b> */}
                        <b>{metricsMainHelpText[index].split(' | ')[0]} {audits[id].description}</b>
                        <span className={getColor(audits[id].score)}>
                          {audits[id].displayValue}
                        </span>
                      </span>
                    </span>,
                  ]}
                  style={{ border: 0 }}
                >
                  {metricsMainHelpText[index].split(' | ')[1]}
                </Panel>
              ))}
            </Collapse>
          </div>
        </div>

        <div className="opportunities-container">
          <div className="opportunities-header">待优化指标</div>
          <div className="opportunities">
            {getMetricsOthers(0, 'all audits passed!')}
          </div>
        </div>

        <Collapse className="passed-audits" bordered={false}>
          <Panel key="1" className="out-panel" header="通过的指标">
            <div className="inner">
              {getMetricsOthers(1, 'no passed!')}
            </div>
          </Panel>
        </Collapse>
      </div>
    );
  }
}
