var express = require('express');
var models = require("../db/model");
//加载express的路由模块
var router = express.Router();

/* 指向首页*/
router.get('/', function(req, res, next) {
  
  models.Article.find({}).populate('user').exec(function(err, articles) {


    res.render('index', { title: 'zking博客',articles:articles});

  })


});

module.exports = router;
