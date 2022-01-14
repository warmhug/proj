/**
 *   初始化配置
 *      放到 ng 模块内
 */
(function (laputa) {

    var shim = laputa['shim'] || (laputa['shim'] = {});
    //配置项
    shim.providerConfigOff = false;
    shim.providerConfig = {
        sceUnable: true,
        unwrapPromises: true,
        setPostContentType: true,
        setTransformRequest: true
    };

    angular.module('ng').config([
        '$sceProvider',
        '$parseProvider',
        '$httpProvider',
        function ($sceProvider, $parseProvider, $httpProvider) {

            /**
             *  都不设置，直接return
             */
            if(shim.providerConfigOff) return;

            /**
             *  完全禁掉$sce，之后就不需要 ngSanitize 模块了！
             */
            if(shim.providerConfig.sceUnable){
                $sceProvider.enabled(false);
            } else {
                console.log( '不禁掉$sce，您可能需要 ngSanitize 模块，来支持 ng-bind-html 指令' );
            }

            /**
             *  http://thoughts.silentworks.co.uk/why-no-promise-angularjs-1-2/
             *  回归到支持 angular1.0.x 的包装promise的$http模块
             */
            if(shim.providerConfig.unwrapPromises){
                $parseProvider.unwrapPromises(true);
            }

            /**
             *  $http的 post提交 参数设置
             */
            if(shim.providerConfig.setPostContentType){
                $httpProvider.defaults.headers.post['Content-Type'] =
                    'application/x-www-form-urlencoded; charset=UTF-8';
            }

            /**
             *   $http 对请求参数统一序列化操作
             */
            if(shim.providerConfig.setTransformRequest){
                $httpProvider.defaults.transformRequest = [function (data) {
                    if (data) {
                        return jQuery ? jQuery.param(data) : data;
                    }
                }];
            }
        }
    ]);
})(window['laputa'] || (window['laputa'] = {}));
(function (laputa) {

    var shim = laputa['shim'] || (laputa['shim'] = {});
    //对 ng-app 做hack处理
    shim.hackNgApp = true;
    //增加 ng-appx 指令
    shim.addNgAppX = true;

    /**
     *  come from angular but modify it
     */
    var forEach = angular.forEach;
    var appElement, module;
    var appElements = [], modules = [];
    function angularInit(element) {
        var elements = [element],
            names = ['ng:app', 'ng-app', 'x-ng-app', 'data-ng-app'],
            NG_APP_CLASS_REGEXP = /\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;
        function append(element) {
            element && elements.push(element);
        }
        forEach(names, function (name) {
            names[name] = true;
            append(document.getElementById(name));
            name = name.replace(':', '\\:');
            if (element.querySelectorAll) {
                forEach(element.querySelectorAll('.' + name), append);
                forEach(element.querySelectorAll('.' + name + '\\:'), append);
                forEach(element.querySelectorAll('[' + name + ']'), append);
            }
        });
        forEach(elements, function (element) {
            var className = ' ' + element.className + ' ';
            var match = NG_APP_CLASS_REGEXP.exec(className);
            if (match) {
                if (!appElement) {
                    appElement = element;
                    module = (match[2] || '').replace(/\s+/g, ',');
                } else {
                    appElements.push(element);
                    modules.push((match[2] || '').replace(/\s+/g, ','));
                }
            } else {
                forEach(element.attributes, function (attr) {
                    if (names[attr.name]) {
                        if (!appElement) {
                            appElement = element;
                            module = attr.value;
                        } else {
                            appElements.push(element);
                            modules.push(attr.value);
                        }
                    }
                });
            }
        });
        if (appElement) {
            return true;
        }
    }


    function isParentChild(parent, child) {
        while (child) {
            if (parent == child) {
                return true;
            } else {
                child = child.parentNode
            }
        }
    }
    //数组去重
    function unique(arr) {
        var b = {}, c = [], i;
        for (i = 0; i < arr.length; i++) {
            if (!b[arr[i]]) {
                c[c.length] = arr[i];
                b[arr[i]] = true;
            }
        }
        return c;
    }

    function toArray(obj) {
        return Array.prototype.slice.call(obj);
    }
    function getHtml(ele) {
        var outerHtml = ele.outerHTML;
        var innerHtml = ele.innerHTML;
        var target = outerHtml.replace(innerHtml, '...');
        return target;
    }

    function initNgAppXs(element) {
        var elements = [element];
        var name = 'ng-appx';

        function getModuleName(element) {
            var moduleName;
            angular.forEach(element.attributes, function (attr) {
                if (name == attr.name) {
                    moduleName = attr.value.replace(/ /g, '');
                }
            });
            return moduleName;
        }

        function bootApp(bootEle, bootEleChildren) {
            var bootModules = [getModuleName(bootEle)];
            angular.forEach(bootEleChildren, function (element) {
                bootModules = bootModules.concat(getModuleName(element));
            });
            angular.bootstrap(bootEle, unique(bootModules));
            log(bootEle, bootEleChildren);
        }

        function log(bootEle, bootEleChildren) {
            var bootEleHtml = getHtml(bootEle);
            var bootEleChildArr = [];
            angular.forEach(bootEleChildren, function (item) {
                bootEleChildArr.push(getHtml(item));
            });
            console.log('页面在元素 '+ bootEleHtml +' 上启动，\n其子元素上的:\n'+
                    bootEleChildArr.join('\n') + ' 被合并进来。',
                '\n启动元素：', bootEle, '\n子元素：', bootEleChildren);
        }

        function isRoot(ele) {
            return ele == document.documentElement || ele == document.body
        }

        if (element.querySelectorAll) {

            var appElements = toArray(element.querySelectorAll('[' + name + ']'));
            var firstApp = appElements.shift();
            //var firstApp = appElements[0];
            //
            var bootElements = [];
            var bootEleChildren = [];

            if (isRoot(firstApp)) {
                bootApp(firstApp, appElements);
            } else {
                var group = [];
                bootElements.push(firstApp);
                bootEleChildren.push(group);
                angular.forEach(appElements, function (item) {
                    if (isParentChild(firstApp, item)) {
                        group.push(item);
                    } else {
                        firstApp = item;
                        group = [];
                        bootElements.push(item);
                        bootEleChildren.push(group);
                    }
                });
                angular.forEach(bootElements, function (item, index) {
                    bootApp(item, bootEleChildren[index]);
                });
            }
        }
    }

    var NG_DEFER_BOOTSTRAP = /^NG_DEFER_BOOTSTRAP!/;
    window.name = "NG_DEFER_BOOTSTRAP!" + window.name;
    //angular.resumeBootstrap(['app'])

    /**
     *  ### 对 ng-app 做hack处理
     *  > 核心利用 window.name = "NG_DEFER_BOOTSTRAP!" 终断元素的启动
     *  #### 功能：
     *  - 允许页面写多个 ng-app，但只有dom树上 “第一个出现的带有ng-app启动标记的元素” 会起作用、成为启动元素。
     *      - 启动元素的“子元素”上若再有“ng-app”启动标记，其module会被合并到启动元素module上
     *  - 启动元素的兄弟元素，不会起作用，给出了console.log提示；其他按照angular原本的静默失败处理方式
     */
    function hackNgApp() {
        var _modules = module ? [module] : [];
        angular.forEach(appElements, function (item, index) {
            if (isParentChild(appElement, item)) {
                _modules.push(modules[index]);
                console.log('启动元素的子元素 ', item, ' 上的 ' +
                     modules[index] + ' 模块被附加到启动元素上');
            } else {
                console.error('启动元素的兄弟元素：', item, ' 不应该再有类似ng-app启动标记。' +
                    '解决：可把此元素移到启动元素的内，作为其子元素' );
            }
        });
        angular.bootstrap(appElement, _modules);
    }

    angular.element(document).ready(function () {
        if (angularInit(document)) {
            console.log('原生ng-app自动启动应用，页面唯一的启动元素为：', appElement);
            if(shim.hackNgApp){
                hackNgApp();
            } else {
                //恢复window.name
                window.name = window.name.replace(NG_DEFER_BOOTSTRAP, '');
            }
        } else {
            window.name = window.name.replace(NG_DEFER_BOOTSTRAP, '');
            if (shim.addNgAppX) {
                initNgAppXs(document);
            }
        }
    });
})( window['laputa'] || (window['laputa'] = {}));
/**
 *   angular.module()方法扩展
 *   功能：
 *      angular.module('app', []) 启动了app
 *      ...
 *      angular.module('app', ['laterModule']) 可再添加module
 */
(function (laputa) {

    var shim = laputa['shim'] || (laputa['shim'] = {});
    //配置项
    shim.enhanceNgModule = true;

    var origMethod = angular.module;
    var alreadyRegistered = {};
    /**
     *  注意，在下边产生新的angular.module之前，已经调用过老的angular.module的模块，不会被记录进来
     *  例如：angular.js文件里的 ‘ng’、‘ngLocal’等模块
     */
    angular.module = function (name, reqs, configFn) {

        //开关控制
        if(!shim.enhanceNgModule){
            return origMethod(name, reqs, configFn)
        }

        reqs = reqs || [];
        var module = null;
        if (alreadyRegistered[name]) {
            module = origMethod(name);
            module.requires.push.apply(module.requires, reqs);
        } else {
            module = origMethod(name, reqs, configFn);
            alreadyRegistered[name] = module;
        }
        return module;
    };
})(window['laputa'] || (window['laputa'] = {}));