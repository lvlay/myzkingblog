/**
 * Created by maggie on 16/11/16.
 */
var express = require('express');
var models = require("../db/model");
var utils = require('../utils');
var auth = require('../middleware/autoauth');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

// 添加文章  http://127.0.0.1:3000/article/add
router.get('/post', auth.checkLogin, function (req, res, next) {
    res.render('articles/post.html', {title: '发布文章'});
});
router.post('/post', auth.checkLogin, function (req, res, next) {

    var article = req.body;
    models.Article.create({
        title: article.title,
        content: article.content,
        user:req.session.user._id
    },function (err,art) {
        if(err)
        {
            req.flash('error','发布失败,请稍后再试');
            res.redirect("/article/post");
        }else{
            console.log(art);
            req.flash('success','发布成功');
            res.redirect("/");
        }

    })

});


//查看文章的路由
router.get('/view', function (req, res, next) {
    res.send('查看文章');
});


module.exports = router;
