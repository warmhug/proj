<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Modify_vote.aspx.cs" Inherits="Admin_Modify_vote" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>

<%--        <script language="javascript" type="text/javascript">             javascript切换按钮方法
            function expandcollapse(obj, row) {
                var div = document.getElementById(obj);
                var img = document.getElementById('img' + obj);

                if (div.style.display == "none") {
                    div.style.display = "block";
                    img.src = "../Images/minus.gif";
                }
                else {
                    div.style.display = "none";
                    img.src = "../Images/plus.gif";
                }
            } 
    </script>--%>
 


<%--jquery编写切换按钮 --%>
    <script src="../Scripts/jquery-1.4.1.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {

//        jquery用法一：
//        此段不用去掉嵌套gridview前的<tr><td colspan="100%">

            //           $("img").click(function () {
            //                var id = $(this).attr("id").substring(3);
            //                var src = $(this).attr("src");
            //                //                alert(src);
            //        //   var i = (src == "../Images/plus.gif") ? (src = "../Images/minus.gif") : (src = "../Images/plus.gif"); 可以这么写
            //                var i = src == "../Images/plus.gif" ? "../Images/minus.gif" : "../Images/plus.gif";
            //                $(this).attr("src", i)
            //                $("#div" + id).toggle(1000);
            //            });




//jquery用法二
//此处必须要去掉嵌套gridview前的<tr><td colspan="100%">
                    
            $("img").click(function () {
                 
                 var src = $(this).attr("src");
                var i = src == "../Images/plus.gif" ? "../Images/minus.gif" : "../Images/plus.gif";
                $(this).attr("src", i).parent().parent().find("div[id]").toggle();
                
            })
        })
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
    <h3 align="center">修改投票信息&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="Add_vote.aspx" >添加新投票</a></h3>

    </div>
    <div>
        <asp:GridView ID="GridView1" runat="server" AllowPaging="True" PageSize="10" AutoGenerateColumns="False" style="Z-INDEX: 101; LEFT: 8px; POSITION: absolute; TOP: 50px" Font-Size="Small"
            Font-Names="Verdana" BackColor="#F1F1F1"
          DataKeyNames="Id"  EnableModelValidation="True" OnRowEditing="GridView1_RowEditing" OnRowCancelingEdit="GridView1_RowCancelingEdit" 
          OnRowUpdating="GridView1_RowUpdating"  OnPageIndexChanging="GridView1_PageIndexChanging"
           OnRowDeleting="GridView1_RowDeleting" OnRowDataBound="GridView1_OnRowDataBound">
                             <RowStyle BackColor="Gainsboro" />
            <AlternatingRowStyle BackColor="White" />
            <HeaderStyle BackColor="#0083C1" ForeColor="White"/>
            <FooterStyle BackColor="White" />

            <Columns>
                <asp:TemplateField>
                        <ItemTemplate>
<%--                            <a href="javascript:expandcollapse('div<%# Eval("Id") %>', 'one');">
                                <img id="imgdiv<%# Eval("Id") %>" alt='点击查看帖子回复<%# Eval("Id") %>' width="15px" border="0" src="../Images/plus.gif" /></a>
--%>
                                 <img id="img<%# Eval("Id") %>"  alt="" width="15px" border="0" src="../Images/plus.gif" />
                        </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField HeaderText="Id" InsertVisible="False">
                    <ItemTemplate>
                        <asp:Label ID="Lab1" runat="server" Text='<%# Bind("Id") %>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField HeaderText="投票主题" >
                    <ItemTemplate>
                        <asp:Label ID="Lab2" runat="server" Text='<%# Bind("group_name") %>'></asp:Label>
                    </ItemTemplate>
                    <EditItemTemplate>
                        <asp:TextBox ID="Text_group" runat="server" Text='<%# Bind("group_name") %>'></asp:TextBox>
                    </EditItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField HeaderText="多选/单选" >
                    <ItemTemplate>
                        <asp:Label ID="Lab3" runat="server" Text='<%# Bind("group_type") %>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField HeaderText="添加时间" >
                    <ItemTemplate>
                        <asp:Label ID="Lab4" runat="server" Text='<%# Bind("addtime") %>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField ShowHeader="False">
                    <ItemTemplate>
                        <asp:LinkButton ID="LinkButton1" runat="server" CausesValidation="False" 
                            CommandName="Edit" Text="编辑"></asp:LinkButton>
                    </ItemTemplate>
                    <EditItemTemplate>
                        <asp:LinkButton ID="LinkButton1" runat="server" CausesValidation="True" 
                            CommandName="Update" Text="更新"></asp:LinkButton>
                        &nbsp;<asp:LinkButton ID="LinkButton3" runat="server" CausesValidation="False" 
                            CommandName="Cancel" Text="取消"></asp:LinkButton>
                    </EditItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField ShowHeader="False">
                    <ItemTemplate>
                        <asp:LinkButton ID="LinkButton2" runat="server" CausesValidation="False" 
                            CommandName="Delete" Text="删除"></asp:LinkButton>
                    </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField>
                <ItemTemplate>
                   <%-- <tr>
                    <td colspan="100%">--%>
<%--                    <div id="div<%# Eval("Id") %>" style="display:none;position:relative;left:15px;OVERFLOW: auto;WIDTH:97%" >--%>
                    <div id="div<%# Eval("Id") %>" style="display:none;position:relative;left:15px;OVERFLOW: auto;WIDTH:97%" >

      <asp:GridView ID="GridView2" runat="server"  BackColor="White" Width="100%" Font-Size="X-Small" AutoGenerateColumns="false" Font-Names="Verdana" 
                DataKeyNames="Id"   CellPadding="4" ForeColor="#333333" GridLines="None"   
          OnRowUpdating="GridView2_RowUpdating"
          OnRowDeleting="GridView2_RowDeleting"  >
                <RowStyle BackColor="#EFF3FB" />
                <FooterStyle BackColor="#507CD1" Font-Bold="True" ForeColor="White" />
                <Columns>
                <asp:TemplateField HeaderText="Id" InsertVisible="False">
                    <ItemTemplate>
                        <asp:Label ID="Lab_x" runat="server" Text='<%# Bind("Id") %>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField HeaderText="投票选项" >
<%--                    <ItemTemplate>
                        <asp:Label ID="Lab_detail" runat="server" Text='<%# Bind("V_item") %>'></asp:Label>
                    </ItemTemplate>--%>
                    <ItemTemplate>
                        <asp:TextBox ID="Text_detail" runat="server" Text='<%# Bind("V_item") %>'></asp:TextBox>
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField HeaderText="投票主题id" >
                    <ItemTemplate>
                        <asp:Label ID="Lab_id" runat="server" Text='<%# Bind("V_group_id") %>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField HeaderText="投票者id" >
                    <ItemTemplate>
                        <asp:Label ID="Lab_userid" runat="server" Text='<%# Bind("V_user_id") %>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField HeaderText="添加时间" >
                    <ItemTemplate>
                        <asp:Label ID="Lal4" runat="server" Text='<%# Bind("V_addtime") %>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>
                <asp:TemplateField HeaderText="票数" >
                    <ItemTemplate>
                        <asp:Label ID="Label4" runat="server" Text='<%# Bind("V_count") %>'></asp:Label>
                    </ItemTemplate>
                </asp:TemplateField>

<%--                   <asp:TemplateField ShowHeader="False">
                    <ItemTemplate>
                        <asp:LinkButton ID="LinkBut1" runat="server" CausesValidation="False" 
                            CommandName="Edit" Text="编辑"></asp:LinkButton>
                    </ItemTemplate>
                    <EditItemTemplate>
                        <asp:LinkButton ID="LinkButtn1" runat="server" CausesValidation="True" 
                            CommandName="Update" Text="更新"></asp:LinkButton>
                        &nbsp;<asp:LinkButton ID="LinkButtn3" runat="server" CausesValidation="False" 
                            CommandName="Cancel" Text="取消"></asp:LinkButton>
                    </EditItemTemplate>
                </asp:TemplateField>--%>

                <asp:TemplateField ShowHeader="false">
                <ItemTemplate>
                   <asp:LinkButton ID="LinkButtn1" runat="server" CausesValidation="True" 
                            CommandName="Update" Text="更新"></asp:LinkButton>
                </ItemTemplate>
                </asp:TemplateField>
                
                <asp:TemplateField ShowHeader="False">
                    <ItemTemplate>
                        <asp:LinkButton ID="LinkBtton2" runat="server" CausesValidation="False" 
                            CommandName="Delete" Text="删除"></asp:LinkButton>
                    </ItemTemplate>
                </asp:TemplateField>

                </Columns>
                    <EditRowStyle BackColor="#2461BF" />
                    <SelectedRowStyle BackColor="#D1DDF1" Font-Bold="True" ForeColor="#333333" />
                    <PagerStyle BackColor="#2461BF" ForeColor="White" HorizontalAlign="Center" />
                    <HeaderStyle BackColor="#507CD1" Font-Bold="True" ForeColor="White" />
                    <AlternatingRowStyle BackColor="White" />
                    </asp:GridView>
                    </div>
                   <%-- </td>
                    </tr>--%>
                </ItemTemplate>
                </asp:TemplateField>


            </Columns>
        </asp:GridView>

    </div>
    </form>
</body>
</html>
