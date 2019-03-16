<template>
  <div class="profileHeader">
    <div class="header">
      <div class="username">
        {{profile.user.username.toUpperCase()}}
      </div>
      <div class="logo">
        <img :src="profile.user.avatar">
      </div>
      <div class="name">
        <i class="fa fa-user-o"></i>
        {{profile.name}}
      </div>
      <div class="birth">
        <i class="fa fa-birthday-cake"></i>
        {{profile.birth}}
      </div>
      <div class="position">
        <i class="fa fa-envelope-o"></i>
        {{profile.position}}
      </div>
      <div v-if="profile.location" class="location">
        <i class="fa fa-location-arrow"></i>
        <span v-for="(item, index) in profile.location" :key="index">
          {{item}}
        </span>
      </div>
      <div v-if="profile.link || profile.website" class="link">
        <el-tooltip v-if="profile.website" class="item" effect="dark" content="个人网站" placement="bottom-start">
          <a :href="profile.website" target="_blank" rel="noopener noreferrer"><i class="fa fa-internet-explorer"></i></a>
        </el-tooltip>
        <el-tooltip v-if="profile.link.qq" class="item" effect="dark" :content="`QQ：${profile.link.qq}`" placement="bottom">
          <a href="javascript:void(0)" target="_blank" rel="noopener noreferrer"><i class="fa fa-qq"></i></a>
        </el-tooltip>
        <el-tooltip v-if="profile.link.wechat" class="item" effect="dark" :content="`微信：${profile.link.wechat}`" placement="bottom-end">
          <a href="javascript:void(0)" target="_blank" rel="noopener noreferrer"><i class="fa fa-wechat"></i></a>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'profileHeader',
  data(){
    return {}
  },
  props:{
    profile:Object
  },
  methods:{
    
  }
}
</script>

<style scoped>
.header{
  background-color: #17a2b8;
  color: #fff;
  margin: 20px auto;
  border-radius: 15px;
  box-sizing: border-box;
  width: 100%;
  padding: 30px 20px;
  text-align: center;
  font-size: 16px;
  position: relative;
}
.header .logo img{
  border-radius: 50%;
  width: 200px;
  height: 200px;
}
.header > div{
  margin-top: 20px;
  -webkit-transition: .5s;
  -moz-transition: .5s;
  -o-transition: .5s;
  transition: .5s;
}
.header .username{
  margin-top: 0;
}
.header .name{
  font-size: 32px;
}
.header .link a{
  color: #fff;
  font-size: 26px;
  margin: 0 5px;
}
.header > div:not(.link):not(.logo):not(.name):hover{
  -webkit-transform: scale(2);
  -moz-transform: scale(2);
  -o-transform: scale(2);
  transform: scale(2);
}
.header .link a i{
  -webkit-transition: .5s;
  -moz-transition: .5s;
  -o-transition: .5s;
  transition: .5s;
}
.header .link a:hover i{
  -webkit-transform: scale(1.5);
  -moz-transform: scale(1.5);
  -o-transform: scale(1.5);
  transform: scale(1.5);
}
</style>