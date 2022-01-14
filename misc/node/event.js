
var EventEmitter = require('events').EventEmitter;
var util = require('util');
// create the class
var MyClass = function () {  }
MyClass.prototype.whatever = function () {
    //this.emit('someevent', 'Hello', 'World');
};
// augment the prototype using util.inherits
util.inherits(MyClass, EventEmitter);

//Adding listeners
var obj = new MyClass();
obj.on('someevent', function (arg1) {
    console.log(arg1);
});

//Triggering events
obj.emit('someevent', 'Hello', 'World');