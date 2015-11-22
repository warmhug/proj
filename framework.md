
## 数据
jdbc 是一套API，不同的数据库对其做了不同的实现。

jpa 标准是由 hibernate 作者总结提出的，所以跟 hibernate 结合的很好。  
许多框架都做了对 jpa 的实现。

## 日志
slf4j-api 提供 API 标准。  
对其可以有多种实现，如：slf4j-nodep、log4j、jdk logging api、apache commons-log 等。

例如 hibernate 里 需要开启日志，来分析问题或查看运行过程。
