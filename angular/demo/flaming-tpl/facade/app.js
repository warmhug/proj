
app
  .factory('appFacade', ['$resource', '$facade', function($resource, $facade) {

    var apps = $facade({
      url: '/apps/:appId',
      params: {
        appId: '@appId'
      }
    })


    return {
      apps: apps
    }
  }])
