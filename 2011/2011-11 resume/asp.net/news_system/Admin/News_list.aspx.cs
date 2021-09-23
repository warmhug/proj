using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;

public partial class Admin_News_list : System.Web.UI.Page
{
    SQLHelp sqlhelp = new SQLHelp();
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            GridView1.DataSource = sqlhelp.GetDataSet("select * from [News]", "news");
            GridView1.DataBind();
            DataSet ds = sqlhelp.GetDataSet("SELECT * FROM [News_type]", "News_type");
            DropDownList1.DataSource = ds;
            DropDownList1.DataBind();
        }
    }
    protected void GridView1_RowDeleting(object sender,GridViewDeleteEventArgs e)
    {
        sqlhelp.Execsql("delete from [News] where Id='" + this.GridView1.DataKeys[e.RowIndex].Value.ToString() + "'");
        GridView1.DataSource = sqlhelp.GetDataSet("select * from [News] order by Addtime desc","news");
        GridView1.DataBind();
    }
    protected void GridView1_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        GridView1.PageIndex = e.NewPageIndex;
        GridView1.DataBind();
    }
    protected void GridView1_RowDataBound(object sender, GridViewRowEventArgs e)
    {
        if (e.Row.RowType == DataControlRowType.DataRow)
        {
            e.Row.Cells[5].Text = Convert.ToDateTime(e.Row.Cells[5].Text).ToShortDateString();
        }
    }
    protected void But_search_Click(object sender, EventArgs e)
    {
        string strtype = DropDownList1.SelectedValue;
        string strsql = "select * from [News] where N_type_id='" + strtype + "' and N_title like '%"+TextBox1.Text+"%'";
        GridView1.DataSource = sqlhelp.GetDataSet(strsql, "news");
        GridView1.DataBind();
    }
}