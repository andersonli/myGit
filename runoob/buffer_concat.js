var buffer1 = new Buffer('青葱学院 ');
var buffer2 = new Buffer('bbs.helloqingcong.com');
var buffer3 = Buffer.concat([buffer1,buffer2]);
console.log("buffer3 内容: " + buffer3.toString());