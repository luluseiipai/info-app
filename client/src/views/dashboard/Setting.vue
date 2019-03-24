<template>
  <div class="setting">
    <div class='bread'>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name:'Dashboard_Index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>功能</el-breadcrumb-item>
        <el-breadcrumb-item>设置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane name='frist'>
          <span slot="label"><i class="fa fa-unlock-alt"></i> 更改密码</span>
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="旧密码" prop="oldPassword">
              <el-input type="password" v-model="ruleForm.oldPassword" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
              <el-input type="password" v-model="ruleForm.newPassword" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="checkNewPassword">
              <el-input type="password" v-model="ruleForm.checkNewPassword" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane name='second'>
          <span slot="label"><i class="fa fa-times-circle"></i> 注销账号</span>
          <div class="container">
            <el-button type='danger' @click="deleteAcc">注销账号</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name:'setting',
  data(){
   let checkPassword = (rule, value, callback) => {
      if(value !== this.ruleForm.newPassword){
        callback(new Error('两次输入密码不一致'));
      }else{
        callback();
      }
    };
    return {
      activeName:'frist',
      ruleForm:{
        oldPassword:'',
        newPassword:'',
        checkNewPassword:''
      },
      rules:{
        oldPassword: [
          {required:true,message:'旧密码不能为空',trigger:'blur'}
        ],
        newPassword: [
          {required:true,message:'密码不能为空',trigger:'blur'},
          {max:12,min:6,message:'密码长度不小于6且不大于12位',trigger:'blur'},
        ],
        checkNewPassword: [
          {required:true,message:'确认密码不能为空',trigger:'blur'},
          {validator:checkPassword,trigger:'blur'}
        ]
      }
    }
  },
  methods:{
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/api/users/reset_password',this.ruleForm)
            .then(res => {
              // console.log(res);
              this.$message({
                message:'密码修改成功',
                type:'success'
              });
              this.$router.push({name:'Dashboard_Index'});
            }).catch(err => this.$message.error(err.response.data));
        } else {
          this.$message.error('请正确输入');
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    deleteAcc(){
      this.$axios.delete('/api/profiles')
        .then(res => {
          this.$message({
            message:'账户注销成功',
            type:'success'
          });
          this.$store.dispatch('clearCurrentState');
          localStorage.removeItem('eleToken');
          this.$router.push('/login');
        }).catch(err => this.$message.error(err.response.data));
    }
  }
}
</script>

<style scoped>
.setting{
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
.content .avatar{
  color: #E6A23C;
}
.content{
  font-size: 18px;
  color: #606266;
}
</style>
