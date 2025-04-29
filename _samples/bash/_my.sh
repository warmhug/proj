

# 后台运行命令 & 和 nohup
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


# 定期删除日志
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


# 运行命令 检查进程 如果不存在 则用 nohup 启动命令 存在则运行 command_query 自定义命令
# 可以放在 zshrc 中，用在 ttyd 时比较方便

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
