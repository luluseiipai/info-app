<template>
  <div class="dashboard">
    <div class="asideMenu">
      <app-asideMenu :profile='profile'></app-asideMenu>
    </div>
    <div class="mainContainer">
      <router-view @update="getProfile" :profile='profile'></router-view>
    </div>
  </div>
</template>

<script>
import AsideMenu from '../components/AsideMenu';
export default {
  name:'dashboard',
  data(){
    return {
      activeName:'first',
      profile: null
    }
  },
  computed:{
    user(){
      return this.$store.getters.user;
    }
  },
  methods:{
    profileExist(){
      return this.profile;
    },
    getProfile(){
      this.$axios.get('/api/profiles')
        .then(res => {
          // console.log(res.data);
          this.profile = res.data;
          this.$store.dispatch('setProfile',this.profile);
        })
        .catch(err => {
          this.$message.error(err.response.data);
          this.$store.dispatch('setProfile',{});
        });
    },
    createProfile(){
      this.$router.push({name:'CreateProfile'});
    }
  },
  components:{
    'app-asideMenu':AsideMenu
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getProfile();
    });
  }
}
</script>

<style scoped>
.asideMenu{
  position: fixed;
  left: 0;
  top: 70px;
  z-index: 10;
  height: calc(100vh - 130px);
}
.mainContainer{
  position: relative;
  box-sizing: border-box;
  min-height: calc(100vh - 130px);
  width: 100%;
  padding-left: 180px;
  padding-top: 10px;
}
@media screen and (max-width: 768px){
  
}
</style>

