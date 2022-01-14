using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.Linq;
using WebDBManage;

public partial class FileList : System.Web.UI.Page
{

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!Page.IsPostBack)
        {
            BindListView(FileListView);
        }
    }
    public void BindListView(TreeView treeView)
    {
        treeView.Nodes.Clear();//清空树的所有节点
        //创建根节点
        TreeNode rootNode = new TreeNode();
        //设置根节点属性
        rootNode.Text = ASPNET2System.PROJECTDESN;
        //设置根节点的Key值
        rootNode.Value = ASPNET2System.PROJECTTREEROOTNODEDATA;
        rootNode.Expanded = true;
        rootNode.ImageUrl = "Images/floder.jpg";
        rootNode.Selected = true;
        //添加根节点
        treeView.Nodes.Add(rootNode);
        //创建其他节点
        CreateChildNode(rootNode);
    }
    private void CreateChildNode(TreeNode parentNode)
    {
        DataClassesDataContext db = new DataClassesDataContext();
        //从存储过程返回的数据集中查询符合条件的记录
        IEnumerable<Pr_GetFilesResult> results = db.Pr_GetFiles().Where(p => p.ParentID == Int32.Parse(parentNode.Value));
        //遍历所有记录
        foreach (Pr_GetFilesResult file in results)
        {
            //创建节点
            TreeNode node = new TreeNode();
            //设置节点属性
            node.Text = file.Desn;
            node.Value = file.FileID.ToString();
            if (file.IsDir.ToString() == "1")
            {
                node.Expanded = true;
                node.Target = "_self";
                node.ImageUrl = "Image/folder.jpg";
            }
            else
            {
                node.Target = "_blank";
            }
            parentNode.ChildNodes.Add(node);
            //递归调用，创建其他节点
            CreateChildNode(node);
        }
    }


    protected void UpLoadBtn_Click(object sender, EventArgs e)
    {
        if (FileListView.SelectedNode == null)
        {
            //显示提示信息
            Response.Write("<script>window.alert('" + ASPNET2System.OPERATIONNOSELECTMESSAGE + "')</script>");
            return;
        }
        Response.Redirect("~/UploadFile.aspx?FileID=" + FileListView.SelectedValue);
    }
    protected void DownLoadBtn_Click(object sender, EventArgs e)
    {
        if (FileListView.SelectedNode == null)
        {
            //显示提示信息
            Response.Write("<script>window.alert('" + ASPNET2System.OPERATIONNOSELECTMESSAGE + "')</script>");
            return;
        }
        DataClassesDataContext db = new DataClassesDataContext();
        //从存储过程返回数据
        var result = db.Pr_GetSingleFile(Int32.Parse(FileListView.SelectedValue)).Single();
        string sUrl = "";
        //判断是否有数据
        if (result != null)
        {
            //提取数据的Url属性
            sUrl = result.Url.ToString();
        }
        Response.Redirect("~/Download.aspx?DocUrl=" + sUrl);
    }

    protected void NewDirBtn_Click(object sender, EventArgs e)
    {
        if (FileListView.SelectedValue == null)
        {
            //显示提示信息
            Response.Write("<script>window.alert('" + ASPNET2System.OPERATIONNOSELECTMESSAGE + "')</script>");
            return;
        }
        Response.Redirect("~/AddFileDir.aspx?FileID=" + FileListView.SelectedValue);
    }
    protected void UpdateNameBtn_Click(object sender, EventArgs e)
    {
        if (FileListView.SelectedValue == null)
        {
            //显示提示信息
            Response.Write("<script>window.alert('" + ASPNET2System.OPERATIONNOSELECTMESSAGE + "')</script>");
            return;
        }
        Response.Redirect("~/EditFileName.aspx?FileID=" + FileListView.SelectedValue);
    }
    protected void DeleteBtn_Click(object sender, EventArgs e)
    {
        if (FileListView.SelectedNode == null)
        {
            //显示提示信息
            Response.Write("<script>window.alert('" + ASPNET2System.OPERATIONNOSELECTMESSAGE + "')</script>");
            return;
        }
        DataClassesDataContext db = new DataClassesDataContext();
        try
        {
            //执行存储过程
            db.Pr_DeleteFile(Int32.Parse(FileListView.SelectedValue));
            BindListView(FileListView);
            //显示操作结果
            Response.Write("<script>window.alert('" + ASPNET2System.OPERATIONDELETESUCCESSMESSAGE + "')</script>");
        }
        catch (Exception ex)
        {
            Response.Write("<script>window.alert('删除失败')</script>");
        }
    }
}