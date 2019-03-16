<template>
  <div class="addExperience">
    <div class="container">
      <div class='bread'>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name:'Dashboard_Index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户配置</el-breadcrumb-item>
          <el-breadcrumb-item>添加个人履历</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row>
        <el-col class='ml-10p' :lg="8" :md="12" :sm="12" :xs="12">
          <div class="title">添加个人履历</div>
          <div class="tips">*为必填</div>
          <el-col :span="24" class='formBar'>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
              <el-form-item label="头衔:" prop="title">
                <el-input v-model="ruleForm.title" autocomplete="off" placeholder="请输入职位头衔"></el-input>
              </el-form-item>
              <el-form-item label="公司:" prop="company">
                <el-input v-model="ruleForm.company" autocomplete="off" placeholder="请输入公司名"></el-input>
              </el-form-item>
              <el-form-item label="具体地址:" prop="location">
                <el-input v-model="ruleForm.location" autocomplete="off" placeholder="请输入公司具体地址"></el-input>
              </el-form-item>
              <el-form-item label="描述:" prop="description">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="ruleForm.description">
                </el-input>
              </el-form-item>
              <el-form-item label="开始时间:" prop="from">
                <el-date-picker
                  v-model="ruleForm.from"
                  type="date"
                  placeholder="选择开始时间"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="结束时间:" prop="to">
                <el-switch
                  v-model="untilNow"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-text="至今">
                </el-switch>
                <el-date-picker
                  :disabled='untilNow'
                  v-model="ruleForm.to"
                  type="date"
                  placeholder="选择结束时间"
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
  name: 'addExperience',
  data(){
    let rankCheck = (rule, value, callback) => {
      if(value === ''){
        callback(new Error("排名不能为空"));
      }
      setTimeout(() => {
        if(!Number.isInteger(value)){
          callback(new Error('请输入数字'));
        } else if( value < 0 || value > 100){
          callback(new Error('请输入0-100之间的值'));
        }else {
          callback();
        }
      },500)
    };
    return {
      time:[],
      ruleForm:{
        title:'',
        company:'',
        location:'',
        from:'',
        to:'',
        description:''
      },
      rules:{
        title:[
          {required:true,message:'头衔不能为空',trigger:'blur'}
        ],
        company:[
          {required:true,message:'公司名不能为空',trigger:'blur'}
        ],
        location:[
          {required:true,message:'地址不能为空',trigger:'blur'}
        ],
        from:[
          {required:true,message:'时间不能为空',trigger:'blur'}
        ]
      },
      untilNow: false
    }
  },
  computed:{
    
  },
  methods:{
    handleRemove(file, fileList){
      console.log(file,fileList);
    },
    handlePreview(file){
      console.log(file)
    },
    submitForm(form){
      this.$refs[form].validate(valid => {
        if(valid){
          if(this.untilNow){
            this.ruleForm.to = '至今';
          }
          this.$axios.post('/api/profiles/experience',this.ruleForm)
            .then(res => {
              // console.log(res)
              this.$message({
                message:'新增履历成功!',
                type:'success'
              });
              this.$emit('update');
              this.$router.push({name:'Dashboard_Index'});
            })
            .catch(err => this.$message.error(err.response.data));
        }
      });
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
.submit{
  width: 100%;
}
@media screen and (max-width: 768px){
  .title{
    font-size: 18px;
    margin-bottom: 10px;
    padding: 10px 0;
  }
}
</style>