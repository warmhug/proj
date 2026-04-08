# vscode 扩展

```sh
# 使用 node@16 和 pnpm 会报错，使用 node@18 npm
npm install -g @vscode/vsce
npm i
npm run pack
# vsce package  生成 vsix 文件
# code --install-extension ext-hlv-0.0.1.vsix  安装扩展
```

调试: 按下 Cmd+Opt+I 打开开发者工具 查看 console 输出. 使用 debug 太复杂 放弃.

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


## 参考

https://github.com/usernamehw/vscode-commands

https://github.com/wk-j/vscode-save-and-run

https://github.com/alefragnani/vscode-bookmarks/blob/master/package.json

https://github.com/formulahendry/vscode-auto-close-tag/blob/master/package.json
