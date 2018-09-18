;(function () {

app.controller('fcMenuCtrl', ['$scope', '$element', '$state', '$resource', '$appcenterMenu',
fcMenuCtrl])
    .directive('fcMenu', fcMenu)

  var platforms = false;

  function fcMenuCtrl($scope, $element, $state, $resource, $appcenterMenu) {
    var vm = this;
    vm.active = $state.includes;

    vm.hide = function(menuObj) {
      return menuObj.hide = !menuObj.hide;
    }

    $resource('/webapi/platforms').get()
      .$promise
      .then(function(res) {
        platforms = res.data
      })
      .finally(function() {
        vm.platforms = platforms || {}
      })


    var sidenav = [];
    sidenav.push($appcenterMenu.get());
    vm.sidenav = sidenav;

  }

  function fcMenu() {
    return {
      restrict: 'E',
      templateUrl: 'common/menu/index.html',
      scope: {
        menus: '=',
        isSubmenu: '='
      },
      controller: 'fcMenuCtrl',
      controllerAs: 'vm',
      bindToController: true
    }
  }

})()
