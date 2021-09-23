<%@ Control Language="C#" AutoEventWireup="true" CodeFile="vote.ascx.cs" Inherits="vote" %>
<div><h3>
    <asp:Label ID="Lab_title" runat="server" Text=""></asp:Label></h3>
    (<asp:Label ID="Lab_type" runat="server" Text=""></asp:Label>)</div>
<div>
<asp:RadioButtonList ID="RadioButtonList1" runat="server" 
     DataTextField="V_item" DataValueField="Id" Visible="False">
</asp:RadioButtonList>
<asp:CheckBoxList ID="CheckBoxList1" runat="server" DataTextField="V_item" DataValueField="Id" Visible="False">
</asp:CheckBoxList>
</div><br />
<div>
    <asp:Button ID="But_vote" runat="server" Text="投票" onclick="But_vote_Click" />&nbsp;&nbsp;
    <asp:HyperLink ID="HyperLink1" runat="server" NavigateUrl="~/ShowVote.aspx">显示投票结果</asp:HyperLink>
    <br /><br />
    <asp:Label ID="Lab_mes" runat="server" Text=""></asp:Label>
</div>