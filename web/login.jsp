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
<div id="box">
  <form action="servlet/LoginServlet" method="post">
    <p class="main">
      <label>用户名: </label>
      <input name="username" value="" />
      <label>密码: </label>
      <input type="password" name="password" value="">
    </p>
    <p class="space">
      <input type="submit" value="登录" class="login" style="cursor: pointer;"/>
    </p>
  </form>
</div>
</body>
</html>
