using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;

public partial class Admin_Modify_news : System.Web.UI.Page
{
    SQLHelp sqlhelp = new SQLHelp();
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)//无刷新提交，很重要！！！！
        {
            DataSet ds1 = sqlhelp.GetDataSet("select * from [News]", "News");
            DataRow[] row = ds1.Tables[0].Select("Id=" + Request.QueryString["nId"]);
            foreach (DataRow dr in row)
            {
                Text_title.Text = dr["N_title"].ToString();
                Text_source.Text = dr["N_source"].ToString();
                Text_author.Text = dr["N_author"].ToString();
                Text_content.Text = dr["N_content"].ToString();
            }
            DataSet ds = sqlhelp.GetDataSet("select * from [News_type]", "News_type");
            DropDownList1.DataSource = ds;
            DropDownList1.DataBind();
            //Response.Write(DropDownList1);
        }
    }
    protected void But_modify_Click(object sender, EventArgs e)
    {
        string strtype=DropDownList1.SelectedValue;
        string upstr = "update [News] set N_title='" + Text_title.Text + "',N_source='" + Text_source.Text + "',N_author='" + Text_author.Text + "',N_content='" + Text_content.Text + "',N_type_id='" + strtype + "' where Id=" + Request.QueryString["nId"];
        sqlhelp.Execsql(upstr);
        Response.Write(sqlhelp.MessageBox("修改新闻成功"));
    }
    protected void But_cancel_Click(object sender, EventArgs e)
    {
        Text_title.Text = "";
        Text_source.Text = "";
        
    }
}