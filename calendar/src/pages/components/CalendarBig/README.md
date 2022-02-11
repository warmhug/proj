## 日历组件

参考钉钉日历 @李政甫(一途) 提供的 demo https://unpkg.alixxx.com/@ali/calendar-x-viewer@2.0.0/build/index.html

基于 https://github.com/jquense/react-big-calendar 底层组件创建。

### 点击创建的弹窗

拷贝钉钉日历 `calendar-mono/packages/calendar-viewer/src/components/CalendarPopoverFixed` 文件。

用法参考 `calendar-mono/packages/calendar-viewer/src/components/CalendarViewer/index.tsx`
搜索 目录名和 `createDraftEvent` 

### 改变 events 顺序

为了方便点击创建事项，需要把自定义的 draft-event 显示到其他事项前边，调试 react-big-calendar.esm.js 发现
6223 行 `new DateLocalizer` 和 6154 行 `sortEvents`。需要自定义`sortEvents`，拷贝 react-big-calendar/src/localizers/moment.js 的代码到业务里、命名为 moment-localizer.js 并修改其中的`sortEvents`函数、新增以下代码

```js
let statusSort = 0
if (aStart._isCustom && !bStart._isCustom) {
  statusSort = -1
} else if (!aStart._isCustom && bStart._isCustom) {
  statusSort = 1
}
```

同时在生成 draft event 时，需要对其 start 属性做自定义的`_isCustom`标记扩展

```js
Object.defineProperties(start, {
  "_isCustom": { get: function () { return true; } },
});
```

另附社区其他解法 https://github.com/jquense/react-big-calendar/issues/838#issuecomment-417783468

