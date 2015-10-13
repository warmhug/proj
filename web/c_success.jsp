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
<%
  String id = request.getParameter("id");
  String num = request.getParameter("num");
%>
您成功购买了<%=num%>件商品编号为<%=id%>的商品
</body>
</html>
