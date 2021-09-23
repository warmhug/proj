/*
*
*
* */

angular.module("lp.utils.directive.lpBindTemplate", [])
    .directive('lpBindTemplate', function ($compile, $rootScope) {
        return {
            template: function (element, attrs) {
                var template = attrs.lpBindTemplate;
                return template;
            }
        };
    });