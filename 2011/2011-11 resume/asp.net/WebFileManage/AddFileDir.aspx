<%@ Page Language="C#" AutoEventWireup="true" CodeFile="AddFileDir.aspx.cs" Inherits="AddFileDir" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
       目录名称：
        <asp:TextBox ID="Desn"  Width="150px" runat="server"></asp:TextBox>
        <asp:RequiredFieldValidator ID="rfN" runat="server" ErrorMessage="目录名称不能为空" ControlToValidate="Desn"></asp:RequiredFieldValidator>
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <asp:Button ID="AddBtn" runat="server" Text="添加" Width="100px" 
            CausesValidation="true" onclick="AddBtn_Click" />
       &nbsp;&nbsp;&nbsp;
       <asp:Button ID="ReturnBtn" runat="server" Text="返回" Width="100px" 
            CausesValidation="false" onclick="ReturnBtn_Click" />
    </div>
    </form>
</body>
</html>
