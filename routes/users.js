var express = require('express');
var models = require("../db/model");
var router = express.Router();
var utils= require('../utils');
var auth = require('../middleware/autoauth');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// http:/127.0.0.1:3000/users/reg
router.get('/reg',auth.checkNotLogin, function(req, res, next) {
  res.render('users/reg.html', { title: '用户注册'});
});

//路径与上面访问注册页面的路径是一致的,只是动作是post
//这种设计即是RESTful设计原则
router.post('/reg',auth.checkNotLogin,function (req,res,next) {
    //获取表单数据
      var user = req.body;
      if(user.pwd === user.pwd2)
      {
          models.User.findOne({username:user.username},function (err,doc) {
              if(doc)
              {//如果有值,用户名已存在

              }else
              {
                  //没有值才能够注册
                  models.User.create(
                      //脱库攻击
                      {username:user.username,
                          password:utils.md5(user.pwd),
                          email:user.email}, function (err,doc) {
                          if(err)
                          {

                          }else
                          {
                              //注册成功,重定向到登陆页面
                              res.redirect("/users/login");
                          }

                      })
              }
          })
      }else
      {
          //2次密码不一致
      }
});

router.get('/login',auth.checkNotLogin, function(req, res, next) {
  res.render('users/login.html', { title: '用户登录'});
});

router.post('/login',auth.checkNotLogin, function(req, res, next) {

    //获取表单数据
    var user = req.body;
    
    models.User.findOne({username:user.username,
        password: utils.md5(user.pwd)
    },function (err,doc) {
          if(doc)
          {
              //若果doc存在,那么就是登陆成功
              //登陆成功后,将用户的信息放入session保存
              req.session.user = doc;
              res.redirect("/");
          }else
          {
              //如果doc不存在,那么就是登陆失败
              res.redirect("/users/login");
          }

    })
});

//退出登录
router.get('/loginout',auth.checkLogin, function(req, res, next) {
    req.session.user=null;
    res.redirect("/");
});


module.exports = router;
