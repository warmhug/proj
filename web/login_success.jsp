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
  <%
    String loginUser = "";
    if(session.getAttribute("loginUser")!=null)
    {
      loginUser = session.getAttribute("loginUser").toString();
    }
  %>
  欢迎您<font color="red"><%=loginUser%></font>,登录成功！
</div>
</body>
</html>
