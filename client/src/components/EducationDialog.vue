<template>
  <div class="educationDialog">
    <el-dialog 
      title="编辑教育经历"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
      :visible.sync="show">
      <div class="tips">*为必填</div>
      <el-form 
        :model="formData"
        ref='form'
        :rules='form_rules'
        label-width="120px"
        style="margin:10px;width:auto;">
        <el-form-item label="学校:" prop="school">
          <el-input v-model="formData.school" placeholder="请输入学校名称"></el-input>
        </el-form-item>
        <el-form-item label="学位:" prop="degree">
          <el-select v-model="formData.degree" filterable placeholder="请输入个人学位">
            <el-option
              v-for="item in degreeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级:" prop="class">
          <el-input v-model="formData.class" placeholder="请输入个人班级"></el-input>
        </el-form-item>
        <el-form-item label="专业:" prop="major">
          <el-input v-model="formData.major" placeholder="请输入个人专业"></el-input>
        </el-form-item>
        <el-form-item label="成绩排名:" prop="scoreRank">
          <el-input v-model="formData.scoreRank" placeholder="请输入个人成绩综合排名">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="描述:" prop="description">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="formData.description">
          </el-input>
        </el-form-item>
        <el-form-item label="开始时间:" prop="from">
          <el-date-picker
            v-model="formData.from"
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
            v-model="formData.to"
            type="date"
            placeholder="选择结束时间"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cansel">取 消</el-button>
        <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'educationDialog',
  props:{
    show: Boolean,
    formData: Object
  },
  data(){
    let rankCheck = (rule, value, callback) => {
      if(value === ''){
        callback(new Error("排名不能为空"));
      }
      setTimeout(() => {
        if( value < 0 || value > 100){
          callback(new Error('请输入0-100之间的值'));
        }else {
          callback();
        }
      },500)
    };
    return {
      form_rules:{
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
  methods:{
    onSubmit(formName){
      this.$refs[formName].validate(valid => {
        if(valid){
          this.$axios.post(`/api/profiles/edit_education/${this.formData.id}`,this.formData)
            .then((res) => {
              this.$message({
                message:"数据编辑成功",
                type:"success"
              })
            });
          // 隐藏dialog
          this.$emit('close');
        }
      });
    },
    cansel(){
      this.$emit('close');
    }
  },
  mounted(){
    this.untilNow = this.formData.to != '至今' ? false : true;
  }
}
</script>

<style scoped>
.untilNow{
  color: #606266;
  font-size: 14px;
}
.tips{
  color: #909399;
  margin: 20px 0;
}
@media screen and (max-width: 992px){
  
}
</style>