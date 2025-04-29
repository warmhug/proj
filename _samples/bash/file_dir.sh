


# 同步文件和目录
# 报错 cp: --exclude=a.txt is not a directory
cp -r test/* test1 --exclude=a --exclude='a.txt'
# 加引号 避免路径中间有空格
# 报错 cp: illegal option -- -
cp -r --exclude=a --exclude='a.txt' test/* test1

# 会排除掉 所有子目录 含有的同名 a.txt 文件
rsync -av --exclude='a.txt' --exclude='a/' test/ test1
# 在目标端删除源端不存在的文件
rsync -av --exclude='a.txt' --delete --dry-run test/ test1
rsync --version  # v2 不支持通配符
# 使用 .rsync-filter 文件配置
rsync -avF .rsync-filter test/ test1

# 创建一个临时目录用于存储 other-branch 的文件
mkdir /tmp/other
diff -r . /tmp/other
diff -rq . /tmp/other  # -q 只报告哪些文件不同
diff -r --exclude=".git" . /tmp/other
# 使用 --exclude="{.git,.svn}" 好像不正确
diff -r --exclude=".git" --exclude=".svn" dir1 dir2
diff -r --exclude=".git" dir1 dir2 dir3 > diff_output.txt
diff -r --exclude=".git" --exclude="node_modules" pro-components pro-componentsk > diff_output.txt

grep -rn 'grep' *  # 以 字符串 grep 来搜索 当前目录及子目录 的所有文件内容
grep grep$ she*.md  # 以 正则表达式 grep$ 来搜索 当前目录下 文件名匹配 she*.md 的内容
grep -r --include=\*.{cpp,h} pattern ./
grep -r --exclude-dir=node_modules pattern ~/

find . -name '*bash*'
find . -name "*.js" -not -path "*node_modules*" -not -path "*js-css-html*"
find . -name '*.DS_Store' -type f -delete   # 删除某目录及子目录下的 .DS_Store 文件
# find / -mmin -5   # 查找在系统中最后5分钟里修改过的文件(modify time)

# 如果文件存在则追加内容，否则创建并写入内容
# [ -f "$file" ] && echo "$content" >> "$file" || echo "$content" > "$file"
printf '\n%.0s' {1..10} >> $file

# unix diff 使用
function diff_gitignore() {
  gitignore=()
  GITIGNORE_FILE=".gitignore"
  if [ ! -f "$GITIGNORE_FILE" ]; then
    echo ".gitignore file not found in the current directory!"
    exit 1
  fi
  while IFS= read -r line; do
    # 移除行首尾的空白字符
    stripped_line=$(echo "$line" | tr -d '[:space:]')
    # 跳过空行和以 '#' 开头的注释行
    if [ -n "$stripped_line" ] && [ "${stripped_line:0:1}" != "#" ]; then
      # echo "$stripped_line"
      gitignore+=("--exclude=$line")
    fi
  done < "$GITIGNORE_FILE"
  # echo "${gitignore[@]}"
  for item in "${gitignore[@]}"; do echo "$item"; done
  # diff 的 exclude 参数 不认识 .gitignore 文件里的 **/**/es/** 这种写法
  # diff -rq --exclude=.git --exclude=**/**/es/** . /tmp/pro-components > diff.txt
}

# 获取当前路径和父路径
# echo "$(dirname $(/bin/pwd))"
# echo "$(basename $(/bin/pwd))"
current_path=$(/bin/pwd)
get_parent_dir() {
  local current_dir=$(basename "$current_path")
  local parent_dir="${current_path%$current_dir}"
  echo $parent_dir
}
parent_dir=$(get_parent_dir)
