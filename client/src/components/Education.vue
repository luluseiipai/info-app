<template>
  <div class="education">
    <el-tag class='title' type='primary'>教育经历</el-tag>
    <div class="table-container">
      <el-table
        :data='education'
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
          prop='school'
          label='学校'
          align='center'
          width='200'>
        </el-table-column>
        <el-table-column
          prop='degree'
          label='学历'
          align='center'
          width='100'>
          <template slot-scope="scope">
            <el-tag type='info'>{{scope.row.degree}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop='major'
          label='专业'
          align='center'
          width='150'>
        </el-table-column>
        <el-table-column
          prop='class'
          label='班级'
          align='center'
          width='150'>
        </el-table-column>
        <el-table-column
          prop='scoreRank'
          label='成绩排名'
          align='center'
          width='100'>
          <template slot-scope="scope">
            <i class="el-icon-caret-top"></i>
            <span>{{scope.row.scoreRank}} %</span>
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
    <app-dialog :show="show" :formData="formData" @close='show = false'></app-dialog>
  </div>
</template>

<script>
import EduDialog from '../components/EducationDialog';
export default {
  name: 'education',
  data(){
    return {
      formData:{},
      show:false
    }
  },
  props:{
    education: Array
  },
  methods:{
    handleEdit(index,row){
      this.show = true;
      this.formData = {
        school:row.school,
        degree:row.degree,
        class:row.class,
        major:row.major,
        scoreRank:row.scoreRank,
        description:row.description,
        from:row.from,
        to:row.to,
        id:row._id
      }
    },
    handleDelete(index,row){
      this.$confirm('确认删除？')
      .then(() => {
        this.$axios.delete(`/api/profiles/education/${row._id}`)
        .then(res => {
          this.$message('单个教育经历删除成功');
          this.$emit('update');
        }).catch(err => {
          this.$message.error(err.response.data);
        })
      }).catch(()=>{});
    }
  },
  components:{
    'app-dialog':EduDialog
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