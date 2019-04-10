<template>
  <div class="addProject">
    <div class="container">
      <div class='bread'>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name:'Dashboard_Index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户配置</el-breadcrumb-item>
          <el-breadcrumb-item>添加项目经历</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row>
        <el-col class='ml-10p' :lg="8" :md="12" :sm="12" :xs="12">
          <div class="title">添加项目经历</div>
          <div class="tips">*为必填</div>
          <el-col :span="24" class='formBar'>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
              <el-form-item label="项目名称:" prop="projectName">
                <el-input v-model="ruleForm.projectName" placeholder="请输入项目名称"></el-input>
              </el-form-item>
              <el-form-item label="担任位置:" prop="position">
                <el-input v-model="ruleForm.position" placeholder="请输入项目担任的位置"></el-input>
              </el-form-item>
              <el-form-item label="项目描述:" prop="projectDesc">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请描述项目详情"
                  v-model="ruleForm.projectDesc">
                </el-input>
              </el-form-item>
              <el-form-item label="负责内容:" prop="charge">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入你个人负责的内容"
                  v-model="ruleForm.charge">
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
  name: 'addProject',
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
        projectName:'',
        position:'',
        projectDesc:'',
        charge:'',
        from:'',
        to:''
      },
      rules:{
        projectName:[
          {required:true,message:'项目名称不能为空',trigger:'blur'}
        ],
        position:[
          {required:true,message:'担任位置不能为空',trigger:'blur'}
        ],
        from:[
          {required:true,message:'开始时间不能为空',trigger:'blur'}
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
          if(!this.ruleForm.to){
            this.ruleForm.to = 'unknow';
          }
          this.$axios.post('/api/profiles/project',this.ruleForm)
            .then(res => {
              // console.log(res)
              this.$message({
                message:'新增项目经历成功!',
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