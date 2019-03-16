<template>
  <div class="editProfile">
    <div class="container">
      <div class='bread'>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name:'Dashboard_Index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户配置</el-breadcrumb-item>
          <el-breadcrumb-item>编辑个人信息</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row>
        <el-col class='ml-10p' :lg="8" :md="12" :sm="12" :xs="12">
          <div class="title">编辑个人信息</div>
          <div class="tips">*为必填</div>
          <el-col :span="24" class='formBar'>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
              <el-form-item label="姓名:" prop="name">
                <el-input v-model="ruleForm.name" suffix-icon="el-icon-document" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item label="手机号:" prop="tel">
                <el-input v-model="ruleForm.tel" suffix-icon="el-icon-mobile-phone" placeholder="请输入手机号"></el-input>
              </el-form-item>
              <el-form-item label="生日:" prop="birth">
                <el-date-picker
                  v-model="ruleForm.birth"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="年龄:" v-if="ruleForm.birth">
                {{age}}
              </el-form-item>
              <el-form-item label="位置:" prop="location">
                <el-cascader class="location" :options="options" v-model="ruleForm.location"  @active-item-change="handleChange" placeholder="请选择城市" :props="props"></el-cascader>
              </el-form-item>
              <el-form-item label="状态:" prop="status">
                <el-select v-model="ruleForm.status" placeholder="请选择">
                  <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="职位:" prop="position">
                <el-input v-model="ruleForm.position" placeholder="请输入职位"></el-input>
              </el-form-item>
              <el-form-item label="简介:" prop="bio">
                <el-input type="textarea" :row="2" v-model="ruleForm.bio"  placeholder="请输入您的介绍 , 兴趣爱好 擅长"></el-input>
              </el-form-item>
              <el-form-item label="个人网址:" prop="website">
                <el-input v-model="ruleForm.website" placeholder="请输入您的个人网站或github仓库"></el-input>
              </el-form-item>
              <el-form-item label="github用户名:" prop="githubName">
                <el-input v-model="ruleForm.githubName" placeholder="请输入您的github用户名"></el-input>
              </el-form-item>
              <el-form-item>
                <el-switch
                  style="display: block"
                  v-model="linkSwitch"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-text="联系方式"
                  inactive-text="不联系">
                </el-switch>
              </el-form-item>
              <div class="linkGroup" v-show="linkSwitch">
                <el-form-item label="QQ:" prop="qq">
                  <el-input v-model.number="ruleForm.qq" placeholder="请输入QQ号"></el-input>
                </el-form-item>
                <el-form-item label="Wechat:" prop="wechat">
                  <el-input v-model="ruleForm.wechat" placeholder="请输入您的微信号"></el-input>
                </el-form-item>
              </div>
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
import ct_options from '../../../static/js/country-data.js';
export default {
  name: 'editProfile',
  data(){
    let websiteCheck = (rule, value, callback) => {
      let reg = /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-.,@?^=%&:\/~+#]*[\w\-@?^=%&\/~+#])?$/;
      if(!reg.test(value)){
        callback(new Error("地址必须以 http | https 为开头"));
      }
      callback();
    };
    return {
      ruleForm:{
        position:''
      },
      rules:{
        name:[
          {required:true,message:'姓名不能为空',trigger:'blur'},
          {min:2,max:10,message:'长度不能少于2不能大于10位',trigger:'blur'}
        ],
        tel:[
          {required:true,message:'手机号不能为空',trigger:'blur'},
          {min:11,max:11,message:'手机号必须为11位',trigger:'blur'}
        ],
        birth:[
          {required:true,message:'生日不能为空',trigger:'blur'},
        ],
        status:[
          {required:true,message:'状态不能为空',trigger:'blur'},
        ],
        website:[
          {required:true,message:'地址不能为空',trigger:'blur'},
          {validator:websiteCheck,trigger:'blur'}
        ]
      },
      options: ct_options[0].children.map(item => {return {'label':item.label,children:[]}}),
      props: {
        value: 'label',
        children: 'children'
      },
      statusOptions:[
        {value:'学生',label:'学生'},
        {value:'离职',label:'离职'},
        {value:'实习',label:'实习'},
        {value:'在职',label:'在职'}
      ],
      linkSwitch: false,
      hasProfile:false
    }
  },
  computed:{
    age(){
      let r = this.ruleForm.birth.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
      let d = new Date(r[1], r[3] - 1, r[4]);
      if (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]) {
        let Y = new Date().getFullYear();
        return (Y - r[1]);
      }
      return ""
    }
  },
  methods:{
    handleChange(value){
      // console.log(value); // array
      setTimeout(_ => {
        let it = ct_options[0].children.find(item => {
          return item.label == value[0];
        });
        if(value.length <= 1){
          let curIndex = ct_options[0].children.map(item => item.label).indexOf(value[0]);
          this.options[curIndex].children = it.children;
        }
      }, 400);
    },
    submitForm(form){
      this.$refs[form].validate(valid => {
        if(valid){
          this.$axios.post('/api/profiles',this.ruleForm)
            .then(res => {
              // console.log(res)
              this.$message({
                message:'个人信息修改成功!',
                type:'success'
              });
              this.$router.push({name:'Dashboard_Index'});
            })
            .catch(err => this.$message.error(err.response.data));
        }
      });
    },
    getProfile(){
      let profile = this.$store.getters.profile;
      profile.location = profile.location ? profile.location : [];
      profile.position = profile.position ? profile.position : '';
      profile.bio = profile.bio ? profile.bio : '';
      profile.website = profile.website ? profile.website : '';
      profile.githubName = profile.githubName ? profile.githubName : '';
      profile.qq = profile.link.qq ? profile.link.qq : '';
      profile.wechat = profile.link.wechat ? profile.link.wechat : '';
      if(profile.qq || profile.wechat){
        this.linkSwitch = true;
      }
      this.ruleForm = profile;
    }
  },
  mounted(){
    this.getProfile();
  }
  // beforeRouteEnter (to, from, next) {
  //   next(vm => {
  //     vm.getProfile();
  //   });
  // }
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
.location{
  width: 100%;
}
.submit{
  width: 100%;
}
.el-switch{
  user-select: none;
}
@media screen and (max-width: 768px){
  .title{
    font-size: 18px;
    margin-bottom: 10px;
    padding: 10px 0;
  }
}
</style>