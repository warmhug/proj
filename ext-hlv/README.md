# vscode 扩展

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

- 打开 src/extension.ts 文件，按 F5 或 CMD SHIFT P (Debug: Start Debugging).
- 在 Extension Development Host 窗口中, 查看 output 输出的内容.
- 遇到问题, 按下 Cmd+Opt+I 打开开发者工具，查看 console 输出。
