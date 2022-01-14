;(function(){
  app
  .controller('auth.loginCtrl', $login)

  function $login($state) {
    var vm = this;

    this.login = function () {
      $state.go('appcenter.apps');
    }

  }

})()
