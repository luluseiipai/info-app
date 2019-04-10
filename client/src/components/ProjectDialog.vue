z<template>
  <div class="educationDialog">
    <el-dialog 
      title="编辑项目经历"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
      :visible.sync="show">
      <div class="tips">*为必填</div>
      <el-form :model="formData" status-icon :rules="form_rules" ref="form" label-width="100px">
        <el-form-item label="项目名称:" prop="projectName">
          <el-input v-model="formData.projectName" placeholder="请输入项目名称"></el-input>
        </el-form-item>
        <el-form-item label="担任位置:" prop="position">
          <el-input v-model="formData.position" placeholder="请输入担任位置"></el-input>
        </el-form-item>
        <el-form-item label="项目描述:" prop="projectDesc">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="formData.projectDesc">
          </el-input>
        </el-form-item>
        <el-form-item label="负责内容:" prop="charge">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入你负责的内容"
            v-model="formData.charge">
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
    return {
      form_rules:{
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
  methods:{
    onSubmit(formName){
      this.$refs[formName].validate(valid => {
        if(valid){
          this.$axios.post(`/api/profiles/edit_project/${this.formData.id}`,this.formData)
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
  watch:{
    untilNow(oldVal,newVal){
      console.log(this.untilNow);
    }
  },
  created() {
    this.$nextTick(() => {
      this.untilNow = this.formData.to != '至今' ? false : true;
    })
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