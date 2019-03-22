<template>
  <div class="profile">
    <!-- 返回上一页 -->
    <div @click="goBack" class="goBack">
      <el-button size="medium" round>返回上一页</el-button>
    </div>
    <!-- 头部 -->
    <app-profileHeader v-if="profile" :profile="profile"></app-profileHeader>
    <!-- 个人简介 -->
    <app-profileBio v-if="profile" :profile="profile"></app-profileBio>
    <!-- 技能 -->
    <app-profileSkill v-if="profile && profile.skills.length > 0" :skills="profile.skills"></app-profileSkill>
    <!-- 经历 -->
    <app-profileExtra v-if="profile && (profile.rewards.length > 0 || profile.education.length > 0 || profile.experience).length > 0" 
    :rewards="profile.rewards" :education="profile.education" :experience="profile.experience"></app-profileExtra>
    <!-- github仓库 -->
    <app-profileGithub v-if="profile" :profile="profile"></app-profileGithub>
  </div>
</template>

<script>
import ProfileHeader from './components/ProfileHeader';
import ProfileBio from './components/ProfileBio';
import ProfileSkill from './components/ProfileSkill';
import profileExtra from './components/ProfileExtra';
import profileGithub from './components/ProfileGithub';
export default {
  name:'profile',
  data(){
    return {
      profile:null
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getProfileByHandle(to.params.handle);
    })
  },
  methods:{
    async getProfileByHandle(handle){
      let res = await this.$axios.get(`/api/profiles/handle/${handle}`);
      // console.log(res)
      if(res.status == 200){
        this.profile = res.data;
      }
    },
    goBack(){
      this.$router.go(-1);
    }
  },
  components:{
    'app-profileHeader':ProfileHeader,
    'app-profileBio':ProfileBio,
    'app-profileSkill':ProfileSkill,
    'app-profileExtra':profileExtra,
    'app-profileGithub':profileGithub
  }
}
</script>

<style scoped>
.profile{
  width: 1000px;
  margin: 0 auto;
  overflow: hidden;
  padding-bottom: 50px;
}
.goBack{
  margin: 20px 0;
}
</style>
