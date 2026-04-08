import * as vscode from 'vscode';
import type { ExtensionContext } from 'vscode';

import { activate as outline } from "./outline";
import { activate as terminal } from "./terminal";
import { activate as consoleLog } from "./consoleLog";
import { activate as npmdeps } from "./npmdeps";
import { activate as filesize } from "./filesize";
import { activate as asciiArt } from "./asciiArt";
import { activate as indent4to2 } from "./indent4to2";
import { activate as autohide } from "./autohide";
import { activate as minimizerTab } from "./minimizerTab";
import { activate as hungryDelete } from "./hungry-delete";
import { activate as temSC } from "./template-string-converter";

export function activate(context: ExtensionContext) {
  console.log('log warmhug extension is now active!');
  vscode.window.showInformationMessage('log warmhug extension is now active!');

  context.subscriptions.push(vscode.commands.registerCommand('warmhug.demo', () => {
    vscode.window.showInformationMessage('你好 warmhug !!!');
    vscode.commands.executeCommand('outline.focus');
  }));

  outline(context);
  terminal(context);
  consoleLog(context);
  npmdeps(context);
  filesize(context);
  asciiArt(context);
  indent4to2(context);
  autohide(context);
  minimizerTab(context);
  hungryDelete(context);
  temSC(context);
}

export function deactivate() {
  console.log('log warmhug extension 卸载');
  vscode.window.showInformationMessage('log warmhug extension 卸载');
}
