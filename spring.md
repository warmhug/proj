
# spring

> 2016-01

视频地址：http://www.imooc.com/learn/196

[Spring基础知识汇总](http://www.imooc.com/article/1309)、
[SpringMVC学习笔记](http://www.imooc.com/article/1392)

[文档](http://docs.spring.io/spring-framework/docs/current/spring-framework-reference/html/index.html)

In Spring, the objects that form the backbone of your application and that are managed by the Spring IoC container are called beans. A bean is an object that is instantiated, assembled, and otherwise managed by a Spring IoC container. Otherwise, a bean is simply one of many objects in your application.

@Component is a generic stereotype for any Spring-managed component. @Repository, @Service, and @Controller are specializations of @Component for more specific use cases, for example, in the persistence, service, and presentation layers, respectively.

When @Configuration classes are provided as input, the @Configuration class itself is registered as a bean definition, and all declared @Bean methods within the class are also registered as bean definitions.

When @Component and JSR-330 classes are provided, they are registered as bean definitions, and it is assumed that DI metadata such as @Autowired or @Inject are used within those classes where necessary.


spring是一个轻量级的 IOC 和 AOP 容器框架，通过其核心的依赖注入机制，以及AOP的声明式事务管理，与持久层框架整合，以及与其他的MVC框架整合，为企业应用提供一个轻量级的解决方案。

非侵入式设计：从框架角度可以这样理解，无需继承框架提供的类，这种设计就可以看作是非侵入式设计，如果继承了这些框架类，就是侵入设计，如果以后想更换框架之前写过的代码几乎无法重用，如果非侵入式设计则之前写过的代码仍然可以继续使用。

POJO：POJO（Plain Old Java Objects）简单的Java对象，它可以包含业务逻辑或持久化逻辑，但不担当任何特殊角色且不继承或不实现任何其它Java框架的类或接口。

AOP：AOP是Aspect Oriented Programming的缩写，意思是面向切面编程，提供从另一个角度来考虑程序结构以完善面向对象编程（相对于OOP），即可以通过在编译期间、装载期间或运行期间实现在不修改源代码的情况下给程序动态添加功能的一种技术。通俗点说就是把可重用的功能提取出来，然后将这些通用功能在合适的时候织入到应用程序中；比如安全，日记记录，这些都是通用的功能，我们可以把它们提取出来，然后在程序执行的合适地方织入这些代码并执行它们，从而完成需要的功能并复用了这些功能。

灵活的Web层支持：Spring本身提供一套非常强大的MVC框架，而且可以非常容易的与第三方MVC框架集成，比如Struts等。

spring由以下几个模块组成：

1. 核心容器和支持工具
核心容器主要组成部分就是 BeanFactory 类，它采用工厂模式实现反转控制，把应用程序的配置和依赖性与实际的应用程序代码分离。
2. Application context 模块
它扩展了 BeanFactory，提供了对国际化、系统生命周期事件的支持。
3. AOP模块
直接集成了面向切面编程的功能，通过使用AOP，不用依赖EJB，可以在应用系统中使用声明式的事务管理策略。
4. JDBC 和 DAO模块
提供了数据库操作中的模板代码，简化数据库操作工作。
5. ORM映射模块
不提供对ORM映射的实现，而提供了对其他ORM工具的支持。支持的工具包括：JDO、Hibernate、ibatis等
6. web模块
该模块建立在 Application context模块的基础上，为基于web的应用程序提供了上下文，提供常见的web任务处理功能，提供了对 struts 的支持。
7. MVC模块
它是一个完整的MVC实现，也可以和其他MVC框架集成，支持各种视图技术如JSP、velocity、Tiles等

IoC就是Inversion of Control，控制反转还有一个名字叫做依赖注入（Dependency Injection），就是由容器控制程序之间的关系，而非传统实现中，由程序代码直接操控。IoC意味着将你设计好的类交给系统去控制，而不是在你的类内部控制。IoC很好的体现了面向对象设计法则之一—— 好莱坞法则：“别找我们，我们找你”；即由IoC容器帮对象找相应的依赖对象并注入，而不是由对象主动去找。


## Struts、Hibernate(orm框架)

- Struts的目的是为了分离视图层和控制层
- Spring是为了让你养成用接口编程的好习惯 提高程序的重用率还有可维护性（健壮性）
- Hibernate的目的是为了实现用面向对象的思想来管理数据库实现与数据库之间的低耦合

- 模型层，用Hibernate框架让来JavaBean在数据库生成表及关联，通过对JavaBean的操作来对数据库进行操作；
- 控制层，用Struts框架来连接数据层和视图层的，接收、处理、发送数据并控制流程；
- 视图层，用JSP模板把页面展现给用户以及提供与用户的交互。

Struts2 整合 Hibernate 开发：分层思想，从上到下：表现层 → 业务逻辑层 → 持久层 → 数据库层

广义上持久层包括 DAO设计模式 和 Hibernate持久化操作两部分。
三个重要部分：DAO接口、DAO实现类(实现DAO接口)、DAO工厂类(用来负责实例化DAO实现类)。

业务逻辑组件的开发和持久层类似，包含三个部分：业务逻辑组件接口、业务逻辑组件实现类、业务逻辑组件工厂类。


## Velocity

- JSP是编译执行，而Velocity是解释执行
- 编译执行的效率明显好于解释执行
- JSP的执行必须要有Servlet的运行环境，也就是需要ServletContext、HttpServletRequest、HttpServletResponse类。而渲染Velocity不需要，所以Velocity不只应用在Servlet环境中。

Velocity优化实践：改变Velocity的解释执行，变为编译执行。
