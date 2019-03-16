<template>
  <div class="addReward">
    <div class="container">
      <div class='bread'>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name:'Dashboard_Index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户配置</el-breadcrumb-item>
          <el-breadcrumb-item>添加获奖证明</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row>
        <el-col class='ml-10p' :lg="8" :md="12" :sm="12" :xs="12">
          <div class="title">添加获奖证明</div>
          <div class="tips">*为必填</div>
          <el-col :span="24" class='formBar'>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="120px" class="ruleForm">
              <el-form-item label="奖项:" prop="rewardName">
                <el-input v-model="ruleForm.rewardName" placeholder="请输入获奖奖项名称"></el-input>
              </el-form-item>
              <el-form-item label="主办组织/机构:" prop="organizer">
                <el-input v-model="ruleForm.organizer" placeholder="请输入奖项主办机构/组织"></el-input>
              </el-form-item>
              <el-form-item label="获奖时间:" prop="time">
                <el-date-picker
                  v-model="ruleForm.time"
                  type="date"
                  placeholder="选择获奖时间"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button class='submit' type="primary" @click="submitForm('ruleForm')">提交</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'addReward',
  data(){
    return {
      ruleForm:{
        rewardName:'',
        organizer:'',
        time:''
      },
      rules:{
        rewardName:[
          {required:true,message:'奖项名不能为空',trigger:'blur'}
        ],
        organizer:[
          {required:true,message:'主办机构不能为空',trigger:'blur'}
        ],
        time:[
          {required:true,message:'时间不能为空',trigger:'change'}
        ]
      },
    }
  },
  computed:{},
  methods:{
    submitForm(formName){
      this.$refs[formName].validate(isvalid => {
        if(isvalid){
          this.$axios.post('/api/profiles/addreward',this.ruleForm)
            .then(res => {
              // console.log(res.data)
              this.$message({
                message:'学历新增成功!',
                type:'success'
              });
              this.$emit('update');
              this.$router.push({name:'Dashboard_Index'});
            }).catch(err => this.$message.error(err.response.data));
        }
      })
    }
  }
}
</script>

<style scoped>
.bread{
  padding: 20px;
}
.goback{
  margin: 10px 0 20px 10px;
}
.title{
  text-align: center;
  font-size: 22px;
  font-family: 'PingFang SC';
  padding: 20px 0;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  color: #303133;
}
.tips{
  color: #909399;
  font-size: 12px;
  margin: 5px;
}
.ml-10p{
  margin-left: 20%;
}
.untilNow{
  color: #606266;
  font-size: 14px;
}
@media screen and (max-width: 768px){
  
}
</style>