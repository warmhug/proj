<%@ Page Language="C#" AutoEventWireup="true"  CodeFile="Default.aspx.cs" Inherits="_Default" %>
<%@ Register src="user_reg.ascx" tagname="user_reg" tagprefix="uc1" %>
<%@ Register src="user_login.ascx" tagname="user_login" tagprefix="uc2" %>
<%@ Register src="vote.ascx" tagname="vote" tagprefix="uc3" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link href="CSS/main_CSS.css" rel="stylesheet" type="text/css" />
</head>
<body style="font-style: italic">
    <form id="form1" runat="server">
    <div>
        

    <div class="head">头部位置</div>

    <div class="middle">
    <div class="left">
    <div class="left_1">
      站内公告
          <uc2:user_login ID="user_login1" runat="server" />
    </div>
    <div class="left_2">
      登陆位置
        <uc1:user_reg ID="user_reg1" runat="server" />
    </div>
    <div class="left_3">
      投票位置
        <uc3:vote ID="vote1" runat="server" />
    </div>
    <div class="left_4">
    站内搜索新闻
    </div>
    </div>

    <div class="right">
    <div class="news_type">
    <ul><li>
    <a href="list_news.aspx?N_type_id=1 " target="_blank">国内新闻</a>
    <a href="list_news.aspx?N_type_id=2 " target="_blank">国际新闻</a>
    <a href="list_news.aspx?N_type_id=3 " target="_blank">互联网新闻</a>
    </li></ul>
      
    </div>
    
    <div class="new_news">
    最新新闻
         <asp:DataList ID="new_news" runat="server">
            <ItemTemplate>
                <tr>
                    <td colspan="2" style="height: 20px">
                        <a href='content_news.aspx?newsid=<%# DataBinder.Eval(Container.DataItem, "Id")%>'> <%# DataBinder.Eval(Container.DataItem,"N_title")%></a>
                    </td>
                    <td style="width: 160px; height: 20px;">
                        『
                        <%# DataBinder.Eval(Container.DataItem,"Addtime")%>
                        』</td>
                </tr>
            </ItemTemplate>
        </asp:DataList>
        
    </div>
    <div class="hot_news">
    最热新闻

             <asp:DataList ID="hot_news" runat="server">
            <ItemTemplate>
                <tr>
                    <td colspan="2" style="height: 20px">
                        <a href='content_news.aspx?newsid=<%# DataBinder.Eval(Container.DataItem, "Id")%>'> <%# DataBinder.Eval(Container.DataItem,"N_title")%></a>
                    </td>
                    <td style="width: 160px; height: 20px;">
                        『
                        <%# DataBinder.Eval(Container.DataItem,"Addtime")%>
                        』
                    </td>
                </tr>
            </ItemTemplate>
        </asp:DataList>
    </div>
    </div>
        
        
        
    </div>

    <div class="foot">尾部</div>
    </div>
    </form>
</body>
</html>
