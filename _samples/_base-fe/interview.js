/* HTTP
> 2018 2022 2024

HTTP 长轮询/长连接
一种轮询方式是否为长轮询，是根据服务端的处理方式来决定的，与客户端没有关系。轮询的长短，是服务器通过编程的方式手动挂起请求来实现的。

HTTP GET/DELETE/PUT 幂等性(无副作用) DNS 缓存.
http1.1，keep-alive 是默认的 只需一次 TCP 握手.
PC 上的 RTT 大概是 50ms, wifi 为 100ms， 3G 为 200ms，2G 为 400ms.
丢包: 丢的是 tcp 包？服务器怎么知道丢了，丢了哪些内容 (如 get 请求内容一部分丢了)？浏览器会重新发送，还是自动重发？
[合并 HTTP 请求是否真的有意义？](http://www.zhihu.com/question/34401250)
浏览器针对每个域名并发建立的最大 TCP 连接数基本都是 6 个，然后每个连接上串行发送若干个请求。HTTP1.1 协议规定请求只能串行发送。

[http pipelining](https://en.wikipedia.org/wiki/HTTP_pipelining) pipeline 原理是 客户端可以并行发送多个请求，但是服务器的响应必须按次序返回。一些服务器和代理不支持 pipeline；在 pipeline 中的前一个链接可能会阻塞后边的链接；减缓页面加载速度。Chrome 默认禁止了 pipelining。[原因](https://www.chromium.org/developers/design-documents/network-stack/http-pipelining)

名词：`TCP`、`UDP`、`套接字Socket`、`ip`、`URI`、`URL`、`URN`
`消息摘要和数字签名`、`RSA算法`、`DSA`、`认证问题`、`证书签名`、`代码签名`、`AES密匙`、`GSS-API`、`SASL`、`SSL`

IP地址和端口号组成了所谓的Socket，Socket是网络上运行的程序之间双向通信链路的终结点，是TCP和UDP的基础。
半关闭提供了这样一种能力：套接字连接的一端可以终止其输出，同时仍旧可以接收来自另一端的数据。该协议只适用于一站式（one-shot）的服务，如http服务。

--- Session与Cookie
Session 默认有效期是关闭浏览器，为什么session会消失，主要原因是浏览器端cookie内保存的 sessionID 失效了，因为session是基于cookie的，所以关闭浏览器会失效。浏览器关闭，session是不会马上消失的。如何延长session声明周期，解决方案：延长cookie 和 session 的生存时间
Cookie可以让服务端程序跟踪每个客户端的访问，但是每次客户端的访问都必须传回这些Cookie，如果数量很多，这就增加了客户端与服务端的数据传输量，而Session解决了这个问题。
同一个客户端每次和服务端交互时，不需要都传回所有的Cookie值，而是只要传回一个id，这个id是客户端第一次访问服务器时生成的，而且每个客户端是唯一的。这个id通常是name为JSESIONID的一个Cookie。
由于Cookie是存储在客户端浏览器里的，不安全很容易被修改。相比之下，Session是将数据保存在服务端，只是通过Cookie传递一个SessionID而已，所以Session更适合存储用户隐私和重要的数据。
分布式Session框架可以解决的问题：Session配置的统一管理；Cookie使用的监控和统一规范管理；Session存储的多元化；Session配置的动态修改；Session加密key的定期修改；充分的容灾机制，保持框架的稳定性；Session各种存储的监控和报警支持；Session框架的可扩展性；跨域名Session与Cookie的共享。
由于应用是一个集群，所以不可能将创建的Session都保存在每台应用服务器的内存中，因为如果每台服务器有几十万的访问用户，服务器的内存肯定不够用，即使够用，这些Session也无法同步到这个应用的所有服务器中。所以要共享这些Session必须将他们存储在一个分布式缓存中，可以随时写入和读取，而且性能要很好才能满足要求，如MemCache、淘宝的Tair。
跨域名共享Cookie问题，Cookie是有域名限制的，一个域名下的Cookie不能被另一个域名访问。所以，如果在一个域名下已经登陆成功，如何访问到另外一个域名的应用且保证登陆状态仍然有效呢？

--- 2019
xss/csrf 原理和防御方法。CORS 的 POST 跨域如何带cookie https://www.jianshu.com/p/13d53acc124f
[csrf 详解](https://tech.meituan.com/fe_security_csrf.html)、[csrf漏洞](http://www.cnblogs.com/hyddd/archive/2009/04/09/1432744.html)、[wiki中文](http://zh.wikipedia.org/wiki/%E8%B7%A8%E7%AB%99%E8%AF%B7%E6%B1%82%E4%BC%AA%E9%80%A0)
XSS 利用的是用户对指定网站的信任，CSRF 利用的是网站对用户网页浏览器的信任。
> [ajax里如何更新csrf token](http://www.v2ex.com/t/82751) ，最后的一段评论提到：csrf-token的目的是，让攻击者不能伪造请求（如通过img发起的请求会带上cookie）。因此，csrf-token不需要每个请求都改变，只需要确保对于每个session不一致即可，同一个session内不变没有问题。
jsonp请求也需要「防止csrf漏洞」，例如可以用jsonp获取通讯录列表。
ajax 方式的 csrf token 放到 post 提交的 body 里、随其他数据一起提交。

[a 标签中 target="_blank" 的安全漏洞](https://www.tutorialdocs.com/article/html-opener-blank.html) 详细地解释了该漏洞的攻击方法和原理。并在文末给出了防范该漏洞的解决办法：给 a 标签增加 rel="noopener noreferrer nofollow"。

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

*/


/* html css

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

- 没有 css-parent-selector ? anchor-positioning-api
- CSS 选择器优先级(id>class>标签>伪类)？伪类和伪元素区别？BFC/IFC 介绍？
- 浮动以及清除浮动？页面布局方法？flex一维 CSS Grid 二维。元素垂直居中方法？
- border-box 作用？display/position 作用(absolute会变为块元素)？z-index 在节点 position 值是什么生效(relative/absolute/fixed)？
- 子元素的 margin-top 设置影响父元素位置？页面兼容性问题？响应式布局怎么实现？
- CSS优化方法？减少DOM操作，减少重绘和重排，合理使用选择器，减少@import使用。
- h5高清方案(rem) 优缺点？ css 实现 loading，三角形？ css-module 的作用？ css 样式初始化为了什么？
- css 时间函数 http://www.smashingmagazine.com/2014/04/15/understanding-css-timing-functions
- css 长度 https://css-tricks.com/the-lengths-of-css  绝对长度: px inch cm mm。 rem: 相对 root 的 font-size 大小  em: 基于大写字母 M 的尺寸  ex: 基于 x 字母高度  1vh 等于 1/100 的视口高度

- BEM命名方式. 如何提升 CSS 选择器性能 http://www.jianshu.com/p/268c7f3dd7a6
- 浏览器解析和 CSS（GPU）动画优化 https://segmentfault.com/a/1190000008015671
  - css 动画中尽量只使用 transform 和 opacity ，这不会发生重排和重绘。
  - 有动画的元素样式，给定尺寸、设置为 display block（如果设置 display flex 子元素尺寸会动态变化、影响动画效果）

- URL编码 http://anjia.github.io/2015/04/15/jsURIEncode/
- 浏览器在自动选择编码方式的时候不会优先根据 html 源码中的所展示的 `<meta charset="utf-8" />` 代码来决定选择什么编码方式，而是优先根据“响应标头-response header”中的键为“Content-Type”的值来自动选择判断。
*/


/* js 基础
> 2018 ~ 2024

- console.log(1_048_576) 这是 Numeric Separators 的语法，是 ECMAScript 2021（ES12）中的一部分
- 33-js-concepts https://github.com/leonardomso/33-js-concepts

- 只在行首字符是 `+ - [ ( /` 这5种情况下，加前置分号即可
- 原型链/闭包(匿名函数)？实现继承？new的原理实现？this指向改变(call/apply/bind)？null/undefined区别？事件代理(委托)？减少事件注册 节省内存。
- es6 常用哪些特性？ 变量最小作用域 es5 function, es6 let 块级。 var 变量提升(Hoisting)。 Map 和 WeakMap 区别。 Symbol generator。
- promise 跟 async/await 关系？ async 方法返回 promise 、是 promise 的语法糖。
- es6 generator？ es6 和 node 的 module 的区别？ fetch、xhr 优劣势
- es6 modules 父子 module 的代码执行顺序、class 内外代码执行顺序
- es6 WeakMap 能解决 jQuery data `$('xx').data()` 的问题.
- ES 与 CommonJS modules 的区别
- 在 es class 中的 箭头函数 比较慢，而且不在 原型链 上  https://medium.com/@charpeni/arrow-functions-in-class-properties-might-not-be-as-great-as-we-think-3b3551c440b1
- es shim、sham 和 polyfill 之间的区别？ https://github.com/es-shims/es5-shim
  - es5-shim 完美模拟了所有 ES5 中可以被完美模拟的方法。就是说 ES5 中有些方法，是可以在旧 JS 引擎中完美模拟了，那么 shim 就完美模拟了它们。shim 不局限与浏览器环境，只要 JavaScript 引擎支持，代码即可运行。
  - es5-sham 只承诺你用的时候代码不会崩溃，至于对应的方法是不是起作用它就不保证了。如果你要用的方法在 shim 中都包含了，那么就不需要 sham。sham 能不引用就不引用。sham 依赖 shim。 IE8：只支持 ES3。

- 内存泄漏场景
  - https://blog.logrocket.com/escape-memory-leaks-javascript/
  - WeakRef 的用处 https://www.reddit.com/r/Frontend/comments/1ato11w/will_the_event_listeners_be_removed_automatically/
*/


/* 进阶

- 浏览器 eventLoop 机制 microtask marcotask 执行顺序？setTimeout 宏队列先执行，promise 微队列。
- http优化：压缩资源、异步加载、预加载、缓存、使用gzip、减少cookie、减少重定向、减少请求数。
- JSONP 的原理以及 cors 怎么设置？跨域的方法有哪些？jsonp、 iframe、window.name、window.postMessage、服务器上设置代理页面。
- SPA 实现方法？产生的问题：切换路由后会把上个路由状态生成的html全部销毁掉，再切回来恢复不到原来的样子。客户端渲染和服务端渲染，哪个快？
- 移动: 点击穿透/300ms延迟？Fastclick。首频渲染、网络性能？手势库？有没有用过RN PWA？
- 数据可视化: 3d 编辑器功能？技术点 svg 3dgis canvas webgl，svg 转 webgl 怎么实现？


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

redux / umi
- 框架的“双向绑定”意思是 view -> state -> view 变化的绑定，而不是 state1 <-> state2 变化的绑定、同样功能的 state 只用定义一个、有多个就会导致 state 变更检测的死循环。
- umi 某个 router 多处复用方案 [umi/1830](https://github.com/umijs/umi/issues/1830)、[umi/4569](https://github.com/umijs/umi/issues/4569)

https://redux.js.org 概念
- 为什么是 企业级前端开发框架？ 实现 双向绑定 的原理？
- 单双向数据流区别？https://pomb.us/build-your-own-react
- data-flow, 不可变的数据更新模式 immutable-update-patterns.
- actions 其实就是 mutations 即 ui 或者 server 的 response. action creator 调用 dispatcher (passive pub-sub systems) 传递 mutations. store 监听 actions 再去 mutate data (只有store能决定怎么更新数据). component 监听 store, 获取需要的数据.

redux 基本流程
- 为什么用单一的 store? 子组件 connect 后可使用 store 了？ context  immerjs
- redux-saga 典型流程:  form 表单提交，触发 FORM_POST action，saga 里 `yield put` POST_SUCCESS 触发 action，改变页面状态或拉取新数据，触发 UI CHANGE 的 action，过程中用 `yield select` 从 state 里选取需要的参数。

[Reactive programming vs Passive programming](https://vaibhavgupta.me/2017/12/31/reactive-programming-vs-passive-programming/)


如何请求多个数据源并渲染？如图 https://img.alicdn.com/imgextra/i4/O1CN0150J8CS26jHFosJFF4_!!6000000007697-2-tps-476-266.png
多个请求并行发起 [redux-saga/issues/1800](https://github.com/redux-saga/redux-saga/issues/1800)、[redux-saga/pull/759](https://github.com/redux-saga/redux-saga/pull/759)、[dva/issues/1009](https://github.com/dvajs/dva/issues/1009)

弹窗 modal 里高度需要设置、内容长时“内滚动”。
一行多列 card 卡片，每个卡片 高度需要设置成一样。
某个操作 触发多次 ajax 请求、再 setState 页面，导致卡顿？
一个页面有多个“富文本实例”同时初始化、比较耗时？导致页面卡顿？
2020 性能和体验
*/


/*
开放问题
- 在项目中的角色？是否“独立”负责/0-1的项目、还是维护修改项目？
- 遇到印象深刻的难题是什么？怎么解决的？（潜力） 开源作品或技术博客？ 最有成就感的技术产出？
- 原工作是否有过因为他的存在而带来不一样的结果？以后三年职业计划？
- 看哪些技术网站？国外网站？最近有学什么新技术（学习能力和专业热情）

笔试套路：写出所有可能解法，也写出最经典解法。
- Google笔试面试
- 聊聊微软面试 https://mp.weixin.qq.com/s/-NESGyGBbF3WakPFieAT0w
- https://github.com/hzfe/awesome-interview
- https://github.com/yifeikong/reverse-interview-zh
- https://github.com/lydiahallie/javascript-questions
- https://h5bp.org/Front-end-Developer-Interview-Questions/translations/chinese/
- https://github.com/MaximAbramchuck/awesome-interview-questions
- 2020 https://github.com/CavsZhouyou/Front-End-Interview-Notebook
- 2019
- https://mp.weixin.qq.com/s/e-IC588SZPJK2QRBm3KuHA
- https://segmentfault.com/a/1190000019496107
- 2018
- https://mp.weixin.qq.com/s?__biz=MjM5MDE0Mjc4MA==&mid=2651011223&idx=2&sn=54acfe1d565f650c52fcea5481ad1195
- https://github.com/markyun/My-blog/tree/master/Front-end-Developer-Questions/Questions-and-Answers
- 2017 https://github.com/jawil/blog/issues/22

笔试题

- 图文卡片，图片上 hover 显示半透明灰色背景、一个 button 在水平垂直居中位置。
- lodash 防抖和节流的 区别和应用场景？ 千位分隔符问题的实现方案？正则
- 检测 浏览器 滚动条停止滚动？ 实现一个弹窗组件？ 设计一个好用强大的图片上传组件？ 面向对象的思维来设计俄罗斯方块？虚拟滚动？
- js decorators 的 polyfill 实现 https://www.sitepoint.com/javascript-decorators-what-they-are/
*/

/*
在函数式编程中，函数实际上即是描述了一种集合到集合的映射关系。即这个函数在入参与结果之间建立了映射关系。在任意时间任意状态调用一个函数，都能获得同样的结果，也就是说它不会被任何可变状态影响、不会产生副作用。如 Redux 中的 compose，常见的函数柯里化，ImmutableJS 等等，都可以视为对于函数式编程范式的一种实现。
*/
// 柯里化 foo(1, 2, 3) curried(1)(2)(3)
// 函数链式调用 sum(1)(2,3)(4,5,6)... val.f1().f2().f3() 嵌套调用 f3(f2(f1(val)))  管道符
// https://zhuanlan.zhihu.com/p/498208169
var curry = fn => judge = (...args) => args.length === fn.length ? fn(...args) : (...arg) => judge(...args, ...arg)
// TC39 数据流编程 Pipe/Flow Pipeline Operator
const compose = (...funcs) => funcs.reduce((a, b) => (...args) => a(b(...args)));

// lodash 常用方法: escape unescape

// 2022-08 lodash get实现
/*
const obj = {
  'a.b.c.d': 'abed',
  'a.d.xx': 'adxx'
  'a.e': 'ae'
}
// 写一个方法，将其转化为
{
  a: { b: { c: { d: 'abcd' } } },
  d: { xx: 'adxx' },
  e: 'ae'
}
*/


// 写一个 repeat 方法，实现执行下面代码后每隔 35 输出 123，总共执行 4 次
const test = repeat((a) => console.log(a), 4, 3000);
test(123);
function repeat(func, times, delay) {
  return function (...args) {
    for (let i = 0; i < times; i++) {
      setTimeout(() => {
        func.apply(null, args);
      }, delay * i);
    }
  }
}

// 排序 返回一个新的数组对象
function orderBy(data, fn) {}
const sortArr = orderBy([{ weight: 10 }, { weight: 3 }, { weight: 2 } ], item => item.weight);

// 实现 Promise.all 或 Promise.race 方法
const PromiseAll = function(promises) {
  let results = [];
  return new Promise((resolve, reject) => {
    promises.forEach((p, index) => {
      p.then((result) => {
        results.push(result);
        if (index === promises.length - 1) {
          resolve(results);
        }
      }).catch((err) => reject(err));
    });
  });
};
const task1 = new Promise(resolve => resolve(1));
const task2 = new Promise(resolve => setTimeout(() => resolve(2), 2000));
promiseAll([task1, task2]).then(results => {
  // 2秒后执行
  // results === [1, 2]
})

// 2011 设计一个异步请求队列
// 实现一个串行请求队列 https://github.com/BetaSu/fe-hunter/issues/6
// 控制并发请求数量
// https://juejin.cn/post/6850418108160147464
// https://juejin.cn/post/6976028030770610213
// https://zhuanlan.zhihu.com/p/349666099
async function asyncPool(poolLimit, array, iteratorFn) {
  const res = [];
  const exec = [];
  for (const item of array) {
    const p = Promise.resolve().then(() => iteratorFn(item, array));
    res.push(p);
    console.log('p1', res, res.length);
    if (poolLimit <= array.length) {
      const e = p.then(() => {
        exec.splice(exec.indexOf(e), 1);
      });
      exec.push(e);
      console.log('e1', exec);
      if (poolLimit <= exec.length) {
        console.log('p2', exec);
        await Promise.race(exec);
      }
    }
  }
  return Promise.all(res);
}
const timeout = t => new Promise(resolve => {
  setTimeout(() => {
    console.log('ttt', t);
    resolve(t);
  }, t);
});
asyncPool(2, [3000, 4000, 5000, 6000], timeout);


// https://github.com/mqyqingfeng/Blog/issues/12
var bind = function(fn, context) {
  var slice = Array.prototype.slice,
    args = slice.call(arguments, 2);
  return function() {
    return fn.apply(context, args.concat(slice.call(arguments)));
  };
};
var handler = function(x, y) {
  console.log(x, y);
};
var argh = bind(handler, undefined, 5, 10);

// debounce 和 throttle 区别 https://github.com/lishengzxc/bblog/issues/7
// debounce 请求时序问题  https://juejin.cn/post/6943877239612276744

// https://remysharp.com/2010/07/21/throttling-function-calls
function debounce(fn, delay) {
  var timer = null;
  return function() {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  };
}

// https://remysharp.com/2010/07/21/throttling-function-calls
function throttle(fn, threshold) {
  threshold = threshold || 200;
  var last, timeout;

  return function() {
    var now = +new Date();
    var args = arguments;
    var trigger = function() {
      last = now;
      fn.apply(this, args);
    }.bind(this);
    if (last && now < last + threshold) {
      // hold on to it
      clearTimeout(timeout);
      timeout = setTimeout(trigger, threshold);
    } else {
      trigger();
    }
  };
}

// 检测 滚动停止
var delayedExec = function(after, fn) {
  var timer;
  return function() {
    timer && clearTimeout(timer);
    timer = setTimeout(fn, after);
  };
};
var scrollStopper = delayedExec(500, function() {
  console.log("stopped it");
});
// document.getElementById('box').addEventListener('scroll', scrollStopper);

// 检验对象是否循环引用
var obj = { foo: { bar: {} } };
obj.foo.bar = obj.foo;
try {
  JSON.stringify(obj);
} catch (e) {
  console.log(e.message);
}

// if的条件为空的判断：`null、undefined、\t\n\f、字符串空值`等几种情形
function isBlank(str) {
  if (str == null) str = "";
  return /^\s*$/.test(str);
}

// 获取一个数字数组中的最大值或最小值
// Math.max(...array)
// Math.max.apply(Math, numbersArr);


/*
2012 阿拉蕾 arale
Widget , UI 组件的抽象类，进行生命周期管理。
jQuery 时代的 UI 管理，做的不够好，一定程度上不能称之为 component 组件管理。
*/
// Widget 抽象类
function Widget () {
  this.ele = null
}
Widget.prototype = {
  on: function (type, handler) {
    if (this.handlers[type] == undefined) {
      this.handlers[type] = []
    }
    this.handlers[type].push(handler)
    return this
  },
  fire: function (type, data) {
    if (Array.isArray(this.handlers[type])) {
      this.handlers[type].forEach(function (handler) {
        handler(data)
      })
    }
  },
  off: function (type) {
    if (type) {
    }
  },
  init: function (config) {
    var def = {};
    this.options = Object.assign(config, def);
  },
  render: function (container) {
    this.renderUI()
    this.handlers = {}
    this.bindUI()
    this.syncUI()
    $(container || document.body).append(this.ele)
  },
  //由子类具体实现 画ui界面
  renderUI: function () {},
  //由子类具体实现 为UI绑定dom事件，及组件的自定义事件
  bindUI: function () {},
  //由子类具体实现 根据config设置ui动态变化的部分，如宽、高、样式名等
  syncUI: function () {},
  destroy: function () {
    this.destructor()
    this.ele.off()
    this.ele.remove()
  },
  //由子类具体实现
  destructor: function () {}
}
Widget.prototype.constructor = Widget

/*
2011 面试题目
- 跨域。 实现继承。 实现 XHR封装。 实现addEvent函数。 实现 getElementsByClassName。
- Ajax readyState 值 0 1 2 3 4 分别表示什么？当 readyState=4 时，一个完整的服务器响应已经收到了，接着，函数会检查HTTP服务器响应的状态值。http状态码含义  304 Not Modified 使用缓存。 4xx: 客户端错误 403 Forbidden。  5xx: 服务器错误。
- IE页面渲染，那个“奇怪”的layout的理解？
- IE6 bug： 双倍 margin bug，如何解决？  DIV浮动IE文本产生3象素的bug。  在IE6中使用透明PNG图片。
- IE6不支持最小宽度（min-width） IE6不支持position:fixed;解决方法。
*/

// 2011-11 杭州胡同笔试
;(function(){
  var _toString = Object.prototype.toString;
  var data = [1,[],{},undefined,NaN,false,null,'true',/\s/,XMLHttpRequest(),Array];
  for(var i in data)
    console.log(typeof data[i]);
    //out?
  for(var i in data)
    console.log(_toString.call(data[i]).replace(/^.*?\s([a-z]+)]$/i,function(n,i1){return i1;}));
    //out?
})()
;(function(){
  var foo = function(i){
      var _that = this,
          _self  = arguments.callee;
            _self.i = i;
            _self._getIti = function(){
                  return i;
    };
            _self._getItii = (function(){
                  var i = _self.i;
                  return (function(){
                              return i;
                        });
    }());
          _that.getIti = _self._getIti;
          _that.getItii = _self._getItii;
  }
  foo.prototype = {
    pgetIti:function(){return foo._getIti();},
    pgetItii:function(){return foo._getItii();}
  }
  var f1 = new foo(1);
        console.log(f1.getIti());//?
  var f2 = new foo(2);
        console.log(f2.getIti());//?
        console.log(f2.getItii());//?
  var f3 = new foo(3);
        console.log(f3.getItii());//?
        console.log(f1.getIti());//?
        console.log(f2.getItii());//?
        console.log(f1.pgetIti());//?
        console.log(f2.pgetItii());//?
        console.log(f3.pgetIti());//?
        console.log(f3.pgetItii());//?
        console.log(f1.pgetItii());//?
    return 'done';
})()
