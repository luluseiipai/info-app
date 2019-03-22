<template>
  <div class="contactUs">
    <div class='bread'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name:'Dashboard_Index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>关于我们</el-breadcrumb-item>
        <el-breadcrumb-item>联系我们</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <article>
        <h1 class="title">联系我们</h1>
        <section v-html="item" v-for="(item, index) in content" :key="index" class="content"></section>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  name: 'contactUs',
  data(){
    return {
      content:[
        "作者：曲华俊",
        "学校：电子科技大学中山学院",
        "班级：15软件开发B班",
        "学号：2015030403027",
        "微信：luluseiipai",
        "QQ：780366011"]
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
.contactUs{
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
  width: 600px;
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
  text-indent: 1em;
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