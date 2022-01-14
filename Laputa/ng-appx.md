
参考：[ng-non-bindable](http://stackoverflow.com/questions/18184617/angularjs-how-to-nest-applications-within-an-angular-app)


## ng-appx
> 核心是利用`angular.bootstrap()`(此代码被封装起来)手动启动应用，发扬手动启动的优点。

### 代码内幕：
1. 先检查页面中有没有官方的`ng-app`指令
    - 有的话：
        - 默认对`ng-app`指令做便捷的hack处理，处理方式查看下述介绍
        - 如果设置`laputa.shim.hackNgApp = false`则直接退出不做任何处理
    - 没的话，直接进入第二步
2. 检查页面中`ng-appx`标记，如果有多个，按dom结构层级分组排列
    - 并列的元素，分别启动
    - 非并列、并有父子关系的元素，在父元素上启动，子元素module被合并到父元素上

demo示例见 [./ng-appx.html](./ng-appx.html)

### 默认对 ng-app 做hack处理：
> 核心利用 window.name = "NG_DEFER_BOOTSTRAP!" 终断元素的启动
#### 处理后：
- 允许页面写多个 ng-app，但只有dom树上 “第一个出现的带有ng-app启动标记的元素” 会起作用、成为启动元素。
    - 启动元素的“子元素”上若再有“ng-app”启动标记，其module会被合并到启动元素module上
- 启动元素的兄弟元素，不会起作用，给出了console.log提示；其他按照angular原本的静默失败处理方式


### 新增`ng-appx`指令是`ng-app`指令的扩展版，扩展的表现为：
- 允许一个页面有多个`ng-appx`
- 允许互相嵌套

（注:`ng-app`原本都是不允许这么做的）。

#### 解决的问题：
- 能象传统组件一样、让不同版本的组件共存在同一页面

