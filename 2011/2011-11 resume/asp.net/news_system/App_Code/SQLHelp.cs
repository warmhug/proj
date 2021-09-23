using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

/// <summary>
///SQLHelp 的摘要说明
/// </summary>
public class SQLHelp
{
	public SQLHelp()
	{
		//
		//TODO: 在此处添加构造函数逻辑
		//
	}

    //说明：用于在客户端弹出对话框
    //参数：Message是对话框中显示的内容
    public string MessageBox(string Message)
    {
        string str;
        str = "<script language=javascript>alert('" + Message + "')</script>";
        return str;
    }

    ////说明：用于检测用户名是否已经被注册
    ////返回值：是否被注册（true/false）
    ////参数：username 要注册的用户名
    //public Boolean checkUserName(string username)
    //{
    //    SqlConnection conn = new SqlConnection(System.Configuration.ConfigurationSettings.AppSettings["strconn"]);
    //    conn.Open();
    //    SqlCommand cmd = new SqlCommand("select Uname from [User] where Uname='"+username+"'", conn);
    //    SqlDataReader sdr=cmd.ExecuteReader();
    //    if(sdr.Read())
    //    {
    //        return true; //用户名已被注册
    //        conn.Close();
    //    }
    //    else
    //    {
    //        return false;
    //        conn.Close();
    //    }
    //}


    //说明：用于执行sql语句
    //返回值：操作是否成功（false/true）
    //参数：strsql 是SQL字符串
    public Boolean Execsql(string strsql)
    {
        SqlConnection conn = new SqlConnection(System.Configuration.ConfigurationSettings.AppSettings["strconn"]);
        conn.Open();
        SqlCommand cmd = new SqlCommand(strsql, conn);
        try
        {
            cmd.ExecuteNonQuery();
            conn.Close();
        }
        catch
        {
            conn.Close();
            return false;
        }
        return true;
    }


    //说明：GetDataSet数据集，返回数据源的数据集。
    //返回值：数据集DataSet.
    //参数：strsql SQL字符串，TableName 数据表名称
    public DataSet GetDataSet(string strsql, string TableName)
    {
        SqlConnection conn = new SqlConnection(System.Configuration.ConfigurationSettings.AppSettings["strconn"]);
        conn.Open();
        SqlDataAdapter da = new SqlDataAdapter(strsql, conn);
        DataSet dataset = new DataSet();
        da.Fill(dataset, TableName);
        conn.Close();
        return dataset;
    }


    //说明：SubStr 用来将字符串保留到指定的长度，将超出部分用“...”代替。
    //返回值：处理后的字符串。
    //参数：Sstr原字符串，nlen给定的长度，nStrLen保留的字符串长度，newstr保留的新字符串
    public string SubStr(string Sstr, int nlen)
    {
        if (Sstr.Length <= nlen)
        {
            return Sstr;
        }
        int nStrLen = nlen - 5;
        string newstr = Sstr.Substring(0, nStrLen);
        newstr = newstr + "...";
        return newstr;
    }


    //说明：用来检测用户的登录信息
    //返回值：返回受影响的行数
    //参数：Name用户登录的用户名， Pwd用户的登录密码
    public int checkLogin(string Name, string Pwd)
    {
        SqlConnection conn = new SqlConnection(System.Configuration.ConfigurationSettings.AppSettings["strconn"]);
        //conn.Open();
        SqlCommand cmd = new SqlCommand("select count(*) from [User] where Uname=@Name and Upwd=@Pwd", conn);
        cmd.Parameters.Add(new SqlParameter("@Name", SqlDbType.VarChar, 50));
        cmd.Parameters["@Name"].Value = Name;
        cmd.Parameters.Add(new SqlParameter("@Pwd", SqlDbType.VarChar, 50));
        cmd.Parameters["@Pwd"].Value = Pwd;
        cmd.Connection.Open();
        int i = (int)cmd.ExecuteScalar();
        cmd.Connection.Close();
        return i;
    }




}