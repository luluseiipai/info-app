<template>
  <div class="commentShow">
    <div class="container">
      <div class="top clearfix">
        <div class="avatar">
          <img :src="data.avatar">
        </div>
        <div class="name">
          <span class="text">
            <i class="fa fa-user-o"></i> {{data.name}}
          </span>
        </div>
        <div class="title">
          {{data.title}}
        </div>
      </div>
      <div class="content">
        <div class="content-box ql-container ql-snow">
            <div class="ql-editor" v-html="data.text"></div>
        </div>
      </div>
      <div class="bottom clearfix">
        <el-button 
          v-if="user != null && user.id == data.user" 
          size="mini" 
          type="danger" 
          plain
          @click="deleteComment"><i class="fa fa-times"></i></el-button>
        <div class="date">
          发表于：{{date}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  name:'commentShow',
  data(){
    return {
      
    }
  },
  props:{
    data:Object,
    postId: String
  },
  computed:{
    user(){
      return this.$store.getters.user;
    },
    date(){
      let time = new Date(this.data.date);
      let year = time.getFullYear();
      let mouth = time.getMonth();
      let day = time.getDate();
      return `${year} - ${mouth} - ${day}`;
    }
  },
  methods:{
    deleteComment(){
      this.$axios.delete(`/api/forums/comment/${this.postId}/${this.data._id}`)
        .then(res => {
          this.$message({
            message:'评论删除成功',
            type:'success'
          });
          this.$emit('update');
        }).catch(err => { 
          this.$message.error(err.response.data);
        })
    }
  }
}
</script>

<style scoped>
.commentShow{
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin: 20px 0;
}
.top{
  height: 60px;
  line-height: 60px;
  width: 100%;
  box-sizing: border-box;
  padding: 0 10px;
}
.top .avatar{
  float: left;
  width: 50px;
  height: 50px;
}
.top .avatar img{
  border-radius: 50%;
  width: 100%;
  height: 100%;
}
.top .name{
  float: left;
  font-size: 18px;
  color: #606266;
  margin-left: 20px;
}
.title{
  text-align: center;
}
.bottom{
  height: 40px;
  line-height: 40px;
}
.date{
  float: right;
  font-size: 14px;
  color: #909399;
}
</style>
