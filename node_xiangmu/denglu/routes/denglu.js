var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var url=require('url');
/* GET home page. */

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'denglu'
  });
  

router.get('/', function(req, res) {
  //var filepath = path.join(__dirname, '../denglu');
    var name = url.parse(req.url,true).query.uname;
    
    var password = url.parse(req.url,true).query.upassword;
    //console.log(typeof(password));
    console.log(name);
    var sql = 'select * from users';
      connection.query(sql, function (err, result) {
          if (err) {
              console.log(err);
              return;
          }
          //res.setHeader('content-type', 'text/html;charset=utf8'); //设置返回页面字符集
          //res.end(result);
          var add = 0;
          var bdd = 0;
          for(var i=0; i<result.length;i++){
          var n = result[i].name;
          var tmp = result[i].password;
          var p = tmp.toString();
          //console.log(result);
          //console.log(n);
          if(name == n){
              
              add++;
              console.log(add);
          
          
          if(add == 0 ){
            console.log('没有该用户');
            break;
        }else{
            //console.log('请输入密码');
            //console.log(typeof(p));
            var tmp = result[i].password;
            var p = tmp.toString();
        }
    }
            if(p == password){
                console.log('登陆成功!');
                break;
            }
            console.log('密码错误');
            break;
        }
        add = 0;
        bdd = 0;
      });
    
    


//res.render('index', { title: 'Express' });
});

/*function data_to_JSON(data) {
  var array = {};
  for (var i = 0; i < data.length; i++) {
      var key = 'user'+(i+1);
      array[key] = {
          'id': data[i].id,
          'name': data[i].name,
          'password': data[i].password
      };
  }*/

  //return result;


module.exports = router;
