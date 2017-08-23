var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var url = require('url');

var index = require('./routes/index');//index exports
var users = require('./routes/users');

var app = express();

var TEST_DATABASE = 'user_data';
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
//connection.connect();

//获取用户列表：
app.get('/listUsers', function (req, res) {
  //connection.connect();
  
        if(id == undefined){
        var sql = 'SELECT * FROM userdata';
        var id = url.parse(req.url,true).query.id;
        connection.query(sql,function(err,result){
          if(err){
            console.log('err');
            return;
          }
          
          res.render('use',{table:result});
        });
      }else
      {
        var sql = 'SELECT * FROM userdata WHERE user_id='+id;
        connection.query(sql,function(err,result){
          if(err){
            console.log('err');
            return;
          }
         
          res.render('use',{table:result});
        });
      }

        
  });
//});



//添加的新用户数据
var user = {
  "user2" : {
     "name" : "suresh",
     "password" : "password2",
     "profession" : "librarian",
     "id": 2
  }
}
var addsql = 'INSERT INTO userdata(user_name,user_password,user_profession,user_id) VALUES(?,?,?,?)';
//var addsqlparams = [user.user2.name,user.user2.password,user.user2.profession,user.user2.id];
app.get('/addUser', function (req, res) {
  //connection.connect();
  
      //var addsql = 'INSERT INTO userdata(name,password,prefession,id) VALUES(?,?,?,?)';
      var addsqlparams = ['suresh','password2','librarian',2];
      connection.query(addsql,addsqlparams,function(err,result){
        if(err){
          console.log(err);
          return;
        }
        var sql = 'SELECT * FROM userdata';
        connection.query(sql,function(err,result){
          if(err){
            console.log('err');
            //return;
            
          }
          res.render('use',{table:result});
        });
          //res.render('use',{table:result});
      });
      
});


//指定id删除用户
var delsql = 'DELETE FROM userdata WHERE user_id = 2';
app.get('/deleteUser', function (req, res) {
 


//var delsql = 'DELETE FROM userdata where id = 2';
connection.query(delsql,function (err,result) {
    if(err){
        console.log(err);
        return;
    }
    //console.log('----------删除-------------');
    //console.log(result);
    res.render('use',{table:result});
});

});
//connection.end();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.get('/',function(req,res){

      res.render('use');
      
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;