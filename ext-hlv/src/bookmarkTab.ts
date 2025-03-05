/* eslint-disable */

// from 包名 Editor Group Minimizer
// https://github.com/maotong06/vscode-editor-group-minimizer-plus/blob/master/src/editorGroupTreeDataProvider.ts
// https://github.com/suhay/vscode-editor-group-minimizer/blob/master/src/editorGroupTreeDataProvider.ts
// https://github.com/suhay/vscode-editor-group-minimizer/blob/master/package.json

import * as vscode from 'vscode';
import { commands, TextDocument, TreeItemCollapsibleState } from 'vscode';
import type { ExtensionContext } from 'vscode';
import { createOutputChannel } from "./utils";
const cmdPrefix = 'warmhug.minimizer';
let contextWSS;

function getGroups() {
  return contextWSS.get('warmhugPanel') || [];
}
async function updateGroups(groups) {
  await contextWSS.update('warmhugPanel', groups);
}
async function dispose() {
  await contextWSS.update('warmhugPanel', undefined);
  refresh();
}

type createEditorGroupType = {
  label?: string;
  documents?: createEditorGroupType[];
  document?: TextDocument;
  collapsibleState?: TreeItemCollapsibleState;
};
type EditorGroup = {
  contextValue: string;
  description: string;
  tooltip: string;
  command?: any;
  parent?: EditorGroup;
};
const createEditorGroup = ({
  label = '',
  documents = [],
  document,
  collapsibleState = TreeItemCollapsibleState.Expanded
}: createEditorGroupType): createEditorGroupType & EditorGroup => {
  const delRoot = (doc) => doc?.fileName.replace(vscode.workspace.workspaceFolders?.[0]?.uri?.path ?? '', '')
  function getDes(docs) {
    const des = docs.map(doc => delRoot(doc.document));
    return {
      description: des.length > 0 ? `${des.join(', ').substring(0, 10)}...` : '',
      tooltip: des.join(', '),
    };
  }
  let { description, tooltip } = getDes(documents);
  if (document) {
    const dir = document.fileName.split('/');
    if (dir.length > 1) {
      let preDir = dir[dir.length - 2];
      if (preDir?.length > 8) {
        preDir = preDir.substring(0, 7) + '..';
      }
      label = `${preDir} / ${dir[dir.length - 1]}`;
    } else {
      label = dir.pop() ?? delRoot(document);
    }
    description = dir.join('/');
    tooltip = delRoot(document);
  }
  return {
    label,
    collapsibleState,
    document,
    documents,
    description,
    tooltip,
    contextValue: !document ? 'editorGroup' : 'editorDocument',
    // 使用 vscode.open 命令打开文件
    command: document ? {
      command: 'vscode.open',
      title: 'Open File',
      arguments: [document?.uri],
    } : undefined,
  };
};
const _onDidChangeTreeData = new vscode.EventEmitter<EditorGroup | undefined>();

const refresh = () => _onDidChangeTreeData.fire(undefined);

const restore = (group: createEditorGroupType & EditorGroup) => {
  // createOutputChannel({
  //   content: `restore: ` + JSON.stringify(group, null, 2),
  //   open: true,
  // });
  return group.documents?.map(({ document }) => document && vscode.window.showTextDocument(document, {
    preserveFocus: true,
    preview: false,
  }));
};

const remove = async (group: EditorGroup) => {
  const groups = getGroups();
  const remaining = groups.filter(mGroup => mGroup !== group);
  await updateGroups(remaining);
  refresh();
};

const minAll = async () => {
  const groups = getGroups();
  const docs: any = [];
  let activeTextEditor = vscode.window.activeTextEditor;
  let pinnedCheck = activeTextEditor;
  while (activeTextEditor !== undefined) {
    const closingEditor = activeTextEditor;
    await vscode.commands.executeCommand('workbench.action.closeActiveEditor');
    if (!vscode.window.activeTextEditor) {
      await vscode.commands.executeCommand('workbench.action.nextEditor');
    }
    activeTextEditor = vscode.window.activeTextEditor;
    if (activeTextEditor === pinnedCheck) {
      break;
    }
    if (closingEditor.document.uri.scheme === 'file') {
      docs.push({ document: closingEditor.document });
    }
    if (!vscode.window.activeTextEditor) {
      await vscode.commands.executeCommand('workbench.action.nextEditor');
      activeTextEditor = vscode.window.activeTextEditor;
    }
    pinnedCheck = activeTextEditor;
  }
  groups.push(createEditorGroup({
    label: `Group ${groups.length + 1}`,
    documents: docs,
  }));
  await updateGroups(groups);
  refresh();
};

const rename = async (group: EditorGroup) => {
  const groups = getGroups();
  const oldGroup = groups.find(mGroup => mGroup === group);
  const value = await vscode.window.showInputBox();
  if (oldGroup) {
    oldGroup.label = value || oldGroup.label;
    await updateGroups(groups);
    refresh();
  }
};

const addToGroup = async (uri: vscode.Uri, addToDefault = false) => {
  const groups = getGroups();
  const document = await vscode.workspace.openTextDocument(uri);
  if (!document) {
    vscode.window.showErrorMessage(`文档不存在`);
    return;
  }
  let selectedGroup: any;
  if (!groups?.length) {
    vscode.window.showInformationMessage(`还没有创建组`);
  }
  if (!addToDefault) {
    const picked = await vscode.window.showQuickPick(groups.map(group => group.label));
    selectedGroup = groups.find(group => group.label === picked);
  } else {
    // 默认 group 放到最上边
    const deflab = 'default';
    let defaultGroup = (groups?.[0] && groups[0].label === deflab) ? groups[0] : undefined;
    if (!defaultGroup) {
      defaultGroup = createEditorGroup({ label: deflab });
      groups.unshift(defaultGroup);
    }
    selectedGroup = defaultGroup;
  }
  if (!selectedGroup?.documents?.find(doc => doc.document?.fileName == document?.fileName)) {
    selectedGroup?.documents.push({ document });
    vscode.window.showInformationMessage(`Added to ${selectedGroup?.label || 'defaullt'}`);
  } else {
    vscode.window.showInformationMessage(`已存在`);
  }
  // createOutputChannel({
  //   content: `selectedGroup: ` + JSON.stringify(selectedGroup, null, 2),
  //   open: true,
  // });
  await updateGroups(groups);
  refresh();
};

const removeFromGroup = async (group: createEditorGroupType & EditorGroup) => {
  const groups = getGroups();
  // createOutputChannel({
  //   content: `removeFromGroup: ` + JSON.stringify({group,groups}, null, 2),
  //   open: true,
  // });
  if (group.parent) {
    const oldGroupIdx = groups.findIndex(mGroup => mGroup === group.parent);
    if (oldGroupIdx >= 0) {
      const oldGroup = groups[oldGroupIdx];
      const i = oldGroup?.documents.findIndex(doc => doc.document?.fileName === group.document?.fileName) ?? -1;
      if (i >= 0) {
        oldGroup?.documents.splice(i, 1);
      }
      if (oldGroup?.documents.length === 0) {
        groups.splice(oldGroupIdx, 1);
      }
    }
  }
  await updateGroups(groups);
  refresh();
};

const TreeDataProvider = {
  onDidChangeTreeData: _onDidChangeTreeData.event,
  getTreeItem: (element: EditorGroup) => element,
  getChildren: async (element?: createEditorGroupType & EditorGroup) => {
    const groups = getGroups();
    if (element) {
      const subgroups = element.documents ? element.documents.map(({ document }) => {
        const groupMember = createEditorGroup({
          document,
          collapsibleState: TreeItemCollapsibleState.None,
        });
        groupMember.parent = element;
        return groupMember;
      }) : element.documents;
      // createOutputChannel({
      //   content: `getChildren ele: ` + JSON.stringify({element,subgroups}, null, 2),
      // });
      await updateGroups(groups);
      return subgroups;
    }
    // createOutputChannel({
    //   content: `getChildren: ` + JSON.stringify({ groups}, null, 2),
    // });
    await updateGroups(groups);
    return groups;
  },
  dispose,
};

export function activate(context: ExtensionContext) {
  contextWSS = context.workspaceState;
  vscode.window.registerTreeDataProvider('warmhugPanel', TreeDataProvider);
  vscode.commands.registerCommand(`${cmdPrefix}.minAll`, (
    uri: vscode.Uri, a,b,
  ) => {
    // createOutputChannel({
    //   content: `minAll: ` + JSON.stringify({uri, a,b}, null, 2),
    // });
    minAll();
  });
  vscode.commands.registerCommand(`${cmdPrefix}.remove`, remove);
  vscode.commands.registerCommand(`${cmdPrefix}.restore`, restore);
  vscode.commands.registerCommand(`${cmdPrefix}.rename`, rename);
  vscode.commands.registerCommand(`${cmdPrefix}.dispose`, dispose);
  vscode.commands.registerCommand(`${cmdPrefix}.addToDefaultGroup`, (
    uri: vscode.Uri, a,b,
  ) => {
    // createOutputChannel({
    //   content: `addToDefaultGroup: ` + JSON.stringify({uri, a,b}, null, 2),
    // });
    addToGroup(uri, true);
  });
  vscode.commands.registerCommand(`${cmdPrefix}.addToGroup`, (
    uri: vscode.Uri,
  ) => {
    addToGroup(uri);
  });
  vscode.commands.registerCommand(`${cmdPrefix}.removeFromGroup`, removeFromGroup);
  context.subscriptions.push(TreeDataProvider);
}
export function deactivate() {}
