/**
 * 需要在 chrome://extensions/ 打开背景页, 查看 console log 结果
 */

importScripts('common.js');
// console.log('hl_utils: ', hl_utils);
console.log('bg page, 注意其执行时机', chrome);
// console.log('bg page init no window', window?.document?.title);

const injectUrls = [
  [
    // "https://*.google.com/*",
    "https://google.com/*", "https://www.google.com/*",
    "https://*.bing.com/*", "https://*.baidu.com/*"
  ],
  "https://www.zhihu.com/",
];
const injectUrlsPs = [
  // https://cn.bing.com  https://www.bing.com https://www.google.com  https://www.baidu.com
  {
    func: (arg) => {
      console.log('log arg: ', arg);
      try {
        hl_utils?.createSearchSwitch();
        window.addEventListener('popstate', function (event) {
          const searchParams = new URLSearchParams(window.location.search);
          // console.log('URL search parameters changed:', searchParams);
          hl_utils?.createSearchSwitch();
        });
      } catch (error) {
      }
    },
  },
  // https://www.zhihu.com
  {
    css: `
      .AppHeader.is-fixed {
        position: static;
      }
    `,
    func: () => {
      // alert(11);
    },
  },
];

// 填入搜索结果到本插件 Google 翻译的 iframe 里，产生搜索记录、方便回顾
const saveResult = async (text, langArg = '&sl=zh-CN&tl=en') => {
  const txt = text?.split(' | ')?.[0];
  if (!txt) {
    return;
  }
  const { hl_page_ext_index } = await hl_utils.getStorage(null);
  const [curTab] = await chrome.tabs.query({ active: true });
  console.log('log curTab: ', curTab);
  const newTranslateUrl = `https://translate.google.com/?op=translate&text=${txt}${langArg}`;
  const sendMsg = (msg) => {
    // 在插件页面
    chrome.runtime.sendMessage({
      _bg: true,
      action: 'newTranslateUrl',
      message: msg,
    }, (response) => {
      console.log("Receive response in background", response);
    });
  }
  if (curTab.url.indexOf(hl_page_ext_index) > -1) {
    sendMsg(newTranslateUrl);
  } else {
    chrome.tabs.create({ url: newTranslateUrl, index: curTab.index });
  }
};
hl_utils.omnibox({
  onEnterOrCancel: saveResult,
});

let lastActiveTabIndex = null;  // 用来记录上一个活动标签页的索引
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  // 记录每次切换的活动标签页的索引
  const tab = await chrome.tabs.get(activeInfo.tabId);
  lastActiveTabIndex = tab.index;
});
chrome.tabs.onCreated.addListener(async (tabInfo) => {
  console.log('onCreated tabInfo: ', tabInfo);
  // 如果上一次活动标签页的索引已知，将新标签页放在该标签页的右边
  if (lastActiveTabIndex !== null) {
    // await chrome.tabs.move(tabInfo.id, { index: lastActiveTabIndex + 1 });
  }
  // 在 地址栏搜索 并按住 CMD+Enter 后打开的 tab 移动到在当前 tab 右边
  const [curTab] = await chrome.tabs.query({ active: true });
  const searchEngines = ['google.com', 'bing.com', 'baidu.com'];
  if (
    !tabInfo.active &&
    searchEngines.some(item => tabInfo.pendingUrl?.indexOf(item) > -1)
  ) {
    await chrome.tabs.move(tabInfo.id, { index: curTab.index + 1 });
  }
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  // console.log('onUpdated tabs: ', tabId, changeInfo, tab.url);
  const result = hl_utils.asyncMap(injectUrls, async (url, idx) => {
    // const targetTab = await hl_utils.createOrUpdateTab(url, true);
    // console.log('log targetTab: ', targetTab);
    const queryTabs = await chrome.tabs.query({ url: url });
    return await hl_utils.asyncMap(queryTabs, async (qTab) => {
      if (qTab.id == tabId) {
        // 自动注入的内容
        const { css = '', ...rest } = injectUrlsPs[idx];
        await chrome.scripting.insertCSS({ target: { tabId }, css });
        const injectionResults = await chrome.scripting.executeScript({
          target: { tabId },
          args: ['executeScript_arg_test'],
          ...rest,
        });
        // 虽然页面已经 loaded 但 页面里的元素 可能还在变化、等待其稳定
        // await hl_utils.sleep(300);
        // console.log('auto injectionResults: ', injectionResults);
        return injectionResults;
      }
    });
  });
  // console.log('log result: ', result);
});

// 开启定时任务
const interval = null;
// const interval = 20 * 1000;
hl_utils.cron(interval, async () => {
  await openPopup('cron');
  await hl_utils.reCreateTabsDelay(['https://i.mi.com/note/h5#/'], );
});

async function onMessageCb(request) {
  console.log('log request.clipText: ', request.clipText);
  if (request?.action === 'reloadTabs') {
    const [curTab] = await chrome.tabs.query({ active: true });
    await hl_utils.reloadTabs(request?.reloadTabsAll ? undefined : curTab);
  }
  if (request.action === 'openPopup') {
    await openPopup(undefined, undefined, 0);
  }
}
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  onMessageCb(request);
  // 返回消息 不能异步发送
  sendResponse({ action: request?.action, result: 'background 成功接收消息' });
  return true;
});

async function openPopup(text = 'popup', cb = async () => {}, delay = 1000) {
  // 想自动关闭 popup 页面，需要在 popup 页面里调用 window.close();
  // const response = await chrome.runtime.sendMessage({
  //   _bg: true, action: 'openPopup', message: delay,
  // });
  // console.log("Receive response in background", response);
  await chrome.action.openPopup();
  await chrome.action.setBadgeText({ text });
  setTimeout(async () => {
    await cb();
    await chrome.action.setBadgeText({ text: '' });
  }, delay);
}

// 注册和使用快捷键 https://developer.chrome.com/docs/extensions/reference/commands
// chrome://extensions/shortcuts
chrome.commands.onCommand.addListener((command) => {
  openPopup(command, async () => {
    console.log('log command: ', command);
    response = await chrome.runtime.sendMessage(
      { _bg: true, action: command },
    );
    // 需要等 popup 页面获取到内容，这里才能收到消息
    console.log("Receive response in background", response);
  });
});
