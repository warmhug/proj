import * as vscode from 'vscode';
import type { ExtensionContext } from 'vscode';

import { activate as outlineFocus } from "./outlineFocus";
import { activate as outline } from "./outline";
import { activate as terminal } from "./terminal";
import { activate as consoleLog } from "./consoleLog";
import { activate as npmdeps } from "./npmdeps";
import { activate as filesize } from "./filesize";
import { activate as autoCloseTag } from "./autoCloseTag";
import { activate as asciiArt } from "./asciiArt";
import { activate as indent4to2 } from "./indent4to2";
import { activate as autohide } from "./autohide";
import { activate as bookmark } from "./bookmark";
import { activate as bookmarkTab } from "./bookmarkTab";

// https://github.com/usernamehw/vscode-commands
// https://github.com/wk-j/vscode-save-and-run

export function activate(context: ExtensionContext) {
  // console.log('extension is now active!');
  // vscode.window.showInformationMessage('extension is now active!');

  context.subscriptions.push(vscode.commands.registerCommand('warmhug.demo', () => {
    vscode.window.showInformationMessage('你好 warmhug !!!');
    vscode.commands.executeCommand('outline.focus');
  }));

  outlineFocus(context);
  outline(context);
  terminal(context);
  consoleLog(context);
  npmdeps(context);
  filesize(context);
  autoCloseTag(context);
  asciiArt(context);
  indent4to2(context);
  autohide(context);
  bookmark(context);
  bookmarkTab(context);
}

export function deactivate() {
  console.log('warmhug extension 卸载');
  vscode.window.showInformationMessage('warmhug extension 卸载');
}
