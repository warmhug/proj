;(function(){
  app
  .service('appcenter.appService', [appService])

  function appService (){

    function dropdown () {
      //一些对数据的处理
      //...
      var result = [
        {text: '发布部署', click: 'checkops("deploy")'},
        {text: '重启', click: 'checkops("reboot")'},
        {text: '下线', click: 'checkops("offline")'}
      ]
      return result
    }

    return {
      dropdown: dropdown
    }
  }

})()
