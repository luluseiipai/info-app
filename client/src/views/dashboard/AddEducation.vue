<template>
  <div class="addEducation">
    <div class="container">
      <div class='bread'>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name:'Dashboard_Index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户配置</el-breadcrumb-item>
          <el-breadcrumb-item>添加教育经历</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row>
        <el-col class='ml-10p' :lg="8" :md="12" :sm="12" :xs="12">
          <div class="title">添加教育经历</div>
          <div class="tips">*为必填</div>
          <el-col :span="24" class='formBar'>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
              <el-form-item label="学校:" prop="school">
                <el-input v-model="ruleForm.school" placeholder="请输入学校名称"></el-input>
              </el-form-item>
              <el-form-item label="学位:" prop="degree">
                <el-select v-model="ruleForm.degree" filterable placeholder="请输入个人学位">
                  <el-option
                    v-for="item in degreeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="班级:" prop="class">
                <el-input v-model="ruleForm.class" placeholder="请输入个人班级"></el-input>
              </el-form-item>
              <el-form-item label="专业:" prop="major">
                <el-input v-model="ruleForm.major" placeholder="请输入个人专业"></el-input>
              </el-form-item>
              <el-form-item label="成绩排名:" prop="scoreRank">
                <el-input v-model.number="ruleForm.scoreRank" placeholder="请输入个人成绩综合排名">
                  <template slot="append">%</template>
                </el-input>
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
  name: 'addEducation',
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
      ruleForm:{
        school:'',
        degree:'',
        class:'',
        major:'',
        scoreRank:'',
        from:'',
        to:'',
        description:''
      },
      rules:{
        school:[
          {required:true,message:'学校不能为空',trigger:'blur'}
        ],
        degree:[
          {required:true,message:'学位不能为空',trigger:'blur'}
        ],
        class:[
          {required:true,message:'班级不能为空',trigger:'blur'}
        ],
        major:[
          {required:true,message:'专业不能为空',trigger:'blur'}
        ],
        scoreRank:[
          {required:true,message:'排名不能为空',trigger:'blur'},
          {validator:rankCheck,trigger:'blur'}
        ],
        from:[
          {required:true,message:'时间不能为空',trigger:'blur'}
        ]
      },
      degreeOptions:[{
        value:'小学',
        label:'小学'
      },{
        value:'初中',
        label:'初中'
      },{
        value:'高中',
        label:'高中'
      },{
        value:'大专',
        label:'大专'
      },{
        value:'本科',
        label:'本科'
      },{
        value:'硕士',
        label:'硕士'
      },{
        value:'博士',
        label:'博士'
      }],
      untilNow: false
    }
  },
  computed:{
    
  },
  methods:{
    submitForm(form){
      this.$refs[form].validate(valid => {
        if(valid){
          if(this.untilNow){
            this.ruleForm.to = '至今';
          }
          this.$axios.post('/api/profiles/education',this.ruleForm)
            .then(res => {
              // console.log(res)
              this.$message({
                message:'学历新增成功!',
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