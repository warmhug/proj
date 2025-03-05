/* eslint-disable */

// 自己实现

// import * as vscode from 'vscode';
import { window, workspace, commands } from 'vscode';
import type { ExtensionContext } from 'vscode';

export function activate(context: ExtensionContext) {
  // 监听文本文档被打开
  context.subscriptions.push(workspace.onDidOpenTextDocument((document) => {
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
}

export function deactivate() {}
