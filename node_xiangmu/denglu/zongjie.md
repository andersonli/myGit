#本周总结

本周学习了在js中连接和用sql语句操作数据库，学习了ajax的异步提交请求和返回响应，学习了jason数据转string和jade的语法与连接到response，学习了web应用的开发全过程，学习了使用js语言从前段到后端全栈开发。

###前端

用bootstrap设计一个HTML页面放在public里，展示用户操作的界面。在里面嵌入一段js代码，实现通过dom操作HTML里的元素，或者连接vue，来获取用户输入的值，再通过ajax技术实现不刷新页面也可以把后端的返回值更新在页面上。通过一个函数拼出uri的值包含在request里，在ajax的回调函数里再以get的方式发送请求到后端app.js路由。

###后端

路由原理，在app.js里，通过一个app.use方法把不同路由和事件分别绑定，并把前端发送来的请求分派给routes里对应的响应函数，在denglu.js路由里，在app.get里拿到前端传过来的req.uri的值，再解析出用户在前端提交的name和password的值，然后连接数据库，通过sql语句查询出存储的对象的用户信息，再通过一个循环遍历取出每个对象的name和password的键值，然后构造for if循环并判断数据是否一致，再通过ajax的xmlhttp.open()方法把对应响应结果异步的传回前端并显示出来。