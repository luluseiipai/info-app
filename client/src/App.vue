<template>
  <div id="app">
    <el-container>
      <el-header height="70px">
        <app-navbar></app-navbar>
      </el-header>
      <div class="container">
        <router-view></router-view>
      </div>
      <el-footer>
        <app-footer></app-footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import jwt_decode from 'jwt-decode';

export default {
  name: 'App',
  components: {
    'app-navbar':Navbar,
    'app-footer':Footer
  },
  created(){
    if(localStorage.eleToken){
      // 解析token
      let decoded = jwt_decode(localStorage.eleToken);
      // 获取时间
      let curSec = Date.now() / 1000;
      // 检测token是否过期
      if(decoded.exp < curSec){
        this.$store.dispatch('clearCurrentState');
        localStorage.removeItem('eleToken');
        this.$router.push('/login');
        this.$message.error('账户登录过期，请重新登录');
      }else{
        // 存储数据到vuex
        this.$store.dispatch('setIsAuthenticated',true);
        this.$store.dispatch('setUser',decoded);
      }
    }
  }
}
</script>

<style scoped>
.el-header{
  width: 100%;
  padding: 0;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
}
.container{
  width: 100%;
  margin-top: 70px;
  min-height: calc(100vh - 130px);
}
.el-footer{
  width: 100%;
  padding: 0;
}
</style>

<style>
body,html{
  min-width: 375px;
}
.clearfix{
  zoom: 1;
}
.clearfix:after{
  content:'';
  height: 0;
  visibility: hidden;
  display:block;
  clear: both;
}
</style>
