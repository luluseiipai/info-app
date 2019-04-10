<template>
  <div class="index clearfix">
    <div v-if="profile" class="container">
      <div class='bread clearfix'>
        <el-breadcrumb class='fl' separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name:'Dashboard_Index' }">首页</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="fl head">
          Dashboard
          <p>Wellcome <router-link :to="{name:'Profile',params:{handle:profile.handle}}">{{profile.user.username}}</router-link></p>
        </div>
        <el-button class='fr' type="primary" size="small" icon="el-icon-refresh" @click="refresh" round>数据刷新</el-button>
      </div>
      <el-tabs tab-position="top" class="tab-list" v-model="activeName">
        <el-tab-pane label="教育经历" name="first">
          <app-education @update="refresh" :education='profile.education'></app-education>
        </el-tab-pane>
        <el-tab-pane label="工作经历" name="second">
          <app-experience @update="refresh" :experience='profile.experience'></app-experience>
        </el-tab-pane>
        <el-tab-pane label="项目经历" name="third">
          <app-project @update="refresh" :projects='profile.projects'></app-project>
        </el-tab-pane>
        <el-tab-pane label="获奖经历" name="four">
          <app-reward @update="refresh" :rewards='profile.rewards'></app-reward>
        </el-tab-pane>
        <el-tab-pane label="技能掌握" name="five">
          <app-skill @update="refresh" :skills='profile.skills'></app-skill>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div v-if="!profile" class="noData">
      无数据！！！请先创建个人信息
    </div>
  </div>
</template>

<script>
import Education from '../../components/Education';
import Experience from '../../components/Experience';
import Project from '../../components/Project';
import Reward from '../../components/Reward';
import Skill from '../../components/Skill';
export default {
  name: 'index',
  data(){
    return {
      activeName: 'first',
      visible: false
    }
  },
  props:{
    profile:{
      type: Object
    }
  },
  components:{
    'app-education':Education,
    'app-experience':Experience,
    'app-project':Project,
    'app-reward':Reward,
    'app-skill':Skill
  },
  methods:{
    refresh(){
      this.$emit('update');
    }
  }
}
</script>

<style scoped>
.index{
  background: #fff;
}
.bread{
  padding: 20px;
  position: relative;
}
.head{
  margin-left: 40%;
  font-size: 36px;
  color: #303133;
  font-family: 'PingFang SC'
}
.head p{
  font-size: 18px;
  text-indent: 2em;
}
.head p a{
  color: #409EFF;
}
.fl{
  float: left;
}
.fr{
  float: right;
}
.tab-list{
    margin-top: 50px;
}
.noData{
  color: #C0C4CC;
  text-align: center;
  text-indent: -10%;
  line-height: 80vh;
  font-size: 30px;
  animation: noData 5s ease-in-out infinite;
}
.deleteAccount{
    margin-top: 20px;
}
.container{
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
}
@-webkit-keyframes noData{
  from{font-size: 24px;}
  50%{font-size: 30px;}
  to{font-size: 24px;}
}
@-moz-keyframes noData{
  from{font-size: 24px;}
  50%{font-size: 30px;}
  to{font-size: 24px;}
}
@-o-keyframes noData{
  from{font-size: 24px;}
  50%{font-size: 30px;}
  to{font-size: 24px;}
}
@keyframes noData{
  from{font-size: 24px;}
  50%{font-size: 30px;}
  to{font-size: 24px;}
}
</style>