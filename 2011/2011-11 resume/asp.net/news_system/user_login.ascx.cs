using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;

public partial class user_login : System.Web.UI.UserControl
{
    SQLHelp sqlhelp = new SQLHelp();
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void LoginButton_Click(object sender, EventArgs e)
    {
        //TextBox tb1 = (TextBox)LoginView1.FindControl("UserName");
        //TextBox tb2 = (TextBox)LoginView1.FindControl("Password");
        //string uname = tb1.Text.Trim();
        //string pwd = tb2.Text.Trim();
        string uname = UserName.Text.Trim();
        string pwd = Password.Text.Trim();
        //int i = sqlhelp.checkLogin(uname, pwd);
        //if (i > 0)
        //{
        //    Response.Write(sqlhelp.MessageBox("登录成功"));
        //    Session["loginName"] = uname;
        //}
        //else
        //{
        //    Response.Write(sqlhelp.MessageBox("登录失败"));
        //}

        string sqlLogin = "select * from [User] where Uname='"+uname+"' and Upwd='"+pwd+"'";
        DataSet ds = sqlhelp.GetDataSet(sqlLogin, "user");
        if(ds.Tables[0].Rows.Count>0)
        {
            Response.Write(sqlhelp.MessageBox("登录成功"));
            Session["loginName"] = uname;
            Session["LoginID"] = ds.Tables[0].Rows[0]["Id"].ToString();
            
        }
        else
        {
            Response.Write(sqlhelp.MessageBox("登录失败"));
        }

    }
}