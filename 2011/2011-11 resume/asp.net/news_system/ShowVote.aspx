<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ShowVote.aspx.cs" Inherits="ShowVote" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:GridView ID="GridView1" runat="server" EnableModelValidation="True" 
            AutoGenerateColumns="False" >
            <Columns>
                <asp:BoundField DataField="V_item" HeaderText="投票项目"  />
                 <asp:TemplateField HeaderText="所占总票的百分比" ItemStyle-HorizontalAlign="Left" ItemStyle-BorderWidth="1">
                    <ItemStyle Width="300" />
                    <ItemTemplate>
                    <asp:Image ID="VoteImage" runat="server" Height="20" Width='<%# FormatVoteImage(FormatVoteCount(Eval("V_count").ToString())) %>' ImageUrl="" />
                    <%#FormatVoteCount(Eval("V_count").ToString()) %>%
                    </ItemTemplate>
                  </asp:TemplateField>
                <asp:BoundField DataField="V_count" HeaderText="票数" />
            </Columns>

        </asp:GridView>

        <br />
        <asp:Label ID="VoteMessage" runat="server" Text=""></asp:Label>
    
        
    
    </div>
    </form>
</body>
</html>
