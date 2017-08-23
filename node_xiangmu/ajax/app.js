var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var mysql = require('mysql');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

//链接数据库
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: '3306',
  database: 'user_data'
});

//数据库结果转JSON,并且发送
function result2json(result, str, res) {
  var j_data = {};
  for (var i = 0; i < result.length; i++) {
      j_data['user' + i] = {
          'id': result[i].user_id,
          'name': result[i].user_name,
          'password': result[i].user_password,
          'profession': result[i].user_profession
      }
  }
  res.render("list", { title: str, juser: j_data });
  for(var j = 0;j < result.length; j++){
  
  cosole.log(j_data);
  }
}
app.get('/writeUsers',function(req,res){
  var sql = 'SELECT * FROM userdata';
  connection.query(sql,function(err,result){
    if(err){
      cosole.log(err);
    }else{
      result2json(result,'chenggong',res);
    }
  });
});
//fs.writeFile(,)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/info', index);
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