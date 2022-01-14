<%@ Page Language="C#" AutoEventWireup="true" CodeFile="content_news.aspx.cs" Inherits="content_news" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style type="text/css">
        .style1
        {
            width: 100%;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div align="center">
        <asp:Label ID="Lab_title" runat="server" Text=""></asp:Label><br /><br />
        <asp:Label ID="Label6" runat="server" Text="来源："></asp:Label>
        <asp:Label ID="Lab_source" runat="server" Text=""></asp:Label>
        &nbsp;
        <asp:Label ID="Label2" runat="server" Text="点击量："></asp:Label>
        <asp:Label ID="Lab_click" runat="server" Text=""></asp:Label>
        &nbsp;
        <asp:Label ID="Label3" runat="server" Text="发布时间："></asp:Label>
        <asp:Label ID="Lab_time" runat="server" Text=""></asp:Label>
        
    </div>
    <div>
        <asp:Label ID="Lab_content" runat="server" Text=""></asp:Label><br /><br />
        <asp:Label ID="Lab_author" runat="server" Text=""></asp:Label>
    </div>
    <div>
        <asp:DataList ID="DataList1" runat="server" >
            <ItemTemplate>
            
                <table cellpadding="0" cellspacing="0" class="style1">
                    <tr>
                        <td colspan="4">
                            <asp:Label ID="R_contentLabel" runat="server" Text='<%# Eval("R_content") %>' />&nbsp;</td>
                    </tr>
                    <tr>
                        <td style="text-align: right">
                            评论者：&nbsp;</td>
                        <td>
                            <asp:Label ID="R_user_idLabel" runat="server" Text='<%# Eval("R_user_id") %>' />&nbsp;</td>
                        <td>
                            评论时间：&nbsp;</td>
                        <td>
                            <asp:Label ID="AddtimeLabel" runat="server" Text='<%# Eval("Addtime") %>' />&nbsp;</td>
                    </tr>
                </table>
               
            </ItemTemplate>
        </asp:DataList>

    </div>
    <div>
        <asp:Label ID="Label1" runat="server" Text="添加评论："></asp:Label><br /><br />
        <asp:TextBox ID="Text_remark" runat="server" Columns="50" Rows="10" 
            TextMode="MultiLine"></asp:TextBox><br /><br />
        &nbsp;
        <asp:Button ID="But_addremark" runat="server" Text="添加评论" 
            onclick="But_addremark_Click" />
        &nbsp;&nbsp;&nbsp;
        <asp:Button ID="But_cancle" runat="server" Text="取消" 
            onclick="But_cancle_Click" />
    
    </div>
    </form>
</body>
</html>
