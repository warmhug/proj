/* eslint-disable */

// from 包名 Indent 4-to-2
// https://github.com/compulim/vscode-indent-4to2/blob/master/extension.js
//

// import * as vscode from 'vscode';
import { commands, window, workspace, Range } from 'vscode';
import type { ExtensionContext } from 'vscode';

function convertIndent4to2(line) {
  const
    leadingSpaces = /^\s*/.exec(line)?.[0],
    newLeadingSpaces = leadingSpaces?.replace(/[ ]{4}|\t/g, '  ');
  return newLeadingSpaces + line.replace(/^\s+/, '');
}

export function activate(context: ExtensionContext) {
  context.subscriptions.push(commands.registerTextEditorCommand('warmhug.convert4to2', function (textEditor, edit) {
    const document = textEditor.document;
    for (let lineNumber = 0, lineCount = document.lineCount; lineNumber < lineCount; lineNumber++) {
      const line = document.lineAt(lineNumber).text;
      edit.replace(
        new Range(lineNumber, 0, lineNumber, line.length),
        convertIndent4to2(line)
      );
    }
  }));
}
export function deactivate() {}
