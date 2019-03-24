<template>
  <div class="post">
    <div class="container">
      <div class="back">
        <el-button type='primary' plain 
        @click="$router.go(-1)">返回</el-button>
      </div>
      <app-postTitle v-if="postData != null" :data="postData" @update="getData"></app-postTitle>
      <app-commentForm @update="getData" v-if="postData" :post_id="postData._id"></app-commentForm>
      <template v-if="postData">
        <app-commentShow 
          v-for="(item, index) in postData.comments" :key="index"
          :data="item"
          :postId="postData._id"
          @update="getData"></app-commentShow>
      </template>
    </div>
    <vue-canvas-nest></vue-canvas-nest>
  </div>
</template>

<script>
import vueCanvasNest from 'vue-canvas-nest';
import PostTitle from './PostTitle';
import CommentForm from './CommentForm';
import CommentShow from './CommentShow';
export default {
  name:'post',
  data(){
    return {
      postData:null
    }
  },
  components:{
    vueCanvasNest,
    'app-postTitle':PostTitle,
    'app-commentForm':CommentForm,
    'app-commentShow':CommentShow
  },
  mounted(){
    this.getData();
  },
  methods:{
    getData(){
      this.$axios.get(`/api/forums/${this.$route.params.id}`)
        .then(res => {
          this.postData = res.data;
        }).catch(err => {
          this.$message.error(err.response.data);
        })
    }
  }
}
</script>

<style scoped>
.post{
  width: 1000px;
  margin: 0 auto;
  margin-top: 20px;
}
.back{
  margin-bottom: 10px;
}
</style>
