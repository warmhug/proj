<%@ Control Language="C#" AutoEventWireup="true" CodeFile="user_reg.ascx.cs" Inherits="user_reg" %>

                <table>
                    <tr>
                        <td align="center" colspan="2">
                            注册新帐户</td>
                    </tr>
                    <tr>
                        <td align="right">
                            <asp:Label ID="UserNameLabel" runat="server" AssociatedControlID="UserName">用户名:</asp:Label>
                        </td>
                        <td>
                            <asp:TextBox ID="UserName" runat="server"></asp:TextBox>
                            <asp:RequiredFieldValidator ID="UserNameRequired" runat="server" 
                                ControlToValidate="UserName" ErrorMessage="必须填写“用户名”。" ToolTip="必须填写“用户名”。" 
                                ValidationGroup="CreateUserWizard1">*</asp:RequiredFieldValidator>
                        </td>
                    </tr>
                    <tr>
                        <td align="right">
                            <asp:Label ID="PasswordLabel" runat="server" AssociatedControlID="Password">密码:</asp:Label>
                        </td>
                        <td>
                            <asp:TextBox ID="Password" runat="server" TextMode="Password"></asp:TextBox>
                            <asp:RequiredFieldValidator ID="PasswordRequired" runat="server" 
                                ControlToValidate="Password" ErrorMessage="必须填写“密码”。" ToolTip="必须填写“密码”。" 
                                ValidationGroup="CreateUserWizard1">*</asp:RequiredFieldValidator>
                        </td>
                    </tr>
                    <tr>
                        <td align="right">
                            <asp:Label ID="ConfirmPasswordLabel" runat="server" 
                                AssociatedControlID="ConfirmPassword">确认密码:</asp:Label>
                        </td>
                        <td>
                            <asp:TextBox ID="ConfirmPassword" runat="server" TextMode="Password"></asp:TextBox>
                            <asp:RequiredFieldValidator ID="ConfirmPasswordRequired" runat="server" 
                                ControlToValidate="ConfirmPassword" ErrorMessage="必须填写“确认密码”。" 
                                ToolTip="必须填写“确认密码”。" ValidationGroup="CreateUserWizard1">*</asp:RequiredFieldValidator>
                        </td>
                    </tr>
                    
                    <tr>
                        <td align="center" colspan="2">
                            <asp:CompareValidator ID="PasswordCompare" runat="server" 
                                ControlToCompare="Password" ControlToValidate="ConfirmPassword" 
                                Display="Dynamic" ErrorMessage="“密码”和“确认密码”必须匹配。" 
                                ValidationGroup="CreateUserWizard1"></asp:CompareValidator>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" colspan="2" style="color:Red;">
                            <asp:Literal ID="ErrorMessage" runat="server" EnableViewState="False"></asp:Literal>
                        </td>
                    </tr>
                    <tr>
                    <td align="right" >
                        <asp:Button ID="reg_cancle" runat="server" Text="取消" 
                            onclick="reg_cancle_Click" />
                    </td>
                    <td align="center" >
                        <asp:Button ID="zhuce" runat="server" Text="注册" onclick="zhuce_Click" /></td>
                    </tr>
                </table>

