var authorization = 'mock_data_authorization';

module.exports = {
  "GET /webapi/auth/users/search": {
    "data": {
      "currentPage": 1,
      "list": [
        {
        "customerId": "0000000001",
        "email": "pe1@123.com",
        "gmtCreate": "2015-02-02T16:00:12+0800",

        "gmtModified": "2015-02-03T12:53:45+0800",
        "id": "0000002671",
        "lastLogonTime": "2015-02-03T12:53:45+0800",
        "loginName": "pe1@123.com",
        "realName": "运维1",
        "status": "NORMAL",
        "type": "NORMAL"
      }],
      "pageSize": 3,
      "startIndex": 0,
      "totalSize": 7
    }
  },
  "POST /webapi/auth/login": function(req, res) {
    res.status(200).end();
  },
  "POST /webapi/auth/logout": function(req, res) {
    res.status(200).end();
  },
  "GET /webapi/auth/userinfo": function(req, res, next) {
    if (!authorization) {
      res.status(401).end();
      return;
    }
    next({
      data: {
        "customer": {
          "id": "@ID",
          "name": "腾讯"
        },
        "customerId": "@ID",
        "customerName": "小微测试",
        "gmtCreate": "@DATETIME",
        "gmtModified": "@DATETIME",
        "id": "@ID",
        "lastLogonTime": "@DATETIME",
        "loginName": "admin",
        "mobile": "95188",
        "name": "admin",
        "nickname": "小微",
        "phone": "057126888888",
        "realName": "小微测试员",
        "status": "NORMAL",
        "type": "ADMIN"
      }
    });
  },
  "GET /webapi/auth/users": {
    "data": {
      "pageSize": 10,
      "totalSize": 23,
      "currentPage": "Mock.Random.increment()",
      "list|5-23": [{
        "customerDTO": {
          "id": "@ID"
        },
        "email": "@EMAIL",
        "gmtCreate": "@DATETIME",
        "gmtModified": "@DATETIME",
        "id": "@ID",
        "loginName": "@EMAIL",
        "realName": "@NAME",
        "status": "@PICK(['INITIAL','FROZEN'])",
        "type": "NORMAL"
      }]
    }
  },
  "GET /webapi/auth/users/:userId": {
    "data": {
      "customerDTO": {
        "id": "0000000001",
        "name": "小微测试"
      },
      "id": "0000000002",
      "loginName": "admin",
      "nickname": "用户管理员测试",
      "realName": "用户管理员",
      "status": "NORMAL",
      "type": "ADMIN"
    }
  },
  "DELETE /webapi/auth/users/:userId": {
    "data": "0000000092"
  },
  "POST /webapi/auth/users": {
    "data": "0000000092"
  },
  "POST /webapi/auth/users/:usersId/resetPassword": {
    "data": "0000000092"
  },
  "POST /webapi/auth/users/:usersId/frozen": {
    "data": {
      "customerDTO": {
        "gmtCreate": "2014-10-10T17:42:20",
        "gmtModified": "2014-10-10T17:42:20",
        "id": "0000000001",
        "name": "小微测试"
      },
      "email": "test222@alipay.com",
      "gmtCreate": "2014-10-10T20:03:55",
      "gmtModified": "2014-10-11T10:29:05",
      "id": "0000000082",
      "loginName": "test222@alipay.com",
      "realName": "cre",
      "status": "FROZEN",
      "type": "NORMAL"
    }
  },
  "POST /webapi/auth/users/:usersId/thaw": {
    "data": {
      "customerDTO": {
        "gmtCreate": "2014-10-10T17:42:20",
        "gmtModified": "2014-10-10T17:42:20",
        "id": "0000000001",
        "name": "小微测试"
      },
      "email": "test222@alipay.com",
      "gmtCreate": "2014-10-10T20:03:55",
      "gmtModified": "2014-10-11T10:30:05",
      "id": "0000000082",
      "loginName": "test222@alipay.com",
      "realName": "cre",
      "status": "NORMAL",
      "type": "NORMAL"
    }
  },
  "GET /webapi/auth/users/unique": {},
  "GET /webapi/auth/users/:id/exists": {
    data: true
  }
}
