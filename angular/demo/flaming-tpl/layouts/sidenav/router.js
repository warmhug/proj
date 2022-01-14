app.config(['$stateProvider',
  function($stateProvider) {

  $stateProvider
    .state('sidenav', {
      abstract: true,
      parent: 'default',
      views: {
        'content': {
          templateUrl: '../layouts/sidenav/sidenav.html',
          controller: ['$scope', function($scope) {
            $scope.toggleSidebar = function() {
              $scope.hideSidebar = !$scope.hideSidebar;
            };
          }]
        }
      }
    })
  }
])
