
# misc

Excel 模糊匹配 <http://club.excelhome.net/thread-1048885-1-1.html>

## python

- [Python Data Science Handbook](https://jakevdp.github.io/PythonDataScienceHandbook/)
- [那些让人惊艳的Python库](https://mp.weixin.qq.com/s?__biz=MzI1NTAyMjgwNA==&mid=2457510474&idx=1&sn=6ddcb7b2e519a595c3bf3ba1a05f8fa8)

mac 需要安装 xcode (会附带 gcc) ，虽然自带了 Python ，但还是使用 Homebrew 安装 Python 为好。
Homebrew 会自动安装好 Setuptools 和 pip ，Setuptools提供 easy_install 命令，实现通过网络（通常Internet）下载和安装第三方Python包。

[macOS Sierra 安装 opencv 最简单方法](http://www.pyimagesearch.com/2016/12/19/install-opencv-3-on-macos-with-homebrew-the-easy-way/)

```sh
python -m http.server [port]  # Python 3 起服务器
python -m SimpleHTTPServer 3435  # python2 起服务器

brew install python python3  # 一起安装 2.7.x 和 3.x

# 检测是否生效。 https://docs.brew.sh/Homebrew-and-Python.html
which python  # right: /usr/local/bin/python  not: /usr/bin/python
which python2  # right: /usr/local/bin/python  not: /usr/bin/python
which python3 # right: /usr/local/bin/python3 not: /usr/bin/python3
python -V   # system Python interpreter
python2 -V  # Homebrew installed Python 2 interpreter
python3 -V  # Homebrew installed Python 3 interpreter (if installed)

# 使用 homebrew 安装的 python2 覆盖 “系统默认的” python2
# https://stackoverflow.com/questions/45622838/homebrew-python-2-7-vs-os-x-python-2-7
export PATH="$(brew --prefix python)/libexec/bin:$PATH"

# outdated: create some symbolic links
# brew linkapps python / python3

# sudo easy_install pip  # brew install python 时默认已经安装了？
sudo pip install virtualenv virtualenvwrapper  # 虚拟环境工具
```

## cpp

- [值得推荐的C/C++框架和库](https://www.ezlippi.com/blog/2014/12/c-open-project.html)

mac 安装 xcode 自动安装 c/c++ 编译器。

```sh
gcc file.c file1.c
g++ file.cc file1.cc
```

使用 "Eclipse for c++" IDE + CDT (全称C/C++ Development Toolkit)
另外搭配 cmake 的方法：<http://stackoverflow.com/a/38716337/2190503>

> 不建议用 Clion (直接集成了 cmake 工具)，收费、开的时间长有内存泄露问题。

## Go

编程哲学的重塑是Go语言独树一帜的根本原因，其它语言仍难以摆脱OOP或函数式编程的烙印，只有Go完全放弃了这些，对编程范式重新思考，对热门的面向对象编程提供极度简约但却完备的支持。Go是互联网时代的C语言，不仅会制霸云计算，10年内将会制霸整个IT领域。




---------

## plantuml

@startgantt
/'
单行注释、放在 单引号之间，多行注释前后加斜杠
[正式上线] lasts 1 day and starts at 2020/03/20
'/
'skinparam classFontSize 10'

scale 2
project starts the 2019/12/16
saturday are closed
sunday are closed
2020/01/01 is closed
2020/01/22 to 2020/02/02 is closed
2019/12/16 to 2019/12/30 are named [十二月]
2020/01/01 to 2020/01/31 are named [一月]
'2020/02/01 to 2020/02/30 are named [二月]'

-- 开发阶段（灰色背景是节假日、不计入总时间） --
[环境准备] as [hj] lasts 2 days and is colored in Lavender/LightBlue
then [首页 3d] lasts 3 days
[流程管理 4d] as [lc] lasts 4 days
[hj] -> [lc]

[<size:13><b>交付中心 <color:red>11d] as [jf] lasts 11 days
[jf] starts at [lc]'s end and is colored in Yellow/Green
[列表 3d] lasts 3 days and starts at [jf]'s start 
[大图 3d] lasts 3 days and starts at [jf]'s start
[明细 3d] lasts 3 days and starts at [jf]'s start
[大图 3d] lasts 3 days and starts at [jf]'s start
[任务 3d] lasts 3 days and starts at [jf]'s start
[权限 5d] as [qx] lasts 5 days and starts at [jf]'s end

-- 测试阶段 --
[集成测试 5d] as [jc] lasts 5 days and is colored in Fuchsia/FireBrick 
[qx] -> [jc]

@endgantt


## markdown 语法

:+1: :smile: :smiley: :laughing:
- [emoji-cheat-sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet/)
- [Emoji Unicode Tables](http://www.unicode.org/emoji/charts/full-emoji-list.html)

任务 `- [] 跑步` 或 `- [x] 吃饭`；普通链接 [test](http://example.net "optional") 。图片 ![img | center | 100x100](https://zos.alipayobjects.com/rmsportal/lcLKYXUWPbqkavfJbMGx.png "optional")。

| Item      |    Value | Qty  |
| :-------- | --------:| :--: |
| Computer  | 1600 USD |  5   |

<details>
  <summary>Is this production ready?</summary>
  Next.js has been powering `https://zeit.co` since its inception.
</details>
