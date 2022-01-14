;(function() {
  app
  .service('OverviewService', $overviewService)

  function $overviewService() {
    function HelloService(options) {
      this.options = options
    }

    HelloService.prototype.sayHello = function() {
      return this.options.hello
    }

    HelloService.static = 'This is static'

    return HelloService
  }
})()
