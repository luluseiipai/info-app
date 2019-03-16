<template>
  <div class="register">
    <div class="container">
      <el-row type="flex" justify="center">
        <el-col :lg="8" :md="12" :sm="16" :xs="23" class='formBar'>
          <h1>注册</h1>
          <el-row class="progressBar">
            <el-col :span="24">
              <el-progress :text-inside="true" :stroke-width="20" :percentage="active" :color="progressColor"></el-progress>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="100px" class="registerForm" @submit.native.prevent>
                <el-tooltip class="item" effect="dark" content="我们使用了gravatar全球公认头像，如果需要有头像显示，请使用在gravatar注册的邮箱" placement="top">
                  <el-form-item label="邮箱:" prop="email">
                    <el-input type='email' v-model="registerForm.email" placeholder="请输入邮箱" autocomplete="off"></el-input>
                  </el-form-item>
                </el-tooltip>
                <el-form-item label="用户名:" prop="username">
                  <el-input type='text' v-model="registerForm.username" placeholder="请输入用户名" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码:" prop="password">
                  <el-input type="password" v-model="registerForm.password" placeholder="请输入密码" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码:" prop="password2">
                  <el-input type="password" v-model="registerForm.password2" placeholder="请再次输入密码" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="选择身份:" prop="identity">
                <el-select v-model="registerForm.identity" placeholder="请选择">
                  <el-option label="教师" value="teacher"></el-option>
                  <el-option label="学生" value="student"></el-option>
                </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button id="registerBtn" type="primary" :disabled="valid" @click.prevent="submitForm('registerForm')">注册</el-button>
                  <el-button @click="resetForm('registerForm')">重置</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'register',
  data(){
    let progressCheck = (rule, value, callback) => {
      if(this.active < 100) this.active += 20;
      callback();
    };
    let checkPassword = (rule, value, callback) => {
      if(value !== this.registerForm.password){
        callback(new Error('两次输入密码不一致'));
      }else{
        callback();
      }
    };
    return {
      active:0,
      valid:true,
      registerForm:{
        email:'',
        username:'',
        password:'',
        password2:'',
        identity:''
      },
      rules:{
        email:[
          {type:'email',required:true,message:'请输入正确的邮箱',trigger:'blur'},
          {validator:progressCheck,trigger:'blur'}
        ],
        username:[
          {required:true,message:'用户名不能为空',trigger:'blur'},
          {max:12,min:3,message:'用户名长度不小于3且不大于12位',trigger:'blur'},
          {validator:progressCheck,trigger:'blur'}
        ],
        password:[
          {required:true,message:'密码不能为空',trigger:'blur'},
          {max:12,min:6,message:'密码长度不小于6且不大于12位',trigger:'blur'},
          {validator:progressCheck,trigger:'blur'}
        ],
        password2:[
          {required:true,message:'确认密码不能为空',trigger:'blur'},
          {validator:checkPassword,trigger:'blur'},
          {validator:progressCheck,trigger:'blur'}
        ],
        identity:[
          {required:true,message:'身份不能为空',trriger:'change'},
          {validator:progressCheck,trigger:'change'}
        ],
      }
    }
  },
  methods:{
    submitForm(form){
      this.$refs[form].validate(valid => {
        if(valid){
          this.$axios.post('/api/users/register',this.registerForm)
          .then(res => {
            this.$message({
              message:'账户注册成功!',
              type:'success'
            });
            this.$router.push('/login');
          })
          .catch(err => this.$message.error(err.response.data));
        }
      });
    },
    resetForm(form){
      this.$refs[form].resetFields();
      this.active = 0;
      this.valid = true;
    }
  },
  computed:{
    progressColor(){
      if(this.active < 100){
        return '#409EFF'
      }else{
        this.valid = false;
        return '#67C23A'
      }
    }
  }
}
</script>

<style scoped>
.register{
  height: calc(100vh - 130px);
  background: url(../../static/img/bg2.jpg) no-repeat;
  background-size: cover;
}
.container{
  background-color: rgba(0,0,0,.3);
  height: 100%;
  width: 100%;
}
.el-row:nth-child(1){
  user-select: none;
  padding: 20px 0;
}
.formBar{
  background: #fff;
  padding: 0 10px;
  border-radius: 10px;
  margin-top: 3%;
  box-shadow: 0 0 10px rgba(255,255,255,.6);
}
h1{
  text-align: center;
  font-family: 'Hiragino Sans GB';
  font-size: 18px;
  line-height: 24px;
  margin-top: 10px;
  color: #E6A23C;
}
.progressBar{
  margin: 5px 0;
}
</style>