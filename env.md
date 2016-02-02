
## 学习：
1. 学Java语法，精通面向对象的思想（理解好多态）
2. 数据库，包括sql、jdbc、orm，事务，ACID
3. 学Java web，包括servlet、jsp
4. 框架学习：Spring、Hibernate、iBATIS、JPA

# 软件、环境
注意：mac不区分文件名的大小写，类名及文件名大小写改变后，不会自动刷新。编译时可能抛出“找不到类”的错误，要重新删除相应文件，再下载下来。

### maven依赖找不到
- 先在用户目录（~/.m2）下的 settings.xml 里，添加内网mvn仓库源。
- 若不行，再把maven安装目录（xx/apache-maven-3.3.3/conf）下的 settings.xml 替换为与用户目录下 settings.xml 一致。
- 若还不行，删掉用户目录（~/.m2/repository）下已下载的所有依赖，在项目目录下`mvn install -DskipTests`重新安装。

### eclipse配置jre
preferences --> Java --> Installed JREs --> search

### mac中 Eclipse 不能读取到环境变量
- 配置环境出错，并且`System.out.print(System.getenv("JAVA_HOME"))`返回null，
    - 解决：从terminal中打开，`$ open /Applications/eclipse/Eclipse.app`。其他[引申](http://stackoverflow.com/questions/603785/environment-variables-in-mac-os-x?lq=1)

## eclipse
遇到问题，先在项目目录`mvn clean`，再点击eclipse菜单里project菜单项下的`clean...`。

### 导入Java工程：
1. 在项目目录下运行：`mvn eclipse:eclipse` 将maven项目转化为eclipse项目（生成两个eclipse导入所需的配置文件）
2. 再eclipse导入
3. 修改代码后执行mvn compile或mvn test检验


## idea
注意host文件里，localhost 只能对应 127.0.0.1 这个ip，不能对应其他ip地址，否则打不开 pom.xml 文件！[详细解释](http://stackoverflow.com/questions/12701347/unable-to-import-maven-project-into-intellij-idea)

使用idea不需要再`mvn eclipse:eclipse`，直接打开pom.xml文件，能自动导入maven依赖等。


## android

- [genymotion介绍](https://www.imququ.com/post/genymotion.html)
- [官方](http://www.genymotion.com/features/)
    - 账户`hualei / hualei5280@gmail.com  / hualei0910`

### Android SDK下载慢：[解决](http://blog.kuoruan.com/24.html)
方法一：

    打开地址：http://ping.chinaz.com/，
    分别测试 dl.google.com 和 dl-ssl.google.com 的IP地址，   
    将获取到的IP写入hosts文件。

方法二：使用国内镜像源

    mirrors.neusoft.edu.cn //东软信息学院
    ubuntu.buct.edu.cn //北京化工大学
    mirrors.dormforce.net //（栋力无限）电子科技大学

[真机调试](http://yijiebuyi.com/blog/84b194d94e768e8eecd0de3a3a3da041.html)
