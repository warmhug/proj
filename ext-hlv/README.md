# ext-hlv

文档
- 内置变量 https://code.visualstudio.com/docs/reference/variables-reference
- 所有内置命令(built-in commands)
  - https://code.visualstudio.com/api/references/commands
  - https://code.visualstudio.com/docs/getstarted/keybindings
  - https://gist.github.com/skfarhat/4e88ef386c93b9dceb98121d9457edbf
开发
- https://code.visualstudio.com/api/get-started/your-first-extension
- [contribution-points](https://code.visualstudio.com/api/references/contribution-points#Configuration-property-schema)
发布
- https://dev.azure.com/warmhug
- https://marketplace.visualstudio.com/manage/publishers/warmhug


```sh
# 使用 node@16 和 pnpm 会报错，使用 node@18 npm
sudo npm install -g @vscode/vsce
npm i

npm run pack
# vsce package  生成 vsix 文件
# code --install-extension ext-hlv-0.0.1.vsix  安装扩展
```

调试

- 双击打开 src/extension.ts 文件，按 F5 或 CMD SHIFT P (Debug: Start Debugging)。
- 在 Extension Development Host 窗口中，按下 Cmd+Opt+I 打开开发者工具，查看 console 输出。


# vscode
> 2020 ~ 2025

## tasks.json

```js
{
  // See https://code.visualstudio.com/docs/editor/tasks
  // 变量 https://code.visualstudio.com/docs/editor/variables-reference#_input-variables
  "version": "2.0.0",
  "tasks": [
    {
      "label": "run-my-shell",
      "type": "shell",
      "problemMatcher": [],
      "command": "echo  ${workspaceFolder} ${fileDirname} ${file} ",
      // "command": "./scripts/test.sh",
      // 命令面板 reload 即可运行
      // "runOptions": { "runOn": "folderOpen" },
    }
  ]
}
```

## settings.json
> 用户或项目目录

插件 Commands(usernamehw)

```js
{
  "commands.commands": {
    // 运行内置的 task 命令
    "Run task": {
      "command": "workbench.action.tasks.runTask",
      "args": "run-my-shell",
    },
    "reloadWindow": {
      "command": "workbench.action.reloadWindow",
      // "command": "workbench.action.toggleAuxiliaryBar",
      // "command": "workbench.action.togglePanel",
      "statusBar": {
        "text": "reloadWindow",
        "color": "yellow",
        "alignment": "left",
        "priority": -99,
      },
    },
    "array of themes to cycle through": {
      "command": "commands.toggleSetting",
      "args": {
        "setting": "workbench.colorTheme",
        "value": ["Quiet Light", "Solarized Light", "Monokai Dimmed"],
      },
      "icon": "symbol-color",
      "statusBar": {
        "text": "colorTheme",
        "color": "yellow",
        "alignment": "left",
      },
    },
    "SecondarySideBar": {
      "command": "workbench.action.toggleAuxiliaryBar",
      // "command": "workbench.action.togglePanel",
    },
    "Search for selected text": {
      "command": "commands.openExternal",
      "args": "https://www.google.com/search?q=${selectedText}",
      // "args": "https://duckduckgo.com/?q=%21+${selectedText}",
      // "args": {
      //   "target": "https://x.com",
      //   "target": "file:///Users/hua/.zsh_history",
      //   "app": "google chrome", // Or absolute path
      // },
      "statusBar": {
        "text": "google",
      },
    },
    // "Workspace folder": {
    //   "command": "workbench.action.openRecent",
    //   "statusBar": {
    //     "text": "${workspaceFolderBasename}",
    //   },
    // },
    // "Terminal: Run start": {
    //   "command": "workbench.action.terminal.sendSequence",
    //   "args": {
    //     "text": "npm start\r",
    //   },
    // },
    // "Organize imports": {
    //     "command": "editor.action.codeAction",
    //     "args": {
    //       "kind": "source.organizeImports",
    //     },
    // },
    // "Insert snippet": {
    //   "command": "editor.action.insertSnippet",
    //   "args": {
    //     "snippet": "$BLOCK_COMMENT_START ${0:?} $BLOCK_COMMENT_END",
    //   },
    // },
  },
}
```

## my.code-snippets

```js
{
  // Place your snippets for markdown here. Each snippet is defined under a snippet name and has a prefix, body and description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
	// $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the same ids are connected.
	// 自动生成 https://snippet-generator.app/?description=&tabtrigger=&snippet=&mode=vscode
	"Print to console": {
		"prefix": "log",
		"body": [
			"console.log('$1');",
			"$2"
		],
		"description": "Log output to console"
	},
  "Multi-line Comment": {
    "prefix": "comm",
    "body": [
      "/*",
      "$0",
      "*/"
    ],
    "description": "Insert multi-line comment"
  },
  "import": {
    "prefix": "imp",
    "body": [
      "import $1 from '$1';"
    ],
    "description": "import"
  },
  "setTimeout": {
    "prefix": "sto",
    "body": [
      "setTimeout(() => {}, 1000);"
    ],
    "description": "setTimeout"
  },
  "node server": {
    "scope": "shellscript",
    "prefix": "ser",
    "body": [
      "npx http-server --ignore-existing"
    ],
    "description": "start node server"
  },
	"Add link": {
		"prefix": "[]",
		"body": [
			"[]($1)",
			"$2"
		],
		"description": "add link"
	},
  // from slardar snippets
  "useState snippet": {
    "prefix": "ust",
    "body": "const [${1}, set${1/(^[a-zA-Z])(.*)/${1:/upcase}${2}/}] = useState(${2:default${1/(^[a-zA-Z])(.*)/${1:/upcase}${2}/}});",
    "description": "use state but it camel cases"
  },
  "reduck action": {
    "scope": "typescript",
    "prefix": "raction",
    "body": ["$1 : (state$2) => {", "$0", "", "}"],
    "description": "reduck action 快速创建"
  },
  "React unit test basic render": {
    "scope": "typescriptreact",
    "prefix": "reacttest",
    "body": [
      "import React from 'react';",
      "import { render, screen } from '@slardar/common-utils';",
      "import ${TM_DIRECTORY/^.+\\/(.*)$/$1/} from './${TM_DIRECTORY/^.+\\/(.*)$/$1/}';",
      "",
      "describe('${TM_DIRECTORY/^.+\\/(.*)$/$1/}', () => {",
      "  test('should be able to render', () => {",
      "    render(<${TM_DIRECTORY/^.+\\/(.*)$/$1/} />, { testId: 'node' });",
      "    expect(screen.getByTestId('node')).toBeDefined();",
      "  });",
      "});",
      ""
    ],
    "description": "React unit test skeleton basic component rendering"
  },
  "byted form生成": {
    "scope": "typescriptreact",
    "prefix": "bform",
    "body": [
      "import React, { useCallback } from 'react';",
      "import { Form } from '@slardar/byted';",
      "",
      "const FormItem = Form.Item;",
      "const FormControl = Form.Control;",
      "",
      "interface I${1:${TM_FILENAME_BASE}}Props {}",
      "",
      "const ${1:${TM_FILENAME_BASE}}: React.FC<I${1:${TM_FILENAME_BASE}}Props> = params => {",
      "  return (",
      "    <FormItem>",
      "      <FormControl field=\"\"></FormControl>",
      "    </FormItem>",
      "  );",
      "};",
      "",
      "export default ${1:${TM_FILENAME_BASE}}",
      ""
    ],
    "description": "byted form生成"
  },
  "react组件模版": {
    "scope": "typescriptreact",
    "prefix": "rcfc",
    "body": [
      "import React from 'react';",
      "import styled from 'styled-components';",
      "",
      "interface I$1Props {}",
      "",
      "const $1: React.FC<I$1Props> = () => {",
      "  return (",
      "    <>$0</>",
      "  );",
      "};",
      "",
      "export default $1"
    ],
    "description": "react组件模版"
  },
}
```

## my.code-workspace

```js
// [可选]创建 配置 Multi-root Workspaces
// 或者在 Multi-root Workspaces 的 .vscode/settings.json
// 修改 typescript 编译器， 工作区修改 lint 配置
{
  "folders": [
    { "name": "ROOT", "path": "./" },
    { "name": "slardar", "path": "./slardar" },
  ],
  "settings": {
    "typescript.tsdk": "slardar/node_modules/typescript/lib"
    "eslint.workingDirectories": [{"mode": "auto"}]
  }
}
```
