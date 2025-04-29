import _ from 'lodash';

const obj1 = {
  a: { b: 1, c: [1, 2] },
  d: { e: 'foo' }
};

const obj2 = {
  a: { b: 2, c: [3] },
  d: { f: 'bar' }
};

var result = _.merge({}, obj1, obj2);
console.log('log result: ', result);

function customizer(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return srcValue;
  }
}
var result = _.mergeWith({}, obj1, obj2, customizer);
console.log('log result: ', result);
