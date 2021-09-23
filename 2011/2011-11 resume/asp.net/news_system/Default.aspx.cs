using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;

public partial class _Default : System.Web.UI.Page 
{
    SQLHelp sqlhelp = new SQLHelp();
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            string sql1 = "select top 5 * from [News] order by Addtime desc";
            new_news.DataSource = sqlhelp.GetDataSet(sql1, "news");
            new_news.DataBind();

            string sql2 = "select top 5 * from [News] order by N_click desc";
            hot_news.DataSource = sqlhelp.GetDataSet(sql2,"news");
            hot_news.DataBind();
        }
    }
}