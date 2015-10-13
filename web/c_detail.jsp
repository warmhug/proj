<%@ page contentType="text/html;charset=UTF-8" language="java" import="java.util.*" %>
<%@ page import="ee.entity.Items"%>
<%@ page import="ee.dao.ItemsDAO"%>
<%
  String path = request.getContextPath();
  String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML>
<html>
<head>
  <base href="<%=basePath%>">
  <title><%=request.getServerPort()%></title>
  <script>
    function selflog_show(id) {
      var num = document.getElementById('number').value
      var link = '<%=path%>/servlet/CartServlet?id='+id+'&num='+num+'&action=add'
      console.log(link)
      window.open(link)
    }
  </script>
</head>
<body>
<h1>商品详情</h1>
<a href="c_index.jsp">首页</a> >> <a href="c_index.jsp">商品列表</a>

<table width="750" height="60" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <!-- 商品详情 -->
    <%
      ItemsDAO itemDao = new ItemsDAO();
      Items item = itemDao.getItemsById(Integer.parseInt(request.getParameter("id")));
      if(item!=null)
      {
    %>
    <td width="70%" valign="top">
      <table>
        <tr>
          <td rowspan="5"><img src="images/<%=item.getPicture()%>" width="200" height="160"/></td>
        </tr>
        <tr>
          <td><B><%=item.getName() %></B></td>
        </tr>
        <tr>
          <td>产地：<%=item.getCity()%></td>
        </tr>
        <tr>
          <td>价格：<%=item.getPrice() %>￥</td>
        </tr>
        <tr>
          <td>购买数量：<input type="number" id="number" name="number" value="1" /></td>
        </tr>
      </table>
      <div id="cart">
        <img src="images/buy_now.png"><a href="javascript:selflog_show(<%=item.getId()%>)"><img src="images/in_cart.png"></a><a href="servlet/CartServlet?action=show"><img src="images/view_cart.jpg"/></a>
      </div>
    </td>
    <%
      }
    %>
    <%
      String list ="";
      //从客户端获得Cookies集合
      Cookie[] cookies = request.getCookies();
      //遍历这个Cookies集合
      if(cookies!=null&&cookies.length>0)
      {
        for(Cookie c:cookies)
        {
          if(c.getName().equals("ListViewCookie"))
          {
            list = c.getValue();
          }
        }
      }

      list+=request.getParameter("id")+",";
      //如果浏览记录超过1000条，清零.
      String[] arr = list.split(",");
      if(arr!=null&&arr.length>0)
      {
        if(arr.length>=1000)
        {
          list="";
        }
      }
      Cookie cookie = new Cookie("ListViewCookie",list);
      response.addCookie(cookie);

    %>
    <!-- 浏览过的商品 -->
    <td width="30%" bgcolor="#EEE" align="center">
      <br>
      <b><font color="#FF7F00">您浏览过的商品</font></b><br>
      <!-- 循环开始 -->
      <%
        ArrayList<Items> itemlist = itemDao.getViewList(list);
        if(itemlist!=null&&itemlist.size()>0 )
        {
          System.out.println("itemlist.size="+itemlist.size());
          for(Items i:itemlist)
          {

      %>
      <div>
        <dl>
          <dt>
            <a href="c_detail.jsp?id=<%=i.getId()%>"><img src="images/<%=i.getPicture() %>" width="120" height="90" border="1"/></a>
          </dt>
          <dd class="dd_name"><%=i.getName() %></dd>
          <dd class="dd_city">产地:<%=i.getCity() %>&nbsp;&nbsp;价格:<%=i.getPrice() %> ￥ </dd>
        </dl>
      </div>
      <%
          }
        }
      %>
      <!-- 循环结束 -->
    </td>
  </tr>
</table>

</body>
</html>
