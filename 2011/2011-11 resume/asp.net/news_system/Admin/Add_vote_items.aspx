<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Add_vote_items.aspx.cs" Inherits="Admin_Add_vote_items" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div align="center">
    <h3>添加投票选项</h3>
    </div>
    <div>
        <asp:Label ID="Label1" runat="server" Text="您的投票主题为："></asp:Label>
        <asp:Label ID="Lab_title" runat="server" Text=""></asp:Label><br /><br />
        <asp:Label ID="Label6" runat="server" Text="您的投票类型为："></asp:Label>
        <asp:Label ID="Lab_type" runat="server" Text=""></asp:Label><br /><br /><br />
    <asp:Label ID="Label2" runat="server" Text="添加投票子项目："></asp:Label>
        <asp:TextBox ID="Text_item" runat="server" Width="384px"></asp:TextBox>
        <asp:Label ID="Label4" runat="server" Text="可添加多个投票选项"></asp:Label>
        <br />
        
        <br />
        &nbsp;&nbsp;
        <asp:Button ID="But_add" runat="server" Text="添加" onclick="But_add_Click" />
        &nbsp;&nbsp;
        <asp:Button ID="Butt_cancel" runat="server" Text="取消" onclick="Butt_cancel_Click" />
        <br /><br />
        <asp:Label ID="Lab_mes" runat="server" Text=""></asp:Label>
    </div>
    </form>
</body>
</html>
