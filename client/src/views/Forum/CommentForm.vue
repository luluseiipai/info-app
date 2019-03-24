<template>
  <div class="postForm">
    <div class="wrap">
      <div class="title clearfix">
        <div class="text">评论</div>
      </div>
      <div class="editor">
         <quill-editor ref="myTextEditor"
          v-model="content"
          :options="editorOption" 
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)">
        </quill-editor>
      </div>
      <div class="submit clearfix">
        <span class='text' :class="isAnonymous ? 'active' : ''">匿名</span>
        <el-switch
          v-model="isAnonymous"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
        <el-button type='primary' @click="post">发送</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { addQuillTitle } from './quill-title.js'
export default {
  name:'postForm',
  data(){
    return {
      content:'',
      editorOption:{
        modules:{
          toolbar:[
            ['bold', 'italic', 'underline', 'strike'],    //加粗，斜体，下划线，删除线
            ['blockquote', 'code-block'],     //引用，代码块
            [{ 'header': 1 }, { 'header': 2 }],        // 标题，键值对的形式；1、2表示字体大小
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],     //列表
            [{ 'script': 'sub'}, { 'script': 'super' }],   // 上下标
            [{ 'indent': '-1'}, { 'indent': '+1' }],     // 缩进
            [{ 'direction': 'rtl' }],             // 文本方向
            [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],     //几级标题
            [{ 'color': [] }, { 'background': [] }],     // 字体颜色，字体背景颜色
            [{ 'font': [] }],     //字体
            [{ 'align': [] }],    //对齐方式
            ['clean'],    //清除字体样式
          ]
        }
      },
      isAnonymous:false
    }
  },
  props:{
    post_id:String
  },
  mounted() {
    addQuillTitle();
  },
  methods:{
    post(){
      let name = this.isAnonymous ? '匿名' : this.$store.getters.user.username;
      if(!this.content){
        this.$message.error('标题或内容不能为空，请重新输入');
        return;
      }
      const newComment = {
        text:this.content,
        name
      }
      this.title = '';
      this.content = '';
      this.isAnonymous = false;
      this.$axios.post(`/api/forums/comment/${this.post_id}`,newComment)
        .then(res => {
          this.$message({
            message:'评论成功',
            type:'success'
          })
          this.$emit('update');
        }).catch(err => this.$message.error(err.response.data));
    },
    onEditorBlur(e){
      this.$refs.myTextEditor.$el.querySelector('.ql-snow').style.border = '1px solid #ccc';
      e.container.style.border = '1px solid #ccc';
      e.container.style.borderTop = '0';
    },
    onEditorFocus(e){
      this.$refs.myTextEditor.$el.querySelector('.ql-snow').style.border = '1px solid #409EFF';
      this.$refs.myTextEditor.$el.querySelector('.ql-snow').style.borderBottom = '1px solid #ccc';
      e.container.style.border = '1px solid #409EFF';
      e.container.style.borderTop = '0';
    },
    onEditorReady(e){
      // console.log(e)
    }
  },
  components: {
    quillEditor
  }
}
</script>

<style scoped>
.wrap{
  width: 100%;
  overflow: hidden;
}
.title{
  border-radius: 10px 10px 0 0;
  border: 1px solid #ccc;
  border-bottom: 0;
  background: #f9f9f9;
  width: 100%;
  height: 60px;
  line-height: 60px;
  box-sizing: border-box;
}
.title .text{
  color: #606266;
  font-size: 24px;
  float: left;
  margin: 0 20px;
}
.editor{
  background: #fff;
}
.submit{
  height: 60px;
  line-height: 60px;
  background: #f9f9f9;
  border: 1px solid #ccc;
  border-top: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 0 0 10px 10px;
}
.submit .text{
  color: #606266;
}
.submit .text.active{
  color: #409EFF;
}
.el-button{
  float: right;
}
</style>
