<template>
  <div class="introduce">
    <div class='bread'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name:'Dashboard_Index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>关于我们</el-breadcrumb-item>
        <el-breadcrumb-item>网站介绍</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <article>
        <h1 class="title">网站介绍</h1>
        <section v-html="item" v-for="(item, index) in content" :key="index" class="content"></section>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  name: 'introduce',
  data(){
    return {
      content:[
        '本网站主要针对于即将步入社会工作的应届毕业生，通过本网站，提供一个让应届毕业生更方便交流的讨论区，并且通过录入各种个人信息资料、如成绩、获奖经历、掌握的技能后，编写一份心仪的简历，用户之间可以互相查看他人的简历资历并提供建议，在讨论区可以互相交流求职经验与方法、简历编写技巧，为应届毕业生提供更好的帮助，更有效率找到实习工作单位。',
        "该系统能够记录用户大学四年来个人信息成绩、获奖经历、个人实习或工作经历、教育经历、所掌握的技能、个人总结简介等。同时，系统支持上传奖状扫描件或作品、工作相关的证明文件，并能整理出一个整洁的简历页面，并支持一键导出。系统还提供一个供用户交流信息的讨论区，用户能在话题下评论与点赞。",
        "该作品的有Token权限认证，请求响应拦截，token过期处理，常用组件封装，一键生成简历为pdf文件等功能",
        "本作品为本人<span style='font-weight:bold;color: #303133;'>曲华俊</span>设计的毕业设计作品<span style='font-weight:bold;color: #303133;'>大学生个人信息管理系统</span>，希望我开发的这款作品能够在应届毕业生的求职路上搭一把手。",
        "前端 -- 技术栈 & 插件：",
        "HTML(5)、CSS(3)、Javascript(es6&7)、Vue2.x、Vue-router、Vuex、Vue-cli、axios、webpack、git、jwt-decode、echarts、element-ui、vue-clipboard2、vue-quill-editor、vue-canvas-nest",
        "后端 -- 技术栈 & 插件：",
        "node.js、express、body-parser、concurrently、gravatar、jsonwebtoken、passport、passport-jwt",
        "数据库：",
        "mongoose--存储于<a href='https://mlab.com/welcome' style='text-decoration:underline;color:#909399;'>mlab</a>"
      ]
    }
  },
  mounted(){
    // let ele = document.querySelector('article');
    // this.content.forEach(item => {
    //   let el = document.createElement('section');
    //   el.setAttribute('class','content');
    //   el.innerHTML = item;
    //   ele.appendChild(el);
    // });
  }
}
</script>

<style scoped>
.introduce{
  margin-top: -10px;
  overflow: hidden;
}
.bread{
  padding: 30px 20px 20px;
}
.container{
  margin: 50px auto;
  box-sizing: border-box;
  padding: 30px 20px;
  width: 1000px;
  border-radius: 10px;
  border: 1px solid #EBEEF5;
  -webkit-transition: all .5s;
  -moz-transition: all .5s;
  -o-transition: all .5s;
  transition: all .5s;
  -webkit-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
  -webkit-animation: showOut 1s ease-in-out;
  -moz-animation: showOut 1s ease-in-out;
  -o-animation: showOut 1s ease-in-out;
  animation: showOut 1s ease-in-out;
}
.container:hover{
  box-shadow: 0 0 16px rgba(0, 0, 0, .3);
}
.title{
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  color: #303133;
  margin-bottom: 30px;
}
.content{
  color: #606266;
  font-size: 16px;
  line-height: 24px;
  text-indent: 2em;
}
.content:not(:last-child){
  margin-bottom: 15px;
}
@media screen and (max-width: 992px){
  
}
@-webkit-keyframes showOut {
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
}
@keyframes showOut {
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
}
</style>