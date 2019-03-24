<template>
  <div class="postShow">
    <div class="container clearfix">
      <div class="content">
        <div class="title">
          <router-link :to="{name:'Post',params:{id:data._id}}">
            <span class="text"><i class="fa fa-book"></i> {{data.title}}</span>
          </router-link>
        </div>
      </div>
      <div class="date">
        <i class='el-icon-date'></i> {{date}}
      </div>
      <div class="userInfo">
        <div class="avatar">
          <img :src="data.avatar">
        </div>
        <div class="name">
          <span class="text">
            {{data.name}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'postShow',
  data(){
    return {}
  },
  props:{
    data:Object,
  },
  computed:{
    date(){
      let time = new Date(this.data.date);
      let year = time.getFullYear();
      let mouth = time.getMonth();
      let day = time.getDate();
      return `${year} - ${mouth} - ${day}`;
    }
  }
}
</script>

<style scoped>
.postShow{
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 20px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
  position: relative;
}
.postShow:hover{
  background-color: #f8f8f8;
}
.content{
  float: left;
}
.content .title{
  line-height: 66px;
}
.content .title .text{
  color: #303133;
  font-size: 24px;
  font-weight: 400;
  font-family: 'PingFang SC' serif;
}
.content .title .text:hover{
  text-decoration: underline;
}
.userInfo{
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
}
.userInfo .avatar{
  width: 50px;
  height: 50px;
}
.userInfo .avatar img{
  border-radius: 50%;
  width: 100%;
  height: 100%;
}
.userInfo .name{
  font-size: 18px;
  color: #606266;
  margin-top: 10px;
}
.date{
  float: left;
  line-height: 69px;
  margin-left: 50px;
}
.content{
  height: 100%;
}
</style>
