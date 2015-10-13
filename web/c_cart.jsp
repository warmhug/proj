<%@ page contentType="text/html;charset=UTF-8" language="java" import="java.util.*" %>
<%@ page import="ee.entity.Items"%>
<%@ page import="ee.entity.Cart"%>
<%@ page import="ee.dao.ItemsDAO"%>
<%
  String path = request.getContextPath();
  String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML>
<html>
<head>
  <base href="<%=basePath%>">
  <style type="text/css">
    hr{
      border-color:#FF7F00;
    }
    div{
      float:left;
      margin: 10px;
    }
    div dd{
      margin:0px;
      font-size:10pt;
    }
    div dd.dd_name
    {
      color:blue;
    }
    div dd.dd_city
    {
      color:#000;
    }
  </style>
</head>
<body>

<h1>我的购物车</h1>
<a href="c_index.jsp">首页</a> >> <a href="c_index.jsp">商品列表</a>
<hr>
<div id="shopping">
  <form action="" method="">
    <table>
      <tr>
        <th>商品名称</th>
        <th>商品单价</th>
        <th>商品价格</th>
        <th>购买数量</th>
        <th>操作</th>
      </tr>
      <%
        //首先判断session中是否有购物车对象
        if(request.getSession().getAttribute("cart")!=null)
        {
      %>
      <!-- 循环的开始 -->
      <%
        Cart cart = (Cart)request.getSession().getAttribute("cart");
        HashMap<Items,Integer> goods = cart.getGoods();
        Set<Items> items = goods.keySet();
        Iterator<Items> it = items.iterator();

        while(it.hasNext())
        {
          Items i = it.next();
      %>
      <tr name="products" id="product_id_1">
        <td class="thumb"><img width="200" src="images/<%=i.getPicture()%>" /><a href=""><%=i.getName()%></a></td>
        <td class="number"><%=i.getPrice() %></td>
        <td class="price" id="price_id_1">
          <span><%=i.getPrice()*goods.get(i) %></span>
          <input type="hidden" value="" />
        </td>
        <td class="number">
          <%=goods.get(i)%>
        </td>
        <td class="delete">
          <a href="servlet/CartServlet?action=delete&id=<%=i.getId()%>" onclick="delcfm();">删除</a>
        </td>
      </tr>
      <%
        }
      %>
      <!--循环的结束-->

    </table>
    <div class="total"><span id="total">总计：<%=cart.getTotalPrice() %>￥</span></div>
    <%
      }
    %>
    <div class="button"><input type="submit" value="购 买" /></div>
  </form>
</div>

</body>
</html>
