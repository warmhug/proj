app.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

  $stateProvider
    // -------------------------------
    // 定义模板类型
    // 抽象模板
    // -------------------------------
    .state('default', {
      abstract: true,
      templateUrl: '/layouts/default.html',
      controller: function() {

      }
    })
    .state('null', {
      abstract: true,
      templateUrl: '/layouts/null.html'
    })

    // 主页直接跳转到登陆页
    .state('index', {
      url: '',
      controller: ['$state', function($state) {
        $state.go('auth.login');
        // $state.go('appcenter.apps');
      }]
    })

    // 定义 404 页面
    .state('404', {
      url: '/404',
      parent: 'null',
      data: {
        title: '404 Not Found'
      },
      views: {
        content: {
          templateUrl: '404.html'
        }
      }
    });

    // 找不到页面时跳转到 404 页面
    $urlRouterProvider.otherwise('/404');

  }
])
