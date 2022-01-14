module.exports = {
  "GET /webapi/tenants/:tenantId/workspaces": {
    data: [{
      "id": "0000000419",
      "name": "test",
      "displayName": "测试环境",
      "tenantId": "0000000417",
      "gmtCreate": "2014-10-12T10:09:38",
      "gmtModified": "2014-10-12T10:09:38"
    }, {
      "id": "0000000420",
      "name": "prepare",
      "displayName": "预发环境",
      "tenantId": "0000000417",
      "gmtCreate": "2014-10-12T10:09:38",
      "gmtModified": "2014-10-12T10:09:38"
    }]
  },
  "POST /webapi/workspaces": {
    data: [{
      "id": "0000000419"
    }]
  },
  "PUT /webapi/workspaces/:workspaceId": {
    data: [{
      "id": "0000000419"
    }]
  },
  "DELETE /webapi/workspaces/:workspaceId": {
    data: [{
      "id": "0000000419"
    }]
  }
};
