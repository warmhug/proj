app
.config(['$stateProvider', function($stateProvider) {
  $stateProvider
  .state('demo', {
    url: '/demo',
    parent: 'sidenav',
    data: {
      breadcrumb: '应用'
    },
    resolve: {
      appList: function(){
        return [
          {id:1, name:'app1'},
          {id:2, name:'app2'},
          {id:3, name:'app3'},
          {id:4, name:'app4'}
        ]
      }
    },
    views: {
      'content': {
        templateUrl: 'bundles/demo/partials/page1.html',
        controller: 'overviewCtrl',
        controllerAs: 'ctrl'
      }
    }
  })
  .state('demo.child', {
    url: '/:id',
    data: {
      breadcrumb: '详情'
    },
    resolve: {
      app: function($stateParams) {
        return [
          {id:1, name:'app1'},
          {id:2, name:'app2'},
          {id:3, name:'app3'},
          {id:4, name:'app4'}
        ].filter(function(app) {
          return app.id = $stateParams.id
        })[0]
      }
    },
    views: {
      'content@sidenav': {
        templateUrl: 'bundles/demo/partials/page2.html',
        controller: function(app) {
          this.message = 'This is a sub page &#8613;'
          this.app = app
        },
        controllerAs: 'ctrl'
      }
    }
  })
}
])
