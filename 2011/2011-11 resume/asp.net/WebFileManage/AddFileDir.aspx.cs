using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.Linq;
using WebDBManage;

public partial class AddFileDir : System.Web.UI.Page
{
    int nParentID = -1;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Request.Params["FileID"] != null)
        {
            nParentID = Int32.Parse(Request.Params["FileID"].ToString());
        }
        AddBtn.Enabled = nParentID > -1 && GetFileIsDir(nParentID) ? true : false;
    }
    private bool GetFileIsDir(int nFileID)
    {
        //获取数据
        DataClassesDataContext db = new DataClassesDataContext();
        //从存储过程返回数据
        var result = db.Pr_GetSingleFile(nFileID).Single();
        bool isDir = false;
        //判断是否有数据
        if (result != null)
        {
            try
            {
                //提取数据的Url属性
                if (result.IsDir == 0)
                    isDir = true;
            }
            catch { }
        }
        return (isDir);

    }
    protected void AddBtn_Click(object sender, EventArgs e)
    {
        //如果页面输入内容合法
        if(Page.IsValid == true)
        {
            //定义数据上下文
            DataClassesDataContext db=new DataClassesDataContext();
            try
            {
                //添加新数据
                db.Pr_AddFile(Desn.Text.Trim(),"",1,nParentID);
                //显示操作结果信息
                Response.Write("<script>window.alert('" + ASPNET2System.OPERATIONDELETESUCCESSMESSAGE + "')</script>");
            }
            catch (Exception ex)
            {
                Response.Write("<script>window.alert('添加失败')</script>");
            }
        }

    }
    protected void  ReturnBtn_Click(object sender, EventArgs e)
    {
        Response.Redirect("~/FileList.aspx");
    }
}