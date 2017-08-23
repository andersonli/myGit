var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var url = require('url');
var mysql = require('mysql');
var index = require('./routes/index');//index exports
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
}

// 设置模板引擎
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.get('/',function(req,res){

    res.render("list", { title: str, juser: j_data });
      
});

//设置路由
app.get('/listUsers', function(req, res) {
    var id = url.parse(req.url, true).query.id;
    //查询数据
    var sql = 'SELECT * FROM userdata';
    if (id != undefined) {
        sql += ' WHERE user_id=' + id;
    }
    connection.query(sql, function(err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            console.log(err);
            
        }
        result2json(result, '查询成功', res);
    });
});

//添加的新用户数据
var user = {
    "user5": {
        "id": 5,
        "name": "damjlowills",
        "password": "passuiword5",
        "profession": "firehkman"
    }
};

app.get('/addUser', function(req, res) {
    var sql = 'insert into userdata (user_id,user_name,user_password,user_profession) values (?,?,?,?)';
    var sqlParams = [user["user5"].id, user["user5"].name, user["user5"].password, user["user5"].profession];
    connection.query(sql, sqlParams, function(err, result) {
        //插入执行后只接显示所有信息,err信息返回
        var str = (err ? err.code : '插入成功');
        sql = "select * from userdata";
        connection.query(sql, function(err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return;
            }
            result2json(result, str, res);
        });
    })
});

app.get('/deleteUser', function(req, res) {

    // First read existing users.
    var id = url.parse(req.url, true).query.id;
    var sql = 'DELETE FROM userdata where user_id=' + id;
    connection.query(sql, function(err, result) {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log('delete success');
            sql = "select * from userdata";
            connection.query(sql, function(err, result) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    return;
                }
                result2json(result, '删除成功', res);
            });
        }
    })
});
app.use(express.static(path.join(__dirname, 'public')));
app.use('/info', index);

var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('app listening at http://%s:%s', host, port);
});
module.exports = app;