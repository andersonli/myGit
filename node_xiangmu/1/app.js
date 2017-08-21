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

//获取用户列表：
app.get('/listUsers', function (req, res) {
  /*fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );*/
      fs.readFile(__dirname + '/' + 'users.json','utf8',function(err,data){
        
        data = JSON.parse(data);
        var user;
        var id = url.parse(req.url,true).query.id;
        
        if(id == undefined){
          //user = data;
          //res.render('use',{table:data});
        }else{
          user = data["user" + id];
        }
        //res.end(JSON.stringify(user));
        res.render('use',{table:data});

        


  });
});



//添加的新用户数据
var user = {
  "user4" : {
     "name" : "mohit",
     "password" : "password4",
     "profession" : "teacher",
     "id": 4
  }
}

app.get('/addUser', function (req, res) {

  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      data["user4"] = user["user4"];
      console.log( data );
      res.render('use',{table:data});
      res.end( JSON.stringify(data));

      fs.writeFile(__dirname + '/' + 'users.json',JSON.stringify(data),function(err,data){
        if(err){
          console.log(err);
          res.end(err);
        }else{
          console.log(data);
          console.log('ok');
          res.end(data);


          //res.render('use',{table:data});
        }
      
      });
  });
});


//指定id删除用户
var id = 2;
app.get('/deleteUser', function (req, res) {
  
  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
    data = JSON.parse( data );
    delete data["user" + 2];
    
    console.log( data );
    res.render('use',{table:data});
    res.end( JSON.stringify(data));


  fs.writeFile(__dirname + '/' + 'users.json',JSON.stringify(data),function(err,data){
    if(err){
      console.log(err);
      res.end(err);
    }else{
      console.log(data);
      console.log('ok');
      res.end(data);

    }
  
  });
});
});


//指定id显示用户详情
/*app.get('/:id',function(req,res){

  fs.readFile(__dirname + '/' + 'users.json','utf8',function(err,data){
    
    data = JSON.parse(data);
    var user;
    var id = url.parse(req.url,true).query.id;
    
    if(id == undefined){
      user = data;
    }else{
      user = data["user" + id];
    }
    
    res.end(JSON.stringify(user));*/



  /*fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      var user = data["user" + req.params.id] 
      console.log( user );
      res.end( JSON.stringify(user));


    fs.writeFile(__dirname + '/' + 'users.json',JSON.stringify(data),function(err,data){
      if(err){
        console.log(err);
        res.end(err);
      }else{
        console.log(data);
        console.log('ok');
        res.end(data);
      }
    
    });
  });
});
*/



/*var server = app.listen(8081, function () {

 var host = server.address().address
 var port = server.address().port
 console.log("应用实例，访问地址为 http://%s:%s", host, port)

})*/

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
