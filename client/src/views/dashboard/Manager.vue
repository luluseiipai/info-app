<template>
  <div class="manager">
    <div class='bread'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name:'Dashboard_Index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>功能</el-breadcrumb-item>
        <el-breadcrumb-item>学生管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <app-students @update="getData" :students="profiles"></app-students>
    </div>
  </div>
</template>

<script>
import Students from '../../components/Students';
export default {
  name:'manager',
  data(){
    return {
      profiles:[]
    }
  },
  components:{
    'app-students':Students
  },
  methods:{
    async getData(){
      let res = await this.$axios.get(`/api/profiles/all`);
      if(res.status === 200){
        this.profiles = res.data;
      }else{
        this.$message.error('操作有误！');
      }
    }
  },
  async mounted(){
    this.getData();
  }
}
</script>

<style scoped>
.manager{
  margin-top: -10px;
  overflow: hidden;
}
.bread{
  padding: 30px 20px 20px;
}
</style>
