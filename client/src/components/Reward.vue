<template>
  <div class="reward">
    <el-tag class='title' type='primary'>获奖经历</el-tag>
    <div class="table-container">
      <el-table
        :data='rewards'
        stripe
        border>
        <el-table-column
          type='index'
          label='序号'
          align='center'
          width='50'>
        </el-table-column>
        <el-table-column
          prop='rewardName'
          label='奖项'
          align='center'
          width='200'>
        </el-table-column>
        <el-table-column
          prop='organizer'
          label='主办组织/机构'
          align='center'
          width='200'>
        </el-table-column>
        <el-table-column
          label='时间'
          align='center'
          width='150'>
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span>{{scope.row.time}}</span>
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
  name: 'reward',
  data(){
    return {
      formData:{},
    }
  },
  props:{
    rewards: Array
  },
  methods:{
    handleDelete(index,row){
      this.$confirm('确认删除？')
      .then(() => {
        this.$axios.delete(`/api/profiles/reward/${row._id}`)
        .then(res => {
          this.$message('当个获奖经历删除成功');
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
.reward{
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