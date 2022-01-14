app
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('appcenter', {
        parent: 'sidenav',
        abstract: true,
        url: '/appcenter',
        data: {
          title: '应用中心',
          breadcrumb: '应用中心'
        },
        views: {
          'sidenav': {
            template: '<fc-menu menus="menus"></fc-menu>',
            controller: ['$scope', '$appcenterMenu', function($scope, $appcenterMenu) {
              $scope.menus = $appcenterMenu.get();
            }]
          },
          'content': {
            template: '<div ui-view="content"></div>'
          }
        }
      })
  }
])
