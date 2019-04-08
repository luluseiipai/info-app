<template>
  <div class="students">
    <div class="table-container">
      <el-table
        :data='students'
        stripe
        border>
        <el-table-column
          type='index'
          label='序号'
          align='center'
          width='100'>
        </el-table-column>
        <el-table-column
          prop='name'
          label='姓名'
          align='center'
          width='100'>
        </el-table-column>
        <el-table-column
          label='年龄'
          align='center'
          width='50'>
          <template slot-scope="scope">
            <span>{{age(scope.row.birth)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label='位置'
          align='center'
          width='200'>
          <template slot-scope="scope">
            <span>{{location(scope.row.location)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label='手机'
          align='center'
          width='180'>
          <template slot-scope="scope">
            <i class="el-icon-phone"></i>
            <span>{{scope.row.tel}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label='状态'
          align='center'
          width='100'>
          <template slot-scope="scope">
            <el-tag>{{scope.row.status}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop='bio'
          label='个人简介'
          align='center'>
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
  name:'students',
  data(){
    return {}
  },
  props:{
    students:Array
  },
  computed:{
    age(){
      return function(val){
        return this.getAge(val);
      }
    },
    location(){
      return function(val){
        return this.getLocation(val);
      }
    }
  },
  methods:{
    getAge(val){
      let r = val.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
      let d = new Date(r[1], r[3] - 1, r[4]);
      if (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]) {
        let Y = new Date().getFullYear();
        return (Y - r[1]);
      }
      return ""
    },
    getLocation(val){
      return val.join('');
    },
    handleDelete(index,row){
      this.$confirm('确认删除？')
      .then(() => {
        this.$axios.delete(`/api/profiles/${row.user._id}`)
        .then(res => {
          this.$message('用户删除成功');
          this.$emit('update');
        }).catch(err => {
          this.$message.error(err.response.data);
        })
      }).catch(()=>{this.$message.error('操作有误！');});
    }
  }
}
</script>

<style scoped>
.students{
  width: 100%;
}
.table-container{
  display: inline-block;
  padding: 20px 50px;
  width: 100%;
  box-sizing: border-box;
}
</style>
