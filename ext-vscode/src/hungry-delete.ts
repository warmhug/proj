/* eslint-disable */

// from 包名 Hungry Delete
// https://marketplace.visualstudio.com/items?itemName=jasonlhy.hungry-delete
// To delete ALL tab or white spaces before the cursor, until it reaches a non-empty character.

import * as vscode from 'vscode';
import { window, workspace } from 'vscode';
import type { ExtensionContext } from 'vscode';
import { getConfig } from "./utils";

/**
 * Check if we should perform hungry delete and execute it if needed
 */
function handleTextChange(event: vscode.TextDocumentChangeEvent): void {
  // Check current configuration state
  const isHungryDeleteEnabled = (getConfig('hungryDelete') as boolean) ?? true;
  
  // Only handle if hungry delete is enabled
  if (!isHungryDeleteEnabled) {
    return;
  }

  // Only handle single character deletions (backspace)
  if (event.contentChanges.length !== 1) {
    return;
  }

  const change = event.contentChanges[0];

  // Only handle deletions (empty text means deletion)
  if (change.text !== '' || change.rangeLength === 0) {
    return;
  }

  const editor = window.activeTextEditor;
  if (!editor || event.document !== editor.document) {
    return;
  }

  const document = editor.document;
  const position = change.range.start;

  // Get the current line text up to the cursor position (after the deletion)
  const lineText = document.lineAt(position.line).text;
  const textBeforeCursor = lineText.substring(0, position.character);

  // Handle both single character deletions and VS Code's smart deletions
  if (change.rangeLength >= 1) {
    // After backspace, check if there are still whitespace characters before cursor

    // Check if the entire line consists only of whitespace
    const isLineOnlyWhitespace = /^[ \t]*$/.test(lineText);
    
    let deleteStartIndex: number;
    let deleteEndIndex: number;
    
    if (isLineOnlyWhitespace) {
      // If the entire line is whitespace, delete all of it
      deleteStartIndex = 0;
      deleteEndIndex = lineText.length;
    } else {
      // Find the last non-whitespace character before the cursor
      deleteStartIndex = position.character - 1;
      
      while (deleteStartIndex >= 0 && /[ \t]/.test(textBeforeCursor[deleteStartIndex])) {
        deleteStartIndex--;
      }
      
      deleteEndIndex = position.character;
    }

    // Calculate the range to delete
    const deleteStartPosition = isLineOnlyWhitespace 
      ? new vscode.Position(position.line, deleteStartIndex)  // Start from 0 for line-only whitespace
      : new vscode.Position(position.line, deleteStartIndex + 1);  // Start from non-whitespace + 1 for normal case
    const deleteEndPosition = new vscode.Position(position.line, deleteEndIndex);

    // Only delete if there are whitespace characters to delete
    if (deleteStartPosition.isBefore(deleteEndPosition)) {
      const deleteRange = new vscode.Range(deleteStartPosition, deleteEndPosition);
      
      // Use setTimeout to avoid interfering with the current edit
      setTimeout(() => {
        editor.edit(editBuilder => {
          editBuilder.delete(deleteRange);
        });
      }, 0);
    }
  }
}

export function activate(context: ExtensionContext) {
  // Always register the text change listener
  // The handler function will check the current configuration on each call
  const textChangeListener = workspace.onDidChangeTextDocument(handleTextChange);
  context.subscriptions.push(textChangeListener);
}

export function deactivate() {}
