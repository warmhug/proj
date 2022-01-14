var fs = require('fs'),
    path = require('path');

// 遍历目录
function searchDirSync(dir) {
    if (!dir) {
        return false;
    }
    try {
        fs.readdirSync(dir);
    } catch (e) {
        return false;
    }
    var dirArr = [];
    var search = function (dir) {
        try {
            var files = fs.readdirSync(dir);
            files.forEach(function (file, index) {
                var dpath = path.normalize(dir + '/' + file);
                var stats = fs.statSync(dpath);
                if (stats.isDirectory()) {
                    search(dpath);
                }
                dirArr.push(dpath);
            });
        } catch (err) {
            if (err && err.code === 'ENOENT') {
                //console.log('the dir is not exist..');
            }
        }
    }
    search(dir);
    return dirArr;
}

//检测路径里的文件，返回文件名
//e.g.
// getFileName('src/alert/alert.js', 'js') → alert
function getFileName(str, ext) {
    var arr = str.split('/'), len = arr.length;
    if (len < 1) {
        return;
    }
    var reg = new RegExp('(.*)\.' + ext + '$');
    var match = arr[len - 1].match(reg);
    if (match != null && match[1]) {
        return match[1];
    }
}

function replaceContent(holderCt, replaceCt) {
    if (!holderCt) {
        return;
    }
    if (!replaceCt) {
        return holderCt;
    }
    return holderCt.replace(/{{\s*placeholder\s*}}/g, replaceCt);
}

/**
 *   build生成单个组件文件 (把它的依赖打包进来)
 */
function singleBuild(dir) {
    var moduleStack = [];

    var clearBlank = function (str) {
        return str.replace(/(\r\n|\n|\r|\s)/gm, "");
    };
    var clearQuot = function (str) {
        return str.replace(/('|")/g, "");
    };
    var convertDir = function (str) {
        var uiReg = new RegExp('^laputa\.ui\.(.+)$');
        var utilReg = new RegExp('^lp\.utils\.(.+)$');
        var uiMatch = str.match(uiReg),
            utilMatch = str.match(utilReg);
        if (uiMatch != null && 2 == uiMatch.length) {
            return ['./src', uiMatch[1], uiMatch[1] + '.js'].join('/');
        }
        if (utilMatch != null && 2 == utilMatch.length) {
            return ['./src/_utils', utilMatch[1] + '.js'].join('/');
        }
    };
    var final = '';

    function loopCheck(dir) {
        //console.log(dir + '....dir')
        var ct = fs.readFileSync(dir, 'utf-8');
        var tem = ct.match(/[.\s\S]*angular\.module\(([^,]+),\s*\[([^\[\]]*)\]\)[.\s\S]*/);
        if (tem != null && 3 == tem.length) {
            var masterModule = clearQuot(clearBlank(tem[1]));
            if (moduleStack.indexOf(masterModule) > -1) {
                return '';
            } else {
                moduleStack.push(masterModule);
            }
            var temp2 = clearBlank(tem[2]);

            var depArr = temp2 ? temp2.split(',') : [];
            for (var i = 0; i < depArr.length; i++) {
                var item = depArr[i];
                item = clearQuot(item);
                loopCheck(convertDir(item));
            }
        }
        final += ct;
    }

    loopCheck(dir);
    return final;
}

//创建目录，如果有的话 不创建
function makeDir(dir) {
    /**
     //不支持不存在的目录？
     try{
        var stats = fs.statSync(dir);
        if(stats.isDirectory()){
            return true;
        }
     } catch (er) {
        fs.mkdirSync(dir);
     }

     */
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
}

module.exports = function () {
    //遍历源文件目录
    var fileDirs = searchDirSync('./src');

    makeDir('./dist');

    //生成存放单个组件的dist目录
    var modulesDistDir = './dist/modules';
    makeDir(modulesDistDir);

    //生成demo目录
    var demoBaseDir = './dist/demo';
    makeDir(demoBaseDir);

    //处理 modules.json 文件
    var moduleList = fs.readFileSync('./src/modules.json', 'utf-8');
    fs.writeFileSync('./dist/modules.json', moduleList);

    //读取布局文件
    var layoutHtml = fs.readFileSync('./src/layout.html', 'utf-8');

    var scripts = [], modules = [];
    fileDirs.forEach(function (item, index) {

        var iArr = item.split('/'), len = iArr.length;

        /**
         *  处理JS
         *  src / alert / alert.js
         *  src / _utils / dir.lpBindHtml.js → ["src", "_utils", "dir.lpBindHtml.js"]
         */
        var jsFileName = getFileName(item, 'js'); //获取js文件名
        if (jsFileName && 3 == len) {
            if ('_utils' == iArr[1] || iArr[1] == jsFileName) {
                scripts.push(item);
            }
            if (iArr[1] == jsFileName) {
                modules.push('laputa.ui.' + jsFileName);
                fs.writeFileSync(modulesDistDir + '/' + jsFileName + '.js', singleBuild(item));
            }
        }
        /**
         *  处理HTML
         *  src / select / docs / demo.html' → ["src", "select", "docs", "demo.html"]
         *  src / alert / docs / demo.html
         *  layout.html
         */
        var htmlFileName = getFileName(item, 'html'); //获取html文件名
        var combineHtml;
        if (htmlFileName && 4 == len) {
            if ('demo' == htmlFileName) {
                var innerLayoutDir = item.replace(/(.*\/)([^/]+)$/, '$1layout.html');
                var demoHtml = fs.readFileSync(item, 'utf-8');
                if (fileDirs.indexOf(innerLayoutDir) > -1) {
                    combineHtml = replaceContent(fs.readFileSync(innerLayoutDir, 'utf-8'), demoHtml);
                } else {
                    combineHtml = replaceContent(layoutHtml, demoHtml);
                }
                //创建相应的demo目录
                var dir = demoBaseDir + '/' + iArr[1];
                makeDir(dir);
                //写入文件
                fs.writeFileSync(dir + '/' + iArr[1] + '.html', combineHtml);
            }
        }
    });
    //console.log(scripts)
    //console.log(modules)

    return {
        scripts: scripts.length && scripts,
        str: "angular.module('laputa.ui', " + JSON.stringify(modules) + ");"
    }
}
