using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;

public partial class Admin_Add_vote_items : System.Web.UI.Page
{
    SQLHelp sqlhelp = new SQLHelp();
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            Lab_title.Text = Session["group_name"].ToString();
            //Lab_type.Text = Session["vote_type"].ToString();
            string vote_type = Session["vote_type"].ToString();
            if (vote_type == "0")
            {
                Lab_type.Text = "单选";
            }
            else
            {
                Lab_type.Text = "多选";
            }
        }

    }
    protected void But_add_Click(object sender, EventArgs e)
    {
        string selectSQL="select * from [Vote_group] where group_name='"+Session["group_name"].ToString()+"' and group_type='"+Session["vote_type"].ToString()+"'";
        DataSet ds=sqlhelp.GetDataSet(selectSQL,"Vote_group");
        string vid = ds.Tables[0].Rows[0][0].ToString();
        //Response.Write(vid);
        string insertSQL = "insert into [Vote](V_item,V_group_id) values('" + Text_item.Text + "','"+vid+"')";
        if (sqlhelp.Execsql(insertSQL))
        {
            Lab_mes.Text = "添加选项成功，您可以继续添加";
            Text_item.Text = "";
            
        }
        else
        {
            Response.Write(sqlhelp.MessageBox("添加选项失败"));
        }
    }
    protected void Butt_cancel_Click(object sender, EventArgs e)
    {
        Text_item.Text = "";
    }
}