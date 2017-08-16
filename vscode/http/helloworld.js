'use strict';

var http = require('http');

var server = http.createServer(function(request,response){
    console.log(request.method + ': ' + request.url);
    response.writeHead(200,{'content-type': 'text/html'})
    response.end('<h1>hello world<h1>');

});

server.listen(8080);
console.log('177.0.1.1')