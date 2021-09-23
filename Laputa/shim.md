
# shim

## 说明，为什么做shim？

shim中包含不少功能，这些都有没有用、是不是多余？-- 可以说有用，也可以说没用。

这个shim，是针对 **我们的普遍后台业务类型** 的需求而做的，是为了防止我们这类业务中一些很可能出现的错误。在我们的业务类型中 当你碰到：

- **前后台交互乱码问题、**
- **页面中来自不同系统的模块的冲突问题、**
- **因为angular写法约束导致的困难**

等等，你可以试试这个 shim 文件，它可能帮到你。

所以说，如果你是做很纯粹的“前端单页webapp”，那你可能不是很需要它，但看看它你可能会得到一点新的启发。


## shim线上地址：

[laputa-shim.js](https://a.alipayobjects.com/laputa/shim/laputa-shim-1.0.0.js)、
[laputa-shim.min.js](https://a.alipayobjects.com/laputa/shim/laputa-shim-1.0.0.min.js)

## shim.js 包含功能及示例
### 常用provider的统一配置
[示例](config/config.html)、
[config.js](config/config.js)

### [ng-appx](./ng-appx)扩展ng-app
[ng-app示例](ng-appx/ng-app.html)、
[ng-appx示例](ng-appx/ng-appx.html)、
[ng-appx.js](ng-appx/ng-appx.js)

### angular.module 函数增强
[示例](angular.module/angular.module-enhance.html)、
[angular.module.js](angular.module/angular.module.js)

以上三块，被合并到统一的文件`laputa-shim.js`中。


------

## angular-combine文件
### 线上地址：
[angular-combine.js](https://a.alipayobjects.com/laputa/angularjs/angular-combine-1.0.0.js)、
[angular-combine.min.js](https://a.alipayobjects.com/laputa/angularjs/angular-combine-1.0.0.min.js)

### [介绍](http://gitlab.xx.com/ap/laputa/tree/master/misc/shim/combine)
[animate示例](combine/animate.html)、
[sanitize示例](combine/sanitize.html)



