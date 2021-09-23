<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Add_vote.aspx.cs" Inherits="Admin_Add_vote" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div align="center">
    <h3>添加投票项目</h3>
    </div>
    <div>
        <asp:Label ID="Label3" runat="server" Text="设置投票类型："></asp:Label>
        <asp:RadioButtonList ID="RadioButtonList1" runat="server" Height="22px" 
            RepeatDirection="Horizontal" Width="166px">
        <asp:ListItem Value="0">单选</asp:ListItem>
        <asp:ListItem Value="1">多选</asp:ListItem>
        </asp:RadioButtonList><br />
        <asp:Label ID="Label1" runat="server" Text="添加投票主题名称："></asp:Label>
        <asp:TextBox ID="Text_title" runat="server" Width="220px"></asp:TextBox><br /><br />
        &nbsp;&nbsp;&nbsp;
        <asp:Button ID="But_addtitle" runat="server" Text="添加主题" 
            onclick="But_addtitle_Click" />
        &nbsp;&nbsp;&nbsp;
        <asp:Button ID="cancel" runat="server" Text="取消" onclick="cancel_Click" /><br />
        <asp:Label ID="Lab_meg" runat="server" Text=""></asp:Label><br /><br /><br />
        
    </div>
    </form>
</body>
</html>
