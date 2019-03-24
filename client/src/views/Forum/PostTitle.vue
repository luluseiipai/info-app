<template>
  <div class="postTitle">
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
          <i class="fa fa-book"></i> {{data.title}}
        </div>
      </div>
      <div class="content">
        <div class="content-box ql-container ql-snow">
            <div class="ql-editor" v-html="data.text"></div>
        </div>
      </div>
      <div class="bottom clearfix">
        <div class="actionGroup">
          <el-button-group>
            <el-button 
            size="medium" 
            type="primary" 
            icon="fa fa-thumbs-o-up" 
            plain
            @click="like"><span class="text">{{data.likes.length}}</span></el-button>
            <el-button 
            size="medium" 
            type="warning" 
            icon="fa fa-thumbs-o-down" 
            plain
            @click="unlike"></el-button>
            <el-button 
            v-if="user != null && user.id == data.user" 
            size="medium" 
            type="danger" 
            plain
            @click="deletePost"><i class="fa fa-times"></i></el-button>
          </el-button-group>
        </div>
        <span class="date">发表于： {{date}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  name:'postTitle',
  data(){
    return {
      
    }
  },
  props:{
    data:Object
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
    like(){
      this.$axios.post(`/api/forums/like/${this.data._id}`)
        .then(res => {
          // console.log(res)
          this.$message({
            message:'点赞成功',
            type:'success'
          });
          this.$emit('update');
        }).catch(err => {
          this.$message.error(err.response.data);
        })
    },
    unlike(){
      this.$axios.delete(`/api/forums/unlike/${this.data._id}`)
        .then(res => {
          console.log(res)
          this.$message({
            message:'取消点赞成功',
            type:'success'
          });
          this.$emit('update');
        }).catch(err => {
          this.$message.error(err.response.data);
        })
    },
    deletePost(){
      this.$axios.delete(`/api/forums/${this.data._id}`)
      .then(res => {
        this.$message({
          message:'删除帖子成功',
          type:'success'
        });
        this.$router.push({name:'Forum'});
      }).catch(err => {
        this.$message.error(err.response.data);
      })
    }
  }
}
</script>

<style scoped>
.postTitle{
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 20px;
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
.bottom .actionGroup{
  float: left;
}
.bottom .date{
  float: right;
  font-size: 14px;
  color: #909399;
}
</style>
