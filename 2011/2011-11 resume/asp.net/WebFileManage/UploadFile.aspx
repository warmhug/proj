<%@ Page Language="C#" AutoEventWireup="true" CodeFile="UploadFile.aspx.cs" Inherits="UpLoadFile" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    文件名称：<asp:TextBox ID="Desn"  Width="150px" runat="server"></asp:TextBox>
        <asp:RequiredFieldValidator ID="rfN" runat="server" ErrorMessage="名称不能为空" ControlToValidate="Desn"></asp:RequiredFieldValidator>
        <br />
        文件内容：<input type="file" runat="server" id="upfile" size="50" /><br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <asp:Button ID="UploadBtn" runat="server" Text="上传文件" Width="100px" 
            CausesValidation="false" onclick="UploadBtn_Click"  />
       &nbsp;&nbsp;&nbsp;
       <asp:Button ID="ReturnBtn" runat="server" Text="返回" Width="100px" 
            CausesValidation="false" onclick="ReturnBtn_Click" />
        <asp:Label ID="SuccessMassage" runat="server" Text="" Font-Bold="true"  ForeColor="Red" Visible="false" Width="100%">上传文件成功！！</asp:Label>    
    </div>
    </form>
</body>
</html>
