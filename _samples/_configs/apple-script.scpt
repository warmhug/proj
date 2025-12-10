#!/usr/bin/osascript

-- 注意 osascript 的注释和 bash 脚本不同！
-- 执行文件 `osascript /path/to/xx.scpt`


-- 将 Chrome 窗口放到最前面
tell application "Google Chrome"
    activate -- 激活 Chrome 窗口
    repeat with w in windows
        if title of w = "topmost_page" then
            set index of w to 1
            exit repeat
        end if
    end repeat
end tell

-- 将 Chrome 窗口放到最前面
tell application "Google Chrome"
  set frontmost to true
  repeat with w in windows
    if title of w = "topmost_page" then
      set index of w to 1
    end if
  end repeat
end tell

-- 打开 Chrome 的第一个标签页
tell application "System Events"
	tell application "Google Chrome" to activate
	key code 18 using command down
end tell

tell application "System Events" to keystroke "r" using {option down, command down}

tell application "System Events" to keystroke "l" using command down & shift down

tell application "System Events"
  key code {123, 124} using {shift down, command down} -- ⇧⌘←, ⇧⌘→
  keystroke "c" using command down -- keystroke "C" would be treated as ⇧C
end tell

-- 实现 Command Shift N 功能
tell application "System Events"
	tell application "Safari" to activate
	key code 45 using {command down, shift down}
end tell

-- 点击 macOS 顶部菜单
tell application "System Events" to tell process "ClashX"
  tell menu bar item 1 of menu bar 2
    click
    key code 31 using command down  -- 等同按下 Command O
    key code 15 using command down  -- 等同按下 Command R
    click menu item "更多设置" of menu 1
  end tell
end tell

tell application "System Events"
  key down {command}
  keystroke "f"
  key up {command}
end tell
