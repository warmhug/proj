using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class UpLoadFile : System.Web.UI.Page
{
    int nFileID = -1;
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Request.Params["FileID"] != null)
        {
            nFileID = Int32.Parse(Request.Params["FileID"].ToString());
        }
        UploadBtn.Enabled = nFileID > -1 ? true : false;
    }
    protected void UploadBtn_Click(object sender, EventArgs e)
    {
        if (Desn.Text.Trim() != "")
        {
            if ((upfile.PostedFile.ContentLength > 0) && (upfile.Value.ToString() != ""))
            {
                String filename = upfile.PostedFile.FileName.Substring(upfile.PostedFile.FileName.LastIndexOf("\\")+1);
                if (System.IO.File.Exists(Server.MapPath(Request.ApplicationPath) + "\\Files" + filename) == false)
                {
                    try
                    {
                        upfile.PostedFile.SaveAs(Server.MapPath(Request.ApplicationPath) + "\\Files" + filename);
                        //创建上下文，并调用存储过程
                        DataClassesDataContext db = new DataClassesDataContext();
                        db.Pr_AddFile(Desn.Text.Trim(), Request.ApplicationPath + "\\Files" + filename, 0, nFileID);
                        //显示上传成功的信息
                        SuccessMassage.Visible = true;
                    }
                    catch (Exception ex)
                    {
                        SuccessMassage.Visible = true;
                        SuccessMassage.Text = "由于网络原因，上传文件错误" + ex.Message;
                    }
                    //清空信息
                    Desn.Text = "";
                }
                else
                {
                    SuccessMassage.Visible = true;
                    SuccessMassage.Text = "您上传文件的文件名称已存在，请更改您的文件名称";
                }

            }
            else
            {
                SuccessMassage.Visible = true;
                SuccessMassage.Text = "文件的内容不能为空";
            }
        }
        else
        {
            SuccessMassage.Visible = true;
            SuccessMassage.Text = "文件的名称不能为空";
        }
    }

    protected void  ReturnBtn_Click(object sender, EventArgs e)
    {
        Response.Redirect("~/FileList.aspx");
    }
}
