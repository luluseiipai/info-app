<template>
  <div class="login">
    <div class="container">
      <el-row type="flex" justify="center">
        <el-col :lg="8" :md="12" :sm="16" :xs="23" class='formBar'>
          <h1>登录</h1>
          <el-row>
            <el-col :span="24">
              <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="loginForm">
                <el-form-item label="邮箱:" prop="email">
                <el-input type='email' v-model="loginForm.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="密码:" prop="password">
                  <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="identifyStr">
                    <div class="code" @click="refreshCode">
                        <SIdentify :identifyCode="identifyCode"></SIdentify>
                    </div>
                    <el-input type='text' v-model="loginForm.identifyStr" placeholder="请输入验证码"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button id="registerBtn" type="primary" @click="submitForm('loginForm')">登录</el-button>
                  <el-button type='warning' @click="register" plain>注册</el-button>
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
import jwt_decode from 'jwt-decode';
import SIdentify from '../components/SIdentify';
export default {
  name: 'login',
  data(){
    let check = (rule, value, callback) => {
      if(this.loginForm.identifyStr != this.identifyCode){
        callback(new Error('验证码不正确'));
      }else{
        callback();
      }
    };
    return {
      loginForm:{
        email:'',
        password:'',
        identifyStr: ''
      },
      rules:{
        email:[
          {type:'email',required:true,message:'请输入正确的邮箱',trigger:'blur'},
        ],
        password:[
          {required:true,message:'密码不能为空',trigger:'blur'},
          {max:12,min:6,message:'密码长度不小于6且不大于12位',trigger:'blur'},
        ],
        identifyStr:[
          {required:true,message:'验证码不能为空',trigger:'blur'},
          {validator:check,trigger:'blur'}
        ]
      },
      identifyCode: '',
      identifyCodes: "1234567890",
    }
  },
  methods:{
    submitForm(form){
      this.$refs[form].validate(valid => {
        if(valid){
          this.$axios.post('/api/users/login',this.loginForm)
          .then((res) => {
            // 获取token
            let { token } = res.data;
            // 存储token至ls
            localStorage.setItem('eleToken',token);
            // 解析token
            let decoded = jwt_decode(token);
            // 存储数据到vuex
            this.$store.dispatch('setIsAuthenticated',true);
            this.$store.dispatch('setUser',decoded);
            this.$message({
              message:'账户登录成功!',
              type:'success'
            });
            this.$router.push('/home');
          })
          .catch(err => this.$message.error(err.response.data));
        }
      });
    },
    register(){
      this.$router.push('/register');
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
      console.log(this.identifyCode);
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
  },
  mounted(){
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  components:{
    SIdentify
  }
}
</script>

<style scoped>
.login{
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
  margin-top: 10%;
  box-shadow: 0 0 10px rgba(255,255,255,.6);
}
h1{
  text-align: center;
  font-family: 'Hiragino Sans GB';
  font-size: 18px;
  line-height: 24px;
  margin: 10px 0;
  color: #409EFF;
}
.code{
    display: inline-block;
    width: 122px;
    height: 53px;
    cursor: pointer;
}
</style>