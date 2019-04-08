<template>
  <div class="resumeShow">
    <div class="row" id="pdfDom" style="padding-top:50px;background-color:#fff;">
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
              <span v-if="data.location" class="location">现居地: {{location}}</span>
              <span class="website">个人网站: {{data.website}}</span>
            </div>
            <div class="row">
              <span v-if="data.link" class="wechat">微信: {{data.link.wechat}}</span>
              <span class="status">当前状态: <span class="text">{{data.status}}</span></span>
            </div>
            <div class="row">
              <span v-if="data.intent" class="intent">求职意向: {{data.intent}}</span>
              <span v-if="data.forward" class="forward">期待薪资: {{data.forward}}</span>
            </div>
          </div>
          <div class="avatar">
              <img v-if="data.user" :src="data.user.avatar">
          </div>
        </div>
        <!-- 教育经历 -->
        <div v-if="data.education && data.education.length > 0" class="education bar"
          :style="`border-top:1px solid ${color}`">
          <div class="title"
          :style="`border-left:4px solid ${color}`">教育经历</div>
          <ul class="wrap">
            <li class="item"
            v-for="(item, index) in data.education" :key="index">
              <h1 class="title">
                {{item.school}}
                <span class="time">{{item.from}} - {{item.to}}</span>
              </h1>
              <div class="content">
                <div class="row row-sec">
                  <span class="major">{{item.major}}</span>
                  <span class="class">{{item.class}}</span>
                </div>
                <div class="row">
                  <span class="scoreRank">成绩： 年级前 {{item.scoreRank}} %</span>
                </div>
                <div class="row">
                  <p class="desc">总结： {{item.description}}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <!-- 获奖经历 -->
        <div v-if="data.rewards && data.rewards.length > 0" class="reward bar"
          :style="`border-top:1px solid ${color}`">
          <div class="title"
          :style="`border-left:4px solid ${color}`">获奖经历</div>
          <ul class="wrap">
            <li class="item"
            v-for="(item, index) in data.rewards" :key="index">
              <h1 class="title">
                {{item.rewardName}}
                <span class="time">{{item.time}}</span>
              </h1>
              <div class="content">
                <div class="row">
                  <span class="organizer">主办方：{{item.organizer}}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <!-- 工作经历 -->
        <div v-if="data.experience && data.experience.length > 0" class="experience bar"
          :style="`border-top:1px solid ${color}`">
          <div class="title"
          :style="`border-left:4px solid ${color}`">工作经历</div>
          <ul class="wrap">
            <li class="item"
            v-for="(item, index) in data.experience" :key="index">
              <h1 class="title">
                {{item.company}}
                <span class="time">{{item.from}} - {{item.to}}</span>
              </h1>
              <div class="content">
                <div class="row row-sec">
                  <span class="title">{{item.title}}</span>
                </div>
                <div class="row">
                  <span class="location">地址：{{item.location}}</span>
                </div>
                <div class="row">
                  <p class="desc">总结： {{item.description}}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <!-- 技能/爱好 -->
        <div v-if="data.skills && data.skills.length > 0" class="skills bar"
          :style="`border-top:1px solid ${color}`">
          <div class="title"
          :style="`border-left:4px solid ${color}`">技能掌握</div>
          <ul class="wrap">
            <li class="item"
            v-for="(item, index) in data.skills" :key="index">
              <i class="fa" :class="`fa fa-battery-${item.proficient-1}`"></i> {{item.skillName}}
            </li>
          </ul>
        </div>
        <!-- 个人总结 -->
        <div v-if="data.bio" class="summary bar"
          :style="`border-top:1px solid ${color}`">
          <div class="title"
          :style="`border-left:4px solid ${color}`">个人总结</div>
          <ul class="wrap">
            <li class="item">
              {{data.bio}}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="action">
      <div class="item">
        <el-button size="medium" type="warning" @click="getPdf()">生成PDF</el-button>
      </div>
      <div class="item">
        <el-button size="medium" @click="showAction = !showAction" round>更换主题</el-button>
      </div>
      <el-collapse-transition>
        <div v-show="showAction">
          <div class="item">
            <p class='text'>布局颜色</p>
            <el-color-picker
              v-model="color"
              show-alpha
              :predefine="predefineColors">
            </el-color-picker>
          </div>
        </div>
      </el-collapse-transition>
    </div>
  </div>
</template>

<script>
export default {
  name:'resumeShow',
  data(){
    return {
      data:{},
      color:'#409EFF',
      color2:'#409EFF',
      predefineColors:[
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        'rgba(255, 69, 0, 0.68)',
        'rgb(255, 120, 0)',
        'hsv(51, 100, 98)',
        'hsva(120, 40, 94, 0.5)',
        'hsl(181, 100%, 37%)',
        'hsla(209, 100%, 56%, 0.73)',
        '#c7158577'
      ],
      showAction:false,
      htmlTitle:'简历'
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
.resumeShow{
  position: relative;
}
.container{
  margin: 20px auto;
  width: 1000px;
  padding: 20px 0;
  border-radius: 15px;
  color: #303133;
  font-size: 16px;
  box-shadow: 0 0 16px rgba(0, 0, 0, .1);
  -webkit-transition: .5s;
  -moz-transition: .5s;
  -o-transition: .5s;
  transition: .5s;
}
.container:hover{
  box-shadow: 0 0 24px rgba(0, 0, 0, .2);
}
.primary-info{
  position: relative;
  font-size: 14px;
  margin: 0 40px;
  box-sizing: border-box;
}
.primary-info .info{
  text-align: center;
}
.primary-info .info .row{
  margin: 10px 0;
}
.primary-info .info .row .name{
  font-size: 22px;
}
.primary-info .info .row .status .text{
  font-weight: 500;
}
.primary-info .avatar{
  position: absolute;
  right: 30px;
  top: 0;
  width: 100px;
  height: 100px;
  border-radius: 5px;
  overflow: hidden;
}
.primary-info .avatar img{
  width: 100%;
  height: 100%;
}
.bar{
  margin: 20px 40px;
  padding-top: 15px;
  box-sizing: border-box;
  font-size: 16px;
}
.bar > .title{
  line-height: 30px;
  font-size: 20px;
  padding-left: 10px;
}
.bar .wrap{
  margin: 15px 0;
}
.bar .wrap .item{
  margin: 10px 20px;
  position: relative;
}
.bar .wrap .item > .title{
  font-size: 18px;
  font-weight: 500;
  line-height: 25px;
}
.bar .wrap .item .title .time{
  float: right;
  font-weight: normal;
  font-size: 14px;
  color: #909399;
}
.bar .wrap .item .content .row{
  position: relative;
  margin: 10px 20px;
}
.bar .wrap .item .content .row-sec{
  position: relative;
  margin: 10px 5px;
  color: #909399;
  font-size: 15px;
}
.bar .wrap .item .content .row:not(.row-sec):after{
  content: '';
  position: absolute;
  width: 6px;
  height: 6px;
  background-color: #000;
  border-radius: 50%;
  left: -20px;
  top: 50%;
  margin-top: -3px;
}
.bar .wrap .item .content .row .major{
  margin-right: 20px;
}
.skills .item{
  display: inline-block;
}
.action{
  position: fixed;
  right: 20px;
  top: 100px;
  text-align: center;
}
.action .text{
  font-size: 14px;
  color: #909399;
  margin-bottom: 10px;
}
.action .item{
  margin-bottom: 10px;
}
</style>
