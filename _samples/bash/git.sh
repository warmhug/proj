#!/bin/bash

misc() {

# 检查是否在 Git 仓库中
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
  echo "错误：当前不在 Git 仓库中"
  exit 2
fi
# 检测 HEAD 状态
# if git symbolic-ref --quiet HEAD; then
if git symbolic-ref HEAD > /dev/null 2>&1; then
  echo "HEAD 已附加到分支: $(git symbolic-ref --short HEAD)"
  exit 0
else
  commit_hash=$(git rev-parse --short HEAD)
  echo "HEAD 处于分离状态，当前提交: $commit_hash"
  exit 1
fi

# 先 git tag -l > tags.txt
# 再运行本脚本
while read -r line; do
  git tag -d "$line"
  # git push origin --delete "$line"
done < tags.txt

remote_tags=$(git ls-remote --tags origin)
remote_tags=$(git ls-remote --tags origin | awk '{print $2}' | sed 's#refs/tags/##')
remote_tags=$(git ls-remote --tags origin | sed 's/.*refs\/tags\/\(.*\)/\1/')
local_tags=$(git tag -l)

# 2024-07 获取分支名
cd "$(git rev-parse --show-toplevel || echo .)"
branch=$(git rev-parse --symbolic-full-name --abbrev-ref HEAD) && echo ${branch}

}

# 在 ~/.zshrc 里 根据目录动态切换 git user
chpwd() {
  WORK_GIT_NAME="Alice Work"
  WORK_GIT_EMAIL="alice@work.com"
  PERSONAL_GIT_NAME="Alice Personal"
  PERSONAL_GIT_EMAIL="alice@personal.com"
  WORK_DIR="$HOME/work"
  PERSONAL_DIR="$HOME/personal"
  if [[ $PWD == $WORK_DIR* ]]; then
    export GIT_USER_NAME="$WORK_GIT_NAME"
    export GIT_USER_EMAIL="$WORK_GIT_EMAIL"
  elif [[ $PWD == $PERSONAL_DIR* ]]; then
    export GIT_USER_NAME="$PERSONAL_GIT_NAME"
    export GIT_USER_EMAIL="$PERSONAL_GIT_EMAIL"
  else
    unset GIT_USER_NAME
    unset GIT_USER_EMAIL
  fi
}

# 获取 git log 的 第一条 最后一条 总数 等信息，放到 bash 数组里
get_git_log() {
  # current_branch
  branch_name=$(git symbolic-ref --short HEAD)
  all_commits_num=$(git rev-list --count HEAD)
  all_commits=$(git log $branch_name --format=%H:%an:%s)
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
}

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

# 2016 自动 commit push
function commit() {
  # printf "\n"
  echo "\033[32m git op (y/n)?  \033[0m"
  read git_op
  [[ $git_op = "n" ]] && exit
  BASEDIR=$(dirname $0)
  ## echo $BASEDIR
  cd $BASEDIR
  echo "\033[32m git status \033[0m"
  git status
  read -p "Press Return to Close..."
}
