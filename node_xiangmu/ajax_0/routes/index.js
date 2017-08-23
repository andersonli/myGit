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
  var sql = 'select * from userdata';
      connection.query(sql, function (err, result) {
          if (err) {
              console.log(err);
              return;
          }
          result=data_to_JSON(result);
          res.setHeader('content-type', 'text/html;charset=utf8'); //设置返回页面字符集
          res.end(result);
      });
});
function data_to_JSON(data) {
  var array = {};
  for (var i = 0; i < data.length; i++) {
      var key = 'user'+(i+1);
      array[key] = {
          'name': data[i].user_name,
          'password': data[i].user_password,
          'profession': data[i].user_profession,
          'id': data[i].user_id
      };
  }

  return JSON.stringify(array);
}

module.exports = router;
