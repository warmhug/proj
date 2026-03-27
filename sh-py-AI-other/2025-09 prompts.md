


生成 Modal 组件代码, 并放到 rocket-modal.tsx 文件里. 写法类似 an.

极端示例, 触发上下文长度限制: @html2sketch/models/ 翻译文件里的中文为英文, 包括注释


## 基本提示词

分析项目, 有什么问题?

检查 js 的缺陷, 比如 issues/case1.ts

生成一个简单 form 表单, 存成 form.html


## 内置工具调用

[
"list_directory", // 列出当前目录所有文件名
"write_file", // 写个 xx.log 文件到当前目录, 内容是 aaabbb
"glob", "replace", // 在 xx.log 文件的内容里替换 aaa 为 bbb
"read_file", "read_many_files", // 读取多个 log 文件的内容
"search_file_content", // 在当前目录里搜索 application 关键词
"run_shell_command", // 运行 npm run start 命令
"save_memory", // 新增通用提示词, 比如输入 /memory add 使用中文回复
"web_fetch",  // 获取远程内容
]


## english Project Analysis

Give me a summary of all of the changes that went in yesterday.

Describe the main pieces of this system's architecture.

Provide a step-by-step dev onboarding doc for developers new to the codebase.

Summarize this codebase and highlight the most interesting patterns or techniques I could learn from.

Identify potential areas for improvement or refactoring in this codebase, highlighting parts that appear fragile, complex, or hard to maintain.

Which parts of this codebase might be challenging to scale or debug?

Which tools, libraries, and dependencies are used in this project?

Convert all the images in this directory to png, and rename them to use dates from the exif data.
