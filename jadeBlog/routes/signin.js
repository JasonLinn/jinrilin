var sha1 = require('sha1');
var express = require('express');
var router = express.Router();

var UserModel = require('../models/users');
var checkNotLogin = require('../middlewares/check').checkNotLogin;

router.get('/',checkNotLogin,function (req,res,next) {
    res.render('signin');
});

//Post /signin 用戶登陸
router.post('/',checkNotLogin,function (req,res,next) {
    var name = req.fields.name;
    var password = req.fields.password;

    UserModel.getUserByName(name)
        .then(function (user) {
            if(!user){
                req.flash('error','用戶不存在');
                return res.redirect('back');
            }
            req.flash('success','登錄成功');
            //用戶信息寫入session
            delete user.password;
            req.session.user = user;
            //跳轉到主頁
            res.redirect('/posts');
        })
})

module.exports = router;