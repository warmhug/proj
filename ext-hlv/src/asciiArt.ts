/* eslint-disable */

// from 包名 Convert To ASCII Art
// https://github.com/jp41011/vscode-ConvertToAsciiArt/blob/master/src/extension.ts
//

// import * as vscode from 'vscode';
import { commands, window, workspace } from 'vscode';
import type { ExtensionContext, QuickPickItem } from 'vscode';
import figlet from 'figlet';
// var figlet = require('figlet');
import { getConfig } from "./utils";

const cmdPrefix = 'warmhug.asciiArt';

// https://github.com/patorjk/figlet.js/
// http://www.figlet.org/examples.html

function convertToAsciiArt(fontSelection: string|undefined) {
  let editor = window.activeTextEditor;
  if (editor) {
    let document = editor.document;
    let selection = editor.selection;
    let selectedText = document.getText(selection);
    editor.edit(editBuilder => {
      editBuilder.replace(selection, figlet.textSync(selectedText, {
        whitespaceBreak: true,
        font: fontSelection,
        width: 100,
        // "default", "full", "fitted", "controlled smushing", and "universal smushing".
        horizontalLayout: 'full',
        // "default", "full", "fitted", "controlled smushing", and "universal smushing".
        verticalLayout: 'default'
      }));
    });
  }
}
export function activate(context: ExtensionContext) {
    context.subscriptions.push(commands.registerCommand(cmdPrefix, () => {
      var items: QuickPickItem[] = [];
      figlet.fontsSync().forEach(function (font: string) {
        items.push({ label: font, description: "Use the " + font + " font" });
      });
      window.showQuickPick(items).then(function (fontSelection) {
        if (!fontSelection) {
          return;
        }
        convertToAsciiArt(fontSelection.label);
      });
    }));
    context.subscriptions.push(commands.registerCommand(`${cmdPrefix}FavFont`, () => {
      let favoriteFont = getConfig('asciiArtFavFont');
      convertToAsciiArt(String(favoriteFont));
    }));
}
export function deactivate() {}
