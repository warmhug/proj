var _ = require('lodash');

module.exports = {
  'GET /webapi/regions/mainRegion':  function(req, res) {
    res.send({
      name: 'abc'
    })
  }
}
