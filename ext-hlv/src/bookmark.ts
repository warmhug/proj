/* eslint-disable */

// from AI 写个简易版的 vscode bookmark 插件
// https://github.com/alefragnani/vscode-bookmarks/blob/master/package.json
//

import * as vscode from 'vscode';
import { commands, window, workspace } from 'vscode';
import type { ExtensionContext } from 'vscode';

const cmdPrefix = 'warmhug.simpleBookmark';

export function activate(context: ExtensionContext) {
  let bookmarks = new Map<string, number>();

  context.subscriptions.push(vscode.commands.registerCommand(`${cmdPrefix}.add`, () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;
    const uri = editor.document.uri.toString();

    window.showInformationMessage(`sel: ${uri} ${JSON.stringify(editor.selection)}`);

    const lineNumber = editor.selection.start.line;
    const currentLine = editor.selection.active.line;
    bookmarks.set(editor.document.fileName, lineNumber);

    vscode.window.showInformationMessage(`Bookmarked line ${lineNumber + 1} in ${editor.document.fileName}`);
  }));

  context.subscriptions.push(vscode.commands.registerCommand(`${cmdPrefix}.list`, () => {
    for (const [fileName, lineNumber] of bookmarks.entries()) {
      vscode.workspace.openTextDocument(fileName).then(doc => {
        const position = new vscode.Position(lineNumber, 0); // 行号从零开始计数
        vscode.window.showTextDocument(doc).then(editor => {
          if (editor) {
            editor.revealRange(new vscode.Range(position, position)); // 显示文档中的特定位置
          }
        });
        return;
        vscode.window.showTextDocument(doc, {
          viewColumn: vscode.ViewColumn.Active,
          selection: new vscode.Range(position, position)
        });
      }, error => console.error(error));
    }
  }));
}
export function deactivate() {}
