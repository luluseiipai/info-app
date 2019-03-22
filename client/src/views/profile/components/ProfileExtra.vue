<template>
  <div class="profileExtra clearfix">
    <div v-if="rewards.length > 0" class="reward">
      <h1 class='title'>获奖经历</h1>
      <div v-for="(item, index) in rewards" :key="index" class='content'>
        <div class="rewardName">{{item.rewardName}}</div>
        <div class="time">{{item.time}}</div>
        <div class="organizer"><span>主办单位：</span>{{item.organizer}}</div>
      </div>
    </div>
    <div v-if="education.length > 0" class="education">
      <h1 class='title'>教育经历</h1>
      <div v-for="(item, index) in education" :key="index" class='content'>
        <div class="school">{{item.school}}</div>
        <div class="time">{{item.from}} - {{item.to}}</div>
        <div class="degree"><span>学位：</span>{{item.degree}}</div>
        <div class="major"><span>专业：</span>{{item.major}}</div>
        <div class="class"><span>班级：</span>{{item.class}}</div>
        <div class="scoreRank"><span>成绩排名：</span>{{item.scoreRank}} %</div>
        <div class="description"><span>在校表现：</span>{{item.description}}</div>
      </div>
    </div>
    <div v-if="experience.length > 0" class="experience">
      <h1 class='title'>工作经历</h1>
      <div v-for="(item, index) in experience" :key="index" class='content'>
        <div class="company">{{item.company}}</div>
        <div class="time">{{item.from}} - {{item.to}}</div>
        <div class="title1"><span>头衔：</span>{{item.title}}</div>
        <div class="location"><span>公司地址：</span>{{item.location}}</div>
        <div class="description"><span>工作描述：</span>{{item.description}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'profileExtra',
  data(){
    return {}
  },
  props:{
    rewards:Array,
    education:Array,
    experience:Array
  }
}
</script>

<style scoped>
.profileExtra{
  margin-top: 20px;
  display: flex;
}
.reward,
.education,
.experience{
  flex: 1;
  margin: 0 5px;
}
.title{
  font-size: 26px;
  margin-bottom: 20px;
  text-align: center;
  color: #17a2b8;
}
.content{
  border-radius: 5px;
  border: 1px solid #E4E7ED;
  box-sizing: border-box;
  padding: 20px 10px;
  font-size: 14px;
  line-height: 30px;
  color: #303133;
  text-indent: 2em;
  -webkit-transition: .5s;
  -moz-transition: .5s;
  -o-transition: .5s;
  transition: .5s;
}
.content:not(:last-of-type){
  margin-bottom: 5px;
}
.content:hover{
  box-shadow:  0 -0 12px rgba(0, 0, 0, 0.1);
}
.rewardName,
.school,
.company{
  font-size: 20px;
  letter-spacing: 1px;
  font-weight: 500;
}
.content .time{
  letter-spacing: 2px;
}
span{
  font-weight: 500;
  font-size: 16px;
}
</style>