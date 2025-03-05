/* eslint-disable */

// from 包名 Auto Close Tag
// https://github.com/formulahendry/vscode-auto-close-tag/blob/master/src/extension.ts
// https://github.com/formulahendry/vscode-auto-close-tag/blob/master/package.json

import * as vscode from 'vscode';
import { commands, window, workspace } from 'vscode';
import type { ExtensionContext } from 'vscode';
import { getConfig } from "./utils";

function getConfigInner(field, editor) {
  const config = getConfig(`autoCloseTag.${field}`, editor.document.uri) as any;
  // const fieldVal = config.get<string[]>(field, []);;
  // const fieldVal = config.get();
  // window.showInformationMessage(`config ${config}`);
  return config;
}

function getCloseTag(text: string, excludedTags: string[]): string | undefined {
  let regex = /<(\/?[_a-zA-Z][a-zA-Z0-9:\-_.]*)(?:\s+[^<>]*?[^\s/<>=]+?)*?\s?>/g;
  let result: any = null;
  let stack: any = [];
  while ((result = regex.exec(text)) !== null) {
    let isStartTag = result[1].substr(0, 1) !== "/";
    let tag = isStartTag ? result[1] : result[1].substr(1);
    if (excludedTags.indexOf(tag.toLowerCase()) === -1) {
      if (isStartTag) {
        stack.push(tag);
      } else if (stack.length > 0) {
        let lastTag = stack[stack.length - 1];
        if (lastTag === tag) {
          stack.pop()
        }
      }
    }
  }
  if (stack.length > 0) {
    let closeTag = stack[stack.length - 1];
    if (text.substr(text.length - 2) === "</") {
      return closeTag + ">";
    }
    if (text.substr(text.length - 1) === "<") {
      return "/" + closeTag + ">";
    }
    return "</" + closeTag + ">";
  }
}

function insertAutoCloseTag(event: vscode.TextDocumentChangeEvent): void {
  function occurrenceCount(source: string, find: string): number {
    return source.split(find).length - 1;
  }
  if (!event.contentChanges[0] || (event.reason && event.reason == vscode.TextDocumentChangeReason.Undo) || (event.reason && event.reason == vscode.TextDocumentChangeReason.Redo)) {
    return;
  }
  const contentChange = event.contentChanges[0];
  let isRightAngleBracket = contentChange.text === ">" || (
    contentChange.text.endsWith(">") && contentChange.range.start.character === 0
    && contentChange.range.start.line === contentChange.range.end.line
    && !contentChange.range.end.isEqual(new vscode.Position(0, 0))
  );
  if (!isRightAngleBracket && event.contentChanges[0].text !== "/") {
    return;
  }

  let editor = vscode.window.activeTextEditor;
  if (!editor || (editor && event.document !== editor.document)) {
    return;
  }

  let selection = editor.selection;
  let originalPosition = selection.start.translate(0, 1);
  let excludedTags = getConfigInner('excludedTags', editor);
  let insertSpace = getConfigInner('insertSpaceBeforeSelfClosingTag', editor);

  if (isRightAngleBracket || (event.contentChanges[0].text === "/")) {
    let textLine = editor.document.lineAt(selection.start);
    let text = textLine.text.substring(0, selection.start.character + 1);
    let result = /<([_a-zA-Z][a-zA-Z0-9:\-_.]*)(?:\s+[^<>]*?[^\s/<>=]+?)*?\s?(\/|>)$/.exec(text);
    if (result !== null && ((occurrenceCount(result[0], "'") % 2 === 0)
      && (occurrenceCount(result[0], "\"") % 2 === 0) && (occurrenceCount(result[0], "`") % 2 === 0))) {
      if (result[2] === ">") {
        if (excludedTags.indexOf(result[1].toLowerCase()) === -1) {
          editor.edit((editBuilder) => {
            editBuilder.insert(originalPosition, "</" + result[1] + ">");
          }).then(() => {
            editor.selection = new vscode.Selection(originalPosition, originalPosition);
          });
        }
      } else {
        if (textLine.text.length <= selection.start.character + 1 || textLine.text[selection.start.character + 1] !== '>') {
          // if not typing "/" just before ">", add the ">" after "/"
          editor.edit((editBuilder) => {
            if (insertSpace) {
              const spacePosition = originalPosition.translate(0, -1);
              editBuilder.insert(spacePosition, " ");
            }
            editBuilder.insert(originalPosition, ">");
          })
        }
      }
    }
  }
}

function insertCloseTag(): void {
  let editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }
  let selection = editor.selection;
  let originalPosition = selection.start;
  let excludedTags = getConfigInner('excludedTags', editor);
  let text = editor.document.getText(new vscode.Range(new vscode.Position(0, 0), originalPosition));
  if (text.length > 2) {
    let closeTag = getCloseTag(text, excludedTags);
    if (closeTag) {
      editor.edit((editBuilder) => {
        editBuilder.insert(originalPosition, closeTag);
      });
    }
  }
}

export function activate(context: ExtensionContext) {
  vscode.workspace.onDidChangeTextDocument(event => {
    insertAutoCloseTag(event);
  });

  let closeTag = vscode.commands.registerCommand('warmhug.closeTag', () => {
    insertCloseTag();
  });

  context.subscriptions.push(closeTag);
}
export function deactivate() { }
