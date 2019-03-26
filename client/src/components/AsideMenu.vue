<template>
  <div class="asideMenu">
    <el-row>
      <el-col :span="24">
        <el-menu
          :default-active="CurrentPath"
          class="el-menu-vertical"
          background-color="#383b42"
          text-color="#fff"
          :unique-opened="true"
          active-text-color="#ffd04b">
          <div v-if="profile" class="user">
            用户名: {{profile.name}}<br><br>
            身份: {{user.identity == 'student' ? '学生' : '教师'}}
          </div>
          <div v-if="!profile" class="user">
            <el-button type='primary' @click='createProfile' circle>创建个人信息</el-button>
          </div>
          <router-link :to="{name: 'Dashboard_Index'}">
            <el-menu-item index="dashboard/">
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
            </el-menu-item>
          </router-link>
          <el-submenu :disabled="!profile" index="2">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span>用户配置</span>
            </template>
            <router-link :to="{name:'EditProfile'}">
              <el-menu-item index='dashboard/editprofile'>
                <i class="el-icon-edit"></i>
                <span slot="title">编辑个人信息</span>
              </el-menu-item>
            </router-link>
            <router-link :to="{name:'AddEducation'}">
              <el-menu-item index="dashboard/addeducation">
                <i class="el-icon-circle-plus-outline"></i>
                <span slot="title">添加教育经历</span>
              </el-menu-item>
            </router-link>
            <router-link :to="{name:'AddExperience'}">
              <el-menu-item index="dashboard/addexperience">
                <i class="el-icon-circle-plus-outline"></i>
                <span slot="title">添加个人履历</span>
              </el-menu-item>
            </router-link>
            <el-menu-item-group title="额外">
              <router-link :to="{name:'AddSkill'}">
                <el-menu-item index="dashboard/addskill">
                  <i class="el-icon-circle-plus-outline"></i>
                  <span slot="title">添加个人技能</span>
                </el-menu-item>
              </router-link>
              <router-link :to="{name:'AddReward'}">
                <el-menu-item index="dashboard/addreward">
                  <i class="el-icon-circle-plus-outline"></i>
                  <span slot="title">添加获奖经历</span>
                </el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu :disabled="!profile" index='3'>
            <template slot="title">
              <i class="el-icon-goods"></i>
              <span>功能</span>
            </template>
            <router-link :to="{name: 'Setting'}">
              <el-menu-item index='dashboard/setting'>
                <i class="fa fa-cog"></i>
                <span slot="title">设置</span>
              </el-menu-item>
            </router-link>
            <router-link :to="{name: 'Resume'}">
              <el-menu-item index='dashboard/resume'>
                <i class="fa fa-file-pdf-o"></i>
                <span slot="title">简历</span>
              </el-menu-item>
            </router-link>
          </el-submenu>
          <el-submenu :disabled="!profile" index='4'>
            <template slot="title">
              <i class="el-icon-share"></i>
              <span>关于我们</span>
            </template>
            <router-link :to="{name: 'Introduce'}">
              <el-menu-item index='dashboard/introduce'>
                <i class="el-icon-edit"></i>
                <span slot="title">网站介绍</span>
              </el-menu-item>
            </router-link>
            <router-link :to="{name: 'ContactUs'}">
              <el-menu-item index='dashboard/contactus'>
                <i class="el-icon-edit"></i>
                <span slot="title">联系我们</span>
              </el-menu-item>
            </router-link>
          </el-submenu>
          <el-menu-item index='logout' class='logout' @click='logout'>
            <i class="el-icon-circle-close-outline"></i>
            <span slot="title">退出登录</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'asideMenu',
  data(){
    return {}
  },
  props:{
    profile:{
      type: Object
    }
  },
  methods: {
    createProfile(){
      this.$router.push({name:'CreateProfile'});
    },
    logout(){
      this.$store.dispatch('clearCurrentState');
      localStorage.removeItem('eleToken');
      this.$router.push('/login');
      this.$message('已退出登录');
    }
  },
  computed:{
    CurrentPath(){
      return this.$route.path.replace('/','');
    },
    user(){
      return this.$store.getters.user;
    }
  }
}
</script>

<style scoped>
.asideMenu{
  position: fixed;
  top: 70px;
  left: 0;
  min-height: 100%;
  background-color: #383b42;
  z-index: 99;
}
.user{
  color: #fff;
  font-size: 14px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-menu{
  border: none;
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 180px;
}
.el-menu-vertical {
  width: 35px;
}
.el-submenu .el-menu-item {
  min-width: 180px;
}
.logout i,.logout span{
  color: #F56C6C;
}
@media screen and (max-width: 992px){
  .asideMenu{
    
  }
}
</style>