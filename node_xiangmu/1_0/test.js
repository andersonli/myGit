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
text.split(',').forEach(function (line){
    //
    i++;
    var userAddSql_Params = line.split(',');
    console.log(typeof(userAddSql_Params.toString()));
    var userAddSql = 'INSERT INTO userdata(name,password,profession,id) values (?,?,?,?)';

    connection.query(userAddSql,userAddSql_Params,function (err,result){
        if(err){
            console.log('[INSERT ERR] - ',err.message);
            return;
        }
        console.log('----INSERT----');
    });
});