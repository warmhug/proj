/* eslint-disable */

// from 包名
//
//

// import * as vscode from 'vscode';
import { commands, window, workspace } from 'vscode';
import type { ExtensionContext } from 'vscode';
import { getConfig } from "./utils";

const cmdPrefix = 'warmhug.autoHide';

export function activate(context: ExtensionContext) {
  getConfig('aaa');
  window.showInformationMessage('你好 warmhug !!!');
}
export function deactivate() {}
