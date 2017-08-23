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
    var sql = 'insert into userdata(user_name,user_password,user_profession,user_id)values(?,?,?,7)';
    var info = ["user4", "mohit", "password4", "teacher"];
    // connection.connect();
    connection.query(sql, info, function (err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            return;
        }
        else {
            console.log('ok');;
        }
    });
});
function data_to_JSON(data) {
  var array = {};
  for (var i = 0; i < data.length; i++) {
      var key = 'user'+i;
      array[key] = {
          'name': data[i].user_name,
          'password': data[i].user_password,
          'profession': data[i].user_profession,
          'id': data[i].user_id
      };
  }
  return array;
}

module.exports = router;
