/*
*   用法同 ng-bind-html ，
*   因为ng-bind-html需要$sce支持，并不能编译html里的directive
*
* */
angular.module("lp.utils.directive.lpBindHtml", [])
    .directive('lpBindHtml', function ($compile) {
        return function (scope, element, attrs) {
            scope.$watch(attrs.lpBindHtml, function (value) {
                value += "";
                var newdom = angular.element(value);
                if (newdom[0]) {
                    element.html(newdom);
                    $compile(newdom)(scope);
                } else {
                    element.html(value);
                }
            });
        };
    });