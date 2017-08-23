var TEST_DATABASE = 'test';
var TEST_TABLE = 'userdata';
//lianjie mysql
var mysql = require('mysql');
var connection = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    port:'3306',
    database:TEST_DATABASE,
});
connection.connect();
var fs = require('fs');
var text = fs.readFileSync('data.txt','utf8');
var i = 0;
//
//
text.split(/\r?\n/).forEach(function (line){
    //
    i++;
    var userAddSql_Params = line.split(/\t/);
})