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

//設置靜態文件目錄
app.use(express.static(path.join(__dirname,'public')));

//session中間件
app.use(session({
    name:config.session.key,//設置cookie中保存session id的字段名稱
    secret:config.session.secret,// 通過設置secret 來計算 hash值並放在 cookie中，使產生的sign
    cookie:{
        maxAge:config.session.maxAge //過期時間，過期後cookie中的session id 自動刪除
    },
    store:new MongoStore({ //將session 存儲到mongodb
        url:config.mongodb//mogodb 地址
    }),
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
//flash 中間件，用來顯示通知
app.use(flash());

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

//路由
routes(app);

//監聽端口，啟動程序
app.listen(config.port,function () {
    console.log(`${pkg.name} listening on port ${config.port}`);
});

// app.listen(55);