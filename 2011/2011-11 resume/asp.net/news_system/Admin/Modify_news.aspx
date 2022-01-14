<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Modify_news.aspx.cs" Inherits="Admin_Modify_news" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    <h3 style="text-align: center">修改新闻</h3>
        <asp:Label ID="Lab_title" runat="server" Text="标题："></asp:Label>
        <asp:TextBox ID="Text_title" runat="server" Width="293px"></asp:TextBox><br /><br />
        <asp:Label ID="Lab_source" runat="server" Text="来源："></asp:Label>
        <asp:TextBox ID="Text_source" runat="server" Width="292px"></asp:TextBox><br /><br />
        <asp:Label ID="Lab_author" runat="server" Text="作者："></asp:Label>
        <asp:TextBox ID="Text_author" runat="server"></asp:TextBox><br /><br />
        <asp:Label ID="Lab_type" runat="server" Text="新闻类别："></asp:Label>
        <asp:DropDownList ID="DropDownList1" runat="server" DataTextField="Type_name" 
            DataValueField="Id" AutoPostBack="True">
        </asp:DropDownList>
        <br /><br />
        <asp:Label ID="Lab_content" runat="server" Text="新闻内容："></asp:Label><br />
        <asp:TextBox ID="Text_content" runat="server" Columns="100" Rows="50" 
            TextMode="MultiLine"></asp:TextBox><br /><br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <asp:Button ID="But_modify" runat="server" Text="修改" onclick="But_modify_Click" />&nbsp;&nbsp;&nbsp; 
        <asp:Button ID="But_cancel"
            runat="server" Text="取消" onclick="But_cancel_Click" /><br /><br />

    </div>
    </form>
</body>
</html>
