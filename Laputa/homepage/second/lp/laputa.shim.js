/**
 *
 */
(function (angular) {
    //给原来的angular.module方法记录添加状态
    var origMethod = angular.module;
    var alreadyRegistered = {};
    angular.module = function (name, reqs, configFn) {
        reqs = reqs || [];
        var module = null;
        if (alreadyRegistered[name]) {
            module = origMethod(name);
            if(!angular.isArray(reqs)) return;
            for (var i = 0; i < reqs.length; i++) {
                var obj = reqs[i];
                if(module.requires.indexOf(obj) < 0){ //去除重复的依赖
                    module.requires.push.apply(module.requires, reqs);
                }
            }
        } else {
            module = origMethod(name, reqs, configFn);
            alreadyRegistered[name] = module;
        }
        return module;
    };
})(angular);