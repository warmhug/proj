import './App.less';
import React, { Component } from 'react';
import classNames from 'classnames';
import { Collapse, Icon } from 'antd';
import Audits from './Audits';
import { insertScript, getColor, THRESHOLD_FAIL, THRESHOLD_PASS } from './utils';

const Panel = Collapse.Panel;

window.dealRawData = function (pageName, pageData) {
  if (pageName && pageData) {
    window.pageInfo = { [pageName]: pageData };
  }
};

// mock data. todos: delete it!
// window.appInfo = {
//   appName: 'yfd', userName: 'jm', version: '1.0.0', submitTime: '2018-03-21'
// };
// window.pagesAudits = [
//   {
//     name: 'index.html',
//     score: '0.8333',
//     resultUrl: {
//       url: 'https://gw.alipayobjects.com/os/rmsportal/UnsXMxlzPUJRReyKflNJ.js'
//     }
//   },
//   {
//     name: 'index1.html',
//     score: '0.9333',
//     resultUrl: {
//       url: 'https://gw.alipayobjects.com/os/rmsportal/UnsXMxlzPUJRReyKflNJ.js'
//     }
//   }
// ];

class App extends Component {
  state = {
    pagesAudits: window.pagesAudits || [],
    currentPageUrl: window.pagesAudits[0].name || '',
  };

  componentDidMount() {
    this.switchPage(this.state.currentPageUrl);
  }

  switchPage = (url) => {
    const setCurr = () => this.setState({
      currentPageUrl: url,
      currPageAudits: window.pageInfo[url]
    });

    if (!window.pageInfo || !window.pageInfo[url]) {
      insertScript(this.state.pagesAudits.filter(page => page.name === url)[0].resultUrl.url, function () {
        setCurr();
      });
    } else {
      setCurr();
    }
  };

  render() {
    const { pagesAudits, currentPageUrl, currPageAudits } = this.state;

    if (!pagesAudits.length) {
      return <div style={{ padding: 30 }}>加载中...</div>;
    }

    const getSidePageList = () => {
      const sideData = [
        { title: '未通过', pages: [] },
        { title: '合格', pages: [] },
        { title: '优秀', pages: [] },
      ];
      pagesAudits.forEach(item => {
        if (!item.score || item.score <= THRESHOLD_FAIL) {
          sideData[0].pages.push(item);
        } else if (item.score <= THRESHOLD_PASS) {
          sideData[1].pages.push(item);
        } else {
          sideData[2].pages.push(item);
        }
      });

      return (<Collapse bordered={false} defaultActiveKey={['0', '1', '2']}>
        {sideData.map((out, index) => (
          <Panel
            key={index}
            showArrow={false}
            header={<span>
              <Icon type="caret-right" className="dark" />
              {out.title}
            </span>}
            style={{ border: 0 }}
          >
            {out.pages.map(item => (
              <p
                key={item.name}
                className={classNames('page', item.name === currentPageUrl && 'sel')}
                onClick={() => this.switchPage(item.name)}
              >
                <span className="url">{item.name}</span>
                <span className={`score ${getColor(item.score)}`}>{parseInt(item.score, 10)}</span>
              </p>
            ))}
          </Panel>
        ))}
      </Collapse>);
    };

    const mainContent = (
      <div key="1" className="container">
        <div className="side">
          {getSidePageList()}
        </div>
        {currPageAudits ? <Audits currPageAudits={currPageAudits} currentPageUrl={currentPageUrl} /> : (
          <div className="main" style={{ padding: 30 }}>加载中或出现错误</div>
        )}
      </div>
    );

    if (window.appInfo) {
      const { appName, userName, version, submitTime } = window.appInfo;
      return [
        <div key="0" className="header clearfix">
          <div className="header-left">
            <Icon type="file-text" />
            <span>{appName}</span>
          </div>
          <div className="header-right">
            <span><Icon type="user" /> 提交人：{userName}</span>
            <span><Icon type="code-o" /> 版本号：{version}</span>
            <span><Icon type="clock-circle-o" /> 提交时间：{submitTime}</span>
          </div>
        </div>,
        mainContent
      ];
    }

    return mainContent;

  }
}

export default App;
