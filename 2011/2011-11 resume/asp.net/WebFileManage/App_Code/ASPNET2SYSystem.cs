using System;
using System.Data;
using System.Configuration;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;

namespace WebDBManage
{
    /// <summary>
    /// Summary description for ASPNET2System
    /// </summary>
    public class ASPNET2System
    {
        ///作者注：此值请勿随便修改！！！
        public static string PROJECTNAME = "DocumentManager";
        public static string PROJECTDESN = "信息文档管理平台";
        public static string PROJECTTREEROOTNODEDATA = "0";

        public static string OPERATIONADDSUCCESSMESSAGE = "添加数据项成功！！！";
        public static string OPERATIONADDFAILUREMESSAGE = "添加数据项失败！！！";

        public static string OPERATIONUPDATESUCCESSMESSAGE = "修改数据项成功！！！";
        public static string OPERATIONUPDATEFAILUREMESSAGE = "修改数据项失败！！！";

        public static string OPERATIONDELETESUCCESSMESSAGE = "删除数据项成功！！！";
        public static string OPERATIONDELETEFAILUREMESSAGE = "删除数据项失败！！！";

        public static string OPERATIONNOSELECTMESSAGE = "请选择操作的数据项！！！";
        public static string OPERATIONDELETEMESSAGE = "你确定要删除所选择的数据项吗？";
        public static string PasswordErrorMESSAGE = "旧密码输入错误，请重新输入密码！！！";

        public static string OPERATIONDATANULL = "数据为空！！！";
        public static string OPERATIONCHILADRENDATANOTNULL = "选择结点的孩子不为空！！！";
        public static string OPERATIONATTACHMENTDATA = "该文档包含附件，请先删除附件！！！";
        public static string OPERATIONPICTUREDATA = "该文档包含图片，请先删除图片！！！";
        public static string OPERATIONATTACHMENTPICTUREDATA = "该文档包含附件和图片，请先删除附件和图片！！！";

        /// <summary>
        /// Tree的相应操作信息
        /// </summary>
        public static string TREE_NO_SELECT_NODE = "请选择树的节点。";
        public static string TREE_EXIST_EQUAL_NODE = "已经存在相同的结点。";
        public static string TREE_NODE_CHILD_NO_NULL = "选择结点的孩子不为空！";
        public static string TREE_NODE_NO_CAN_ADD = "此节点不是菜单节点，不能添加子节点！";

        /// <summary>
        /// ListBox的相应操作信息
        /// </summary>
        public static string LISTBOX_NO_SELECT_ITEM = "请选择列表的数据项！";

        public static string RedirectErrorUrl(String sErrorUrl)
        {
            if (sErrorUrl == null || sErrorUrl == "")
            {
                return ("");
            }
            return ((sErrorUrl.IndexOf("?") > -1) ? sErrorUrl.Substring(0, sErrorUrl.IndexOf("?")) : sErrorUrl);
        }

        public static void SetListBoxItem(ListBox listBox, string sItemValue)
        {
            int index = 0;
            foreach (ListItem item in listBox.Items)
            {
                ///判断值是否相等，并且设置控件的SelectedIndex
                if (item.Value.ToLower() == sItemValue.ToLower())
                {
                    listBox.SelectedIndex = index;
                    return;
                }
                index++;
            }
            listBox.SelectedIndex = -1;
        }

        public static void SetListBoxItem(DropDownList listBox, string sItemValue)
        {
            int index = 0;
            foreach (ListItem item in listBox.Items)
            {
                ///判断值是否相等，并且设置控件的SelectedIndex
                if (item.Value.ToLower() == sItemValue.ToLower())
                {
                    listBox.SelectedIndex = index;
                    return;
                }
                index++;
            }
            listBox.SelectedIndex = -1;
        }

        public static void SetListBoxItemByText(ListBox listBox, string sItemText)
        {
            int index = 0;
            foreach (ListItem item in listBox.Items)
            {
                ///判断值是否相等，并且设置控件的SelectedIndex
                if (item.Text.ToLower() == sItemText.ToLower())
                {
                    listBox.SelectedIndex = index;
                    return;
                }
                index++;
            }
            listBox.SelectedIndex = -1;
        }

        public static void SetListBoxItemByText(DropDownList listBox, string sItemText)
        {
            int index = 0;
            foreach (ListItem item in listBox.Items)
            {
                ///判断值是否相等，并且设置控件的SelectedIndex
                if (item.Text.ToLower() == sItemText.ToLower())
                {
                    listBox.SelectedIndex = index;
                    return;
                }
                index++;
            }
            listBox.SelectedIndex = -1;
        }
    }
}

