<template>
  <div class="resume">
    <div class='bread'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name:'Dashboard_Index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>功能</el-breadcrumb-item>
        <el-breadcrumb-item>简历</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane name='frist'>
          <span slot="label"><i class="fa fa-info-circle"></i> 输入信息</span>
          <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="ruleForm">
            <el-form-item label="求职意向" prop="intent">
              <el-input type="text" v-model="ruleForm.intent" placeholder="请输入求职意向"></el-input>
            </el-form-item>
            <el-form-item label="期望薪资" prop="forward">
              <el-input type="text" v-model="ruleForm.forward" placeholder="请输入期望薪资范围"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="fa fa-eye" @click="jump">预览</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name:'resume',
  data(){
    return {
      activeName:'frist',
      ruleForm:{
        intent:'',
        forward:''
      },
      profile:null
    }
  },
  mounted(){
    this.getData();
  },
  methods:{
    getData(){
      this.$axios.get(`/api/profiles`)
        .then(res => {
          // console.log(res.data)
          this.profile = res.data;
        }).catch(err => this.$message.error(err.response.data));
    },
    jump(){
      let profile = this.profile;
      let data = Object.assign(profile,this.ruleForm);
      this.$router.push({name:'ResumeShow',params:{profile:data}});
    }
  }
}
</script>

<style scoped>
.resume{
  margin-top: -10px;
  overflow: hidden;
}
.bread{
  padding: 30px 20px 20px;
}
.container{
  width: 1000px;
  margin: 0 auto;
}
</style>
