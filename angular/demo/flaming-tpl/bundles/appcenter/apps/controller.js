;(function(){
  app
  .controller('appcenter.appsCtrl', ['$scope', '$modal', '$message', '$timeout', 'appFacade', 'appcenter.appService', appsCtrl])

  function appsCtrl($scope, $modal, $message, $timeout, appFacade, appService) {
    var vm = this;

    vm.appList = [];

    var cAppList;

    //获取页面列表数据
    appFacade.apps.get().$promise.then(function (data) {
      var data = data.data;
      vm.appList = data.list;
      vm.appList.totalItems = data.totalCount;
      vm.appList.currentPage = data.currentPage;

      cAppList = angular.copy(vm.appList)
    })

    vm.dropdown = appService.dropdown();

    var myModal = $modal({
      scope: $scope,
      template: 'bundles/appcenter/apps/components/create.tpl.html',
      show: false
    });

    vm.startCreate = function () {
      myModal.$promise.then(myModal.show);
    }

    vm.createApp = function () {
      vm.submitting = true;

      //模拟Ajax请求
      $timeout(function () {
        vm.submitting = false;
        vm.appList.push({
          'id': '23000020050619001633',
          'name': 'appname',
          'chineseName': '不要删',
          'creatorId': '0000011111',
          'gmtCreate': '@DATETIME',
          'gmtModified': '@DATETIME',
          'service': false,
          'stackId': '0000000001',
          'state': 'OFFLINE',
          'tenantId': '0000000111'
        })
        //myModal.toSuccess({content:'创建成功'})
        $message.success({content:'创建成功'})
        myModal.hide()
      }, 1000)
    }


    //筛选
    $scope.$watch('vm.filterApp', function (newVal) {
      if (!cAppList) return;
      if (!newVal) {
        vm.appList = cAppList;
        return;
      }
      vm.appList = cAppList.filter(function (item) {
        return item.name.indexOf(newVal) > -1
      })
    })


  }

})()
