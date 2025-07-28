---
layout: default
title: "日常学习记录"
show_title: false
permalink: /
---

# .

## js html css
> with 小程序/RN

------ js

- console.log(1_048_576) 这是 Numeric Separators 的语法，是 ECMAScript 2021（ES12）中的一部分
- https://evertpot.com/using-top-level-await-is-bc-break/

- 33-js-concepts https://github.com/leonardomso/33-js-concepts
- 只在行首字符是 `+ - [ ( /` 这5种情况下，加前置分号即可
- 原型链/闭包(匿名函数)？实现继承？new的原理实现？this指向改变(call/apply/bind)？null/undefined区别？事件代理(委托)？减少事件注册 节省内存。
- es6 常用哪些特性？ 变量最小作用域 es5 function, es6 let 块级。 var 变量提升(Hoisting)。 Map 和 WeakMap 区别。 Symbol generator。
- promise 跟 async/await 关系？ async 方法返回 promise 、是 promise 的语法糖。
- es6 generator？ es6 和 node 的 module 的区别？ fetch、xhr 优劣势
- ES 与 CommonJS modules 的区别
- 内存泄漏的几种情况？ https://blog.logrocket.com/escape-memory-leaks-javascript/
- WeakRef 的用处 https://www.reddit.com/r/Frontend/comments/1ato11w/will_the_event_listeners_be_removed_automatically/
- 在 es class 中的 箭头函数 比较慢，而且不在 原型链 上  https://medium.com/@charpeni/arrow-functions-in-class-properties-might-not-be-as-great-as-we-think-3b3551c440b1
- es6 modules 父子 module 的代码执行顺序、class 内外代码执行顺序。
- es6 WeakMap 能解决 jQuery data `$('xx').data()` 的问题.

- shim、sham 和 polyfill 之间的区别？ https://github.com/es-shims/es5-shim
  - es5-shim 完美模拟了所有 ES5 中可以被完美模拟的方法。就是说 ES5 中有些方法，是可以在旧 JS 引擎中完美模拟了，那么 shim 就完美模拟了它们。shim 不局限与浏览器环境，只要 JavaScript 引擎支持，代码即可运行。
  - es5-sham 只承诺你用的时候代码不会崩溃，至于对应的方法是不是起作用它就不保证了。如果你要用的方法在 shim 中都包含了，那么就不需要 sham。sham 能不引用就不引用。sham 依赖 shim。 IE8：只支持 ES3。

库/框架

- React16 / 17 / 18版本新特性 https://blog.csdn.net/momei1942/article/details/129699873
- React18: 并发控制的更好更灵活，定时器等异步函数setState批处理、Suspense 流式 html SSR、useTransition 延迟/过渡更新。
- 看过 框架或库 源码？ react 使用注意事项 https://github.com/mithi/react-philosophies  React 技术揭秘 https://react.iamkasong.com/

- react diff 原理？生命周期？受控组件和非受控组件？父组件和子组件的通信方式？render-props 高阶组件 (代替mixin及ref问题)？
- react 应用性能优化？列表 key / shouldComponentUpdate / PureComponent (父子组件 props state 不变时不render 为什么不建议用?) / memoization
- react setState 是同步的还是异步的? 异步。 子组件和父组件 componentDidMount 哪一个先执行？子组件先。
- prop 的变化 同步到 state 的方法？

- react 渲染器了解一下？ https://juejin.cn/post/6844903753242378248
- React Fiber 架构 https://xueshiming.cn/2021/05/08/React%20%E4%B9%8B%20Fiber%20%E6%9E%B6%E6%9E%84/
- React-Fiber 并发模式、区分任务优先级、调度协调 中断/恢复任务，浏览器60fps渲染 10毫秒自己执行 5毫秒空闲时间。

- react 需要遍历或修改 children，要使用`React.Children.forEach / React.Children.map` 方法，而不要用`Array.isArray(children) / children.forEach`等方法。
- setState 是异步的 [示例](https://stackoverflow.com/a/45249445/2190503) 会引起不必要的 render。
- [真实 DOM 和 react 虚 dom 讨论](http://www.zhihu.com/question/31809713)
  - dom 对象是很庞大的（上边有很多属性），其创建的开销比较大，已有的 dom 对象上做更新开销并不大，众多框架都在围绕此做优化，比如用`key`是否变化来判断对 dom 的操作是 “更新” 还是 “销毁重建”。 dom批量更新：dom操作如，1.删除一个元素，2.增加一个元素，3.在增加的元素上改变一个属性。如果用 dom-api，会有多次 repaints reflows 比较耗性能。 如果放到「虚拟 dom」上操作，会把这三个过程最终的结果，一次更新到实际 dom 树上，只用操作一次实际 dom。 virtual-dom 里一次 digest 中的 diff 只需一次，但是会随着 ui 的规模复杂度，性能损耗严重。

react hooks
- https://github.com/frontend9/fe9-library/issues/257
- 不优雅的 React Hooks https://zhuanlan.zhihu.com/p/455317250
- React Hooks 使用误区 https://zhuanlan.zhihu.com/p/450513902
- React Hooks 陷阱 https://mp.weixin.qq.com/s?__biz=MzIzMjcxNzE5MA==&mid=2247488097&idx=1&sn=e8a6d71d1c05c8be04c25b32af43fb09
- useLayoutEffect 和 useEffect 的区别 https://zhuanlan.zhihu.com/p/348701319
- [useReducer callback](https://github.com/facebook/react/issues/15344)

- react hooks 怎么把 props 里复杂对象（数据请求结果）的实时变化、”完全同步/只是初始化“ 更新到 state 中？
- react hooks useRef 用途？和“函数组件”外定义的变量区别？(类全局变量) 分别的执行时机？
- react hooks useMemo useCallback useReducer/redux 应用场景？
- react hooks useEffect 及其 return 函数的执行时机？子组件先执行？多个时执行顺序？怎么确保 dom 先增加成功 (setTimeout)？

[redux](https://redux.js.org/) 概念
- 为什么是 企业级前端开发框架？ 实现 双向绑定 的原理？
- 单双向数据流区别？https://pomb.us/build-your-own-react
- data-flow, 不可变的数据更新模式 immutable-update-patterns.
- actions 其实就是 mutations，即 ui 或者 server 的 response.
- action creator 调用 dispatcher (passive pub-sub systems) 传递 mutations.
- store 监听 actions 再去 mutate data (只有store能决定怎么更新数据).
- component 监听 store, 获取需要的数据.
redux 基本流程
- 为什么用单一的 store? 子组件 connect 后可使用 store 了？ context。 immutable-js ？ immerjs
- redux-saga 典型流程:  form 表单提交，触发 FORM_POST action，saga 里 `yield put` POST_SUCCESS 触发 action，改变页面状态或拉取新数据，触发 UI CHANGE 的 action，过程中用 `yield select` 从 state 里选取需要的参数。
[Reactive programming vs Passive programming](https://vaibhavgupta.me/2017/12/31/reactive-programming-vs-passive-programming/)

redux / umi 2018
- 框架的“双向绑定”意思是 view -> state -> view 变化的绑定，而不是 state1 <-> state2 变化的绑定、同样功能的 state 只用定义一个、有多个就会导致 state 变更检测的死循环。
- umi 某个 router 多处复用方案 [umi/1830](https://github.com/umijs/umi/issues/1830)、[umi/4569](https://github.com/umijs/umi/issues/4569)
- subscriptions 怎么获取到 model 中的 state [issues/1600](https://github.com/dvajs/dva/issues/1600)
- 多个请求并行发起 [redux-saga/issues/1800](https://github.com/redux-saga/redux-saga/issues/1800)、[redux-saga/pull/759](https://github.com/redux-saga/redux-saga/pull/759)、[dva/issues/1009](https://github.com/dvajs/dva/issues/1009)
- 如何请求多个数据源并渲染？如[图](https://img.alicdn.com/imgextra/i4/O1CN0150J8CS26jHFosJFF4_!!6000000007697-2-tps-476-266.png)



------ html css

cssinjs https://mp.weixin.qq.com/s/cepGi8Jhe4RnyfNaoN_zfw
react19 cssinjs 问题 https://juejin.cn/post/7359876671137071156
探索：业务中推行 tailwindcss 和 emotion，设计上 design token 抽象。
2024-10 cssinjs

- html 规则检测 https://validator.w3.org 、 http://infohound.net/tidy
- html head 里的 js css 如何放置  head 里能放什么 https://github.com/joshbuchea/HEAD
- iframe 有哪些问题 https://afantasy.ninja/2018/07/15/dive-into-iframe
  - 高度改变麻烦、弹框、iframe 里再嵌套 ifr。
  - 移动端页面、打开(全屏)嵌入的 iframe 页面，点浏览器返回、返回不到业务页面、需要销毁 iframe。
  - 浏览器刷新 iframe url 状态丢失、后退前进按钮无法使用。
  - 里边 弹出框 的位置、难居中，浏览器 resize 时自动居中 更难处理。
  - 主文档和 iframe 文档如果不同域、免登录处理麻烦，涉及 cookie 透传。
  - 需要完全重新加载，比较慢。
  - iframe 自适应高度：给定高度、内部滚动
- div/span 都是容器元素， p dt 标签里不能有块(block)标签， button 里面不要嵌套 a 标签。
- img script 的 src、css 的 href 都不能为空。 DOM 的 attribute 和 property 区别。
- a 伪类需遵循 css2 规范中的 L-V-H-A (a:link visited hover active) 顺序。
- 没有 css-parent-selector 。 BEM命名方式。  如何提升 CSS 选择器性能 http://www.jianshu.com/p/268c7f3dd7a6

- [anchor-positioning-api](https://developer.chrome.com/blog/anchor-positioning-api?hl=zh-cn)
- CSS 选择器优先级(id>class>标签>伪类)？伪类和伪元素区别？BFC/IFC 介绍？
- 浮动以及清除浮动？页面布局方法？flex一维 CSS Grid 二维。元素垂直居中方法？
- border-box 作用？display/position 作用(absolute会变为块元素)？z-index 在节点 position 值是什么生效(relative/absolute/fixed)？
- 子元素的 margin-top 设置影响父元素位置？页面兼容性问题？响应式布局怎么实现？
- CSS优化方法？减少DOM操作，减少重绘和重排，合理使用选择器，减少@import使用。
- h5高清方案(rem) 优缺点？ css 实现 loading，三角形？ css-module 的作用？ css 样式初始化为了什么？
- https://www.iconfont.cn/
- css 时间函数 http://www.smashingmagazine.com/2014/04/15/understanding-css-timing-functions
- css 长度 https://css-tricks.com/the-lengths-of-css
  - 绝对长度: px inch cm mm。 rem: 相对 root 的 font-size 大小  em: 基于大写字母 M 的尺寸  ex: 基于 x 字母高度  1vh 等于 1/100 的视口高度


browser

- [URL 编码，为什么要编码？](http://anjia.github.io/2015/04/15/jsURIEncode/)
- 浏览器在自动选择编码方式的时候不会优先根据 html 源码中的所展示的`<meta charset="utf-8" />`代码来决定选择什么编码方式，而是优先根据“响应标头-response header”中的键为“Content-Type”的值来自动选择判断。
- [ua 检测](https://github.com/ded/bowser) / [特性检测](https://github.com/barisaydinoglu/Detectizr)
- 浏览器解析和CSS（GPU）动画优化 https://segmentfault.com/a/1190000008015671
  - css 动画中尽量只使用 transform 和 opacity ，这不会发生重排和重绘。
  - 有动画的元素样式，给定尺寸、设置为 display block（如果设置 display flex 子元素尺寸会动态变化、影响动画效果）
- [WebAssembly](https://juejin.im/entry/5b20d09d6fb9a01e242490b1)
  - 不是一门编程语言，而是一份字节码标准。 各种复杂的计算：图像处理、3D运算(大型 3D 网页游戏)、语音识别、音视频编码解码。区块链合约。
  - [madewithwebassembly](https://madewithwebassembly.com/)、eBay 的[条形码扫描](https://www.infoq.cn/article/vc*q7psQqWMaVU8igJeD)、 [Google earth web](https://earth.google.com/web/) 版、 [autocad](https://web.autocad.com/login) web 版
- [PWA](https://developers.google.com/web/progressive-web-apps/)
  - Service Worker 需要运行于 HTTPS 或本地 localhost 环境，是继 Web Worker 后又一个新的线程。来实现离线页面功能。 Service Worker 是独立于页面的一个运行环境，它在页面关闭后仍可以运行。Web Worker 在页面关闭后不再运行。
- https://developer.chrome.com/blog/introducing-popover-api/   Web Authentication 在Web上使用Touch ID 和 Windows Hello 登录
- xss/csrf 原理和防御方法。CORS 的 POST 跨域如何带cookie https://www.jianshu.com/p/13d53acc124f
- 浏览器 eventLoop 机制 microtask marcotask 执行顺序？setTimeout 宏队列先执行，promise 微队列。
- 优化：压缩资源、异步加载、预加载、缓存、使用gzip、减少cookie、减少重定向、减少请求数。

- JSONP 的原理以及 cors 怎么设置？跨域的方法有哪些？jsonp、 iframe、window.name、window.postMessage、服务器上设置代理页面。
- web worker 突破同源限制？importScripts。 不好地方:(协程)解决并行计算，数据共享和精确控制线程生命周期方面存在缺陷。
- SPA 实现方法？产生的问题：切换路由后会把上个路由状态生成的html全部销毁掉，再切回来恢复不到原来的样子。客户端渲染和服务端渲染，哪个快？
- 移动: 点击穿透/300ms延迟？Fastclick。首频渲染、网络性能？手势库？有没有用过RN PWA？
- 数据可视化: 3d 编辑器功能？技术点 svg 3dgis canvas webgl，svg 转 webgl 怎么实现？

drag-drop
- drag 事件 不支持 ie8、Safari 5.1  ie<=9 只能对 a href="" 、img、文本 添加drag事件。 ie9上通过 selectstart hack方法对任何元素添加事件。 在ie<=8版本上，需要把dragenter/drageover/drop事件绑定到具体的元素上，而不能绑定到document做委托处理。
- 使用 drag-drop API的优势（相对于用mousedown/mousemove）： 如果拖动元素所在的容器尺寸小，拖动过程产生滚动条、会自动触发滚动条移动。 不用再 clone 出一个要拖动的元素； 不用计算涉及到的元素的位置和尺寸。
传统拖动做法
- 在 touchstart / mousedown 中记录起始位置，并开始监听 touchmove touchend / mousemove mouseup
- 在 touchmove mousemove 中计算当前位置和起始位置之间的 offset，并进行拖拽操作
- 在 touchend mouseup 中取消监听 touchmove 和 touchstart，并进行释放操作


------ 小程序/RN

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




## 搭建 文档/图

------ 搭建

[去哪儿网前端代码自动生成技术实践](https://mp.weixin.qq.com/s/Jhs2dAvFHbaaP1OKjB0c6w)
https://docmost.com/

[阿里低代码引擎LowCodeEngine正式开源](https://mp.weixin.qq.com/s/rQ-X9OBFRvhI16KrWwIT6w)
[官网](https://lowcode-engine.cn/)、[github](https://github.com/alibaba/lowcode-engine)

https://www.wix.com/
https://soloist.ai/

[无代码nocobase](https://cn.nocobase.com/) [博客](https://blog-cn.nocobase.com/posts/nocobase-opensource-income-3years/)

[网易云音乐低代码体系建设思考与实践](https://mp.weixin.qq.com/s/9yo-Au3wwsWErBJfFjhxUg)

[从实现原理看LowCode](https://zhuanlan.zhihu.com/p/452251297)

https://github.com/imcuttle/mometa
[百度amis](https://baidu.github.io/amis/)
https://aisuda.bce.baidu.com/amis

AECP 开发平台架构 https://img.alicdn.com/imgextra/i2/O1CN01VFIoNq1E0PCIklFol_!!6000000000289-2-tps-2482-1410.png

[2020/01/13/the-no-code-delusion](https://www.alexhudson.com/2020/01/13/the-no-code-delusion/)、[无代码编程介绍](https://mp.weixin.qq.com/s/eKvSxOvSyEZEr3BLloCXdw)
[antd-lowcode](http://g.alicdn.com/code/npm/@ali/antd-lowcode/0.5.1/example/index.html)

Markdown + 卡片 [可视化搭建](https://zhuanlan.zhihu.com/p/164558106)、
宜搭、[云凤蝶](https://www.yunfengdie.com/home)、[阿里云外网建站](https://ac.aliyun.com/jianzhan)。微软 Power [Platform](https://yuque.antfin-inc.com/chenyu/articles/skei6i)。AWS [honeycode](https://www.honeycode.aws/)、[mendix](https://www.mendix.com/)。

[SaaS行业导航](http://www.allsaas.cn/)、SaaS 平台：[氚云](https://h3yun.com/index.php?g=Chuanyun&m=Scene&a=index)、[搭搭云](https://www.dadayun.cn/)、[明道云](https://blog.mingdao.com/13061.html)、[appsheet](https://www.appsheet.com/)、[fibery](https://fibery.io)、[openchakra](https://openchakra.app/)、[tumult](https://tumult.com/)(YC投资)

[grapesjs](https://grapesjs.com/)、[noflojs](https://noflojs.org/)、[pagedraw](https://pagedraw.io/)、Google Web Designer (类似 Dreamweaver) 2013 发布 2017 停止更新。

[What's Salesforce?](https://tryretool.com/blog/salesforce-for-engineers/) 、Salesforce [Lightning](https://www.salesforce.com/cn/campaign/lightning)

云上[编排](https://blog.csdn.net/devcloud/article/details/93175186)([cloudcraft](https://app.cloudcraft.co/)/阿里[ros](https://cn.aliyun.com/product/ros)/华为云[aos](https://www.jianshu.com/p/2301a1729fcc)/[Terraform](https://blog.csdn.net/yejingtao703/article/details/80574363)/[PAD图](https://baike.baidu.com/item/PAD%E5%9B%BE))、[图编排(](https://www.atatech.org/articles/170866)[相关](https://www.atatech.org/articles/174875/))

GUI 研发：[umi-ui](https://umijs.org/guide/umi-ui.html)、[angular-console](https://angularconsole.com/)

表单: [formily](https://github.com/alibaba/formily)、[build forms from JSON Schema](https://github.com/mozilla-services/react-jsonschema-form)、[react-final-form](https://github.com/final-form/react-final-form)、[AForm模型驱动生成表单](http://xiehuiqi220.github.io/AForm/doc/book/index.html)。



------ 文档 / 图

https://github.com/yshavit/mdq

https://affine.pro/ (字节刘义)

2020-11 孟方(游圣) [aliyun/cadt](https://www.aliyun.com/product/developerservices/cadt)

Roam Research [介绍](https://www.zhihu.com/question/384453977)、[介绍1](https://baijiahao.baidu.com/s?id=1669749949965240303)、[foam](https://foambubble.github.io/foam/)

https://github.com/thinkerchan/notion2md
​[Notion 编辑器原理](https://zhuanlan.zhihu.com/p/359122473)、[腾讯在线 Excel 技术](https://mp.weixin.qq.com/s/f1vwzuPryc8ag6nd5Ngr5A)
[语雀 实时保存 方案](https://klab.yuque.com/docs/share/0e3ee249-d977-492b-82f2-6b44d26bd4af) (平侠/遇春 2021-01)、[语雀后端技术](https://mp.weixin.qq.com/s/VM61gkZuYYqE4pVhpba3nQ)、[隆昊《富文本编辑器的技术演进》](https://myslide.cn/slides/21863)、[有道云笔记富文本编辑器技术演进](https://mp.weixin.qq.com/s/9gDI1r9aAu6dHJhXg34eIg)。

[飞书在线文档协同](https://mp.weixin.qq.com/s?__biz=MzkzNTIwNTAwOA==&mid=2247496795&idx=1&sn=5edf65ebf8609ada7981a9a804b072d3)、
实时协作技术 [ot-vs-crdt](https://www.tiny.cloud/blog/real-time-collaboration-ot-vs-crdt/) / [xi-editor-CRDTs](https://xi-editor.io/docs/rope_science_08.html) /
[are-crdts-suitable](https://blog.kevinjahns.de/are-crdts-suitable-for-shared-editing/)、
[vs code 多人协作](https://docs.microsoft.com/en-us/visualstudio/liveshare/reference/connectivity)、
[CKEditor 多人协作](https://ckeditor.com/collaborative-editing/)、
[automerge](https://github.com/automerge/automerge)、
[crdt](https://wiki.nikitavoloboev.xyz/distributed-systems/crdt)。

[文档协同的三元结构-浩初](https://www.yuque.com/docs/share/92faca9c-2162-4fe2-974d-193164650b11)、[resume生成](https://github.com/visiky/resume)

阿里云[媒体管理](https://help.aliyun.com/document_detail/63273.html)、
[微软](https://support.microsoft.com/en-us/office/embed-a-presentation-in-a-web-page-or-blog-19668a1d-2299-4af3-91e1-ae57af723a60)、
[Google/微软](https://gist.github.com/tzmartin/1cf85dc3d975f94cfddc04bc0dd399be)、
Google [示例](https://docs.google.com/viewer?embedded=true&url=http%3A%2F%2Fhomepages.inf.ed.ac.uk%2Fneilb%2FTestWordDoc.doc)、
转换 [sheetson](https://sheetson.com/)

生成/查看 PPT:
[PptxGenJS](https://github.com/gitbrent/PptxGenJS)、
[apache_poi_ppt](https://www.w3cschool.cn/apache_poi_ppt/apache_poi_ppt_presentation.html)(java)、
[nodeppt](https://github.com/ksky521/nodeppt)。
[ViewerJS](https://github.com/webodf/ViewerJS)、
[office sdk](https://www.pdftron.com/office-sdk/office-document-viewer/)。

微软: [office](https://products.office.com/zh-cn/home) ([task](https://techcommunity.microsoft.com/t5/microsoft-365-blog/connecting-tasks-experiences-across-microsoft-365/ba-p/1522069))、[teams](https://teams.microsoft.com/)

Google: [gsuite](https://gsuite.google.com/) ([google-forms](https://docs.google.com/forms/u/0/)/[教程](https://youtu.be/RoA65-vLV_0)) [alerts](https://www.google.com/alerts) [classroom](https://classroom.google.com/h)

[notion](https://www.notion.so/)、[craft.do](https://www.craft.do/)、[airtable](https://airtable.com/)、[quip](https://quip.com/about/product)、[coda.io](https://coda.io/t/Welcome-to-Coda_tvbBdpE72Lq#)、slack。 [wolai](https://www.wolai.com/) ([介绍](https://www.zhihu.com/question/407132273/answer/1352638849))。 [mathigon](https://mathigon.org/)(互动教程)。

腾讯文档 [docs.qq.com](https://docs.qq.com/desktop/)、
头条 [larksuite](https://www.larksuite.com/) ([lark 出海](https://zhuanlan.zhihu.com/p/58585005))、
[teambition](https://www.teambition.com/)、[wps](https://www.wps.cn/) (稻壳模板[docer](http://www.docer.com/))、
[xiezuocat](https://xiezuocat.com/#/)(AI纠错)、[sheetui](https://sheetui.com/)(表格转网页)、[Luckysheet](https://github.com/mengshukeji/Luckysheet)、[handsontable](https://handsontable.com/)、[prezi](https://prezi.com/dashboard/next/#/presentations)、[milanote](https://app.milanote.com/1KeUXu1ElqNVrw/home)、

产品设计工具:
白板([mural](https://mural.co/)、[miro](https://miro.com/))、
原型([xiaopiu](https://www.xiaopiu.com)、[xiaopiu/prd](https://www.xiaopiu.com/prd)、[justinmind](https://www.justinmind.com/))、[知乎](https://www.zhihu.com/question/23004570)([invision](https://www.invisionapp.com/)、[modao](https://modao.cc/)、
[会议桌](https://www.huiyizhuo.com/))、[流程图和图表](https://zhuanlan.zhihu.com/p/111990866)、在线[培训工具](https://segmentfault.com/a/1190000021793283)。

其他: [mubu](https://mubu.com/)、[slides.com](https://slides.com/)、[ppt.baomitu](https://ppt.baomitu.com/)、[zoho](https://www.zoho.com/)、[visme](https://www.visme.co/templates/)、[deckdeckgo](https://deckdeckgo.com/)、[witeboard](https://witeboard.com/)、[wireflow](https://wireflow.co/)、[presenta](https://play.presenta.cc/#s0)。
[batnoter](https://github.com/batnoter/batnoter)
https://evernote.com


--- 画图 (web/客户端)

如何画好一张架构图？ atatech/articles/173778
流程图  https://baike.baidu.com/item/%E6%B5%81%E7%A8%8B%E5%9B%BE
八种常见的业务设计和架构模型 https://www.sohu.com/a/384776040_246648
B端产品设计3大流程图 http://www.woshipm.com/pd/3873765.html
海兔设计系统 DSM yuque.antfin-inc.com/afx-es/data-ai/weekly-2020-05-16
软件设计/业务设计/流程图/架构图/UX设计/BPMN/脑图
https://online.visual-paradigm.com/diagrams/templates/brainstorming

https://tldraw.dev/
[SVG-to-Canvas (canvas-to-SVG) Parser](https://github.com/fabricjs/fabric.js)
[skeditor](https://github.com/skeditor/skeditor) [canvaskit-wasm](https://zhuanlan.zhihu.com/p/432454443)

[figma](https://www.figma.com/) ([FigmaToCode](https://github.com/bernaferrari/FigmaToCode))
[figma 技术](https://madebyevan.com/figma/) /
[figma c++](https://madebyevan.com/figma/building-a-professional-design-tool-on-the-web/) /
[figma 插件技术](https://zhuanlan.zhihu.com/p/357724347)
[react-sketchapp](https://github.com/airbnb/react-sketchapp)

[excalidraw](https://github.com/excalidraw/excalidraw)、
[drawio](https://github.com/jgraph/drawio)([mxgraph](https://github.com/jgraph/mxgraph))、[vscode-drawio](https://github.com/hediet/vscode-drawio)、
[plantuml](https://plantuml.com/zh/)、[planttext](https://www.planttext.com/)、
[cloudskew](https://www.cloudskew.com/)、[diagram-js](https://github.com/bpmn-io/diagram-js)、
[diagram.codes](https://www.diagram.codes/)、[mermaid-js](https://github.com/mermaid-js/mermaid)、[nomnoml](https://github.com/skanaar/nomnoml)、
[visjs](https://github.com/visjs)([timeline](https://visjs.github.io/vis-timeline/examples/timeline/))、[react-diagrams](https://github.com/projectstorm/react-diagrams)、
[roughjs](https://roughjs.com/)、[rete.js/](https://rete.js.org/#/)[flume](https://flume.dev/)/[nodered](https://nodered.org/)(可视化节点)、[diagrams](https://github.com/mingrammer/diagrams)([graphviz](https://www.graphviz.org/))、
[text-to-diagram](https://smusamashah.github.io/text-to-diagram)、
[reactflow](https://reactflow.dev/)。
废弃: diagram-maker

平台/端: [processon](https://www.processon.com/)、visio、mindnode lite、[visual-paradigm](https://online.visual-paradigm.com/diagrams/features/aws-architecture-diagram-tool/)、[ithoughts](https://www.toketaware.com/ithoughts-osx)、[gliffy](https://www.gliffy.com/)、[terrastruct](https://terrastruct.com/)、[edrawsoft](https://www.edrawsoft.cn/)、[freedgo](https://www.freedgo.com/)、[websequencediagrams](https://www.websequencediagrams.com/)、[chartmage](http://chartmage.com/intro.html)、[thebrain](https://www.thebrain.com/)、[asciiflow](https://asciiflow.com/#/)([textik](https://textik.com/#9fe9a0bacdcf4a9a))、[omnigraffle](https://www.omnigroup.com/omnigraffle/)、[flowchart](https://flowchart.fun/)、[photopea](https://www.photopea.com/)​、[PPTist](https://github.com/pipipi-pikachu/PPTist)

收费: [isoflow](https://isoflow.io/)、[gojs](https://gojs.net/latest/samples/index.html)、[jointjs](https://www.jointjs.com/)、[jsplumbtoolkit](https://jsplumbtoolkit.com/)、[yworks](https://www.yworks.com/products/yfiles/demos)、[mindfusion-diagram](https://mindfusion.eu/javascript-diagram.html)、[jsplumb](https://github.com/jsplumb/jsplumb)

系统: [drawio-aws-cloudcraft](https://www.diagrams.net/blog/drawio-aws-cloudcraft)、([placeholder](https://www.diagrams.net/blog/placeholder-scope)、[mermaid](https://www.diagrams.net/blog/mermaid-diagrams)、[network](https://www.diagrams.net/blog/network-diagrams)、[org](https://www.diagrams.net/blog/org-charts))



## 测试 监控

https://httparchive.org/reports/page-weight
语言性能 jsperf / benchmarks https://jsben.ch/browse
[heavy tasks on the main thread](https://github.com/astoilkov/main-thread-scheduling)

Headless BI https://cube.dev/
https://github.com/GoogleChromeLabs/quicklink
https://superset.apache.org/

ICBU前端性能度量 https://mp.weixin.qq.com/s/XAdNOovCQxh5xuGVOSEz3w

https://web.dev/articles/vitals?hl=zh-cn
[Web vitals](https://www.cnblogs.com/constantince/p/15237915.html)、
[thresholds](https://web.dev/i18n/en/defining-core-web-vitals-thresholds/)、
[Chrome的First Paint触发的时机探究](https://cloud.tencent.com/developer/article/1124484)、
[window.onload vs document.onload](https://stackoverflow.com/questions/40193553/load-event-on-script-with-async-and-or-defer)

[如何根治 Script Error.](https://mp.weixin.qq.com/s/6v_X0vtM5EZThF0odwJmTw)
[JavaScript Errors Handbook](https://github.com/mknichel/javascript-errors/blob/master/README.md)、
[如何捕获前端错误](https://mp.weixin.qq.com/s/E51lKQOojsvhHvACIyXwhw)、[搞定前端错误捕获和上报](https://juejin.cn/post/7031876097390149645)、[错误监控总结](https://segmentfault.com/a/1190000014672384)

为什么大厂前端监控都在用GIF做埋点？ https://mp.weixin.qq.com/s?__biz=MzAxODE4MTEzMA==&mid=2650099077&idx=1&sn=813d2c96cd940dc95b0f47585b989c2f

AEM [表单分析](https://img.alicdn.com/imgextra/i3/O1CN01x1xSNj26XMy1xUikf_!!6000000007671-0-tps-2934-1678.jpg)
AEM: 稳定性(脚本/接口/资源异常)、流畅性(加载/卡顿/动画掉帧)、用户流量(pv uv 活跃用户 新用户/点击率 点击热点 / 停留黏性/来源去向/设备)、行为分析(页面流/操作流/留存跳失率/访问链路/表单分析)、满意度(问卷/反馈/录屏/主观分析)。告警/多维指标(用户纬度年龄性别籍贯)/自定义看板/乐高搭建报表页。

[chrome-performance-devtool](https://github.com/Sanotsu/web-beginner/blob/master/documents/11-others/web-base-chrome-performance-devtool.md)
Google [lighthouse](https://developers.google.com/web/tools/lighthouse/)、类似服务 [web.dev/measure](https://web.dev/measure)、[webpagetest](https://www.webpagetest.org/)、[pagespeed insights](https://developers.google.com/speed/pagespeed/insights/)

arms / quick a+ / spm / aplus / retcode / clue。

arm aem 对任何请求（包括图片）都做埋点，导致业务接口被阻塞，页面性能下降一倍。采用合并、延迟上报埋点方式，把所有打点请求都延迟推入单独的队列维护，当页面完全加载完成后再从队列中依次取出数据进行上报。下掉非必要埋点。
2022-01~04

性能和体验 2020
弹窗 modal 里高度需要设置、内容长时“内滚动”。
一行多列 card 卡片，每个卡片 高度需要设置成一样。
某个操作 触发多次 ajax 请求、再 setState 页面，导致卡顿？
一个页面有多个“富文本实例”同时初始化、比较耗时？导致页面卡顿？


[iceworks-doctor](https://marketplace.visualstudio.com/items?itemName=iceworks-team.iceworks-doctor)
[vscode-codemetrics](https://marketplace.visualstudio.com/items?itemName=kisstkondoros.vscode-codemetrics)

[jsinspect](https://github.com/danielstjules/jsinspect)、
[jscpd](https://github.com/kucherenko/jscpd)
[代码圈复杂度Cyclomatic Complexity](http://kaelzhang81.github.io/2017/06/18/%E8%AF%A6%E8%A7%A3%E5%9C%88%E5%A4%8D%E6%9D%82%E5%BA%A6/)

[研发效能度量引发的血案](https://mp.weixin.qq.com/s/h9zIg2e8iHn3qgxlUGObbQ)、
[10 倍程序员神话](https://www.simplethread.com/the-10x-programmer-myth/)、
[代码质量](https://stackoverflow.blog/2021/10/18/code-quality-a-concern-for-businesses-bottom-lines-and-empathetic-programmers/)


------ 测试

https://code.visualstudio.com/docs/copilot/guides/test-with-copilot
https://docs.github.com/zh/copilot/using-github-copilot/guides-on-using-github-copilot/writing-tests-with-github-copilot
2025-06-05 使用 GitHub Copilot 编写测试

前端应用各类测试区别 https://kentcdodds.com/blog/static-vs-unit-vs-integration-vs-e2e-tests
https://kentcdodds.com/blog/why-i-never-use-shallow-rendering
https://kentcdodds.com/blog/avoid-the-test-user
已废弃 https://enzymejs.github.io/enzyme/
2025-05-30

目前最流行的前端开发的测试框架工具有哪些?
https://chatgpt.com/c/68371d58-3420-8008-8991-9b2df8b537a8
2025-05-28


--- 工具

静态分析与代码质量工具：SonarQube、CodeClimate 等，有助于在构建前发现问题，减少后续测试和修复时间。
[SonarQube](https://docs.sonarsource.com/) Codeowners

https://github.com/jsdom/jsdom
https://github.com/mobile-dev-inc/Maestro
https://lightpanda.io/

CI/CD、JS 覆盖率工具 [istanbul](https://istanbul.js.org/)。
测试-漏测率。 阿里MTC无线测试中心、蚂蚁云测平台[Solomon]

基础理论:
[前端测试体系建设与最佳实践](https://mp.weixin.qq.com/s?__biz=MzI5MjYyODYyNQ==&mid=2247483987&idx=1&sn=132aea5d5185a1e4fa2fab5037a2fb3e)、
[测试金字塔](https://martinfowler.com/bliki/TestPyramid.html)

[codecov.io](https://codecov.io/) 覆盖率分析对比工具 支持所有语言，对 GitHub commit 的覆盖率做记录、前后对比。

[代码测试覆盖率分析](https://blog.rsuitejs.com/2017/08/20/test-coverage/)
Statements 与 Lines 的区别：一行可能有多个语句

[百分百测试覆盖率真的有意义吗？](https://www.zhihu.com/question/29528349)
各种 corner cases(比如除0、IO error handling) 很难做到 100% 覆盖。 覆盖率数据只能代表你测试过哪些代码，不能代表你是否测试好这些代码。 不能盲目追求代码覆盖率，而应该想办法设计更多更好的案例，哪怕多设计出来的案例对覆盖率一点影响也没有。


--- E2E测试 2024-02

自动化测试 https://github.com/puppeteer/puppeteer / https://www.selenium.dev/
https://livebook.manning.com/book/unit-testing/chapter-1/
我们为什么需要单元测试？ https://mp.weixin.qq.com/s/F60MjrCnNsFmZV9jT75AVg

TDD(Test-Driven Development)很强大，但不一定适用所有的团队，推广难度很大，学习曲线很高。
TDD事实上由两个方面组成：测试先行，以及演进式设计；测试先行是非常重要的工程实践，做不到TDD，可以做到测试先行。在Kent Beck的经典名著《解析极限编程》中，提到：尽早测试，经常测试，自动测试！测试先行的本质能力要求是接口的设计能力——能否清晰的定义出设计单元的边界。
什么是有效的单元测试？一味追求代码覆盖率，往往写出无效的单元测试。一个测试应当只检查一件事。避免条件逻辑。不要写永不失败的测试。避免冗余测试。避免Mock不确定的依赖：时间、随机数、并发性、基础设施、现存数据、持久化、网络等等。
可测试的代码和设计：使用new要当心；避免构造函数中包含逻辑；避免复杂的私有方法；组合优于继承；可测试的代码是否违背了SOLID中的开闭原则？可测试的代码就是解耦了的代码；可测试的代码帮助我们实现更好的抽象。
在实现测试金字塔时，你也应该牢记这两条基本法则：
1. 如果一个更高层级的测试发现了一个错误，并且底层测试全都通过了，那么你应该写一个低层级测试去覆盖这个错误；
2. 竭尽所能把测试往金字塔下层赶；
任何测试，如果它的运行速度不快，结果不稳定，或者要用到被测试单元的一个或多个真实依赖，就是集成测试。 集成测试不够稳定，运行时间长等问题，如果不做隔离，日常开发浪费时间和精力维护，最后导致开发人员不再信任测试。
把单元测试当成是“一等公民”，在Code Review的过程中，互相学习、分享最佳实践，消除无效的单元测试。
愿意主动增加单元测试来保护自己的代码，那么单元测试这件事就算比较成功了。
关于单元测试这件事，我觉得最重要永远是写单元测试的人，优秀的团队文化非常重要，没有什么能够真正衡量单元测试做的好坏，有的只是程序员的职业操守。
<如何写出有效的单元测试> https://mp.weixin.qq.com/s/U6z-sjb29luOI3E6pE9kMw

TDD 更适合配合单元测试，更适合通用组件/工具函数和纯函数库，比如 lodash、aHooks、ant-design等。
BDD(Behavior-Driven Development) BDD思想就是写单元测试就像写产品需求，而不关心内部逻辑，每一个用例阅读起来就像一篇文档。更适合配合集成测试，测试关键业务流程代码。
- 因为以功能性的集成测试为主，因此不是那么关注每个函数功能，测试覆盖率比较低
- 难保证代码质量，没有 TDD 那么严格的保证代码质量，极端边界条件难覆盖
<内网>

测试金字塔的历史可以追溯到2009年。随着技术的快速发展，人们在应对不同的开发需求时，也可能需要不同的测试模型。由Kent C. Dodds提出的测试奖杯(https://twitter.com/kentcdodds/status/960723172591992832)就是一种针对前端开发所构建的测试模型。与金字塔相比，单元测试处于次要地位，而且可以被ESLint和JSHInt等静态测试工具所取代。它们通过扫描代码，便可发现诸如：使用了不安全的语句、或未遵守变量命名规则等潜在问题。
https://www.testingjavascript.com/
<测试金字塔模型全解析> https://www.easemob.com/news/8530  英文 https://dzone.com/articles/the-testing-pyramid-how-to-structure-your-test-sui

覆盖率是金字塔的核心，底层是最宽的，象征着UT覆盖率应该是最高的，越往上越低，这一点大家都能达成共识。但是有一点需要注意的是，每网上一层应该是对下面一层覆盖率的一个补充。简单说集成测试应该聚焦于UT不好覆盖的场景或者UT采用mock方式测试的场景，而顶层的UI自动化应该聚焦于整个流程的集成测试，覆盖集成测试和UT难以覆盖到的场景。
<测试金字塔是什么> https://juejin.cn/post/7216626919772225573

唯一可以真正验证应用程序可行性的测试，只有E2E测试。因为它需要用线上真实的数据进行测试，所以它不仅涉及到前端，还涉及到后端。除了E2E外的测试方式都是通过Mock数据来实现。
你的应用程序在与最终用户（浏览器）相同的环境中做测试，这意味着更高的置信度。即使你只编写一个 UI 测试，它给你带来的置信度也比一百个单元测试更多。
你日常工作中接触的大多数项目都是小到中等规模的，它们最适合进行 UI 测试。UI 测试是一个通用术语，我们必须将其分为端到端测试和 UI 集成测试。
<刚开始接触前端测试？那就从金字塔顶端开始吧！> https://www.infoq.cn/article/ei01kymcs0v2fo1r4srg

E2E 把整个系统当作一个黑盒，测试人员模拟真实用户在浏览器中操作 UI，测试在真实浏览器环境运行测试。
E2E 测试一般是由 QA 测试工程师来做。稍小的项目可能根据测试用例（excel）操作一遍就完了，稍大一点的会写一些自动化测试的代码。
前端可能会为核心的、主要的或稳定的业务流程写 E2E，不过占据的测试比例要小很多，主要目的是：便于给 PM（产品经理） 展示业务流程，便于修改 Bug 之后的回归测试。

完成E2E测试的最佳时间是开发过程接近尾声时。 这是因为客户使用的大部分功能都在软件中，这意味着端到端测试涵盖了用户将体验到的程序的所有必要方面。
单元测试检查一段代码的具体单元，如单个函数和程序中两个不同函数之间的孤立连接。单元测试可以更快，但其缺点是不能完全模拟用户体验。
较大的组织往往有单独的测试和开发团队，保持这两个机构相互独立，以便不对E2E测试的结果引入任何偏见。
在可能的情况下，让没有开发过特定功能的人去测试它。 这在可能的情况下消除了固有的偏见，并使端到端的测试尽可能地准确。
规模较小的独立开发者，如首次开发应用的开发者或预算限制较多的开发者自己完成E2E测试。
在可能的情况下，多人完成测试并重复测试是最理想的，因为它提供了额外的确定性，无论是自动还是人工结果。
端到端测试的调试过程更加复杂，因为自动测试返回的 “失败 “信息不太可能是问题的具体原因。开发人员需要进一步调查以解决问题，特别是在没有整合具体错误信息的情况下。
响应速度 一些E2E测试的重点是确保系统快速返回有效的结果。
UAT测试是用户验收测试的意思，是一种测试形式，不是由开发团队的人完成，而是由目标受众的成员完成。
端到端测试仅仅是对软件的分析，以及它如何有效地工作，系统测试还包括对它所运行的硬件和一些固件的评估，如操作系统，它与之互动。
通过人工端到端测试过程的主要好处之一是你自己看到所有的潜在问题，注意到计算机可能看不到的软件缺陷。然而，与实现测试过程自动化相比，这个过程可能相对缓慢。
较小的项目可以由一个团队手动进行彻底的测试，梳理代码中的任何错误，并立即将其记下。相反，较大的项目根本无法手动测试，需要大量的软件测试自动化。
<端到端测试 – 深入了解E2E测试类型、流程、方法、工具等> https://www.zaptest.com/end-to-end-testing-deep-dive-into-e2e-test-types-process-approaches-tools-more
https://www.zaptest.com/zh-hans/%E7%AB%AF%E5%88%B0%E7%AB%AF%E6%B5%8B%E8%AF%95-%E6%B7%B1%E5%85%A5%E4%BA%86%E8%A7%A3e2e%E6%B5%8B%E8%AF%95%E7%B1%BB%E5%9E%8B%E3%80%81%E6%B5%81%E7%A8%8B%E3%80%81%E6%96%B9%E6%B3%95%E3%80%81%E5%B7%A5

质量不等于测试。质量不是被测试出来的。虽然质量不是被测出来的，但同样有证据可以表明，未经测试也不可能开发出有质量的软件。
把开发过程和测试融合在一起----开发和测试必须同时开展。写一段代码就立刻测试这段代码，完成更多的代码就做更多的测试。
最适合做测试的角色是开发人员而不是测试人员，质量更像是一种预防行为而不是检测行为。在google, 测试的目标是判断这种预防行为是否正常工作。质量是开发过程中的问题，而不是测试问题。
测试工程师会转型为测试设计。少量的测试设计师快速地规划出测试范围、风险热图和应用程序的漫游路线。测试工程师会转变成像安全工程师这样的专家型角色，或者编程测试活动的管理者，而那些具体的测试活动则由其他人来完成。
<Google软件测试之道>

质量保障的追求不是发现所有的bug、解决所有的风险，而是确保即使触发了bug也不会带来恶劣的影响，在此基础上力求去发现尽可能多的bug  -> bug 触发概率降到尽可能低 -> 触发bug后带来的损失降到尽可能小。
<测试八年｜对业务测试人员的一些思考> https://mp.weixin.qq.com/s/LQqYwrL2EDJBg5S00E3vaA

研究了代码质量后，开发速度提高了 2 倍，bug 减少了 15 倍
https://mp.weixin.qq.com/s/2FXkUE2OttMHUSwbf3JDgw




## 基本库


https://www.kylegill.com/essays/next-vs-tanstack/
React Trends in 2025 https://www.robinwieruch.de/react-trends/
2025-03-27

- [菜单溢出自动收起](https://github.com/frontend9/fe9-library/issues/48)
- [在线换主题](https://github.com/frontend9/fe9-library/issues/59)
- [js中关于base64](https://github.com/frontend9/fe9-library/issues/280)
- [任意两个数加减](https://github.com/frontend9/fe9-library/issues/217)
- [JavaScript 精度问题](https://github.com/frontend9/fe9-library/issues/141)
- [Node.js里面import和require](https://github.com/frontend9/fe9-library/issues/141)
- [深浅拷贝](https://github.com/frontend9/fe9-library/issues/93)
- [如何解析一个ip地址](https://github.com/frontend9/fe9-library/issues/3)
- [手写递归下降](https://github.com/frontend9/fe9-library/issues/10)
- [让你的程序更可读](https://github.com/frontend9/fe9-library/issues/36)
- [Clean Code 阅读总结](https://github.com/frontend9/fe9-library/issues/70)
- [重构 - 改善代码的各方面问题](https://github.com/frontend9/fe9-library/issues/228)
- [前端中后台页面的配置化](https://github.com/frontend9/fe9-library/issues/125)
- [可控组件？不可控组件？](https://github.com/frontend9/fe9-library/issues/195)
- [ZForm](https://github.com/zzj3720/ZForm)
- https://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html
2018 [前端九部](https://github.com/frontend9/fe9-library) https://www.yuque.com/fe9/basic/zw24qu


------ misc

[JPlag](https://github.com/jplag/JPlag) 相似度检查 原理
https://chatgpt.com/share/677e48dd-63b8-8008-b7d2-83c00c030fe8
不可行
- 完全不修改
- 修改了注释内容
- 修改了函数名和部分变量名
- 交换了部分函数调用的顺序
- 更改代码逻辑中的部分条件判断
- 改变代码结构，将主函数分解成多个小函数
- 调整部分使用的数据结构
- 彻底更换实现方式，使用不同的数据结构和逻辑
- 功能完全不相关的其它代码
可行:
- 改变代码结构，将主函数分解成多个小函数

代码转换: [convert react class based apps to functional/hooks?](https://www.reddit.com/r/reactjs/comments/o6djp7/is_there_any_automatic_tool_to_convert_react/)
https://transform.tools/
https://github.com/airbnb/ts-migrate
https://github.com/reactjs/react-codemod
https://github.com/facebook/jscodeshift
https://astexplorer.net/


--- 文档工具 2024-11

* [https://docusaurus.io/](https://docusaurus.io/) 推荐
* [https://www.gatsbyjs.com](https://www.gatsbyjs.com) 比较复杂
* [https://www.docz.site/](https://www.docz.site/) 基于 GatsbyJS
* [https://storybook.js.org/](https://storybook.js.org/) 比较复杂 较难定制

* [https://github.com/hexojs/hexo](https://github.com/hexojs/hexo) 中国台北？
* [https://mkdocs.org](https://mkdocs.org) 基于Python
* [https://gohugo.io](https://gohugo.io) 基于 Go
* [https://jekyllrb.com](https://jekyllrb.com) 基于 Ruby 适合个人博客
* gitbook (老旧) [https://docsify.js.org](https://docsify.js.org) / VuePress (vue技术栈)
* [dumi](https://d.umijs.org/) gh-pages


------ 构建工具 (2024)

- webpack babel
  - [Babel 插件原理](https://github.com/frontend9/fe9-library/issues/154)
  - [webpack sideEffect](https://github.com/frontend9/fe9-library/issues/33)
  - Webpack 5 module federationtion 联邦模块 https://juejin.cn/post/6844904187147321352
- https://github.com/umijs/father
- [postcss](https://github.com/postcss/postcss): 处在 css 预处理器 less scss 等流程之后，解析 css 为 ast，并有 Autoprefixer 等知名插件。
- [analyze-css](https://www.projectwallace.com/analyze-css)
- lint & actions
  - lint 工具: ESLint Prettier pretty-quick husky. 使用 ESLint 检查代码逻辑错误。使用 Prettier 格式化代码. eslint-config-prettier: 关闭 ESLint 中与 Prettier 冲突的格式规则。 eslint-plugin-prettier: 将 Prettier 的格式检查集成到 ESLint 中.
  - https://github.com/ant-design/ant-design/blob/master/.github/PULL_REQUEST_TEMPLATE_CN.md
  - https://github.com/react-component/rc-test/blob/main/.github/workflows/main.yml
  - dependabot vercel [coderabbitai](https://github.com/apps/coderabbitai)(Summary by CodeRabbit) socket-security codecov github-actions cloudflare-workers-and-pages
    - https://github.com/react-component/select/pull/1080
    - https://github.com/react-component/select/pull/1074
    - https://github.com/react-component/select/pull/1079
    - https://github.com/react-component/segmented/pull/242
    - https://github.com/react-component/tree-select/pull/586
    - https://github.com/react-component/picker/pull/886
    - https://github.com/ant-design/ant-design-mobile/pull/6776
- changelog & compatible upgrade
  - [Changelog Generator](https://github.com/orhun/git-cliff)
  - https://github.com/ant-design/compatible
  - https://github.com/ant-design/codemod-v4
- 工具
  - 获取浏览器 cookie https://github.com/thewh1teagle/rookie
  - [代理库](https://www.npmjs.com/package/https-proxy-agent)
  - [翻译api](https://github.com/matheuss/google-translate-api)
  - [各种 web-servers](https://gist.github.com/willurd/5720255)
  - [isomorphic-git](https://isomorphic-git.org/en/)
  - [jsfuck 代码混淆](http://www.jsfuck.com/)
  - [frNatural language detectionanc](https://github.com/wooorm/franc)
  -
  - https://www.rspack.dev  https://modernjs.dev/guides/get-started/tech-stack.html
  - gulp 手册 http://p.tb.cn/rmsportal_127_gulp_E6_89_8B_E5_86_8C1.pdf  http://p.tb.cn/rmsportal_127_gulp_E6_89_8B_E5_86_8C2.pdf
  - https://github.com/ant-tool/atool-build
  - [解读](https://github.com/frontend9/fe9-library/issues/32)


package.json 中的 browser 字段 主要由打包器识别 (如 Webpack Rollup Browserify), 不是 Node.js 原生识别. Jest 运行在 Node.js 环境中, 它解析模块时, 会使用 main（CJS）指向的模块, 不会关心 browser 字段.
当 package.json 中同时存在 "exports" 和 "main" 字段时：优先使用 "exports" 字段。如果没有命中 "exports"，才会回退到 "main" 字段。

[father](https://github.com/umijs/father) 和 dumi
- father 4 Bundle 模式使用 Webpack 作为构建核心，Bundless 模式支持 esbuild、Babel 及 SWC 三种构建核心。
- father 4 打包成 umd 产物时，lessLoader 设置 `math: 'always'` 配置项 https://github.com/umijs/father/issues/514#issuecomment-2222842879
  - [webpack chain 用法](https://juejin.cn/post/6947851867422621733)
- [father 2.x](https://github.com/umijs/father/tree/v2.9.0) 基于 [rollupjs](https://rollupjs.org/) 构建，采用 babel插件 编译 js/ts、采用 [rollup-plugin-postcss](https://github.com/egoist/rollup-plugin-postcss) 编译 less/css (不支持less配置项)。利用 [docz](https://www.docz.site/) 生成网站。
- dumi 设置非根目录 [publicPath](https://github.com/umijs/dumi/issues/849)

[rollup，vite以及webpack比较与介绍](https://juejin.cn/post/7097493230572273700)
- rollup 与 webpack 都是基于JavaScript依赖系统的一个打包构建工具，他们的共同点很多。 Rollup 默认打包为 ES6 格式、依靠插件生成 CommonJS 和 AMD 代码，静态分析代码中的 import 并排除任何未实际使用的代码。 Rollup 构建速度明显快于 webpack，生成的代码量很小。
- 不过在应用开发层面讲，如果开发一个Web应用webpack要比rollup有更大的优势，因为其天然继承了devServer以及hmr，这使得开发者可以快速的对应用进行调试开发。 Rollup 更加适合插件开发，而webpack更加适合应用开发。
- vite 号称是下一代的打包构建工具，主要体现在他从开发环境到生产环境的构建速度都能比webpack提升很多倍，原因就在于基于 rollup 和 esbuild 两个基础构建工具上。利用浏览器对ESM模块的支持，通过babel解决兼容性。将应用中的模块区分为 依赖 和 源码 两类，Vite使用esbuild预构建依赖、构建速度快 10-100 倍。在浏览器请求源码时、根据 router 按需以 原生 ESM方式提供 源码。利用 HTTP 头来加速整个页面的重新加载，源码模块的请求会根据 304 Not Modified 进行协商缓存，而依赖模块请求则会通过 Cache-Control: max-age=31536000,immutable 进行强缓存，因此一旦被缓存它们将不需要再次请求。
- vite 在生产环境打包也使用的 rollup，在预购建依赖的时候使用 esbuild。
- esbuild 使用 go 编写，发挥多线程多核优势，不使用 AST。所以一些通过 AST 处理代码的 babel插件没有很好的方法过渡到 esbuild 中。

概述

- 转译器: babel, tsc, [esbuild](https://esbuild.github.io/) (go语言 不使用 ast 兼容性差些), swc (rust 兼容 babel 插件)
- 打包器: webpack(应用打包) parcel (零配置) rollup (组件打包) [vite](https://vite.dev/)( bundleless) [snowpack](https://www.snowpack.dev/) (bundleless)

[umijs/father](https://github.com/umijs/father) Bundle 模式使用 Webpack 作为构建核心，Bundless 模式支持 esbuild、Babel 及 SWC 三种构建核心。

- 转译器: 将一门高级语音转译为另一种高级语言，如 ts 转译为 js、es6 转译为 es5 等等。 用js/ts实现的 babel、tsc 其他语言实现的 esbuild（go）、swc（rust）。
  - [esbuild](https://esbuild.github.io/) 不提供 AST 操作能力，一些需要操作 AST 的 babel 插件无法与之兼容。有两大功能，分别是 bundler 与 minifier，其中 bundler 用于代码编译，类似 babel-loader、ts-loader；minifier 用于代码压缩，类似 terser。
  - SWC 设计为与 babel 插件体系相兼容，因此可以在许多现有的 babel 配置下无缝替换，提升构建速度。
- 打包器: 将项目中的各种文件如 png、sass、json 等等打包成想要的结果。
  - 一类是通过监听源代码变化然后重新构建项目将打包后的代码推送到浏览器的传统模式 如 Webpack、 rollup、 [parcel](https://parceljs.org/) 。
  - 另一类是通过浏览器的原生 module 来实现动态打包的 bundleless 模式 如 [vite](https://vite.dev/) 、 [snowpack](https://www.snowpack.dev/) 他们都依赖 esbuild 。
  - Bundle vs Bundleless（代表就是webpack VS vite）。 webpack 等工具会把代码打包成 Bundle 文件，而 vite 则是依赖原生的 ESM 来实现，虽然在生产环境仍然要打包。 在生产环境中发布未打包的 ESM 仍然效率低下（即使使用 HTTP/2）。为了在生产环境中获得最佳的加载性能，最好还是将代码进行 tree-shaking、懒加载和 chunk 分割（以获得更好的缓存）。
- gulp 强调的是前端开发的工作流程，通过配置一系列的task，定义执行顺序，来让gulp执行。 webpack 侧重模块打包，我们可以把开发中的所有资源（图片、js文件、css文件等）都看成模块，通过loader（加载器）和plugins（插件）对资源进行处理，打包成符合生产环境部署的前端资源。 对于 gulp 来说模块化不是他强调的东西，而 webpack 更强调模块化开发，而文件压缩合并、预处理等功能，不过是他附带的功能。



------ 框架 脚手架

https://github.com/web-infra-dev

[bit 介绍](https://juejin.cn/post/6844903872108953607)
https://github.com/mcuking/blog/issues/88

框架 2021
[umijs](https://github.com/umijs/umi)
[蚂蚁前端框架和工程化](https://github.com/sorrycc/blog/issues/85)
[qiankun 子应用嵌套](https://github.com/umijs/qiankun/issues/960)

业务脚手架 2021
- 研发平台: 阿里def / 蚂蚁雨燕 / [DevOps平台-onedev](https://github.com/theonedev/onedev) / 大禹
- 内置含 BU 特色的组件，基于“开源脚手架”定制，既提升效率又有开放性，是较好的选择。
- 微前端: 微应用注册、路由管控(统一菜单/权限)、发布版本管控、发布灰度控制、多环境(日常/预发/线上)、预加载、应用组件。 子应用样式丢失。
- request 组件: csrf-token 处理、gateway domain 网关域名、登录、返回异常、返回json结果格式化、上传/下载。
- jwt https://www.zhihu.com/question/301253397/answer/547887208  http://blog.leapoahead.com/2015/09/07/user-authentication-with-jwt/
- API 管理平台 生成工具, 提高前后端联调效率. [google 的 API 设计指南](https://google.aip.dev/general) RESTful GraphQL.
- API 数据mock/前后端: https://github.com/usebruno/bruno [postman](https://www.getpostman.com/) [paw](https://paw.cloud/) [hoppscotch](https://hoppscotch.io/)  [mockjs](https://github.com/nuysoft/Mock)  [swagger](https://swagger.io/) / [json-server](https://github.com/typicode/json-server)  [miragejs](https://miragejs.com/).
- BFF: 多端适配/聚合裁剪数据，额外的部署资源及运维成本，集合 GraphQL https://insights.thoughtworks.cn/use-graphql-build-bff-in-microservices



------ 基础 UI 组件

在 docusaurus v3 中, 不通过修改 md 文档的 slug 而是通过插件方式, 实现 比如实际文件路径是 form/.i18n/index.md 在 URL 里显示为 components/form 的功能.
2025-06-15

为什么 mui button 的 api 叫 variant , 最初来源于哪里?
...
antd 还有其他的 api 一样的版本吗?
由于大量项目已基于 antd 构建, 但需要换一套组件库, 希望新的组件库 api 和相应功能 都能对 antd做兼容, 应该怎么做? 最好的办法是什么?
应该基于哪个新的组件库来做呢?
有人用 Material UI 做兼容 antd 的 api 的中间层库吗?
...
学习 tailwind 应该要理解哪些重点和难点地方
tailwind variants vs cva
...
基于 React Hook Form 和 Zod 做一个新的 react form 组件, 使其功能和 antd 4 的 Form 组件一样, api 用法也一样.
2024-12

很多 react UI 组件库都有 variant 属性, 为什么这么命名, 作用是什么 作用都一样吗
chrome 插件 popup 页面, 怎么区分是在 新 tab 打开, 还是 弹窗里打开?
https://chatgpt.com/share/674d2c48-8c94-8008-aca4-0ae4cc13eaa7
...
shadcn/ui ant-design material-ui 现状综合看哪个好、应该怎么选择？
基于哪个做二次开发比较好，成本怎么样？
需要面向未来、有一定先进性，应该怎么选?
想从 antd 迁移到新的 react 组件库, 要求 api 尽量一致或者改造成本低, 哪个新组件库符合要求?
https://chatgpt.com/share/6749ea04-8f08-8008-9f30-132d8ec8071d
2024-11

tailwindcss 的 text-danger 等 className 使用。
2023


---


UI 功能库 2024

- react hooks
  - [zeit/swr](https://github.com/zeit/swr)
  - [react-use](https://github.com/streamich/react-use)
  - https://usehooks.com/
- form/table
  - [react-hook-form](https://react-hook-form.com/) 和 [zod](https://zod.dev/)
  - [tanstack/table](https://tanstack.com/table), [react-data-grid](https://github.com/adazzle/react-data-grid) / [react-grid-layout](https://github.com/STRML/react-grid-layout)
- pop弹窗: https://github.com/floating-ui/floating-ui  https://popper.js.org/react-popper/v2/ 被 material-ui 和 shadcn 等多个库依赖.
- 独立功能: [react-virtualized](https://github.com/bvaughn/react-virtualized) / 分步指引 tour [shepherd](https://github.com/shipshapecode/shepherd) / [driver.js](https://github.com/kamranahmedse/driver.js) / form-builder FormRender.


UI 库 2024

- [tailwindcss](https://github.com/tailwindcss/tailwindcss)
  - [shadcn/ui](https://ui.shadcn.com/)(2023-05开源)
  - [Chakra UI](https://v2.chakra-ui.com/)(2019-09开源) / [Mantine](https://mantine.dev/)(2021-03开源)
  - [Adobe](https://react-spectrum.adobe.com/) / [上海 geist-ui](https://github.com/geist-org/geist-ui)
- [material-ui](https://mui.com/material-ui) [base-ui](https://mui.com/base-ui/)
- [github-primer](https://primer.style/) / [Semantic UI](https://semantic-ui.com/)
- https://ant.design
  - https://github.com/react-component / 字节 arco-design semi-design
  - https://procomponents.ant.design/

[antd tree-shaking](https://github.com/ant-design/ant-design/issues/23988)
antd-style 只能和 antd@5 配合使用 https://github.com/ant-design/antd-style/issues/156

antd5 [发布日志](https://github.com/ant-design/ant-design/issues/38671)  https://www.yuque.com/ant-design/ant-design/cy5nfvdo8oidvwmz
- less 到 cssvar 和 design-token，不需要按需加载插件，使用day.js
- [releases/tag/5.0.0](https://github.com/ant-design/ant-design/releases/tag/5.0.0)
- [迁移 less 到 cssinjs](https://ant-design.github.io/antd-style/zh-CN/guide/migrate-less-codemod)

antd4 [发布日志](https://github.com/ant-design/ant-design/issues/21656)
- 暗色主题 无边框组件 图标按需加载 form/table重做 内置虚拟滚动
- [antd 3.x-stable](https://github.com/ant-design/ant-design/tree/3.x-stable)


UI 功能库 2021

- 图表: [amcharts](http://www.amcharts.com/demos/) / antv [L7地图](https://l7.antv.vision/zh)
- 编辑器/IDE: [awesome editors](https://github.com/JefMari/awesome-wysiwyg)
  - https://typist.doist.dev/
  - IDE: [coding.腾讯](https://coding.net/) / [stackblitz](https://stackblitz.com/) / [gitpod](https://www.gitpod.io/) https://bi.cool/bi
  - web-Excel / [sheetjs Excel 解析](https://sheetjs.com/) / [moveable](https://github.com/daybrush/moveable)
  - [slate](https://github.com/ianstormtaylor/slate) / [trix](https://github.com/basecamp/trix) / [tui-editor](https://ui.toast.com/tui-editor/) / [craft.js](https://github.com/prevwong/craft.js) / [stylojs](https://stylojs.com/)
- 截图: dom-to-image / html2canvas / [各设备截图服务](https://screendump.techulus.com/) / 录制回放 [rrweb](https://github.com/rrweb-io/rrweb)
- 日历: [react-big-calendar](https://github.com/jquense/react-big-calendar) / [fullcalendar](https://fullcalendar.io/) / [webix/scheduler](https://webix.com/scheduler/) / [tui.calendar](https://github.com/nhn/tui.calendar)
- 文件管理器: [file-manager](https://js.plus/products/file-manager) / [dhtmlxFileManager](https://dhtmlx.com/docs/products/dhtmlxFileManager/) / [syncfusion/file-manager](https://www.syncfusion.com/blogs/post/introducing-new-javascript-file-manager-control.aspx) / [webix/filemanager](https://webix.com/filemanager/) https://github.com/filebrowser/filebrowser
- 营销/游戏/大屏[多媒体](https://www.yuque.com/books/share/6487738a-085c-4a82-98b3-834f87859a2a)
- 垂直: https://togetherjs.com  [wiki.js](https://wiki.js.org/)  UA 检测 https://github.com/Lissy93/web-check  https://github.com/beilunyang/moepush


antd 2018
- Table 伸缩列 [bug多](https://github.com/ant-design/ant-design/commit/84c65582c71c66df9744177d337cfd3d4ce1a713)、性能[差](https://github.com/ant-design/ant-design/issues/28214)。
- Menu 和 Modal `<Menu.Item onClick={doSth} />` 里放子组件、子组件里有 `<Modal onCancel={cancel} />` 弹窗，cancel 事件会触发 menu item 的 click 事件；弹窗里嵌套弹窗问题。
- Select 组件
   - 下拉框和选择框样式分别自定义场景：比如 `mode="multiple"`、`labelInValue`、`options` 的 label 为定制的 jsx 时，可使用 `Select.Option` 组件 + `optionLabelProp="label"` 组合来避免 `onChange` 参数里的 label 是 jsx 、也能让选择框里 选项样式 能自定义。
   - 无尽列表翻页 [issues/12406](https://github.com/ant-design/ant-design/issues/12406)
   - 搜索框和单选选择框合并 [0.12 效果](https://012x.ant.design/components/select/#demo-search)、[1.x修改](https://github.com/ant-design/ant-design/issues/1390)、1.0 [changelog](https://github.com/ant-design/ant-design/issues/1050)
   - 数据项有重复时 会乱跳，如视频：[mp4](https://gw.alipayobjects.com/os/rmsportal/GxGqYTHnIXRioQTbtkok.mp4)
- Upload 组件
   - 多文件合并到一个 xhr 里上传 [issues/8579](https://github.com/ant-design/ant-design/issues/8579)
   - 使用内部的 UploadList 来[自定义进度条显示位置](https://github.com/ant-design/ant-design/issues/8387)
   - umi-request 基于 fetch 实现、不支持显示上传文件的进度，而 axios 可以支持。
   - 使用`beforeUpload`来限制上传文件大小、`customRequest`自定义上传接口和上传进度。
- Upload 上传文件/夹 (参考 语雀 或 teambition 上传资源)
   - 上传的文件或文件夹、都会存在一个`fileList`列表里，文件属性`webkitRelativePath`的值存在时、表示上传的是文件夹里的文件。`onChange`会在上传状态(上传中、已完成、失败等)变化时调用。
   - 多次点上传按钮时、可根据`fileList`里每个条目的`uid`标记来区分新旧。两次上传同一个文件夹时、需要 分别创建不同的文件夹名，比如后缀加上(1)。
   - 需要等待 所有文件都上传后 (即状态都是 done) 并且至少有一个文件上传成功，再创建目录。
   - 前端根据每个文件的`webkitRelativePath`值，循环构造出多层 文件夹 的层级数据，传给后端。
   - 后端一般需要起“异步”的任务、创建各级文件夹，前端轮询异步任务状态、判断是否成功。
   - 大文件分片上传和断点续传[原理](https://segmentfault.com/a/1190000040309502)，需要使用 oss 提供的 sdk。
   - 文件夹里包含超过 300 个小文件，上传起始会卡顿、上传失败的文件优先显示、上传过程并发数的浏览器限制。
- Popover 和 Tooltip 组件，children 如果不是元素、而是 {props.children} 不起作用。

antd-mobile 旧 demo 备份 2018
> - antd_custom_ui move from https://github.com/warmhug/__/tree/master/_react/antd_custom_ui to > https://github.com/ant-design/antd-mobile-samples/tree/master/web-custom-ui
> - antd-mobile + TypeScript move from https://github.com/warmhug/__/tree/master/_react/antd-ts > to https://github.com/ant-design/antd-mobile-samples/tree/master/web-typescript
> - antd-mobile demo move to https://github.com/ant-design/antd-mobile-samples/tree/master/web-webpack





## monorepo

使用 lerna@8 和 pnpm@7 , 在 lerna version 时, 因为搭配了 pnpm  就算不使用workspace: 协议, 也能自动关联升级版本号. 是怎么实现的?
https://chatgpt.com/share/6809e167-f024-8008-983a-3d3429470081
https://gemini.google.com/app/1660bddbb4205ab5
https://github.com/lerna/lerna/issues/718
https://github.com/lerna/lerna/issues/2326
2025-04-24

lerna 的 libs/core/src/lib/command/index.ts 里的 configureProperties 里的 execOpts 怎么修改? 怎么在调用 lerna 命令时传入这个参数?
怎么使用 lerna 的 ChangedCommand 类?
怎么让 lerna changed 命令忽略 Merge branch带来的代码变化?
2025-04-22

在 lerna@8 + pnpm@7 的 monorepo 项目里, 因为存在两个相同的包名, 虽然通过 project.json 做了区分, 但 lerna 背后的 nx 对于内部包之间的 依赖解析 仍然有问题.
https://gemini.google.com/app/f2ce6aaf2219c618
...
使用 pnpx nx graph 分析内部包之间的依赖, 发现部分内部依赖缺失?
因为 lerna 背后实际是 nx 在检测依赖. 写死版本号, 或使用工作区协议(workspace: 或 file: 协议) 会被检测到. 但如果依赖版本号是 ^ 开头 则检测不到, 因为 SemVer ^ 范围并不是“协议” 只是 NPM 在安装时的解析策略，Nx 的项目图器并不去解析 SemVer 范围，它只信任显式的工作区协议或基于代码的导入。
https://chatgpt.com/c/6804b4b9-bc04-8008-b378-803e803e9f9e
2025-04-20

当前 master 分支 最新的commit 关联了 tag a b c, 此时有新的 feature 分支合并进 master, 就在 master 最新commit 之上新增了 2个commit 变为了 master 的最新 commit, 同时在 master 第 10 条 commit 位置, 插入了一周前的 feature 分支的多个 commit 进来.
这时候, lerna change 认为 master 上的 tag a b c 疑似失效, 显示这些 tag 对应的文件有变更, 实际上这些文件已经在 master 的 commit 里, 并且没有变更.
继续提问: 是使用 git merge --no-ff 合并的 feature 分支到 master. 也没有改变 master 已有的 commit hash , 只是把 feature 分支上一周前的几个 commit 合到了 master commit 时间线里, hash 也都没有变化.
https://chatgpt.com/c/68021519-6b6c-8008-832d-e82255a913ba
2025-04-18

nx implicitDependencies 怎么理解和使用?
pnpm build 有类似 nx implicitDependencies 的功能吗? 或者怎么能实现这样的效果, 特别是在处理 npm alias 这种场景时.
https://chatgpt.com/c/67f8cedd-9b20-8008-b596-daa0e9c3bb7c
https://gemini.google.com/app/c5def5cfe22d8825
https://chat.deepseek.com/a/chat/s/bfe64f5d-98e5-4481-8332-b738c1926eb6
2025-04-11

monorepo 工具 lerna changesets rushjs 功能详细对比?
lerna 配合 nx 能实现 rush.js 的 增量构建、并行化、分布式缓存 功能吗?
Rushjs 提供了构建缓存（build cache）功能，还支持阶段构建（phased builds）这些优化, 能节省公司使用云构建的机器成本吗? 比传统多仓库模式能节省多少成本?
https://gemini.google.com/app/8f758441dfbc2494
https://chatgpt.com/share/67e3ee41-856c-8008-acea-945ed9ba627b
https://chat.deepseek.com/a/chat/s/84c31b44-3b08-4cde-921f-01f077639dca
2025-03-26

lerna publish from-git from-package 详解?
为什么 from-git 适合 自动化 cicd 场景?
使用 from-package 时, --ignore-changes 为什么不起作用?
https://chat.deepseek.com/a/chat/s/f8b25b55-f0f0-4851-a901-0156ddd8f5d8
2025-03-19

使用 Nx 进行构建时，.nx 目录用于存储与构建相关的缓存和数据 .nx/cache/ .nx/installation/ .nx/workspace-data/ 这些目录包含特定于本地环境的临时文件，不适合纳入版本控制。在 .gitignore 里忽略掉.
使用 Nx 提供的分布式缓存功能，在团队内部共享缓存.
2025-03-13

lerna 运行完 根目录的 version 钩子后, 虽然提示了要修改文件的版本号, 但程序那一刻 看起来还没有改动完成相应文件, 什么时候文件内容会被实际改掉? 改成 postversion 也不行.
2025-03-11

lerna 在 preversion 阶段会执行 package.json 里的 scripts, 但不希望明确写这个 scripts, 而是想由另一个脚本 动态设置 scripts 后传递给 lerna , 这样能实现吗?
https://chat.deepseek.com/a/chat/s/aaea4f5c-0d71-4b54-b8f0-a6fc1d771ef1
https://chatgpt.com/c/67ce9933-a260-8008-8046-cff83664fe40
2025-03-10

lerna 在更新版本时候, 有什么钩子函数, 能打印出来新旧版本号吗?
现在是 lerna 结合 pnpm 的 monorepo 项目, 不想在每个子包都重复写 scripts 怎么能统一解决?
2025-03-09

lerna version 不能自动更改 npm alias 的版本号, 怎么解决这个问题? 怎么解决?
除了 lerna 有其他类似工具能解决这个问题吗?
https://grok.com/chat/8e0fc14a-3f17-40a2-b7c5-99463c153087
https://grok.com/share/bGVnYWN5_2285de9a-750d-409c-a6a1-0c33cd067f1e
https://chat.deepseek.com/a/chat/s/e1bbf052-b8a7-4064-81f9-b7fc3bfc426f
2025-02-26

monorepo 忽略了 samples 子目录, 但在 samples/xx 里运行 pnpm install 还是会根据根目录的 pnpm-lock 安装依赖, 怎么避免这个问题?
2024-12

在 2022/05 的时候 Next.js 在这个 [PR#37259](https://github.com/vercel/next.js/pull/37259) 从yarn 转移到了pnpm，原因是使用pnpm 帮助他们降低了下载套件的大小，而且找到了一些幽灵依赖，并在 CI 上安装套件的速度从 4 分钟降低到了 2 分钟。
...
[将 50 万个文件放在一个 Git 存储库中](https://www.infoq.cn/article/tomhtgpmuy4oqhpvf0w1)
2024-10



------ lerna

```sh
# https://lerna.js.org/docs/api-reference/commands

# --loglevel silly --yes --no-commit-hooks
# --include-merged-tags --no-push --no-git-tag-version
lerna ls --graph # 等效 pnpm ls -r --json
lerna ls --long # 等效 pnpm ls -r --depth -1 --json 换成 npm 不行
lerna ls --since master
lerna ls --since="master" --loglevel=verbose
lerna ls --since --include-merged-tags
lerna list --scope=my --include-dependencies --ndjson
lerna list --since=origin/master -include-dependents --loglevel=verbose
lerna list --scope=package-A --include-dependencies --since=main

# changed 比较当前工作树与最近的标签之间的差异 不支持 since scope 参数
lerna changed
lerna changed --include-merged-tags
lerna changed --include-merged-tags --loglevel debug

# 比较自上次发布以来的所有包或单个包的差异。依赖 Git 标签来确定上次发布的版本。
lerna diff
lerna diff package-name

# lerna version / publish 不支持 --scope 参数
lerna version patch --exact
lerna version patch --include-merged-tags --no-push --no-git-tag-version --no-commit-hooks --exact
lerna version patch --exact --message '🎨 chore(release): Publish' --conventional-commits
lerna version prerelease --preid beta
lerna publish prerelease --preid rc --dist-tag rc
lerna publish from-git --preid rc --dist-tag rc
lerna publish from-package

# 构建时需包含依赖  使用 concurrency 不要使用 parallel 参数
lerna run build --include-dependencies --concurrency 4

lerna watch -- echo \$LERNA_PACKAGE_NAME \$LERNA_FILE_CHANGES
lerna watch -- lerna run build --scope=\$LERNA_PACKAGE_NAME

lerna exec --since --include-merged-tags -- ls -la
lerna exec --include-merged-tags --concurrency 1 -- "pwd && ls -la"
lerna exec --scope @ant-design/pro-form -- pnpm version 0.1.5-alpha.0 --no-git-tag-version
# 可以使用 pnpm up 命令，但升级后的 包的版本号为类似这样 "xxx": "workspace:0.1.3" 需要 lerna/npm publish 命令再次处理.
lernaCli, 'exec', '--scope', name, '--', `pnpm version ${newVersion}` --workspaces=false --no-git-tag-version --allow-same-version=true`
```

--- 总结

在 lerna@8.0.2 里的 lerna.json 的 ignoreChanges 不支持 `"!commons/galaxy-upload-cdn/lib/**"` 这样的 否定匹配, 但 git 的 .gitignore 文件支持.

lerna 项目存在 相同的 pkgName 不同的大版本 1x 2x 3x 怎么管理
- 加入 project.json 文件, 内容为 { "name": "pkgName@1.x" } 或 { "name": "pkgName@2.x" } 利用了 nx 的特性.
- nx 报错: lerna ERR! lerna To fix this, set a unique name for each project in a project.json inside the project's root. If the project does not currently have a project.json, you can create one that contains only a name.

lerna changed 和 list 行为不一致:
- https://github.com/lerna/lerna/issues/1909#issuecomment-459548676
- https://github.com/lerna/lerna/issues/1377

lerna tag(仅支持 annotated tags) 与 commit
- lerna changed 会根据 annotated tag 判断是否升级版本.
  - 如果最近的 annotated tag 之后 "有代码变更,并且没有被之前的某个 annotated tag 记录", 这些变更的代码版本 对应的组件 就被认为需要升级版本. 解法: 比如最新的 commit 对应的 tag V1 不是 annotated 的, 运行 `git tag -a -m 'V1' V1 -f` 做修复.
  - 参考: https://lerna.js.org/docs/troubleshooting#publish-command  https://github.com/lerna/lerna/issues/1357#issuecomment-438162152  https://juejin.cn/post/7114538970339344420
  - 原理是 `git describe --first-parent --always --dirty` (搜源码 describeRefSync) 和 git diff --name-only lastTagName pkg_path (搜源码 diffSinceIn)
- 如果 lerna tag 对应的 commit_id 被 squash/rebase 而不在 git 历史里. lerna version 就不会基于这个 tag 的版本号 来升级版本. 解法: 修改 tag 对应到新的 commit_id, 强推覆盖远程的已有 tag.
- 如果你的项目使用了规范化的提交信息（例如，使用 commitizen 和 cz-lerna-changelog），Lerna 可以更准确地检测变更，因为它会根据提交信息中的标签来识别影响的包. https://github.com/lerna/lerna/issues/2437  https://github.com/lerna/lerna/issues/1569  [lerna 发包原理浅析](https://zhuanlan.zhihu.com/p/392438222)

lerna publish 参数 from-git from-package
- 如果 lerna publish 失败，使用 lerna publish from-git 重新发布，不用改版本号。
- 设置 from-git 或 from-package 后不会运行 lerna version 也不检测文件变更.
- 设置 --ignore-changes 只对 lerna version 或默认的 lerna publish（包含版本生成阶段）有效.

uncommitted changes 阻止发布
- https://github.com/lerna/lerna/issues/2329
- https://github.com/lerna/lerna/issues/1591
- lerna ERR! EUNCOMMIT  M pnpm-lock.yaml 确保开发阶段使用的 pnpm 版本一致.

lerna.json 配置项 https://github.com/lerna/lerna/blob/main/libs/core/src/lib/project/index.ts#L28
使用 lerna@8.0.2 在 /usr/local/lib/node_modules/lerna/dist/index.js 文件的 10480 行, 调试:
`console.log('log concurrency: ', this.concurrency, Object.keys(this));` this 对象的 keys 为:
[
  'options', 'concurrency', 'toposort', 'execOpts', 'argv', 'name',
  'composed','runner', 'script', 'projectsWithScript', '_project','logger',
  'projectGraph',  'projectFileMap', 'args', 'npmClient', 'bail', 'prefix',
  'count', 'packagePlural', 'joinedCommand'
]

--- nx

https://nx.dev/concepts/decisions/why-monorepos
依赖管理
https://nx.dev/extending-nx/recipes/project-graph-plugins

[Turborepo](https://github.com/vercel/turborepo) (类似nx) 解决了 Monorepo 的问题。我们的远程缓存存储您所有任务的结果，这意味着您的 CI 永远不需要做同样的工作两次。 任务调度可能是困难的，想象 yarn build 需要运行前 yarn test ，在所有的工作空间。Turborepo 可以调度您的任务，以最大的速度，在所有可用的核心。


------ monorepo(one code base) 工具 2023 ~ 2025

https://jamiemason.github.io/syncpack/
* [monorepo.tools](https://monorepo.tools/)
* [monorepo-vs-polyrepo](https://github.com/joelparkerhenderson/monorepo-vs-polyrepo)
* [Awesome-monorepo](https://github.com/korfuri/awesome-monorepo)
* [advantages of monorepo](https://medium.com/@suman.maity112/is-it-the-era-of-mono-repo-671e6dee387)
* [Misconceptions about Monorepos](https://blog.nrwl.io/misconceptions-about-monorepos-monorepo-monolith-df1250d4b03c)
https://github.com/changesets/changesets
Monorepos 工具 https://www.51cto.com/article/759432.html
https://medium.com/ekino-france/monorepo-insights-nx-turborepo-and-pnpm-4-4-96a3fb363cf4

采用的知名项目:
https://github.com/facebook/react/
https://github.com/vuejs/core/
https://github.com/jestjs/jest
https://github.com/angular/angular
https://github.com/nrwl/nx-examples






## p/npm

https://npmtrends.com/lint-staged-vs-pre-commit-vs-pretty-quick
https://www.npmtrends.com/jsplumb-vs-mxgraph

```sh
# https://docs.npmjs.com/cli/v10/commands/npm
rm -rf node_modules **/node_modules
# install 时除了 可选依赖 (optionalDependencies) 其他遇到 404 会报错退出.
npm install --verbose > install.log
# 安装 npm alias 别名依赖
npm install axios4@npm:axios@1.4.0 axios5@npm:axios@1.5.0
npm install --prefix ./dir
npm run build --prefix ./dir

# 设置 dist-tag
npm dist-tag add @huajs/demo latest
npm root -g
npm ls -g node-sass
npm ls --long node-sass
npm ls --all --json --loglevel silent
npm view monoaid@0.11.0 main
npm view monoaid@0.11.0 exports --json
node -p process.env
node -e "console.log(module.paths)"

# node env 优先级: 命令行 env > `/project/.npmrc` > `~/.npmrc` > `/etc/npmrc`
npm config list -l  # 按 env 优先级显示 所有值
npm config list --json  # 只显示 最终实际生效 的值
npm config get registry  # 获取 最终实际生效 的某个值
npm config set -g registry https://registry.npmmirror.com
npm config get cache  # 一般为 ~/.npm 查看 _npx 目录
npm cache clean --force

# 发包 登录账号
# npm publish 时使用的 registry 与 npmrc 里的 registry 和 @scope/registry 哪个起作用?
# 命令行 --registry > @scope:registry > 全局/项目级 registry > npm 官方 registry
npm publish [dir/subdir]
npm whoami --registry https://registry.npmjs.org
npm profile get --registry https://registry.npmjs.org
npm access list packages --registry https://registry.npmjs.org
npm search @ant-design --searchlimit=100 --json  # 搜索组织下的包

# npm源 http://registry.npmjs.org/esbuild/0.21.4
# ali源 https://registry.npmmirror.com/esbuild/0.21.4
# 腾讯源 https://mirrors.cloud.tencent.com/npm/esbuild/0.21.4

# npx 用法: 会自动在项目的 node_modules/.bin 目录中查找可执行文件
npx ls  # 等同于 ls
npx mocha --version
npx http-server --ignore-existing # 忽略本地的同名模块
# https://code.visualstudio.com/api/get-started/your-first-extension
npx --package yo --package generator-code -- yo code

# npm monorepo 在根目录运行  npm v7(2020-10发布) 支持 Workspaces
npm version 0.1.5 --workspaces --no-git-tag-version --allow-same-version=true
npm version patch --workspace=packages/button --workspace=packages/card --no-git-tag-version --allow-same-version=true -f
# 如果只改某个子包版本号，进入到子包 设置 --workspaces=false
npm version patch --workspaces=false --no-git-tag-version
npm version prerelease --preid rc --no-git-tag-version

# ====== pnpm

ls -la node_modules/react  # node_modules/react -> ../../.pnpm/react@18.2.0/node_modules/react

# 使用 -r --filter 参数, 对 monorepo 里的子包进行操作.
pnpm --filter "@xx/quick-*..." aa   # 后边的 aa 为 filter 筛选出的包的 scripts 里的 某个key 比如 test build 等
pnpm ls -r --only-projects --parseable --filter "@xx/yy"

pnpm ls  # 列出 package.json 中声明的直接依赖
pnpm ls react  # 只列出 react 依赖
pnpm ls --json --long
pnpm ls --depth 2 ts-jest
pnpm ls --depth Infinity fast-glob  # 等效于 pnpm why -r fast-glob

pnpm build --dir ./dir
pnpm install --dir ./dir  # 自动进去指定目录安装. 同 npm install --prefix ./dir
pnpm install --frozen-lockfile  # 流水线里安装

pnpm add express@2 react@">=0.1.0 <0.2.0"
pnpm add ./package.tar.gz
pnpm add ./some-directory  # same as running pnpm link

rm -rf "$(pnpm store path)"
pnpm store prune
pnpm import package‑lock.json  # 导入 npm lock 或 npm-shrinkwrap.json 文件
pnpx create-react-app@next ./my-app  # npm 的 npx 等效于 pnpm 的 pnpx = pnpm dlx

pnpm outdated -r # 只检测 lock文件(不是package.json) 里的依赖版本号 是否过时
pnpm outdated "@ant-design/pro-*"
# 升级到 npm latest 指定的版本 如果 workspace 内部包 版本号大于npm最新版 则使用内部包版本号
pnpm up "@ant-design/pro-*" -r --latest
pnpm up "@ant-design/pro-*" -r  # 加 --workspace 作用一样

```


npm 包 xx 的依赖版本是 @types/react: * 时, 在 monorepo 里存在 @types/react 16 17 18 多个大版本, 这个 xx 实际安装的 @types/react 版本是什么?
...
公共源的某些npm包, 在公司内部源没有. 通过 bundledDependencies 先从公共源下载, 在公司内部源发布. 能解决问题吗?
https://chatgpt.com/c/68826ea0-4564-8008-b420-5b51b36eaaa9
2025-07-25

const rl = readline.createInterface({
  input: res,
  crlfDelay: Infinity, // Recognizes '\r\n' and '\n' as line breaks
});
如上 res 是个 流数据, 需要一行行读取. 其实际内容如下
data: { "response": { "modelVersion": "gemini-2.5-pro1" } }\r\n\r\n
data: { "response": { "modelVersion": "gemini-2.5-pro2" } }\r\n\r\n
data: { "response": { "modelVersion": "gemini-2.5-pro3" } }\r\n\r\n
res 是 PassThrough 对象, 需要先读取到这个对象的实际数据, 做一些修改, 再构造出一个新的 PassThrough 对象.
2025-07-23

在 node 模块里, 一个函数 需要返回一个 await axios.request() 值. 但又希望不请求真实的服务器地址, 而是直接返回给定的mock结果, 应该怎么做?
2025-07-22

运行 pnpm store prune 后, 安装遇到如下问题, 是因为本地缓存吗?
This error may happen when a package is republished to the registry with the same version.
In this case, the metadata in the local pnpm cache will contain the old integrity checksum.
没有 republish 但同一个包同一个版本, 发布到了 不同的 registry 上. 是这个问题吗?
2025-07-20

对于 responseType: 'stream' 的 http 输出, 使用 node 的 readline.createInterface 可以按行读取内容, 怎么能一次全部读取 而不用按行读?
2025-07-16

pnpm workspaces 会统一添加子包的依赖到根目录的 lock 文件里, 怎么排除某几子包?
...
因为公司内部源不全, 安装外部包时 怎么把其依赖的 node_modules 也作为源码, 但不叫 node_modules 这个名字.
...
开发阶段的 npm 包设置了 bin 怎么能给其他目录的调用者使用?
2025-07-13

pnpm add pkg 和 pnpm install pkg 的区别?
如果一个二级依赖的 patch 版本号升级, 在项目中对一级依赖进行 pnpm uninstall 再 pnpm add , 这时候二级依赖版本号 仍然没升级, 是怎么了?
npm yarn 分别是怎么处理二级依赖的版本的?
因为项目里 A 里有多个依赖 比如 B B1 B2 都需要升级, 怎么能 pnpm up A (但此时 A 的版本号不变), 能让其依赖 B B1 B2 的 patch 版本都自动升级. 而不是 pnpm up B --depth=2 ?
2025-06-29

package.json 的 browser 字段值, 可以怎么写, 分别起到什么作用?
jest 是使用什么 编译和打包 工具? 是调用 package.json 里的 main 还是 browser 指向的模块?
设置了 testEnvironment: 'jsdom' 之后, 会使用 browser 指向的模块吗?
https://chatgpt.com/c/6844032d-7350-8008-a325-40da589b8176
2025-06-07

pnpm v7 的 list 命令 怎么能 exclude peer dependencies
https://chatgpt.com/c/68382b61-8408-8008-b85a-2064c39c1dd1
2025-05-29

pnpm workspaces 某个子包 aa 的 dependencies 含有这样依赖 "demo": "workspace:demo2@*" 其中 demo2 是另一个子包的包名.
当在 workspaces 根目录 运行 pnpm --filter "aa..." build 时候, 预期是 demo2 的子包需要先运行 build 命令, 但实际未运行.
这是因为 pnpm 默认把 npm alias 的依赖, 当做 外部依赖 解析, 需要额外的解决方案, 应该怎么做呢?
...
需要做到 自动化工具构建, 能通过给 pnpm 写插件等方式, 补足这个功能吗? 应该怎么写?
https://gemini.google.com/app/74b4f952721158d0
2025-05-27

修改了 registry 但需要保持原 registry 生成的 pnpm-lock.yaml 文件的版本号一样, 并自动修改 resolution 的 integrity 和 tarball 字段.
https://github.com/pnpm/pnpm/issues/6667
https://stackoverflow.com/questions/62439074/override-registry-for-installed-packages-in-package-lock-json
可行方法: 先用 pnpm install --fix-lockfile 更新 lockfile, 再手动替换 tarball 字段的 registry URL 为新的.
2025-05-26

详细解释一下 re2 这个包的作用, 以及其与 node-gyp 编译了什么?
node-re2 是一个 Node.js 模块，它封装了 Google 的 RE2 正则表达式引擎，避免潜在的 ReDoS（正则表达式拒绝服务）攻击。保证线性时间复杂度，从算法层面杜绝 ReDoS。
node 的 ajv 包 devDependencies 依赖了 re2 , re2 依赖了 install-artifact-from-github 和 node-gyp . 在 安装包过程中, re2 会尝试下载 https://github.com/uhop/node-re2/releases/download/1.20.12/darwin-x64-108.br 这个预编译文件, 若无预编译二进制 调用 node-gyp 编译 RE2 源码，生成适配当前环境的 .node 文件。
https://gemini.google.com/app/8db2f2b251d9f63e
...
在 package.json 里的 pnpm overrides 字段, 怎么指定使用 workspaces 里某个包的版本, 并自动跟随版本变化.
2025-05-21

同一个 npm 包, 在不同的 registry 的 integrity 为什么不一样, 怎么修复?
如果是从其他 registry 同步到另一个 registry 的包, 他们的 integrity 一样吗?
切换 Registry 之后, 使用 node 脚本修改 lock 文件, 需要让 lock 文件里的依赖包名和版本号都不变. 应该怎么处理?
https://gemini.google.com/app/8bd107edfc557f66
2025-05-13

现有不同的 git 仓库, 其内部代码大致一样, 但 npmrc 不同. 虽然已经用 process.chdir 切换到了相应的目录. 但随后在运行 child_process spawn 时候, process env 里的 npm 相关配置 设置使用了 chdir 之前目录的配置. 这跟 spawn 的 cwd 设置有关系吗? 应该怎么解决?
怎么知道在设置 cwd 后, spawn 函数执行时候的 process env 参数有哪些?
https://gemini.google.com/app/c3b2f45e5789965b
2025-05-08

使用 npm child_process exec 调用 npm publish ./dir 怎么获取发布包的成功和失败状态, 以及包的 name 和 version 信息?
2025-05-06

使用 nodejs 删除 pnpm-lock.yaml 里的 resolution 下的 tarball 字段, 其他内容保持不变.
2025-04-27

为什么使用 ^2.2.12-alpha.3 在 npm install 时候安装的不是指定的这个版本?
2025-04-21

pnpm 里没有和 npm 的 omit-lockfile-registry-resolved 一样作用的配置吗?
pnpm 能生成和使用 npm-shrinkwrap 文件, 代替 lock 文件使用吗?
2025-04-16

项目 package.json 里的 packageManager 作用, 为什么能让系统安装的 pnpm 版本不生效?
2025-04-15

npm install 时生成的 lock 文件里每个包的 integrity 字段用于确保包文件的完整性，其值通过特定算法计算文件内容的哈希值生成。包内容相同则 integrity 相同，与不同的 registry 无关 与 yarn pnpm 等包管理器无关. 若内容有差异（如恶意篡改、非官方修改版 即使版本号相同），则 integrity 不同。
是 npm 利用 integrity 防止包被恶意篡改的核心机制。
怎么能不生成 package-lock.json 文件里的 resolved 和 pnpm-lock.json 文件里的 tarball 字段?
https://github.com/npm/npm/issues/16849
2025-04-15

pnpm install 后的 lock 文件里的 tarball 字段的生成规则是什么?
生成的结果是 tarball: npm/@types/babel__traverse/-/babel__traverse-7.20.7.tgz 但实际多了 npm/ 前缀, 是什么原因? 这个前缀导致下载这个包时报了 404 错误.
虽然有 npm/ 前缀, 在本地电脑运行 pnpm install 不会报错, 但在流水线里会报 404 错误. 什么原因?
2025-04-14

在 pnpm(v7) + lerna 的 monorepo 项目, 为了能让各个子包 使用各自不同的 react 版本,
在子包 package.json 的 devDependencies 里安装 @types/react 包,
在子包 tsconfig.json 配置 "paths": { "react": ["./node_modules/@types/react"] } 只解析当前目录安装的 @types/react 内容.
但 @types/react 本身依赖的 csstype 等包, 是被安装在 **根目录的 node_modules 里**, 如果子包 有源码 调用 React.CSSProperties 类型, 就会报错 TS2339: Property 'position' does not exist on type 'CSSProperties'.
解法:
在子包 package.json 的 devDependencies 里, 加入 @types/react 包依赖的 csstype 等包. 使其都能在当前目录的 node_modules 里被找到, 问题解决.
2025-04-09

场景: 项目的 build工具(依赖ts@3), 但项目本身(依赖ts@4), 在使用 npm(@9) 构建时候 无报错, 但使用 pnpm(@7) 构建时 对源码的 ts 语句解析报错.
npm 和 pnpm 分别这么处理:
- npm: 直接使用 根目录 node_modules 的 ts@4 来解析 build工具+项目 的源码, 虽然 build工具 是依赖的 ts@3 但使用 ts@4 来解析 "凑巧"也没有错误.
- pnpm: 会使用 build工具的ts@3 来解析 项目源码, 导致解析报错, 因为项目源码需要 ts@4 来解析.
参考: [lerna@8](https://www.npmjs.com/package/lerna?activeTab=code) 的 dependencies 里这么声明 ts 依赖 `"typescript": ">=3 < 6"`, 确保使用方 不受其版本锁定的影响.
...
npm(@9) 依赖提升Hoisting, 默认会将所有依赖提升到 根目录 node_modules.
pnpm(@7) 严格依赖隔离, 默认不会提升依赖, 每个子包的 node_modules 仅包含其显式声明的依赖, 使用 硬链接和符号链接.
pnpm 不会默认进行大规模的提升。它使用符号链接（symlinks）的方式，在项目的 node_modules 里只精确地链接项目直接依赖的包。而这些包自身的依赖，则位于一个集中的内容寻址存储区（通常是项目根目录下的 .pnpm 文件夹内），并通过符号链接按需链接到对应包的 node_modules 目录下。
https://gemini.google.com/app/c1b7c1ac21903ab2
...
[moduleResolution 总结](https://zhuanlan.zhihu.com/p/621795173)
2025-04-08

npm 和 pnpm 在 .npmrc 文件里 可通用的配置项 都有哪些?
怎么让 pnpm 保持和 npm 一样的 模块安装方式, 不要有 node_modules/.pnpm 目录.
2025-04-08

单独的 npm 包 execa 里的 sync 和 child_process 里的 execSync 的区别?
https://chat.deepseek.com/a/chat/s/9af55d01-f490-46bc-b8a5-677cd1a2a3bc
2025-03-17

使用 pnpm 安装了依赖, 但在 package.json 的 scripts 里使用 npm run lint, 这样有问题吗?
如果是 monorepo 项目, 在子包里运行, 怎么查找 bin 下的二进制文件?
https://chat.deepseek.com/a/chat/s/133eb6d1-d73f-4457-b92a-8a725cad3d1d
2025-03-13

使用 pnpm 为了避免在 package.json 里声明, 在 postinstall 或 prepare 阶段 安装一个依赖, 怎么能避免自动修改 lock 文件.
... 结果
"scripts": {
"postinstall": "pnpm install nx@latest --lockfile=false --ignore-workspace --dir ./tmp",
}
https://chatgpt.com/c/67cd4e89-f4a4-8008-b5e1-89bfe0c831a8
https://chat.deepseek.com/a/chat/s/3c5acb32-1b6b-4e8c-9808-25ebc8f419d8
https://gemini.google.com/app/9f8cca7169306de3
2025-03-09

pnpm monorepo 怎么查看除了内部 link 包之外的其他包依赖, 在 registry 是否存在?
如果没有直接的命令, 写一个 node js 脚本来实现.
...
内部链接的版本号, 可以以 workspace: 或 file: 开头, 但也可以不是以它们开头.
因为 pnpm 提供了 prefer-workspace-packages 和 link-workspace-packages 设置, 能够自动匹配引用 monorepo 内部有相同包名的其他 package. 怎么识别并处理这种情况?
...
包所在不一定只是 packages 目录内, 而是在 pnpm-workspace.yaml 配置中指定的, 可以通过 pnpm list --json -r 来获取所有内部包, 基于此再做过滤.
...
https://chat.deepseek.com/a/chat/s/f2241a08-daf7-4c21-b266-ef53b3d836e6
2025-03-06

node-semver 怎么获取 Tilde 或 Caret 标记?
代码依赖里一般都写 Tilde 或 Caret 标记, 怎么用 node-semver 做解析?
2025-03-05

运行 pnpm -r run build 构建问题.
在 monorepo 里运行 pnpm run build 时, 因为有对 build 出的目录删除操作, 如果不设置 workspace-concurrency=1 就会报错, 但设置后速度就很慢. 应该怎么解决?
https://gemini.google.com/app/f37076c19be3c895
2025-04-11
在 npmrc 里设置 `workspace-concurrency=1` (注意与`--parallel`区别) 的用途:
- 避免并发引发的竞态问题: 各个子项目在构建、清理或其他任务中可能存在共享资源（比如同一个目录、文件或网络资源）的写入冲突，强制串行执行可以防止由于并发操作带来的竞态条件和文件锁冲突。
- 任务之间存在依赖或副作用: 当某些任务必须按照严格的顺序完成，或者前一个任务的产物会影响下一个任务的执行.
在设置 pnpm 的 workspace-concurrency = 1  时候, 怎么利用 nx 能缓存构建结果加速构建过程?
2025-03-13
pnpm -r run build 怎么先构建被依赖的包?
对于 npm alias 形式的依赖, 没有先构建 dependencies 是怎么了?
2025-02-28
使用 pnpm 未把 dependencies 构建完成,而导致 dependent 构建失败的问题
https://stackoverflow.com/questions/72216431/how-to-control-pnpm-workspace-build-order
2025-02

npm 的 dependencies 写了 latest, 是怎么解析版本的?
如果 最新发布的版本 是个 alpha 但不是 latest 标签, 会对它做解析吗?
这个最新的 alpha 版本的依赖有缺失, npm install 包的 latest 版本时, 实际不应安装这个 alpha 版本, 但 先对这个 alpha 版本 报错 No matching version found, 导致 安装失败. 是为什么?
2025-02-13 https://chatgpt.com/share/67ad9bcd-913c-8008-aa33-1edb177b7203

npm install --legacy-peer-deps
npm v7+ 默认 自动安装各个包的 peerDependencies 但使用了 --legacy-peer-deps 则不会安装,
需要 包使用者(比如业务仓库) 在 dependencies 或 devDependencies 中自行安装.
使用 --legacy-peer-deps 的主要风险是运行时兼容性问题。由于忽略了 peer 依赖检查，安装的包可能在运行时无法正常工作。例如，某个组件库可能依赖 react@16 的特定 API，而项目使用 react@17，可能导致功能异常。
2025-02

monorepo same package name multiple version coexist
除了使用 npm alias 功能外, 还有其他办法吗? 使用中文回复.
...
通过以上提到的哪种方法, 能够解决如下报错
npm ERR! code EDUPLICATEWORKSPACE
npm ERR! must not have multiple workspaces with the same name
...
使用 lerna 和 pnpm 并加入 project.json 文件, 可以让多个子包 package.json 有相同的 name 和不同的 version. 除此之外,还有更多的实现办法吗?
...
参考 https://stackoverflow.com/questions/26414587/how-to-install-multiple-versions-of-package-using-npm
回复最好 https://gemini.google.com/app/4c2ea1e657922b90
2025-02-24

npm yarn 和 pnpm 的 lock 文件内容结构详细解释?
现在使用 pnpm 工具, 有两个环境, 比如 A 环境 registry 是 https://ra.com 生成了 lock 文件. 但 B 环境 registry 是 https://rb.com , 希望复用 A 环境生成的 lock 文件, 怎么做到? pnpm-lock.yaml 文件里的 tarball 地址, 怎么能不区分 ra rb 的域名?
需要在 monorepo 里存在 同名包的 不同版本, 怎么实现?
lerna 和 pnpm 支持 通过 project.json 能让存在 同名包的 不同版本, 使用 npm 能做到吗?
https://chatgpt.com/c/677fbce1-c1d8-8008-ba11-f56bad58fa80
2025-01

前端或 node 项目, 引用A包的时候，比如A引用了B，B里面有overrides/resolutions，最终会装 overrides / resolutions 指向的包吗?
主项目的 overrides/resolutions 优先级最高，覆盖所有依赖。
如果主项目没有定义，子依赖的 overrides/resolutions 只会影响其自己的依赖树。
...
怎么在运行 npm start / build 之前, 确保 node_modules 里的依赖有被重新 insall 过
2025-01

https://www.npmjs.com/package/npm-check
https://www.npmjs.com/package/depcheck
2025-01


确保依赖版本始终同步的一种常用方法是，在 package.json 中为工作区包的依赖项指定严格的版本号，而不是 ^ 或 ~ 这样的语义版本号范围。这样做可以避免依赖更新时出现的意外问题。

lockfile 出现合并冲突，主流的包管理工具都支持运行依赖安装命令（npm install/yarn/pnpm install）来自动解决冲突。
在 主分支 上合入 开发分支（git merge feat-branch），theirs 指的就是开发分支，ours 指的是主分支，如果两个分支同时更新同一模块的版本号、对 lockfile 进行合并的策略:
- npm: 深合并，并以当前分支（ ours ）的为准
- yarn: 浅合并，并以目标分支（theirs）的为准
- pnpm: 深合并，以版本号大的为准 (认为 新版本出现的问题会比旧版本更少)
  - 关注直接依赖 搜素 specifiers 的版本变更，对于直接依赖引入的间接依赖，自动升级出错的概率较小（一旦出错影响的不只一个项目），且 review 成本太高，选择信任社区。
  - 支持在每个分支中生成锁文件 https://github.com/pnpm/pnpm/pull/4475 。
  - [@types/react 18.3.5 bug](https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/70418) 在 package.json 设置 resolutions 锁定版本。

对于应用项目来说，可以直接使用固定版本；但是对于类库项目，不推荐固定版本，有以下原因:
- 依赖该类库的应用项目无法充分复用依赖: 比如 ^1.0.0 和 ^1.1.0 可以合并成 ^1.1.0）
- 类库项目的间接依赖出现安全漏洞时，无法通过重新安装依赖直接修复
- 锁定直接依赖的版本也不完全有效，丢失 lock 后，直接依赖的间接依赖还是会进行升级，进而导致 BREAKING CHANGE
- 锁版本 就得信任其他依赖不会出现问题（听天由命）
- 尽量由开发流程保证，有冲突就复测，并做好充足的人工 review

在开发一个 npm包 时，你的 npm包 是需要被其他仓库依赖的，由于扁平安装机制，如果你锁定了依赖包版本，你的依赖包就不能和其他依赖包共享同一 semver 范围内的依赖包，这样会造成不必要的冗余。所以我们不应该把package-lock.json 文件发布出去（ npm 默认也不会把 package-lock.json 文件发布出去）。

npm 包的主版本号为 0 时，会被认为是一个不稳定版本，主版本号和次版本号都为 0: ^0.0.z、~0.0.z 都被当作固定版本，主版本号为 0: ^0.y.z 表现和 ~0.y.z 相同，只保持修订号为最新版本。
1.0.0 的版本号用于界定公共 API，对外部发布一个正式版本的npm包时，把它的版本标为1.0.0。

pre-release 预发布版本号的排序规则是:
不同预发布版本类型之间 alpha < beta < rc < release（即稳定版本，没有预发布标识符）。
同一预发布版本类型下，数字越大，版本越新，例如 1.0.0-alpha.1 < 1.0.0-alpha.2。
比如 rc-0..n > beta-0..n > alpha-2..

2024-07~12

npm version 怎么自动升级 monorepo 的 子包依赖版本号
pnpm 只检查并保持 workspaces 内部包 的最新版本，写成 bash 脚本
2024-06







## git

[git](https://github.com/git/git) .git/hooks/query-watchman

git 三板斧 (2018)
- 一板基础斧 add，commit，pull/push，checkout，revert
- 二板合作斧 merge，rebase，stash，cherry-pick
- 三板优雅斧 commit --amend，rebase -i

```sh
# https://github.com/paulirish/git-open
# https://gitlab.com/warmhug/test

# -f 强制运行  -d 同时考虑子目录  -x 清理忽略文件  -n 模拟删除操作.
git clean -fdxn  # git 删除 Untracked files

git ls-files -m  # 列出所有已跟踪且内容已修改的文件
git ls-files -o --exclude-standard  # 列出所有未跟踪且不在 .gitignore 中的文件
git ls-files -m -o --exclude-standard -z  # 一起列出来
git ls-files -m -o --exclude-standard | tr '\n' ' '  # 替换换行为空格
# 修改 git status --porcelain 的输出内容
git status --porcelain | awk '$1 == "M" || $1 == "??" {print $2}' | tr '\n' ' '
# 不检测更新
git update-index --skip-worktree -- .npmrc  # 比 assume-unchanged 更好
git update-index --no-skip-worktree -- .npmrc
git update-index --assume-unchanged file1 file2
git update-index --no-assume-unchanged file1 file2  # 恢复检测
# https://stackoverflow.com/questions/12288212/git-update-index-assume-unchanged-on-directory
# 对于 untracked files 不支持使用 assume-unchanged 先加入到 .git/info/exclude 排除
git ls-files -o --exclude-standard >> .git/info/exclude
git update-index --assume-unchanged $(git ls-files -m | tr '\n' ' ')
git ls-files -v | grep '^[a-z]'  # 获取已经被 assume-unchanged 的文件

git remote [-v add | set-url] origin git@xxx.git
git ls-remote --heads origin
git ls-remote --tags  # 查看远程仓库所有 tags
git config -l  # --list

git commit --amend  # 修改提交信息
git commit --no-edit  # 使用上一次的提交信息进行提交 (未进行过提交会失败)
# 压缩 commit 保留压缩前的所有commit信息 其中的 hash 修改记录 也会被保留
git merge --squash feature-branch
git add . && git commit --no-verify

git pull --rebase
git pull   # 仅拉取与当前分支相关的标签 只有当标签指向的提交是由于拉取特定分支而下载到本地时，这些标签才会被自动下载。
git pull --tags   # 拉取所有分支的更新 + 所有 tags .  注意: 远程仓库可能包含大量历史 tags（如版本发布标签），全量拉取会占用额外存储和网络资源.
git pull --prune	# 更新所有远程分支引用，并删除本地已失效的远程分支引用
git fetch --prune --prune-tags  # 删除本地已被远程删除的标签 Git 2.20 及以上版本
git fetch --tags -f  # 强制覆盖本地 tags
git fetch   # 获取 当前origin的远程 所有分支 信息
git fetch --all  # 获取 当前origin和设置的其他origin的 所有分支 信息
git fetch --all --tags  # 额外获取所有 tags 信息
git fetch origin master
git branch -m newBranchName  # 重命名分支
git checkout HEAD~1 -- file1 dir1
git reset HEAD~1 file1 dir1

git log master..feat-xx --oneline
git log -n 10
git log origin/master -- .npmrc package.json
git log --name-status # 显示文件增删状态
git log --graph
git log --oneline --decorate
git log --oneline --first-parent --reverse | tail -1
git log --graph --pretty="%Cred%h%Creset -%C(auto)%d%Creset %s %Cgreen(%ar) %C(bold blue)<%an>%Creset" --all
git log --graph --pretty="%Cred%h%Creset -%C(auto)%d%Creset %s %Cgreen(%ar) %C(bold blue)<%an>%Creset"

# HEAD = HEAD~0 = HEAD^0 当前提交
# HEAD~1 = HEAD^ 主线的上一次提交  HEAD~3 = HEAD^^^ 主线的上三次提交
# HEAD^1 主线提交（第一个父提交） HEAD^2 第2个并入的分支的最近一次的提交
# HEAD^2~3 第2个并入的分支 的最近第 4 次的提交
git diff HEAD^  # 比较 最新提交 和 其父提交 的差异
git diff master..feat-xx
git diff origin/master..origin/master -- .npmrc
git diff --name-only version1/branch1 version2/branch2
# 比较当前分支和 master 分支的实际不同的内容
git diff --name-only master..HEAD
git diff master..HEAD -b -w --ignore-blank-lines --ignore-space-change --ignore-all-space -p --stat [file/dir]
git diff master..HEAD -b -w --ignore-blank-lines --ignore-space-change --ignore-all-space --name-only
git diff @{upstream}
# 创建和 apply 补丁
# 当前为 branch-a 分支，想应用 branch-b 相对于 branch-a 的更改
git diff branch-a..branch-b > changes.patch
git diff branch-a..branch-b -- path/to/file > changes.patch
git apply changes.patch

# git merge 会产生重复无用的 Merge pull request pull_id from xx_branch 或者 Merge branch “branch_name” 信息，不利于 review 提交记录。
# git rebase 需要经常 reapply 其他提交的改动，commit 的时间顺序也会乱掉。只对自己的分支 commit 做 rebase，公共的分支不要 rebase. 其后续的 commit hash 将全部改变
git rebase -i [commit_id] # hash 换成 master
git rebase -i --root # 删除第一个提交
git rebase origin/master
git push --force-with-lease  # 强制提交 比 -f 安全

# cherry-pick 和 rebase 最终都会在操作完之后、修改同样提交的 commit hash 值
# 场景: 比如要 pick 的 来源分支的 commit 只是 HADE~1, 但 来源分支的 HEAD~5 和 目标分支的 HEAD~1 有相同的 commit_hash (即来源分支同步了最新的 master commit 但目标分支没有同步), 此时来源分支的 HADE~1到4 (而不是预期的只是HADE~1) 的 commit 都会 apply 到 目标分支, 并且在目标分支 同步过来的 HADE~1到4 的 commit hash 都会被重新修改。
git cherry-pick src_branch_commit_hash  # 切换到 目标分支
# 从另一个仓库的分支 pick 先 git fetch <other-repo-url> <other-branch>
git cherry-pick commit_hash # commit_hash 可以是其他仓库的hash

# --soft 不修改本地文件 --hard 本地的文件修改都被丢弃
git reset --[soft | hard] [origin/master | file | 057d]
git reset --hard && git clean --force -dfx # pristine
git reset --hard && git clean --force -df # wipe
git revert commit_id # 回滚代码 不抹掉 提交记录 产生新纪录
# git reflog 的记录只会保存在本地，不会推送到远程仓库。
git reflog  # 撤销 reset 时 找到撤销前的 commit_id 再 git reset 即可


# Git 标签是与特定的提交关联的，而不是直接与分支关联 。
# 标签是提交的别名，只要标签存在，它所指向的提交（以及该提交的历史）就会被保留 。 删除标签只会移除这个标签的“标签”本身，而不会影响代码或提交 。同样地，删除分支也不会删除其指向的提交 。
# tag 只附在一个 commit 上、如果这个 commit 被 squash，但 tag 仍然存在。
# https://stackoverflow.com/questions/54281360/what-happens-to-tags-of-squashed-commits
# 在 git rebase 之后，标签可能会指向新的历史中任何分支都无法访问的提交。在 rebase 后的历史中，这些标签有时被称为“悬空的”或“孤立的”。然而，标签本身仍然存在于仓库中。
git tag v1.0  # 给当前分支最新 commit 打 tag
git tag v1.0 commit_id  # 给当前分支 某个 commit_id 打 tag
# 打 annotated tags  使用 git show tag_name 会看到包含 tagger 标记
git tag -a 0.0.1 -m 'Release version 0.0.1'
git tag -a -m '@pkg/xx@0.1.16' @pkg/xx@0.1.16
git tag -a @pkg/xx@0.1.16 -m '@pkg/xx@0.1.16' 4da6c3d4 -f
# 推送 tags
git push [origin] --tags    # 推送所有标签到服务器
git push --follow-tags --no-verify origin f-i18n-xx
git push origin tag_name
git push origin --delete tag_name
git push origin :refs/tags/tag_name
# 删除 tags
git tag -d tag_name
git tag -d $(git tag -l)  # 删除 本地所有 tags
# 搜索本地的某个 tag_name
git tag -l '*tag_name*'
git tag | grep tag_name
# 按时间排序的最近 5 个 tag (再转为 json 数组)
git tag --sort=-creatordate | head -n 5
git tag --sort=-creatordate | head -n 5 | awk 'BEGIN{printf "["} {printf "%s\"%s\"", sep, $0; sep=", "} END{print "]"}'
git for-each-ref --sort=-creatordate --count=5 --format='%(refname:short) %(objectname)' refs/tags
git for-each-ref refs/tags/ --format='%(refname:short) %(objectname)'
# 查看 tag 信息
git describe --first-parent
git describe --all  # 查找所有分支上的标签
git describe --tags
git describe --tags HEAD
git describe --tags --match "xx"  # 仅匹配名称包含 "xx" 的标签
git show-ref --tags
git tag -v xx@0.1.1  # 非 annotated tags 会报错 error: cannot verify a non-tag object

# 查看当前分支上有哪些 tags
git tag --merged HEAD / feat1 # 所有直接打在该分支的 commit 上的 tag (无论新旧)
git tag --no-contains master  # 获取那些不包含在 master 中的标签
git tag --contains HEAD  # 查看直接指向当前分支 最新 commit 的 tag
git tag --points-at HEAD  # 查看直接指向当前分支 最新 commit 的 tag
git tag --points-at 6627f6  # 查看直接指向 某个 commit_id 的 tag

# 遍历所有本地的 tag，检查每个 tag 指向的提交是否是当前分支（HEAD）的祖先, 即在当前分支的历史中。
for tag in $(git tag); do if git merge-base --is-ancestor "$tag" HEAD; then echo "$tag"; fi; done

# 操作 https://stackoverflow.com/a/930495/2190503
# 在 .gitattributes 文件里配置 当 pnpm-lock.yaml 出现冲突时，将以当前分支为准
pnpm-lock.yaml merge=ours

# 其他
git rev-list --left-right --count origin/branch1..branch1
git reflog show branch1 -n5 | grep 'rebase'

# 每个 commit 都包含两个时间戳 作者时间（AuthorDate） 提交时间（CommitterDate）
# Git rebase、amend、cherry-pick 等操作会保留旧的 AuthorDate，但会更新 CommitDate
git show --no-patch --pretty=fuller commit_id

# GitHub stars topics/javascript
# https://www.star-history.com/#google-gemini/gemini-cli
# https://github.com/search?q=stars:%3E1&s=stars&type=Repositories
# https://github.com/topics/javascript

# 搜索 issues
# https://help.github.com/articles/searching-issues/
# https://github.com/search?type=Issues&q=xx+in:body+author:warmhug
# https://github.com/search?type=Issues&q=xx+commenter:warmhug+user:ant-design
# https://github.com/search?type=Issues&q=xx+commenter:warmhug+repo:ant-design/ant-design-mobile

# GitHub commit 或合并 MR 时，可以自动修改 issue 状态、关闭关联的 issue。
# 业内成熟的 GIT 分支模型 https://cloud.githubusercontent.com/assets/36899/7315642/015f534c-eaa2-11e4-9882-b7cc7535fb72.png
# GitHub Issues blog https://gitblog.io/
```


git 出现合并冲突时候, ff 和 no-ff 等操作过程和原理是什么? 图示演示一下.
2025-04-23

当前 head 的 commit 是 Merge branch , 前一个 commit 也是 Merge branch, 而 tag_name 是在第三个 commit 上. git diff tag_name 是空, 为什么?
是因为 当前工作目录或暂存区与标签对应的提交之间没有文件内容差异。
2025-04-22

git rebase squash 后, 还能找到 squash 前的 commit ID 内容吗?
2025-04-09

预期是 feature 流水线 如果是成功状态, 可以 直接合并代码到 master 分支. 问题:
- 一天前 feature 分支流水线 运行成功, 半天前 master 有改动, 因为时差 导致 feature 分支的一些检查: rebase master 过期, feature代码本身无问题.
- feature 分支和 master 有 git 冲突, 会在 release 分支产生 conflict 需要手动解决.
  - feature 分支 及时 rebase master 的更新, 可提前在 feature 分支解决冲突.
feature 分支和 master 无 git 冲突, 但可能有 增删代码 的 逻辑冲突.
自动合并示例 (比如对 配置文件 .npmrc 的第12行 做修改. 或 package.json 的 dependencies 里):
- feature分支 此文件 的第3行 后只有 2行 内容。
- origin/master分支 此文件 的第3行 后有 5行 内容，并和 feature分支 的 后2行 内容完全不同。
此时合并结果为: 前两行(相同) + origin/master分支后5行 + feature分支后2行. 没有冲突 但结果不符合预期.
怎么解决?
- feature 分支 及时 rebase master 的更新. rebase 时冲突可能解错.
- 需要合并进 master 的多个 feature 分支, 按顺序 一个挨一个 合并. 不能解决.
- 发布负责人 负责 review 逻辑冲突. 防止 误修改 问题.
2025-03-29

使用 gitlab  或 github 的 monorepo 项目, 怎么能在 目录或文件级别 做文件可见性的权限控制, 或者怎么监控文件是否被下载和转存到其他地方去过?
Git子模块（git submodule）或子树（git subtree）的使用区别?
https://chatgpt.com/share/67e401da-969c-8008-bb41-ad633ded15e8
https://chat.deepseek.com/a/chat/s/0b84021f-9c40-416f-8203-cde1b0009754
git submodule 示例 https://github.com/eclipse-ecal/fineftp-server
2025-03-26

在 monorepo 项目中 别人误改代码, 特别是 增删 代码时间差, 不会出现 git 合并冲突提示. 这些问题怎么解决?
https://grok.com/share/bGVnYWN5_4183142b-9444-44e5-a1bf-8df9eaab4eb0
https://chat.deepseek.com/a/chat/s/95cd77b8-83cc-4d77-b070-f01354419422
https://chatgpt.com/c/67e2730c-bfb4-8008-804a-c72b94bd9469
https://github.com/Wilfred/difftastic
2025-03-25

Git 中的标准合并冲突检测通常依赖于识别相对于共同祖先提交在相似时间范围内发生的重叠修改. Git 的底层三向合并算法比较合并点处的文件状态及其最近的共同祖先。虽然这种机制通常对于同一行或近距离的并发更改有效，但它可能无法始终捕获由于分支历史中在明显不同时间执行的操作而出现的语义冲突。  
例如，如果在一个分支中添加了一个函数，而稍后，另一个分支中删除了包含该函数的文件，尤其是在中间有提交的情况下，Git 可能不会将此标记为需要手动解决的冲突。这是因为，从 Git 的角度来看，在被比较的特定提交级别上，更改可能看起来不重叠。代码修改缺乏直接的时间重叠可能会导致语义差异，而 Git 的纯文本比较可能会忽略这种差异。
长期存在的功能分支虽然是某些开发工作流程中的常见做法，但可能会加剧此问题分支存在的时间越长而未合并回主线，其历史偏差就越大。必须承认 Git 冲突检测的固有局限性。它主要关注文本冲突，识别文件内容中的重叠修改. Git 本身并不具备对代码更改语义含义或它们之间的时间关系的理解。因此，在具有众多相互关联的项目和可能错综复杂的提交历史的复杂 monorepo 环境中，仅依靠 Git 的自动冲突检测通常不足以保证代码完整性并防止用户遇到的延迟冲突情况。
...
git 的合并冲突检测主要基于文本更改，即当同一行代码在不同分支中有不同修改时才会触发冲突。然而，逻辑冲突——即更改在文本上不冲突但合并后可能导致功能错误的场景——往往不会被 git 自动检测。例如，一个开发者添加了一个依赖某个变量的新函数，而另一个开发者删除了该变量，git 可能不会提示冲突，但合并后的代码会出错。
...
Git 合并出现冲突的原因在于 两个分支版本对一个文件的同一区域 做了修改。行级冲突提示.
如果是不同区域，Git 会尝试自动合并（auto-merge，默认策略）解决冲突, 但这可能引起逻辑错误。
不同大版本 不能通过 git合并代码 因为无法解决冲突:
- 代码差异过大: 1.x 和 master 在文件结构、功能模块等方面差异较多。
- 历史变更未同步: master 分支的某些改动未在 1.x 中体现。
- 文件删除或重命名: 1.x 和 master 对同一文件的操作不同步。
- 如果 1.x 和 master 需要长期共存，定期同步两者的改动，避免分支差异积累到难以处理的程度。
2025-03-25

本地 git tag tag_v1 commit_id1 后, 运行了 git rebase 导致 commit_id1 不存在了, 那么 tag_v1 能通过哪些方法获取到? git show tag_v1 可查看, tag_v1和commit_id1都还在仓库里.
如果运行 git push --tags 那么 这个 commit_id1 也会被推送到 remote 仓库里吗?
会的, 但这个 commit 不再由任何分支引用 不可达 (dangling objects) . 如果引用它的 tag 也被删除, 那么一段时间后（经过垃圾回收）该 commit 就会被清理掉.
...
远程仓库有些 tags 的 commit 是通过分支 不可达 的, 怎么检查出这样的 tag和 commit, 并删除他们?
...
悬空提交(dangling objects) 是指无法从任何分支或标签访问的提交. Git 定期执行垃圾收集来清理这些无法访问的对象，这最终可能导致从存储库中永久删除这些原始提交。但是，标签的存在，即使是指向旧提交的标签，也可以防止该提交被立即视为垃圾，因此可能会将其保留一段时间。如果在重新定基之前暂时需要访问存储库的状态，则这可能很重要。最终，指向不存在的提交的标签将充当无效引用，虽然它可能会暂时阻止相关提交立即进行垃圾收集，但它不符合使用标签进行可靠历史引用的预期目的。
GitHub上删除的分支是否保证不会泄漏数据？ https://github.com/orgs/community/discussions/70144  https://stackoverflow.com/questions/33283350/what-happen-to-git-tags-pointing-to-a-removed-commit
2025-03-24

在 feature 分支打了 tag, 又进行了 git rebase master 导致 feature 分支的 tag 对应的 commit_id 不存在. 这种情况, 怎么更新 tag 对应的 commit_id? 要求能集成到 bash 脚本里.
...
在 feature 分支打了 tag 并推送到了远程 同名的 feature 分支, 发布后 remote feature 分支会被自动删除, 并把代码 Merge 到了 master 分支. 但 本地同名的 feature 分支仍然存在, 继续在此分支上开发, 并打了新的 tag, 那么当前 feature 分支关联了多少 tag? 远程的 feature 分支虽然被删了 但远程 tag 仍然存在, 远程 tag 对应的 commit_id 已经被合并到 master 分支, 还能查到 远程 tag 最初的 feature 分支来源吗?
...
使用 bash 实现以下功能:
检查 feature 分支 以及其对应的本地 commit_id 与 remote 的 commit_id 是否一样, 不一样则报错.
只检查当前 feature 分支相对 master 分支新产生的 git tags 和 commits 的情况.
...
怎么用 bash 判断本地feature分支 包含了 同名远程分支 的所有 commit ?
如果本地 feature 分支有过 git rebase 操作, 有哪些方法能识别出来?
https://chat.deepseek.com/a/chat/s/a1b458c9-36b5-49a0-aed4-ac8e03361407
https://chat.deepseek.com/a/chat/s/09b782e5-cb72-425f-9ade-40dce19f84cf
https://chatgpt.com/share/67e0fcfd-65d0-8008-8176-c4e7c00af263
https://gemini.google.com/app/9fe03b92a9586011
2025-03-24

运行 git pull (不是 git pull origin develop ) 会把 remote 所有分支的 tags 也拉下来吗? 不会.
...
当远程的 git tags 有更新时, 本地的 tags 怎么和远程保持一致?
有些标签对应的 commit_id 已经没有在 remote 仓库里, 这些标签应该也删掉吗?
2025-03-23

Git操作你还在用merge吗？字节一面：讲讲你对rebase的理解！
先说结论：不是merge不行，是rebase更优雅！
你以为git merge就够了？字节大佬教我：commit记录也是代码质量的一部分！
血泪教训1：分支历史混乱
merge的痛点：分支历史像盘面条 commit信息难追踪 代码回溯困难 合并冲突频繁.
rebase的优势：历史记录线性干净 commit信息清晰 方便代码review 减少无效commit记录.
暴击伤害2：合并冲突地狱
字节实战翻车案例：
某项目上线前夕，多分支合并导致：解决冲突花了3小时 丢失部分代码改动 紧急回滚3次 项目延期2天.
merge vs rebase 核心区别
merge方式：保留完整历史 分支结构复杂 适合长期分支 操作相对简单.
rebase方式：重写提交历史 分支结构线性 适合短期分支 需要谨慎操作.
最佳实践总结
1. 适合用rebase的场景：个人功能分支 短期特性分支 同步远程代码 提交PR/MR前
2. 适合用merge的场景：长期维护分支 发布分支 多人协作分支 紧急修复分支
rebase进阶技巧
1. 交互式rebase：合并多个commit 修改commit信息 调整commit顺序 删除无用commit
2. 黄金法则：不要rebase公共分支 及时同步远程代码 解决冲突要谨慎 保持commit原子性 团队规范建议
面试官最爱问
技术深度：rebase原理 解决冲突策略 分支管理方案 Git工作流
实战经验：大型项目协作 冲突处理经验 分支管理实践 团队规范制定
记住一句话：用merge还是rebase，不是个人喜好，而是团队协作效率的保证！
2025-02-16 git 操作 https://m.toutiao.com/is/JG7lVw39SZU/

js工具库代码最新版本是 3.x，但需要修复很久之前的 1.x 版本的 bug，当前只有 master 分支，怎么用 git 管理老版本的代码升级？  LTS（长期支持）策略 详解。
如果是 monorepo 项目，应该采用什么策略？
在老的 1.x 分支上拉了代码做改动，合并到 master 产生了大量冲突，怎么解决？
怎么在 git 提交历史中插入一个提交？
怎么把 某个 commit 改动的文件，应用到另一个分支上、但不携带改动之前的历史信息。
以上合并方式是什么？把改动的文件内容全覆盖，还是对改动的某些行进行交集合并，删除的文件或内容怎么处理？
https://chatgpt.com/share/673dd191-0d74-8008-a826-16844c0b9bb5
2024-11

git 有很多 commit，一次性合并所有提交记录
git rebase autosquash 更详细用法
https://chatgpt.com/share/674ab367-c974-8008-9cdb-410303f51fe4
2024-09

bash 处理 git ls-remote --tags origin 和 git tag -l 获取到的字符串列表，并正则匹配到字符串里 refs/tags/ 之后的部分
2024-07











## TypeScript

这么写的 export type * from 'xxx';
报错: error TS1383: Only named exports may use 'export type'.
ts不允许这么写. 在 compilerOptions 里加上 "skipLibCheck": true, 忽略.
2025-07-01

不同子包依赖了不同的 ts react react-router 版本, 在 pnpm 下会互相影响?
源码存在 `import { Route, StaticRouter } from 'react-router-dom';` 时, ts 会报错
Route, StaticRouter 不存在.
2025-04-09

lerna + pnpm 的 monorepo 项目, 在子包里单独引入 TS 的版本, 怎么能不受 根目录的 @types/react 版本影响?
2025-04-06

@types/node @types/react 版本 需要和 typescript react 版本匹配.
2025-04

https://github.com/microsoft/typescript-go/discussions/411
2025-03

monorepo 项目根目录 tsconfig 里已配置 "paths": { "@xx/monoaid": ["./common/monoaid/src/index.ts"] }
根目录有个 build.mjs 文件,内容有 import { xx } from '@xx/monoaid';
使用 node ./build.mjs 运行报错 Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@xx/monoaid'
这是因为 TypeScript 的 paths 配置只影响 TypeScript 编译器和工具（如 IDE 的代码提示），而不会直接影响运行时（Node.js）。Node.js 不会解析 tsconfig.json 中的 paths，所以它找不到 @xx/monoaid 模块。
2024-12

[TypesSript 装饰器源码分析](https://github.com/frontend9/fe9-library/issues/226)
[使用 TypeScript 实现依赖注入](https://github.com/frontend9/fe9-library/issues/225)
[如何实现一个 TypeScript 的宏](https://github.com/frontend9/fe9-library/issues/186)
[让 babel 帮你编译 typescript](https://github.com/frontend9/fe9-library/issues/23)
https://github.com/zzj3720 (github/toeverything)
[conditional type 中的联合类型与 never](https://github.com/frontend9/fe9-library/issues/135)
[TypeScript专栏](https://www.zhihu.com/column/c_206498766)
2019


```sh

# pnpm tsc 当存在多个版本 typescript 查看当前使用的是哪个
pnpm exec tsc -v  # pnpx tsc -v 会报错
pnpm exec which tsc  # 查看
ls -l ./node_modules/.bin/tsc

pnpm exec tsc --build --traceResolution > a.log

# 查看当前项目 typescript 版本
npx tsc -v
npx tsc --showConfig
# 输出 resolution 日志
npx tsc --traceResolution
# 如果遇到 react 问题, 搜 Resolving module 'react' from
npx tsc -p tsconfig.json --traceResolution

# 遇到ts类型报错 Cannot find module '@xx' or its corresponding type declarations.
# 打开报错的 ts 文件, 按 Cmd+Shift+P 输入 TypeScript: Go to Project Configuration 它会跳转到当前文件生效的 tsconfig
```

TypeScript 的模块解析机制, 查找类型声明的顺序是：
- 当前包的 node_modules/@types
- 往上级目录递归找 node_modules/@types
- global 的类型（如果 tsconfig 配置了）
如果只限制在当前包查找, 在 tsconfig.json compilerOptions 配置 paths.

https://www.typescriptlang.org/tsconfig/  tsconfig.json 配置

```json
// 比如是 monorepo 根目录的 tsconfig.json
{
  "compilerOptions": {
    // baseUrl 的 . 和 ./ 一样 ,
    "baseUrl": "./",
    "target": "es5",
    "module": "esnext",
    "moduleResolution": "Node",
    "strict": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "declaration": true,
    "strictBindCallApply": false,
    "importHelpers": true,
    // debug
    "explainFiles": true,
    "traceResolution": true,
    //
    "typeRoots": ["./typings", "./vendor/types"],
    "types": ["node", "jest", "express"],
    //
    "paths": {
      "tslib": ["node_modules/tslib/tslib.d.ts"],
      "*": ["./node_modules/*", "*"],
      "@/*": ["src/*"],
      "@@/*": ["src/.space/*"],
      "@xx/yy": ["src/index.ts"]
    }
  },
  "include": ["src/**/*", "tests/**/*"]
}

// monorepo 子目录 ./packages/_demo/tsconfig.json 内容如下,
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "noEmit": true,
    "paths": {
        // 注意 虽然是在 packages/_demo 子目录里, 但这里 compilerOptions - paths 路径写法是相对 项目根目录 .
        // 如果再设了 baseUrl: "./" 才是相对 packages/_demo 解析
        // 即 compilerOptions.baseUrl 和 paths 的解析是以：最终（合并后的） tsconfig.json 中的 baseUrl 为准。 https://chatgpt.com/c/6846814a-2dd0-8008-b63c-d61d4825318f
      "myswr": ["./packages/swr/index.tsx"],
    }
  },
  // 如果是自建的 以 点 开头的目录, 在 unix 系统里会被当做 配置文件 而默认不被 vscode 等解析.
  // 比如 .xx 在 include 里不能只写 ".xx" 而是 ".xx/**/*"
  "include": ["./src", "./.i18n/**/*"]
}
```

基本语法

```ts
// @ts-nocheck  // 忽略整个文件
// @ts-ignore  // 忽略一行

export type * as xTypes from 'x-editor'
export type { default as xTypes } from 'x-editor'

export type ProFormListItemProps = {
  onAfterAdd?: (...params: any) => any;
}

// Arrow function returning an array of numbers
const getArr2 = (): (string | number)[] => {
  return [1, '2', 3];
};
// arrow function
const getObj2 = async (): Promise<{ name: string; age: number: [key: string]: any; }> => {
  return { name: 'Bobby Hadz', age: 30, xx: 'any' };
};
// Readonly
function getTuple(): Readonly<[number, number]> {
  return [10, 100];
  // return [10, 100] as const;
}

// 泛型
interface GenericInterface<T> {
  (arg: T): T
}
function foo<T> (arg: T): T {
  return arg
}
let output = foo('string') // type of output will be 'string'
let myFoo: GenericInterface<number> = foo
myFoo(123)

// 命名空间 types/ajax.d.ts
declare namespace Ajax {
  export interface AxiosResponse {
    data: AjaxResponse
  }
  export interface AjaxResponse {
    code: number,
    data: object | null | Array<any>,
    message: string
  }
}
this.axiosRequest({ key: 'idc' }).then((res: Ajax.AjaxResponse) => {
  console.log(res)
})


// ! 是 typescript 非空断言符，解决 ts 类型空提示问题

// void promise 函数返回值类型
() => Promise<void>

// ts高级用法 Omit Pick
import { INameProps } from './Name';
type IDashboardNameProps = {
  className?: string;
  style: React.CSSProperties;
} & Pick<INameProps, 'id' | 'onSaved'>;
```


文件示例

types.ts

```ts
export interface Config {
  dr: 'cn' | 'us' | undefined;
  env: 'prod' | 'testing' | 'local';
  serviceName?: string;
  [property: string]: any;
}
```

css-modules.d.ts
scss.d.ts

```ts
// declare module '*.module.scss' {
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.scss';
declare module '*.less';
```

declare.d.ts

```ts
declare namespace DApi {
  namespace dStyle {
    interface Req {
      id?: number;
    }
    type Res = typeof import('./dStyleDTO').dStyleDTO.Res;
    type Fn = TFN<Req, Res>;
  }
}
```

dStyleDTO.ts

```ts
import { IsBoolean, IsOptional } from 'class-validator';
export namespace dStyleDTO {
  export const Res = Boolean();
  export class Response {
    @IsBoolean()
    @IsOptional()
    res?: typeof Res;
  }
}
export const dStyle: DApi.dStyle.Fn = (params, options) => {
};
```

typings.d.ts

```ts
declare module 'classnames';
declare module 'uuid';

interface Window {
  DarkReader: any;
}

declare module '*.html' {
  const rawHtmlFile: string;
  export = rawHtmlFile;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.module.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.module.less';
declare module '*.module.less' {
  const content: { [className: string]: string };
  export default content;
}

declare namespace modalManageType {
  interface ModalConfigObj {
    isModalManager?: boolean;
    promise: ModalPromiseObj;
    onCancel?(): void;
  }

  interface OpenConfigProps {
    componentProps: ComponentProps;
    component: any;
  }

  interface ModalPromiseObj {
    resolve(data?: any): void;
    reject(error?: any): void;
  }

  interface ComponentProps {
    [key: string]: any;
  }
}
```








# .


网易 [科技](https://tech.163.com/)  [财经](https://money.163.com/) [国际](https://news.163.com/world/)
[pmbaobao](https://www.pmbaobao.com/) [人人PD](http://www.woshipm.com)
[热榜](https://tophub.today/) [36kr热榜](https://www.36kr.com/hot-list/catalog)
AI新闻 https://ai-bot.cn/daily-ai-news/

[oschina](https://www.oschina.net) [yuque](https://www.yuque.com/iscott)
[极客公园](https://www.geekpark.net) [少数派](https://sspai.com)
[凤凰网](https://www.ifeng.com) [威锋网](https://www.feng.com)
[蜻蜓](https://www.qingting.fm/) [什么值得买](https://www.smzdm.com)
[奇绩创坛](https://www.miracleplus.com)  [壹心理](https://www.xinli001.com)

[时代周刊](https://time.com)  [纽约时报](https://nytimes.com)
[华尔街日报](https://www.wsj.com)  https://youtube.com
https://instagram.com  https://whatsapp.com

[科技周刊](https://www.ruanyifeng.com/blog/2024/10/weekly-issue-322.html)
[chrome-experiments](https://experiments.withgoogle.com/collection/chrome)
[chromestatus](https://www.chromestatus.com/features)、[webkit](https://webkit.org/)
https://coolshell.cn

GitHub登录 https://codesandbox.io  https://codepen.io
[JavaScript risingstars](https://risingstars.js.org)
[Stack Overflow Developer Survey](https://insights.stackoverflow.com/survey)
[stateofjs](https://stateofjs.com/)、[stateofcss](https://stateofcss.com/)
[stateofreact](https://2023.stateofreact.com)
[awesome-react](https://github.com/enaqx/awesome-react)
[awesome-react-components](https://github.com/brillout/awesome-react-components)
[react-next](https://www.react-next.com/)
[设计工具排名](https://uxtools.co/tools/design)

---

2025 react-libraries https://www.robinwieruch.de/react-libraries/

https://webkit.org/blog/16458/announcing-interop-2025/
https://antfu.me/posts/move-on-to-esm-only
2025-02 技术趋势

Vue.js 作者宣布成立 VoidZero https://mp.weixin.qq.com/s/xT7SRffAcUqLFf7Ou4I5Og
2024-11

2023年前端技术盘点与2024年技术展望 https://mp.weixin.qq.com/s/LiygBJqMN8U_vSpAjxMibQ

2022-04 《美国公布：长达35页的2045年新兴科技趋势报告》 https://mp.weixin.qq.com/s/ox6NHtK4usvKJ1gpk8uY8A

gmtc https://gmtc.infoq.cn/2022/beijing/schedule
重庆前端交流会 https://zhuanlan.zhihu.com/p/581717444
[前端领域的 “干净架构”](https://zhuanlan.zhihu.com/p/458410158)
[徐飞 业务中的前端组件化体系](https://zhuanlan.zhihu.com/p/383129585)
2022

[2021 大前端技术回顾及未来展望](https://mp.weixin.qq.com/s/HfZDrrqDNUVpnU-aegKxcg)
[2021 年 Rust 生态版图调研报告](https://zhuanlan.zhihu.com/p/458046979)

2021 《Tubi 工程师文化》 https://mp.weixin.qq.com/s/p_em5wfzhnZGnH4cd16pcQ
2021-12《CEM如何助力企业流量新增长？》https://mp.weixin.qq.com/s/aNT3V-zPTbVWHh4s-njyRg 安道全

[2019中国开源软件榜](https://www.oschina.net/project/top_cn_2019)
[2018前端技术清单](https://juejin.im/post/5bdfb387e51d452c8e0aa902)



## AI



gemini-cli
multiple tasks: https://github.com/google-gemini/gemini-cli/issues/2387
feature 增强: https://github.com/google-gemini/gemini-cli/issues/1585
openrouter支持: https://github.com/google-gemini/gemini-cli/issues/1515
Gemini code assist  https://www.youtube.com/watch?v=hOAGISjKIOY
命令:
gemini --prompt hello
流程:
cli: gemini.js -> settings.js & config.js -> 进入core模块
core: config.js -> GeminiClient core/client.js -> contentGenerator.js -> codeAssist.js -> server.js
cli: useGeminiStream.js submitQuery -> nextSpeakerChecker.js -> core/client.js core/geminiChat.js core/turn.js
修改代码:
- infra/ai/aaid-cli/dist/src/gemini.js
settings.setValue(SettingScope.User, 'selectedAuthType', AuthType.LOGIN_WITH_GOOGLE);
// logUserPrompt
- infra/ai/aaid-cli/dist/src/ui/hooks/useGeminiStream.js
// logUserPrompt
- infra/ai/aaid-cli/dist/src/ui/hooks/useAuthCommand.js
setIsAuthenticating(false);
- infra/ai/aaid-cli-core/dist/src/tools/mcp-client.js
add1MCPStatusChangeListener
- infra/ai/aaid-cli-core/dist/src/code_assist/codeAssist.js
return new CodeAssistServer(authClient, 11, httpOptions, sessionId);
- infra/ai/aaid-cli-core/dist/src/code_assist/oauth2.js
return client;
- infra/ai/aaid-cli-core/dist/src/core/geminiChat.js
// this._logApiRequest(requestContents, this.config.getModel());
// this._logApiError
// await this._logApiResponse
- ai/aaid-cli-core/dist/src/tools/read-many-files.js
return `Will attempt to read and concatenate files:\n ${pathDesc}
- infra/ai/aaid-cli-core/dist/src/code_assist/server.js



Agents 架构
https://github.com/langchain-ai/langchain
https://dify.ai/
https://platform.openai.com/docs/guides/deep-research
https://www.anthropic.com/engineering/built-multi-agent-research-system

Agents
https://github.com/All-Hands-AI/OpenHands
https://github.com/sourcegraph/cody
https://github.com/codota/TabNine
Python 实现
https://github.com/SWE-agent/SWE-agent
https://github.com/AutoCodeRoverSG/auto-code-rover
https://github.com/bytedance/trae-agent


https://github.com/ollama/ollama
https://docs.openwebui.com/
https://huggingface.co/spaces/galileo-ai/agent-leaderboard

https://github.com/openai/codex
claude_code 原理 https://www.reddit.com/r/ClaudeAI/comments/1jpyqlu/claude_codes_context_magic_does_it_really_scan/

continue
https://github.com/continuedev/continue
https://hub.continue.dev/explore/rules
https://hub.continue.dev/explore/prompts
https://docs.continue.dev/customize/context/codebase
https://docs.continue.dev/customization/prompts
https://docs.continue.dev/customization/rules
https://docs.continue.dev/features/agent/how-it-works

v0.dev
https://ui.shadcn.com/blocks/authentication
https://v0.dev/chat/open-in-v0-02cbToAP1lx
https://vercel.com/blog/v0-composite-model-family

[mcp](https://modelcontextprotocol.io/introduction)
https://github.com/modelcontextprotocol/servers
https://github.com/modelcontextprotocol/typescript-sdk
figma mcp
企业新基建：MCP + LLM + Agent架构，将打通AI Agent的“神经中枢”
https://mp.weixin.qq.com/s/zAFVeZdiskhbQuVIfG9eXw


Agentic AI / AI Agent:
Cursor, Jules, Devin,
构建agent: openai-agents-js, VoltAgent, Mastra.ai
Agenticseek, AutoDev AutoGen Auto-GPT

万字综述，讲一讲这两年大模型这整个领域到底发展了哪些方面
https://mp.weixin.qq.com/s/RPj5fS7-hjacswRV7OQY9w
AI Agent 基础设施
https://mp.weixin.qq.com/s/xp1f1BistZxy9rES3We3sA
Claude Code 背后的技术机制
https://mp.weixin.qq.com/s/xCajyF-WWCSCR0ElJdW-0A
https://github.com/DevHorizonLabs/ClaudeX
https://github.com/anthropics/claude-code/issues/59
2025-07


AI驱动研发效率在中后台的实践 https://mp.weixin.qq.com/s/bg32-w2e308XBPXyXpE6sQ
2025-04

[终于找到了AIGC时代连专业前端都能提效的工具](https://mp.weixin.qq.com/s/HU6xBqa2L4VCZBmpTYIV8A)
https://zhuanlan.zhihu.com/p/15140783070
2024-12


------

代码:
https://jules.google.com/
https://bolt.new/  https://githubnext.com/projects/github-spark
https://www.cursor.com/  Windsurf https://codeium.com/
四大国产AI编程助手横向浅评 https://zhuanlan.zhihu.com/p/708820713
字节 https://www.trae.ai/ https://www.trae.com.cn/
字节 编程助手 https://www.marscode.com 海外 https://www.coze.com
百度 comate f2c https://cloud.baidu.com/doc/COMATE/s/jm5atx00b
蚂蚁 https://weavefox.ai/  https://www.yuque.com/weavefox/intro/intro
antd机器人 Peter Cat https://mp.weixin.qq.com/s/PnHVc1_yBPu2HiA2En9cAg
网易-海豹D2C https://music.163.com/st/seal
https://www.ancodeai.com  https://github.com/abi/screenshot-to-code

生成 AI 应用:
支付宝 https://tbox.alipay.com/
https://github.com/rag-web-ui/rag-web-ui
https://www.wordware.ai/
https://github.com/ChatGPTNextWeb/ChatGPT-Next-Web

自然语言生成数据表格 https://columns.ai/chatgpt
电脑操作 https://deepmind.google/technologies/project-mariner/
手机助手
https://github.com/Skythinker616/gpt-assistant-android
https://github.com/X-PLUG/MobileAgent
LLMText https://marketplace.visualstudio.com/items?itemName=Kingleo.llmtext
自然语言命令行 https://github.com/guoriyue/LangCommand
https://github.com/guanguans/ai-commit
-- 工具

https://github.com/coaidev/coai  数字人 https://character.ai
智能客服/知识库问答 https://github.com/1Panel-dev/MaxKB
https://github.com/cs-lazy-tools/ChatGPT-On-CS
阿里 B2B 个人采购代理 https://www.accio.com/  音乐 https://lamucal.ai/
-- 行业

https://huggingface.co/  https://openrouter.ai/rankings
https://lmarena.ai/  https://openlm.ai/chatbot-arena/
https://app.slack.com/client/T053EMGBEEN/C05BVLPE885?geocode=zh-cn
-- 大模型竞技场

https://metaso.cn/  https://onionai.so/  https://poe.com/  https://aichatru.ru/en
https://chathub.gg/  https://chat100.ai/zh-CN  https://www.perplexity.ai/
https://duckduckgo.com/?q=DuckDuckGo&ia=chat
-- 套壳

https://chatgpt.com  https://gemini.google.com/  https://www.meta.ai/  https://llama3.dev/
https://www.tongyi.com/qianwen/  https://chat.qwenlm.ai/
https://chat.deepseek.com/  https://www.doubao.com/chat/
https://www.kimi.com/  https://kimi.moonshot.cn  http://ai.baidu.com/
-- 综合/模型厂商






## 软件

------ APP / mobile

文字图
https://asciiflow.com/
https://ascii-tree-generator.com/
- [asciiart](https://asciiart.website) [figlet](http://www.figlet.org/examples.html) [text-to-ascii-art](https://www.asciiart.eu/text-to-ascii-art)
占位图
- [dummyimage](https://dummyimage.com/750x300/eee/f0f)  [生成logo](https://www.logo.surf/)
- [颜色选择](https://htmlcolorcodes.com/zh/) [flickr](https://flickr.com)
markdown 表情 :+1: :smile: :smiley: :laughing:
- [emojispark](https://emojispark.com/)
- [emoji8](https://emoji8.com/zh-hans/)
- [emoji-cheat-sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet/)

Android 软件: MX播放器(VLC不能播放加密文件) AirDroid 微动手势(允许后台弹出界面和显示悬浮窗), automate,, kwgt, popup widget, macrodroid, tasker(收费), easytouch, anywhere . 反编译apk: apktool/dex2jar/jd-gui/javadecompilers

iOS 快捷指令
- 同步: Apple ID -> iCloud -> 使用iCloud的APP -> 显示全部 找到 快捷指令 勾选同步。
- 朗读的 声音大小和siri一样，不受设置里声音大小的控制，通过设置 Siri 的声音来控制。

---

有两个表情图片 没有删除的地方, 但在 微信和 QQ 的表情选择里 都能看到. 是存放在哪里的? 怎么能删除掉?
2025-06-13

最新发布的 iPad OS 26 能用来写代码? 能安装 vscode terminal 等软件吗?
2025-06-11

2025-05-15 手机控制电脑ppt https://github.com/Rico00121/decktap

网页版微信 https://wx.qq.com/ 能收到的表情包拖到电脑桌面保存.
2025-05

我这个 macrodroid 设置有什么问题，应该怎么修改？
gpt最好，dp疑似抄gpt，豆包一般，百度用dp，通义宕机
2025-04-11

谷歌账号在注册的时候就确定了关联的国家与地区，属于哪个国家地区和当时注册ip手机环境有关系。以下是查看当前 Google 账号的归属地方法：登录 Google 账号，打开 Google 搜索首页 点击 首页右下角 条款  在新页面显示出 国家/地区版本：香港
2024-11-14

[Win系统安装盘](https://zhuanlan.zhihu.com/p/273305963)、系统[下载地址](https://hellowindows.cn/)，电脑开机(按F12)设置U盘优先启动。
2024-04

2023-11 尝试 百度/腾讯/中国移动 网盘，广告多 文件格式支持少，最终使用 微软云盘。

小米多看电纸书[一代](https://item.jd.com/100010633100.html)、安装app[方法](https://www.bilibili.com/video/av893445949/)
iPhone 恢复出厂设置后，系统软件版本是 iOS 最新版 不是出厂时旧版本。 连接数据线恢复备份的文件后，各个第三方app仍然需要重新下载、如有卡死状态 用手机网络 先下载重要app 其他暂停.
2022-09

2022-05 惠普z27k显示器 typec 100w 输出功率 能给电脑充电

2019 支持 Mac + Win 读写的U盘格式: exFAT FAT32 NTFS(软件 ntfstool / ParagonNTFS )


------ macOS

设置
- 点击和手势: 触控板。1 勾选 “轻点来点按” 2 启用词典：查询与数据检测器 - 选择三指轻点 3 更多手势 - 应用Expose。
- 三指拖移窗口: 辅助功能 -> 鼠标与触控板 -> 触控板选项 -> 启用拖移 -> 三指拖移。
- 触发角: 调度中心 -> 触发角 (左上角:启动台, 左下角:显示器睡眠, 右上角:调度中心, 右下角:桌面)。
- 键盘 -> 键盘快捷键:
  - 输入法(input source) 选择 `cmd + 空格`，在 “服务” 里勾选或不选。
  - 打开文件夹下的 terminal: 选择 服务(Services), 展开 "文件和文件夹", 勾选 "新建位于文件夹位置的终端窗口", 选择一个文件夹 "右键" 即可看到.
  - [添加快捷键](https://superuser.com/a/1260437)
- launchpad 里的图标 不能一次性拖动 多个 进行移动. (macOS 15.3)
- dock: 程序坞 -> 不勾选 “在程序坞中显示最近使用的应用程序”(最后一项) 显示隐藏 `cmd + alt + d`。
- 通知: 通知中心 -> 勾选 “当显示器进入睡眠状态时/当屏幕锁定时”
- 文本替换: 键盘 -> 文本，「command + A」全选、拖拽到 Finder 会生成 “用户词典.plist” 的文件。
- 系统顶部菜单栏: 按住 `Command` 再拖动图标，改变右边图标顺序。
- Finder 设置
  - 列表视图 `cmd + 2` 展开所有子文件夹 `alt + 左边箭头`。
  - 按 `cmd + alt`，拖动 app 到工具栏。
- QuickLook: 搜索下载 QLMarkdown / QLStephen / QuickLookJSON 并放到 `~/Library/QuickLook` 或 `/Library/QuickLook` 目录。如果不生效、`killall Finder` 重启 Finder。
- 查看ip地址: 设置 - wifi - 详细信息。
- m1 外接显示器分辨率低: 显示器 -> 按住 Option 键的同时点击“缩放”。
- .
- 允许安装”任何来源“的软件，解决 xx.app已损坏 `sudo spctl --master-disable`
- 关闭 sip 关机、按住电源键(非m1按下`Cmd R`) 选择实用工具->终端 `csrutil disable` 查看状态 `csrutil status`
- 安装 git gcc `xcode-select --install`

软件
- https://apps.apple.com  https://music.apple.com  https://archive.org/web  https://github.com/tonghohin/screen-sharing
- `shortcuts run 获取时间` [Run shortcuts from the command line](https://support.apple.com/en-gb/guide/shortcuts-mac/apd455c82f02/mac)
- AppCleaner / Unarchiver / Clipy / https://github.com/Stengo/DeskPad / ngrok inlets(GitHub) / https://github.com/CrossPaste/crosspaste-desktop / https://www.hammerspoon.org

图像视频
- 截图: command + shift + 4 (3全屏) 录屏: command + shift + 5
- xnip snipaste lightshot (snip) / licecap (kap gifify) / UPDF(pdf编辑) / any-video-converter(online-audio-converter.com) / XnConvert(图像处理) / Movist (IINA) / ExifRenamer(重命名图片) / ExifTool [exifr](https://mutiny.cz/exifr/) / HandBrake / MKVToolnix(mkv字幕抽取) / perian(QuickTime 插件) / aria2
- 图片批量修改 宽或高 最大值 保持宽高比 `sips -Z 1600 *.jpg` 或指定宽高 `sips -z height width [file]`
```sh
brew install ffmpeg
ffmpeg -i input.mp4  # 查看分辨率 Stream #0:0: Video: h264 (High), **1920x1080**, ...
ffmpeg -i input.mp4 -filter:v "crop=宽度:高度:x偏移:y偏移" output.mp4  # 裁剪视频
ffplay input.mp4 -vf "crop=1280:720:320:180"  # 裁剪视频 预览
# 2x 倍速压缩, 没有音频
ffmpeg -i input.mov -filter:v "setpts=0.5*PTS" -crf 28 -preset fast 2x_compressed.mp4
```

pdf转word: 夸克浏览器-工具 / https://www.tongyi.com/discover/convert
语音转文字 https://www.zaixianai.cn/voiceToText

文件传输
https://github.com/WCY-dt/EasyTransfer
https://snapdrop.net/ (速度快 最方便， mac 上 edge 浏览器不可用、使用 chrome 浏览器)
https://easychuan.cn/  https://www.wenshushu.cn/  https://github.com/schollz/croc
Mac smb 文件共享(速度约1M/s较慢): 在需要共享文件的 Mac 上打开「系统偏好设置-共享-文件共享」会显示类似 smb://192.168.1.9 的共享地址。在另一台 Mac 上打开访达，在菜单栏选择「前往-连接服务器」。在 iPhone 或 iPad 打开「文件」App，点击右上角选项图标，选择「连接服务器」。

下载器 https://github.com/imputnet/cobalt  https://www.fastdownload.io webtorrent-desktop / NeatDownloadManager
[测网速](https://fast.com)  [vpn检测](https://proxy.incolumitas.com/proxy_detect.html)

视频字幕类型有三种：内嵌字幕、外挂字幕、封装软字幕。可以视频转为音频、再提取字幕。
- 字幕下载 https://subhd.tv  剪映 / 钉钉闪记 / B站必剪 / 迅捷文字转语音。
- Subtitle Edit / Aegisub / Subtitle Workshop / HandBrake / FFmpeg
- 大模型 [openai/whisper](https://github.com/openai/whisper) 为视频生成字幕文件 https://github.com/buxuku/VideoSubtitleGenerator

欧路词典: 修改 ~/Library/Preferences/ com.eusoft.eudic.plist 修改 MAIN_TimesLeft：允许使用次数(任意改) 10000000 重启 （更新 [notion](https://www.notion.so/Eudic-Mac-0b5e993809794576868714f613f637ff)、百度网盘下载 再升级）

web shell [ttyd](https://github.com/tsl0922/ttyd) 基于 xtermjs
```sh
brew install ttyd
ttyd vim/login/bash/zsh
ttyd -W top  # 自动运行 top 命令、 加 --once 网页关闭时 命令也自动停止运行
ttyd -W -t fontSize=20 zsh  # http://localhost:7681
ttyd -W -a -t disableLeaveAlert=true zsh # http://localhost:7681/?&arg=aa&arg=bb
ttyd -p 9999 -W -a ./test.sh  # http://localhost:9999/?arg=./test.sh&arg=aa
# 命令不能被 ttyd 直接运行 https://github.com/tsl0922/ttyd/issues/1031
```

LaunchAgents
- `launchctl load/unload ~/Library/LaunchAgents/com.hua.autorun.plist` 加载卸载 plist 文件
- `launchctl list | grep com.hua.autorun` 验证是否运行

进程守护工具 supervisor
- https://soulteary.com/2023/03/12/stable-web-terminal-services-using-docker-nginx-and-ttyd.html
- https://gist.github.com/fadhlirahim/78fefdfdf4b96d9ea9b8
- https://gist.github.com/Pezhvak/297b058d9c449b39d321409cd041899c
- https://github.com/Supervisor/supervisor/issues/1514


curl -v -H "Content-Type: application/json" -H "X-App-Id: xx-cli" -H "X-App-Key: xx" https://xx.com/chat -d '{
  "jsonKey": "jsonVal",
  "jsonKey1": {}
}' | jq
curl -H "Content-Type: application/json" -H "X-App-Id: xx-cli" -H "X-App-Key: xx" https://xx.com/chat -d "@aa.json" | jq


---

需求是想在 mac 电脑上 同时连接不同的 WiFi , 解决 公司网络 阻止访问某些网站的问题.
有哪些解决办法? 比如 macos 能做双系统吗?
或者 macbook pro 使用自己网络, 搭配自己的 mac mini 使用公司网络, 但需要 macbook 能方便的控制 mac mini, 这样可行吗?
2025-05-12

crontab 脚本里能使用 环境变量 吗, 怎么使用?
在 .gitconfig 里能使用环境变量吗?
在 .gitconfig 里 怎么写注释?
在 .zshrc 里 的变量 需要 export 导出吗?
把 环境变量 设置在 .zshrc 里, 怎么根据目录自动使用 git 账号?
在 ~/.zshrc 里 export 了 git_user 但在 .gitconfig 里 使用不了, 怎么了?
2025-03-31

macOS 使用 快捷指令 制作一个功能, 能触发 ctrl+. 快捷键.
2024-12

在 macOS 系统上、使用 bash 写一个函数，自动地每天上午 11点50分 拷贝文件 a.md 的内容到一个新文件 _backup/datetime_a.md 中，每隔三天的 上午11点49分、清空 b.log 和 c.log 文件的内容。运行前后需要发出通知。
把 备份的文件, 只保留 5 个最新的, 其余旧的删除.
https://chatgpt.com/share/674539a5-4d50-8008-9cce-a950f4a2354b
2024-11

在macOS用户目录下的 .zshrc 里写一个函数，判断是否已运行命令 ttyd -W -a zsh >> "$z_log" 2>&1 & 如果未运行过、则运行一次，如果已运行、则进一步判断：如果调用者是 ttyd 、则根据 http://localhost:7681/?arg=/Users/hua/.zshrc&arg='echo "aa"' 这个 URL 运行 arg 参数里的 echo 等任意自定义命令。
https://chatgpt.com/share/6742e267-f3a0-8008-bda3-6b1b6bbce601
2024-11


------ chrome

[Bookmarklet](https://en.wikipedia.org/wiki/Bookmarklet)
- https://make-bookmarklets.com/
- 需要保存为书签 `javascript:(function(){var baseUrl="https://web.archive.org/web/*/",urlmod=document.URL;window.location.href=baseUrl+urlmod;}());`

--- chrome extensions

ChatGPT 历史会话搜索 chrome 插件: 1Proompt / ChatGPT Conversation History Search / Superpower ChatGPT / Echoes / Searchable ChatGPT / GPT Search

Tab Position Options / 一键切换(Jomic) 搜索拐杖 下一页(空格键自动翻到下一页) ModHeader XSwitch Tamper Tampermonkey / Disable Content-Security-Policy / Talend API Tester / Web Developer / Neat URL / Copy Tab Info / Open Multiple URLs / 沙拉查词 / User JavaScript and CSS / Wayback Machine / Memex / 一叶 / grammarly.com / gitpod npmhub / screenity / Language Reactor / Side Browser / Sidebar Tab / Porter Plug / Video Speed Controller


------ vscode

- 按`cmd shift p` 输入
  - code zoom reload(未知错误) diplay(修改语言).
  - 显示内置插件: Show Built-in Extensions
- 在查找(替换)框里按 ctrl + enter 支持多行，或者 复制多行文本 粘贴。
- 查找中文，启用正则表达式 搜索 [\u4e00-\u9fa5]+
- 使用 macOS native tabs https://stackoverflow.com/a/55470186/2190503

https://github.com/jianbingfang/vscode-dup-checker

[tab group 建议](https://github.com/microsoft/vscode/issues/100335#issuecomment-964358943)
扩展 [推荐](https://github.com/viatsko/awesome-vscode):
- plantuml(设置指定server) / Auto Hide / Live Preview / Markdown All in One / markdown-pdf / marp / GitLens(simple logs) / pangu / Hungry Delete / Template String Converter
- Code Runner / Terminal Keeper / Commands(usernamehw) / Todo Tree / Excalidraw / npm-dependency-links / Bookmarks / Diff Folders / Editor Group Minimizer Plus / favorites
端口 [转发](https://code.visualstudio.com/docs/editor/port-forwarding) 实现 [内网穿透](https://51.ruyo.net/18562.html)，目前已被 [国内禁用](https://github.com/microsoft/vscode-remote-release/issues/9438)

```json
// 快捷键
[
  { "key": "cmd+d", "command": "editor.action.copyLinesDownAction" },
  { "key": "alt+`", "command": "terminal.open" }
]
// markdown-pdf 扩展
{
  "markdown-pdf.displayHeaderFooter": false,
  "markdown-pdf.margin.top": "0.01cm", // bottom
  "markdown-pdf.margin.left": "0.5cm", // right
}
// xxProj/.vscode/settings.json
{
  "editor.tabSize": 2,
  "prettier.singleQuote": true,
  "typescript.tsdk": "node_modules/typescript/lib",
  "search.exclude": {
    "**/dist": true,
  }
}
```
tasks `xxProj/.vscode/tasks.json`
代码片段 `xxProj/.vscode/my.code-snippets`、

---

vscode 有个内置插件, 能检测 typescript 的语法, 不小心关掉了怎么重开?
2025-04-07



------ clash 代理
> 2015 ~ 2025


https://github.com/MetaCubeX/ClashX.Meta
支持 tun 模式, 能让“所有程序”都能通过 Clash 代理, 通过虚拟网卡 修改系统路由表, 作用在 网络层, 几乎等同 VPN 效果. 不开启 tun 是作用在 应用层.
2025-07-02

clash 配置指定域名用指定 dns 解析
https://chatgpt.com/share/671762b0-e55c-8008-bf27-b762cf930059
2024-08

验证 终端代理 是否成功: `curl -v x.com`
- 不能用 ping， ping 使用的是ICMP协议，ICMP处于网络层(第三层)，而SOCKS5是传输层代理协议(第四层)，HTTP和HTTPS是应用层协议(第五层或者第七层)，协议层不同是无法代理的。
- 可选: 终端代理 `brew install proxychains-ng` 修改 /usr/local/etc/proxychains.conf 配置文件“末尾”部分内容 `#socks4  127.0.0.1 9050` 改为 `socks5  127.0.0.1 1080`。 使用 `proxychains4 -q curl https://www.google.com` 看是否成功，不成功则需要关闭 sip

多设备共享vpn网络：
- 代理模式 https://www.youtube.com/watch?v=xTzubV8-PwM
- 手机当网关路由 https://www.youtube.com/watch?v=H4g1y3ZMWaw
- [安卓手机充当软路由](https://www.youtube.com/watch?v=r6nXCgYkXTQ) [网络链路](https://how-did-i-get-here.net/)

获取 DNS服务器 设置:
```sh
scutil --dns
cat /etc/resolv.conf
networksetup -getdnsservers Wi-Fi
networksetup -getdnsservers Ethernet
```

[clash文档](https://a76yyyy.github.io/clash/zh_CN/)
> 远程控制：菜单 -> 控制台 -> 右键 -> 检查元素 -> 查看网络 -> 端口和秘钥 (或者 设置 -> Api端口/秘钥)
> 在浏览器打开 `http://127.0.0.1:58147/ui/#/proxies`

- 查看IP所属区域 https://db-ip.com/149.154.160.0

绕过微信客户端网络限制/相关域名ip走proxy:
- 先设为“全局模式”,点击Clash“控制台”,查看“日志”。
- 在微信客户端里 发送文字和图片，查看抓包的相关域名和ip，用 https://db-ip.com 验证微信ip网段
  - 登录和收发文字: qq.com / wechat.com / tenpay.com
  - 收发图片: 43.153.165.235:80 / 43.175.127.21:443
  - 搜索"xx.0到xx.255怎么配置IP-CIDR"，或者[ip网段计算器](https://www.calculator.net/ip-subnet-calculator.html)
  - 最终规则类似 `SRC-IP-CIDR,43.175.127.0/24,Proxy`
- 在Clash配置文件"rules"添加规则。

code ~/.config/clash/config.yaml

```yaml
# port: 7890
# socks-port: 7891
mixed-port: 7890
allow-lan: false
mode: Rule
external-controller: 127.0.0.1:9090
dns:
  enable: true
  ipv6: false
  use-hosts: true
  nameserver: ['https://doh.pub/dns-query', 'https://dns.alidns.com/dns-query']
  # fallback 值 先配置 公司内网 DNS服务器 地址，通过 cat /etc/resolv.conf 获取
  fallback: ['https://doh.dns.sb/dns-query']
  fallback-filter: {
    geoip: true,
    geoip-code: CN,  # 确保国内 IP 使用内网 DNS
    ipcidr: [240.0.0.0/4, 0.0.0.0/32],
    domain: ['+.xx.team', '+.xx.net']
  }
  # # 需要 Clash 版本支持 Fake-IP 模式
  # enhanced-mode: fake-ip
  # fake-ip-range: 198.18.0.1/16
  # # default-nameserver 主要用于 enhanced-mode: fake-ip 模式下
  # default-nameserver: [223.5.5.5, 119.29.29.29]
  # nameserver:
  #   - 180.76.76.76
  #   - 114.114.114.114
  #   - https://dns.alidns.com/dns-query
  #   - https://doh.pub/dns-query
  # fallback:
  #   - 8.8.8.8
  #   - tls://dns.rubyfish.cn:853
  #   - tls://1.0.0.1:853
  #   - tls://8.8.4.4:853
  #   - https://cloudflare-dns.com/dns-query
  #   - https://dns.cloudflare.com/dns-query
  #   - https://dns.google/dns-query
  # fallback-filter:
  #   geoip: true
  #   ipcidr:
  #     - 127.0.0.1/32
  #   domain:
  #     - +.google.com
  #     - +.googleapis.cn
rules:
  # - DOMAIN,example.com,DIRECT,dns - 114.114.114.114,119.29.29.29
  # 微信客户端
  - DOMAIN-SUFFIX,weixin.qq.com,Proxy
  - DOMAIN-SUFFIX,qq.com,Proxy
  - DOMAIN-SUFFIX,wechat.com,Proxy
  - DOMAIN-SUFFIX,tenpay.com,Proxy
  - SRC-IP-CIDR,43.175.127.0/24,Proxy
  - SRC-IP-CIDR,43.153.165.0/24,Proxy
  # one driver
  # - DOMAIN-SUFFIX,microsoftonline.com,Proxy
  # - DOMAIN-SUFFIX,live.com,Proxy
  # - DOMAIN-SUFFIX,office.com,Proxy
  # - DOMAIN-SUFFIX,office.net,Proxy
  # - DOMAIN-SUFFIX,sharepointonline.com,Proxy
  # 常用国外站点
  - 'DOMAIN-KEYWORD,google,Proxy'
  - DOMAIN-KEYWORD,google,Proxy
  - DOMAIN-KEYWORD,gmail,Proxy
  - DOMAIN-KEYWORD,youtube,Proxy
  - DOMAIN-KEYWORD,facebook,Proxy
  - DOMAIN-KEYWORD,github,Proxy
  - DOMAIN-KEYWORD,twitter,Proxy
  - DOMAIN-KEYWORD,instagram,Proxy
  - DOMAIN-KEYWORD,whatsapp,Proxy
  # 其他
  - DOMAIN-SUFFIX,local,DIRECT
  - DOMAIN-SUFFIX,cn,DIRECT
  - DOMAIN-KEYWORD,-cn,DIRECT
  - DOMAIN-KEYWORD,umeng,REJECT
  - DOMAIN-SUFFIX,stat.com,REJECT
  - DOMAIN,e.crashlytics.com,REJECT
  # Telegram Messenger
  - IP-CIDR,91.108.4.0/22,Proxy,no-resolve
  - IP-CIDR,91.108.8.0/22,Proxy,no-resolve
  - IP-CIDR,91.108.12.0/22,Proxy,no-resolve
  - IP-CIDR,91.108.16.0/22,Proxy,no-resolve
  - IP-CIDR,91.108.56.0/22,Proxy,no-resolve
  - IP-CIDR,149.154.160.0/22,Proxy,no-resolve
  - IP-CIDR,149.154.164.0/22,Proxy,no-resolve
  - IP-CIDR,149.154.168.0/22,Proxy,no-resolve
  - IP-CIDR,149.154.172.0/22,Proxy,no-resolve
  # apple.com
  - IP-CIDR,17.0.0.0/8,DIRECT
  # 内网网段
  - IP-CIDR,127.0.0.0/8,DIRECT
  - IP-CIDR,172.16.0.0/12,DIRECT
  - IP-CIDR,192.168.0.0/16,DIRECT
  - IP-CIDR,10.0.0.0/8,DIRECT
  - IP-CIDR,100.64.0.0/10,DIRECT
  # 自动检测
  - GEOIP,CN,DIRECT
  - MATCH,Proxy
proxies:
  - name: 有效期2025/07/03,剩余:94.71GB
    type: trojan
    server: iplc-hk-beta1.trojanwheel.com
    port: 5001
    password: xxx
    alpn:
      - h2
      - http/1.1
    skip-cert-verify: true
  - name: 香港-IPLC-HK-BETA1-流量倍率:1.0
    type: trojan
    server: iplc-hk-beta1.trojanwheel.com
    port: 5001
    password: xxx
    alpn:
      - h2
      - http/1.1
    skip-cert-verify: true
proxy-groups:
  - name: Proxy
    type: select
    proxies:
      - Auto
      - 有效期2025/07/03,剩余:94.71GB
      - 香港-IPLC-HK-BETA1-流量倍率:1.0
  - name: Auto
    type: url-test
    url: http://www.gstatic.com/generate_204
    interval: 300
    proxies:
      - 有效期2025/07/03,剩余:94.71GB
      - 香港-IPLC-HK-BETA1-流量倍率:1.0
```


mac 自动设置全局代理
https://gist.github.com/rmcdongit/f66ff91e0dad78d4d6346a75ded4b751
https://gist.github.com/dvessel/2b6ad97b2da16d445671b39618221aab
https://community.jamf.com/t5/jamf-pro/scripting-quot-exclude-simple-hostnames-quot/m-p/64445

```sh
open /System/Library/PreferencePanes/Network.prefPane  # 打开网络偏好设置面板
open "x-apple.systempreferences:com.apple.Network-Settings.extension?Proxies"
networksetup
# 打开 WiFi 里 自动发现代理 开关
networksetup -setproxyautodiscovery Wi-Fi on
# 获取 WiFi 或 以太网 代理配置
networksetup -getsecurewebproxy Wi-Fi/Ethernet
networksetup -getproxybypassdomains Wi-Fi
networksetup -listallnetworkservices

# 设置别名
# alias pset='networksetup -setwebproxy Wi-Fi 127.0.0.1 7890 && networksetup -setsecurewebproxy Wi-Fi 127.0.0.1 7890 && networksetup -setsocksfirewallproxy Wi-Fi 127.0.0.1 7890 && networksetup -setproxybypassdomains Wi-Fi 192.168.0.0/16,10.0.0.0/8,172.16.0.0/12,127.0.0.1,localhost,*.local,timestamp.apple.com,sequoia.apple.com,seed-sequoia.siri.apple.com'
# alias psystem='networksetup -setwebproxystate Wi-Fi on && networksetup -setsecurewebproxystate Wi-Fi on && networksetup -setsocksfirewallproxystate Wi-Fi on'
# alias upsystem='networksetup -setwebproxystate Wi-Fi off && networksetup -setsecurewebproxystate Wi-Fi off && networksetup -setsocksfirewallproxystate Wi-Fi off'
```


------ Apache

mac系统的 Apache 怎么配置 localhost 同时支持 https http
https://chatgpt.com/share/674ab45e-27a8-8008-b1bb-04c8bf5e444e
2024-08

出现 403 You dont have permission to access 错误， 修改 路径下 各级目录 权限 everyone 为 “只读”，再重启。
默认设置，不能浏览目录、只能访问目录下的文件，比较安全。

生成自签名证书
```sh
sudo mkdir /etc/apache2/ssl
cd /etc/apache2/ssl
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout localhost.key -out localhost.crt
```

操作
```sh
httpd -v # 查看版本号
sudo apachectl restart / start / stop   # 开关重启
code /etc/apache2/httpd.conf  # 编辑 Apche 的配置文件
# http://localhost  https://localhost
```

httpd.conf 文件配置
```sh
# Apache 通过 <Directory> 指令控制特定目录的访问权限。
# 在 index template 里插入自定义 meta. http://httpd.apache.org/docs/2.4/mod/mod_autoindex.html
IndexHeadInsert "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />"
DocumentRoot "/Users/hua/inner"
<Directory "/Users/hua/inner">
    Options Indexes FollowSymLinks MultiViews
    MultiviewsMatch Any
    AllowOverride None
    Require all granted
    Header set Access-Control-Allow-Origin "*"
    Header set Access-Control-Allow-Headers "Origin, X-Requested-With, Content-Type, Accept"
    Header set Access-Control-Allow-Methods "GET, POST, OPTIONS, PUT, DELETE"
    Header set Access-Control-Allow-Credentials: true
</Directory>
<VirtualHost *:80>
  <FilesMatch "\.(md|cpp|php)$">
    AddDefaultCharset utf-8
    Header always set Content-Type "text/plain; charset: utf-8"
  </FilesMatch>
</VirtualHost>

# 打开 https://localhost 支持
# 取消注释 LoadModule ssl_module libexec/apache2/mod_ssl.so
Listen 443
<VirtualHost *:443>
    ServerName localhost
    DocumentRoot "/Users/hua/inner"
    SSLEngine on
    SSLCertificateFile "/etc/apache2/ssl/localhost.crt"
    SSLCertificateKeyFile "/etc/apache2/ssl/localhost.key"
    ErrorLog "/private/var/log/apache2/error_log"
    CustomLog "/private/var/log/apache2/access_log" common
</VirtualHost>

Listen 9999
<VirtualHost *:9999>
  ServerName me.com
  DocumentRoot "/Users/hua/Downloads"
  <Directory "/Users/hua/Downloads">
      Options Indexes FollowSymLinks MultiViews
      MultiviewsMatch Any
      AllowOverride None
      Require all granted
  </Directory>
</VirtualHost>
```

如果目录中存在 .htaccess 文件，检查其中是否有配置禁止访问。比如有 Deny from all


------ zsh(rc) git 配置

生成 ssh key 推拉代码
```sh
ssh-keygen -t ed25519 -C hualei.hl@xx-inc.com
ssh-add ~/.ssh/id_ed25519
# 再把 ~/.ssh/id_ed25519.pub 文件内容添加到 gitlab

# 配置 ssh 走 clash 代理， code ~/.ssh/config
Host github.com
  ProxyCommand nc -X connect -x 127.0.0.1:7890 %h %p
```

全局默认设置 code ~/.gitconfig  内部 name email
```sh
[alias]
  st = status
  co = checkout
  ci = commit
  br = branch
[user]
  name = 然则
  email = hualei.hl@xx-inc.com
[includeIf "gitdir:~/inner/-/"]
    path = .gitconfig-github
```
code ~/.gitconfig-github 文件 给特定目录 设置个人 name email
```sh
[user]
  name = warmhug
  email = hualei5280@gmail.com
```

`code ~/.zshrc` 文件

- zsh模版 https://github.com/robbyrussell/oh-my-zsh/blob/master/templates/zshrc.zsh-template
- 参考 git 插件 https://github.com/ohmyzsh/ohmyzsh/blob/master/plugins/git/git.plugin.zsh
- 覆盖内部命令 https://github.com/ohmyzsh/ohmyzsh/wiki/Customization#overriding-internals
  - 比如 lib/directories.zsh 里的 alias 1='cd -1' 不需要
- 命令使用状态 `zsh_stats`

```sh
#export PS1="\u \w$"
ZSH_DISABLE_COMPFIX="true"
export ZSH=$HOME/.oh-my-zsh
ZSH_THEME="ys"  # Look ~/.oh-my-zsh/themes/
# plugins=(git)  # Look ~/.oh-my-zsh/plugins/*
source $ZSH/oh-my-zsh.sh

export EDITOR='vim'
# export EDITOR=nano
# export EDITOR='code'  # 修改为 vscode 编辑器有问题

# 使用 brew install.sh 安装脚本时, git 设置为 git config --global http.version HTTP/1.1
# brew 国内源 https://www.jianshu.com/p/bea984d27cd2
# cd "$(brew --repo)" && git remote -v
# cd "$(brew --repo homebrew/core)" && git remote -v
# cd "$(brew --repo homebrew/cask)" && git remote -v
# 恢复官方源
# git -C "$(brew --repo)" remote set-url origin https://github.com/Homebrew/brew.git
# git -C "$(brew --repo homebrew/core)" remote set-url origin https://github.com/Homebrew/homebrew-core.git
# git -C "$(brew --repo homebrew/cask)" remote set-url origin https://github.com/Homebrew/homebrew-cask.git
# 更换 home-bottles
# export HOMEBREW_BOTTLE_DOMAIN=http://mirrors.aliyun.com/homebrew/homebrew-bottles
# export HOMEBREW_BOTTLE_DOMAIN=http://7xkcej.dl1.z0.glb.clouddn.com
# env | grep HOMEBREW
# brew config
# brew ls

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# 不建议用 source https://github.com/ohmyzsh/ohmyzsh/wiki/FAQ
# alias sz='source ~/.zshrc'
alias sz='exec zsh'
alias cz='code ~/.zshrc'
```


------ Charles whistle
> 2019 2024

[whistle](https://wproxy.org/) 规则配置:
```sh
https://aa.bb.xx 127.0.0.1:28064 excludeFilter://^/service
https://aa.bb.xx/govern 127.0.0.1:3025
https://local.tedev.ltt:27187  127.0.0.1:27187
```

Charles

- 注意
  - 公司里默认安装的vpn软件、公司wifi的代理选项默认会打开“自动发现代理”的配置，需要关闭后、才能使用Charles代理。
  - 使用没有 被设置代理的 浏览器（比如 Chrome **翻墙代理需要关掉**）
- HTTPs 支持：
   - Help -> SSL Proxying -> Install Charles Root Certificate (挨着的 **模拟器** / **手机 **证书都装)
      - 注意：**手机上安装的 证书 和 连接的 mac 电脑要匹配。使用新电脑需要重新给手机安装证书。**
   - 在 macOS 钥匙串访问 里信任证书，iOS 设置里信任证书。
   - 菜单 Proxy -> Proxy Setting -> Port: 8888 /
   - 菜单 Proxy -> SSL Proxying Settings -> SSL Proxying -> add -> Host: *  Port: 443
   - 在 iOS (**不用连数据线**) WiFi 设置 HTTP 代理，服务器输入 电脑 ip、端口 8888
- 其他：
   - 关闭 mac 端包的抓取：菜单 Proxy 将 maxOS Proxy 取消选中 （这样 iOS 模拟器里也抓不了）
   - 抓取支付宝 RPC 请求：支付宝 可切换环境包 设置关闭 mmtp 开关
   - 映射本地 js 文件、调试代码：菜单 Tools -> Map Remote / Map Local…
   - 拦截请求：菜单 Tools -> Rewrite -> 勾选 Enable Rewrite -> Add -> Add -> Rewrite Rule -> Type 选 URL, Where 勾选 Request, Match Value 填 `http(s?):\/\/aa.bb.xx\/(?!(service)\/)`勾选Regex , Replace value 填 `https://127.0.0.1:28064/` 勾选 Replace all
   - （点击配置框的问号、发现是使用的 Perl-style regular expressions）











# BE



service eu us 不同大区, dr 含义? 其中 r 是 region 的意思, dr 可能是什么?
https://chat.deepseek.com/a/chat/s/fdaa9566-f02a-4d9e-b719-3c98b7733741
2025-04-15

软件配置管理(SCM)是指通过执行版本控制、变更控制的规程，以及使用合适的配置管理软件，来保证所有配置项的完整性和可跟踪性。
2024

------ 2016 基础

[正向代理与反向代理有什么区别](http://mp.weixin.qq.com/s/ikrI3rmSYs83wdSWqq2QIg)

CDN 工作机制：CDN = 镜像（Mirror）+ 缓存（Cache）+ 整体负载均衡（GSLB），主要缓存网站中的静态数据。

三种负载均衡架构：链路负载均衡、集群负载均衡、操作系统负载均衡。
- 链路负载均衡就是通过 DNS 解析成不同的 IP，用户根据这个 IP 来访问不同的目标服务器。
- 集群负载均衡分为硬件和软件负载均衡。硬件负载均衡设备昂贵、如 F5，性能非常好，但访问量超出极限时不能进行动态扩容。软件负载均衡成本低，缺点是一般一次访问请求要经过多次代理服务器，会增加网络延时，如 LVS、HAProxy。
- 操作系统负载均衡，是利用操作系统级别的软中断或硬中断，设置多队列网卡等来实现。

- QPS、RT、CPU 性能监控
- 阿里云OSS：文件存储系统（避免把文件存到数据库里、占用IO资源）
- tair：内存缓存服务器 开源：memcached / redis
- F5：硬件负载均衡，LVS替代(软负载)
  - 即为name server（configServer），名字服务器，存放各个机器名，能知道有哪些机器。
- HSF(High Speed FrameWork)：远程服务调用框架
  - non-blocking IO.可以减少CPU切换开销，留更多CPU资源给业务代码。类比渔夫钓鱼，鱼竿有灯，钓起来灯亮，渔夫遍历查看鱼竿的等是否亮，亮了通知订阅者。一个渔夫可以看更多鱼竿，但如果鱼竿很多，一个渔夫看不过来，会造成延迟增加。
  - IO连接多路复用。一个连接上维持多个会话。
  - 序列化协议，hessian序列化。
  - 同类开源的rpc框架：dubbo或thrift等
- osgi：用于进行类库隔离的组件，允许组件动态热部署
- hbase、hive
- DRM：分布式资源管理，DRM框架即提供了这样一种能力，可以在运行时动态、即时地改变应用系统内存中的资源值，并且已经解决多机房问题。
- zookeeper：可以充当一个服务注册表（Service Registry），让多个服务提供者形成一个集群，让服务消费者通过服务注册表获取具体的服务访问地址（ip+端口）去访问具体的服务提供者。zookeeper提供了“心跳检测”功能，它会定时向各个服务提供者发送一个请求（实际上建立的是一个 socket 长连接），如果长期没有响应，服务中心就认为该服务提供者已经“挂了”，并将其剔除

- DAL(数据访问层)、IDAL(接口层)、BLL(业务逻辑层)
- PO(Persisent Object)持久对象，和VO一样都是由一组属性和属性的 get 和 set 方法组成。PO 的属性是跟数据库表的字段一一对应的。PO 对象需要实现序列化接口。
- VO(value object)值对象，通常用于业务层之间的数据传递，和 PO 一样也是仅仅包含数据而已。但应是抽象出的业务对象 ,可以和表对应 ,也可以不 ,这根据业务的需要。
- DAO(data access object) 数据访问对象，它负持久层的操作，为业务层提供接口。此对象用于访问数据库。通常和 PO 结合使用， DAO 中包含了各种数据库的操作方法。通过它的方法 , 结合 PO 对数据库进行相关的操作。
- DTO(Data Transfer Object) 数据传输对象，主要用于远程调用等需要大量传输对象的地方。

比如我们一张表有 100 个字段，那么对应的 PO 就有 100 个属性。
但是我们界面上只要显示 10 个字段，客户端用 WEB service 来获取数据，没有必要把整个 PO 对象传递到客户端，这时我们就可以用只有这 10 个属性的 DTO 来传递结果到客户端，这样也不会暴露服务端表结构 . 到达客户端以后，如果用这个对象来对应界面显示，那此时它的身份就转为 VO。

- BO(business object) 业务对象，从业务模型的角度看 , 见 UML 元件领域模型中的领域对象。封装业务逻辑的 java 对象 , 通过调用 DAO 方法 , 结合 PO,VO 进行业务操作。主要作用是把业务逻辑封装为一个对象。这个对象可以包括一个或多个其它的对象。比如一个简历，有教育经历、工作经历、社会关系等等。我们可以把教育经历对应一个 PO ，工作经历对应一个 PO ，社会关系对应一个 PO 。建立一个对应简历的 BO 对象处理简历，每个 BO 包含这些 PO 。这样处理业务逻辑时，我们就可以针对 BO去处理。




## 网络

------ 2019

- 从输入URL到页面加载完成 http://fex.baidu.com/blog/2014/05/what-happen/
- HTTP 协议，http2.0，http 301 / 302 / 304 的区别。
- TCP 是运输层而 HTTP 是应用层，HTTP需要支持「分块传输编码」。分块传输编码可以在响应数据未完全生成时进行数据传输，此时还无法确定响应信息的具体大小。如果分块中所包含信息的长度为 0，则表示响应信息的结束。
- SPDY / HTTP 2 核心优势就是多路复用，简单说来就是将多个请求通过一个 TCP 连接发送。浏览器能不能将 100 个请求通过一个 TCP 连接发送？会出现什么问题？那就是 TCP 协议的 head of line blocking,队头阻塞。
- [http2讲解](http://http2-explained.haxx.se/content/zh/index.html)、 [htt2 and UDP](http://2014.jsconf.eu/speakers/iliyan-peychev-http-20-and-quic-protocols-of-the-near-future.html)
- 200、304 状态图 https://img2018.cnblogs.com/blog/907596/201903/907596-20190302011346217-1805589363.png (文章 https://www.cnblogs.com/kevingrace/p/10459429.html)

- 输入域名并按下回车后 第一步，浏览器会检查缓存中有没有这个域名对应的解析过的 IP 地址，有就结束，没有进入下一步
- 第二步，浏览器查找操作系统缓存中是否有。操作系统也有一个域名解析过程，在 hosts 文件里设置可以将任何域名解析到任何能够访问的 IP 地址。如果指定了，浏览器会使用这个 IP 地址。（早期 Windows 中的域名被入侵黑客劫持问题）
- 前两步都是在本机完成的，如果无法完成解析，就会请求域名服务器了。我们的网络配置中都会有「DNS 服务器地址」，操作系统会把域名发送给 LDNS，也就是本地区的域名服务器。大约 80% 的域名解析到这里完成。
- 第四步，如果 LDNS 没命中，就到 Root Server 域名服务器请求解析。然后 `gTLD Server`，`Name Server 域名服务器`，返回该域名对应的 `IP 和 TTL 值` 被 Local DNS Server 缓存，解析结果返回给用户、缓存到本地系统缓存中、域名解析过程结束。（这中间还有 GTM 负载均衡控制等）
- 可以用 `nslookup`、`dig www.taobao.com` 等命令，跟踪解析过程


------ HTTP

发起一个 HTTP 请求的过程就是建立一个 socket 通信的过程。
HTTP 协议是基于请求 / 响应模式的，因此只要服务端给了响应，本次 HTTP 连接就结束了。
HTTP 分为长连接和短连接，其实本质上是说的 TCP 连接。TCP 连接是一个双向的通道，它是可以保持一段时间不关闭的，因此 TCP 连接才有真正的长连接和短连接这一说。HTTP 协议说到底是应用层的协议，而 TCP 才是真正的传输层协议，只有负责传输的这一层才需要建立连接。
HTTP1.1 默认是长连接，也就是默认 Connection 的值就是 keep-alive。好处是：长连接情况下，多个 HTTP 请求可以复用同一个 TCP 连接，这就节省了很多 TCP 连接建立和断开的消耗。

对于客户端来说，不管是长轮询还是短轮询，客户端的动作都是一样的，就是不停的去请求，不同的是服务端，短轮询情况下服务端每次请求不管有没有变化都会立即返回结果，而长轮询情况下，如果有变化才会立即返回结果，而没有变化的话，则不会再立即给客户端返回结果，直到超时为止。不管是长轮询还是短轮询，都不太适用于客户端数量太多的情况，因为每个服务器所能承载的 TCP 连接数是有上限的，这种轮询很容易把连接数顶满。
一种轮询方式是否为长轮询，是根据服务端的处理方式来决定的，与客户端没有关系。轮询的长短，是服务器通过编程的方式手动挂起请求来实现的。

HTTP 协议本身是一种面向资源的应用层协议，但对 HTTP 协议的使用实际上存在着两种不同的方式：一种是 RESTful 的，它把 HTTP 当成应用层协议，比较忠实地遵守了 HTTP 协议的各种规定；另一种是 SOA 的，它并没有完全把 HTTP 当成应用层协议，而是把 HTTP 协议作为了传输层协议，然后在 HTTP 之上建立了自己的应用层协议。

幂等性并不属于特定的协议，它是分布式系统的一种特性；所以，不论是 SOA 还是 RESTful 的 Web API 设计都应该考虑幂等性。（幂等性是数学中的一个概念，表达的是 N 次变换与 1 次变换的结果相同）

- HTTP GET 方法用于获取资源，不应有副作用，所以是幂等的。（不会改变资源的状态，但不是每次 GET 的结果相同）
- HTTP DELETE 方法用于删除资源，有副作用，但它应该满足幂等性。
- HTTP POST 和 PUT 的区别容易被简单地误认为 “POST 表示创建资源，PUT 表示更新资源”；而实际上，二者均可用于创建资源，更为本质的差别是在幂等性方面。
- POST 所对应的 URI 并非创建的资源本身，而是资源的接收者。比如：POST `http://www.forum.com/articles` 的语义是在这里创建一篇帖子，HTTP 响应中应包含帖子的创建状态以及帖子的 URI。两次相同的 POST 请求会在服务器端创建两份资源，它们具有不同的 URI；所以，POST 方法不具备幂等性。
- 而 PUT 所对应的 URI 是要创建或更新的资源本身。比如：PUT `http://www.forum/articles/4231` 的语义是创建或更新 ID 为 4231 的帖子。对同一 URI 进行多次 PUT 的副作用和一次 PUT 是相同的；因此，PUT 方法具有幂等性。

[合并 HTTP 请求是否真的有意义？](http://www.zhihu.com/question/34401250)
浏览器针对每个域名并发建立的最大 TCP 连接数基本都是 6 个，然后每个连接上串行发送若干个请求。HTTP1.1 协议规定请求只能串行发送。

- 100 个请求下：在 http1.1，keep-alive 是默认的，现代浏览器都有 DNS 缓存，DNS 寻址时间可忽略。
  - 寻址还是会花很少量时间，考虑个别情况下 DNS 缓存失效时需要更多点时间（10ms 左右）。另外 url 检查时间，一般可忽略。
- 3 次握手由于有 keep-alive，一条和一百条都只需一次 TCP 握手 -- 无差别。
- 发送报文 -- 增多了 99 次的 http 请求头，请求之间有停顿（网络延迟 RTT），如果合并后节省延迟时间 RTT*(n-1)。网络延迟低或请求数 n 比较小时，可忽略不计。（4G 以上网络延迟很低）。
  - PC 上的 RTT 大概是 50ms, wifi 为 100ms， 3G 为 200ms，2G 为 400ms。例如：一个 200M 带宽、2000ms 延迟的网络，和一个 2M 带宽，20ms 延迟的网络。
  - 无线环境下头部大小每减少 100 个字节，速度能够提升 20~30ms。因为：上下行带宽严重不对称，上行带宽太小。假设一个请求头部是 800 个字节，如果上行带宽是 100 个字节，那至少得传 8 次才能将一个请求传完。
- 考虑丢包（比如移动网络），合并请求会更有优势。
  - 丢的是 tcp 包？服务器怎么知道丢了，丢了哪些内容 (如 get 请求内容一部分丢了)？浏览器会重新发送，还是自动重发？
- 据说 keep-alive 在经过代理或者防火墙的时候可能会被断开。

[http pipelining](https://en.wikipedia.org/wiki/HTTP_pipelining) pipeline 原理是 客户端可以并行发送多个请求，但是服务器的响应必须按次序返回。一些服务器和代理不支持 pipeline；在 pipeline 中的前一个链接可能会阻塞后边的链接；减缓页面加载速度。Chrome 默认禁止了 pipelining。[原因](https://www.chromium.org/developers/design-documents/network-stack/http-pipelining)

名词：`TCP`、`UDP`、`套接字Socket`、`ip`、`URI`、`URL`、`URN`
`消息摘要和数字签名`、`RSA算法`、`DSA`、`认证问题`、`证书签名`、`代码签名`、`AES密匙`、`GSS-API`、`SASL`、`SSL`

IP地址和端口号组成了所谓的Socket，Socket是网络上运行的程序之间双向通信链路的终结点，是TCP和UDP的基础。
半关闭提供了这样一种能力：套接字连接的一端可以终止其输出，同时仍旧可以接收来自另一端的数据。该协议只适用于一站式（one-shot）的服务，如http服务。


------ Session与Cookie

Session 默认有效期是关闭浏览器，为什么session会消失，主要原因是浏览器端cookie内保存的 sessionID 失效了，因为session是基于cookie的，所以关闭浏览器会失效。浏览器关闭，session是不会马上消失的。如何延长session声明周期，解决方案：延长cookie 和 session 的生存时间

Cookie可以让服务端程序跟踪每个客户端的访问，但是每次客户端的访问都必须传回这些Cookie，如果数量很多，这就增加了客户端与服务端的数据传输量，而Session解决了这个问题。

同一个客户端每次和服务端交互时，不需要都传回所有的Cookie值，而是只要传回一个id，这个id是客户端第一次访问服务器时生成的，而且每个客户端是唯一的。这个id通常是name为JSESIONID的一个Cookie。

由于Cookie是存储在客户端浏览器里的，不安全很容易被修改。相比之下，Session是将数据保存在服务端，只是通过Cookie传递一个SessionID而已，所以Session更适合存储用户隐私和重要的数据。

分布式Session框架可以解决的问题：Session配置的统一管理；Cookie使用的监控和统一规范管理；Session存储的多元化；Session配置的动态修改；Session加密key的定期修改；充分的容灾机制，保持框架的稳定性；Session各种存储的监控和报警支持；Session框架的可扩展性；跨域名Session与Cookie的共享。

由于应用是一个集群，所以不可能将创建的Session都保存在每台应用服务器的内存中，因为如果每台服务器有几十万的访问用户，服务器的内存肯定不够用，即使够用，这些Session也无法同步到这个应用的所有服务器中。所以要共享这些Session必须将他们存储在一个分布式缓存中，可以随时写入和读取，而且性能要很好才能满足要求，如MemCache、淘宝的Tair。

跨域名共享Cookie问题，Cookie是有域名限制的，一个域名下的Cookie不能被另一个域名访问。所以，如果在一个域名下已经登陆成功，如何访问到另外一个域名的应用且保证登陆状态仍然有效呢？






## 安全


------ 2018 - 2017

[a 标签中 target="_blank" 的安全漏洞](https://www.tutorialdocs.com/article/html-opener-blank.html) 详细地解释了该漏洞的攻击方法和原理。并在文末给出了防范该漏洞的解决办法：给 a 标签增加 rel="noopener noreferrer nofollow"。

cors跨域：http头可以伪造，所以跨域的时候记得带上sessionId做身份验证；防止允许跨域的站点被入侵；不要对 Access–Control-Allow-Origin 使用`*`

[csrf 详解](https://tech.meituan.com/fe_security_csrf.html)、[csrf漏洞](http://www.cnblogs.com/hyddd/archive/2009/04/09/1432744.html)、[wiki中文](http://zh.wikipedia.org/wiki/%E8%B7%A8%E7%AB%99%E8%AF%B7%E6%B1%82%E4%BC%AA%E9%80%A0)
XSS 利用的是用户对指定网站的信任，CSRF 利用的是网站对用户网页浏览器的信任。
跨站请求攻击，简单地说，是攻击者通过一些技术手段欺骗用户的浏览器去访问一个自己曾经认证过的网站并执行一些操作（如发邮件，发消息，甚至财产操作如转帐和购买商品）。由于浏览器曾经认证过，所以被访问的网站会认为是真正的用户操作而去执行。这利用了web中用户身份验证的一个漏洞：简单的身份验证只能保证请求发自某个用户的浏览器，却不能保证请求本身是用户自愿发出的。
为防止csrf漏洞，传统表单里默认有生成了随机token的隐藏input，同步提交表单时能自动提交上去，同步提交后刷新页面会再次更新token。
但使用Ajax异步提交时，提交时要从Cookie里(或页面上)获得token值（这里假设攻击者不能获得第三方的Cookie，但用户的Cookie很容易由于网站的XSS漏洞而被盗取），另外要考虑在提交后是否需要手动更新Cookie里(或页面上)的token。
> [ajax里如何更新csrf token](http://www.v2ex.com/t/82751) ，最后的一段评论提到：csrf-token的目的是，让攻击者不能伪造请求（如通过img发起的请求会带上cookie）。因此，csrf-token不需要每个请求都改变，只需要确保对于每个session不一致即可，同一个session内不变没有问题。

jsonp请求也需要「防止csrf漏洞」，例如可以用jsonp获取通讯录列表。
ajax 方式的 csrf token 放到 post 提交的 body 里、随其他数据一起提交。

反爬虫 https://segmentfault.com/a/1190000017899193
循序渐进学加密 https://segmentfault.com/a/1190000019437132

蚂蚁内容风险识别接口服务 https://docs.alipay.com/pre-open/api_pre/alipay.security.risk.content.analyze
撞库 https://baike.baidu.com/item/%E6%92%9E%E5%BA%93/16480882?fr=aladdin
人机识别服务接口 RDS https://apires.alipay.com/isp/previewDetail.htm?apiId=4967
IFAA 生物认证 https://tech.antfin.com/products/IFAA

安全资讯网站博客
- 先知社区 https://xz.aliyun.com
- freebuf https://www.freebuf.com/articles/web
- 安全客 https://www.anquanke.com/vul
- 台湾217战队 http://blog.orange.tw/
- 腾讯云牵头制定首个IEEE业务安全风控全球标准 https://www.toutiao.com/i6681138895255503374
- 蚂蚁研发者门户 安全&风控 专题
- 2019 RSAC 对安全技术领域发展的思考
- RSA原理浅析
- OTP动态付款码(仟墨)、数字证书(万佛)、支付盾、安全控件(文同)
- 反洗钱、欺诈/盗用、信息窃取篡改、病毒/木马/钓鱼/防火墙、安全意识、负面舆情治理






## DB 2016

时间序列数据的数据库选型思考 https://j-coder.com/2021/11/12/%E5%85%B3%E4%BA%8E%E6%97%B6%E9%97%B4%E5%BA%8F%E5%88%97%E6%95%B0%E6%8D%AE%E7%9A%84%E6%95%B0%E6%8D%AE%E5%BA%93%E9%80%89%E5%9E%8B%E6%80%9D%E8%80%83/
ClickHouse vs Elasticsearch谁更胜一筹 https://www.zhihu.com/question/472389514
2024-05-28

- [数据库深度解析 | 从NoSQL历史看未来](https://mp.weixin.qq.com/s?__biz=MzAwMDU1MTE1OQ==&mid=209753217&idx=1&sn=d3a021a7bd959cbf92ffc658336b2387)

MapReduce 是一种分布式的程序设计模型，专门用来在集群里处理大量的数据。主要由两部分组成：mapper 和 reducer。mapper 读取一部分数据，运算后输出成一系列的中间（intermediate）数据；而 reducer 将 mapper 的输出数据查核、合并，产生最后输出。最常被使用的就是Hadoop。Hadoop 是以 Java 实现的，但是可以支持许多其他语言写成的 mapper 和 reducer。
Hadoop 是设计用来处理大量数据和运算的，所以如果只有少量数据时，就会比关系型数据库还要慢了。

读写并行，锁和并行，读写锁，隔离，死锁检测：碰撞检测。
数据一致性，数据完整性。单机事务，分布式事务。一致性hash。数据库连接利用率低。

orm会有1+n查询问题如：学生表和老师表，查出所有学生(n个)的数据（结果要包含老师名字），每一条学生数据里关联某一个老师的id，通过这个id要从老师表里查出老师的名字，所以需要查n次老师表。在有数据分页和索引的情况下，1+n的性能还是很好的，虽然看起来发了很多sql查询，相对join的方式性能要好些。

Hibernate 联合主键构成类时，需要重写类的equal hashcode，实现序列化接口。

MyBatis是支持普通SQL查询，存储过程和高级映射的优秀持久层框架。MyBatis消除了几乎所有的JDBC代码和参数的手工设置以及对结果集的检索。MyBatis可以使用简单的XML或注解用于配置和原始映射，将接口和Java的POJO（Plain Old Java Objects，普通的Java对象）映射成数据库中的记录。

对象之间的关系：一对一、一对多、多对多。
- 一对一：一个学生对应一个学生证（可以记录到一张表里，不需要中间表）。
- 一对多(多对一)：一个组对应多个用户，每个用户只能属于一个组。表设计：在多方加外键。
- 多对多：一个老师对应多个学生，但每个学生可被多个老师教。多对多比较少用。
  - 表设计：加中间表。例如：学生、课程、分数表设计，分数表作为中间表，里边有学生id/课程id、分数，中间表的主键可以为：联合主键(学生id和课程id)、并且不能是自动生成的(需要从学生表id和课程表id获得)。问题：操作不方便 也可单独设置分数表id作为主键。分数表和学生或课程表是多对一的关系。比联合主键简单

表设计 三范式：
- 要有主键，列不可分。
- 联合主键，不能存在部分依赖。
- 不能存在传递依赖。

事务 ACID 原子性Atomicity、一致性Consistency、隔离性Isolation和持久性Durability
事务隔离级别：1 read-uncommitted，2 read-committed，4 repeatable read，8 serializable 。级别越高，越安全但效率越低 一般设置为 read-committed。用悲观锁或乐观锁。
- 悲观锁：获取到数据后加锁，防止别人更新。使用的是数据库的锁。
- 乐观锁：所有对数据的更新带上版本号，对照不同版本判断是否被更新过。不在获取数据后加锁。

mysql 约束: https://gw.alipayobjects.com/zos/rmsportal/PDMVJVKZwvVWWGNaKvsK.png

从存储上来说，数据库主要分为几类：

- Key/Value形式，典型的产品如tair。NoSql数据库，在NoSql分类中，有一种基于键值对（key/value pairs）的结构化数据类型，它通常被存储在内存中以支持快速访问。三种最流行的基于内存键值对的存储系统是：Memcached，Cassandra和Redis。
- Schema-free, 典型的如mongoDB，阿里云的OTS，这一类产品的特点是使用灵活简单，但如果有二级索引的需求，会比较麻烦。
- SQL,关系型数据库，比如MySQL、OceanBase，特点是有较高的使用成本，schema变更较为麻烦，但功能强大，特别是OceanBase解决了扩展性和性能问题。

对数据库进行读写分离。 让主数据库处理事务性的增，删，改操作(Insert,Update,Delete)操作，让从数据库处理查询操作(Select操作)，数据库复制被用来将事务性操作导致的变更同步到集群中的从数据库。

当访问量大的时候（数据库连接数不够）：
- 业务垂直拆分，拆分后就需要远程服务调用框架hsf
    - 淘宝业务类型：商品、交易、评价、属性
    - 拆分为“商品中心、用户中心”等，不同团队分别负责
- 中间加一层，这层下边的机器要减少，作为proxy
- 数据库切分：单个商品库切分为多个

除了数字、字符串和日期之外，许多数据库还可以存储大对象，例如图片或其他数据。在sql中，二进制大对象称为BLOB，字符型大对象称为CLOB。

存储过程是在数据库中执行的用数据库相关的语言编写的过程。

可以将多个语句(sql语句？)组合成「事务(transaction)」。当所有语句都顺利执行之后，事务可以被提交。否则，如果其中某个语句遇到错误，事务将被回滚，就好像没有任何语句被执行过一样。

建立与数据库的连接很耗时（花接近一秒），实质是建立了socket连接，用“连接池”来解决。
数据库连接是有限的资源，如果用户要离开应用一段时间，那么他占用的连接就不应该保持开放状态；另一方面，每次查询都获取连接并在随后关闭它的代价也是相当高的。
解决办法是建立「数据库连接池（pool）」。这意味着数据库连接在物理上并未被关闭，而是保留在一个队列中并被反复重用。连接池是一种非常重要的服务，web容器和应用服务器的开发商通常会提供连接池服务的实现。
连接池的使用对程序员来说是「完全透明的」，可以通过获取数据源并调用getConnection方法来得到连接池中的连接。使用完连接后，需要调用close方法。该方法并不在物理上关闭连接，而只是告诉连接池已经使用完该连接。


------ JDBC、Hibernate、iBATIS 使用区别
Java应用传统上使用JDBC（Java Database Connectivity）API来把数据持久到关系数据库中。JDBC API使用SQL语句来完成创建（create）、读取（read）、更新（update）和删除（delete）（CRUD）操作。JDBC代码内嵌在Java类中——换句话说，这类代码与业务逻辑紧密耦合在一起。这类代码还在很大程度上依赖于SQL，而SQL并非是跨数据库的标准；这使得从一种数据库移植到另一种数据库变得困难起来。

对象-关系映射（ORM）使用直接映射来生成内部的JDBC或是SQL代码。然而对于一些应用场景来说，你需要对SQL查询做更加直接的控制。在编写涉及了一系列更新查询的应用时，直接编写自己的SQL查询比依赖于ORM生成的SQL来得更有效一些。另外，在对象模型和数据模型之间存在失配时，ORM是不能够使用的。

iBATIS最好是用在你需要全面地控制SQL的时候，在需要对SQL查询做微调的时候也很有用。当你在应用和数据库设计两方面都有完全的控制权的时候，就不应该使用iBATIS，因为在这样的情况下，应用可能会做出修改以适应数据库，或是反过来。

在ORM的领域中，看来JPA已经是王道，规范就是规范。在各大厂商的支持下，JPA的使用开始变得广泛。

总是会存在精通Java的人和更信任SQL的人这样的一种划分，对于一个熟练的Java程序员来说，他想使用一个无需与SQL有太多交互的持久性框架，那么Hibernate是最好的选择，因为它会在运行时生成高效率的SQL查询。但是，如果你想要使用存储过程来对数据库查询做各方面的控制的话，则iBATIS是推荐的解决方案。iBATIS大力支持SQL，而Hibernate和JPA则是使用它们自己的查询语言（分别是HQL和JPQL），这些语言与SQL类似。


------ 视图 事务 索引
SQL 内连接inner join、外连接outer join、左外连接left outer join、右外连接right outer join、全外连接full outer join。外连接实际上产生了两个关系(表)的笛卡尔积。

SQL允许通过查询来定义“虚关系”，它在概念上包含查询的结果。但虚关系并不预先计算并存储，而是在使用虚关系的时候才通过执行查询被计算出来。像这种不是逻辑模型的一部分，但作为虚关系对用户可见的关系称为「视图」(view)。

特定数据库系统允许存储视图关系，它们保证，如果用于定义视图的实际关系改变，视图也跟着修改，这样的视图被称为物化视图（materialized view）。

对查询而言，视图是一个有用的工具，但如果我们用它们来表达更新、插入或删除，它们可能带来严重的问题。困难在于，用视图表达的数据库修改必须被翻译为对数据库逻辑模型中实际关系的修改。就像对上边的`faculty`视图插入数据，实际数据表中还必须要插入 salary 列的数据，此时 salary 列就不能为非空约束，不然修改视图会失败。

一般来说，如果定义视图的查询对下列条件都能满足，我们称SQL视图是可更新的（即视图上可以执行插入、更新或删除）：1. from子句中只有一个数据库关系。 2. select子句中只包含关系的属性名，不包含任何表达式、聚集或 distinct 声明。 3. 任何没有出现在select子句中的属性可以取空值；即这些属性上没有not null约束，也不构成主键的一部分。 4. 查询中不含有group by或having子句。

事务（transaction）由查询或更新语句的序列组成。SQL标准规定当一条SQL语句被执行，就隐式地开始了一个事务。但事务被提交（commit）或被回滚（rollback）时，该事务结束。在很多SQL实现中，默认方式下每个SQL语句自成一个事务，且一执行完就提交。如果一个事务要执行多条SQL语句，就必须关闭单独SQL语句的自动提交。如何关系自动提交也依赖于特定的SQL实现，在诸如JDBC或ODBC那样的应用编程接口中存在标准化方式来完成这项工作。
数据库系统保证在发生诸如某条SQL语句错误、断电、系统崩溃这些故障的情况下，如果一个事务还没有完成commit work，其影响将被回滚。在断电和系统崩溃情况下，回滚会在系统重启后执行。

许多查询只涉及少量记录，例如找出id为221的学生的tot_cred值，只涉及学生记录中的一小部分。如果数据库读取每条记录并一一检查，这样是很低效的。
在关系的属性上所创建的「索引(index)」是一种数据结构，它允许数据库系统高效地找到关系中那些在索引属性上取给定值的元组，而不用扫描关系中的所有元组。很多数据库支持这样创建索引：`create index studentID_index on student(ID);` 在 student 关系的属性 ID 上创建了一个名为 studentID_index 的索引。

触发器（trigger）是一条语句，当对数据库作修改时，他自动被系统执行。触发器可以用来实现未被SQL约束机制指定的某些完整性约束，用来当满足特定条件时对用户发警报或自动开始执行某项任务。创建方式：`create trigger xx after update ...`。 触发器是很有用的工具，但是如果有其他候选方法就最好别用触发器。很多触发器的应用都可以用适当的存储过程来替换。

联机分析处理（OLAP）工具帮助分析人员用不同的方式查看汇总数据，使他们能够洞察一个组织的运行。OLAP工具工作在以维属性和度量属性为特性的多维数据之上。数据立方体由以不同方式汇总的多维数据构成，预先计算数据立方体有助于提高汇总数据的查询速度。交叉表的显示允许用户一次查看多维数据的两个维及其汇总数据。下钻、上卷、切片和切块是用户使用OLAP工具时执行的一些操作。从SQL1999标准开始，SQL提供了一系列的用于数据分析的操作符，其中包括cube和rollup操作，有些系统还支持pivot子句，可以很方便地生成交叉表。

关系代数（relational algebra）定义了一套在表上运算且输出结果也是表的代数运算。这些运算可以混合使用来得到表达所希望查询的表达式。关系代数定义了关系查询语言中使用的基本运算。


------ 数据存储和查询
绝大多数数据库将数据存储在磁盘上（越来越多地在闪存上），并将数据取入内存用于处理。存储设备的物理特性影响很大，磁盘上随机数据片段的访问比内存访问慢得多：磁盘访问需要几十毫秒，而内存访问只需十分之一微秒。

缓冲区（buffer）：缓冲区管理，被钉住的块，块的强制写出。缓冲区替换策略：最近最少使用（LRU），立即丢弃，最近最常使用（MRU）。

当数据库系统中的程序需要磁盘上的块(数据)时，它向缓冲区管理器发出请求（即调用），如果这个块已经在缓冲区中，缓冲区管理器将这个块在主存储器中的地址传给请求者。如果这个块不在缓冲区中，缓冲区管理器首先在缓冲区中为这个块分配空间，如果需要的话，会把其他块移出主存储器，为这个新块腾出空间。然后缓冲区管理器把请求的块从磁盘读入缓冲区，并将这个块在主存储器中的地址传给请求者。

如果你熟悉操作系统的概念，你会发现缓冲区管理器几乎和大多数操作系统中的虚拟存储管理器是一样的它们的一点区别是数据库的大小会比机器的硬件地址空间大得多，因此存储器地址不足以对所有磁盘块进行寻址。此外为了更好地为数据库系统服务，缓冲区管理器必须使用比典型的虚拟存储器管理策略更加复杂的技术：缓冲区替换策略（buffer replacement strategy）；被钉住的块（pinned block）；块的强制写出（forced output of block）。

因为数据以块为单位在磁盘存储器和主存储器之间传输，所以采取用一个单独的块包含相关联的记录的方式，将文件记录分配到不同的块中是可取的。如果我们能够仅使用一次块访问就可以存取我们想要的多个记录，就能节省磁盘访问次数。

数据字典也称为系统目录，用于记录元数据，即关于数据的数据，例如关系名、属性名和类型、存储信息、完整性约束和用户信息。

减少磁盘访问数量的一种方法是在主存储器中保留尽可能多的块。因为在主存储器中保留所有的块是不可能的，所以需要为块的存储而管理主存储器中可用空间的分配。缓冲区是主存储器的一部分，可用于存储磁盘块的拷贝。负责分配缓冲区空间的子系统称为缓冲区管理器。







## Java / cpp


------ Java 2015-2016

《java并发编程实战源码》
《Effective Java Examples》
尚学堂 爱慕课
- [Java 征途：行者的地图](http://www.cnblogs.com/mindwind/p/5251430.html)
- [Java工程师成神之路~](http://www.hollischuang.com/archives/489)

视频地址：http://www.imooc.com/learn/196
[Spring基础知识汇总](http://www.imooc.com/article/1309)

java跨平台，是因为jvm做了跨平台实现。Java代码都要写到class中。

Java中JDK,JRE和JVM之间的关系：![](https://t.alipayobjects.com/images/rmsweb/T1bNxiXeRcXXXXXXXX.png)

能够分析类能力的程序称为反射（reflective），反射可以用来： 在运行中分析类的能力
，在运行中查看对象， 实现通用的数组操作代码， 利用 Method 对象 这个对象很像C++中的函数指针。

使用泛型机制编写的程序代码要比那些杂乱地使用Object变量，然后再进行强制类型转换的代码具有更好的安全性和可读性，泛型对于集合类尤其有用，在表面上看来，泛型很像C++中的模板。
一个泛型类就是具有一个或多个类型变量的类, 如`public class Pair<T, U>{ ... }`。类型变量使用大写形式，且比较短，在Java库中，使用变量E表示集合的元素类型，K和V分别表示表的关键字与值的类型。T(需要时还可以用临近的字母U/S)表示「任意类型」。泛型类可看做普通类的工厂。
泛型方法，如`public static <T> T getMiddle(T... a){ }` 可以定义在普通的类中，也可以定义在泛型类中。
Java虚拟机泛型转换： 虚拟机中没有泛型，只有普通的类和方法。所有的类型参数都用它们的限定类型替换。桥方法被合成来保持多态。为保持类型安全性，必要时插入强制类型转换。

流与文件 多个同时执行的程序需要修改同一个文件的时，这些程序需要以某种方式进行通信，不然这个文件很容易被破坏。文件锁可以解决这个问题，它可以控制对文件或文件中某个范围的字节的访问。但文件加锁机制是依赖于操作系统的。

Java I/O 操作的都是字节而不是字符。字符到字节必须要经过编码转换，而这个编码又非常耗时，而且会经常出现乱码问题。

Javac编译原理
Javac是一种编译器，能将一种语言规范转成另一种语言规范，通常编译器都是将便于人理解的语言规范转化成机器容易理解的语言规范。
Javac主要有四大模块：词法分析器、语法分析器、语义分析器、代码生成器。
Java是跨平台的，一次编译到处运行。
ClassLoader就是类加载器，负责将class加载到JVM中；还能审查每个类应该由谁加载、它是一种父优先的等级加载机制；还有一个任务就是将class字节码重新解析成JVM统一要求的对象格式。
- 在自定义路径下查找自定义的class类文件，也许我们需要的class文件并不总是在已经设置好的ClassPath下面，那么需要自己实现一个ClassLoader来找到这个类。
- 对我们自己的要加载的类做特殊处理，如保证通过网络传输的类的安全性，可以将类经过加密后再传输，在加载到JVM之前需要对类的字节码再解密，就可以在自定义的ClassLoader中实现。
- 我们可以检查已经加载的class文件是否被修改，如果修改了，可以重新加载这个类，从而实现类的热部署。

Java应不应该动态加载类
用Java的一个痛处就是，如果修改一个类，必须要重启一边，很费时。于是能否来个动态类的加载而不需要重启JVM？不应该这样。
Java的优势正是基于共享对象的机制，达到信息的高度共享，也就是通过保存并持有对象的状态而省去类信息的重复创建和回收。对象一旦被创建，这个对象就可以被人持有和利用。

`类加载器与安全管理器类`、`对类文件进行加密`、`字节码校验与校验器`、`安全策略文件`、`JAAS（Java认证和授权服务）`


注解是哪些插入到源代码中使用其他工具可以对其进行处理的标签。注解不会改变程序的编译方式。注解的使用范围还是很广泛的，如：`附属文件的自动生成，例如部署描述符或者bean信息类`，`测试、日志、事务语义等代码的自动生成`。Java EE使用注解极大地简化了编程模型。

Java servlet、asp、CGI等统一称为「服务器端程序脚本」，可以让web服务器实现对程序的调用，用来对用户的输入进行处理。

有许多工具都需要调用Java编译器，例如`开发环境`，`自动化构建和测试工具`、`处理Java代码段的模板工具（如JSP）`等。JSP引擎将HTML里混杂的Java代码编译到Servlet中。


------ Servlet JavaBean

- bean 普通的java bean 可以包含业务逻辑代码！
- entity 实体bean ，一般是用于ORM 对象关系映射 ，一个实体映射成一张表，一般无业务逻辑代码！

POJO全称是Plain Ordinary Java Object / Plain中文可以翻译成：普通Java类，具有一部分getter/setter方法的那种类就可以称作POJO，很显然POJO也是JavaBean的一种。一般在web应用程序中建立一个数据库的映射对象时，我们只能称它为POJO。

通常一个Web服务站点的后端服务器不是将Java的应用服务器直接暴露给服务访问者，而是在应用服务器（如Jboss）的前面再加一个Web服务器（如Apache或Nginx），可以做日志分析、负载均衡、权限控制、防止恶意请求以及静态资源预加载等。

servlet 其实就是一个 Java 类，所有的servlet类都必须继承 HttpServlet 类。
生命周期：服务器会在启动或第一次请求servlet时初始化一个servlet对象，然后使用该对象处理客户端的请求，当服务器关闭时销毁该对象。

Servlet容器有：Tomcat、Jetty等。Tomcat的容器分为四个等级，真正管理Servlet的容器是Context容器，一个Context对应一个web工程。

用户浏览器向服务器发起一个请求通常会包含如下信息：http://hostname:port/contextpath/servletpath/。hostname和port用来与服务器建立TCP链接，而后面的URL才用来选择服务器中哪个子容器服务用户的请求。

现在的Web应用很少直接将交互全部页面都用Servlet来实现，而是采用更加高效的MVC框架来实现。这些MVC框架的基本原理是将所有的请求都映射到一个Servlet，然后去实现service方法，这个方法也就是MVC框架的入口。

JavaBean
> JavaBean与EJB（Enterprise JavaBean）没什么关系。JavaBean是为Java语言设计的软件组件模型，具有可重复使用和跨平台的特点。EJB是服务器端的构件，提供对事务、持久化、复制以及安全问题的支持。
> Enterprise Bean 与 JavaBean 不同。JavaBean 是使用 java.beans 包开发的，它是 Java 2 标准版的一部分。JavaBean 是一台机器上同一个地址空间中运行的组件。JavaBean 是进程内组件。Enterprise Bean 是使用 javax.ejb 包开发的，它是标准 JDK 的扩展，是 Java 2 Enterprise Edition 的一部分。Enterprise Bean 是在多台机器上跨几个地址空间运行的组件。因此 Enterprise Bean 是进程间组件。JavaBean 通常用作 GUI 窗口小部件，而 Enterprise Bean 则用作分布式商业对象.

一个bean就是一个可重用的软件构件，并且能够在开发工具中可视化地操作。（类似VB里的控件）bean就是一个在开发工具中可操作的类。
如果你的bean中的方法使用了标准的命名模式，那么开发工具就可以使用反射机制来确定bean的特征，例如属性以及事件。如果你需要更灵活的方式来描述有关bean的信息，可以定义一个实现了BeanInfo接口的对象。只要提供了这样的对象，开发工具就会通过询问它来识别你的bean具有的特性。

1. 它是一个简单的Java类，有Java类的一切特性，可使用封装、继承、多态等特性。
2. 必须是一个公开的类，访问权限为public。
3. 必须具有一个无参数的构造方法。
4. 一般将属性设置为私有的，通过使用 getXXX() 方法 和 setXXX() 方法进行属性的取得和设值。

JavaBean的任务就是: “Write once, run anywhere, reuse everywhere”，即“一次性编写，任何地方执行，任何地方重用”。


------ Spring Struts
Spring 是一个轻量级的 IOC 和 AOP 容器框架，通过其核心的依赖注入机制，以及AOP的声明式事务管理，与持久层框架整合，以及与其他的MVC框架整合，为企业应用提供一个轻量级的解决方案。

非侵入式设计：从框架角度可以这样理解，无需继承框架提供的类，这种设计就可以看作是非侵入式设计，如果继承了这些框架类，就是侵入设计，如果以后想更换框架之前写过的代码几乎无法重用，如果非侵入式设计则之前写过的代码仍然可以继续使用。

POJO：POJO（Plain Old Java Objects）简单的Java对象，它可以包含业务逻辑或持久化逻辑，但不担当任何特殊角色且不继承或不实现任何其它Java框架的类或接口。

AOP：AOP是Aspect Oriented Programming的缩写，意思是面向切面编程，提供从另一个角度来考虑程序结构以完善面向对象编程（相对于OOP），即可以通过在编译期间、装载期间或运行期间实现在不修改源代码的情况下给程序动态添加功能的一种技术。通俗点说就是把可重用的功能提取出来，然后将这些通用功能在合适的时候织入到应用程序中；比如安全，日记记录，这些都是通用的功能，我们可以把它们提取出来，然后在程序执行的合适地方织入这些代码并执行它们，从而完成需要的功能并复用了这些功能。

灵活的Web层支持：Spring本身提供一套非常强大的MVC框架，而且可以非常容易的与第三方MVC框架集成，比如Struts等。

spring由以下几个模块组成：

1. 核心容器和支持工具
2. Application context 模块
3. AOP模块 直接集成了面向切面编程的功能，通过使用AOP，不用依赖EJB，可以在应用系统中使用声明式的事务管理策略。
4. JDBC 和 DAO模块 提供了数据库操作中的模板代码，简化数据库操作工作。
5. ORM映射模块、 web模块、 MVC模块 它是一个完整的MVC实现，也可以和其他MVC框架集成，支持各种视图技术如JSP、velocity、Tiles等

IoC就是Inversion of Control，控制反转还有一个名字叫做依赖注入（Dependency Injection），就是由容器控制程序之间的关系，而非传统实现中，由程序代码直接操控。IoC意味着将你设计好的类交给系统去控制，而不是在你的类内部控制。IoC很好的体现了面向对象设计法则之一—— 好莱坞法则：“别找我们，我们找你”；即由IoC容器帮对象找相应的依赖对象并注入，而不是由对象主动去找。

Struts Hibernate(orm框架)
- Struts的目的是为了分离视图层和控制层
- Spring是为了让你养成用接口编程的好习惯 提高程序的重用率还有可维护性（健壮性）
- Hibernate的目的是为了实现用面向对象的思想来管理数据库实现与数据库之间的低耦合

- 模型层，用Hibernate框架让来JavaBean在数据库生成表及关联，通过对JavaBean的操作来对数据库进行操作；
- 控制层，用Struts框架来连接数据层和视图层的，接收、处理、发送数据并控制流程；
- 视图层，用JSP模板把页面展现给用户以及提供与用户的交互。

Struts2 整合 Hibernate 开发：分层思想，从上到下：表现层 → 业务逻辑层 → 持久层 → 数据库层

Velocity

- JSP是编译执行，而Velocity是解释执行
- 编译执行的效率明显好于解释执行
- JSP的执行必须要有Servlet的运行环境，也就是需要ServletContext、HttpServletRequest、HttpServletResponse类。而渲染Velocity不需要，所以Velocity不只应用在Servlet环境中。

Velocity优化实践：改变Velocity的解释执行，变为编译执行。


------ JVM / 内存管理

Java虚拟机中有许多附加技术用以提升速度。尤其是与加载器操作有关的，被称为"即时" (Just-In-Time，JIT)编译器的技术。这种技术可以把程序全部或部分翻译成本地机器码(这本来是Java虚拟机的工作)，程序运行速度因此得以提升。

以计算为中心看计算机的体系结构可分为几部分：指令集；计算单元；寻址方式；寄存器定义；存储单元。指令集就是CPU中用来计算和控制计算机系统的一套指令的集合，指令集的先进与否关系到CPU的性能发挥，体现CPU性能的一个重要标志。当前计算机中指令集主要分为：精简指令集（RISC）和复杂指令集（CISC），桌面操作系统中普遍使用CISC。

JVM的结构基本由4部分组成：类加载器；执行引擎；内存区；本地方法调用。执行引擎是核心部分，用来解析JVM字节码指令，得到执行结果。在《Java虚拟机规范》中规定了执行引擎执行字节码时应该处理什么、得到什么结果，但并没有规定执行引擎应该采取什么方式处理而得到这个结果，具体采取什么方式由JVM的实现厂家自己去实现、如SUN的hotspot是基于栈的执行引擎，而Google的Dalvik是基于寄存器的执行引擎。

每一个Java线程就是一个执行引擎实例，一个JVM实例中就会同时有多个执行引擎在工作，这些执行引擎有的在执行用户的程序，有的在执行JVM内部的程序（如Java垃圾收集器）。

Java中垃圾回收器并不是采用“引用计数”方式来进行。引用记数是一种简单但速度很慢的垃圾回收技术。
Java中垃圾回收器是"自适应的、分代的、停止-复制、标记-清扫"式垃圾回收器。

对象的引用关系只有对象的创建者持有和使用，JVM不可以干预对象的引用关系，因为JVM并不知道对象是怎么被使用的，这就涉及JVM并不知道对象的运行时类型而只知道编译时类型。假如一个对象的属性结构被修改，但是运行时其他对象可能仍然引用该属性。

堆栈图: https://gw.alipayobjects.com/zos/rmsportal/VpwONqGFCQIOuJLLFbvu.png

基本类型一旦声明就会被分配内存空间，而普通类型需要使用new关键字来分配内存空间。

在 Java中，所有的(普通)对象都储存在堆上。因此，new关键字的完整含义是，在堆上创建对象。

基本类型(primitive type)的对象，比如int, double，保存在栈上。当我们声明基本类型时，不需要new。一旦声明，Java将在栈上直接存储基本类型的数据。所以，基本类型的变量名表示的是数据本身，不是引用。

在JVM的一个进程空间中，一个栈(stack)代表了方法调用的次序。对于多线程来说，进程空间中需要有多个栈，以记录不同线程的调用次序。多个栈互不影响，但所有的线程将共享堆(heap)中的对象。

通常操作系统管理内存的申请空间是按照进程来管理的，每个进程拥有一段独立的地址空间，每个进程之间不会相互重合，操作系统也会保证每个进程只能访问自己的内存空间。

几个名词：`物理内存和虚拟内存`、`RAM`、`地址总线与总线宽度`、`内核空间与用户空间`、`静态/动态内存分配和回收`

Java堆是用于存储Java对象的内存区域，堆的大小在JVM启动时就一次向操作系统申请完成，一旦分配完成，堆的大小就不能再改变。Java堆中内存空间的管理由JVM控制，对象创建由Java应用程序控制，但对象所占的空间释放由管理堆内存的垃圾收集器来完成。
堆是被所有Java线程所共享的，所以对它的访问需要注意同步问题，方法和对应的属性都需要保证一致性。

JVM运行实际程序的实体是线程，每个线程创建时JVM都会为它创建一个堆栈，堆栈的大小根据不同的JVM实现而不同。一个线程的方法的调用和返回对应于这个Java栈的压栈和出栈。

栈中主要存放一些基本类型的变量数据（int、short、long、byte、float、double、boolean、char）和对象句柄（引用），方法执行结束此处变量也就会消失。存取速度比堆要快，仅次于寄存器，栈数据可以共享。缺点是，存在栈中的数据大小与生存期必须是确定的，这样导致缺乏了其灵活性。

每一个Java应用都唯一对应一个JVM实例，每一个实例唯一对应一个堆。

从堆和栈的功能和作用来通俗地比较，堆主要用来存放对象，栈主要用来执行程序，这种不同主要是由堆和栈的特点决定的。

线程和进程的区别: https://gw.alipayobjects.com/zos/rmsportal/sPHJvmeyIHeUBcQqOmVO.png

操作系统的多任务：在同一时刻运行多个程序的能力。计算机有多个CPU，但是并发执行的进程数目并不是由CPU数目制约的。操作系统将CPU的时间片分配给每一个进程，给人并行处理的感觉。

可以同时运行一个以上线程的程序称为多线程程序。多进程与多线程本质区别在于每个进程拥有自己的一整套变量，而线程则共享数据。但共享变量使线程之间的通信比进程之间的通信更有效、更容易。

一些名词：`中断线程`，`线程状态`，`线程属性`，`同步：竞争条件、锁对象、条件对象、死锁`，`阻塞队列`，`线程安全的集合`，`线程池`，`同步器`

构建一个新的线程是有一定代价的，因为涉及与操作系统的交互。如果程序中创建了大量的生命周期很短的线程，应该使用「线程池」。一个线程池中包含许多准备运行的空闲线程。


------ 面向对象OOP
Java是完全的面向对象的语言，它使用`类和对象`、遵从`封装、继承、多态`的设计原则。类定义了对象的类型或种类、是定义对象的样板；同一个类的所有对象都有`相同的行为、相同种类的数据`(即有相同的方法和属性、但具体数据不同)

面向对象的3个基本要素：封装、继承、多态

面向对象的5个基本设计原则：

- 单一职责原则（Single-Resposibility Principle）
    - 一个类，最好只做一件事，只有一个引起它的变化。
- 开放封闭原则（Open-Closed principle）
    - 对扩展开放，对修改封闭的
- 里氏替换原则（Liskov-Substituion Principle）
    - 子类必须能够替换其基类。
    - 子类可以扩展父类的功能，但不能改变父类原有的功能。
- 依赖倒置原则（Dependecy-Inversion Principle）
    - 高层模块不依赖于低层次模块，二者都同依赖于抽象接口。
    - 抽象接口不应该依赖于具体实现;而具体实现则应该依赖于抽象接口。
- 接口隔离原则（Interface-Segregation Principle）
    - 使用多个小的专门的接口，而不要使用一个大的总接口。

类设计技巧：
- 一定要保证数据私有。
- 一定要对数据初始化。Java不对局部变量进行初始化，但对对象的实例域进行初始化；但最好要自己去显式地初始化所有的数据。
- 不要在类中使用过多的基本类型。用其他的类代替多个相关的基本类型的使用。
- 不是所有的域都需要独立的域访问器和域更改器。
- 将职责过多的类进行分解。
- 类名和方法名命名要恰当、能体现他们的职责。

类的数据域应该标记为`private`，以达到封装的目的，对其操作时，提供`公有的访问器方法(get)`、`公有的更改器方法（set）`。这样的好处是：可以改变内部实现，不影响其他代码；更改器方法可以执行错误检查。

final 修饰符大都应用于`基本类型`或`不可变类型(类中的每个方法都不会改变其对象，如String类)`，对于可变的类如`private final Date hiredate;`仅仅意味着存储在hiredate变量中的`对象引用`在对象构造之后不能改变，而并不意味着hiredate对象是一个常量，任何方法都可以对hiredate引用的对象调用setTime更改器。

Java不支持多重继承，即派生类只能有一个基类。

Java中每个类都从类Object派生出。但来自object类的`equals()、toString()`不好用、需要被覆盖重写掉。

能够将派生类的对象赋值给任何祖先类型的变量，但相反方向的赋值不成立（例如：Student类构造为Person类的派生类，那么student是person，但person不一定是student）。student与person的关系为：「是其中一个关系（is-a relationship）」；象类MechanicalArm（机器人手臂）被类Robot（机器人）拥有，他们就是「拥有关系（has-a relationship）」；这就是术语「is-a 、has-a」的概念。

「is-a」关系是继承的一个明显特征，它可用来判断是否应该将类设计为继承关系。

> super 不是一个对象的引用，不能将 super 赋给另一个对象变量，它只是一个指示编译器调用超类方法、或超类的构造器的特殊关键字。

子类方法不能低于父类方法的可见性，例如：父类方法是public、子类也要是public。

多态和「动态绑定」或「后期绑定」是相同的东西。例如Person类的数组，可以包含其派生类Student的对象。当调用`person[0].xx()`方法时，如果`person[0]`中存放的是Student类的对象，则`xx`方法是Student类中的实例方法，而不是Person类的实例方法。

实例变量可以不用初始化而会被赋上默认值，局部变量(方法内定义的变量)必须要进行初始化。

用`static`修饰的方法叫做“类方法”，修饰的变量叫做“类变量”。类的对象上不存在static变量或方法。静态方法(static方法)里不能调用“非静态”的变量或方法；但非静态方法里可以调用静态变量或方法。

所有的类“构造器”第一句话都是`super()`，没有明确写则会默认加上，直到祖宗类`Object`没父类也就没super。普通的类方法里，也有隐式super参数供调用父类同名方法

多态的存在要有3个必要条件：要有继承、要有方法重写、父类引用指向子类对象。
接口中只有：常量、抽象方法。
Map的底层结构是：数组 + 链表

类既不可以是private的(这样会值得除该类之外，其他任何类都不可以访问它)， 也不可以是protected的。所以对于类的访问权限，仅有两个选择：包访问权限或public。如不希望其他任何人对该类拥有访问权限，可以把所有的构造器都指定为private。

由导出类转型成基类，在继承图上是向上移动的，因此一般称为向上转型。由于向上转型是从一个较专用类型向较通用类型转换，所以总是很安全的。也就是说，导出类是基类的一个超集。它可能比基类含有更多的方法，但它必须至少具备基类中所含有的方法。

在面向对象编程中，生成和使用程序代码最有可能采用的方法就是直接将数据和方法包装进一个类中，井使用该类的对象。也可以运用组合技术使用现有类来开发新的类，而继承技术其实是不太常用的。因此，尽管在教授OOP的过程中我们多次强调继承，但这并不意味着要尽可能使用它。相反，应当慎用这一技术，其使用场合仅限于你确信使用该技术确实有效的情况。到底是该用组合还是用继承，一个最清晰的判断办法就是问一问自己是否需要从新类向基类进行向上转型。如果必须向上转型，则继承是必要的，但如果不需要，则应当好好考虑自己是否需要继承。




cpp 2017

- 指针和引用的区别
  - 引用总是指向某个对象，定义引用时必须初始化(之后不可改变)；引用只是一个“别名”，给引用赋值修改的是引用所关联对象的值
  - 指针可以指向任何对象，可以修改。 不能对未被初始化为适当地址的指针解除引用。

- new 出来的对象，需要手动 delete，然后再设置为 NULL
  - 只能用 delete 来释放使用 new 分配的内存；不能用 delete 来释放普通变量声明所获得的内存。
  - 手工管理内存，非常容易出错，导致“内存泄露”问题，排查非常困难。使用智能指针，避免这种问题。
  - 当使用 delete 时，类的析构函数会被自动调用。删除对象可以释放对象本身占用的内存，但并不能自动释放属于对象成员的指针指向的内存，因此要在析构函数使用 delete 删除对象成员的内存。

- 内存模型
  - 自动变量：函数内的变量(包含函数参数)；静态变量：函数外的变量、使用 static 定义的变量；动态变量：new 出来的变量。
  - 自动变量保存在栈（LIFO 后进先出）中、变量数量可以灵活增减；静态变量数目在程序运行期间不会变，因此不需要栈来管理，编译器将分配固定的内存块来存储所有的静态变量，这些变量在程序执行期间一直存在。
  - 位于函数内的变量是「局部变量(自动变量)」，位于函数外的变量是「全局变量」，全局变量对所有的程序文件都是可见的。
  - 使用 static 修饰局部变量、可以在函数调用之间保持局部变量的值、不需要在每次进入和离开函数时进行创建和销毁。
  - 使用 static 修饰全局变量时，会使变量的作用域限制在声明它的文件内。
  - extern 是用来在另一个文件中声明一个全局变量或函数，用于当有两个或多个文件共享相同的全局变量或函数时。
  - 在函数或代码块中声明 const 时，其作用域为代码块，所以不用担心与外部的 const 常量重名引起冲突。
  - C/C++ 都不允许在一个函数中定义另外一个函数，因此所有函数都是静态存储，在整个程序执行期间一直存在。
  - 可以使用 static 定义静态函数，使函数只在文件内可见，这样可以在其他文件中定义同名的函数。
  - 使用 C++ 运算符 new（或 C 函数 malloc()）分配的内存称为动态内存，不受作用域限制，可以在一个函数中分配内存，在另一个函数中释放。动态内存不是 LIFO。
  - 通常编译器使用三块独立的内存：一块用于静态变量（可能再细分），一块用于自动变量，另一块用于动态存储。

- 异常
  - 对于不同的异常类型，基类引用能够捕获各派生类异常对象，而派生类异常只能捕获从这个类派生而来的类对象。
  - 使用异常会降低程序的运行速度。

- 头文件：
  - 可包含：函数原型，使用 #define 或 const 定义的常量，结构/类/模板声明，内联函数。
  - 不能包含：函数定义/函数体、变量声明。不要使用 using 指令。

- 命名空间
  - 命名空间可以是全局的，也可以位于另一个命名空间中，但不能位于代码块中。
  - using 声明：`using std::cout`，using 编译指令：`using namespace std`，首选在局部作用域内使用 using 声明。
  - 使用在已命名的名称空间中声明的变量，而不是使用外部全局变量或静态全局变量。

何时使用引用参数：
![何时使用引用参数](https://zos.alipayobjects.com/rmsportal/CpddxowZkhtkSoOVasEN.jpg)

不同的编译器对同一个函数生成不同的修饰名称，名称不同将使链接器无法将一个编译器生成的函数调用与另一个编译器生成的函数定义匹配。在链接编译模块时，请确保所有对象文件或库都是由同一个编译器生成的。通常可以用自己的编译器重新编译源代码来消除链接错误。

数组是一种数据结构，在内存中连续存储同类型的多个值。C++ 将数组名解释为其第一个元素的地址：arr == &arr[0]

如何选择数据类型？通常来说 int 被设置为对目标计算机来说最“自然”(处理起来效率最高)的长度，如果没有特殊理由，则应使用 int。
如果可能超过 int 类型的最大值，则使用 long 或 long long，便于程序移植到低位数的系统上而不出现问题。
如果节省内存很重要，则应使用 short 而不是 int，即使它们的长度一样。例如 int 数组从 16 位系统移到 32 位系统，内存占用会加倍。

类之于对象 就像 类型之于变量。面向对象编程（OOP）的本质是设计并扩展自己的数据类型。

预处理指令 #include 来引用头文件，引用头文件相当于复制头文件的内容。
建议把所有的常量、宏、系统全局变量和函数原型写在头文件中。

C++ 可以使用 C 的头文件，C++ 头文件去掉了扩展名 h，有些 C 头文件被转换为 C++ 头文件时被重新命名，去掉了扩展名 h，并在文件名称前面加上前缀 c (表明来自 c 语言)，例如 C++ 版本的 math.h 为 cmath。

泛型（generic）是一种允许一个值取不同数据类型（所谓多态）的技术，
强调使用这种技术的编程风格被称为泛型编程（generic programming通用编程/类属编程）。

STL（Standard Template Library 标准模板库）是泛型编程思想的实际体现和具体实现，
它是一种为泛型组件建立大型标准库的可扩展架构。STL本身，与面向对象无关，也与具体的程序设计语言无关。STL 提供了一组表示容器、迭代器、函数对象和算法的模板。所有 STL 容器都提供了一些基本方法：size()、swap()、begin()、end()

STL 是泛型编程思想的产物。 STL 是最新的 C++ 标准函数库中的一个子集，这个庞大的子集占据了整个库的大约 80% 的分量。 而作为在实现 STL 过程中扮演关键角色的模板则充斥了几乎整个 C++ 标准函数库。

泛型编程是一种面向算法的多态技术，STL 是它的一种具体实现。 与针对问题和数据的面向对象的方法不同，泛型编程中强调的是算法。 是一类通用的参数化算法，它们对各种数据类型和各种数据结构都能以相同的方式进行工作，从而实现源代码级的软件重用。
例如，不管（容器）是数组、队列、链表、还是堆栈，不管里面的元素（类型）是字符、整数、浮点数、还是对象，都可以使用同样的（迭代器）方法来遍历容器内的所有元素、获取指定元素的值、添加或删除元素，从而实现排序、检索、复制、合并等各种操作和算法。
泛型编程的通用化算法，是建立在各种抽象化基础之上的：利用参数化模版来达到数据类型的抽象化、利用容器和迭代器来达到数据结构的抽象化、利用分配器和适配器来达到存储分配和界面接口的抽象化。
