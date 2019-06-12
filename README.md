# web api

## rest

- [介绍-入门](http://www.cnblogs.com/artech/p/restful-web-api-02.html)
- [RESTful API 设计指南](http://www.ruanyifeng.com/blog/2014/05/restful_api.html)
- [理解本真的REST架构风格](http://www.infoq.com/cn/articles/understanding-restful-style)、[如何设计好的RESTful API？](http://www.infoq.com/cn/articles/how-to-design-a-good-restful-api)
- [hateoas](http://timelessrepo.com/haters-gonna-hateoas)
- [RESTful API的十个最佳实践](http://www.cnblogs.com/xiaoyaojian/p/4612503.html)
- [最佳实践](http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api)
- [Google/Facebook/GitHub等设计对比](http://blog.octo.com/en/design-a-rest-api/)
- [jsonapi](http://jsonapi.org/format/) - [jsonapi中文](http://jsonapi.org.cn/format/)

[来自于PayPal的RESTful API标准](https://segmentfault.com/a/1190000005924733) /
[Microsoft/api-guidelines](https://github.com/Microsoft/api-guidelines/blob/master/Guidelines.md)

[What does “state transfer” in Representational State Transfer (REST) refer to?](https://stackoverflow.com/questions/4603653/what-does-state-transfer-in-representational-state-transfer-rest-refer-to)

通过 url 来设计系统的结构。根据 REST，每个 url 都代表一个 resource，而整个系统就是由这些 resource 组成的。因此，如果 url 是设计良好的，那么系统的结构就也应该是设计良好的。REST 允许我们通过 url 设计系统，就像 Test Driven Development 允许我们使用 testcase 设计 class 接口一样。使用 REST 的关键是如何抽象资源，抽象得越精确，对 REST 的应用就越好。

- 使用名词而不是动词，使用名词的复数形式。（一些非CRUD操作如login/logout，可以用动词，方便理解）
- Get方法和查询参数不应该改变资源状态。GET PUT和DELETE方法是幂等方法。
- 假如资源连接到其它资源，则使用子资源形式`GET /cars/711/drivers/4`，但cars和drivers可以是并列的资源。
- 有一种url形式，它对应到程序中的继承关系：`/products/books`，也可以`/books`单独作为顶层接口。
- 为集合提供过滤、排序、字段选择以及分页
  - 过滤：为所有字段或者查询语句提供独立的查询参数：`GET /cars?color=red Returns a list of red cars`
  - 排序：允许跨越多字段的正序或者倒序排列：`GET /cars?sort=-manufactorer,+model`
  - 字段选择：一些情况下，我们只需要在列表中查询几个有标识意义的字段，我们不需要从服务端把所有字段的值都请求出来，所以需要支持API选择查询字段的能力，这也可以提到网络传输性能和速度：`GET /cars?fields=manufacturer,model,id,color`
  - 使用offset和limit来获取固定数量的资源结果，当其中一个参数没有出现时，应该提供各自的默认值，比如默认取第一页，或者默认取20条数据：`GET /cars?offset=10&limit=5 取第三页的5条数据`
  - 使用自定义的头X-Total-Count发回给调用段实际的资源数量。
- 使用HTTP状态码处理错误
  - 200 – OK – 一切正常
  - 201 – OK – 新资源已经被创建
  - 204 – OK – 资源删除成功
  - 304 – 没有变化，客户端可以使用缓存数据
  - 400 – Bad Request – 调用不合法，确切的错误应该在error payload中描述，例如：“JSON 不合法 ”
  - 401 – 未认证，调用需要用户通过认证
  - 403 – 不允许的，服务端正常解析和请求，但是调用被回绝或者不被允许
  - 404 – 未找到，指定的资源不存在
  - 422 – 不可指定的请求体 – 只有服务器不能处理实体时使用，比如图像不能被格式化，或者重要字段丢失。
  - 500 – Internal Server Error – 标准服务端错误，API开发人员应该尽量避开这种错误

- 无状态通信（Stateless）：通信的会话状态（Session State）应该全部由客户端负责维护。应该注意区别应用的状态和连接协议的状态。HTTP连接是无状态的（也就是不记录每个连接的信息），而REST传输会包含应用的所有状态信息。通讯本身的无状态性可以让不同的服务器的处理一系列请求中的不同请求，提高服务器的扩展性。
- 充分利用好HTTP缓存是RESTful API可伸缩性的根本。HTTP协议是一个分层的架构，从两端的user agent到origin server之间，可以插入很多中间组件。而在整个HTTP通信链条的很多位置，都可以设置缓存。HTTP协议内建有很好的缓存机制，可以分成过期模型和验证模型两套缓存机制。

根据[richardson模型](http://martinfowler.com/articles/richardsonMaturityModel.html), REST架构的成熟度有3个等级:

- Level 0 POX (这个就不算REST了)
- Level 1 Resources:  解决了Level 0 接口的问题, 使得各种资源有了自己相应的URI,虽然仍然是POX的交互方式, 但是每一个接口都更加紧凑和内聚, 相应的容易维护起来.
- Level 2 Http verbs:  这一级别使用http verbs来对各种资源进行crud操作, 使得应用程序的接口更加的统一, 语义更加明确.
- Level 3 Hypermedia Controls:
  - RESTful的架构本意是"在符合架构原理的前提下，理解和评估以网络为基础的应用软件的架构设计，得到一个功能强、性能好、适宜通信的架构。" 这个世界上规模最大的, 耦合度最低, 最稳定的, 性能最好的分布式网络应用是什么? 就是WEB本身. 规模,稳定,性能都不用说了. 为什么说耦合度低呢? 想一想每个人上网的经历, 你几乎不需要任何培训就可以上一个新的网络购物平台挑选商品,用信用卡付款,邮寄到自己家里.把网站的程序想像成一个状态机, 用户在一系列状态转换中完成自己的目标. 这中间的每一步, 应用程序都告诉你当前的状态和可能的下一步操作, 最终引导用户从挑选商品,挑选更多商品,到支付页面,到输入信用卡信息,最终完成付费,到达状态机的终点.这种 service discoverablility 和 self-documenting 就是 level 3 想解决的问题 在这里面, 告诉用户当前状态以及各种下一步操作的东西, 比如链接, 按钮等等, 就是Hypermedia Controls. Hypermedia Controls 就是这个状态机的引擎. Level 3 的REST架构就是希望能够统一这一类的 Hypermedia Controls, 赋予他们标准的, 高度可扩展的标准语义及表现形式, 使得甚至无人工干预的机器与机器间的通用交互协议边的可能. 比如你可以告诉一个通用的购物客户端, "给我买个最便宜的xbox", 客户端自动连上google进行搜索, 自动在前10个购物网站进行搜索, 进行价格排序, 然后自动挑选最便宜的网站, 进行一系列操作最终完成用信用卡付费, 填写个人收件地址然后邮寄. 这些都依赖于Hypermedia Controls带来的这种 service discoverablility 和 self-documenting。

资源、子资源、相关资源，都能通过「links」关联，达到从一个资源找到相关资源(links列出URL)，或者直接 embedded 相关资源。

### 业务实例

> 其他：[github](http://api.github.com/)、[instagram](https://instagram.com/developer/)、
[白宫API规范](https://github.com/WhiteHouse/api-standards)
> [React.js and Spring Data REST: Part 1 - Basic Features](https://spring.io/blog/2015/09/01/react-js-and-spring-data-rest-part-1-basic-features)、[React.js and Spring Data REST: Part 2 - Hypermedia](http://spring.io/blog/2015/09/15/react-js-and-spring-data-rest-part-2-hypermedia)，包含_links、_embedded、Paging、Sorting 很完善的rest库。

具体到业务中的表现就是“embedded resources”，代码中的实现方式是在一些标记@RestResource注解的bean中(model)的一些属性上加入@Relation注解(自定义的注解)，并设置相应的loader用来加载相关资源，然后写具体的loader来实现功能。

目前只在业务中的一部分实现了这个功能，前端能通过拼接参数获得关联资源(也能exclude掉不需要的数据字段)，实例如`http://xx?e=xx&_xfields=title&_embedded=category,category.types,type,rank,status`，通过改变`_xfields / _embedded`会得到不同结果，其实这样已经带来了不少便利。当然如果像github-API一样把关联资源子资源等的link-uri的给出，那么也就产生了在线API文档，少了些找文档的问题。

如果不用这样的@Relation注解实现、Java怎么处理这个问题呢？一般是要设置不少`多余的`model，如父子资源各有一个model，当需要一起用的时候，又要设置新的合并起来的model。或者会形成很多map数据结构的层层嵌套，导致代码耦合难以阅读。

------

## graphql / falcor / swagger 

- [Apollo Data Stack](http://docs.apollostack.com/)
- [How to build a GraphQL server](https://medium.com/apollo-stack/tutorial-building-a-graphql-server-cddaa023c035#.gdvn0fb8v)
- [Swagger 及 API 管理](https://www.linkedin.com/pulse/swagger-%E5%8F%8A-api-%E7%AE%A1%E7%90%86%E7%AE%80%E4%BB%8B-minglei-tu)

### [Falcor](http://netflix.github.io/falcor/)

不同于传统REST API，它只提供唯一的一个端点。有了它，开发者不再需要向不同的服务器端点请求不同的数据，而是向同一个端点请求不同的模型数据。服务器端可以识别请求参数，并由Falcor Router调用恰当的router函数。也就是说，Falcor提供了一个更加直观的API，就是开发者的数据模型。这可以确保服务器永远不会返回不必要的模型数据，节省了带宽。Falcor客户端还可以使用缓存数据为连续的请求提供服务，减少服务器响应时间。

- [Demand driven architecture（CQRS/Falcor）](http://www.javacodegeeks.com/2015/10/transcending-rest-and-rpc.html)
- rpc优却点：低延迟，数据量小；不可缓存(手动管理)，紧耦合
- rest优却点：可缓存，松耦合；高延迟，数据量大
- 两者结合:
  - one model everywhere
  - The data is the API
- You can convert any JSON object into a JSON Graph in two steps:
  - Move all objects to a unique location within the JSON object
  - Replace all other occurrences of the object with a Reference to that object’s unique location

- 他希望编写优雅、易读的代码。在用户界面上查找和修改数据要直观，最好是开发者只需要考虑自己的数据模型，而不用关心可用的API端点。
- 他希望可以消除由传统REST API所导致的不必要的请求和响应开销。
- 他还希望用一种更好的方法取代难以维护和改进的传统REST API。

### [GraphQL](https://github.com/facebook/graphql)

GraphQL is Facebook's [graph API](https://developers.facebook.com/docs/graph-api)
（[How to get lots of data from the Facebook Graph API with just one request - Optimizing request queries to the Facebook Graph API](https://www.sammyk.me/optimizing-request-queries-to-the-facebook-graph-api)）。
[基于 GraphQL 的产品](https://www.reindex.io/)。

- [GraphQL - The Good and the Bad](https://scotch.io/tutorials/graphql-the-good-and-the-bad)
- [GraphQL is the King. Long Live the King!](https://medium.com/@scbarrus/graphql-is-the-king-long-live-the-king-r-i-p-rest-cf04ce38f6c#.avmpteg2j)
- [Introducing Relay and GraphQL译](http://segmentfault.com/a/1190000002570887)
- [文档](http://graphql.org/docs/getting-started/) / [graphql-js](https://github.com/graphql/graphql-js)
- [From REST to GraphQL](https://blog.jacobwgillespie.com/from-rest-to-graphql-b4e95e94c26b#.e3re515s5)
- [From REST to GraphQL-](https://news.ycombinator.com/item?id=10365555)

GraphQL is essentially the one [API Gateway](http://microservices.io/patterns/apigateway.html) to rule them all. And then you add Relay on top of it to build up the exact query you want.

- GraphQL Returns Only the Data You Request. 请求什么返回什么
- GraphQL Returns Data in the Same Shape You Requested It. 返回的数据结构和请求结构一致
- GraphQL Sends a Single Request to the API and Returns a Single Response. 把同时发出的多个请求合并为一个，返回一个请求结果集合，并自动拆分到不同的组件里
