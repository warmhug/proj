app
  .service('$appcenterMenu', [
    function() {
      var subset = [
        { sref: 'appcenter.apps', text: '应用'},
        { sref: 'appcenter.appdomains', text: '应用分组' }
      ];
      var menus = {
        title: "应用中心",
        text: "应用",
        icon: "menu-appcenter",
        state: "appcenter",
        sref: "appcenter.apps",
        subset: subset,
        menu: true
      }
      return {
        get: function() {
          return menus;
        }
      };
    }
  ])
