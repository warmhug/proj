
# Java

- [Java SE & Java EE](./se_ee.md)
- [数据操作(Hibernate/Mybatis/..)和数据库(表/事务/..)](./data-db.md)

- [Java 征途：行者的地图](http://www.cnblogs.com/mindwind/p/5251430.html)
- [Java工程师成神之路~](http://www.hollischuang.com/archives/489)
- [算法 with Java](https://github.com/pedrovgs/Algorithms)
- [Java 设计模式](https://www.programcreek.com/java-design-patterns-in-stories/)

- QPS、RT、CPU 性能监控
- 阿里云OSS：文件存储系统（避免把文件存到数据库里、占用IO资源）
- tair：内存缓存服务器
  - 开源：memcached / redis
- F5：硬件负载均衡，LVS替代(软负载)
  - 即为name server（configServer），名字服务器，存放各个机器名，能知道有哪些机器。
- HSF(High Speed FrameWork)：远程服务调用框架
  - non-blocking IO.可以减少CPU切换开销，留更多CPU资源给业务代码。类比渔夫钓鱼，鱼竿有灯，钓起来灯亮，渔夫遍历查看鱼竿的等是否亮，亮了通知订阅者。一个渔夫可以看更多鱼竿，但如果鱼竿很多，一个渔夫看不过来，会造成延迟增加。
  - IO连接多路复用。一个连接上维持多个会话。
  - 序列化协议，hessian序列化。
  - 同类开源的rpc框架：dubbo或thrift等
- osgi：用于进行类库隔离的组件，允许组件动态热部署
- hbase、hive
- DRM：分布式资源管理，DRM框架即提供了这样一种能力，可以在运行时动态、即时地改变应用系统内存中的资源值，并且已经解决多机房问题。
- zookeeper：可以充当一个服务注册表（Service Registry），让多个服务提供者形成一个集群，让服务消费者通过服务注册表获取具体的服务访问地址（ip+端口）去访问具体的服务提供者。zookeeper提供了“心跳检测”功能，它会定时向各个服务提供者发送一个请求（实际上建立的是一个 socket 长连接），如果长期没有响应，服务中心就认为该服务提供者已经“挂了”，并将其剔除


通常一个Web服务站点的后端服务器不是将Java的应用服务器直接暴露给服务访问者，
而是在应用服务器（如Jboss）的前面再加一个Web服务器（如Apache或Nginx），
可以做日志分析、负载均衡、权限控制、防止恶意请求以及静态资源预加载等。

Tomcat中的设计模式：模板模式；工厂模式；单例模式；门面设计模式；观察者模式；命令模式；责任链模式。

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

### Serverless

[Serverless：云时代的软件架构核心思想](https://www.atatech.org/articles/131723)

BaaS、FaaS、Serverless:
BaaS后端即服务 - 概念篇 <https://yq.aliyun.com/articles/8521>
BaaS、FaaS、Serverless都是什么馅儿？ <https://yq.aliyun.com/articles/224403>
对Serverless架构的一点体验和思考: <https://www.jianshu.com/p/51a19ef5f8cf>
LeanCloud 与阿里云到底有什么区别？ <https://blog.leancloud.cn/4645/>
AWS Lambda: <https://aws.amazon.com/cn/lambda/>

- 对业务开发团队来说，他们的开发能力更专注前端，交互，需要掌握的技术栈里就只需要javascript 和 Restful API 就够了，他们可以更专注去理解业务模型和逻辑，快速构建业务系统，进行业务创新。
- 而对于后端团队，将跟专注做平台和服务，后者需要他们将 J2EE 时代的开发架构，比如 MVC， RPC等架构向微服务，EDA，CQRS等云时代的架构升级，更好的将系统复杂性解构，利用服务化来构建满足业务团队的需要。

### 微服务

[微服务架构的几种模式](http://microservices.io/patterns/index.html)、
[浅谈命令查询职责分离(CQRS)模式](http://www.cnblogs.com/yangecnu/p/Introduction-CQRS.html)、
[DDD CQRS架构和传统架构的优缺点比较](http://www.cnblogs.com/netfocus/archive/2016/02/06/5184182.html)、
什么是微服务架构：<https://os.alipayobjects.com/rmsportal/OzCkwPWAvRGwqXv.png>、
[stateless-authentication-for-microservices](http://www.slideshare.net/alvarosanchezmariscal/stateless-authentication-for-microservices)

Matt 在对微服务的总体介绍中是这样说的：经过分离的组件可以各自拥有独立的生命周期，并且按需进行扩展。不仅如此，这种方式也打破了组件之间的技术依赖，这就允许每个服务各自选择最适合的技术进行实现。通过将较大的问题分解为几个较小的问题，让每个问题更易于进行分析，也更利于开发者选择最适合的解决方案。

soa 是 Service-Oriented Architecture 的首字母简称，面向服务架构。开发人员很容易理解为是一个 Web Service，但是这绝对不是 SOA，那顶多只能算是 SOA 的一种实现方法。
微服务只是一种为经过良好架构设计的 SOA 解决方案、实现面向服务的交付方案。SOA 提供了上下文的框架，同时也提供了微服务所坚持的大部分规则。不仅如此，SOA 还提供了一种更宽泛的上下文，使微服务能够在复杂的企业中符合这些上下文。许多人在不断地抱怨 SOA 中的各种 WS-* 协议、ESB 的庞大以及各种极端复杂的项目，其实这只是面临的挑战不同而已。

当前业界比较成熟的微服务框架有 Netflix 的 Karyon/Ribbon，Spring 的 Spring Boot/Cloud，阿里的 Dubbo 等。配置中心比较成熟的开源方案有百度的 Disconf，360 的 QConf，Spring 的 Cloud Config 和阿里的 Diamond 等。

通常来说，RESTful 服务最适合于为某个数据模型提供 CRUD 操作，而微服务架构中的服务往往能够被轻易地分解为这些 CRUD 类型的服务，因此它与 RESTful 就能够很好地结合在一起。而对于其他类型的服务来说，类 RESTful 风格的服务通常也是一种良好的选择，这种类 RESTful 的风格也会使用 HTTP 作为传输协议，但服务本身并不一定要 100% 地符合 RESTful 的原则。
