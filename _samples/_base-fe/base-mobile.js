/*

------ 小程序/RN 2022

小程序的渲染层和逻辑层分别由2个线程管理：渲染层的界面使用了 WebView 进行渲染；逻辑层采用 JsCore 线程运行JS脚本。一个小程序存在多个界面，所以渲染层存在多个 WebView 线程，这两个线程的通信会经由微信客户端做中转，逻辑层发送网络请求也经由 Native 转发。
目的：安全可控，沙箱隔离，限制 DOM 和 BOM 能力。逻辑层和渲染层是独立的，二者不会互相阻塞，因此性能更优（小程序限制了 JS 操作 DOM 的能力，因此不用担心二者的不同步问题）在浏览器网页中，虽然 JS 执行和 UI 渲染也是处于两个线程，但是 JS 线程和 UI 线程是互斥的。

小程序采用的是混合架构，可通过 html 里的 a 标签启动新的 webview 窗口、调用 popWindow 关闭窗口。基本页面元素是 html 渲染，弹窗类 loading toast ActionSheet 和 本地存储、系统或用户信息，使用客户端原生实现。

而 react-native 只是采用 js/html 写法，背后完全是 客户端原生 渲染。
微信小程序和 RN 的区别：双线程架构，渲染层一个主要是 webview 一个完全 native。
微信的支付 小程序云等开放API、小程序安全管控。

小程序框架
- [taro](https://taro.aotu.io/)、[remax](https://github.com/remaxjs/remax)、[alibaba/rax](https://github.com/alibaba/rax)、[flutter](https://github.com/flutter/flutter)。
- 编译时：约定了一套自己的 DSL ，在编译打包的过程中，利用 babel 工具通过 AST 进行转译，生成符合小程序规则的代码。
  - 容易出现 BUG、开发限制过多、跟不上 react vue 更新。早期的 Taro 1/2 采用的这种方案。
- 运行时：在小程序的逻辑层中运行起来 React 或 Vue 的运行时，然后通过适配层，实现自定义渲染器。
  - 有天然优势，remax taro3 这样实现。

React component -> React Reconciler(调和器、实现了 Diff/Fiber 算法) -> React Renderer(可以是dom也可以是js对象等)。
跨端小程序框架 remax taro3 自己实现了一套可以在 React 中用的，且能渲染到小程序页面的自定义渲染器。
在 react reconciler resetAfterCommit 函数中、调用小程序的 setData 方法。
小程序环境中，不支持直接创建DOM、仅支持模板渲染，用递归模板的方式，用相对静态的小程序模板语言实现了动态的模板渲染的特性。

小程序 API
```js
const { Ali } = window;
const { isAlipay } = Ali;
window.AlipayJSBridge;
document.addEventListener('AlipayJSBridgeReady', callback, false);
Ali.httpRequest({ url: '', method: 'POST' }, (result) => {});
Ali.rpc({ operationType: '', requestData: [] }, (result) => {});
Ali.call('imageViewer', { enablesavephoto: true, images: [], init: index });
Ali.showLoading(param);
Ali.showToast({ content: '' });
Ali.showActionSheet({ content: '' }, (result) => {});
AlipayJSBridge.call('popWindow');
AlipayJSBridge.call('setTitle', { title: 'xxx' });
AlipayJSBridge.call('getSystemInfo', { }, (result) => {});
```
*/

/*
2012-2013 scroll touch

浏览器内核区别：手机系统官方浏览器、Chrome、UC、QQ、android控件里的webview、自己开发的APP里引用的 Webview，内核都不一样。

- 模拟滚动
  - iScroll 并没有监听原生`onscroll`事件，而是用 touch 事件模拟浏览器原生滚动效果。
  - 缺点：模拟的滚动结束后，不会自然触发“浏览器原生的滚动”，类似需求不容易满足。
- touch 事件 和 手势
  - 在某个元素的 touchmove 事件里如果有 e.preventDefault() 则会阻止包括 body 的整个页面滚动。
  - 手势是使用 touch 事件实现的，比如 https://github.com/hammerjs/hammer.js 。
  - 走马灯、下拉刷新、上拉刷新、Swipeable-Tabs、iOS swipe-to-show-actions 等都需要基于一个良好的“手势”库来实现。
- 原生 scroll 事件问题
  - ios 上 scroll 事件，只在 scroll 结束时触发（ios < 8），安卓会一直触发。
  - iOS < 8 pauses painting during scrolling.
  - 滚动过程中要「fixed标题栏」，在惯性滚动过程中不会触发 scroll 事件。
  - iOS惯性滚动 https://fe.ele.me/momentum-scrolling-on-ios/

移动端 scroll 事件只在滚动结束时触发，用 touchmove 事件代替。

scrollTop/Left 变化会 多触发一次 scroll 事件。参考
https://stackoverflow.com/questions/1386696/make-scrollleft-scrolltop-changes-not-trigger-scroll-event


touch-action: manipulation;
touch-action: none;
指针事件 (Pointer Events)：是一个新的 web 事件系列，相应的规范旨在使用一个单独的事件模型，
对所有输入类型，包括鼠标 (mouse)、触摸 (touch)、触控 (stylus) 等，进行统一的处理。
例如，你可以只去监听一个元素的 pointerdown 事件，无需分别监听其 touchstart 和 mousedown 事件。
有一个和点击延迟直接相关的实现 —— 一个名为 touch-action 的新 CSS 属性。
根据规范，touch-action 属性决定 “是否触摸操作会触发用户代理的默认行为。这包括但不限于双指缩放等行为”。
touch-action 的默认值为 auto，将其置为 none 即可移除目标元素的 300 毫秒点击延迟。
IE 11+ 可以用 touch-action: manipulation; 属性来阻止元素的双击缩放。

https://github.com/ftlabs/fastclick
Touch事件穿透，click事件被执行了两次：一次是touchend我们手动执行，一次是系统自建的click，这就是传说中的鬼点击 ghost-click 。
在 touchend 处阻止浏览器默认事件，避免 鬼点击，iOS 有效，android 无效。

*/

document.write('<pre>');
document.writeln(navigator.userAgent);
var isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/i.test(navigator.userAgent);
document.writeln('is iOS: ', isIOS);

var isWebView = typeof navigator !== 'undefined' && /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);
document.writeln('is WebView: ', isWebView);

// https://stackoverflow.com/questions/28795476/detect-if-page-is-loaded-inside-wkwebview-in-javascript
if (navigator.platform.substr(0,2) === 'iP') {
  //iOS (iPhone, iPod or iPad)
  var lte9 = /constructor/i.test(window.HTMLElement);
  var nav = window.navigator, ua = nav.userAgent, idb = !!window.indexedDB;
  if (ua.indexOf('Safari') !== -1 && ua.indexOf('Version') !== -1 && !nav.standalone){
    //Safari (WKWebView/Nitro since 6+)
    document.writeln('is UIWebView: false. is Safari');
  } else if ((!idb && lte9) || !window.statusbar.visible) {
    //UIWebView
    document.writeln('is UIWebView: true');
  } else if ((window.webkit && window.webkit.messageHandlers) || !lte9 || idb){
    //WKWebView
    document.writeln('is WKWebView: true');
  }
}

// -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
/* touch 和 mouse 事件 执行顺序
  Android: touchstart -> touchend -> mouseenter -> mousemove -> mousedown -> mouseup -> click
  iOS: touchstart -> touchend -> mouseenter -> mousemove
  iOS 上如果注册了 mousemove 或 mouseenter 那么 mouse down up 事件不会触发。
  touchMove 只在 touchstart 元素上触发；mouseMove 在当前鼠标位置上触发。
  touch 结束后不会触发 mouseleave 需要再点击一下元素外边 才会触发。
*/
// http://zeptojs.com/zepto.js
var startTime, m = false;
function log(msg) {
  $('body').append('<div>' + (new Date().getTime() - startTime) + ': ' + msg + '</div>');
}
$('#test').bind('click', function () {
  log('click');
}).bind('mousedown', function (e) {
  e.preventDefault();
  startTime = startTime || new Date().getTime();
  m = true;
  log('mousedown');
}).bind('mousemove', function (e) {
  e.preventDefault();
  log('mousemove');
  if (!m) return;
  log('mousemove con');
}).bind('mouseup', function () {
  m = false;
  log('mouseup');
}).bind('mouseenter', function() {
  log('mouseenter');
}).bind('mouseleave', function() {
  log('mouseleave');
}).bind('touchstart', function () {
  startTime = new Date().getTime();
  log('touchStart');
}).bind('touchmove', function (e) {
  e.preventDefault();
  log('touchMove');
}).bind('touchend', function () {
  log('touchEnd');
});


// 设置 `<meta name="viewport" content="width=device-width, initial-scale=1">` 后，Chrome 32+ on Android 和 iOS 10 都不会再有 300ms 延迟，可以不使用 fastclick。
// https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js
window.addEventListener('load', function() {
  var logId = 0;
  var tsTime;
  document.getElementById('btn').addEventListener('touchstart', function() {
    tsTime = new Date().getTime();
    // console.log(tsTime)
  })
  document.getElementById('btn').addEventListener('click', function() {
    // console.log(new Date().getTime())
    document.getElementById('log').innerHTML =
      logId++ + ' 点击延迟：' + (new Date().getTime() - tsTime);
  })
  FastClick.attach(document.body);
}, false);

// #d1, #d2 {width: 100%; height: 50px;position: absolute;z-index: 1;top: 0; left: 0;}
// #d1 {background-color: blue; color: #fff;}
// #d2 {background-color: red;color: #fff; width: 60%; height: 70px;}
// d2 在 d1 上边
var touchStartTime = 0;
var d1 = document.getElementById('d1');
var d2 = document.getElementById('d2');
function hideD2() { d2.style.display = 'none'; }
function log(text) {
  var console = document.getElementById('console');
  console.innerHTML += '<br />' + text;
}
d1.addEventListener('touchstart', function () {
  log('blue div: touchstart');
})
d1.addEventListener('touchend', function () {
  log('blue div: touchend');
})
d1.addEventListener('click', function () {
  log('blue div: click');
})
d2.addEventListener('touchstart', function () {
  touchStartTime = new Date().getTime();
  log('red div: touchstart');
  // hideD2();
})
d2.addEventListener('touchend', function () {
  log('red div: touchend, ' + (new Date().getTime() - touchStartTime));
  hideD2();
})
d2.addEventListener('click', function () {
  log('red div: click, ' + (new Date().getTime() - touchStartTime));
  // hideD2();
})
