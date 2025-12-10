const vscode = require('vscode');
const fetch = require('node-fetch');
const { HttpsProxyAgent } = require('https-proxy-agent');

function activate(context) {
  const disposable = vscode.commands.registerCommand('proxy-test.test', async () => {
    vscode.window.showInformationMessage('Command triggered !!!');
  });
  context.subscriptions.push(disposable);

  const output = vscode.window.createOutputChannel('Proxy Test');
  output.show(true);
  output.appendLine('🔹 Start Proxy Test ...');

  // 读取 VSCode http.proxy 配置
  const proxy = vscode.workspace.getConfiguration('http').get('proxy');
  output.appendLine(`VSCode Proxy Setting: ${proxy || 'not set'}`);

  const url = 'https://www.google.com';
  const options = {};
  if (proxy) {
    options.agent = new HttpsProxyAgent(proxy);
  }

  fetch(url, options)
    .then(res => {
      output.appendLine(`Response Status: ${res.status}`);
      output.appendLine('✅ Proxy Test Success');
    })
    .catch(err => {
      output.appendLine('❌ Proxy Test Failed');
      output.appendLine(err?.message || String(err));
    });
}

function deactivate() {}

module.exports = { activate, deactivate };
