/* eslint-disable */

// from 包名 Template String Converter
// https://marketplace.visualstudio.com/items?itemName=meganrogge.template-string-converter
// converts a string to a template string when "${" is typed.

import * as vscode from 'vscode';
import { commands, window, workspace } from 'vscode';
import type { ExtensionContext } from 'vscode';
import { getConfig } from "./utils";

let previousDocument: { lines: vscode.TextLine[], lineCount: number } | undefined;

function handleTextChange(event: vscode.TextDocumentChangeEvent): void {
  const enable = getConfig('templateStringConverter') ?? true;
  if (!enable) {
    return;
  }

  // Check if there are any content changes
  if (!event.contentChanges.length) {
    return;
  }

  const contentChange = event.contentChanges[0];
  
  const editor = window.activeTextEditor;
  if (!editor || event.document !== editor.document) {
    return;
  }

  // Get the current position
  const position = contentChange.range.start;
  const lineNumber = position.line;
  const currentChar = position.character;
  
  if (currentChar < 1) {
    return;
  }

  const lineText = event.document.lineAt(lineNumber).text;
  
  // Check if we're inside a comment
  if (isInComment(lineText, currentChar)) {
    return;
  }

  // Get the character before the current position
  const priorChar = lineText.charAt(currentChar - 1);
  const nextChar = currentChar < lineText.length ? lineText.charAt(currentChar) : '';
  const nextTwoChars = currentChar < lineText.length - 1 ? lineText.substring(currentChar, currentChar + 2) : '';
  
  // Check various patterns that should trigger conversion
  const shouldConvert = 
    // Pattern: "${"
    (contentChange.text === '{' && priorChar === '$' && (currentChar < 2 || lineText.charAt(currentChar - 2) !== '\\')) ||
    // Pattern: "{}" after $
    (contentChange.text === '{}' && priorChar === '$' && (currentChar < 2 || lineText.charAt(currentChar - 2) !== '\\')) ||
    // Pattern: "$" followed by "{}"
    (contentChange.text === '$' && nextTwoChars === '{}' && (currentChar < 1 || lineText.charAt(currentChar - 1) !== '\\')) ||
    // Pattern: "$" followed by "{"
    (contentChange.text === '$' && nextChar === '{' && (currentChar < 1 || lineText.charAt(currentChar - 1) !== '\\'));
  
  if (shouldConvert) {
    // Find the string boundaries
    const stringInfo = findStringBoundaries(event.document, position);
    if (!stringInfo) {
      return;
    }
    
    const { start, end, quoteChar } = stringInfo;
    
    // Check if we're already in a template string
    if (isInTemplateString(event.document, position)) {
      return;
    }
    
    // Replace quotes with backticks
    editor.edit(editBuilder => {
      editBuilder.replace(
        new vscode.Range(start.line, start.character, start.line, start.character + 1),
        '`'
      );
      editBuilder.replace(
        new vscode.Range(end.line, end.character, end.line, end.character + 1),
        '`'
      );
    });
  }
}

/**
 * Check if the current position is inside a comment
 */
function isInComment(lineText: string, currentChar: number): boolean {
  const textBeforeCursor = lineText.substring(0, currentChar);
  return textBeforeCursor.includes('//');
}

/**
 * Find the boundaries of the string that contains the given position
 * Returns null if the position is not inside a string
 */
function findStringBoundaries(document: vscode.TextDocument, position: vscode.Position): { start: vscode.Position, end: vscode.Position, quoteChar: string } | null {
  const lineNumber = position.line;
  const currentChar = position.character;
  const lineText = document.lineAt(lineNumber).text;
  
  // Find the starting quote
  let startQuoteIndex = -1;
  let quoteChar = '';
  
  // Look for the nearest quote before the cursor
  for (let i = currentChar - 1; i >= 0; i--) {
    const char = lineText.charAt(i);
    if ((char === '"' || char === "'") && (i === 0 || lineText.charAt(i - 1) !== '\\')) {
      startQuoteIndex = i;
      quoteChar = char;
      break;
    }
  }
  
  if (startQuoteIndex === -1) {
    return null;
  }
  
  // Find the ending quote
  let endQuoteIndex = -1;
  for (let i = currentChar; i < lineText.length; i++) {
    const char = lineText.charAt(i);
    if (char === quoteChar && (i === 0 || lineText.charAt(i - 1) !== '\\')) {
      endQuoteIndex = i;
      break;
    }
  }
  
  if (endQuoteIndex === -1) {
    return null;
  }
  
  return {
    start: new vscode.Position(lineNumber, startQuoteIndex),
    end: new vscode.Position(lineNumber, endQuoteIndex),
    quoteChar
  };
}

/**
 * Check if the current position is inside a template string
 */
function isInTemplateString(document: vscode.TextDocument, position: vscode.Position): boolean {
  const lineNumber = position.line;
  const currentChar = position.character;
  const lineText = document.lineAt(lineNumber).text;
  
  const textBeforeCursor = lineText.substring(0, currentChar);
  const textAfterCursor = lineText.substring(currentChar);
  
  // Check if we're between backticks
  const backtickBefore = textBeforeCursor.lastIndexOf('`');
  const backtickAfter = textAfterCursor.indexOf('`');
  
  if (backtickBefore !== -1 && backtickAfter !== -1) {
    // Check if there's a ${ before the cursor and } after
    const templateBefore = textBeforeCursor.substring(backtickBefore).includes('${');
    const templateAfter = textAfterCursor.substring(0, backtickAfter).includes('}');
    
    return templateBefore && templateAfter;
  }
  
  return false;
}

export function activate(context: ExtensionContext) {
  // Register the text change listener
  const textChangeListener = workspace.onDidChangeTextDocument(handleTextChange);
  context.subscriptions.push(textChangeListener);
}

export function deactivate() {}
