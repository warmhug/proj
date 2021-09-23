/**
 * demo.js
 */

(function (undefined) {

    /**
     *  同样的功能，对比jQuery写法，不仅写法不同，代码竟然貌似增多了啊！⊙﹏⊙b，仔细看需要自己写的业务代码，实际减少了许多
     */

    var demoApp = angular.module('demoApp', ['ngAnimate']);

    demoApp.controller('main', ['$scope', '$http', 'getDemoCode', function ($scope, $http, getDemoCode) {
        $scope.modules = [];
        $http.get('./example/modules.json').success(function (data) {
            $scope.modules = data;
            $scope.selectedModule = data[0];
            $scope.clickOne({}, 0);
        });
        $scope.selectedModule = '';

        var ajax = null;
        $scope.modal = 0;
        $scope.clickOne = function (event, index) {
            if(event.type){
                $scope.modal++;
            }
            var type = $scope.modules[index];
            var path = ['example', type, type + '.html'].join('/');
            $scope.selectedModule = type;
            //每次点击，取消上次未成功的请求
            if(ajax){
                ajax.abort();
            }
            (ajax = getDemoCode.get(path)).then(function (data) {
                //console.log(data);
                $scope.demoCode = data;
            })
        };
    }]);
    /**
    demoApp.directive('codeIframe', ['$animate', function ($animate) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.$watch('modal', function (newVal) {
                    if(!newVal) return;
                })
            }
        }
    }]);
     */
    demoApp.directive('codeContainer', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            //scope: true,
            link: function (scope, element, attrs) {
                var editor;
                //更新iframe，不需要再放个directive吧？！
                var previewFrame = $('#demoIfa')[0];
                var preview = previewFrame.contentDocument || previewFrame.contentWindow.document;
                function updatePreview() {
                    previewFrame.contentWindow.angular = undefined;  //angular不允许重复加载
                    preview.open();
                    preview.write(editor.getValue());
                    preview.close();
                }
                //监控数据变化
                scope.$watch('demoCode', function (newVal, oldVal) {
                    //console.log(newVal, oldVal);
                    if(!newVal) return;
                    angular.element(element).val(newVal);
                    //先销毁，后再生成editor
                    if (editor && editor.getWrapperElement) {
                        $(editor.getWrapperElement()).remove();
                    }
                    editor = CodeMirror.fromTextArea(element[0], {
                        lineNumbers: true,
                        mode: 'htmlmixed'
                    });
                    updatePreview();
                });
                $('.js-reRun').on('click', function () {
                    if(!scope.demoCode.trim()) return;
                    updatePreview();
                });
            }
        }
    }]);
    /**
     *  angular $http 对 abort 支持方式不好，为了做的完善，提供了比较严谨的封装
     */
    demoApp.factory('getDemoCode', ['$http', '$q', function ($http, $q) {
        return {
            get: function (url) {
                var deferredAbort = $q.defer();
                var ajax = $http.get(url, {
                    responseType: 'text',
                    timeout: deferredAbort.promise
                });
                var promise = ajax.then(function (response) {
                    return response.data;
                }, function (response) {
                    return $q.reject( "Something went wrong" );
                });
                promise.abort = function () {
                    deferredAbort.resolve();
                };
                promise.finally(
                    function () {
                        console.info("Cleaning up object references.");
                        promise.abort = angular.noop;
                        deferredAbort = ajax = promise = null;
                    }
                );
                return promise;
            }
        }
    }]);



    /**
    $(function () {
        var $btnGroup = $('.js-btnGroup');
        var $title = $('.js-title span');
        var $ifr = $('#demoIfa');
        var $code = $('#codemirror');
        var editor, ajax;
        $btnGroup.on('click', 'a[type]', function () {
            var type = $(this).attr('type');
            var path = ['example', type, type + '.html'].join('/');
            $title.html(type);
            //$ifr.attr('src', path);
            if(ajax){
                ajax.abort();
            }
            if(editor && editor.getWrapperElement){
                $(editor.getWrapperElement()).remove();
            }
            ajax = $.ajax({
                url: path,
                type: 'get',
                dataType: 'text',
                success: function (data) {
                    $code.val(data);
                    editor = CodeMirror.fromTextArea($code[0], {
                        lineNumbers: true,
                        mode: 'htmlmixed'
                    });
                    updatePreview();
                }
            })
        });
        $($btnGroup.find('a[type]')[0]).trigger('click');

        //即更新iframe
        var previewFrame = $ifr[0];
        var preview = previewFrame.contentDocument || previewFrame.contentWindow.document;
        function updatePreview() {
            previewFrame.contentWindow.angular = undefined;  //angular不允许重复加载
            preview.open();
            preview.write(editor.getValue());
            preview.close();
        }
        //注册运行事件
        $('.js-reRun').on('click', function () {
            if(!$code.val().trim()) return;
            updatePreview();
        })
    })
    */
})();
