#!/bin/bash

# 使用 pnpm 更新 workspaces 下所有 pkgs 的 outdated dependencies
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

# 查找某个 npm group 下所有包的 dependencies 里包含的指定依赖
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
# search_dep
