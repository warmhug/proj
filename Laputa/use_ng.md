
## 常见angular组件使用示例：

> 请注意：不同组件来源不同，使用方式以及api一致性上都可能不太相同

示例一：(数据在html属性上)

    <button type="button" class="btn btn-lg btn-primary"
            title="{{alert.title}}"
            content="{{alert.content}}"
            data-type="success"
            data-container="#alerts-container"
            lp-alert>
        点击此按钮
    </button>
    注：data- 前缀也可省略
         
示例二：(数据可能较复杂，在js里提供)         

    --- html:
    <button type="button" class="btn btn-lg btn-primary"
            data-placement="{{pos}}"
            data-container="body"
            data-duration="30"
            lp-alert="alert">
        点击此按钮
    </button>
    
    --- js:
    angular.module('app', ['alert'])
    .controller('Ctrl',['$scope', function ($scope) {
        $scope.alert = {
            title: 'Holy guacamole!',
            content: 'Best o good.',
            type: 'info'
        };
    }])
    
示例三：(directive name作为element) 

    <pagination total-items="totalItems" ng-model="currentPage" ng-change="pageChanged()"></pagination>  
    
    注：这类directive，一般配置项多且零散，
    数据源也常来自多个地方，例如 totalItems currentPage都是数据源，
    所以配置项命名可根据实际情况自由进行
    
