using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;

public partial class Admin_Modify_user : System.Web.UI.Page
{
    SQLHelp sqlhelp = new SQLHelp();
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            string sql = "select * from [User] order by Reg_time desc";
            GridView1.DataSource = sqlhelp.GetDataSet(sql, "User");
            GridView1.DataBind();
        }

    }
    protected void GridView1_RowDeleting(object sender, GridViewDeleteEventArgs e)
    {
        sqlhelp.Execsql("delete from [User] where Id='" + this.GridView1.DataKeys[e.RowIndex].Value.ToString() + "'");
        GridView1.DataSource = sqlhelp.GetDataSet("select * from [User] order by Reg_time desc", "User");
        GridView1.DataBind();
    }
    protected void GridView1_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        GridView1.PageIndex = e.NewPageIndex;
        GridView1.DataBind();
    }


    protected void LinkButton1_Click(object sender, EventArgs e)
    {

    }
}