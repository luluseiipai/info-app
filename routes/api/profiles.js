/* jshint esversion: 6 */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// 引入模型(Schema)
const PROFILE = require('../../models/Profile');
const USER = require('../../models/User');

// $route  GET /api/profiles/test
// @desc   返回请求的json数据
// @access public
router.get('/test',(req,res) => {
  res.json({msg:"profiles work"});
});

// $route  GET /api/profiles/
// @desc   返回当前登录用户的个人信息
// @access private
router.get('/',passport.authenticate('jwt',{session:false}),(req,res) => {
  PROFILE.findOne({user:req.user.id})
    .populate('user',['username','avatar','email']) // 外键连接user表获取用户名和头像
    .then(profile => {
      if(!profile){
        res.status(404).json("用户未创建个人信息");
      }
      res.status(200).json(profile);
    })
    .catch(err => res.status(400).json('oops,something got wrong'));
});

// $route  POST /api/profiles/
// @desc   创建或编辑个人信息接口
// @access private
router.post('/',passport.authenticate('jwt',{session:false}),(req,res) => {
  const profileFields = {};
  profileFields.user = req.user.id;
  profileFields.handle = req.user.username;
  if(req.body.name) profileFields.name = req.body.name;
  if(req.body.tel) profileFields.tel = req.body.tel;
  if(req.body.birth) profileFields.birth = req.body.birth;
  if(req.body.location) profileFields.location = req.body.location;
  if(req.body.status) profileFields.status = req.body.status;
  if(req.body.position) profileFields.position = req.body.position;
  if(req.body.bio) profileFields.bio = req.body.bio;
  if(req.body.website) profileFields.website = req.body.website;
  if(req.body.githubName) profileFields.githubName = req.body.githubName;
  profileFields.link = {};
  profileFields.link.wechat = req.body.wechat ? req.body.wechat : '';
  profileFields.link.qq = req.body.qq ? req.body.qq : '';
  PROFILE.findOne({user:req.user.id})
    .then(profile => {
      // 检测用户信息是否存在
      if(profile){
        // 用户信息存在，执行更新方法
        PROFILE.findOneAndUpdate({user:req.user.id},{$set:profileFields},{new:true})
          .then(profile => {
            res.json(profile);
          })
          .catch(err => res.status(400).json('用户信息存在!oops,something got wrong'));
      }else{
        // 用户信息不存在，执行创建方式
        PROFILE.findOne({handle:req.body.handle})
          .then(profile => {
            // profile.handle唯一
            if(profile){
              res.status(400).json("handle已存在，请重新输入!");
            }else{
              new PROFILE(profileFields).save()
                .then(profile => {
                  res.json(profile);
                })
                .catch(err => res.status(400).json('oops,something got wrong'));
            }
          });
      }
    });
});

// $route  GET /api/profiles/handle/:handle
// @desc   通过handle查询个人信息
// @access public
router.get('/handle/:handle',(req,res) => {
  PROFILE.findOne({handle:req.params.handle})
    .populate('user',['username','avatar'])
    .then(profile => {
      if(!profile){
        res.status(404).json("未找到该用户信息");
      }
      res.status(200).json(profile);
    })
    .catch(err => res.status(400).json('oops,something got wrong'));
});

// $route  GET /api/profiles/user/:user_id
// @desc   通过user_id获取个人信息
// @access public
router.get('/user/:user_id',(req,res) => {
  PROFILE.findOne({user:req.params.user_id})
    .then(profile => {
      if(!profile){
        res.status(404).json({error:true,msg:"未找到该用户信息"});
      }
      res.status(200).json(profile);
    })
    .catch(err => res.status(400).json('oops,something got wrong'));
});

// $route  GET /api/profiles/all
// @desc   返回所有用户信息
// @access public
router.get('/all',(req,res) => {
  PROFILE.find()
    .populate('user',['username','avatar'])
    .then(profile => {
      if(!profile) res.status(404).json("没有任何用户信息!");
      res.status(200).json(profile);
    })
    .catch(err => res.status(400).json('oops,something got wrong'));
});

// $route  POST /api/profiles/education
// @desc   添加个人学历
// @access private
router.post('/education',passport.authenticate('jwt',{session:false}),(req,res) => {
  const newEdu = {
    school: req.body.school,
    degree: req.body.degree,
    class: req.body.class,
    major: req.body.major,
    scoreRank: req.body.scoreRank,
    from: req.body.from,
    to: req.body.to
  };
  if(req.body.description) newEdu.description = req.body.description;
  
  PROFILE.findOne({user:req.user.id})
    .then(profile => {
      profile.education.unshift(newEdu);
      profile.save().then(profile => res.status(200).json(profile));
    })
    .catch(err => res.status(400).json('oops,something got wrong'));
});

// $route  POST /api/profiles/edit_education/:edu_id
// @desc   修改个人学历
// @access private
router.post('/edit_education/:edu_id',passport.authenticate('jwt',{session:false}),(req,res) => {
  PROFILE.findOne({user:req.user.id})
    .then(profile => {
      let index = profile.education.map(item => item.id).indexOf(req.params.edu_id);
      profile.education.splice(index,1,req.body);
      PROFILE.findOneAndUpdate({user:req.user.id},{$set:profile},{new:true})
      .then(profile => res.status(200).json(profile));
    })
    .catch(err => res.status(400).json('oops,something got wrong'));
});

// $route  DELETE /api/profiles/education/:edu_id
// @desc   删除指定的个人学历
// @access private
router.delete('/education/:edu_id',passport.authenticate('jwt',{session:false}),(req,res) => {
  PROFILE.findOne({user:req.user.id})
    .then(profile => {
      let removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);
      profile.education.splice(removeIndex,1);
      profile.save().then(profile => {
        res.status(200).json(profile);
      });
    });
});

// $route  POST /api/profiles/experience
// @desc   添加个人经历
// @access private
router.post('/experience',passport.authenticate('jwt',{session:false}),(req,res) => {
  PROFILE.findOne({user:req.user.id})
    .then(profile => {
      let newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to
      };
      if(req.body.description)newExp.description = req.body.description;
      profile.experience.unshift(newExp);
      profile.save().then(profile => res.status(200).json(profile));
    })
    .catch(err => res.status(400).json('oops,something got wrong'));
});

// $route  POST /api/profiles/edit_experience/:exp_id
// @desc   修改个人履历
// @access private
router.post('/edit_experience/:exp_id',passport.authenticate('jwt',{session:false}),(req,res) => {
  PROFILE.findOne({user:req.user.id})
    .then(profile => {
      let index = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
      profile.experience.splice(index,1,req.body);
      PROFILE.findOneAndUpdate({user:req.user.id},{$set:profile},{new:true})
      .then(profile => res.status(200).json(profile));
    })
    .catch(err => res.status(400).json('oops,something got wrong'));
});

// $route  DELETE /api/profiles/experience/:exp_id
// @desc   删除指定的个人经历
// @access private
router.delete('/experience/:exp_id',passport.authenticate('jwt',{session:false}),(req,res) => {
  PROFILE.findOne({user:req.user.id})
    .then(profile => {
      let removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
      profile.experience.splice(removeIndex,1);
      profile.save().then(profile => res.status(200).json(profile));
    })
    .catch(err => res.status(400).json('oops,something got wrong'));
});

// $route  POST /api/profiles/addskill
// @desc   添加个人技能
// @access private
router.post('/addskill',passport.authenticate('jwt',{session:false}),(req,res) => {
  PROFILE.findOne({user:req.user.id})
    .then(profile => {
      req.body.forEach(item => {
        profile.skills.push(item);
      });
      profile.save().then(profile => res.status(200).json(profile));
    })
    .catch(err => res.status(400).json('oops,something got wrong'));
});

// $route  DELETE /api/profiles/skill/:s_id
// @desc   删除指定的个人技能
// @access private
router.delete('/skill/:s_id',passport.authenticate('jwt',{session:false}),(req,res) => {
  PROFILE.findOne({user:req.user.id})
    .then(profile => {
      let removeIndex = profile.skills.map(item => item.id).indexOf(req.params.s_id);
      profile.skills.splice(removeIndex,1);
      profile.save().then(profile => res.status(200).json(profile));
    })
    .catch(err => res.status(400).json('oops,something got wrong'));
});

// $route  POST /api/profiles/addreward
// @desc   添加获奖经历
// @access private
router.post('/addreward',passport.authenticate('jwt',{session:false}),(req,res) => {
  PROFILE.findOne({user:req.user.id})
    .then(profile => {
      let newReward = req.body;
      profile.rewards.unshift(newReward);
      profile.save().then(profile => res.status(200).json(profile));
    })
    .catch(err => res.status(400).json('oops,something got wrong'));
});

// $route  DELETE /api/profiles/reward/:r_id
// @desc   删除指定的获奖经历
// @access private
router.delete('/reward/:r_id',passport.authenticate('jwt',{session:false}),(req,res) => {
  PROFILE.findOne({user:req.user.id})
    .then(profile => {
      let removeIndex = profile.rewards.map(item => item.id).indexOf(req.params.r_id);
      profile.rewards.splice(removeIndex,1);
      profile.save().then(profile => res.status(200).json(profile));
    })
    .catch(err => res.status(400).json('oops,something got wrong'));
});

// $route  DELETE /api/profiles/:id
// @desc   删除个人用户
// @access private
router.delete('/',passport.authenticate('jwt',{session:false}),(req,res) => {
  PROFILE.findOneAndRemove({user:req.user.id})
  .then(() => {
    USER.findOneAndRemove({_id:req.user.id})
      .then(() => {
        res.status(200).json("delete complete");
      });
  })
  .catch(err => res.status(400).json('oops,something got wrong'));
});

// $route  DELETE /api/profiles/all
// @desc   返回所有用户信息
// @access public
router.delete('/:id',passport.authenticate('jwt',{session:false}),(req,res) => {
  if(req.user.identity !== 'teacher'){
    res.status(400).json('你没有该权限')
  }
  PROFILE.findOneAndRemove({user:req.params.id})
    .then(() => {
      USER.findOneAndRemove({_id:req.params.id})
        .then(() => {
          res.status(200).json('delete complete');
        })
    }).catch(err => res.status(400).json('oops,something got wrong'));
});

module.exports = router;