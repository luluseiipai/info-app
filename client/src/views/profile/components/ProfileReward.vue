<template>
  <div class="profileReward">
    <div v-if="profile" class="rewards">
      <h1 class='title'>获奖经历</h1>
      <div class='content'>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'profileReward',
  data(){
    return {}
  },
  props:{
    profile:Object
  },
  mounted(){
  },
  methods:{
    
  }
}
</script>

<style scoped>
.rewards{
  border: 1px solid #E4E7ED;
  box-sizing: border-box;
  padding: 30px 20px 0;
  margin-top: 20px;
  width: 400px;
  -webkit-transition: .5s;
  -moz-transition: .5s;
  -o-transition: .5s;
  transition: .5s;
}
.rewards:hover{
  box-shadow:  0 4px 12px 0 rgba(0, 0, 0, 0.1);
}
.rewards .title{
  font-size: 32px;
  text-align: center;
  margin-bottom: 20px;
  color: #17a2b8;
}
</style>