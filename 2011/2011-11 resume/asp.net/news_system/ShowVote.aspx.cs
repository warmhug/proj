using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;

public partial class ShowVote : System.Web.UI.Page
{
    SQLHelp sqlhelp = new SQLHelp();
    int VoteTotal = 0;
    //string imgurl;
    protected void Page_Load(object sender, EventArgs e)
    {
 
        //string sql1 = "select top 1 * from [Vote_group] order by addtime desc";
        //DataSet ds1 = sqlhelp.GetDataSet(sql1, "Vote_group");
        //Lab_title.Text = ds1.Tables[0].Rows[0][1].ToString();
        string sql2 = "select * from [Vote] where V_group_id=(select top 1 Id from [Vote_group] order by addtime desc)";
        DataSet ds2 = sqlhelp.GetDataSet(sql2, "Vote");
        foreach(DataRow dr in ds2.Tables[0].Rows)
        {
            //Response.Write(dr["V_count"].ToString());
            VoteTotal += Int32.Parse(dr["V_count"].ToString());
        }
        VoteMessage.Text = "总票数为：" + VoteTotal.ToString();

        if (!IsPostBack)  //注意此无刷新的用法。。。
        {

            GridView1.DataSource = ds2;
            GridView1.DataBind();
            for (int j = 0,q=0; j < GridView1.Rows.Count; j++)  //注意算法的设计
            {
                //imgurl = ((Image)GridView1.Rows[j].FindControl("VoteImage")).ImageUrl.ToString();
                //int q = 0;
                if (q < 4)
                {
                    ((Image)GridView1.Rows[j].FindControl("VoteImage")).ImageUrl = "~/Images/vote(" + q + ").gif";
                    q++;
                }
                else
                {
                    q = 0;
                    ((Image)GridView1.Rows[j].FindControl("VoteImage")).ImageUrl = "~/Images/vote(" + q + ").gif";
                    q++;
                }
               
 
            }
        
        }


    }



    public int FormatVoteCount(String VoteCount)
    {
        //如果投票项目没有被投票
        if (VoteCount.Length <= 0)
        {
            //返回0个百分比
            return (0);

        }
        if (VoteTotal > 0)
        {
            //返回实际百分比
            return ((Int32.Parse(VoteCount) * 100 / VoteTotal));
        }
        return (0);
    }
    public int FormatVoteImage(int VoteCount)
    {
        //返回百分比的图像长度
        return (VoteCount * 3);

    }


}