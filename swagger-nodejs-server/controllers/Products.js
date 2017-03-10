'use strict';

var url = require('url');


var Products = require('./ProductsService');


module.exports.productsGet = function productsGet (req, res, next) {
  Products.productsGet(req.swagger.params, res, next);
};
