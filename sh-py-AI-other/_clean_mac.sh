#!/bin/bash
# macOS 清理预览 + 删除脚本
# 功能: 列出可清理目录中最大的前 20 项, 用户确认后再删除

# 清理系统缓存与日志, 能使 "设置 - storage - System Data" 占用显著变小  (重启系统)
# 缓存目录
# sudo rm -rf /Library/Caches/*
# sudo rm -rf ~/Library/Caches/*
# sudo rm -rf /private/var/log/*
# sudo rm -rf /private/var/folders/*

# 删除 xcode
# sudo rm -rf /Applications/Xcode.app
# sudo rm -rf ~/Library/Developer
# sudo rm -rf ~/Library/Caches/com.apple.dt.Xcode
# sudo rm -rf ~/Library/Application\ Support/Developer

set -e

CLEAN_PATHS=(
  "$HOME/Library/Caches"
  "/Library/Caches"
  "$HOME/Library/Logs"
  "/Library/Logs"
  "/private/var/log"
  "/private/var/folders"
  "$HOME/Library/Developer/Xcode/DerivedData"
  "$HOME/Library/Developer/Xcode/Archives"
  "$HOME/Library/Application Support/MobileSync/Backup"
)
TOP_N=20

print_divider() {
  echo "--------------------------------------------"
}

get_size() {
  du -sh "$1" 2>/dev/null | awk '{print $1}'
}

echo "🧹 macOS 清理预览"
print_divider

tmutil listlocalsnapshots /
# sudo tmutil deletelocalsnapshots <snapshot_name>
print_divider

for path in "${CLEAN_PATHS[@]}"; do
  if [ -d "$path" ]; then
    echo "📂 扫描目录: $path"
    echo "前 $TOP_N 个占用最大的项目:"
    sudo du -sh "$path"/* 2>/dev/null | sort -hr | head -n $TOP_N
    print_divider
  fi
done

echo -e "\n\n\n\n\n"

echo "🧹 macOS 交互式清理工具"
print_divider

initial_free=$(df -h / | awk 'NR==2 {print $4}')
auto_confirm=false

for path in "${CLEAN_PATHS[@]}"; do
  if [ ! -d "$path" ]; then
    continue
  fi

  echo "📂 目录: $path"
  echo "前 $TOP_N 个占用最大的项目:"
  sudo du -sh "$path"/* 2>/dev/null | sort -hr | head -n $TOP_N
  print_divider

  if [ "$auto_confirm" = false ]; then
    read -p "是否清理该目录？(y=是, n=否, a=全部是): " choice
  else
    choice="y"
  fi

  case "$choice" in
    y|Y)
      echo "🗑️ 删除中: $path ..."
      before_size=$(get_size "$path")
      sudo rm -rf "${path:?}/"*
      after_size=$(get_size "$path")
      echo "✅ 已清理 $path (原占用: ${before_size:-未知})"
      ;;
    a|A)
      echo "⚙️ 开启自动清理所有目录"
      auto_confirm=true
      sudo rm -rf "${path:?}/"*
      ;;
    *)
      echo "⏭️ 跳过 $path"
      ;;
  esac

  print_divider
done

final_free=$(df -h / | awk 'NR==2 {print $4}')

echo "🎉 所有目录处理完毕"
echo "💾 可用空间: 清理前 $initial_free → 清理后 $final_free"
print_divider
echo "✅ 清理完成!"
