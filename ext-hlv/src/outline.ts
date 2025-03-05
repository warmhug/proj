import * as vscode from 'vscode';
import { languages } from 'vscode';
import type { ExtensionContext } from 'vscode';

class MyConfigDocumentSymbolProvider implements vscode.DocumentSymbolProvider {
  public provideDocumentSymbols(
    document: vscode.TextDocument,
    token: vscode.CancellationToken
  ): Promise<vscode.DocumentSymbol[]> {
    return new Promise((resolve, reject) => {
      const symbols: vscode.DocumentSymbol[] = [];
      let parentSymbol: vscode.DocumentSymbol | null = null;

      for (let i = 0; i < document.lineCount; i++) {
        const line = document.lineAt(i);

        if (line.text.startsWith('===')) {
          // 创建一个新的父 symbol
          parentSymbol = new vscode.DocumentSymbol(
            line.text.replaceAll('=', '').trim(),
            '',
            vscode.SymbolKind.Module,
            line.range,
            line.range
          );
          symbols.push(parentSymbol);
        } else if (line.text.startsWith('----')) {
          // 检查 parentSymbol 是否存在，以及行是否仅包含 "---"
          if (parentSymbol) {
            const childText = line.text.replaceAll('-', '').trim();
            if (childText) {  // 确保生成的 symbol 名称不为空
              const childSymbol = new vscode.DocumentSymbol(
                childText,
                '',
                vscode.SymbolKind.Namespace,
                line.range,
                line.range
              );
              // 在父 symbol 下添加子 symbol
              parentSymbol.children.push(childSymbol);
            }
          }
        }
      }

      resolve(symbols);
    });
  }
}

export function activate(context: ExtensionContext) {
  console.log('warmhug txt file outline');
  context.subscriptions.push(
    languages.registerDocumentSymbolProvider(
      { scheme: "file", language: "plaintext" },
      new MyConfigDocumentSymbolProvider()
    )
  );
}

export function deactivate() {}
