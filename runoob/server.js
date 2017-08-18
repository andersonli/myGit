var http = require('http');

var server = http.createServer(function(request,response){

    response.writeHead(200, {'Content-Type':'text/plain'});
    response.end('hello qingcong');
})

server.listen(8888);
console.log('server running at http://127.0.1.1:8888/');
