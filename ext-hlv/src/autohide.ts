/* eslint-disable */

// 自动关闭侧边栏 + markdown/plaintext 打开时自动聚焦大纲
// from 包名 Auto Hide
// https://github.com/sirmspencer/vscode-autohide/blob/master/src/extension.ts
// https://github.com/sirmspencer/vscode-autohide/blob/master/package.json

import * as vscode from 'vscode';
import { commands, window, workspace, TextEditorSelectionChangeKind } from 'vscode';
import type { ExtensionContext } from 'vscode';
// import { getConfig } from "./utils";

const cmdPrefix = 'warmhug.autoHide';

function registerCommand(context, name) {
  context.subscriptions.push(
    commands.registerCommand(`${cmdPrefix}.${name}`, async () => {
      const config = workspace.getConfiguration(cmdPrefix);
      await config.update(name, !config[name]);
      // await config.update("enable", !config.enable, ConfigurationTarget.Workspace);
    })
  );
}

export function activate(context: ExtensionContext) {
  // 监听文本文档被打开
  context.subscriptions.push(workspace.onDidOpenTextDocument((document) => {
    const config = workspace.getConfiguration(cmdPrefix);
    if (!config.autoHideAuxiliaryBar) {
      return;
    }
    const activeEditor = window.activeTextEditor;
    // 如果文件不在 workspace 目录里，activeEditor 为 undefined，为什么 onDidOpenTextDocument 也只跑一次？
    // window.showInformationMessage(`act ${activeEditor?.document.languageId} ${JSON.stringify(activeEditor, null, 2)}`);
    // window.showInformationMessage(`dd ${document?.languageId} ${JSON.stringify(document, null, 2)}`);
    const langs = ['markdown', 'plaintext'];
    const langId = activeEditor ? activeEditor.document.languageId : document.languageId;
    if (langId && langs.includes(langId)) {
      commands.executeCommand('outline.focus');
    }
  }));

  window.onDidChangeTextEditorSelection(selection => {
    const config = workspace.getConfiguration(cmdPrefix);
    if (!config.enable) {
      return;
    }

    const path = window.activeTextEditor?.document.fileName || '';
    const pathIsFile = path.includes(".") || path.includes("\\") || path.includes("/");
    const scheme = selection.textEditor.document.uri.scheme;

    if (
      selection.kind != TextEditorSelectionChangeKind.Mouse ||
      selection.selections.length != 1 ||
      selection.selections.find(a => a.isEmpty) == null ||
      !pathIsFile || // The debug window editor
      scheme == "output" // The output window
    ) {
      return;
    }

    // Hide the References panel (`Go to References`)
    commands.executeCommand("closeReferenceSearch");

    setTimeout(function () {
      // Hide the panel (output, terminal, etc.)
      if (config.autoHidePanel) {
        commands.executeCommand("workbench.action.closePanel");
      }
    }, 300);

    setTimeout(function () {
      if (config.autoHideSideBar) {
        commands.executeCommand("workbench.action.closeSidebar");
      }
    }, 450);

    setTimeout(function () {
      // Hide the auxiliary bar (second side bar)
      if (config.autoHideAuxiliaryBar) {
        commands.executeCommand("workbench.action.closeAuxiliaryBar");
      }
    }, 450);
  });

  registerCommand(context, 'enable');
  registerCommand(context, 'hidePanel');
  registerCommand(context, 'hideSideBar');
  registerCommand(context, 'hideAuxiliaryBar');
}
export function deactivate() { }
