<%@ Page Language="C#" AutoEventWireup="true" CodeFile="list_news.aspx.cs" Inherits="list_news" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:DataList ID="list" runat="server">
            <ItemTemplate>
                <tr>
                    <td style="width: 90px; height: 20px;">
                         『
                        <%# DataBinder.Eval(Container.DataItem,"Type_name")%>
                        』
                    </td>
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
    </form>
</body>
</html>
