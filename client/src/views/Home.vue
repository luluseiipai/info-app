<template>
  <div class="home">
    <div class="container">
      <div class="form">
        <el-row v-show="!this.user">
          <el-button type="primary" round @click="login">登录</el-button>
          <el-button type="warning" round @click="register">注册</el-button>
        </el-row>
        <div class="text" v-show="this.user">
          <p>毕业设计作品：基于NodeJs + VueJs 大学生个人信息管理系统</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  computed:{
    user(){
      return this.$store.getters.isAuthenticated;
    }
  },
  methods:{
    login(){
      this.$router.push('/login');
    },
    register(){
      this.$router.push({name:'Register'});
    }
  }
}
</script>

<style scoped>
.home{
  width: 100%;
  height: calc(100vh - 130px);
  font-size: 0;
  background: url('../../static/img/home.bg.png') no-repeat;
  background-size: cover;
  position: relative;
}
.container{
  background-color: rgba(0,0,0,.65);
  width: 100%;
  height: 100%;
}
.form{
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.text{
  color: #fff;
  font-size: 22px;
  font-family: serif;
  text-align: center;
}
.index{
  color: #fff;
  color: #409EFF;
  display: inline-block;
  margin: 10px 0;
  transition: all .5s;
}
.index:hover{
  font-size: 1.05em;
}
@media screen and (max-width: 768px){
  .text{
    font-size: 16px;
  }
}
</style>