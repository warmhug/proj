var _ = require('lodash');

module.exports = {
  'GET /webapi/apps': {
    data: {
      'totalCount': 39,
      'pageSize': 10,
      'currentPage': 1,
      'list': [{
        'id': '230000200506190016',
        'name': 'appname',
        'chineseName': '不要删',
        'creatorId': '0000011111',
        'gmtCreate': '@DATETIME',
        'gmtModified': '@DATETIME',
        'service': false,
        'stackId': '0000000001',
        'state': 'OFFLINE',
        'tenantId': '0000000111'
      }, {
        'id': '230000200506190019',
        'name': 'sofaDemo',
        'chineseName': '5555555',
        'creatorId': '0000011111',
        'gmtCreate': '@DATETIME',
        'gmtModified': '@DATETIME',
        'service': false,
        'stackId': '0000000001',
        'state': 'DEPLOYING',
        'tenantId': '0000000111'
      }]
    }
  },
  'GET /webapi/apps1': function(req, res, next) {
    var list = [{
      'id': '230000200506190016',
      'name': 'appname',
      'chineseName': '不要删',
      'creatorId': '0000011111',
      'gmtCreate': '@DATETIME',
      'gmtModified': '@DATETIME',
      'service': false,
      'stackId': '0000000001',
      'state': 'OFFLINE',
      'tenantId': '0000000111'
    }, {
      'id': '230000200506190013',
      'name': 'arale',
      'chineseName': '5555555',
      'creatorId': '0000011111',
      'gmtCreate': '@DATETIME',
      'gmtModified': '@DATETIME',
      'service': false,
      'stackId': '0000000001',
      'state': 'UNDEPLOY',
      'tenantId': '0000000111'
    }, {
      'id': '230000200506190011',
      'name': 'tfsFlow',
      'chineseName': '5555555',
      'creatorId': '0000011111',
      'gmtCreate': '@DATETIME',
      'gmtModified': '@DATETIME',
      'service': false,
      'stackId': '0000000001',
      'state': 'DEPLOYED',
      'tenantId': '0000000111'
    }, {
      'id': '230000200506190019',
      'name': 'sofaDemo',
      'chineseName': '5555555',
      'creatorId': '0000011111',
      'gmtCreate': '@DATETIME',
      'gmtModified': '@DATETIME',
      'service': false,
      'stackId': '0000000001',
      'state': 'DEPLOYING',
      'tenantId': '0000000111'
    }];
    var result = {
      data: list
    };
    var query = req.query['query'];
    var fields = req.query['fields'];
    var currentPage =  req.query['currentPage'];
    if (query) {
      if (query.indexOf('^:') > 0 || query.indexOf('~:') > 0) {  // 模糊查询
        result = {
          data: [list[0], list[1]]
        };
      } else if (query.match(/name:(.*)[,]?$/)) {  // 精确查询 name
        var app = list[0];
        app.name = query.match(/name:(.*)[,]?$/)[1];
        if (app.name.indexOf('nonexisted') >= 0) {
          result = { data: [] };
        } else {
          result = {
            data: [app]
          };
        }
      } else {  // 精确查询
        result = {
          data: [list[0]]
        };
      }
    }
    if (fields) {
      fields = fields.split(',');
      result.data = result.data.map(function(app) {
        return _.pick(app, fields);
      });
    }
    //if (typeof currentPage === 'string') {
    // 后台只能始终访问分页数据
    result = {
      data: {
        'totalCount': 39,
        'pageSize': 10,
        'currentPage': currentPage || 1,
        'list': result.data
      }
    };
    next(result);
  }
}
