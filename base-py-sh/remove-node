#!/bin/bash

# macOS Node.js 全局卸载脚本

# sudo rm -f /usr/local/bin/node
# sudo rm -f /usr/local/bin/npm
# sudo rm -f /usr/local/bin/npx
# sudo rm -rf /usr/local/lib/node_modules
# sudo rm -rf /usr/local/include/node
# sudo rm -f /usr/local/share/man/man1/node.1
# sudo rm -f /usr/local/share/man/man1/npm*
# sudo rm -rf /usr/local/share/doc/node
# sudo rm -rf /usr/local/lib/dtrace/node.d
# sudo rm -rf /etc/{paths.d,manpaths.d}/node

# rm -rf ~/.npm
# rm -rf ~/.node-gyp
# rm -rf ~/.npm-global

# npm cache clean --force
# pnpm store path  # prune

# 重装
# npm i -g yarn@1 pnpm@7 whistle git-open
# npm i -g @google/gemini-cli @openai/codex @anthropic-ai/claude-code

set -e

echo "🔍 检查 Node.js 全局安装路径..."

NODE_PATHS=(
  "/usr/local/bin/node"
  "/usr/local/bin/npm"
  "/usr/local/bin/npx"
  "/usr/local/lib/node_modules"
  "/usr/local/include/node"
  "/usr/local/share/man/man1/node.1"
  "/usr/local/share/man/man1/npm*"
)

for path in "${NODE_PATHS[@]}"; do
  if [ -e $path ] || [ -L $path ]; then
    echo "🗑 删除 $path"
    sudo rm -rf $path
  fi
done

# 检查是否是 Homebrew 安装
if brew list | grep -q "^node\$"; then
  echo "🍺 检测到 Homebrew 安装的 Node.js，正在卸载..."
  brew uninstall node
fi

# 检查是否还有残留
if which node >/dev/null 2>&1; then
  echo "⚠️ Node 仍然存在于 $(which node)，可能是通过 nvm 或其他方式安装的。"
else
  echo "✅ Node.js 已成功删除。"
fi

echo "✅ Node.js 和全局 npm 包已清理完成。"
echo "👉 建议运行 'which node' 和 'which npm' 确认是否完全卸载。"
