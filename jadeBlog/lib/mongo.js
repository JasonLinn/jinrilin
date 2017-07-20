var config = require('config-lite');
var Mongolass = require('mongolass');
var mongolass = new Mongolass();
mongolass.connect(config.mongodb);

//我们定义了用户表的 schema，生成并导出了 User 这个 model，同时设置了 name 的唯一索引，保证用户名是不重复的。
exports.User = mongolass.model('User',{
    name:{type:'string'},
    password:{type:'string'},
    avatar:{type:'string'},
    gender:{type:'string',enum:['m','f','x']},
    bio:{type:'string'}
})
exports.User.index({name:1},{unique:true}).exec();// 根据用户名找到用户，用户名全局唯一
