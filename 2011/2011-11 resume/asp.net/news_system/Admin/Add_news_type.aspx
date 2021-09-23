<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Add_news_type.aspx.cs" Inherits="Admin_Add_news_type" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    <h3 style="text-align: center">增加新闻类别</h3>
        <asp:Label ID="Lab_id" runat="server" Text="类别id："></asp:Label>
        <asp:TextBox ID="Text_id" runat="server"></asp:TextBox><br />
        <asp:Label ID="Lab_addtype" runat="server" Text="添加类别："></asp:Label>
        <asp:TextBox ID="Text_addtype" runat="server"></asp:TextBox><br /><br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <asp:Button ID="But_addtype" runat="server" Text="增加" 
            onclick="But_addtype_Click" />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <asp:Button ID="But_cancel" runat="server" Text="取消" 
            onclick="But_cancel_Click" />
    </div>
    </form>
</body>
</html>
