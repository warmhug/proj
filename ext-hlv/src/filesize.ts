// @ts-nocheck

// from 包名 filesize
// https://github.com/mkxml/vscode-filesize/blob/master/view.js
// https://github.com/mkxml/vscode-filesize/blob/master/extension.js
// https://github.com/mkxml/vscode-filesize/blob/master/package.json

import { commands, window, workspace } from 'vscode';
import type { ExtensionContext } from 'vscode';
import fzCalculator from 'filesize-calculator';
import { getConfig, generateTable, createStatusBarItem, createOutputChannel } from "./utils";

let info, showGzipInStatusBar = false;
let activeDoc;
const fzConfig = {
  useDecimal: false,
  use24HourFormat: true,
  showBrotli: true,
};
function countWords(text) {
  const matches = text.match(/[\u4e00-\u9fa5]|[a-zA-Z0-9]|[，。！？：；、“”‘’《》（）{}【】[\](),.!?:"';\/\\\-_#=*+&%@$^`~]/g);
  const chineseMatches = text.match(/[\u4e00-\u9fa5]/g);  // 匹配中文字符

  const totalCount = matches ? matches.length : 0;
  const chineseCount = chineseMatches ? chineseMatches.length : 0;

  return { totalCount, chineseCount };
}

function updateStatusBar(statusbar) {
  activeDoc = window.activeTextEditor?.document;
  if (activeDoc && activeDoc.uri.scheme === 'file') {
    const newInfo = fzCalculator.loadFileInfoSync(activeDoc.fileName);
    info = fzCalculator.addPrettySize(newInfo, fzConfig);
    if (info && info.prettySize) {
      statusbar.text = info.prettySize;
      if (showGzipInStatusBar) {
        statusbar.text = `Raw: ${info.prettySize}`;
        info = fzCalculator.addGzipSize(info, fzConfig);
        statusbar.text += ` | Gzip: ${info.gzipSize}`;
      }
      statusbar.show();
    }
  } else {
    statusbar.text = '';
    statusbar.hide();
  }
}

export function activate(context: ExtensionContext) {
  console.log('filesize is active');

  const command = 'warmhug.toggleFilesizeInfo';
  const bar = createStatusBarItem({
    command,
    tooltip: 'Current file size - Click to toggle more info',
  });

  const updateBar = () => updateStatusBar(bar);
  function updateConfig() {
    showGzipInStatusBar = getConfig('showGzipFilesizeInStatusBar') as boolean;
    updateBar();
  }
  updateConfig();

  context.subscriptions.push(workspace.onDidSaveTextDocument(updateBar));
  context.subscriptions.push(window.onDidChangeActiveTextEditor(updateBar));
  context.subscriptions.push(workspace.onDidChangeConfiguration(updateConfig));
  context.subscriptions.push(commands.registerCommand(command, () => {
    if (!info || !info.prettySize) {
      return;
    }
    info = fzCalculator.addGzipSize(info, fzConfig);
    info = fzCalculator.addBrotliSize(info, fzConfig);
    info = fzCalculator.addMimeTypeInfo(info);
    info = fzCalculator.addPrettyDateInfo(info, fzConfig);
    const { totalCount, chineseCount } = countWords(activeDoc?.getText());
    const data = generateTable(['key', 'value'], [
      ['Count(Chinese)', chineseCount],
      ['Count(Other)', totalCount - chineseCount],
      ['Size', info.prettySize],
      ['Gzipped', info.gzipSize],
      ['Brotli', info.brotliSize],
      ['Mime type', info.mimeType],
      ['Created', info.prettyDateCreated],
      ['Changed', info.prettyDateChanged],
    ]);
    createOutputChannel({
      content: `${info.absolutePath}
${data}`,
      open: true,
    });
  }));
}

export function deactivate() {}
