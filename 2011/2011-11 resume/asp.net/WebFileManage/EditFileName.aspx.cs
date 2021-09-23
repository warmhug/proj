using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.Linq;
using WebDBManage;

public partial class EditFileName : System.Web.UI.Page
{
    int nFileID = -1;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Request.Params["FileID"] != null)
        {
            nFileID = Int32.Parse(Request.Params["FileID"].ToString());
        }
        UpdatedBtn.Enabled = nFileID > -1 ? true : false;
        if (!Page.IsPostBack)
        {
            //绑定数据
            if (nFileID > -1) { BindFileData(nFileID); }
        }
    }
    private void BindFileData(int nFileID)
    { 
       //获取数据
        DataClassesDataContext db = new DataClassesDataContext();
        //从存储过程返回数据
        var result = db.Pr_GetSingleFile(nFileID).Single();
        bool isDir = false;
        //判断是否有数据
        if (result != null)
        {
            //显示数据
            Desn.Text = result.Desn;
        }
    }
    protected void  UpdatedBtn_Click(object sender, EventArgs e)
    {
        //如果页面输入内容合法
        if(Page.IsValid == true)
        {
            DataClassesDataContext db=new DataClassesDataContext();
            try
            {
                //修改数据
                db.Pr_UpdateFile(nFileID,Desn.Text.Trim());
                //显示操作结果信息
                Response.Write("<script>window.alert('" + ASPNET2System.OPERATIONDELETESUCCESSMESSAGE + "')</script>");
            }
            catch (Exception ex)
            {
                Response.Write("<script>window.alert('添加失败')</script>");
            }
        }
    }
    protected void ReturnBtn_Click(object sender, EventArgs e)
    {
        Response.Redirect("~/FileList.aspx");
    }
}

