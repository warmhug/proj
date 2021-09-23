
Change logs
---

## 0.4.0
- 为了提升检测准确度，option 对象的 `flags.runs` 由默认值 1 改为 3，并且运行结果根据分数由高到低排序。

## 0.3.1
- 生成 `umi-perf` view 需要传入的数据格式变更，具体参考 readme 文档。

## 0.3.0
- 编程方式支持传入 url 数组，即 `new Anta(string | Array<string>, opts)`，cli 调用方式不变。
    - 第二个参数 opts 对象新增 `runEnv` 字段、可选值为 `'pcChrome' | 'alipayApp'`。
    - json 返回值由原来的`纯对象`，改为`数组包裹对象`、即由 `{ runs: [...] }` 变为 `[{ runs: [...] }, { runs: [...] }...]`，方便统一支持多个 url 的检测结果。
