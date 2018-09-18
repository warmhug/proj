/*
 *  facade.js
 *  @author 青栀
 *  @description 方便facade层的资源设计，支持嵌套资源、资源自定义行为
 *
*/

angular.module('flaming.cloud')
  .provider('$facade', function() {
    var defaults = this.defaults = {
      apiPrefix: '/webapi',
      actions: {
        'GET': 'get',
        'POST': 'save',
        'PUT': 'update',
        'DELETE': 'remove'
      }
    };

    function $isString(obj) {
      return typeof obj === 'string';
    }

    this.$get = ['$resource', function($resource) {

      // 解析url, e.g. /databases/:id --> databases/:collectionAction/:id/:action
      function _processUrl(url) {
        var urls = url.split('/');
        var _process = function(urls) {
          if ( !urls || urls.length === 0 ) return '';
          if ( !urls[urls.length - 1] ) {
            urls.pop();
            return _process(urls);
          }

          if (urls[urls.length - 1].indexOf(':') > -1) {
            urls[urls.length - 1] = ':collectionAction' + urls[urls.length - 1];
          }
          urls.push(':action');

          return urls.join('/');
        }

        return _process(urls);
      }

      function _parseUrl(url) {
        var urls;
        var params = {};
        if (!url) {
          return {
            url: '',
            params: params
          };
        }
        urls = url.split('/').filter(function(url) {
          return /[\w\d:]+/.test(url);
        });
        if (urls.length === 0) {
          return {
            url: '',
            params: params
          };
        }
        urls.forEach(function(item) {
          if (item[0] === ':') {
            item = item.substring(1);
            params[item] = '@' + item;
          }
        });
        if (urls[urls.length - 1].indexOf(':') === 0) {
          urls[urls.length - 1] = ':collectionAction' + urls[urls.length - 1];
        }
        urls.push(':action');

        return {
          url: urls.join('/'),
          params: params
        }
      }

      // 创建$resource实例
      function _initResource(url, params, actions) {
        return $resource(url, params, actions)
      }

      function _action(action, config) {
        var method, actionParams = {};

        config = config || {}
        config.method = config.method || 'POST';
        config.method = config.method.toUpperCase();
        method = defaults.actions[config.method] || 'save';

        if (config.collection) {
          actionParams.collectionAction = action;
        } else {
          actionParams.action = action;
        }

        this[action] = function(params, data) {
          params = angular.extend({}, params, actionParams);
          return this[method](params, data);
        }
      }

      function _get(action, isCollection) {
        _action.call(this, action, {
          method: 'GET',
          collection: isCollection ? true : false
        });
      }
      function _post(action, isCollection) {
        _action.call(this, action, {
          method: 'POST',
          collection: isCollection ? true : false
        });
      }
      function _put(action, isCollection) {
        _action.call(this, action, {
          method: 'PUT',
          collection: isCollection ? true : false
        });
      }
      function _delete(action, isCollection) {
        _action.call(this, action, {
          method: 'DELETE',
          collection: isCollection ? true : false
        });
      }

      function facadeFactory(args) {
        var url, params, p;
        var ori_url, ori_params;
        if ($isString(args)) {
          ori_url = args;
          p = _parseUrl(args);
          url = p.url;
          params = p.params;
          ori_params = p.params;
        } else {
          ori_url = args.url;
          ori_params = args.params;
          url = _processUrl(args.url);
          params = args.params;
        }

        url = defaults.apiPrefix + (url[0] === '/' ? '' : '/') + url;
        params = angular.extend({
          action: '@action',
          collectionAction: '@collectionAction'
        }, params);

        var actions = {
          update: {
            method: 'PUT'
          }
        };

        var facade = _initResource(url, params, actions);

        // origin url & params
        facade.__url = ori_url;
        facade.__params = ori_params;
        facade.action = _action;
        facade.$get = _get;
        facade.$post = _post;
        facade.$put = _put;
        facade.$delete = _delete;

        return facade;
      }

      facadeFactory.extend = function(parent, args) {
        if ($isString(args)) {
          args = {
            url: args,
            params: _parseUrl(args).params
          }
        }
        args.url = parent.__url + (args.url[0] === '/' ? '' : '/') + args.url;
        args.params = angular.extend({}, parent.__params, args.params);
        return facadeFactory(args);
      };

      return facadeFactory;
    }];
  });
