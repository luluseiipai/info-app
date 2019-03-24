<template>
  <div class="experience">
    <el-tag class='title' type='primary'>个人履历</el-tag>
    <div class="table-container">
      <el-table
        :data='experience'
        stripe
        border
        style='width:100%'>
        <el-table-column
          type='index'
          label='序号'
          align='center'
          width='100'>
        </el-table-column>
        <el-table-column
          prop='title'
          label='头衔'
          align='center'
          width='150'>
        </el-table-column>
        <el-table-column
          prop='company'
          label='公司名'
          align='center'
          width='200'>
        </el-table-column>
        <el-table-column
          prop='location'
          label='具体地址'
          align='center'
          width='300'>
        </el-table-column>
        <el-table-column
          label='时间'
          align='center'
          width='300'>
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span>{{scope.row.from}} - {{scope.row.to}}</span>
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          label='描述'
          align='center'
          width='300'>
          <template slot-scope="scope">
            <i class="el-icon-document"></i>
            <span>{{scope.row.description}}</span>
          </template>
        </el-table-column>
        <el-table-column 
          prop="operation"
          align="center"
          fixed="right"
          width="250"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="warning"
              icon='el-icon-edit'
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="small"
              type="danger"
              icon='el-icon-delete'
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <app-experienceDialog :show="show" :formData="formData" @close='show = false'></app-experienceDialog>
  </div>
</template>

<script>
import ExperienceDialog from '../components/ExperienceDialog';
export default {
  name: 'experience',
  data(){
    return {
      formData:{},
      show:false
    }
  },
  props:{
    experience: Array
  },
  methods:{
    handleEdit(index,row){
      this.show = true;
      this.formData = {
        title:row.title,
        company:row.company,
        location:row.location,
        description:row.description,
        from:row.from,
        to:row.to,
        id:row._id
      }
    },
    handleDelete(index,row){
      this.$confirm('确认删除？')
      .then(() => {
        this.$axios.delete(`/api/profiles/experience/${row._id}`)
        .then(res => {
          this.$message('单个个人履历删除成功');
          this.$emit('update');
        }).catch(err => {
          this.$message.error(err.response.data);
        })
      }).catch(()=>{});
    }
  },
  components:{
    'app-experienceDialog':ExperienceDialog
  }
}
</script>

<style scoped>
.title{
  margin-left: 16px;
  cursor: default;
}
.table-container{
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
}
@media screen and (max-width: 992px){
  
}
</style>