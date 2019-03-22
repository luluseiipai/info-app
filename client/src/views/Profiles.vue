<template>
  <div class="profiles">
    <div class="container">
      <h1 class="title">校友们</h1>
      <p class="text">Coding Every day</p>
      <div class="user-list">
        <el-card shadow="hover" class='box-card clearfix' v-for="(item, index) in profiles" :key="index">
          <div class="avatar"><img :src="item.user.avatar"></div>
          <div class="name">{{item.name}}</div>
          <div class="status">{{item.status}}</div>
          <el-button type="primary" size="small" @click="move(item.handle)">更多信息</el-button>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'profiles',
  data(){
    return {
      profiles:[]
    }
  },
  mounted(){
    this.getData();
  },
  methods:{
    getData(){
      this.$axios.get('/api/profiles/all')
        .then(res => {
          // console.log(res.data)
          this.profiles = res.data;
        }).catch(err => this.$message.error(err.response.data));
    },
    move(handle){
      this.$router.push({name:'Profile',params:{handle}});
    }
  },
  computed:{
    user(){
      return this.$store.getters.user;
    }
  }
}
</script>

<style scoped>
.container{
  width: 960px;
  margin: 0 auto;
  padding-bottom: 200px;
  overflow: hidden;
}
.title,
.text{
  text-align: center;
  margin-top: 30px;
  font-size: 48px;
  color: #303133;
  letter-spacing: 2px;
  font-weight: 300;
}
.text{
  font-size: 24px;
}
.user-list{
    margin-top: 30px;
}
.el-card{
  border-radius: 10px;
  margin-bottom: 20px;
  box-sizing: border-box;
  padding: 10px;
  width: 200px;
  height: 300px;
  display: inline-block;
  margin: 0 20px 20px;
  text-align: center;
}
.avatar{
  width: 100px;
  height: 100px;
  margin: 0 auto;
}
.avatar img{
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.name,
.status{
  margin: 20px 0;
  font-size: 24px;
  font-weight: 500;
  color: #303133;
}
.status{
  font-size: 16px;
  font-weight: 400;
}
.el-button{
  -webkit-transition: .5s;
  -moz-transition: .5s;
  -o-transition: .5s;
  transition: .5s;
}
.el-button:hover{
  -webkit-transform: scale(1.2);
  -moz-transform: scale(1.2);
  -o-transform: scale(1.2);
  transform: scale(1.2);
}
@media screen and (max-width: 992px){
  
}
</style>