/**
 * demo.js
 */


    angular.module("laputa", ['ngRoute', 'ngSanitize', 'ngAnimate', 'laputa.ui'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/:name', {
                template: '<hr><div class="row"><div id="html" class="col-md-6"></div><div id="doc" class="col-md-6"></div></div><hr><div class="code"><p><span class="label label-info">代码</span></p></div>',
                controller: 'demo'
            });
    })

    .controller("demo", function ($scope, $routeParams, $http) {
        var name = $routeParams.name;
        var base = 'src/' + name;
        var tplurl = base + "/docs/demo.html";

        $http.get(tplurl).then(function (result) {
            $scope.code = result.data;
            $scope.type = "text/javascript";
        });

        var docurl = base + "/docs/readme.md";

        $http.get(docurl).then(function (rsp) {
            var rspmd = rsp.data
            var converter = new Showdown.converter();
            var doctext = converter.makeHtml(rspmd) || "文档待完善";
            $("#doc").html('<p><span class="label label-info">说明</span></p>' + doctext);
        });
    })
    .directive("script", function () {
        return {
            restrict: 'E',
            link: function ($scope, $element, $attr) {
                if ($attr.type != "mock") {
                    return;
                }
                var script = $element.html();
                eval(script);
            }
        };
    })
    .directive("code", function () {
        return {
            restrict: 'C',
            controller: function ($scope, $element, $compile) {
                function compile(code) {
                    var array = [],
                        patt = new RegExp("<script.*?>((.|\n|\r)*?)<\/script>", "g"),
                        result;

                    while ((result = patt.exec(code)) != null) {
                        if (!/ng-template/.test(result[0])) {
                            array.push(result[1]);
                        }
                    }
                    //window.eval(array.join("\n"));
                    // eval是为了底下的ctrl能提早执行,但其实会执行2次
                    $scope.code = code;
                }

                $scope.$watch("type", function (newdata) {
                    if (newdata != "text/javascript"
                        && newdata != "text/html"
                        && newdata != "text/css") {
                        return;
                    }
                    var value = $scope.code;
                    var type = $scope.type;

                    var myCodeMirror = CodeMirror($element[0], {
                        value: value,
                        mode: type,
                        lineNumbers: true,
                        autoCloseBrackets: true,
                        matchBrackets: true,
                        showCursorWhenSelecting: true,
                        autofocus: true,
                        theme: "elegant"
                    });

                    var timer;
                    myCodeMirror.on("change", function (obj) {
                        var code = obj.getValue();
                        clearTimeout(timer);
                        timer = setTimeout(function () {
                            compile(code);
                            $scope.$apply();
                        }, 300);
                    });
                    compile(value);

                });

                $scope.$watch("code", function (code) {
                    if (!code) {
                        return;
                    }
                    var str = "<div><p><span class='label label-info'>示例</span></p>" + code + "</div>";
                    $("#html").html(str);
                    $compile($("#html").contents())($scope);
                    //var dom = $compile(str)($scope);
                    //$("#html").html(dom);
                })
            }
        }
    });