
## 探索angular与seajs的结合

### 见`./standalone`目录：
利用spm3提供的 `spm build --include standalone` 命令，把组件生成为standalone版本，这样能在页面中直接用`<script src="xx.js"></script>`同步引入js。这样页面中就可以正常的自动启动应用。

但瑕疵之处是什么：

- 组件源码的编写要遵循commonJS规范，即要有`require('parent');` `module.exports = son;`(见./son/index.js)，但这些对angular应用来说几乎是没什么用的。
- 对于spm工具的利用率较低：`spm doc watch`、`spm test` 都不能用，(它们不支持standalone版本) 


### 见`./_seajs`目录：

> 说明：`alert`模块(spm3模块)，依赖`modal`模块(modal模块未发布到spm源，spm install不起作用，package.json中也未标出)，见`alert/dist/alert/alert/1.0.0/index-debug.js` 里打包了modal模块。另外为做演示，`alert/dist`目录下放了modal模块的1.0.1版本。注意：文件放置不规范，仅作演示用。

把组件转换为正常的spm模块(defined包装)、并在页面引入seajs库的方式，总结如下：

- 首先，angular能与加载器结合！因为：seajs等加载器更多表现在是对需要的js模块文件是否加载、异步加载顺序等方面的控制；而angular的module主要是代码全部加载后运行时的module分块，这两者没有冲突。

但是，结合后会带来一个明显的成本与麻烦：必须用`angular.bootstrap(document, ['myApp']);`之类方法 **手动启动应用**，具体见[demo.html](_seajs/demo.html)示例、以及官方的[angular-seed的异步版本示例](https://github.com/angular/angular-seed/blob/master/app/index-async.html)。

#### 那么手动启动的优缺点是什么？解释如下：

> 采用`angular.bootstrap()`方法进行局部“手动启动”。示例代码见 [manual-bootstrap](../angular-study/bootstrap-app/manual-bootstrap.html)、[manual-bootstrap1](../angular-study/bootstrap-app/manual-bootstrap1.html)。

对比可发现，对于“并列的互不嵌套的dom片段”(manual-bootstrap.html)，分别手动启动不会有问题。 **但对于“嵌套的dom结构”(manual-bootstrap1.html)，手动启动同样会有冲突的问题，** 而这种问题，在我们这边的业务类型中可预料到还是比较常见的。

缺点：

- 要自己写`angular.bootstrap()`，比较麻烦！
- 嵌套的app的冲突问题，比较严重、发生的可能性大！

优点：

- 可以异步资源文件，可以利用各种加载器。
- 象传统组件一样、能让不同版本的组件共存在同一页面，(这点很好的解决了angular自动启动产生的一个缺陷)

以下给出一个新的解决方案：

- [ng-appx](../shim/ng-appx) 
    - 封装`angular.bootstrap()`，解除`ng-app`的一些限制


