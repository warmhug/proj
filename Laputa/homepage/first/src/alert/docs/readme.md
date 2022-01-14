### alert组件

#### API列表：

|  名称    |  类型  |  默认值 |  描述 |
| -------- | -------- | ------ | ------ |
| animation | string |  am-fade |  通过ngAnimate应用CSS动画 |
| title  |  string |  ""  |  
| content | string |  ""  |
| type | string | "info" |
| container | string/false | false | 象 container: 'body' |
| template | path | false | 如果提供，覆盖掉默认模板，可为远程url或缓存的template id |
| placement  | string  | ""  |  怎么放置alert -top、top-left、top-right |
| duration | number/false | false | 需要显示的时间长度，以秒计 |
| keyboard | boolean | true | 当按下escape键关闭alert |
| show | boolean | true | 当实例化后默认显示alert |