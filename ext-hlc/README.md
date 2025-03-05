# chrome 扩展

调试方法

1. 打开 `chrome://extensions/` 相应的插件名、点“刷新”按钮，点击 `chrome://newtab` 页面的 后退 按钮。
2. manifest -> background -> scripts 打开 `chrome://extensions/` 相应的插件名、点“背景页”。
3. manifest -> content_scripts 设置的 js 位置：“控制台 -> Sources -> Content scripts”

配置

http://localhost/a/_proj/ext-hlc/a_localFileEditor.html

```json
{
  "hl_inject_ai": [
    "https://www.doubao.com/chat/",
    "https://chatgpt.com/",
    "https://gemini.google.com/",
    "https://kimi.moonshot.cn/"
  ],
  "hl_inject_auto": [
    ["https://*.google.com/*", "https://*.bing.com/*", "https://*.baidu.com/*"],
    "https://www.zhihu.com/",
    "https://i.mi.com/note/h5#/"
  ],
  "hl_inject_blankpage": [
    ["https://ai-bot.cn/daily-ai-news/", "AI新闻"],
    ["https://www.baidu.com/s?wd=%E6%97%A5%E5%8E%86", "日历"],
    ["https://uutool.cn/", "uutool"],
  ],
  "hl_tabs_rebuild": [
    "https://i.mi.com/note/h5#/"
  ]
}
```

## 记录

### 2024-09~10

chrome.tabs.query({ url: urls }); 如果 urls 里含有 #xxx 则 匹配不到，因为 hash 是在页面 url 渲染之后再触发变化的。

```js
const queryTab = await chrome.tabs.query({
  // title: 'Kimi.ai ', // 不匹配
  // title: 'Kimi.ai *', // 通配符 匹配
  // title: 'Kimi.ai - 帮你看更大的世界', // 严格匹配
  url: 'https://kimi.moonshot.cn/*', // 通配符 匹配
  // url: 'https://kimi.moonshot.cn/chat/cquokobdf0j055ekrqvg', // 严格匹配
  // url: '*://*.google.*/*q=*',
  // favIconUrl: 'https://statics.moonshot.cn/kimi-chat/favicon.ico',
  // active: false,
  // discarded: false,
  // highlighted: false,
  // status: 'complete', // loading unloaded
});
// console.log('queryTab: ', queryTab);

// 卡死页面的代码
javascript:[...Array(2**32-1)].map(_=>Math.ceil(Math.random()*111))

const bg = chrome.extension.getBackgroundPage();
const views = chrome.extension.getViews();
// console.log('views', bg, views);

// chrome.processes 开发者版浏览器可用 https://groups.google.com/a/chromium.org/g/chromium-extensions/c/pyAzuN4neHc
// https://developer.chrome.com/docs/extensions/reference/api/processes?hl=zh-cn
console.log('chrome.processes: ', chrome.processes);
console.log('chrome.processes: ', chrome?.experimental, chrome?.experimental?.processes);
```

### 2024-06~07 Native messaging

https://developer.chrome.com/docs/extensions/develop/concepts/native-messaging?hl=zh-cn
https://github.com/guest271314/NativeMessagingHosts
https://github.com/simov/native-messaging
使用shell https://stackoverflow.com/a/24777120/2190503

配置文件模版（HOST_PATH 会被 安装脚本 替换为 执行文件所在地址）

```json
{
  "name": "nm_sh",
  "description": "Chrome Native Messaging API Example Host",
  "path": "HOST_PATH",
  "type": "stdio",
  "allowed_origins": ["chrome-extension://kafpfdegkmheageeldelgnnkegpkbpca/"]
}
```
> 实际路径 '/Users/hua/Library/Application Support/Google/Chrome/NativeMessagingHosts/nm_sh.json'

安装脚本 install_host.sh

```sh
#!/bin/sh
# 改动自 https://github.com/GoogleChrome/chrome-extensions-samples/blob/main/api-samples/nativeMessaging/host/install_host.sh
set -e
DIR="$( cd "$( dirname "$0" )" && pwd )"
if [ $(uname -s) == 'Darwin' ]; then
  if [ "$(whoami)" == "root" ]; then
    # Due to macOS permission changes we need to put the host in /Applications
    HOST_PATH="/Applications/nm_sh"
    cp "$DIR/nm_sh" $HOST_PATH
    TARGET_DIR="/Library/Google/Chrome/NativeMessagingHosts"
  else
    # nm_sh 不需要放到 ~/Applications 目录里，改为自己的目录
    # HOST_PATH="/Users/$USER/Applications/nm_sh"
    HOST_PATH="/Users/hua/inner/nm_sh"
    cp "$DIR/nm_sh" $HOST_PATH
    TARGET_DIR="$HOME/Library/Application Support/Google/Chrome/NativeMessagingHosts"
  fi
else
  HOST_PATH="$DIR/nm_sh"
  if [ "$(whoami)" == "root" ]; then
    TARGET_DIR="/etc/opt/chrome/native-messaging-hosts"
  else
    TARGET_DIR="$HOME/.config/google-chrome/NativeMessagingHosts"
  fi
fi
chmod a+x "$DIR/nm_sh"
HOST_NAME=nm_sh
mkdir -p "$TARGET_DIR"
cp "$DIR/$HOST_NAME.json" "$TARGET_DIR"
ESCAPED_HOST_PATH=${HOST_PATH////\\/}
sed -i -e "s/HOST_PATH/$ESCAPED_HOST_PATH/" "$TARGET_DIR/$HOST_NAME.json"
chmod o+r "$TARGET_DIR/$HOST_NAME.json"

echo Native messaging host $HOST_NAME has been installed.
```

使用 js

```js
#!/usr/bin/env -S /Users/hua/.nvm/versions/node/v22.3.0/bin/node --max-old-space-size=14 --jitless --expose-gc --v8-pool-size=1 --experimental-default-type=module

// https://github.com/guest271314/native-messaging-nodejs/blob/main/nm_nodejs.js
// guest271314, 10-9-2022
import { open } from "node:fs/promises";
process.env.UV_THREADPOOL_SIZE = 1;

// https://github.com/denoland/deno/discussions/17236#discussioncomment-4566134
// https://github.com/saghul/txiki.js/blob/master/src/js/core/tjs/eval-stdin.js
async function readFullAsync(length, buffer = new Uint8Array(65536)) {
  const data = [];
  while (data.length < length) {
    const input = await open("/dev/stdin");
    let { bytesRead } = await input.read({
      buffer
    });
    await input.close();
    if (bytesRead === 0) {
      break;
    }
    data.push(...buffer.subarray(0, bytesRead));
  }
  return new Uint8Array(data);
}

async function getMessage() {
  const header = new Uint32Array(1);
  await readFullAsync(1, header);
  const content = await readFullAsync(header[0]);
  return content;
}

async function sendMessage(message) {
  const header = new Uint32Array([message.length]);
  const stdout = await open("/proc/self/fd/1", "w");
  await stdout.write(header);
  await stdout.write(message);
  await stdout.close();
  global.gc();
}

async function main() {
  while (true) {
    try {
      const message = await getMessage();
      await sendMessage(message);
    } catch (e) {
      process.exit();
    }
  }
}
main();
```


### 2023

[消息通信](https://developer.chrome.com/docs/extensions/develop/concepts/messaging?hl=zh-cn)

在 background.js 用 `chrome.runtime.sendMessage` 发消息、所有页面里的 content_scripts 都收不到，改为 `chrome.tabs.sendMessage` 发送、比如 `https://www.xxx` 外部正常域名的页面“可以收到”、但位于插件内部的页面比如 `chrome-extension://extension-id/xx.html` 收不到。
位于插件内部的页面的 js 文件里，可以直接调用 `chrome.action/storage/commands/..` 等 chrome api，如果插件内部的页面处于打开运行状态、其上注册的 chrome 扩展功能 就能运行，如果关掉页面、扩展功能将不能运行。

```js
// servicework 里打开 option.html https://stackoverflow.com/questions/2399389/detect-chrome-extension-first-run-update
chrome.tabs.create({ url: chrome.runtime.getURL('options.html') });
```


### 2022-09~11

开发时生成固定的 [extension_id](https://stackoverflow.com/questions/21497781)、
[crxviewer](https://robwu.nl/crxviewer/)，在不同电脑上安装、打开`chrome://sync-internals/`搜 `hl_` 验证结果。
注意 `chrome.storage.sync` 只存储和同步当前插件的数据，如果卸载插件、则同步的数据立即被删除。

`chrome://newtab` 页面、其他标签页打开的 xxx.com 页面，与其内嵌的 iframe 通信限制方面完全一样、不能跨域访问。包括他们被注入的 content_scripts 在访问跨域iframe时、也一样受到限制。

rules.json 里的 modifyHeaders 修改 responseHeaders 会生效，但是不显示在 Chrome DevTools 里。ref [issue](https://bugs.chromium.org/p/chromium/issues/detail?id=258064)


梳理清楚各个 js 执行的先后顺序。注意 chrome.webRequest 和 chrome.webNavigation 生命周期顺序。

`chrome://newtab` 页面 以 iframe 方式嵌入 xxx.com 页面、并且 注入 content_script 如果在 content_script 里访问 `chrome://newtab` 页面的 `window.xx` (即 `top.xxx`) 则会报错: Uncaught SecurityError: Blocked a frame with origin "https://xxx.com" from accessing a frame with origin "chrome-extension://pbcjojjclbiihmponegploiehianebdk". The frame requesting access has a protocol of "https". 同样 `chrome://newtab` 页面、因为跨域 也不能访问 iframe 里的 xxx.com 页面 window 对象。

override [newtab](https://developer.chrome.com/docs/extensions/mv3/override/) 后的页面是 chrome-extension://pbcjojjclbiihmponegploiehianebdk/blank.html 不能在此页面运行 `chrome.scripting.executeScript` why? https://bugs.chromium.org/p/chromium/issues/detail?id=1191971

chrome.webRequest 和 chrome.webNavigation 都不能获取到 HTTP [Response Body](https://stackoverflow.com/questions/18534771/chrome-extension-how-to-get-http-response-body)

chrome-extension 协议的链接，不能插入 content_scripts 可以直接调用 chrome api


[Overview of Manifest V3](https://developer.chrome.com/docs/extensions/mv3/intro/mv3-overview/)

manifest v3 的 csp 策略更加严格，不允许远程 cdn 资源加载。如下 v2 设置

```json
"content_security_policy": "script-src 'self' 'unsafe-eval' https://code.xx.com https://yy.com; object-src 'self'",
```

[mdn csp](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src)
[edge csp](https://learn.microsoft.com/en-us/microsoft-edge/extensions-chromium/store-policies/csp)

v3 中的 webRequest api 被废弃，改为使用 declarativeNetRequest 来处理请求。声明式 API 使用略微不便。


```js
// https://bytedance.feishu.cn/drive/me/ 页面的部分请求 403 错误，导致在 iframe 里显示不正常。
// 因为飞书代码里 window.parent 判断如果是在 iframe 里，会让 request headers 里的 x-csrftoken 设置失败。
const cookieStores = await chrome.cookies.get({ name: '_csrf_token', url: driveMeUrl });
console.log('cookieStores', cookieStores.value);
const res = await chrome.declarativeNetRequest.updateDynamicRules({
  removeRuleIds: [10],
  addRules: [
    {
      "id": 10,
      "priority": 1,
      "action": {
        "type": "modifyHeaders",
        "requestHeaders": [
          { "header": "x-csrftoken", "operation": "set", "value": cookieStores?.value || '' }
        ]
      },
      "condition": { "urlFilter": 'space/api', "resourceTypes": ["xmlhttprequest"] }
    }
  ]
});
console.log('dnres', res);

// 只返回 extensions 不会返回 app
chrome.management.getAll(data => {
  console.log('management', data.map(item => item.type));
});

chrome.webRequest.onBeforeSendHeaders.addListener(function (details) {
  var headers = details.requestHeaders;
  console.log('onBeforeSendHeaders', details);
  // v3 不能再修改 header 因为不能设置 blocking
  // 设置 iPhone UA
  // if (headers[i].name == 'User-Agent') {
  //   headers[i].value = 'iPhone ua';
  // }
  return { requestHeaders: headers };
}, { urls: ["<all_urls>"] }, ['requestHeaders']);

chrome.webRequest.onHeadersReceived.addListener(function(details) {
  var headers = details.responseHeaders;
  // remove the X-Frame-Options header to allow inlining pages within an iframe.
  // var header = headers[i].name.toLowerCase();
  // if (header == 'x-frame-options' || 'frame-options' || 'content-security-policy') {
  //   headers.splice(i, 1); // Remove header
  // }
  console.log('onHeadersReceived', details)
  return {responseHeaders: headers};
},
{ urls: ['*://*/*'], types: ['sub_frame'] }, ['responseHeaders']);

chrome.webNavigation.onDOMContentLoaded.addListener(function (details) {
  // 去广告
  console.log('onDOMContentLoaded', details)
}, { url: [{ hostContains: 'google.com' }] });

// programmatically injected content_scripts
// 注意：先注册到相应域 后让页面加载 才会执行先注册的 js
const rcs = await chrome.scripting.getRegisteredContentScripts();
const id = '1';
if (!rcs.find(item => item.id === id)) {
  await chrome.scripting.registerContentScripts([{
    id,
    allFrames: true,
    matchOriginAsFallback: true,
    // matches: ["<all_urls>", 'http://localhost/*'],
    runAt: 'document_start',
    // world 默认是 ISOLATED 改变设置会影响 chrome.runtime.sendMessage
    // world: 'MAIN',
    js: ['xx.js', 'content_script.js'],
  }]);
  // console.log('register success');
}

```

在 about:blank 定制页面的 iframe 里插入可执行代码

```js
// https://blog.csdn.net/qq_31201781/article/details/125218891
injectPageScript: (payload, cb = () => {}) => {
  if (!payload?.js) {
    return;
  }
  var iScript = document.createElement('script');
  // csp 限制不能 eval 代码
  // iScript.textContent = 'console.log(window);';
  // 需要在 manifest 里设置 web_accessible_resources 才能把 chrome-extension://*.js 注入到各个页面里
  iScript.setAttribute('data-type', 'hl_extension');
  iScript.src = chrome.runtime.getURL('injected.js');
  iScript.onload = function() {
    document.dispatchEvent(new CustomEvent('hl_extension_message', { detail: payload }));
    // iScript.remove();
    cb();
  };
  document.body.appendChild(iScript);
},

// injected.js
document.addEventListener('hl_extension_message', (event) => {
  // console.log('eddd', event.detail, event.path);

  // 这里的 window 和 content_script.js 里的 window 不是同一个。
  // console.log('hl_utils', window.hl_extension_data?.tabId, window.hl_utils);

  // console.log('pass obj', event.detail);
  window.hl_extension_data = event.detail?.hl_extension_data;

  eval(event.detail?.js || '');

  // eval 的函数字符串里 有 async 会报错。
  // eval(";(async () => {" + (event.detail?.js || '') + "})();");
  // ;(async () => {
  //   await eval(event.detail?.js || '');
  // })();
});

```


### 2021-2020 manifest.json v2

```json
{
  "name": "Block",
  "description": "把特定网络 js 文件指向到本地",
  "version": "0.2",
  "manifest_version": 2,
  "permissions": [
    "webRequest",
    "webRequestBlocking",
    "https://img.alicdn.com/tps/*"
  ],
  "browser_action": {},
  "background": {
    "scripts": ["bg.js"],
    "persistent": true
  },
  "content_scripts": [
    {
      "matches": ["*://*/*", "https://www.alipay.com/*", "<all_urls>"],
      "js": ["inj.js"],
      "css": ["content.css"],
      "all_frames": true,
      "match_about_blank": true,
      "match_origin_as_fallback": true,
      "run_at": "document_end"
    }
  ]
}
```
