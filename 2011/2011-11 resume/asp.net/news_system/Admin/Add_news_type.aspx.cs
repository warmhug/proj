using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Admin_Add_news_type : System.Web.UI.Page
{
    SQLHelp sqlhelp = new SQLHelp();
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void But_addtype_Click(object sender, EventArgs e)
    {
        string sql = "insert into [News_type](Id,Type_name) values('"+Text_id.Text.Trim()+"','"+Text_addtype.Text.Trim()+"')";
        if (sqlhelp.Execsql(sql))
        {
            Response.Write(sqlhelp.MessageBox("添加类别成功！"));
            Text_id.Text = "";
            Text_addtype.Text = "";
        }
        else
        {
            Response.Write(sqlhelp.MessageBox("添加类别失败！"));
            Text_id.Text = "";
            Text_addtype.Text = "";
        }
    }
    protected void But_cancel_Click(object sender, EventArgs e)
    {
        Text_addtype.Text = "";
    }
}