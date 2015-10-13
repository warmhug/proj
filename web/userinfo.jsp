<%@ page language="java" import="java.util.*,java.text.*" contentType="text/html; charset=utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML>
<html>
  <head>
    <base href="<%=basePath%>">
    <style type="text/css">
	 .title{
		 width: 30%;
		 background-color: #CCC;
		 font-weight: bold;
	 }
	 .content{
	     width:70%;
	     background-color: #CBCFE5;
	 }
   </style>
  </head>

  <body>
    <h1>用户信息</h1>
    <hr>
    <center>
     <jsp:useBean  id="regUser" class="entity.Users" scope="session"/>
     <table width="600" cellpadding="0" cellspacing="0" border="1">
        <tr>
          <td class="title">用户名：</td>
          <td class="content">&nbsp;<jsp:getProperty name="regUser" property="username"/></td>
        </tr>
        <tr>
          <td class="title">密码：</td>
          <td class="content">&nbsp;<jsp:getProperty name="regUser" property="mypassword"/></td>
        </tr>
        <tr>
          <td class="title">性别：</td>
          <td class="content">&nbsp;<jsp:getProperty name="regUser" property="gender"/></td>
        </tr>
        <tr>
          <td class="title">E-mail：</td>
          <td class="content">&nbsp;<jsp:getProperty name="regUser" property="email"/></td>
        </tr>
        <tr>
          <td class="title">出生日期：</td>
          <td class="content">&nbsp;
            <%
               SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日");
               String date = sdf.format(regUser.getBirthday());

            %>
             <%=date%>
          </td>
        </tr>
        <tr>
          <td class="title">爱好：</td>
          <td class="content">&nbsp;
            <%
               String[] favorites = regUser.getFavorites();
               for(String f:favorites)
               {
            %>
                <%=f%> &nbsp;&nbsp;
            <%
               }
            %>
          </td>
        </tr>
        <tr>
          <td class="title">自我介绍：</td>
          <td class="content">&nbsp;<jsp:getProperty name="regUser" property="introduce"/></td>
        </tr>
        <tr>
          <td class="title">是否介绍协议：</td>
          <td class="content">&nbsp;<jsp:getProperty name="regUser" property="flag"/></td>
        </tr>
     </table>
    </center>
  </body>
</html>
