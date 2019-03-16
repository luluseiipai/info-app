<template>
  <div class="index">
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
      <el-tabs tab-position="left" class="tab-list" v-model="activeName">
        <el-tab-pane label="教育经历" name="first">
          <app-education @update="refresh" :education='profile.education'></app-education>
        </el-tab-pane>
        <el-tab-pane label="个人履历" name="second">
          <app-experience @update="refresh" :experience='profile.experience'></app-experience>
        </el-tab-pane>
        <el-tab-pane label="获奖经历" name="third">
          <app-reward @update="refresh" :rewards='profile.rewards'></app-reward>
        </el-tab-pane>
        <el-tab-pane label="技能掌握" name="four">
          <app-skill @update="refresh" :skills='profile.skills'></app-skill>
        </el-tab-pane>
      </el-tabs>
      <!-- <div id="myChart" class="myChart" :style="{width: '500px', height: '350px'}"></div> -->
    </div>
    <div v-if="!profile" class="noData">
      无数据！！！请先创建个人信息
    </div>
    <el-tooltip content="good good study , day day up" placement="bottom" effect="light">
      <div class="dog center">
        <div class="forehead center"></div>
        <div class="face center"></div>
        <div class="chin center"></div>
        <div class="ear"></div>
        <div class="ear right"></div>
        <div class="birthmark"></div>
        <div class="eye">
          <div class="pupil"></div>
        </div>
        <div class="eye right">
          <div class="pupil"></div>
        </div>
        <div class="nose center">
          <div class="nostril"></div>
          <div class="nostril right"></div>
        </div>
        <div class="mouth center">
          <div class="teen"></div>
          <div class="teen right"></div>
          <div class="tongue center"></div>
        </div>
        <div class="body center">
          <div class="arm"></div>
          <div class="arm right"></div>
          <div class="leg">
            <div class="foot"></div>
          </div>
          <div class="leg right">
            <div class="foot"></div>
          </div>
          <div class="belly center"></div>
        </div>
      </div>
    </el-tooltip>
  </div>
</template>

<script>
import Education from '../../components/Education';
import Experience from '../../components/Experience';
import Reward from '../../components/Reward';
import Skill from '../../components/Skill';
import echarts from 'echarts';
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
    'app-reward':Reward,
    'app-skill':Skill
  },
  methods:{
    refresh(){
      this.$emit('update');
    },
    drawLine(){
      let nameArr = this.profile.skills.map(item => item.skillName);
      let proficientArr = this.profile.skills.map(item => {
        switch(item.proficient){
        case '了解': return 25;break;
        case '熟悉': return 50;break;
        case '熟练': return 75;break;
        case '精通': return 100;break;
        }
      });
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: { text: '技能掌握熟练度' },
        tooltip: {},
        xAxis: {
          data: nameArr
        },
        yAxis: {},
        series: [{
          name: '熟练度',
          type: 'bar',
          data: proficientArr
        }]
      }); 
        
    }
  }
}
</script>

<style scoped>
@import url('../../../static/css/style.css');
.index{
  width: 1200px;
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
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
.myChart{
  margin-left: 50%;
  transform: translateX(-50%);
}
.deleteAccount{
    margin-top: 20px;
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