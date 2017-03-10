'use strict';

exports.estimatesPriceGet = function(args, res, next) {
  /**
   * parameters expected in the args:
   * startLatitude (Double)
   * startLongitude (Double)
   * endLatitude (Double)
   * endLongitude (Double)
   **/

var examples = {};
  
  examples['application/json'] = [ {
  "high_estimate" : 1.3579000000000001069366817318950779736042022705078125,
  "product_id" : "aeiou",
  "low_estimate" : 1.3579000000000001069366817318950779736042022705078125,
  "surge_multiplier" : 1.3579000000000001069366817318950779736042022705078125,
  "estimate" : "aeiou",
  "display_name" : "aeiou",
  "currency_code" : "aeiou"
} ];
  

  
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
  
}
exports.estimatesTimeGet = function(args, res, next) {
  /**
   * parameters expected in the args:
   * startLatitude (Double)
   * startLongitude (Double)
   * customerUuid (String)
   * productId (String)
   **/

var examples = {};
  
  examples['application/json'] = [ {
  "image" : "aeiou",
  "product_id" : "aeiou",
  "description" : "aeiou",
  "display_name" : "aeiou",
  "capacity" : "aeiou"
} ];
  

  
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
  
}
