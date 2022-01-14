;(function(){
  app.directive('sampleDirective', $sampleDirective)

  function $sampleDirective() {
    return {
      resctrict: 'E',
      template: '<div>{{ ctrl.hello }}</div>',
      scope: {
        // isolate scope is recommended
        hello: '@'
      },
      controller: function() {
        console.log(this.hello)
      },
      controllerAs: 'ctrl',
      bindToController: true
    }
  }
})()
