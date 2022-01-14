
# angular

- [angular](http://angularjs.org/)
- [angular-ui](http://angular-ui.github.io/)
- [angular-strap](http://mgcrea.github.io/angular-strap/)
- 相关： [observe-js](https://github.com/Polymer/observe-js)、[watch.js](https://github.com/melanke/Watch.JS) 、[分析](http://dailyjs.com/2012/11/12/code-review-watch-js/)

## `mv*`
[什么时候需要mv框架](http://coding.smashingmagazine.com/2012/07/27/journey-through-the-javascript-mvc-jungle/)：
- 仅需要与后端api或服务通信的应用，在浏览器端需要繁重的view操作和数据操作。象 gmail 和 Google docs 经常需要切换阅读不同的邮件或文档，做成单页的便不需要频繁建立HTTP链接。
- 一些很复杂的应用，局部的view的渲染，可以嵌入单页mv*应用，会更高效
- 对于大多view在服务器端渲染的应用，只是需要一些js做些富交互性动作，就不需要这些框架了

[MVVM模式介绍](http://knockoutjs.com/documentation/observables.html#mvvm_and_view_models)

- [Is Angular.js or Ember.js the better choice for JavaScript frameworks?](http://www.quora.com/Is-Angular-js-or-Ember-js-the-better-choice-for-JavaScript-frameworks#)
- [Pros and Cons of Facebook's React vs. Web Components (Polymer)](http://programmers.stackexchange.com/questions/225400/pros-and-cons-of-facebooks-react-vs-web-components-polymer)

### react 与 angular 对比
> angular把js放到html里的问题：因为 html 容错性比较好，所以诸如html里的`js变量`定义错误、不小心写错、渲染错误等，不会显式地提示出来，很难排查。特别对于不太熟悉angular的开发同学，对这类错误很容易视而不见。

Angular, Ember and Knockout put “JS” in your HTML. React puts “HTML” in your JS.
例如：ng: `<div style="margin: {{$$showAdvance?'0':'-43px'}} 0 15px 0;">`

双向绑定的坏处：We found that two-way data bindings led to cascading updates, where changing one object led to another object changing, which could also trigger more updates. As applications grew, these cascading updates made it very difficult to predict what would change as the result of one user interaction. When updates can only change data within a single round, the system as a whole becomes more predictable.（出自flux）

- react比angular更简单：AngularJS introduces an explosion of new concepts. In React there are just three important concepts: components with properties and state. Components are just code.
- 组件组合使用起来更简单，angular的directive组合使用比较麻烦。
- 单向绑定比双向绑定更清晰：You can trace a React program from start to finish.
- React components are far more powerful than Angular templates; they should be compared with Angular's directives instead.
- one issue with React is that your logic and your view are tightly knit together.
- Data binding systems are not statically analyzable. (linting  Minification  Type checking)
- angular不能进行服务端渲染：Since server side rendering adds logic into your HTML and AngularJS writes logic in HTML, there is no clear separation of concerns and as a result you get spaghetti code.
