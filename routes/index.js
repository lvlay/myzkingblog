var express = require('express');
//加载express的路由模块
var router = express.Router();

/* 指向首页*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'zking博客'});
});

module.exports = router;
