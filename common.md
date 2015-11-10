

# 架构

baas-中台：

- 对业务开发团队来说，他们的开发能力更专注前端，交互，需要掌握的技术栈里就只需要javascript和Restful API就够了，他们可以跟专注去理解业务模型和逻辑，快速构建业务系统，进行业务创新。
- 而对于后端团队，将跟专注做平台和服务，后者需要他们将J2EE时代的开发架构，比如MVC， RPC等架构向向微服务，EDA，CQRS等云时代的架构升级，更好的将系统复杂性解构，利用服务化来构建满足业务团队的需要。

soa是Service-Oriented Architecture的首字母简称，面向服务架构。开发人员很容易理解为是一个Web Service，但是这绝对不是SOA，那顶多只能算是SOA的一种实现方法。

面向接口编程：业务中写接口/实现

[stateless-authentication-for-microservices](http://www.slideshare.net/alvarosanchezmariscal/stateless-authentication-for-microservices)、
[user-authentication-with-jwt](http://blog.leapoahead.com/2015/09/07/user-authentication-with-jwt/)

### rpc & rest
- rpc优却点：低延迟，数据量小；不可缓存(手动管理)，紧耦合
- rest优却点：可缓存，松耦合；高延迟，数据量大

两者结合:

- one model everywhere
- The data is the API

再说说WebService和soap，WebService也是微软重头宣传的技术之一，但是微软喜欢封装，所以采用了SOAP方式实现WebService，这又是一个过重的协议，又证明了微软没有高并发高性能程序设计经验。独霸Web的LAMP平台，也使用了WebService，但是人家没有采用soap，而是采用xml-rpc, json-rpc，还有Restful webserivice，这些都比微软的soap webservice轻量级，而且更简单。
至于后来的wcf, wpf, wf，那更是直接把微软送入了地狱。

B/S架构：无需安装、跨平台，像web项目。基于统一的应用层协议HTTP来交互数据，HTTP是无状态的短连接通信方式。C/S架构：本地安装、不跨平台，像QQ等客户端程序。采用长连接的交互模式。

### 设计
- bean 普通的java bean 可以包含业务逻辑代码！
- entity 实体bean ，一般是用于ORM 对象关系映射 ，一个实体映射成一张表，一般无业务逻辑代码！
- POJO全称是Plain Ordinary Java Object / Plain Old Java Object，中文可以翻译成：普通Java类，具有一部分getter/setter方法的那种类就可以称作POJO，很显然POJO也是JavaBean的一种。一般在web应用程序中建立一个数据库的映射对象时，我们只能称它为POJO。

- DAL(数据访问层)、IDAL(接口层)、BLL(业务逻辑层)
- PO(Persisent Object)持久对象，和VO一样都是由一组属性和属性的 get 和 set 方法组成。PO 的属性是跟数据库表的字段一一对应的。PO 对象需要实现序列化接口。
- VO(value object)值对象，通常用于业务层之间的数据传递，和 PO 一样也是仅仅包含数据而已。但应是抽象出的业务对象 ,可以和表对应 ,也可以不 ,这根据业务的需要。
- DAO(data access object) 数据访问对象，它负持久层的操作，为业务层提供接口。此对象用于访问数据库。通常和 PO 结合使用， DAO 中包含了各种数据库的操作方法。通过它的方法 , 结合 PO 对数据库进行相关的操作。
- DTO(Data Transfer Object) 数据传输对象，主要用于远程调用等需要大量传输对象的地方。
比如我们一张表有 100 个字段，那么对应的 PO 就有 100 个属性。
但是我们界面上只要显示 10 个字段，客户端用 WEB service 来获取数据，没有必要把整个 PO 对象传递到客户端，这时我们就可以用只有这 10 个属性的 DTO 来传递结果到客户端，这样也不会暴露服务端表结构 . 到达客户端以后，如果用这个对象来对应界面显示，那此时它的身份就转为 VO。
- BO(business object) 业务对象，从业务模型的角度看 , 见 UML 元件领域模型中的领域对象。封装业务逻辑的 java 对象 , 通过调用 DAO 方法 , 结合 PO,VO 进行业务操作。主要作用是把业务逻辑封装为一个对象。这个对象可以包括一个或多个其它的对象。比如一个简历，有教育经历、工作经历、社会关系等等。我们可以把教育经历对应一个 PO ，工作经历对应一个 PO ，社会关系对应一个 PO 。建立一个对应简历的 BO 对象处理简历，每个 BO 包含这些 PO 。这样处理业务逻辑时，我们就可以针对 BO去处理。


### 服务器
通常一个Web服务站点的后端服务器不是将Java的应用服务器直接暴露给服务访问者，而是在应用服务器（如Jboss）的前面再加一个Web服务器（如Apache或Nginx），可以做日志分析、负载均衡、权限控制、防止恶意请求以及静态资源预加载等。

Tomcat中的设计模式：模板模式；工厂模式；单例模式；门面设计模式；观察者模式；命令模式；责任链模式。



# 云计算
个人觉得云计算最大的好处是“高可扩展性/可伸缩性”，而“性能”和“高可用性”不一定是最好的。。传统系统中，工程师最基本的能力也要让系统能做到“水平扩展”，即通过加机器能应对流量暴涨，但也要尽量节约机器成本。

性能和扩展性

- 什么是性能问题？ 如果你的系统对于一个用户访问还很慢，那就是性能问题；
- 什么是扩展性问题？ 如果你的系统对一个用户来说是快的，但是在用户不断增长的高访问量下就慢了。

MapReduce 是一种分布式的程序设计模型，专门用来在集群里处理大量的数据。主要由两部分组成：mapper和reducer。mapper读取一部分数据，运算后输出成一系列的中间（intermediate）数据；而reducer将mapper的输出数据查核、合并，产生最后输出。

许多语言都可以实现MapReduce，所以有很多不同的实现版本，除了Google自己的版本，还有许多开源的版本，例如Hadoop、GridGain等，最常被使用的就是Hadoop。Hadoop是以Java实现的，但是可以支持许多其他语言写成的mapper和reducer。

Hadoop 是设计用来处理大量数据和运算的，所以如果只有少量数据时，就会比关系型数据库还要慢了。

采用虚拟化技术可降低Linux使用硬件的成本，虚拟化技术有：VMWare / KVM / XEN / Microsoft Hyper-V 。 如 CPU16核/内存24G/硬盘300G 的Linux服务器，可以“一虚三”、即虚拟出三个虚拟机来。

## 大数据
应用场景：业务报表、商圈聚类、消费预测、BI

### 问题
- 关系型数据库迁移到Hadoop
- 数据同步策略，数据一致性的保障
- 查询的速度


# rest
- [介绍-入门](http://www.cnblogs.com/artech/p/restful-web-api-02.html)
- [RESTful API 设计指南](http://www.ruanyifeng.com/blog/2014/05/restful_api.html)
- [理解本真的REST架构风格](http://www.infoq.com/cn/articles/understanding-restful-style)、[如何设计好的RESTful API？](http://www.infoq.com/cn/articles/how-to-design-a-good-restful-api)
- [RESTful API的十个最佳实践](http://www.cnblogs.com/xiaoyaojian/p/4612503.html)
- [最佳实践](http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api)
- [Google/Facebook/GitHub等设计对比](http://blog.octo.com/en/design-a-rest-api/)
- [jsonapi](http://jsonapi.org/format/) - [jsonapi中文](http://jsonapi.org.cn/format/)

总结：

- 使用名词而不是动词，使用名词的复数形式。（一些非CRUD操作如login/logout，可以用动词，方便理解）
- Get方法和查询参数不应该改变资源状态
- 假如资源连接到其它资源，则使用子资源形式`GET /cars/711/drivers/4`，但cars和drivers可以是并列的资源。
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

资源、子资源、相关资源，都能通过「links」关联，达到从一个资源找到相关资源(links列出URL)，或者直接embedded相关资源。

    {
      data: {
        published_at: "02/21/1848",
        body: "In bourgeois ..",
        author: {
          data: {
            name: "Monsieur Ramboz",
          },
          links: {
            self: "/authors/karlm",
            blog_posts: "/authors/karlm/blog_posts"
          }
        }
      },
      links: {
        self: "/blog_posts/1",
        comments: "/blog_posts/1/comments",
        author: "/authors/karlm"
      }
    }

根据[richardson模型](http://martinfowler.com/articles/richardsonMaturityModel.html), REST架构的成熟度有3个等级:

- Level 0 POX (这个就不算REST了)
- Level 1 Resources
- Level 2 Http verbs
- Level 3 Hypermedia Controls

- Level 1 Resources 这一级别主要解决了Level 0 接口的问题, 使得各种资源有了自己相应的URI,
  虽然仍然是POX的交互方式, 但是每一个接口都更加紧凑和内聚, 相应的容易维护起来.
- Level 2 Http verbs 这一级别使用http verbs来对各种资源进行crud操作, 使得应用程序的接口更加的统一, 语义更加明确.
- Level 3 RESTful的架构本意是"在符合架构原理的前提下，理解和评估以网络为基础的应用软件的架构设计，得到一个功能强、性能好、适宜通信的架构。"
这个世界上规模最大的, 耦合度最低, 最稳定的, 性能最好的分布式网络应用是什么? 就是WEB本身. 规模,稳定,性能都不用说了.
为什么说耦合度低呢? 想一想每个人上网的经历, 你几乎不需要任何培训就可以上一个新的网络购物平台挑选商品,用信用卡付款,邮寄到自己家里.
把网站的程序想像成一个状态机, 用户在一系列状态转换中完成自己的目标. 这中间的每一步, 应用程序都告诉你当前的状态和可能的下一步操作, 最终引导用户从挑选商品,挑选更多商品,到支付页面,到输入信用卡信息,最终完成付费,到达状态机的终点.
这种service discoverablility和self-documenting就是level 3想解决的问题 在这里面, 告诉用户当前状态以及各种下一步操作的东西, 比如链接, 按钮等等, 就是Hypermedia Controls. Hypermedia Controls 就是这个状态机的引擎.
Level 3的REST架构就是希望能够统一这一类的Hypermedia Controls, 赋予他们标准的, 高度可扩展的标准语义及表现形式, 使得甚至无人工干预的机器与机器间的通用交互协议边的可能. 比如你可以告诉一个通用的购物客户端, "给我买个最便宜的xbox", 客户端自动连上google进行搜索, 自动在前10个购物网站进行搜索, 进行价格排序, 然后自动挑选最便宜的网站, 进行一系列操作最终完成用信用卡付费, 填写个人收件地址然后邮寄. 这些都依赖于Hypermedia Controls带来的这种service discoverablility和self-documenting。

### 业务实例
> 其他：[github](http://api.github.com/)、[instagram](https://instagram.com/developer/)、[白宫API规范](https://github.com/WhiteHouse/api-standards)

> [React.js and Spring Data REST: Part 1 - Basic Features](https://spring.io/blog/2015/09/01/react-js-and-spring-data-rest-part-1-basic-features)、[React.js and Spring Data REST: Part 2 - Hypermedia](http://spring.io/blog/2015/09/15/react-js-and-spring-data-rest-part-2-hypermedia)，包含_links、_embedded、Paging、Sorting 很完善的rest库。

具体到业务中的表现就是“embedded resources”，代码中的实现方式是在一些标记@RestResource注解的bean中(model)的一些属性上加入@Relation注解(自定义的注解)，并设置相应的loader用来加载相关资源，然后写具体的loader来实现功能。

目前只在业务中的一部分实现了这个功能，前端能通过拼接参数获得关联资源(也能exclude掉不需要的数据字段)，实例如`http://xx?e=xx&_xfields=title&_embedded=category,category.types,type,rank,status`，通过改变`_xfields / _embedded`会得到不同结果，其实这样已经带来了不少便利。当然如果像github-API一样把关联资源子资源等的link-uri的给出，那么也就产生了在线API文档，少了些找文档的问题。

如果不用这样的@Relation注解实现、Java怎么处理这个问题呢？一般是要设置不少`多余的`model，如父子资源各有一个model，当需要一起用的时候，又要设置新的合并起来的model。或者会形成很多map数据结构的层层嵌套，导致代码耦合难以阅读。




# http
- 发起一个HTTP请求的过程就是建立一个socket通信的过程。可以模拟浏览器发起HTTP请求：
    - 如用HttpClient发起；
    - Linux中的`curl`命令，通过`curl+url`就可以发起HTTP请求
- 搞清楚`Expires`、`Last-Modified`、`Etag`、

HTTP协议本身是一种面向资源的应用层协议，但对HTTP协议的使用实际上存在着两种不同的方式：一种是RESTful的，它把HTTP当成应用层协议，比较忠实地遵守了HTTP协议的各种规定；另一种是SOA的，它并没有完全把HTTP当成应用层协议，而是把HTTP协议作为了传输层协议，然后在HTTP之上建立了自己的应用层协议。

幂等性并不属于特定的协议，它是分布式系统的一种特性；所以，不论是SOA还是RESTful的Web API设计都应该考虑幂等性。（幂等性是数学中的一个概念，表达的是N次变换与1次变换的结果相同）

- HTTP GET方法用于获取资源，不应有副作用，所以是幂等的。（不会改变资源的状态，但不是每次GET的结果相同）
- HTTP DELETE方法用于删除资源，有副作用，但它应该满足幂等性。
- HTTP POST和PUT的区别容易被简单地误认为“POST表示创建资源，PUT表示更新资源”；而实际上，二者均可用于创建资源，更为本质的差别是在幂等性方面。
- POST所对应的URI并非创建的资源本身，而是资源的接收者。比如：POST http://www.forum.com/articles的语义是在http://www.forum.com/articles下创建一篇帖子，HTTP响应中应包含帖子的创建状态以及帖子的URI。两次相同的POST请求会在服务器端创建两份资源，它们具有不同的URI；所以，POST方法不具备幂等性。
- 而PUT所对应的URI是要创建或更新的资源本身。比如：PUT http://www.forum/articles/4231的语义是创建或更新ID为4231的帖子。对同一URI进行多次PUT的副作用和一次PUT是相同的；因此，PUT方法具有幂等性。

#### Content-type & Accept
- Content-type in a request refers to the type of the data you are sending!
    - [Do I need a content type for http get requests](http://stackoverflow.com/questions/5661596/do-i-need-a-content-type-for-http-get-requests)：Get requests should not have content-type because they do not have request entity (that is, a body)
- Accept：Content-Types that are acceptable for the response.



# 字符编码
计算机中存储信息的最小单元是一个字节，即8个bit，所以能表示的字符范围是0~255个。

#### ASCII码
单字节编码，一共128个字符，用一个字节的低7位表示。
#### ISO-8859-1
单字节编码，扩展了ASCII，总共能表示256个字符，涵盖了大多数西欧语言字符。
#### GB2312
双字节编码，编码范围A1~F7，包含6763个汉字。
#### GBK
兼容并扩展了gb2312，编码范围是8140~FEFE(去掉XX7F)，总共有23940个码位，能表示21003个汉字。

#### utf-16
用两个字节（16个bit）表示Unicode转化格式。每两个字节表示一个字符，这就大大简化了字符串操作。utf-16编码不论什么字符都用两个字节表示，规则很简单，编码效率非常高，适合在本地磁盘和内存之间使用、可以进行字符和字节之间的快速切换、如Java的内存编码就采用utf-16编码。  
但有很大一部分字符用一个字节就可以表示了，因此存储空间浪费了一倍，不适合用在网络之间传输，因为会没必要的增大了网络传输流量，而且网络传输容易损坏字节流，一旦字节流损坏将很难恢复。另外它采用顺序编码，不能对单个字符的编码值进行校验，如果中间的一个字符码值损坏，后面的所有码值都将受影响。

#### utf-8
采用一种变长技术，每个编码区域有不同的字码长度。如果一个字节最高位（第8位）为0，表示是一个ASCII字符。对单字节范围内的字符仍然用一个字节表示，对汉字采用三个字节表示。更适合网络传输，单个字符损坏也不会影响后面的其他字符，在编码效率上介于GBK和utf-16之间，在编码效率和编码安全上做了平衡，是理想的中文编码方式。

#### web上的编码
URL中包含中文时需要进行编码，但URL中`?`前后部分（分别是uri和QueryString查询字符串）编码方式不同，后端相应的解码方式也不同。

- 对uri部分进行解码的字符集是在connector的`<Connector URIEncoding="UTF-8" />`中定义的，如果没有定义，将以默认编码ISO-8859-1解析，所以最好设置为utf-8编码。
- 而HTTP的get方式请求的QueryString与post方式请求的表单参数都是作为`Parameters`保存的，都通过`request.getParameter`获取参数值，对它们的解码也是在该方法第一次被调用时进行的（注意：要在第一次调用request.getParameter方法之前就设置request.setCharacterEncoding(charset)，否则post表单提交上来的数据可能出现乱码）。浏览器根据ContentType的charset编码格式对之进行编码，然后提交到服务器，服务端同样也是用ContentType中的字符集进行解码的。


# DNS域名解析
- 输入域名并按下回车后
- 第一步，浏览器会检查缓存中有没有这个域名对应的解析过的IP地址，有就结束，没有进入下一步
- 第二步，浏览器查找操作系统缓存中是否有。操作系统也有一个域名解析过程，在hosts文件里设置可以将任何域名解析到任何能够访问的IP地址。如果指定了，浏览器会使用这个IP地址。（早期Windows中的域名被入侵黑客劫持问题）
- 前两步都是在本机完成的，如果无法完成解析，就会请求域名服务器了。我们的网络配置中都会有「DNS服务器地址」，操作系统会把域名发送给LDNS，也就是本地区的域名服务器。大约80%的域名解析到这里完成。
- 第四步，如果LDNS没命中，就到Root Server域名服务器请求解析。然后`gTLD Server`，`Name Server域名服务器`，返回该域名对应的`IP和TTL值`被Local DNS Server缓存，解析结果返回给用户、缓存到本地系统缓存中、域名解析过程结束。（这中间还有GTM负载均衡控制等）
- 可以用`nslookup`、`dig www.taobao.com`等命令，跟踪解析过程

# CDN工作机制
CDN = 镜像（Mirror）+ 缓存（Cache）+ 整体负载均衡（GSLB），主要缓存网站中的静态数据。

三种负载均衡架构：链路负载均衡、集群负载均衡、操作系统负载均衡。  
链路负载均衡就是通过DNS解析成不同的IP，用户根据这个IP来访问不同的目标服务器。  
集群负载均衡分为硬件和软件负载均衡。硬件负载均衡设备昂贵、如F5，性能非常好，但访问量超出极限时不能进行动态扩容。软件负载均衡成本低，缺点是一般一次访问请求要经过多次代理服务器，会增加网络延时，如LVS、HAProxy。  
操作系统负载均衡，是利用操作系统级别的软中断或硬中断，设置多队列网卡等来实现。
