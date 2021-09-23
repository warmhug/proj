using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;

public partial class Admin_Modify_vote : System.Web.UI.Page
{
    string gvuniqueID = string.Empty;
    SQLHelp sqlhelp = new SQLHelp();
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            pagelist();
        }
    }
    private void pagelist()
    {
        DataSet ds = sqlhelp.GetDataSet("select * from [Vote_group] order by addtime desc", "Vote_group");
        GridView1.DataSource = ds;
        GridView1.DataBind();
    }



    protected void GridView1_RowEditing(object sender, GridViewEditEventArgs e)
    {
        GridView1.EditIndex = e.NewEditIndex;
        pagelist();
    }
    protected void GridView1_RowCancelingEdit(object sender, GridViewCancelEditEventArgs e)
    {
        GridView1.EditIndex = -1;
        pagelist();
    }
    protected void GridView1_RowUpdating(object sender, GridViewUpdateEventArgs e)
    {
        string group_name = ((TextBox)GridView1.Rows[e.RowIndex].FindControl("Text_group")).Text.Trim();
        string UPsql = "update [Vote_group] set group_name='"+group_name+"' where Id='"+this.GridView1.DataKeys[e.RowIndex].Value.ToString()+"'";
        sqlhelp.Execsql(UPsql);
        GridView1.EditIndex = -1;
        pagelist();
    }

    protected void GridView1_RowDeleting(object sender, GridViewDeleteEventArgs e)
    {
        sqlhelp.Execsql("delete from [Vote_group] where Id='" + this.GridView1.DataKeys[e.RowIndex].Value.ToString() + "'");
        pagelist();
    }
    protected void GridView1_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        GridView1.PageIndex = e.NewPageIndex;
        pagelist();
    }
    protected void GridView1_OnRowDataBound(object sender, GridViewRowEventArgs e)
    {
        if (e.Row.RowType == DataControlRowType.DataRow)
        {

            GridView gv = new GridView();
            gv = (GridView)e.Row.FindControl("GridView2");
            string id = GridView1.DataKeys[e.Row.RowIndex].Value.ToString();

            int num = int.Parse(id);
            
            string sql="select * from [Vote] where V_group_id='"+num+"' order by V_addtime desc";
            DataSet ds = sqlhelp.GetDataSet(sql, "Vote");
            
            gv.DataSource = ds;
            gv.DataBind();
        }
    }

    /*嵌套GridView 中 编辑、更新 怎么做？？？？？
     * 
     * 
        protected void GridView2_RowEditing(object sender, GridViewEditEventArgs e)
        {
            GridView grid = (GridView)sender;
            grid.EditIndex = e.NewEditIndex;
            pagelist();
        }
        protected void GridView2_RowCancelingEdit(object sender, GridViewCancelEditEventArgs e)
        {
            GridView grid = (GridView)sender;
            grid.EditIndex = -1;
            pagelist();
        }
     * 
     * 
     * 
     * 
     * 
     */    
        protected void GridView2_RowUpdating(object sender, GridViewUpdateEventArgs e)
        {
            GridView grid = (GridView)sender;
            gvuniqueID = grid.UniqueID;
            string detail = ((TextBox)grid.Rows[e.RowIndex].FindControl("Text_detail")).Text;
            string sql = "update [Vote] set V_item='" + detail + "' where Id='"+grid.DataKeys[e.RowIndex].Value.ToString()+"'";
            sqlhelp.Execsql(sql);
            grid.EditIndex = -1;
            pagelist();

        }
 


    protected void GridView2_RowDeleting(object sender, GridViewDeleteEventArgs e)
    {
        GridView grid = (GridView)sender;
        gvuniqueID = grid.UniqueID;
        sqlhelp.Execsql("delete from [Vote] where Id='" + grid.DataKeys[e.RowIndex].Value.ToString() + "'");
        pagelist();
    }


}