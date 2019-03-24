<template>
  <div class="forum">
    <div class="container">
      <div class="post-list">
        <title>贴吧</title>
        <div class="post-item"
        v-for="(item, index) in posts" :key="index">
          <div class="post">
            <app-postShow :data="item"></app-postShow>
          </div>
        </div>
      </div>
      <div class="post-form">
        <app-postForm @update='getData'></app-postForm>
      </div>
      <vue-canvas-nest></vue-canvas-nest>
    </div>
  </div>
</template>

<script>
import PostForm from './PostForm';
import vueCanvasNest from 'vue-canvas-nest'
import PostShow from './PostShow';
export default {
  name:'forum',
  data(){
    return {
      posts:[]
    }
  },
  components:{
    'app-postForm':PostForm,
    'app-postShow':PostShow,
    vueCanvasNest
  },
  mounted(){
    this.getData();
  },
  methods:{
    getData(){
      this.$axios.get('/api/forums/all')
        .then(res => {
          // console.log(res.data);
          this.posts = res.data;
        })
    }
  }
}
</script>

<style scoped>
.container{
  width: 1000px;
  margin: 0 auto;
  margin-top: 20px;
}
</style>
