
orm会有1+n查询问题如：学生表和老师表，查出所有学生(n个)的数据（结果要包含老师名字），每一条学生数据里关联某一个老师的id，通过这个id要从老师表里查出老师的名字，所以需要查n次老师表。在有数据分页和索引的情况下，1+n的性能还是很好的，虽然看起来发了很多sql查询，相对join的方式性能要好些。

Hibernate比iBATIS性能低？因为每次都要编译sql语句？

数据库连接数问题：连接利用率低

一致性hash要解决的问题

------

Hibernate not only takes care of the mapping from Java classes to database tables (and from Java data types to SQL data types), but also provides data query and retrieval facilities. It can significantly reduce development time otherwise spent with manual data handling in SQL and JDBC. Hibernate’s design goal is to relieve the developer from 95% of common data persistence-related programming tasks by eliminating the need for manual, hand-crafted data processing using SQL and JDBC. However, unlike many other persistence solutions, Hibernate does not hide the power of SQL from you and guarantees that your investment in relational technology and knowledge is as valid as always.

------

当访问量大的时候（数据库连接数不够）：

- 业务垂直拆分，拆分后就需要远程服务调用框架hsf
    - 淘宝业务类型：商品、交易、评价、属性
    - 拆分为“商品中心、用户中心”等，不同团队分别负责
- 中间加一层，这层下边的机器要减少，作为proxy
- 数据库切分：单个商品库切分为多个

IDC(interne data center)数据中心，数据中心里的Linux服务器用什么牌子？Dell/HP/huawei/ibm。

------

Java应用传统上使用JDBC（Java Database Connectivity）API来把数据持久到关系数据库中。JDBC API使用SQL语句来完成创建（create）、读取（read）、更新（update）和删除（delete）（CRUD）操作。JDBC代码内嵌在Java类中——换句话说，这类代码与业务逻辑紧密耦合在一起。这类代码还在很大程度上依赖于SQL，而SQL并非是跨数据库的标准；这使得从一种数据库移植到另一种数据库变得困难起来。

对象-关系映射（ORM）使用直接映射来生成内部的JDBC或是SQL代码。然而对于一些应用场景来说，你需要对SQL查询做更加直接的控制。在编写涉及了一系列更新查询的应用时，直接编写自己的SQL查询比依赖于ORM生成的SQL来得更有效一些。另外，在对象模型和数据模型之间存在失配时，ORM是不能够使用的。

iBATIS最好是用在你需要全面地控制SQL的时候，在需要对SQL查询做微调的时候也很有用。当你在应用和数据库设计两方面都有完全的控制权的时候，就不应该使用iBATIS，因为在这样的情况下，应用可能会做出修改以适应数据库，或是反过来。在这种情形中，你可以构建一个完全的对象-关系应用，其他的ORM工具更适于使用，因为iBATIS较为以SQL为中心，其通常被称作反转的——功能齐全的ORM工具生成SQL，而iBATIS直接使用SQL。iBATIS也不适合于非关系型的数据库，因为这类数据库不支持事务和其他iBATIS用到的键特性。

JPA为Java SE应用和Java EE应用提供了一个标准的基于POJO的ORM解决方案，其使用实体类、实体管理器和持久单元来映射和持久领域对象和数据库中的表。JPA应该用在需要标准的基于Java的持久性解决方案的时候。JPA支持继承和多态这两种面向对象编程特性。JPA的缺点是其需要一个实现了其自身的提供程序。此外，JPA被定义成只能在关系数据库上工作。如果你的持久化解决方案需要扩展到其他类型的数据存储上，比如XML数据库上的话，则JPA就不能够用来解决你的持久性问题了。

JPA是需要Provider来实现其功能的，Hibernate就是JPA Provider中很强的一个，应该说无人能出其右。从功能上来说，JPA就是Hibernate功能的一个子集。Hibernate 从3.2开始，就开始兼容JPA。Hibernate3.2获得了Sun TCK的JPA(Java Persistence API) 兼容认证。

只要熟悉Hibernate或者其他ORM框架，在使用JPA时会发现其实非常容易上手。例如实体对象的状态，在Hibernate有自由、持久、游离三种，JPA里有new，managed，detached，removed，明眼人一看就知道，这些状态都是一一对应的。再如flush方法，都是对应的，而其他的再如说Query query = manager.createQuery(sql)，它在Hibernate里写法上是session，而在JPA中变成了manager，所以从Hibernate到JPA的代价应该是非常小的

同样，JDO，也开始兼容JPA。在ORM的领域中，看来JPA已经是王道，规范就是规范。在各大厂商的支持下，JPA的使用开始变得广泛。

像Hibernate和JPA一类的传统的ORM解决方案应该用来作为一种完全的对象-关系映射手段。Hibernate和JPA直接把Java对象映射到数据库表上，而iBATIS则是把Java对象映射到SQL查询的结果上。在某些应用中，领域模型中的对象是根据业务逻辑来设计的，可能不完全与数据模型匹配，在这种情况下，iBATIS是合适的选择。

总是会存在精通Java的人和更信任SQL的人这样的一种划分，对于一个熟练的Java程序员来说，他想使用一个无需与SQL有太多交互的持久性框架，那么Hibernate是最好的选择，因为它会在运行时生成高效率的SQL查询。但是，如果你想要使用存储过程来对数据库查询做各方面的控制的话，则iBATIS是推荐的解决方案。JPA还可通过EntityManager的createNativeQuery()方法来支持SQL。

iBATIS大力支持SQL，而Hibernate和JPA则是使用它们自己的查询语言（分别是HQL和JPQL），这些语言与SQL类似。

一个应用要成功的话需要具备良好的性能。Hibernate通过提供缓存设施来提高性能，这些缓存设施有助于更快地从数据库中检索数据。iBATIS使用SQL查询，这些查询可通过微调来获得更佳性能。JPA的性能则取决于供应商的实现，根据每个应用的特有情况做选择。

有时候，你需要改变应用使用的关系数据库，如果你使用Hibernate来作为持久化解决方案的话，那么这一问题很容易解决，因为Hibernate在配置文件中使用了一个数据库方言属性。从一个数据库移植到另一个数据库上仅是把dialect属性修改成适当值的事。Hibernate使用这一属性来作为生成特定于某种给定数据库的SQL代码的指南。

如前所述，iBATIS要求你编写自己的SQL代码，因此，iBATIS应用的可移植性取决于这些SQL。如果查询是使用可移植的SQL编写的话，那么iBATIS也是可在不同的关系数据库之间做移植的。另一方面，JPA的移植性则取决于其正在使用的供应商实现。JPA是可在不同的实现之间做移植的，比如Hibernate和TopLink Essentials之间。因此，如果应用没有用到某些提供商特有的功能特性的话，那么移植性就不是什么大问题。




## 数据库

从存储上来说，主要分为几类：

- Key/Value形式，典型的产品如tair。
- Schema-free, 典型的如mongoDB，阿里云的OTS，这一类产品的特点是使用灵活简单，但如果有二级索引的需求，会比较麻烦。
- SQL,关系型数据库，比如MySQL、OceanBase，特点是有较高的使用成本，schema变更较为麻烦，但功能强大，特别是OceanBase解决了扩展性和性能问题。

业界 HBase 的二级索引已经有很多产出了，不知道 OTS 目前对于二级索引有什么新进展。

### 数据库（jdbc）
- 建立与数据库的连接很耗时（花接近一秒），实质是建立了socket连接，用“连接池”来解决。
- `java.sql.Statement`用来执行sql语句并返回结果，很容易造成“sql注入”风险，例如执行了`delete from xx where id=`，用户输入的id为`5 or 1=1`，这条语句就会删掉表上所有数据。所以，不要用这个，改用`java.sql.PreparedStatement`

#### mysql
> 默认账户root，密码为空。  
> 命令行命令以`;`结尾

```
mysql -uroot  #登陆root账户
show databases;
show tables;
show tables from database_name;

drop database <数据库名>;  #删除数据库
```

### 事务
ACID（原子性Atomicity、一致性Consistency、隔离性Isolation和持久性Durability)
实质是锁和并行
读写锁，隔离
数据一致性，数据完整性
MVCC：读写并行

单机事务，分布式事务
死锁检测：碰撞检测

## 数据库编程
几个名词：`JDBC`、`SQL`、`LOB`、`存储过程`、`可滚动和可更新的结果集`、`行集`、`事务`、`JNDI`、`数据库连接池`

除了数字、字符串和日期之外，许多数据库还可以存储大对象，例如图片或其他数据。在sql中，二进制大对象称为BLOB，字符型大对象称为CLOB。

存储过程是在数据库中执行的用数据库相关的语言编写的过程。

在SQL中，描述数据库或其组成部分的数据称为元数据（区别于那些存在数据库中的实际数据）。我们可以获得三类元数据：关于数据库的元数据、关于结果集的元数据以及关于预备语句参数的元数据。

可以将多个语句(sql语句？)组合成「事务(transaction)」。当所有语句都顺利执行之后，事务可以被提交。否则，如果其中某个语句遇到错误，事务将被回滚，就好像没有任何语句被执行过一样。

数据库连接是有限的资源，如果用户要离开应用一段时间，那么他占用的连接就不应该保持开放状态；另一方面，每次查询都获取连接并在随后关闭它的代价也是相当高的。
解决办法是建立「数据库连接池（pool）」。这意味着数据库连接在物理上并未被关闭，而是保留在一个队列中并被反复重用。连接池是一种非常重要的服务，JDBC规范为实现者提供了用以实现连接池服务的手段。不过，JDK本身并未实现这项服务，数据库供应商提供的JDBC驱动程序中通常也不包含这项服务。相反，web容器和应用服务器的开发商通常会提供连接池服务的实现。
连接池的使用对程序员来说是「完全透明的」，可以通过获取数据源并调用getConnection方法来得到连接池中的连接。使用完连接后，需要调用close方法。该方法并不在物理上关闭连接，而只是告诉连接池已经使用完该连接。
