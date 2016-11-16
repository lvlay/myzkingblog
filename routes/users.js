var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// http:/127.0.0.1:3000/users/reg
router.get('/reg', function(req, res, next) {
  res.send('注册页面');
});
router.get('/login', function(req, res, next) {
  res.send('登陆页面');
});


module.exports = router;
