<template>
  <div class="profileSkill">
    <div v-if="skills" class="skills">
      <h1 class='title'>个人技能 <i class="fa fa-line-chart"></i></h1>
      <div class='content'>
        <div id="myChart" class="myChart" :style="{width: '800px', height: '350px'}"></div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';
export default {
  name:'profileSkill',
  data(){
    return {}
  },
  props:{
    skills:Array
  },
  mounted(){
    this.$nextTick(()=>{
        this.drawLine();
    })
  },
  methods:{
    drawLine(){
      let nameArr = this.skills.map(item => item.skillName);
      let proficientArr = this.skills.map(item => item.proficient);
    //   console.log(nameArr)
    //   console.log(proficientArr)
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart'))
      let options = {
        title: { text: '技能掌握熟练度' },
        tooltip: {},
        xAxis: {
          data: nameArr
        },
        yAxis: {
        },
        series: [{
          name: '熟练度',
          type: 'bar',
          data: proficientArr,
          itemStyle:{
            normal:{
              color:'#1fb9d1'
            }
          }
        }]
      }
      // console.log(options)
      // 绘制图表
      myChart.setOption(options); 
    }
  }
}
</script>

<style scoped>
.skills{
  border-radius: 0 0 15px 15px;
  border: 1px solid #E4E7ED;
  box-sizing: border-box;
  padding: 30px 20px 0;
  background-color: #f9f9f9;
  -webkit-transition: .5s;
  -moz-transition: .5s;
  -o-transition: .5s;
  transition: .5s;
}
.skills:hover{
  box-shadow:  0 4px 12px 0 rgba(0, 0, 0, 0.1);
}
.skills .title{
  font-size: 32px;
  text-align: center;
  margin-bottom: 20px;
  color: #17a2b8;
}
.skills .content .myChart{
  margin: 0 auto;
}

</style>