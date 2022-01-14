app.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('auth', {
      abstract: true
    })
    .state('auth.login', {
      parent: 'null',
      url: '/auth/login',
      data: {
        title: '登录 - 金融云'
      },
      views: {
        'content': {
          templateUrl: 'bundles/auth/partials/login.html',
          controller: 'auth.loginCtrl as vm'
        }
      }
    })
  }]);
