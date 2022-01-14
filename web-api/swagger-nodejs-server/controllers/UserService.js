'use strict';

exports.historyGet = function(args, res, next) {
  /**
   * parameters expected in the args:
   * offset (Integer)
   * limit (Integer)
   **/

var examples = {};
  
  examples['application/json'] = {
  "offset" : 123,
  "limit" : 123,
  "count" : 123,
  "history" : [ {
    "uuid" : "aeiou"
  } ]
};
  

  
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
  
}
exports.meGet = function(args, res, next) {
  /**
   * parameters expected in the args:
   **/

var examples = {};
  
  examples['application/json'] = {
  "last_name" : "aeiou",
  "promo_code" : "aeiou",
  "first_name" : "aeiou",
  "email" : "aeiou",
  "picture" : "aeiou"
};
  

  
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
  
}
