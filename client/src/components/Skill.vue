<template>
  <div class="skill">
    <el-tag class='title' type='primary'>技能掌握</el-tag>
    <div class="table-container">
      <el-table
        :data='skills'
        stripe
        border>
        <el-table-column
          type='index'
          label='序号'
          align='center'
          width='50'>
        </el-table-column>
        <el-table-column
          prop='skillName'
          label='技能名称'
          align='center'
          width='150'>
        </el-table-column>
        <el-table-column
          label='熟练度'
          align='center'
          width='100'>
          <template slot-scope="scope">
            <el-tag>{{scope.row.proficient}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column 
          prop="operation"
          align="center"
          width="100"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="danger"
              icon='el-icon-delete'
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'skill',
  data(){
    return {
      formData:{},
    }
  },
  props:{
    skills: Array
  },
  methods:{
    handleDelete(index,row){
      this.$confirm('确认删除？')
      .then(() => {
        this.$axios.delete(`/api/profiles/skill/${row._id}`)
        .then(res => {
          this.$message('指定技能删除成功');
          this.$emit('update');
        }).catch(err => {
          this.$message.error(err.response.data);
        })
      }).catch(()=>{});
    }
  },
  components:{
    
  }
}
</script>

<style scoped>
.skill{
  float: left;
}
.title{
  margin-left: 16px;
  cursor: default;
}
.table-container{
  padding: 16px;
  box-sizing: border-box;
}
@media screen and (max-width: 992px){
  
}
</style>