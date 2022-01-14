'use strict';

var url = require('url');


var Estimates = require('./EstimatesService');


module.exports.estimatesPriceGet = function estimatesPriceGet (req, res, next) {
  Estimates.estimatesPriceGet(req.swagger.params, res, next);
};

module.exports.estimatesTimeGet = function estimatesTimeGet (req, res, next) {
  Estimates.estimatesTimeGet(req.swagger.params, res, next);
};
