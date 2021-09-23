using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class list_news : System.Web.UI.Page
{
    SQLHelp sqlhelp=new SQLHelp();
    protected void Page_Load(object sender, EventArgs e)
    {
        //注意sql语句的写法
        string sN_type_id = Request.QueryString["N_type_id"];
        //list.DataSource = sqlhelp.GetDataSet("select * from [News] n inner join [News_type] t on n.N_type_id=t.Id and n.N_type_id=N_type_id  order by n.Addtime desc ", "News");
        //Response.Write(sN_type_id);
        string sql = "select * from [News],[News_type] where [News].N_type_id=[News_type].Id and  [News].N_type_id="+sN_type_id+"order by [News].Addtime desc ";
        list.DataSource = sqlhelp.GetDataSet(sql, "News");
        //Response.Write(sql);
        list.DataBind();
       
    }
}