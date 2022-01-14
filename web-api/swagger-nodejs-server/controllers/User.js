'use strict';

var url = require('url');


var User = require('./UserService');


module.exports.historyGet = function historyGet (req, res, next) {
  User.historyGet(req.swagger.params, res, next);
};

module.exports.meGet = function meGet (req, res, next) {
  User.meGet(req.swagger.params, res, next);
};
