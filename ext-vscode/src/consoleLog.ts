// from 包名 "javascript console utils"
// https://github.com/whtouche/vscode-js-console-utils/blob/master/extension.js
// https://github.com/whtouche/vscode-js-console-utils/blob/master/package.json

import * as vscode from 'vscode';
import type { ExtensionContext } from 'vscode';

const insertText = (val: string) => {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showErrorMessage('Can\'t insert log because no document is open');
    return;
  }

  const selection = editor.selection;

  const range = new vscode.Range(selection.start, selection.end);

  editor.edit((editBuilder) => {
    editBuilder.replace(range, val);
  });
};

export function activate(context: ExtensionContext) {
  context.subscriptions.push(vscode.commands.registerCommand('warmhug.insertLogStatement', () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) { return; }
    const selection = editor.selection;
    const text = editor.document.getText(selection);

    text ? vscode.commands.executeCommand('editor.action.insertLineAfter')
        .then(() => {
          const logToInsert = `console.log('log ${text}: ', ${text});`;
          insertText(logToInsert);
        })
      : insertText(`console.log('log', );`);

  }));
}

export function deactivate() {}
