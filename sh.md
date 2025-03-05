# bash

- Unix 遵循的原则是 KISS (Keep it simple, stupid) do one thing and do it well。
- Linux 严格区分大小写。所有内容以文件形式保存，包括硬件。如：键盘 /dev/stdin 显示器 /dev/stdout
- Linux 不靠扩展名区分文件类型，靠权限区分。（.gz .tgz .sh等文件扩展名只是为了方便管理员查看）
- shell 是一个命令行解释器。shell 是壳，kernel 是内核。shell 把用户敲进去的命令、翻译为 linux 内核能识别的语言。
- sh: Bourne Shell 的缩写，可以说是目前所有 Shell 的祖先。 bash : Bourne Again Shell 的缩写，是 sh 的一个进阶版本。[Zsh 和 Bash 的不同](https://xshell.net/shell/bash_zsh.html)
- [vim 键盘图](https://zos.alipayobjects.com/rmsportal/MOPJrAnojdFvAToZkESi.gif) vi编辑器使用color-scheme `:colo desert` 或者 配置 `~/.vimrc` 为 `colo desert` + `syntax on` 。
- 不同平台安装包 macOS `brew install jq` Ubuntu/Debian `sudo apt-get install jq` CentOS/Fedora `sudo yum install jq`
- bash 文件 想在 mac 上双击可执行(调用系统terminal)，需要去掉文件后缀名。

## 基础

bash 脚本 env 优先级
- node: 命令行的 environment 配置 > 文件 `/path/to/my/project/.npmrc` > 文件 `~/.npmrc` > 文件 `/etc/npmrc` 逐级覆盖
- 其他: zshrc / bashrc 同理

```sh
env / w / who / whoami / tty / last / nettop / nslookup / mtr -r
echo "system: $HOME $PATH $SHELL"
printenv HOME  # 打印环境变量
printenv | grep npm_config  # 查看所有 npm 设置的 env

unset npm_config_registry  # 删除特定 env
unset npm_config_userconfig  # 删除特定 env

#!/usr/bin/env -i bash   # 重置所有环境变量
export PATH=/usr/bin:/bin
export HOME=/home/username
export TERM=xterm-256color
```

一个脚本调用另一个脚本里的函数

```sh
bash ./scripts/script.sh # 这么做无效
[ -s "./scripts/script.sh" ] && \. "./scripts/script.sh"

# 命令行 或 npm script 执行 bash 脚本里的函数
source script.sh && fn_name
bash script.sh && fn_name
bash script.sh fn_name  # 需要在脚本里 $1 为 fn_name 时手动执行一下
bash -c '. script.sh && fn_name'
zsh -c "source script.sh; fn_name"
```

语法

```sh
#!/bin/bash
# bash 处理复杂数据：在 Bash 3 中，不能直接在函数内部引用或修改外部数组。

type fn_name
type -a node / pwd

# 用双引号包括变量，能保留换行
str="{
"a": "b"
}"

local str="long...\
实际不换行"
local str1="第一行
第二行"
local num=1
local num="$num"2  # 或 num=${num}2
local new_msg="Merged $(($num-1)) $((${num}-1)) commits"
echo $str $str1 $num $new_msg

local blank_path="/Applications/Google\" \"Chrome.app/Contents/MacOS/Google\" \"Chrome"
local blank_path=/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome
local blank_path="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
local escaped_blank_path=${blank_path////\\/}
echo $escaped_blank_path
printf "这是要写入文件的内容\n"

# 设置默认值
default_value="default"
# 使用参数扩展来获取值，若无则用默认值
value="${1:-$default_value}"

# 数组
myArray=("apple" "banana" "cherry")
myArray+=("element1" "element2" "element3")
newMyArray=("${myArray[@]}")
echo "${myArray[0]}"
echo "${myArray[1]}"
echo "${myArray[@]}"
# 遍历输出
for item in "${myArray[@]}"; do echo "$item"; done

cd /path/to/dir || { echo "路径无效"; exit 1; }
data_str="master-"$(date +"%Y%m%d-%H%M%S")

# 输入输出  使用 eval 不安全，也难解决命令参数 含有空格和引号 的情况
eval "ls -l" >> "/tmp/a_log.txt"
eval "ls -l" 2>&1 | tee -a "/tmp/a_log.txt"
(exec eval "ls -l" 2>&1 | tee -a "/tmp/a_log.txt") >/dev/null
eval "$command" >> "$file" 2>&1

# 读取用户输入
read -n1 -rsp $'Press any key to exit...\n'
read answer
if [[ $answer = "" ]] || [[ $answer = "y" ]]; then
 echo "do sth"
else
 echo You quite
fi

# 兼容 bash 和 zsh 颜色和换行
# 依赖特定 Shell 的转义序列  (Zsh 的一些插件和配置 可能会影响换行的显示效果)
echo -e "\033[31mRed text\033[0m"
echo -e "Line 1\nLine 2"

# 使用 tput 命令，不依赖特定 Shell 的转义序列
RED=$(tput setaf 1)
RESET=$(tput sgr0)
echo "${RED}Red text${RESET}"
# 检测不同的 shell 分别设置
if [ -n "$BASH_VERSION" ]; then
  RED='\033[31m'
  RESET='\033[0m'
elif [ -n "$ZSH_VERSION" ]; then
  RED='%F{red}'
  RESET='%f'
fi
echo "${RED}Red text${RESET}"
```

case 语句

```sh
sync_code() {
  unset npm_config_registry
  echo "===== start clean ====="
}
case $1 in
  "sync_code") sync_code $2 ;;
  # "two") functionTwo ;;
esac
```

函数的返回值和错误处理

```sh
function hl() {
  if [ $# -eq 0 ]; then
    echo "Usage: $0 xx"
    return 1
  fi
}
first_function() {
  return "$1"  # 返回传入的参数作为状态码
}
second_function() {
  first_function "$1" || return 1  # 如果 first_function 失败，立即返回 1
  echo "first_function succeeded, continuing..."
  return $?  # 直接返回 first_function 的状态码
}
second_function 0  # 传入 0
second_function 1  # 传入 1
echo "Return value of second_function: $?"

my_function() {
  return 1  # 模拟失败
}
my_function
if [ $? -ne 0 ]; then
  echo "Error: Function failed!"
  exit 1  # 或者根据需要退出脚本
fi
# command && success_action: 当 command 成功时执行 success_action
# command || failure_action: 当 command 失败时执行 failure_action
my_function || echo "Function failed!"
get_message() {
  echo "Hello, World!"
}
check_status() {
  if [ "$1" -eq 1 ]; then
    return 0  # 成功
  else
    return 1  # 失败
  fi
}
# 错误处理
trap 'echo "Error occurred on line $LINENO"; exit 1' ERR
message=$(get_message)
echo "Message: $message"
check_status 0 && echo "Status check passed" || echo "Status check failed"
echo $? # 获取 函数 return 返回值
# 使用 set -e 会使脚本在任何命令返回非零状态时立即退出
set -e
check_status 0
echo "This will run because check_status passed."
check_status 2  # 这会导致脚本退出，因为 set -e 会触发
echo "This won't be displayed."
```

后台运行命令 & 和 nohup

```sh
# 注意  & 会随着 terminal 的关闭 而自动停止运行
/path/to/xx.sh >> /path/to/log.txt 2>&1 &
ttyd -W -a zsh >> log.txt 2>&1 &

nohup sleep 100 &
# 最后一个后台运行进程的 PID
echo $!
echo $! > "flag_file.log"

# nohup 不会随着 terminal 的关闭而停止、会在 系统关闭 时停止运行
nohup echo "Hello World"
my_command='echo "Hello World" && sleep 30'
nohup bash -c "$my_command" > output.log
nohup bash -c 'echo "Hello World" && sleep 30' > output.log
# 临时文件
echo 'echo "Hello World" && sleep 30' > /tmp/my_script.sh
chmod +x /tmp/my_script.sh
nohup /tmp/my_script.sh > output.log
# 如果不需要输出日志，可以将其重定向到 /dev/null
nohup bash -c 'your_command_here' > /dev/null 2>&1 &
```


识别字符串包含的中文

```sh
# 定义要检查的字符串
string="Hello，世界！"
# string="Hello"

# 使用 printf 将每个字符转换为 Unicode 编码
for ((i=0; i<${#string}; i++)); do
  char="${string:i:1}"
  unicode=$(printf "%04X" "'$char")
  echo "字符: $char, Unicode 编码: \\u$unicode"
done

# 使用 bash 语句, 在 macOS 里不正常
if [[ $string =~ [\u4e00-\u9fa5] ]]; then
  echo "字符串包含中文"
else
  echo "字符串不包含中文"
fi

# 使用 Node.js 检查字符串是否包含中文字符
if node -e "let s = process.argv[1]; process.exit(s.match(/[\u4e00-\u9fa5]/) ? 0 : 1)" "$string"; then
  echo "字符串包含中文字符。"
else
  echo "字符串不包含中文字符。"
fi
```


## ps / OS

Process status

```sh
ps -ax
ps aux | grep xx.sh  # 列出正在运行的脚本进程
ps aux | grep "xx" | grep -v grep  # 排除 grep 本身的进程
ps -ef | grep ttyd
ps -ef | grep adb  # 有时候 adb devices 没反应 需要杀掉进程重启

pgrep -x 'ClashX'  # 获取应用的 pid
pgrep -f "ttyd zsh"  # -f 匹配完整的命令行
pgrep -f "ttyd -t disableLeaveAlert=true zsh"  # 参数解析后不一样 这里匹配不到
pgrep -f "ttyd zsh"> /dev/null  # 只返回输出码
pgrep -fx "ttyd -p 9999 -W -a zsh"
pgrep -u "$USER" -f "ttyd"
pgrep -u "$USER" -fx "ttyd -p 9999 -W -a zsh"

lsof "$z_log"
# z_log 文件正被进程 ttyd 打开, 文件描述符 1w 和 2w 表明它正在被用作标准输出和标准错误的重定向.
# 这时候 z_log 文件不能被其他进程 以 > 方式 写入内容, 改为 truncate -s 0 "$z_log" 处理.
# COMMAND  PID USER   FD   TYPE DEVICE SIZE/OFF     NODE NAME
# ttyd    1245  hua    1w   REG    1,6  16 65909077 /Users/hua/xx/z_log
# ttyd    1245  hua    2w   REG    1,6  16 65909077 /Users/hua/xx/z_log

lsof -i :8087   # 查找出占用了某个端口的程序和其对应的PID
kill 3747  # 杀掉 进程id
kill -9 *pid*  # 强制杀掉进程

# 持续显示进程信息
while true; do
  clear
  ps aux | awk '{print $2, $3, $11}' | sort -k2 -nr | head -n 10
  sleep 2
done

# 验证
sh -c "top -l 1 -pid 1234"
sh -c 'while true; do (ls -la); echo "---- $(date +%H:%M:%S) ----"; sleep 1; done'
sh -c 'while true; do (top -l 1 -stats pid,cpu,mem,command | grep -v " 0.0 " | head -n 20); sleep 1; done'
```

OS

```sh
top #  man top
top -l 1 -o cpu | head -n 20
top -l 1 -stats pid,cpu | head -n 20
say hello
open -a Activity\ Monitor # 打开活动监视器 或者 "Activity Monitor"

# defaults read 查看系统设置
defaults write com.apple.screencapture type jpg
defaults write com.apple.screencapture location ~/Downloads/
defaults write com.apple.Music autoPlay -bool false

ifconfig  # 查看本机内网IP
curl ipinfo.io/json  # curl ifconfig.me  查看本机公网IP
traceroute baidu.com  # 查看域名路由 或 `ping baidu.com`

sudo mount -uw /  # 挂载系统分区为可写
/sbin/mount -uw /
mount | grep /  # 查看系统挂载状态

pmset noidle # 阻止电脑睡眠 同时按住 shift、control、电源键，关闭显示器

timeout 3600 some-command
zip -e output.zip ~/xx.txt  # zip加解密

# 系统任务在 /etc/crontab 或 /etc/cron.d/ 目录，需要管理员权限
# crontab 文件一般位于 /var/at/tabs/<username> 或 /var/cron/tabs/<username> 不建议直接改
crontab -l  # 查看当前的 crontab 内容
crontab -e  # 编辑 cron 配置 保存后 cron 会自动加载和应用
sudo launchctl list | grep cron  # 检查 cron 服务是否正常运行
# 如果未启动
sudo launchctl load -w /System/Library/LaunchDaemons/com.vix.cron.plist
```

crontab -e 脚本内容示例

```sh
# 立即运行任务
* * * * * zsh -ic 'scheduled_tasks backup' >> ~/cron_test.log 2>&1
# 接下来的 1 分钟和 2 分钟执行
* * * * * zsh -ic 'scheduled_tasks backup' >> ~/cron_test.log 2>&1
*/2 * * * * zsh -ic 'scheduled_tasks clear_logs' >> ~/cron_test.log 2>&1
# 50 11 * * * /bin/bash -c 'source ~/.zshrc; scheduled_tasks backup'
# 每天上午 11:50 执行备份
50 11 * * * zsh -ic 'scheduled_tasks backup' >> xxx/z_log 2>&1
# 每隔三天上午 11:49 清空日志文件
49 11 */3 * * zsh -ic 'scheduled_tasks clear_logs' >> xxx/z_log 2>&1
```


## 文件 目录

```sh

history 10 # 列出10条

# ls 命令默认只显示文件名
ls /usr/bin  # 有 env
ls /usr/local/bin  # 有 node npm npx
ls -d $PWD/*
ls -la
ls -l "$z_log"  # 查看文件是否有 读写权限，如无 运行 chmod u+rw "$z_log"

ls /Volumes/Macintosh\ HD/Applications
ls /System/Applications
ls /Applications
# 内置应用文件(夹) 是 Read-only 删除/隐藏 应用图标 都不行
sudo chflags hidden /System/Applications/Home.app
sudo rm -rf /System/Applications/Chess.app
sudo rm -rf /Applications/Mail.app
# Videos.app  Tips.app  Stocks.app  Photo Booth.app  Image Capture.app

cat "$z_log"
rm -rf xx # rm 删除不存在的文件或目录 加上 -f 不会报错
mkdir -p ~/inner/aa && touch $_/file.txt  # 创建目录并能生成文件

more filename # 一页一页的显示档案内容.
head/tail -n 20 ~/.zsh_history  # 只看 头/尾 几行(默认10行)

ln -s source_file dist
mv fname rename / cat -n fname

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
```


## 工具函数

```sh
datef() {
  local fmt="${1:-"%Y_%m_%d-%H_%M_%S"}"
  local output=$(date "+$fmt")
  echo "[$output]"
  # date "+$fmt"
}
# datef "%Y-%m-%d"
```

2024 base64 加解密敏感词

```sh
input_string="your string to encode"
encoded_string=$(echo -n "$input_string" | base64)
decoded_string=$(echo -n "$encoded_string" | base64 --decode)
```

2014 ssh 登录 ssh & scp

```sh
scp -r ~/Downloads/build/ root@118.31.47.xx:/home/admin/nginx/
ssh root@118.31.47.xx xyxyxy
cd /home/admin/nginx/
cp -r ./build ./build-back1

echo "进行 xx 操作 \n\r" \
&& cd ~/my/work/project/xx \
&& spm build && spm deploy \
# 对引号进行转义
expect -c "spawn ssh admin@xx.net
expect \"password:\"
send \"password22\r\"
send \"cd ccbin && ./ccupdate.sh \n\"
interact "
```


## 系统自启动命令

定期删除日志

```sh
log_files=("$z_log" "${z_log}_nohup")
cleanup_old_logs() {
  local log_dir=$(dirname "${log_files[0]}")
  local max_logs=10 # 最多保留 10 个轮换日志
  local old_logs
  old_logs=$(ls -t "$log_dir"/*_rotated_* 2>/dev/null | tail -n +$((max_logs + 1)))
  if [[ -n "$old_logs" ]]; then
    echo "$old_logs" | while read -r old_log; do
      rm -f "$old_log"
      echo "Deleted old log file: $old_log" >> "$z_log"
    done
  else
    echo "No old logs to clean up." >> "$z_log"
  fi
}
clear_logs() {
  echo "run scheduled_tasks (clear_logs)" >> "$z_log"
  for log_file in "${log_files[@]}"; do
    if [[ -f "$log_file" ]]; then
      if lsof "$log_file" > /dev/null 2>&1; then
        local rotated_file="${log_file}_rotated_$(date '+%Y-%m-%d_%H-%M-%S')"
        mv "$log_file" "$rotated_file"
        touch "$log_file"
        echo "File $log_file was in use. Rotated to $rotated_file." >> "$z_log"
      else
        > "$log_file"
      fi
    else
      echo "File $log_file does not exist, skipping..." >> "$z_log"
    fi
  done
  # 清理旧的轮换日志
  cleanup_old_logs
}
```

运行命令 检查进程 如果不存在 则用 nohup 启动命令 存在则运行 command_query 自定义命令
可以放在 zshrc 中，用在 ttyd 时比较方便

```sh
command_query="$1"
run_command() {
  local flag_file="$HOME/z_run_command"
  local x_command="$1"
  local x_command_flag="$2"
  echo "run by USER: $USER" >> "$z_log"
  echo "run by whoami: $(whoami)" >> "$z_log"
  local ppid=$(ps -p $PPID -o comm=)
  echo "called by: $ppid (PID: $PPID)" >> "$z_log"
  local parent_cmd=$(ps -p $PPID -o args=)
  echo "Full caller: $parent_cmd" >> "$z_log"
  echo "called from terminal: $(tty)" >> "$z_log"
  echo "called with arguments: $@" >> "$z_log"
  # echo "Caller process info (lsof -p $ppid):" >> "$z_log"
  # lsof -p $PPID >> "$z_log"

  local pid=$(ps aux | grep -w "$x_command" | grep -v grep | awk '{print $2}')
  local pid1=$(pgrep -u "$USER" -f "$x_command_flag")
  echo "whether running?: $pid" >> "$z_log"
  # 只能输出第一行
  echo "whether running1?: $pid1" >> "$z_log"
  # 输出多行
  echo "$pid1" | while read -r spid; do
    echo "running Instance PID: $spid" >> "$z_log"
  done

  # 通过环境变量防止递归调用 跳过处理
  # if [[ -n "$x_command_RUNNING" ]]; then
  #   echo "return function" >> "$z_log"
  #   return
  # fi
  # export x_command_RUNNING=1

  if [[ "$ppid" == "$x_command_flag" ]]; then
    echo "command_query: $command_query" >> "$z_log"
    zsh -c "$command_query"
  fi
  # 检查标志文件是否存在
  if [[ -f "$flag_file" ]] && ps -p "$(cat "$flag_file")" > /dev/null 2>&1; then
    echo "$x_command_flag is already running" >> "$z_log"
    return
  fi
  # 启动命令
  echo "run command by nohup: $x_command" >> "$z_log"
  nohup zsh -c "$x_command" >> "$z_log" 2>&1 &
  # 记录 后台命令的 PID 注意要用 >
  echo $! > "$flag_file"
}
run_command "ttyd -W -a zsh" "ttyd"
# http://localhost:7681/?disableLeaveAlert=true&arg=/Users/hua/.zshrc&arg=top
# http://localhost:7681/?disableLeaveAlert=true&arg=/Users/hua/.zshrc&arg=echo aa
# 支持多实例
# run_command "ttyd -p 9999 -W -a zsh" "ttyd"
# http://localhost:9999/?disableLeaveAlert=true&arg=/Users/hua/.zshrc&arg=top
```


## node npm

检查 pnpm i 的安装错误

```sh
pnpm i 2>&1 | tee "$sync_log" | {
  echo "PIPESTATUS: ${PIPESTATUS[0]}"
  # 无法正确访问主管道的状态  因为 {} 块是在一个新的子 shell 中运行的。
}

pnpm i 2>&1 | tee "$sync_log"
# PIPESTATUS 必须在主 shell 中使用，不能在子 shell 中（包括 {}、() 等）。
if [ ${PIPESTATUS[0]} -ne 0 ]; then
  echo "pnpm i failed with an error. Terminating execution."
  exit 1
fi
# 检查日志中是否有 ERR_PNPM_FETCH_404
if grep -q 'ERR_PNPM_FETCH_404' "$sync_log"; then
  echo "Found ERR_PNPM_FETCH_404, displaying error details:"
  grep --before-context=5 --after-context=5 'ERR_PNPM_FETCH_404' "$sync_log"
  exit 1
fi
```

使用 pnpm 更新 workspaces 下所有 pkgs 的 outdated dependencies

```sh
# pnpm ls -r --depth -1
# pnpm outdated "@ant-design/pro-*" --filter "@ant-design/pro-form" --json
# pnpm up "@ant-design/pro-*" --filter "@ant-design/pro-form" --latest
function update_workspace_packages() {
  local update_pkgs=@ant-design/pro-*
  # local workspace_packages=$(pnpm ls -r --depth -1 --json | jq -r '.[] | select(.private == false) | .name')
  # echo $workspace_packages
  local filter_ws_pkgs=()
  local workspace_packages=$(pnpm ls -r --depth -1)
  while IFS= read -r line; do
    if [[ $line =~ ^[^[:space:]]+ ]] && [[ $line != *"(PRIVATE)"* ]]; then
      # Filter out the content before @ in each line
      filter_ws_pkgs+=(${line%@*})
    fi
  done <<< "$workspace_packages"
  for pkg in "${filter_ws_pkgs[@]}"; do
    outdated=$(pnpm outdated "$update_pkgs" --filter "$pkg" --json)
    if [ "$outdated" != "{}" ]; then
      echo "$pkg has outdated dependencies $outdated"
      pnpm up "$update_pkgs" --filter "$pkg" --latest
    else
      echo "$pkg's $update_pkgs dependencies is up to date."
    fi
  done
  echo "Workspace packages finish update"
}
# update_workspace_packages
```

查找某个 npm group 下所有包的 dependencies 里包含的指定依赖

```sh
#!/bin/bash
function create_package_json() {
  # package_json_str='{
  #   "name": "pkg_name",
  #   "version": "1.0.0"
  # }'
  # echo $package_json_str > package.json

  local default_deps="{}"
  local deps="${1:-$default_deps}"
  # echo "deps: $deps"

  json=$(jq -n --argjson deps "$deps" '{
  "name": "pkg_name",
  "version": "1.0.0",
  dependencies: $deps
}')
  # echo "json: $json"
  echo $json > package.json
}
# create_package_json
# exit

function search_dep() {
  # 先运行 sudo npm cache clean --force 能避免 npm error code EEXIST 错误
  local result_file="log.txt"

  local default_group="@ant-design"
  local default_registry="https://registry.npmmirror.com"
  local default_search_name="react"
  local default_search_size=300
  local group="${1:-$default_group}"
  local registry="${2:-$default_registry}"
  local search_name="${3:-$default_search_name}"
  local search_size="${4:-$default_search_size}"

  local pkgs=$(npm search $group --json --registry=$registry --searchlimit=$search_size)
  # echo "pkgs: $pkgs"
  local all_deps=$(echo "$pkgs" | jq -r '[.[] | {(.name): .["dist-tags"].latest}] | add')
  create_package_json "$all_deps"
  # return

  local pkg_names=$(npm search $group --json --registry=$registry --searchlimit=$search_size | jq -r '.[].name')
  echo "list: $pkg_names"
  for pkg_name in $pkg_names; do
    local deps=$(npm view $pkg_name dependencies --json --registry=$registry)
    # search_result=$(jq --arg name "$search_name" -r '.[$name]' <<< "$deps")
    search_result=$(jq -r '."'$search_name'"' <<< "$deps")
    echo "
pkg_name: $pkg_name
dependencies: $deps" >> $result_file
    if [ -n "$search_result" ]; then
      echo "search_result: $search_name $search_result
      " >> $result_file
    fi
  done
}
search_dep
```


## git

/.git/hooks/pre-commit 脚本

```sh
# yorkie 2.0.0
command_exists () {
  command -v "$1" >/dev/null 2>&1
}
if command_exists forever; then
  echo 'MY_Info: forever has been installed'
fi
has_hook_script () {
  [ -f package.json ] && cat package.json | grep -q "\"$1\"[[:space:]]*:"
}
# OS X and Linux only
load_nvm () {
  # If nvm is not loaded, load it
  command_exists nvm || {
    export NVM_DIR="$1"
    [ -s "$1/nvm.sh" ] && . "$1/nvm.sh"
  }
}
run_nvm () {
  # If nvm has been loaded correctly, use project .nvmrc
  command_exists nvm && [ -f .nvmrc ] && nvm use
}
# Check if pre-commit is defined, skip if not
has_hook_script pre-commit || exit 0
export PATH="$PATH:/usr/local/bin:/usr/local"
# Try to load nvm using path of standard installation
load_nvm /Users/hua/.nvm
run_nvm
# Export Git hook params
export GIT_PARAMS="$*"
# Run hook
node "./node_modules/yorkie/src/runner.js" pre-commit || {
  echo
  echo "pre-commit hook failed (add --no-verify to bypass)"
  exit 1
}
```

添加删除 remote repo

```sh
# 如果原来没有 kj 这里 remove 会报错 # fatal: No such remote: 'kj'
# git remote remove kj
local kj_remote=$(git config --get remote.kj.url)
[[ -z "$kj_remote" ]] && git remote add kj $kj_git
git remote -v
git fetch kj master || { echo "fetch kj 失败"; exit 1; }
```

获取 git log 的 第一条 最后一条 总数 等信息，放到 bash 数组里

```sh
branch_name="$1"
if [ -z "$1" ]; then
  # 设为 current_branch
  branch_name=$(git symbolic-ref --short HEAD)
fi
echo $branch_name

all_commits_num=$(git rev-list --count HEAD)
all_commits=$(git log $branch_name --format=%H:%an:%s)
all_commits=$(git log $branch_name --pretty=%H)
latest_commit=$(git log $branch_name -1 --pretty=%H)
skip_latest_commit=$(git log --skip=1 --pretty=%H)
first_commit=$(git log $branch_name --reverse --skip=1 $latest_commit --pretty=%H | head -n 1)
first_commit=$(git rev-list --max-parents=0 HEAD)
echo $latest_commit
echo $first_commit

declare -a commits_info

# 使用 while 循环读取 git log 输出，并将信息追加到数组中
while IFS= read -r line; do
  commits_info+=("$line")
done < <(echo "$all_commits")

echo "commits count: "${#commits_info[@]}

for info in "${commits_info[@]}"; do
  if [[ "$info" != "$first_commit" ]]; then
    echo "$info"
    # echo "${info%%:*}, ${info#*:}"
    # do sth
    # git cherry-pick $info
  else
    echo first_commit: "$first_commit"
  fi
done
```

检查是否是 git 仓库

```sh
# directory_path="/path/to/directory"
# git -C "$directory_path" rev-parse --is-inside-work-tree > /dev/null 2>&1
is_git_repo=0
if git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
  is_git_repo=1
  echo -e "\033[31mgit status:\033[0m
  "$(git status)
else
  echo "当前不是 git 仓库"
fi
if [ "$is_git_repo" != "1" ]; then
  echo "不是 git 仓库"
  exit 1
fi
```

删除 git 仓库的 tag

```sh
remote_tags=$(git ls-remote --tags origin)
remote_tags=$(git ls-remote --tags origin | awk '{print $2}' | sed 's#refs/tags/##')
remote_tags=$(git ls-remote --tags origin | sed 's/.*refs\/tags\/\(.*\)/\1/')
local_tags=$(git tag -l)
# local_tags=$(git tag -l | sed -n 's/.*\///p')
function process_tags() {
  # if [[ $tag_info =~ refs/tags/(.+) ]]; then
  #   tag=${BASH_REMATCH[1]}
  # fi
  for tag_info in $1; do
    tag=$tag_info
    echo "Matched tag: $tag"
    # git tag -d "$tag"
    # git push origin --delete "$tag"
  done
}
process_tags "$remote_tags"
process_tags "$local_tags"

# 先 git tag -l > tags.txt
# 再运行本脚本
while read -r line; do
  git tag -d "$line"
  # git push origin --delete "$line"
done < tags.txt
```

git 修改 master~当前分支，所有commit里面非合规 email username

```sh
git fetch origin master:master
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo "正在处理当前分支: $CURRENT_BRANCH"
git update-ref -d refs/original/refs/heads/$CURRENT_BRANCH 2>/dev/null || true
# 使用git filter-branch来修改历史
git filter-branch -f --msg-filter 'sed -e "s/pinduoduo//g" -e "s/pdd//g"' -- master..HEAD
git filter-branch -f --env-filter '
    OLD_EMAIL_PATTERN="pinduoduo|pdd_waterdrop_bot"  # 要替换的邮箱的正则表达式
    NEW_EMAIL=""        # 新的邮箱地址
    NEW_NAME=""        # 新的邮箱地址
    if echo "$GIT_AUTHOR_EMAIL" | grep -q -E "$OLD_EMAIL_PATTERN"
    then
        export GIT_AUTHOR_EMAIL="$NEW_EMAIL"
    fi
    if echo "$GIT_COMMITTER_EMAIL" | grep -q -E "$OLD_EMAIL_PATTERN"
    then
        export GIT_COMMITTER_EMAIL="$NEW_EMAIL"
    fi
    if echo "$GIT_AUTHOR_NAME" | grep -q -E "$OLD_EMAIL_PATTERN"
    then
        export GIT_AUTHOR_NAME="$NEW_NAME"
    fi
    if echo "$GIT_COMMITTER_NAME" | grep -q -E "$OLD_EMAIL_PATTERN"
    then
        export GIT_COMMITTER_NAME="$NEW_NAME"
    fi
' -- master..HEAD
echo "修改完成!"
```

git 压缩提交

```sh
# 备份分支
function backup_branch() {
  if [ -z "$1" ]; then
    echo "请输入要备份的分支名"
    return 1
  fi
  local bk_branch_name=backup-$1
  local branch_exists=$(git branch | grep "$bk_branch_name")
  if [ -n "$branch_exists" ]; then
    echo -e "
    备份分支名 $bk_branch_name 已存在 请运行命令删除或改名
      git branch -D $bk_branch_name
    "
    return 1
  else
    # 做备份
    git checkout -b "${bk_branch_name}"
  fi
}
# 压缩分支的提交  使用 /bin/zsh 执行，不然显示有问题
function commits_squash() {
  local feature_branch="$1"
  local base_branch="$2"
  if [ -z "$1" ]; then
    local feature_branch=$(git symbolic-ref --short HEAD)
  fi
  if [ -z "$2" ]; then
    local base_branch="origin/master"
  fi
  # echo "参数 $1 $2 , $feature_branch $base_branch"

  local gitStatus=$(git status --porcelain)
  if [ "$gitStatus" != "" ]; then
    echo "Your git status is not clean"
    return 1
  fi

  backup_branch $feature_branch || return 1
  git pull

  echo "\033[32m
  合并 ${feature_branch} 成一个 commit，并归集所有待合并 commit 的 messages
  \033[0m"
  git checkout "${feature_branch}"

  calc_commits_num $base_branch $feature_branch
  local commits_num=$calc_commits_num_result
  echo $commits_num

  # 如果只有一个 commit，则无需合并
  if [ $commits_num -lt 2 ]; then
    echo "\033[32m
    只有一个提交，不需要压缩
    \033[0m"
    return 0
  fi

  # 收集所有待合并 commits 的 message
  local commits_message=""
  for ((i = commits_num - 1 ; i >= 0 ; i--)); do
    # MESSAGE=$(git log --format=%s HEAD~${i} -1)
    MESSAGE=$(git log --format='%h - %an - %ad %n %s' HEAD~${i} -1)
    commits_message+="${MESSAGE}

  "
  done
  local new_message="📦 chore: Squashed ${commits_num} commits:

  ${commits_message}"

  echo -e "\033[32m 请确认是否合并这些commits (y/n) : \033[0m"
  printf $new_message

  read answer
  [[ $answer = "n" ]] && return 1

  # 恢复到 base 分支的 最后一次提交
  git reset --soft $(git rev-parse HEAD~$commits_num)
  git add --all
  git commit -am "${new_message}"

  echo "
  建议再手动运行 git commit --amend 额外添加 commit 注释
  提交 git push --force-with-lease
  "
  # git log
  # git push origin "${feature_branch}" --force-with-lease
}
```

2024-07 获取分支名

```sh
cd "$(git rev-parse --show-toplevel || echo .)"
branch=$(git rev-parse --symbolic-full-name --abbrev-ref HEAD) && echo ${branch}
```

2016 自动 commit push

```sh
function commit() {
  # printf "\n"
  echo "\033[32m git op (y/n)?  \033[0m"
  read git_op
  [[ $git_op = "n" ]] && exit
  BASEDIR=$(dirname $0)
  ## echo $BASEDIR
  cd $BASEDIR
  echo "\033[32m git status \033[0m"
  git st
  echo "\033[32m git add -A \033[0m"
  git add -A
  echo "\033[32m git ci \033[0m"
  git ci -a -m 'autocommit'
  echo "\033[32m git push \033[0m"
  git push
  read -p "Press Return to Close..."
}
```


## 不同 gitlab 仓库同步代码

使用了 macOS 内置的 rsync diff 命令

sync.sh

```sh
#!/bin/bash

# export PATH="/usr/local/bin:/usr/bin:$PATH"

command_exists () {
  command -v "$1" >/dev/null 2>&1
}

add_blank_lines() {
  # return 1
  # echo -e "\n" >> $sync_log
  printf '\n%.0s' {1..5} >> $sync_log
}

get_special_files() {
  special_files=(".pnpmfile.cjs" ".npmrc" "pnpm-lock.yaml" ".git")
  # ignore config
  # special_files+=($(find packages/*/src -maxdepth 1 -type f \( -name "config.ts" -o -name "config.tsx" -o -name "config.js" \) -o -type d -name "config"))
  # special_files+=($(find pkgs-*/*/src -maxdepth 1 -type f \( -name "config.ts" -o -name "config.tsx" -o -name "config.js" \) -o -type d -name "config"))

  # for item in "${special_files[@]}"; do echo "$item"; done
}

if ! command_exists rsync; then
  echo "rsync command not found"
  exit 1
fi

get_special_files

# sync_repo_name="infra"
# sync_repo_name="pro-components"
sync_repo_name="$1"
if [ -z "$1" ]; then
  echo "Please input the repo name"
  exit 1
fi

sync_log="/tmp/${sync_repo_name}-log.txt"
sync_source=(
  "/tmp/${sync_repo_name}"
  "git@git.xx:fe/${sync_repo_name}.git"
  $(git config --get remote.origin.url)
  $(git rev-parse --abbrev-ref HEAD)
)
sync_min_gan_ci=$(echo -n "cGRk" | base64 --decode)
sync_target_kj=(
  "/tmp/${sync_repo_name}-kj"
  "git@gitlab.yy:"$sync_min_gan_ci"-fe/${sync_repo_name}.git"
  "https://gitlab.yy/$sync_min_gan_ci-fe/${sync_repo_name}"
)
sync_target_hk=(
  "/tmp/${sync_repo_name}-hk"
  "git@gitlab.zz:fe/${sync_repo_name}.git"
  "https://gitlab.zz/fe/${sync_repo_name}"
)
# code /tmp/infra-kj
# code /tmp/infra-kj/pnpm-lock.yaml
# code /tmp/infra-hk
# code /tmp/infra-hk/pnpm-lock.yaml

function clone_diff_sync_push() {
  echo "
Sync ${sync_source[0]} dir, except the following files:"
  for item in "${special_files[@]}"; do echo "  $item"; done

  local special_files_exclude=()
  for item in "${special_files[@]}"; do
    special_files_exclude+=("--exclude=$item")
    # echo $item
  done
  # echo "${special_files_exclude[@]}"

  local sync_target=("$@")
  git clone ${sync_target[1]} ${sync_target[0]}

  echo -e "\n===== diff and rsync files =====\n"
  echo -e "\n diff files \n" >> $sync_log
  diff -rq "${special_files_exclude[@]}" ${sync_source[0]} ${sync_target[0]} >> "$sync_log" 2>&1
  add_blank_lines

  echo -e "\n rsync files \n" >> $sync_log
  rsync -av "${special_files_exclude[@]}" --delete ${sync_source[0]}/ ${sync_target[0]} >> "$sync_log" 2>&1
  add_blank_lines

  echo -e "\n diff files after \n" >> $sync_log
  diff -r "${special_files_exclude[@]}" ${sync_source[0]} ${sync_target[0]} >> "$sync_log" 2>&1
  add_blank_lines

  cd ${sync_target[0]}
  local target_remote=$(git config --get remote.origin.url)
  echo $target_remote
  [[ "$target_remote" = "${sync_target[1]}" ]] || {
    echo "
  $target_remote and ${sync_target[1]} are different,
  git info is wrong
  "; exit 1;
  }
  echo -e "\n===== dir: $(/bin/pwd) =====\n"
  # npm config ls

  # Create a new branch and push it to gitlab
  local x_user=$(git config --get user.name)
  local branch_name="sync_xxx_"$(date +"%Y%m%d_%H%M%S")"_$x_user"

  git checkout -b $branch_name

  echo -e "\n rm pnpm-lock.yaml && pnpm i \n"
  echo -e "\n rm pnpm-lock.yaml && pnpm i \n" >> $sync_log
  rm -f pnpm-lock.yaml

  # pnpm i maybe ERR_PNPM_FETCH_404
  pnpm i 2>&1 | tee -a "$sync_log" | {
    # {} is a subshell, so we can't use exit directly
    cat
    exit 1
  }
  if [ ${PIPESTATUS[0]} -ne 0 ]; then
    if grep -q 'ERR_PNPM_FETCH_404' "$sync_log"; then
      # echo "Found ERR_PNPM_FETCH_404, displaying error details:"
      # grep 'ERR_PNPM_FETCH_404' "$sync_log"
      # grep --before-context=5 --after-context=5 'ERR_PNPM_FETCH_404' "$sync_log"
      exit 1
    fi
  fi
  # pnpm i 2>&1 | tee "$sync_log" | grep --before-context=5 --after-context=5 'ERR_PNPM_FETCH_404' && { echo "Found ERR_PNPM_FETCH_404, terminating execution."; exit 1; }
  add_blank_lines

  echo -e "\n git add && commit && push \n"
  echo -e "\n git add && commit && push \n" >> $sync_log
  git add --all >> "$sync_log" 2>&1
  git commit -m "chore(sync): sync code from xxx \"${sync_source[3]}\" to \"$branch_name\"" >> "$sync_log" 2>&1
  git push origin $branch_name

  echo "
Already pushed
  $branch_name
branch to
  ${sync_target[1]}

Web Link:
  ${sync_target[2]}/-/commits/$branch_name
  "
}

# Sync the code to kj / hk gitlab
function sync_code() {
  # delete current env registry
  unset npm_config_registry

  echo "===== start clean =====
  $sync_log
  ${sync_source[0]}
  ${sync_target_kj[0]}
  ${sync_target_hk[0]}
  "
  rm -rf ${sync_source[0]}
  rm -rf ${sync_target_kj[0]}
  rm -rf ${sync_target_hk[0]}
  echo "===== end clean =====
  "
  # if file not exist throw error
  # rm -f $sync_log
  > $sync_log

  if [[ "${sync_source[2]}" != "${sync_source[1]}" ]]; then
    echo "
    ${sync_source[2]} and ${sync_source[1]} are different.
    Please sync from xxx repo
    "
    exit 1
  fi

  # git-ssh, clone-dir, git-url, brook-url
  git clone ${sync_source[1]} ${sync_source[0]}
  cd ${sync_source[0]}
  git checkout ${sync_source[3]}
  cd -

  echo "From ${sync_source[1]} to
  ${sync_target_kj[0]}
  ${sync_target_hk[0]}
  "
  clone_diff_sync_push "${sync_target_kj[@]}"
  clone_diff_sync_push "${sync_target_hk[@]}"

  echo "
  Please go to the /tmp dir and view the ${sync_repo_name}-log.txt files
  "
}
sync_code
```

在其他bash脚本里调用 以上 sync.sh 脚本

```sh
if [ -s "./node_modules/@afe/monoaid/lib/sh/sync.sh" ]; then
  if [[ $1 = sync_code ]]; then
    echo "pro-log: sync code"
    ./node_modules/@afe/monoaid/lib/sh/sync.sh pro-components
    exit 0
  fi
else
  echo "pro-log: sync.sh not exists, please run pnpm install"
fi
```
