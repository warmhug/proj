importScripts('common.js');
importScripts('background-inject.js');
// console.log('hl_utils: ', hl_utils);
console.log('bg page, 注意其执行时机', chrome);
// console.log('bg page init no window', window?.document?.title);

// 在地址栏调用 Google 翻译 API 直接搜索
const changeDelay = hl_utils.debounce((text, suggest) => {
  if (text.length <= 1) {
    suggest([]);
    return;
  }
  fetch('https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&sl=zh-CN&tl=en&q=' + text)
    .then((response) => response.json())
    .then((data) => {
      const resAry = data?.[0]?.[0];
      if (resAry?.length) {
        suggest([{
          content: `${resAry?.[1]} | ${resAry?.[0]}`,
          deletable: true,
          description: `<dim>中文 ${resAry?.[1]} 英文</dim> <match>${resAry?.[0]}</match> <url>chrome://newtab</url>`
        }]);
      }
    });
}, 900);
// 填入搜索结果到本插件 Google 翻译的 iframe 里，产生搜索记录、方便回顾
const saveResult = async (text) => {
  const cn = text?.split(' | ')?.[0];
  if (!cn) {
    return;
  }
  const [curTab] = await chrome.tabs.query({ active: true });
  const newTranslateUrl = `https://translate.google.com/?sl=zh-CN&tl=en&text=${cn}&op=translate`;
  if (curTab.url === 'chrome://newtab/') {
    // 如果打开了 newtab 页面
    chrome.runtime.sendMessage({
      _bg: true,
      action: 'newTranslateUrl',
      message: newTranslateUrl,
    }, (response) => {
      console.log("Receive response in background", response);
    });
  } else {
    chrome.tabs.create({ url: newTranslateUrl, index: curTab.index });
  }
};

let cacheText = '';
chrome.omnibox.setDefaultSuggestion({
  description: '输入中文翻译为英语'
});
chrome.omnibox.onInputCancelled.addListener(() => {
  // console.log('onInputCancelled', cacheText);
  if (cacheText.trim().length) {
    void saveResult(cacheText);
  }
});
chrome.omnibox.onInputChanged.addListener((text, suggest) => {
  // console.log('change', text);
  cacheText = text;
  return changeDelay(text, suggest);
});
chrome.omnibox.onInputEntered.addListener(saveResult);
chrome.omnibox.onDeleteSuggestion.addListener((text) => {
  // console.log('onDeleteSuggestion', text, cacheText);
});
chrome.omnibox.onInputStarted.addListener((text) => {
  // console.log('onInputStarted', text, cacheText);
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
    await chrome.tabs.move(tabInfo.id, { index: lastActiveTabIndex + 1 });
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
  const { hl_inject_auto = [] } = await hl_utils.getStorage();
  // 自动注入代码
  const result = hl_utils.asyncMap(hl_inject_auto, async (url, idx) => {
    const queryTabs = await chrome.tabs.query({ url: url });
    return await hl_utils.asyncMap(queryTabs, async (qTab) => {
      if (qTab.id = tabId) {
        const { css = '', ...rest } = hl_inject_auto_params[idx];
        await chrome.scripting.insertCSS({ target: { tabId }, css });
        const injectionResults = await chrome.scripting.executeScript({
          target: { tabId },
          ...rest,
        });
        // console.log('auto injectionResults: ', injectionResults);
        return injectionResults;
      }
    });
  });
  // console.log('log result: ', result);
});

async function aiChat(clipText) {
  const { hl_inject_ai = [] } = await hl_utils.getStorage();
  // const hl_inject_ai = ['https://www.doubao.com/chat/']; // 调试用
  const maps = hl_inject_ai.map((url, idx) => ({
    url, func: hl_inject_ai_fns[idx]
  }));
  const runFn = async ({ url, func }) => {
    return;
    const targetTab = await hl_utils.createOrUpdateTab(url, true);
    if (!targetTab) {
      return;
    }
    const tabId = targetTab.id;
    if (targetTab.index > 7) {
      await chrome.tabs.move(tabId, { index: 0 });
    }
    // 虽然页面已经 loaded 但 页面里的元素 可能还在变化、等待其稳定
    await hl_utils.sleep(300);
    // await hl_utils.sleep(135000);
    try {
      const injectionResults = await chrome.scripting.executeScript({
        func,
        target: { tabId },
        args: [clipText],
      });
    } catch (error) {
      console.log('log executeScript error: ', url, error);
    }
  };
  // console.log('log maps: ', maps);
  for (let item of maps) {
    await runFn(item);
    // 隔一秒跑一个
    await hl_utils.sleep(1000);
  }
  // 并行执行，有焦点失焦问题？
  // await hl_utils.asyncMap(maps, runFn);
}

// 开启定时任务
const interval = null;
// const interval = 20 * 1000;
hl_utils.cron(interval, async () => {
  await openPopup('cron');
  const syncStorage = await hl_utils.getStorage(null);
  await hl_utils.reCreateTabs(syncStorage.hl_tabs_rebuild);
});

async function onMessageCb(request) {
  if (request?.action === 'reCreateTabs') {
    const syncStorage = await hl_utils.getStorage(null);
    await hl_utils.reCreateTabs(syncStorage.hl_tabs_rebuild);
  }
  if (request?.action === 'reloadTabs') {
    const [curTab] = await chrome.tabs.query({ active: true });
    await hl_utils.reloadTabs(request?.reloadTabsAll ? undefined : curTab);
  }
  if (request?.action === 'aiChat') {
    await aiChat(request.clipText);
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
    if (command === 'aiChat') {
      response = await chrome.runtime.sendMessage(
        { _bg: true, action: command },
      );
      // 需要等 popup 页面获取到内容，这里才能收到消息
      console.log("Receive response in background", response);
      if (response?.action === command && response?.clipText) {
        await aiChat(response.clipText);
      }
    }
  });
});
