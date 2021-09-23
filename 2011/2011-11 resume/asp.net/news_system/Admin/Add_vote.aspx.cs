using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;

public partial class Admin_Add_vote : System.Web.UI.Page
{
    SQLHelp sqlhelp = new SQLHelp();
    
    //Boolean is_Addtitle = false;
    protected void Page_Load(object sender, EventArgs e)
    {
        
    }

    protected void But_addtitle_Click(object sender, EventArgs e)
    {
        string vote_type = RadioButtonList1.SelectedValue;
        string sql1 = "insert into [Vote_group](group_name,group_type) values('" + Text_title.Text + "','" + vote_type + "')";
        if (sqlhelp.Execsql(sql1))
        {
            //this.is_Addtitle = true;
            Lab_meg.Text = "添加投票主题成功！！";
            Session["group_name"] = Text_title.Text;
            Session["vote_type"] = vote_type;
            Response.Write("<script>alert('添加投票主题成功，跳转到添加投票选项页面！');window.location.href='Add_vote_items.aspx';</script>");

        }
        else
        {
            //this.is_Addtitle = false;
            Lab_meg.Text = "添加投票主题失败？";
        }
    }
    protected void cancel_Click(object sender, EventArgs e)
    {
        Text_title.Text = "";
    }
    //protected void But_add_Click(object sender, EventArgs e)
    //{
    //    string vote_type = RadioButtonList1.SelectedValue;
    //    string sql1 = "insert into [Vote_group](group_name,group_type) values('" + Text_title.Text + "','" + vote_type + "')";

    //    string sql2 = "insert into [Vote](V_item,V_group_id) values('" + Text_item.Text + "','" + vote_type + "')";
    //    if (sqlhelp.Execsql(sql1))
    //    {
    //        Text_title.ReadOnly = true;
    //        if (sqlhelp.Execsql(sql2))
    //        {
    //            Response.Write(sqlhelp.MessageBox("添加投票选项成功"));
    //            Text_item.Text = "";
    //        }
    //        else
    //        {
    //            Response.Write(sqlhelp.MessageBox("添加投票选项失败"));
    //            Text_item.Text = "";
    //        }
    //    }
    //    else
    //    {
    //        Response.Write(sqlhelp.MessageBox("您没有成功添加投票主题，请先添加投票主题！"));
    //    }

    //}
    //protected void Butt_cancel_Click(object sender, EventArgs e)
    //{
    //    Text_item.Text = "";
    //    Text_title.ReadOnly = false;
    //    Text_title.Text = "";
    //    //RadioButtonList1.SelectedValue = "";
    //    //RadioButtonList1.Items.Clear();
    //}


}