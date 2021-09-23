using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;

public partial class user_reg : System.Web.UI.UserControl
{
    SQLHelp sqlhelp = new SQLHelp();
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void zhuce_Click(object sender, EventArgs e)
    {
        string user = UserName.Text.Trim();
        string pwd = Password.Text.Trim();

        DataSet ds = sqlhelp.GetDataSet("select Uname from [User] where Uname='" + user + "'","User");
        if (ds.Tables.Count == 1 && ds.Tables[0].Rows.Count != 0)
        {
            Response.Write(sqlhelp.MessageBox("您的用户名已经被注册"));
        }

        //if (sqlhelp.checkUserName(user))
        //{
        //    Response.Write(sqlhelp.MessageBox("您的用户名已经被注册"));
        //}
        else
        {
            string strsql = "insert into [User](Uname,Upwd,Utype) values('" + user + "','" + pwd + "','1')";
            if(sqlhelp.Execsql(strsql))
            {
                Response.Write(sqlhelp.MessageBox("注册成功"));
                Session["loginName"] = user;
            }
            else
            {
                Response.Write(sqlhelp.MessageBox("注册失败"));
            }
        }

    }
    protected void reg_cancle_Click(object sender, EventArgs e)
    {
        UserName.Text = "";
        Password.Text = "";
    }
}