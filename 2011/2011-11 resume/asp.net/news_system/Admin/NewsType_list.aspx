<%@ Page Language="C#" AutoEventWireup="true" CodeFile="NewsType_list.aspx.cs" Inherits="Admin_NewsType_list" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    <h3 style="text-align: center">新闻类型管理</h3>
    <div><asp:HyperLink ID="HyperLink1" runat="server" NavigateUrl="~/Admin/Add_news_type.aspx">增加新闻类型</asp:HyperLink></div><br />
        <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" 
            DataKeyNames="Id" DataSourceID="SqlDataSource1" EnableModelValidation="True">
            <Columns>
                <asp:CommandField ShowDeleteButton="True" ShowEditButton="True" />
                <asp:BoundField DataField="Id" HeaderText="Id" InsertVisible="False" 
                    ReadOnly="True" SortExpression="Id" />
                <asp:BoundField DataField="Type_name" HeaderText="Type_name" 
                    SortExpression="Type_name" />
            </Columns>
        </asp:GridView>
        <asp:SqlDataSource ID="SqlDataSource1" runat="server" 
            ConflictDetection="CompareAllValues" 
            ConnectionString="Data Source=HUA-PC;Initial Catalog=news_system;Integrated Security=True" 
            DeleteCommand="DELETE FROM [News_type] WHERE [Id] = @original_Id AND (([Type_name] = @original_Type_name) OR ([Type_name] IS NULL AND @original_Type_name IS NULL))" 
            InsertCommand="INSERT INTO [News_type] ([Type_name]) VALUES (@Type_name)" 
            OldValuesParameterFormatString="original_{0}" 
            ProviderName="System.Data.SqlClient" SelectCommand="SELECT * FROM [News_type]" 
            UpdateCommand="UPDATE [News_type] SET [Type_name] = @Type_name WHERE [Id] = @original_Id AND (([Type_name] = @original_Type_name) OR ([Type_name] IS NULL AND @original_Type_name IS NULL))">
            <DeleteParameters>
                <asp:Parameter Name="original_Id" Type="Int32" />
                <asp:Parameter Name="original_Type_name" Type="String" />
            </DeleteParameters>
            <InsertParameters>
                <asp:Parameter Name="Type_name" Type="String" />
            </InsertParameters>
            <UpdateParameters>
                <asp:Parameter Name="Type_name" Type="String" />
                <asp:Parameter Name="original_Id" Type="Int32" />
                <asp:Parameter Name="original_Type_name" Type="String" />
            </UpdateParameters>
        </asp:SqlDataSource>
    </div>
    </form>
</body>
</html>
