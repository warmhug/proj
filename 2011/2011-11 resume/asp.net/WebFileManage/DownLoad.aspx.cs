using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;

public partial class DownLoad : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string destFileName = Request.QueryString["DocUrl"] != null ? Request.QueryString["DocUrl"] : "";
        destFileName = Server.MapPath(destFileName);
        destFileName = Server.UrlDecode(destFileName);
        if (System.IO.File.Exists(destFileName))
        {
            System.IO.FileInfo fi = new System.IO.FileInfo(destFileName);
            Response.Clear();
            Response.ClearHeaders();
            Response.Buffer = false;
            Response.AppendHeader("Content-Disposition", "attachment;filename=" + HttpUtility.UrlEncode(Path.GetFileName(destFileName), System.Text.Encoding.UTF8));
            Response.AppendHeader("Content-Length", fi.Length.ToString());
            Response.ContentType = "application/octet-stream";
            Response.WriteFile(destFileName);
            Response.Flush();
            Response.End();
        }
        else
        {
            Response.Write("<script language=javascript>alert('文件不存在');history.go(-1);</script>");
            Response.End();
        }
    }

    
}