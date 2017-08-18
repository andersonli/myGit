var events = require('events');

var dawuxiao = new events.EventEmitter();

var connectHander = function connected(){

    console.log('客人到了');

    dawuxiao.emit('wffcook');
}

dawuxiao.on('ly',connectHander);

dawuxiao.on('wffcook',function(){
    console.log('通知厨房');

});

dawuxiao.emit('ly');//开始
console.log('欢迎再来');