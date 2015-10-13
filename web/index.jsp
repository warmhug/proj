<%@ page contentType="text/html;charset=UTF-8" language="java" import="java.util.*" %>
<%
  String path = request.getContextPath();
  String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML>
<html>
<head>
  <base href="<%=basePath%>">
  <title><%=request.getServerPort()%></title>
</head>
<body>
<a href="http://www.pocketdigi.com/20141003/1379.html">JavaWeb开发:Intellij IDEA+JFinal+Tomcat配置</a>
<p>
  当前在线用户人数:${userNumber }<br/>
  <%
    ArrayList<ee.com.imooc.entity.User>  userList =  (ArrayList<ee.com.imooc.entity.User>)request.getServletContext().getAttribute("userList");
    if(userList!=null){
      for(int i = 0 ; i < userList.size() ; i++){
        ee.com.imooc.entity.User user = userList.get(i);
  %>
  IP:<%=user.getIpString() %>,FirstTime:<%=user.getFirstTimeString() %>,SessionId:<%=user.getSessionIdString() %> <br/>
  <%}} %>
</p>

  <section>
    <h1>velocity</h1>
    <a href="ve">hello</a>
  </section>

  <section>
    <h1>比较完整的demo</h1>
    <a href="./c_index.jsp">demo</a>
  </section>

  <section>
    <h1>Servlet生命周期</h1>
    <hr>
    <a href="servlet/TestServlet1">以Get方式请求TestServlet1</a>
    <a href="servlet/TestServlet2">以Get方式请求TestServlet2</a>
  </section>

  <section>
    <h1>最简单Servlet小例子</h1>
    <hr>
    <a href="servlet/HelloServlet">Get方式请求HelloServlet</a><br>
    <form action="servlet/HelloServlet" method="post">
      <input type="submit" value="Post方式请求HelloServlet"/>
    </form>
  </section>

  <section>
  <h1>获取初始化参数演示案例</h1>
  <hr>
  <a href="servlet/GetInitParameterServlet">获取初始化参数Servlet</a>
  </section>

  <section>
    <h1>Servlet路径跳转</h1>
    <hr>
    <!--使用相对路径访问HelloServlet -->
    <!-- /servlet/HelloServlet 第一个/表示服务器的根目录 -->
    <a href="servlet/HelloServlet">访问HelloServlet!</a><br>
    <!-- 使用绝对路径 访问HelloServlet,可以使用path变量:path变量表示项目的根目录-->
    <a href="<%=path%>/servlet/HelloServlet">访问HelloServlet!</a><br>
    <!--表单中action的URL地址写法，与超链接方式完全相同。 -->
    <a href="servlet/TestServlet">访问TestServlet,跳转到Test.jsp</a>
  </section>

</body>
</html>
