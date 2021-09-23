using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;

public partial class content_news : System.Web.UI.Page
{
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
        //绑定新闻列表
        string newsID = Request.QueryString["newsid"];
        string sql_new = "select * from [News] where Id='" + newsID + "'";
        string sql = "update [News] set N_click= N_click + 1 where Id='"+newsID+"'";
        sqlhelp.Execsql(sql);
        DataSet ds = sqlhelp.GetDataSet(sql_new, "news");
        Lab_title.Text = ds.Tables[0].Rows[0]["N_title"].ToString();
        Lab_source.Text = ds.Tables[0].Rows[0]["N_source"].ToString();
        Lab_click.Text = ds.Tables[0].Rows[0]["N_click"].ToString();
        Lab_time.Text = ds.Tables[0].Rows[0]["Addtime"].ToString();
        Lab_content.Text = ds.Tables[0].Rows[0]["N_content"].ToString();
        Lab_author.Text = ds.Tables[0].Rows[0]["N_author"].ToString();

        //绑定评论列表
        DataList1.DataSource = sqlhelp.GetDataSet("SELECT [R_content], [Addtime], [R_user_id] FROM [remark]", "remark");
        DataList1.DataBind();
    }
    protected void But_addremark_Click(object sender, EventArgs e)
    {
        try
        {
            string loginID = Session["LoginID"].ToString();
            string newsID = Request.QueryString["newsid"];
            string sql = "insert into [remark](R_content,R_user_id,R_news_id) values('" + Text_remark.Text + "','" + loginID + "','" + newsID + "')";
            if (sqlhelp.Execsql(sql))
            {
                Response.Write(sqlhelp.MessageBox("添加评论成功"));
                Text_remark.Text = "";
                pagelist();
            }
            else
            {
                Response.Write(sqlhelp.MessageBox("添加评论失败"));
            }
        }
        catch
        {
            Response.Write(sqlhelp.MessageBox("您还没有登陆，请登陆后发表评论！"));
        }
    }
    protected void But_cancle_Click(object sender, EventArgs e)
    {
        Text_remark.Text = "";
    }
}