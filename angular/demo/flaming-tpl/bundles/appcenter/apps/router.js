app.config(['$stateProvider', function($stateProvider) {
  $stateProvider
  .state('appcenter.apps', {
      url: '/apps?query',
      parent: 'appcenter',
      data: {
        title: '应用列表',
        breadcrumb: '应用列表'
      },
      views: {
        'content': {
          templateUrl: 'bundles/appcenter/apps/partials/list.html',
          controller: 'appcenter.appsCtrl as vm'
        }
      }
    })

}]);
