module.exports = {
  "GET /webapi/tenants": {
    data: [{
      id: '@ID',
      name: '@NAME'
    }]
  },
  "POST /webapi/tenants": {
    data: {
      id: '1213123123123123'
    }
  },
  "GET /webapi/tenants/:tenantId": {
    data: {
      id: '1213123123123123',
      name: '创建的新九州'
    }
  }
};
