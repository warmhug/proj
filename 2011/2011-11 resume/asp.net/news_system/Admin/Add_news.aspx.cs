using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;

public partial class Admin_Add_news : System.Web.UI.Page
{
    SQLHelp sqlhelp = new SQLHelp();
    
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)//无刷新提交，很重要！！！！
        {
            DataSet ds = sqlhelp.GetDataSet("select * from [News_type]", "News_type");
            DropDownList1.DataSource = ds;
            DropDownList1.DataBind();
            //Response.Write(DropDownList1);
        }
        
        

    }
    protected void But_add_Click(object sender, EventArgs e)
    {
        string typeID = DropDownList1.SelectedValue;
        string sql="insert into [News](N_title,N_author,N_source,N_content,N_type_id) values('"+Text_title.Text+"','"+Text_author.Text+"','"+Text_source.Text+"','"+Text_content.Text+"','"+typeID+"')";
        Response.Write(sql);
        if (sqlhelp.Execsql(sql))
        {
            Response.Write(sqlhelp.MessageBox("add news successful"));
            Text_title.Text = "";
        }
        else
        {
            Response.Write(sqlhelp.MessageBox("add news faily"));
            Text_title.Text = "";
        }
    }
    protected void But_cancel_Click(object sender, EventArgs e)
    {
        Text_title.Text = "";
        Text_source.Text = "";
        Text_content.Text = "";
        Text_author.Text = "";
    }
}