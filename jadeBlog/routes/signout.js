var express = require('express');
var router = express.Router();

var checkLogin = require('../middlewares/check').checkLogin;


//Get /signout 登出
router.get('/',checkLogin,function(req,res,next){
    //清空session 中用戶信息
    req.session.user = null;
    req.flash('success','登出成功');

    //登出成功後跳轉到主頁
    res.redirect('/posts');
})

module.exports = router;