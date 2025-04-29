#!/usr/bin/env bash
# #!/bin/bash
# /bin/zsh

# export PATH="/usr/local/bin:/usr/bin:$PATH"
# export PATH="$PATH:/usr/local/bin:/usr/local"

# bash 处理复杂数据: 在 Bash 3 中 不能直接在函数内部引用或修改外部数组

# 使用 set -e 会使脚本在任何命令返回非零状态时立即退出
set -e

export TMP_VAR='tmp'  # 在 terminal 里临时设置环境变量
unset npm_config_registry  # 删除特定 env
unset npm_config_userconfig  # 删除特定 env

#!/usr/bin/env -i bash   # 重置所有环境变量
export PATH=/usr/bin:/bin
export HOME=/home/username
export TERM=xterm-256color

sh -c "top -l 1 -pid 1234"
sh -c 'while true; do (ls -la); echo "---- $(date +%H:%M:%S) ----"; sleep 1; done'
sh -c 'while true; do (top -l 1 -stats pid,cpu,mem,command | grep -v " 0.0 " | head -n 20); sleep 1; done'

bash ./scripts/script.sh # 这么做无效
[ -s "./scripts/script.sh" ] && \. "./scripts/script.sh"

# 命令行 或 npm script 执行 bash 脚本里的函数
source script.sh && fn_name
bash script.sh && fn_name
bash script.sh fn_name  # 需要在脚本里 $1 为 fn_name 时手动执行一下
bash -c '. script.sh && fn_name'
zsh -c "source script.sh; fn_name"


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




function hl() {
  if [ $# -eq 0 ]; then
    echo "Usage: $0 xx"
    return 1
  fi
}
second_function() {
  return $?  # 直接返回 first_function 的状态码
}
echo $? # 获取 函数 return 返回值
if [ $? -ne 0 ]; then
  echo "Error: Function failed!"
  exit 1  # 或者根据需要退出脚本
fi
# command && success_action: 当 command 成功时执行 success_action
# command || failure_action: 当 command 失败时执行 failure_action
my_function || echo "Function failed!"

# 错误处理
trap 'echo "Error occurred on line $LINENO"; exit 1' ERR



# /.git/hooks/ yorkie 2.0.0
command_exists () {
  command -v "$1" >/dev/null 2>&1
}
if command_exists forever; then
  echo 'MY_Info: forever has been installed'
fi

has_hook_script () {
  [ -f package.json ] && cat package.json | grep -q "\"$1\"[[:space:]]*:"
}
has_hook_script pre-commit || exit 0

# OS X and Linux only
load_nvm () {
  command_exists nvm || {
    export NVM_DIR="$1"
    [ -s "$1/nvm.sh" ] && . "$1/nvm.sh"
  }
}
run_nvm () {
  # If nvm has been loaded correctly, use project .nvmrc
  command_exists nvm && [ -f .nvmrc ] && nvm use
}
load_nvm /Users/hua/.nvm
run_nvm


# 读取用户输入
confirm_action() {
  local prompt_message="$1"
  local user_input

  read -p "$prompt_message (y/n): " user_input
  user_input=${user_input:-y}  # 默认值为 'y'，如果用户直接按回车

  if [[ $user_input =~ ^[Yy]$ ]]; then
    return 0  # 表示确认，返回成功状态
  else
    return 1  # 表示取消，返回失败状态
  fi
}

datef() {
  local fmt="${1:-"%Y_%m_%d-%H_%M_%S"}"
  local output=$(date "+$fmt")
  echo "[$output]"
  # date "+$fmt"
}
# datef "%Y-%m-%d"

add_blank_lines() {
  # return 1
  # echo -e "\n" >> $sync_log
  printf '\n%.0s' {1..5} >> $sync_log
}

get_special_files() {
  special_files=(".pnpmfile.cjs" ".npmrc" "pnpm-lock.yaml" ".git")
  # ignore config
  # special_files+=($(find packages/*/src -maxdepth 1 -type f \( -name "config.ts" -o -name "config.tsx" -o -name "config.js" \) -o -type d -name "config"))
  # for item in "${special_files[@]}"; do echo "$item"; done
}
# get_special_files


input_string="your string to encode"
encoded_string=$(echo -n "$input_string" | base64)
decoded_string=$(echo -n "$encoded_string" | base64 --decode)


# 识别字符串包含的中文
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

if [ "$1" -eq 1 ]; then
  return 0  # 成功
fi

if [[ "${a}" != "${b}" ]]; then
  echo "a"
fi

if [ -s "./lib/sh/sync.sh" ]; then
  \. "./lib/sh/sync.sh"
  fn xx
fi

if [ -z "$1" ]; then
  echo "Please input the repo name"
  exit 1
fi

if [[ -n $GIT_USER_NAME ]]; then
  git config --global user.name "$GIT_USER_NAME"
  git config --global user.email "$GIT_USER_EMAIL"
fi

if [[ $PACKMAN_PUBLISH_BRANCH =~ ^release- ]]; then
  echo "release branch pipeline"
fi

if [[ "$NPM_TAG" =~ ^(alpha|beta|rc|latest)$ ]]; then
  # node ./build-publish.mjs
  npx tsx ./build-publish.mjs
else
  echo "Local release is prohibited!"
fi


while true; do
  ls -l
  echo "
  ---- last update: $(date '+%H:%M:%S') ----
  "
  sleep 1
done

# 持续显示进程信息
while true; do
  clear
  ps aux | awk '{print $2, $3, $11}' | sort -k2 -nr | head -n 10
  sleep 2
done

sync_code() {
  unset npm_config_registry
  echo "===== start clean ====="
}
case $1 in
  "sync_code") sync_code $2 ;;
  # "two") functionTwo ;;
esac




# 2014 ssh 登录 ssh & scp
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
