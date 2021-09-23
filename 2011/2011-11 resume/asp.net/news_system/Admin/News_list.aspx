<%@ Page Language="C#" AutoEventWireup="true" CodeFile="News_list.aspx.cs" Inherits="Admin_News_list" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div align="center"><h3>新闻列表页面</h3></div>
    <div>
        <asp:Label ID="Label1" runat="server" Text="新闻标题："></asp:Label>
        <asp:TextBox ID="TextBox1" runat="server"></asp:TextBox>
        &nbsp;
        <asp:DropDownList ID="DropDownList1" runat="server" AutoPostBack="True" 
            DataTextField="Type_name" DataValueField="Id">
        </asp:DropDownList>
        &nbsp;&nbsp;
        <asp:Button ID="But_search" runat="server" Text="搜索新闻" 
            onclick="But_search_Click" />
    </div><br />
    <div>
        <asp:GridView ID="GridView1" runat="server" AllowPaging="True" PageSize="20" 
             AutoGenerateColumns="False" DataKeyNames="Id"  EnableModelValidation="True"
            OnPageIndexChanging="GridView1_PageIndexChanging" OnRowDeleting="GridView1_RowDeleting" 
            OnRowDataBound="GridView1_RowDataBound">
            <Columns>
                <asp:BoundField DataField="Id" HeaderText="Id" InsertVisible="False" 
                    ReadOnly="True" />
                <asp:BoundField DataField="N_title" HeaderText="新闻标题" />
                <asp:BoundField DataField="N_author" HeaderText="新闻作者" />
                <asp:BoundField DataField="N_source" HeaderText="新闻来源" />
                <asp:BoundField DataField="N_click" HeaderText="点击量" />
                <asp:BoundField DataField="Addtime" HeaderText="添加时间" />
                <asp:HyperLinkField Text="修改新闻" DataNavigateUrlFields="Id" 
                    DataNavigateUrlFormatString="Modify_news.aspx?nId={0}" />
                <asp:TemplateField ShowHeader="False">
                    <ItemTemplate>
                        <asp:LinkButton ID="LinkButton1" runat="server" CausesValidation="False" 
                            CommandName="Delete" Text="删除" OnClientClick="return confirm('确认要删除吗？');"></asp:LinkButton>
                    </ItemTemplate>
                </asp:TemplateField>
            </Columns>
        </asp:GridView>

    </div>
    </form>
</body>
</html>
