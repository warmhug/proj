app.factory('demoFacade', function($resource, $facade) {

  var app = $facade({
    url: '/app/:id',
    params: {
      id: '@id'
    }
  })

  region.detail = $facade.extend(app, {
    url: '/detail/:id'
  })

  return app;
})
