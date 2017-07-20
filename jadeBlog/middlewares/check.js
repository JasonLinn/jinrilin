module.exports = {
    //權限控制
    checkLogin:function checkLogin(req,res,next) {
        if(!req.session.user){
            req.flash('error','未登錄');
            return res.redirect('/signin');//到登錄頁
        }
        next();
    },
    checkNotLogin:function checkNotLogin(req,res,next) {
        if(req.session.user){
            req.flash('error','已登錄');
            return res.redirect('back');//返回之前的頁面
        }
        next();
    }
};