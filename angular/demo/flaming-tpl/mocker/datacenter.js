module.exports = {
  "GET /webapi/workspaces/:workspaceId/workspaceDcs": function(req, res, next) {
    var dc = {
      "0000000419": {
        data: [{
          id: "0000000001",
          datacenterId: "123",
          datacenterName: "杭州4",
          datacenterType: "MAIN"
        }, {
          id: "0000000002",
          datacenterId: "124",
          datacenterName: "杭州5",
          regionId: "0000000001",
          datacenterType: "DR_LOCAL"
        }, {
          id: "0000000003",
          datacenterId: "125",
          datacenterName: "青岛4",
          datacenterType: "DR_REMOTE"
        }]
      },
      "0000000420": {
        data: [{
          id: "0000000004",
          datacenterId: "126",
          datacenterName: "杭州8",
          datacenterType: "MAIN"
        }, {
          id: "0000000005",
          datacenterId: "127",
          datacenterName: "杭州9",
          datacenterType: "DR_LOCAL"
        }, {
          id: "0000000006",
          datacenterId: "128",
          datacenterName: "成都3",
          datacenterType: "DR_REMOTE"
        }]
      }
    };
    res.json(dc[req.param('workspaceId')]);
  },
  "GET /webapi/workspaceDcs/:workspaceDcId/hasResources": {
    data: true
  },
  "GET /webapi/datacenters": {
    data: [{
      "id": "123",
      "name": "杭州4"
    }, {
      "id": "124",
      "name": "杭州5"
    }, {
      "id": "125",
      "name": "青岛4"
    }, {
      "id": "126",
      "name": "杭州8"
    }, {
      "id": "127",
      "name": "杭州9"
    }, {
      "id": "128",
      "name": "成都3"
    }]
  },
  "GET /webapi/financialDrGroups": {
    data: [{
      mainDatacenter: {
        "id": "123",
        "name": "杭州4"
      },
      drLocalDatacenter: {
        "id": "124",
        "name": "杭州5"
      },
      drRemoteDatacenter: {
        "id": "125",
        "name": "青岛4"
      }
    }, {
      mainDatacenter: {
        "id": "126",
        "name": "杭州8"
      },
      drLocalDatacenter: {
        "id": "127",
        "name": "杭州9"
      },
      drRemoteDatacenter: {
        "id": "128",
        "name": "成都3"
      }
    }]
  }
};
