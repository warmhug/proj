
------ 低代码 2021

低代码平台：源码不可维护 git diff 不起作用。

物料(模板、页面、区块、基础组件、业务组件、布局组件)

区块（Block）：一系列业务组件、布局组件等组合而成的代码片段，不对外提供可配置的属性；区块内部具备完整的内部样式、事件、生命周期管理、状态管理、数据流转机制，能独立存在和运行，通过代码片段的复制实现跨页面、跨应用的快速复用，保障功能和数据的正常。
模板（Template）：特定垂直业务领域内的业务组件、区块可组合为单个页面，或者是再配合路由组合为多个页面集，统称为模板。

Microsoft Power Apps 中，页面的生产过程是由字段的布局来决定的，字段对应的组件可以切换。在 Mendix、OutSystems 中。页面虽然是基于模型来生产的，但整体开发体验，依然是面向页面和组件视角的。组件可以绑定字段。
从前端对低代码提效本质的分析来看，可视化搭建本质上是通过可视化手段降低了前端开发的上手门槛，但开发思路和源码开发基本是一样的。其提高开发效率的主要手段是，通过丰富的静态模板让页面开发少写一些代码。没有元数据的支持，其对开发效率的提升至多是线性的，而我们需要的是数量级的提升。
由于模型元数据驱动和可视化搭建在本质思路上的不同，在可视化搭建基础上，集成模型驱动的能力，会让整个产品的复杂性增加，产品定位不清晰，扩展性差。与其这样，不如从0开始打造一个纯净的模型驱动低代码开发工具。

[阿里低代码引擎LowCodeEngine正式开源](https://mp.weixin.qq.com/s/rQ-X9OBFRvhI16KrWwIT6w)
[官网](https://lowcode-engine.cn/)、[github](https://github.com/alibaba/lowcode-engine)

[总体](https://img.alicdn.com/imgextra/i4/O1CN01z4bl431OOoSsB0Fgl_!!6000000001696-0-tps-2647-1048.jpg)

[引擎图](https://img.alicdn.com/imgextra/i1/O1CN01rYYbMH1KKSEUlOB3B_!!6000000001145-2-tps-1196-736.png):
- 入料引擎（Materialin Engine）Material for Schema [架构图](https://img.alicdn.com/imgextra/i3/O1CN01ySybed1u7TAlCEmgI_!!6000000005990-2-tps-1698-467.png)
- 编排引擎（Choreography Engine）Schema to Schema [架构图](https://img.alicdn.com/imgextra/i1/O1CN01BV9MmX26om0c3PECA_!!6000000007709-2-tps-1542-829.png)
- 渲染引擎（Rendering Engine）Schema to UI [架构图](https://img.alicdn.com/imgextra/i3/O1CN01u0oISH1tUXVQ8V8Wu_!!6000000005905-2-tps-1834-536.png)
- 出码引擎（Codeout Engine）Schema to Code [架构图](https://img.alicdn.com/imgextra/i1/O1CN01rvvk6H1X433D49JOc_!!6000000002869-2-tps-1382-690.png)。

schema 基础协议规范

```js
{
  "version": "1.0.0",      //当前协议版本号
  "componentsMap": [{      //组件描述
    "componentName": "Button",
    "package": "alife/next",
    "version": "1.0.0",
    "destructuring": true,
    "exportName": "Select",
    "subName": "Button",
  }],
  "componentsTree": [{
    "componentName": "Page",   //单个页面。枚举类型 Page|Block|Component
    "fileName": "Page1",
    "meta": {          //页面元信息
      "title": "首页",    //页面标题描述
      "router": "/",     //页面路由
      "spmb": "abef21",  //spm B位
    },
    "props": {},
    "defaultProps": {   // 默认props：  选填 仅用于定义低代码业务组件的默认属性 固定对象
      "name": "xxx"
    },
    "css": "body {font-size: 12px;} .table { width: 100px;}",
    "state": {                       // 初始state： 选填 对象类型/变量表达式
      "btnText": "submit",                     // 默认数据值： 选填 变量表达式
      "num": 8,
    },
    "lifeCycles": {                   //生命周期:          选填 对象类型
      "didMount": {
        "type": "JSExpression",
        "value": "function() {        //生命周期方法：      选填 函数类型\
            console.log('did mount');\
        }",
      },
      "willUnmount": {
        "type": "JSExpression",
        "value": "function() {\
          console.log('will unmount');\
        }"
      }
    },
    "methods": {                     // 自定义方法对象：     选填 对象类型
      "getNum": {
        "type": "JSExpression",
        "value": "function(a, b){\
                return a + b;\
              }"
      }
    },
    "dataSource": {                  // 数据源对象：选填  对象类型
      "list": [{                          // 数据请求列表    必填  数组类型
        "id": "list",                // 单个数据请求id标识    必填  字符串类型
        "isInit": true,              // 是否为初始数据             必填     布尔类型/变量表达式
        // 建议改个名字，比如 auto | loadOnInit
        "type": "fetch/mtop/jsonp",  //请求类型   必填    字符串类型
        "options": {                //请求类型对应参数  必填  对象类型
          "uri": "",                      //请求地址        必填  字符串/变量表达式
          "params": {},                //请求参数       选填   字符串/变量表达式
          "method": "GET",             //请求方法              必填   字符串/变量表达式
          "isCors": true,              //是否支持跨域,   对应credentials = 'include'     选填  布尔
          "timeout": 5000,             //超时时间单位ms     选填   数字类型 单位ms
          "headers": {}                //请求header参数  选填   请求头信息
        },
        "dataHandler": { //异步请求回调： 选填  函数类型
          "type": "JSExpression",
          "value": "function(data, err) {} "
        }
      }],
      "dataHandler": {  // 所有初始异步数据接口执行完成后的回调   选填 函数类型
        "type": "JSExpression",
        "value": "function(dataMap) { }",
      }
    },
    "children": [{
      "componentName": "Button",
      "props": {
        "text": {
          "type": "JSExpression",
          "value": "getNum(state.num, state.num2) + '万'"
        }
      },
      "condition": {
        "type": "JSExpression",
        "value": "state.num > state.num2"
      }
    },{
      "componentName": "Div",
      "props": {
        "className": "",
        "text": {
          "type": "JSExpression",
          "value": "i18n['i18n-jwg27yo4']"
        }
      },
      "condition": {                     // 函数类型属性：选填 函数类型
        "type": "JSExpression",
        "value": "!!this.state.isshow",  // 渲染条件： 选填 根据表达式结果判断是否渲染物料 默认值true
      },
      "loop": [],                        // 循环渲染数据：选填 根据数据循环渲染物料 默认不进行循环渲染；
      "loopArgs": ["item", "index"],     // 循环迭代对象、索引名称 选填
      "children": [{
        "componentName": "Button",
        "props": {
          "prop1": 1234, // 简单 json 数据
          "prop2": [{   // 简单 json 数据
            "label": "选项1",
            "value": 1
          }],
          "prop3": [{
            "name": "myName",
            "rule": {
              "type": "JSExpression",
              "value": "/\w+/i"
            }
          }],
          "valueBind": { // 变量绑定
            "type": "JSExpression",
            "value": "this.state.user.name"
          },
          "onClick": { // 动作绑定
            "type": "JSExpression",
            "value": "function(e) { console.log(e.target.innerText) }",
          },
          "onClick2": { // 动作绑定2
            "type": "JSExpression",
            "value": "this.submit",
          },
        },
      }]
    }],
  }],
  "utils": [{
    "name": "clone",
    "type": "npm",
    "content": {
      "package": "lodash",
      "version": "0.0.1",
      "exportName": "clone",
      "subName": "",
      "destructuring": false,
      "main": "/lib/clone"
    }
  }, {
    "name": "beforeRequestHandler",
    "type": "function",
    "content": {
      "type": "JSFunction",
      "value": "function(){\n ... \n}"
    }
  }],
  "constants": {
    "ENV": "prod",
    "DOMAIN": "xxx.alibab.com"
  },
  "config": {  //当前应用配置信息
    "sdkVersion": "1.0.3",  //渲染模块版本
    "historyMode": "hash",  // 浏览器路由：brower  哈希路由：hash
    "targetRootID": "J_Container",
    "layout": {
      "componentName": "BasicLayout",
      "props": {
      	"logo": "...",
        "name": "测试网站"
      },
    },
    "theme": {
      "package": "@alife/theme-fusion",
      "version": "^0.1.0",
      "primary": "#ff9966"
    }
  },
  "i18n": {
    "zh-CN": {
      "i18n-jwg27yo4": "你好",
    },
    "en-US": {
      "i18n-jwg27yo4": "Hello",
    }
  }
}
```

区块级API（实现区块级内部的上下文，数据流，状态管理）

```js
this.state
this.setState()
this.dataSourceMap[oneRequest.id]: {
  load(params), status, data, error
}
this.reloadDataSource()
this.xxx()
```

页面级api（实现页面级内部的上下文，数据流，状态管理，从而实现区块之间的通信）

```js
this.page
this.page.state
this.page.setState()
this.page.props
this.page.xxx()
this.page.dataSourceMap
this.page.reloadDataSource()
```

低代码业务组件 API (开发一个低代码业务组件需要用到的API，实现内部的上下文，数据流，状态管理)

```js
this.component
this.component.state
this.component.setState()
this.component.props
this.component.xxx()
this.component.dataSourceMap
this.component.reloadDataSource()
```

获取循环数据对象 api (获取在循环场景下的数据对象)

```js
this.item
this.index
```
