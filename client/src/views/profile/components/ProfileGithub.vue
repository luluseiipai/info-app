<template>
  <div class="profileGithub">
    <div v-if="profile.githubName" class="github">
      <h1 class='title'>公开的Github仓库信息 <i class="fa fa-github"></i></h1>
      <div class="content">
        <div class='item clearfix' v-for="(item, index) in githubData" :key="index">
          <div class="fl">
            <div class="name"><a :href="item.html_url" target="_blank" rel="noopener noreferrer">{{item.name}}</a></div>
            <div class="desc">{{item.description}}</div>
          </div>
          <div class="bars">
            <span>stars: {{item.stargazers_count}}</span>
            <span>watchers: {{item.watchers}}</span>
            <span>forks: {{item.forks}}</span>
          </div>
          <div class="clone">
            <el-button-group>
              <el-tooltip content="Clone with SSH by git" placement="top" effect="light">
                <el-button 
                v-clipboard:copy="item.ssh_url"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
                type='mini'><i class="fa fa-download"></i></el-button>
              </el-tooltip>
              <el-tooltip content="Clone with HTTPS by git" placement="bottom" effect="light">
                <el-button 
                v-clipboard:copy="item.html_url"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
                type='mini'><i class="fa fa-git"></i></el-button>
              </el-tooltip>
            </el-button-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'profileGithub',
  data(){
    return {
      githubData:[],
      loading:false
    }
  },
  props:{
    profile:Object
  },
  methods:{
    onCopy(){
      this.$notify({
        title: '成功',
        message: '成功复制至粘贴栏',
        type: 'success'
      });
    },
    onError(){
      this.$notify.error({
        title: '错误',
        message: '操作失败，请重试'
      });
    }
  },
  async mounted(){
    let res = await fetch(`https://api.github.com/users/${this.profile.githubName}/repos`);
    let data = await res.json();
    let arr = [];
    data.forEach(item => {
      let { name, description, stargazers_count, watchers, forks, html_url, ssh_url} = item;
      // console.log({ name, description, stargazers_count, watchers, forks})
      arr.push({ name, description, stargazers_count, watchers, forks, html_url, ssh_url})
    })
    // console.log(data)
    this.githubData = arr;
  }
}
</script>

<style scoped>
.profileGithub{
  margin-top: 20px;
}
.fl{
  float: left;
}
.github .title{
  font-size: 32px;
  margin-bottom: 20px;
  color: #303133;
}
.github .content{
  font-size: 16px;
  color: #606266;
  border: 1px solid #E4E7ED;
  box-sizing: border-box;
  padding: 10px 20px;
  border-radius: 10px;
  -webkit-transition: .5s;
  -moz-transition: .5s;
  -o-transition: .5s;
  transition: .5s;
}
.github .content:hover{
  box-shadow:  0 0 16px rgba(0, 0, 0, 0.1);
}
.github .content .item:not(:last-child){
  border-bottom: 1px solid #999;
}
.github .content .item{
  padding: 20px 0;
}
.item .name a{
  color: #17a2b8;
  font-size: 24px;
}
.item .desc{
  margin-top: 20px;
  font-size: 16px;
}
.item .bars{
  float: right;
  margin: 5px 20px 0 0;
}
.item .bars span{
  display: inline-block;
  margin: 0 5px;
  padding: 3px 5px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 18px;
  color: #fff;
  -webkit-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
}
.item .bars span:nth-child(1){
  background-color: #409EFF;
}
.item .bars span:nth-child(2){
  background-color: #909399;
}
.item .bars span:nth-child(3){
  background-color: #67C23A;
}
.item .clone{
  float: right;
  margin-right: 20px;
}
</style>