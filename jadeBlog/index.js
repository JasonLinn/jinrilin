var path = require('path');
var express = require('express');
var session = require('express-session');
//session 中间件会在 req 上添加 session 对象，即 req.session 初始值为 {}，
//当我们登录后设置 req.session.user = 用户信息，返回浏览器的头信息中会带上 
//set-cookie 将 session id 写到浏览器 cookie 中，那么该用户下次请求时，
//通过带上来的 cookie 中的 session id 我们就可以查找到该用户，并将用户信息保存到 
// req.session.user。
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
// config-lite 会根据环境变量（NODE_ENV）的不同从当前执行进程目录下的 
// config 目录加载不同的配置文件。沒寫就用default
var config = require('config-lite')(__dirname);
var routes = require('./routes');
var pkg = require('./package');
var app = express();

//設置模板目錄
app.set('views',path.join(__dirname,'views'));
//設置模板引擎為pug
app.set('view engine','pug');

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// session 中间件
app.use(session({
  name: config.session.key,// 设置 cookie 中保存 session id 的字段名称
  secret: config.session.secret,// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  resave: true,// 强制更新 session
  saveUninitialized: false,// 设置为 false，强制创建一个 session，即使用户未登录
  cookie: {
    maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
  },
  store: new MongoStore({// 将 session 存储到 mongodb
    url: config.mongodb// mongodb 地址
  })
}));

//flash 中間件，用來顯示通知
app.use(flash());
// 设置模板全局常量
app.locals.blog={
    title:pkg.name,
    description:pkg.description
}
//添加模板必須的三個變量
app.use(function (req,res,next) {
    res.locals.user = req.session.user;
    res.locals.success = req.flash('success').toString();
    res.locals.error = req.flash('error').toString();
    next();
})
// 处理表单及文件上传的中间件
app.use(require('express-formidable')({
  uploadDir: path.join(__dirname, 'public/img'),// 上传文件目录
  keepExtensions: true// 保留后缀
}));

//路由
routes(app);

//監聽端口，啟動程序
app.listen(config.port,function () {
    console.log(`${pkg.name} listening on port ${config.port}`);
});

// app.listen(55);