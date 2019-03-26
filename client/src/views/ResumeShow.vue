<template>
  <div class="resumeShow">
    <div class="container">
      <!-- 主要信息 -->
      <div class="primary-info">
        <div class="info">
          <div class="row">
            <span class="name">{{data.name}}</span>
          </div>
          <div class="row">
            <span class="tel">电话: {{data.tel}}</span>
            <span class="email" v-if="data.user">邮箱: {{data.user.email}}</span>
          </div>
          <div class="row">
            <span v-if="data.wechat" class="wechat">微信: {{data.wechat}}</span>
            <span v-if="data.location" class="location">现居地: {{location}}</span>
            <span class="website">个人网站: {{data.website}}</span>
          </div>
          <div class="row">
            <span class="status">当前状态: {{data.status}}</span>
            <span v-if="data.intent" class="intent">求职意向: {{data.intent}}</span>
            <span v-if="data.forward" class="forward">期待薪资: {{data.forward}}</span>
          </div>
        </div>
        <div class="avatar"></div>
      </div>
      <!-- 教育 -->
      <div class="education"></div>
      <!-- 经历 -->
      <div class="experience"></div>
      <!-- 技能/爱好 -->
      <div class="skills-fa"></div>
      <!-- 个人总结 -->
      <div class="summary"></div>
    </div>
  </div>
</template>

<script>
export default {
  name:'resumeShow',
  data(){
    return {
      data:{}
    }
  },
  mounted(){
    let data = this.$route.params.profile;
    console.log(data)
    this.data = data;
  },
  computed:{
    location(){
      return this.data.location.join('');
    }
  },
  beforeRouteEnter (to, from, next) {
    if(!to.params.profile){
      next('/');
    }else{
      next();
    }
  }
}
</script>

<style scoped>
.container{
  margin: 20px auto;
  width: 1000px;
}
.primary-info{
  position: relative;
}
.primary-info .info{
  text-align: center;
}
.primary-info .info .row{
  margin: 10px 0;
}
.primary-info .info .row .name{
  font-size: 24px;
}
.primary-info .avatar{
  position: absolute;
}
</style>
