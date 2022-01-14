using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;

public partial class vote : System.Web.UI.UserControl
{
    SQLHelp sqlhelp = new SQLHelp();
    //string check_id;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            string sql1 = "select top 1 * from [Vote_group] order by addtime desc";
            DataSet ds1 = sqlhelp.GetDataSet(sql1, "Vote_group");
            Lab_title.Text = ds1.Tables[0].Rows[0][1].ToString();
            string sql2 = "select * from [Vote] where V_group_id='" + ds1.Tables[0].Rows[0][0].ToString() + "'";
            DataSet ds2 = sqlhelp.GetDataSet(sql2, "Vote");
            string v_type = ds1.Tables[0].Rows[0][2].ToString();
            if (v_type == "0")
            {
                Lab_type.Text = "单选";
                RadioButtonList1.Visible = true;
                CheckBoxList1.Visible = false;
                RadioButtonList1.DataSource = ds2;
                RadioButtonList1.DataBind();
                //this.check_id = RadioButtonList1.SelectedValue.ToString();
            }
            else
            {
                Lab_type.Text = "多选";
                RadioButtonList1.Visible = false;
                CheckBoxList1.Visible = true;
                CheckBoxList1.DataSource = ds2;
                CheckBoxList1.DataBind();
                //this.check_id = CheckBoxList1.SelectedValue.ToString();
            }
        }
    }
    protected void But_vote_Click(object sender, EventArgs e)
    {
        string check_id;
        if (RadioButtonList1.Visible == true)
        {
            check_id = RadioButtonList1.SelectedValue;
            string upsql = "update [Vote] set V_count=V_count+1 where Id='" + check_id + "'";
            if (sqlhelp.Execsql(upsql))
            {
                Lab_mes.Text = "投票成功";
            }
        }
        else
        {
            int n = CheckBoxList1.Items.Count;
            for (int i = 0; i < n; i++)
            {
                if (CheckBoxList1.Items[i].Selected)
                {
                    string m = CheckBoxList1.Items[i].Value.ToString();
                    string upsql = "update [Vote] set V_count=V_count+1 where Id='" + m + "'";
                    if (sqlhelp.Execsql(upsql))
                    {
                        Lab_mes.Text = "投票成功";
                    }
                }
            }     
        }
        
        //string upsql = "update [Vote] set V_count=V_count+1 where Id='" + check_id + "'";
        
        //if (sqlhelp.Execsql(upsql))
        //{
        //    Lab_mes.Text = "投票成功";
        //}
    }
}