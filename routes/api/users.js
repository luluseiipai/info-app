/* jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const key = require('../../config/keys').secretOrKey;
const passport = require('passport');

// 引入模型(Schema)
const USER = require('../../models/User');

// $route   GET api/users/test
// @desc    返回请求的json数据
// @access  public
router.get('/test',(req,res)=>{
  res.json({msg:'users work'});
});

// $route   POST api/users/register
// @desc    返回请求的json数据
// @access  public
router.post('/register',(req,res)=>{
  USER.findOne({email:req.body.email})
    .then(user => {
      if(user){
        res.status(400).json("邮箱已被注册");
      }else{
        // gravatar头像
        let avatar = gravatar.url(req.body.email,{s: '200', r: 'pg', d: 'mm'});
        // 定义user
        let newUser = new USER({
          email:req.body.email,
          username:req.body.username,
          password:req.body.password,
          avatar,
          identity:req.body.identity
        });
        bcrypt.genSalt(saltRounds, function(err, salt) {
          bcrypt.hash(req.body.password, salt, function(err, hash) {
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
});

// $route   POST api/users/login
// @desc    返回token  -> jwt(json web token) passport
// @access  public
router.post('/login',(req,res)=>{
  USER.findOne({email:req.body.email})
    .then(user => {
      if(!user){
        return res.status(400).json('账户不存在');
      }else{
        bcrypt.compare(req.body.password,user.password)
          .then(isMatch => {
            if(isMatch){
              let rule = { // token中信息
                id: user.id,
                avatar: user.avatar,
                username: user.username,
                identity: user.identity
              };
              jwt.sign(rule,key,{expiresIn:86400},(err,token) => { // 过期时间 一天
                if(err) throw err;
                res.status(200).json({
                  success: true,
                  token: 'Bearer ' + token
                });
              });
            }else{
              res.status(400).json("账户密码错误");
            }
          })
          .catch(err => res.status(400).json("操作出错"));
      }
    });
});

// $route   GET api/users/current
// @desc    返回 current user
// @access  private
router.get('/current',passport.authenticate('jwt',{session:false}),(req,res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email,
    identity: req.user.identity
  });
});

// $route   Post api/users/reset_password
// @desc    更改密码
// @access  private
router.post('/reset_password',passport.authenticate('jwt',{session:false}),(req,res)=>{
  USER.findById(req.user.id)
    .then(user => {
      bcrypt.compare(req.body.oldPassword,user.password)
        .then(isMatch => {
          if(isMatch){
            bcrypt.genSalt(saltRounds, function(err, salt) {
              bcrypt.hash(req.body.newPassword, salt, function(err, hash) {
                if(err) throw err;
                user.password = hash;
                user.save()
                  .then(user => res.json(user))
                  .catch(err => console.log(err));
              });
            });
          }else{
            res.status(400).json("旧密码错误");
          }
        })
    }).catch(err => res.status(404).json("没有该用户"))
});

module.exports = router;