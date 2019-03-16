<template>
  <nav class="navbar">
    <div class="container">
      <div class="logo-container">
        <router-link to="/">
          <img src="../../static/img/logo.png" class="logo">
          <span class="title">大学生个人信息管理系统</span>
        </router-link>
      </div>
      <div v-show="isLogin" class="user">
        <div class="userinfo">
          <img :src="user.avatar" class="avatar">
          <div class="text">
            <p>{{user.username}}</p>
            <p>{{user.identity == 'student' ? '学生' : '教师'}}</p>
          </div>
        </div>
        <div class="userDropDown">
          <el-dropdown trigger="click" @command="setDialogInfo">
            <span class="el-dropdown-link">
                <i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="info">个人主页</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div v-show="!isLogin" class="handle">
        <router-link :to="{name:'Login'}" class="login item">登录</router-link>
        <router-link :to="{name:'Register'}" class="register item">注册</router-link>
      </div>
      <div v-show="isLogin" class="dashboard">
        <router-link :to="{name:'Dashboard_Index'}">Dashboard</router-link>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
  name: 'navbar',
  computed:{
    user(){
      return this.$store.getters.user;
    },
    isLogin(){
      return this.$store.getters.isAuthenticated;
    }
  },
  methods:{
    setDialogInfo(cmdItem){
      switch(cmdItem){
        case "info": this.userInfo();break;
        case "logout": this.logout();break;
      }
    },
    userInfo(){
      this.$router.push({name:'UserInfo'});
    },
    logout(){
      this.$store.dispatch('clearCurrentState');
      localStorage.removeItem('eleToken');
      this.$router.push('/login');
      this.$message('已退出登录');
    }
  }
}
</script>

<style scoped>
.navbar{
  background-color: #383b42;
  height: 60px;
  align-items: center;
  padding: 5px;
  color: #fff;
  user-select: none;
}
.logo-container{
  float: left;
  line-height: 60px;
}
.userinfo{
  float: left;
}
.logo{
  float: left;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  vertical-align: middle;
}
.title{
  color: #fff;
  font-size: 18px;
  font-family: 'PingFang SC';
  letter-spacing: 2px;
  vertical-align: middle;
  float: left;
  margin-left: 2px;
}
.title:hover{
  color: #e7e8f0;
}
.dashboard{
  float: right;
  line-height: 60px;
  margin-right: 15px;
  padding: 0 5px;
  border-radius: 10px;
}
.dashboard a{
  color: #fff;
}
.user{
  float: right;
  height: 70px;
}
.avatar{
  float: left;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin-right: 10px;
  margin-top: 5px;
}
.text{
  font-size: 16px;
  float: left;
  text-align: center;
  margin-top: 10px;
}
.text > p{
  margin-bottom: 5px;
}
.text > p:nth-child(2){
  color: #56cdfc;
}
.el-dropdown-link{
  color: #fff;
  cursor: pointer;
  line-height: 60px;
  position: relative;
  top: 10px;
  margin-left: 5px;
}
.userDropDown{
  float: left;
}
.handle{
  float: right;
}
.handle .item{
  color: #fff;
  height: 60px;
  line-height: 60px;
  width: 50px;
  display: inline-block;
  text-align: center;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 400;
  transition: all .4s ease-in-out;
}
.handle .item:first-child{
  color: #409EFF;
}
.handle .item:last-child{
  color: #E6A23C;
}
.handle .item:hover{
  background-color: #40444d;
  box-shadow: 0 0 5px #4c515c;
}
@media only screen and (max-width:600px){
  .dashboard{
    display: none;
  }
}
@media only screen and (max-width: 768px){
  .title{
    font-size: 16px;
    letter-spacing: 1px;
  }
  .avatar{
    height: 40px;
    width: 40px;
    margin-right: 5px;
    margin-top: 10px;
  }
  .text{
    font-size: 14px;
    margin-top: 15px;
  }
  .handle .item{
    font-size: 15px;
  }
}
</style>
