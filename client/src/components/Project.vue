<template>
  <div class="project">
    <el-tag class='title' type='primary'>项目经历</el-tag>
    <div class="table-container">
      <el-table
        :data='projects'
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
          prop='projectName'
          label='项目名称'
          align='center'
          width='150'>
        </el-table-column>
        <el-table-column
          prop='position'
          label='担任位置'
          align='center'
          width='200'>
        </el-table-column>
        <el-table-column
          label='项目描述'
          align='center'
          width='300'>
          <template slot-scope="scope">
            <i class="el-icon-document"></i>
            <span>{{scope.row.projectDesc}}</span>
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          label='负责内容'
          align='center'
          width='300'>
          <template slot-scope="scope">
            <i class="el-icon-document"></i>
            <span>{{scope.row.charge}}</span>
          </template>
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
    <app-projectDialog :show="show" :formData="formData" @close='show = false'></app-projectDialog>
  </div>
</template>

<script>
import ProjectDialog from './ProjectDialog'
export default {
  name: 'project',
  data(){
    return {
      formData:{},
      show:false
    }
  },
  props:{
    projects: Array
  },
  methods:{
    handleEdit(index,row){
      this.show = true;
      this.formData = {
        projectName:row.projectName,
        position:row.position,
        projectDesc:row.projectDesc,
        charge:row.charge,
        from:row.from,
        to:row.to,
        id:row._id
      }
    },
    handleDelete(index,row){
      this.$confirm('确认删除？')
      .then(() => {
        this.$axios.delete(`/api/profiles/project/${row._id}`)
        .then(res => {
          this.$message.success('指定项目经历删除成功');
          this.$emit('update');
        }).catch(err => {
          this.$message.error(err.response.data);
        })
      }).catch(()=>{});
    }
  },
  components:{
    'app-projectDialog':ProjectDialog
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