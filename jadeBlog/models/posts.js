var marked = require('marked');
var Post = require('../lib/mongo').Post;

//將post的content 從markdown轉換成html
Post.plugin('contentToHtml',{
    afterFind:function (posts) {
        return posts.map(function (post) {
            post.content = marked(post.content);
        });
    },
    afterFindOne:function (post) {
        if(post){
            post.content = marked(post.content);
        }
        return post;
    }
});

module.exports = {
    //創建一篇文章
    create:function create(post) {
        return Post.create(post).exec();
    },
    //通過文章id獲取一篇文章
    getPostById:function getPostById(postId) {
        return Post
            .findOne({_id:postId})
            .populate({path:'author',model:'User'})
            .addCreatedAt()
            .contentToHtml()
            .exec();
    },
    // 按创建时间降序获取所有用户文章或者某个特定用户的所有文章
  getPosts: function getPosts(author) {
    var query = {};
    console.log(author,'getPosts');
    if (author) {
      query.author = author;
    }
    return Post
      .find(query)
      .populate({ path: 'author', model: 'User' })
      .sort({ _id: -1 })
      .addCreatedAt()
    //   .addCommentsCount()
      .contentToHtml()
      .exec();
  },
    //通過文章id給pv加１
    incPv:function incPv(postId) {
        return Post
            .update({_id:postId},{$inc:{pv:1}})
            .exec();
    }
};