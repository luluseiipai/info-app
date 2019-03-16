/* jshint esversion:6 */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// 引入模型(Schema)
const FORUM = require('../../models/Forum');

// $route  GET /api/forums/test
// @desc   返回请求的json数据
// @access public
router.get('/test',(req,res) => {
  res.json('forums work');
});

// $route  POST /api/forums/
// @desc   创建一个帖子
// @access private
router.post('/',passport.authenticate('jwt',{session:false}),(req,res) => {
  const newPost = new FORUM({
    user: req.user.id,
    text: req.body.text,
    avatar: req.user.avatar
  });
  newPost.name = req.body.name ? req.body.name : '匿名';
  newPost.save().then(post => res.status(200).json(post));
});

// $route  GET /api/forums/all
// @desc   返回所有帖子
// @access public
router.get('/all',(req,res) => {
  FORUM.find()
    .sort({date:-1})
    .then(posts => {res.status(200).json(posts);})
    .catch(err => res.status(404).json({error:true,msg:"找不到任何帖子"}));
});

// $route  GET /api/forums/:post_id
// @desc   获取指定的帖子
// @access public
router.get('/:post_id',(req,res) => {
  FORUM.findById(req.params.post_id)
    .then(post => res.status(200).json(post))
    .catch(err => res.status(400).json('oops,something got wrong'));
});

// $route  DELETE /api/forums/:post_id
// @desc   删除指定的帖子
// @access private
router.delete('/:post_id',passport.authenticate('jwt',{session:false}),(req,res) => {
  FORUM.findById(req.params.post_id)
    .then(post => {
      if(post.user.toString() !== req.user.id){
        return res.status(401).json({error:true,msg:'用户非法操作!'});
      }
      post.remove().then(() => res.status(200).json({success:true}));
    })
    .catch(err => res.status(404).json({error:true,msg:"没有该评论信息"}));
});

// $route  POST /api/forums/like/:post_id
// @desc   点赞
// @access private
router.post('/like/:post_id',passport.authenticate('jwt',{session:false}),(req,res) => {
  FORUM.findById(req.params.post_id)
    .then(post => {
      if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
        return res.status(400).json({error:true,msg:"已经赞过了!"});
      }
      post.likes.unshift({user:req.user.id});
      post.save().then(post => res.status(200).json(post));
    })
    .catch(err => res.status(404).json({error:true,msg:"点赞失败"}));
});

// $route  DELETE /api/forums/unlike/:post_id
// @desc   取消点赞
// @access private
router.delete('/unlike/:post_id',passport.authenticate('jwt',{session:false}),(req,res) => {
  FORUM.findById(req.params.post_id)
    .then(post => {
      if(post.likes.filter(like => like.user.toString() === req.user.id) === 0){
        return res.status(400).json({error:true,msg:"用户未点赞过该帖子"});
      }
      const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id);
      post.likes.splice(removeIndex,1);
      post.save().then(post => res.status(200).json({success:true,post}));
    })
    .catch(err => res.status(404).json({error:true,msg:"取消点赞失败"}));
});

// $route  POST /api/forums/comment/:post_id
// @desc   添加帖子评论
// @access private
router.post('/comment/:post_id',passport.authenticate('jwt',{session:false}),(req,res) => {
  FORUM.findById(req.params.post_id)
    .then(post => {
      let newComment = {
        user: req.user.id,
        text: req.body.text,
        avatar: req.user.avatar
      };
      newComment.name = req.body.name ? req.body.name : "匿名";
      post.comments.unshift(newComment);
      post.save().then((post) => res.status(200).json({success:true,post}));
    })
    .catch(err => res.status(404).json({error:true,msg:"帖子不存在"}));
});

// $route  DELETE /api/forums/comment/:post_id
// @desc   删除帖子评论
// @access private
router.delete('/comment/:post_id/:comment_id',passport.authenticate('jwt',{session:false}),(req,res) => {
  FORUM.findById(req.params.post_id)
    .then(post => {
      if(post.comments.filter(item => item._id.toString() === req.params.comment_id) === 0){
        return res.status(404).json({error:true,msg:"评论不存在"});
      }
      let removeIndex = post.comments.map(comment => comment._id).indexOf(req.params.comment_id);
      post.comments.splice(removeIndex,1);
      post.save().then(post => res.status(200).json({success:true,post}));
    })
    .catch(err => res.status(404).json({error:true,msg:"帖子不存在"}));
});

module.exports = router;