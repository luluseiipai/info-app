<template>
  <div class="profileBio">
    <div v-if="profile.bio" class="bio">
      <h1 class='title'>个人简介<i class="fa fa-newspaper-o"></i></h1>
      <div class='content'>{{profile.bio}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name:'profileBio',
  data(){
    return {}
  },
  props:{
    profile:Object
  },
  methods:{
    
  }
}
</script>

<style scoped>
.bio{
  border-radius: 15px 15px 0 0;
  border: 1px solid #E4E7ED;
  box-sizing: border-box;
  padding: 30px 20px;
  background-color: #f9f9f9;
  -webkit-transition: .5s;
  -moz-transition: .5s;
  -o-transition: .5s;
  transition: .5s;
}
.bio:hover{
  box-shadow:  0 -4px 12px 0 rgba(0, 0, 0, 0.1);
}
.bio .title{
  font-size: 32px;
  text-align: center;
  margin-bottom: 20px;
  color: #17a2b8;
}
.bio .content{
  font-size: 16px;
  color: #606266;
  width: 600px;
  margin: 0 auto;
}
</style>