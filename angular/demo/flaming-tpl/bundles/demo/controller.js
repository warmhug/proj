;(function(){
  app
  .controller('overviewCtrl', $overviewCtrl)

  function $overviewCtrl(OverviewService, appList) {
    var options = {
      hello: 'Hola flaming cloud'
    }

    var service = new OverviewService(options)
    this.message = service.sayHello()
    this.static_message = OverviewService.static
    this.appList = appList
  }

})()
