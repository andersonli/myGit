var express = require('express');
var router = express.Router();
var mysql=require('mysql');
/* GET home page. */

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: '3306',
  database: 'user_data'
});

router.get('/', function(req, res) {
    var del = 'delete from userdata where user_id=' + id.toString();
    connection.query(del, function (err, result) {
        if (err) {
            console.log('err');
        }
        console.log("delete ok");
    });
    // connection.end();

})
