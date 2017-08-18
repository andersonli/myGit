//var events = require('events');
//var EventEmitter = new events.EventEmitter();

var EventEmitter = new require('events').EventEmitter;
var event = new EventEmitter();
event.on('batianhu is comming!', function(){
    console.log('汽车人出发!');

});
setTimeout(function(){
    event.emit('batianhu is comming!');

},1000);