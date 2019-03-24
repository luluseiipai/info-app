<template>
  <div class="addExperience">
    <div class="container">
      <div class='bread'>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name:'Dashboard_Index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户配置</el-breadcrumb-item>
          <el-breadcrumb-item>添加个人技能</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row>
        <el-col class='ml-10p' :span="12">
          <div class="title">添加个人技能</div>
          <div class="tips">*为必填</div>
          <el-col :span="24" class='formBar'>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="ruleForm">
              <el-form-item label="技能名:" prop="skillName">
                <el-input v-model="ruleForm.skillName" placeholder="请输入技能名称"></el-input>
              </el-form-item>
              <el-form-item label="熟练度:" prop="proficient">
                <!-- <el-select v-model="ruleForm.proficient" placeholder="请选择技能熟练度">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select> -->
                <el-rate
                  v-model="ruleForm.proficient"
                  :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                </el-rate>
              </el-form-item>
              <div class="moreGroup">
                <div class="moreGroupItem" v-for="(item, index) in ruleForm.moreSkill" :key="index">
                  <el-form-item label="技能名:" :prop="'moreSkill.' + index + '.skillName'" :rules="rules.skillName">
                    <el-input v-model="item.skillName" placeholder='请输入技能名' ></el-input>
                  </el-form-item>
                  <el-form-item label="熟练度:" :prop="'moreSkill.' + index + '.proficient'" :rules="rules.proficient">
                    <!-- <el-select v-model="item.proficient" placeholder="请选择技能熟练度">
                      <el-option
                        v-for="subItem in options"
                        :key="subItem.value"
                        :label="subItem.label"
                        :value="subItem.value">
                      </el-option>
                    </el-select> -->
                     <el-rate
                      v-model="item.proficient"
                      :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                    </el-rate>
                  </el-form-item>
                  <el-button type='danger' @click="removeskill(item,index)" round>删除</el-button>
                </div>
              </div>
              <el-form-item class='action'>
                <el-button @click='addskill' type='warning' round>添加</el-button>
                <el-button @click='initskill' round>重置</el-button>
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
  name: 'addSkill',
  data(){
    return {
      ruleForm:{
        skillName:'',
        proficient:null,
        moreSkill:[]
      },
      rules:{
        skillName:[
          {required:true,message:'技能名不能为空',trigger:'blur'}
        ],
        proficient:[
          {required:true,message:'熟练度不能为空',trigger:'change'}
        ]
      },
      options:[{
          label:'了解',
          value:'25'
        },{
          label:'熟悉',
          value:'50'
        },{
          label:'熟练',
          value:'75'
        },{
          label:'精通',
          value:'100'
        }]
    }
  },
  computed:{
    
  },
  methods:{
    addskill(){
      this.ruleForm.moreSkill.push({skillName:'',proficient:null});
    },
    removeskill(item,index){
      this.ruleForm.moreSkill.splice(index,1);
    },
    initskill(){
      this.ruleForm.moreSkill = [];
    },
    submitForm(form){
      this.$refs[form].validate(valid => {
        if(valid){
          let arrData = new Array();
          arrData.push({skillName:this.ruleForm.skillName,proficient:this.ruleForm.proficient});
          if(this.ruleForm.moreSkill.length > 0){
            this.ruleForm.moreSkill.forEach(item => {
              arrData.push({skillName:item.skillName,proficient:item.proficient});
            });
          }
          this.$axios.post('/api/profiles/addskill',arrData)
            .then(res => {
              // console.log(res)
              this.$message({
                message:'技能添加成功!',
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
.el-form-item{
  margin-bottom: 10px;
}
.ml-10p{
  margin-left: 20%;
}
.el-rate{
  line-height: 40px;
}
.action{
  margin-top: 20px;
}
.submit{
  width: 50%;
}
@media screen and (max-width: 768px){
  .title{
    font-size: 18px;
    margin-bottom: 10px;
    padding: 10px 0;
  }
}
</style>