// from 包名 npm Dependency Links
// https://github.com/herrmannplatz/npm-dependency-links/blob/master/extension.js
// https://github.com/herrmannplatz/npm-dependency-links/blob/master/package.json

import { languages, Uri, DocumentLink, Range, workspace } from 'vscode';
import type { ExtensionContext } from 'vscode';
import { getConfig } from "./utils";

const cmdPrefix = 'npmDepRegistryUrl';

function buildLink(urlPattern, url, line: any, lineIndex: any, packageName: any) {
  let registryUrl = url;
  if (!!urlPattern) {
    registryUrl = urlPattern.replace('{{pkg}}', packageName);
  }
  const startCharacter = line.text.indexOf(packageName);
  const endCharacter = startCharacter + packageName.length;
  const linkRange = new Range(lineIndex, startCharacter, lineIndex, endCharacter);
  const linkUri = Uri.parse(`${registryUrl}${packageName}`);
  return new DocumentLink(linkRange, linkUri);
}

export function activate(context: ExtensionContext) {
  context.subscriptions.push(languages.registerDocumentLinkProvider(
    ['javascript', { pattern: '**/package.json' }],
    {
      provideDocumentLinks(document, token) {
        let links: any = [];
        let lineIndex = 0;
        let shouldCheckForDependency = false;
        const registryUrlPattern = getConfig(`${cmdPrefix}Pattern`) as any;
        const registryUrl = getConfig(`${cmdPrefix}`);
        while (lineIndex < document.lineCount) {
          const line = document.lineAt(lineIndex);
          if (shouldCheckForDependency) {
            if (line.text.includes('}')) {
              shouldCheckForDependency = false;
            } else {
              const matches = line.text.match(/"(.*?)"/);
              if (matches) {
                links.push(buildLink(registryUrlPattern, registryUrl, line, lineIndex, matches[1]));
              }
            }
          } else {
            shouldCheckForDependency = /"(.*?)dependencies"/i.test(line.text);
          }
          lineIndex += 1;
        }
        return links;
      }
    }
  ));
}

export function deactivate() {}
